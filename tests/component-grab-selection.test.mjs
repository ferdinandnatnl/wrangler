import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "component-grab.js"), "utf8");

assert.match(
  source,
  /let\s+selectedEl\s*=\s*null/,
  "Grab mode should keep the clicked component separate from the live hover candidate."
);

assert.match(
  source,
  /function showMenu\(clientX, clientY\)\s*\{[\s\S]*?selectedEl\s*=\s*hoveredEl[\s\S]*?menuVisible\s*=\s*true/,
  "Opening the component menu should lock the component that was clicked."
);

assert.match(
  source,
  /if \(menuVisible\) \{[\s\S]*?selectedEl && document\.contains\(selectedEl\)[\s\S]*?updateOverlay\(selectedEl\)[\s\S]*?return;/,
  "Hover refreshes should keep showing the selected component while its menu is open."
);

assert.match(
  source,
  /const target = selectedEl \|\| hoveredEl;\s+hideMenu\(\);[\s\S]*?extractComponentData\(target\)/,
  "Menu actions should continue using the component that opened the menu."
);

assert.match(
  source,
  /function hideMenu\(\)\s*\{[\s\S]*?selectedEl\s*=\s*null;/,
  "Closing the menu should release the selection lock so hover can resume."
);
