import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "design_system.md"), "utf8");

assert.match(source, /^# Design system/m, "The project should have a design-system source-of-truth file.");
assert.match(source, /### `chatbot-input`/, "The captured chatbot input should be recorded as a reusable role.");
assert.match(source, /## Capture workflow/, "The design-system file should document how future captures are incorporated.");
assert.match(source, /future captures of the same role should consult this entry first/i, "Future same-role captures should reuse the documented contract.");
assert.match(source, /examples\/blank-canvas\/design-system\.js/, "The component record should point to its implementation.");
assert.match(source, /--ds-color-action-primary/, "The component record should reference semantic tokens.");
