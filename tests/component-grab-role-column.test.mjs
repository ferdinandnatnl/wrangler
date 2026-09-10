import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "component-grab.js"), "utf8");

assert.match(
  source,
  /function\s+isRoleProductColumnHeader\s*\(/,
  "The grab serializer should identify the ProductColumnHeader Role column."
);

assert.match(
  source,
  /getReactComponentName\(el\)\s*===\s*"ProductColumnHeader"/,
  "The Role-column removal should target the captured ProductColumnHeader component."
);

assert.match(
  source,
  /Array\.from\(table\.querySelectorAll\("tr"\)\)\.forEach/,
  "Removing the Role header should also omit the same column from table body rows."
);

assert.match(
  source,
  /simplifyDom\(el,\s*0,\s*8,\s*null,\s*styleDict,\s*omittedNodes\)/,
  "The simplified prompt structure should be built with the omitted-column set."
);
