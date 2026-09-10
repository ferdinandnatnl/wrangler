import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const extensionDir = join(dirname(fileURLToPath(import.meta.url)), "..", "extension");
const backgroundSource = readFileSync(join(extensionDir, "background.js"), "utf8");
const componentSource = readFileSync(join(extensionDir, "component-grab.js"), "utf8");
const popupSource = readFileSync(join(extensionDir, "popup.js"), "utf8");

assert.match(
  backgroundSource,
  /const GRAB_MODE_BY_TAB_KEY = "grabModeByTab"/,
  "Grab mode should be stored as a tab-keyed map."
);
assert.doesNotMatch(
  componentSource,
  /changes\.grabModeEnabled/,
  "Content scripts must not subscribe to the legacy browser-wide boolean."
);
assert.match(
  componentSource,
  /request\.action !== "GRAB_MODE_CHANGED"/,
  "A tab should react only to a message explicitly delivered to that tab."
);
assert.match(
  popupSource,
  /action: 'SET_GRAB_MODE', tabId, enabled/,
  "The popup must identify the active tab when changing grab mode."
);

const messageListeners = [];
const sentTabMessages = [];
const sessionState = {};
const storageArea = {
  async get(defaults) {
    return { ...defaults, ...sessionState };
  },
  async set(patch) {
    Object.assign(sessionState, patch);
  },
  async remove(key) {
    delete sessionState[key];
  },
};

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
    onRemoved: { addListener() {} },
    captureVisibleTab(_windowId, _options, callback) {
      callback("data:image/png;base64,test");
    },
    async sendMessage(tabId, payload) {
      sentTabMessages.push({ tabId, payload });
    },
  },
  downloads: {
    download(_options, callback) {
      callback(1);
    },
  },
  storage: {
    local: storageArea,
    session: storageArea,
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
assert.equal(messageListeners.length, 1, "The background worker should register one message listener.");

function sendMessage(request, sender = {}) {
  return new Promise((resolve) => {
    messageListeners[0](request, sender, resolve);
  });
}

await sendMessage({ action: "SET_GRAB_MODE", tabId: 11, enabled: true });
assert.equal((await sendMessage({ action: "GET_GRAB_MODE", tabId: 11 })).enabled, true);
assert.equal((await sendMessage({ action: "GET_GRAB_MODE", tabId: 22 })).enabled, false);

await sendMessage({ action: "SET_GRAB_MODE", enabled: true }, { tab: { id: 22 } });
assert.equal((await sendMessage({ action: "GET_GRAB_MODE", tabId: 11 })).enabled, true);
assert.equal((await sendMessage({ action: "GET_GRAB_MODE", tabId: 22 })).enabled, true);

await sendMessage({ action: "SET_GRAB_MODE", tabId: 11, enabled: false });
assert.equal((await sendMessage({ action: "GET_GRAB_MODE", tabId: 11 })).enabled, false);
assert.equal((await sendMessage({ action: "GET_GRAB_MODE", tabId: 22 })).enabled, true);
assert.deepEqual(
  sentTabMessages.map(({ tabId }) => tabId),
  [11, 11],
  "Only popup-originated changes should be forwarded, and only to their addressed tab."
);
