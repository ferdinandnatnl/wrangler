import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "component-grab.js"), "utf8");

assert.match(
  source,
  /const\s+DOCK_POSITION_KEY\s*=\s*"grabDockPosition"/,
  "The floating grab toggle position should have a stable storage key."
);

assert.match(
  source,
  /function\s+clampDockPosition\s*\(/,
  "The floating grab toggle should clamp saved and dragged positions to the viewport."
);

assert.match(
  source,
  /chrome\.storage\.local\.set\(\{\s*\[DOCK_POSITION_KEY\]:\s*dockPosition\s*\}\)/,
  "Dragging the floating grab toggle should persist its position."
);

for (const eventName of ["pointerdown", "pointermove", "pointerup", "pointercancel"]) {
  assert.match(
    source,
    new RegExp(`dockSwitch\\.addEventListener\\("${eventName}"`),
    `The floating grab toggle should handle ${eventName} for dragging.`
  );
}

assert.match(
  source,
  /if\s*\(suppressNextDockClick\)\s*\{/,
  "A drag should suppress the follow-up click so moving the toggle does not toggle grab mode."
);
