import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "component-grab.js"), "utf8");

assert.match(
  source,
  /menu\.setAttribute\("popover",\s*"manual"\)/,
  "The action menu should use the browser top layer so page overflow cannot clip it."
);

assert.match(
  source,
  /width:\s*min\(\$\{MENU_MAX_WIDTH\}px,\s*calc\(100vw - \$\{MENU_MARGIN \* 2\}px\)\)/,
  "The action menu should have a bounded width instead of expanding to the available viewport."
);

assert.match(
  source,
  /function\s+getMenuPosition\([\s\S]*?anchorRect\.right\s*\+\s*MENU_GAP,\s*top:\s*anchorRect\.bottom\s*\+\s*MENU_GAP/,
  "The action menu should prefer the lower-right side of the selected component."
);

assert.match(
  source,
  /function\s+getMenuPosition\([\s\S]*?anchorRect\.left\s*-\s*menuRect\.width\s*-\s*MENU_GAP/,
  "The action menu should retain a left-side fallback for narrow viewports."
);

assert.match(
  source,
  /function\s+clampMenuPosition\([\s\S]*?window\.innerWidth[\s\S]*?window\.innerHeight/,
  "The action menu should stay fully inside the viewport when no outside position fits."
);
