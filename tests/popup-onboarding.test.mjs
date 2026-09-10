import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const popupHtml = readFileSync(join(rootDir, "popup.html"), "utf8");
const popupSource = readFileSync(join(rootDir, "popup.js"), "utf8");

assert.match(
  popupHtml,
  /<section class="onboarding" aria-label="How to use Wrangler">[\s\S]*?Turn on Grab Mode[\s\S]*?Then click a part, or drag around a whole component/,
  "The popup should explain how to enable Grab Mode and select a component."
);

assert.match(
  popupHtml,
  /Choose how to hand it off[\s\S]*?Copy for Codex[\s\S]*?Copy for Computer Use/,
  "The popup should explain both available handoff actions."
);

assert.match(
  popupHtml,
  /id="extractBtn" class="comingSoonButton" type="button" disabled aria-disabled="true"[\s\S]*?Multi-Capture \+ Full Extract[\s\S]*?Coming soon/,
  "Multi-Capture + Full Extract should be visibly marked as coming soon and disabled."
);

assert.match(
  popupSource,
  /extractBtn\.disabled = true/,
  "Stored capture-state updates must not re-enable the coming-soon control."
);

assert.match(
  popupSource,
  /Step 1: Turn on Grab Mode to begin\./,
  "The off state should guide new users to the first onboarding step."
);
