import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "component-grab.js"), "utf8");

assert.match(
  source,
  /createMenuButton\("copy-for-codex",\s*"Copy for Codex",\s*"Save reference \+ copy ready prompt"\)/,
  "The component menu should keep the one-click Codex handoff first."
);

assert.match(
  source,
  /createMenuButton\("copy-computer-use",\s*"Copy for Computer Use",\s*"Save reference \+ locate in browser", true\)/,
  "The component menu should expose a browser-location prompt as its second action."
);

assert.equal(
  (source.match(/menu\.appendChild\(createMenuButton/g) || []).length,
  2,
  "The component menu should contain only the two intentional actions."
);

for (const obsoleteAction of [
  "copy-all",
  "copy-prompt",
  "copy-prompt-image",
  "copy-json",
  "copy-image",
  "copy-both",
  "download-json",
  "download-image",
  "download-both",
]) {
  assert.doesNotMatch(
    source,
    new RegExp(`createMenuButton\\("${obsoleteAction}"`),
    `The redundant ${obsoleteAction} menu action should be removed.`
  );
}

assert.match(
  source,
  /function buildComputerUsePrompt\(data, exportInfo\)\s*\{/,
  "The browser-location action should build a dedicated prompt."
);

for (const promptDetail of [
  "Use computer-use to locate and inspect this UI component directly in the browser.",
  "Page URL:",
  "Captured viewport rectangle:",
  "Page scroll at capture:",
  "Viewport at capture:",
  "The coordinates are CSS viewport coordinates from the capture, not absolute desktop coordinates",
  "ignore the Wrangler overlay if it is visible.",
]) {
  assert.match(
    source,
    new RegExp(promptDetail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `The computer-use prompt should include ${promptDetail}`
  );
}

assert.match(
  source,
  /if \(action === "copy-computer-use"\) \{\s+const exportInfo = await saveCaptureReference\(data\);\s+await copyJsonText\(buildComputerUsePrompt\(data, exportInfo\)\);/,
  "The browser-location action should save the reference and copy the generated prompt as text."
);

assert.match(
  source,
  /const imageDataUrl = await captureElementImage\(data\);\s+const exportInfo = buildCodexExportInfo\(data\);/,
  "The Codex handoff should continue capturing the reference screenshot."
);

assert.match(
  source,
  /const relativeDirectory = `wrangler-capture-history\/\$\{captureId\}`;/,
  "All exports should be grouped in a precisely named folder under Downloads/wrangler-capture-history."
);

assert.match(
  source,
  /const dimensions = `\$\{Math\.round\(data\.rect\.width\)\}x\$\{Math\.round\(data\.rect\.height\)\}`;/,
  "Precise capture names should include the component dimensions."
);

assert.match(
  source,
  /screenshotCodexPath: `~\/Downloads\/\$\{relativeDirectory\}\/\$\{screenshotFilename\}`/,
  "The copied Codex prompt should point to the exact screenshot path under Downloads."
);

assert.match(
  source,
  /jsonCodexPath: `~\/Downloads\/\$\{relativeDirectory\}\/\$\{jsonFilename\}`/,
  "The copied Codex prompt should point to the exact JSON path under Downloads."
);

assert.match(
  source,
  /if \(action === "copy-for-codex"\) \{\s+const exportInfo = await saveCaptureReference\(data\);\s+await copyJsonText\(buildCodexHandoffPrompt\(data, exportInfo\)\);/,
  "Copy for Codex should save both reference files before copying the handoff prompt."
);

assert.match(
  source,
  /async function saveCaptureReference\(data\)\s*\{[\s\S]*?captureElementImage\(data\)[\s\S]*?wrangler-capture-history[\s\S]*?jsonToDataUrl\(JSON\.stringify\(exportData, null, 2\)\)/,
  "Both copy actions should use one reference-saving workflow that creates the history path on demand."
);

assert.match(
  source,
  /REFERENCE FILES \(saved automatically for this capture\):[\s\S]*?Use these files as supporting reference when useful/,
  "The computer-use prompt should include the saved reference files without replacing live browser inspection."
);
