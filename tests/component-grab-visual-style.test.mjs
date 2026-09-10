import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "component-grab.js"), "utf8");

assert.match(
  source,
  /function\s+getVisualStyleHint\s*\(/,
  "The grab serializer should emit explicit visual hints for interactive controls."
);

assert.match(
  source,
  /matches\?\.\("button, a, \[role='button'\], input, select, textarea"\)/,
  "Visual style hints should be limited to controls where variants matter."
);

assert.match(
  source,
  /data-visual-style="\$\{visualStyleHint\}"/,
  "Serialized structure should include the computed visual style hint."
);

assert.match(
  source,
  /For buttons and links with data-visual-style, match those explicit computed colors exactly/,
  "The generation prompt should make explicit button colors authoritative."
);
