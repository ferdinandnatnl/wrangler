import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const backgroundSource = readFileSync(join(rootDir, "background.js"), "utf8");

assert.equal(
  (backgroundSource.match(/function\s+captureVisiblePromise\s*\(/g) || []).length,
  1,
  "background.js should define captureVisiblePromise exactly once."
);

assert.equal(
  (backgroundSource.match(/chrome\.tabs\.captureVisibleTab\s*\(/g) || []).length,
  1,
  "All captureVisibleTab calls should go through the shared throttled wrapper."
);

assert.match(
  backgroundSource,
  /const\s+CAPTURE_MIN_INTERVAL_MS\s*=\s*600/,
  "Capture calls should be spaced below Chrome's per-second quota."
);

assert.match(
  backgroundSource,
  /captureChain\s*=\s*run\.then\(\(\)\s*=>\s*\{\},\s*\(\)\s*=>\s*\{\}\)/,
  "The capture queue should continue processing after a failed capture."
);

const messageListeners = [];
const captureTimes = [];

const chrome = {
  runtime: {
    lastError: null,
    onInstalled: { addListener() {} },
    onMessage: {
      addListener(listener) {
        messageListeners.push(listener);
      },
    },
  },
  tabs: {
    captureVisibleTab(_windowId, _options, callback) {
      captureTimes.push(Date.now());
      callback(`data:image/png;base64,${captureTimes.length}`);
    },
  },
  downloads: {
    download(_options, callback) {
      callback(1);
    },
  },
  storage: {
    local: {
      async get(defaults) {
        return defaults;
      },
      async set() {},
    },
  },
};

const context = vm.createContext({
  chrome,
  clearInterval,
  clearTimeout,
  console,
  importScripts() {},
  setInterval,
  setTimeout,
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
});

vm.runInContext(backgroundSource, context, { filename: "background.js" });
assert.equal(messageListeners.length, 1, "background.js should register one runtime message listener.");

function sendMessage(request) {
  return new Promise((resolve) => {
    messageListeners[0](request, {}, resolve);
  });
}

const responses = await Promise.all([
  sendMessage({ action: "CAPTURE_VISIBLE", windowId: 1 }),
  sendMessage({ action: "CAPTURE_VISIBLE", windowId: 1 }),
  sendMessage({ action: "CAPTURE_VISIBLE", windowId: 1 }),
]);

assert.deepEqual(
  responses.map((response) => response.success),
  [true, true, true],
  "Burst capture requests should all complete successfully."
);
assert.equal(captureTimes.length, 3, "All requested captures should run.");

for (let i = 1; i < captureTimes.length; i += 1) {
  assert.ok(
    captureTimes[i] - captureTimes[i - 1] >= 550,
    `Capture ${i + 1} ran too soon after capture ${i}.`
  );
}
