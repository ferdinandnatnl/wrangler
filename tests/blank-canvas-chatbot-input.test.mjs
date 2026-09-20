import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const component = readFileSync(join(rootDir, "examples/blank-canvas/design-system.js"), "utf8");
const styles = readFileSync(join(rootDir, "examples/blank-canvas/design-system.css"), "utf8");
const app = readFileSync(join(rootDir, "examples/blank-canvas/app.js"), "utf8");
const html = readFileSync(join(rootDir, "examples/blank-canvas/index.html"), "utf8");

assert.match(component, /function\s+ChatbotInput\s*\(/, "The blank canvas should expose a reusable chatbot-input component.");
assert.match(component, /["']data-component["']:\s*"chatbot-input"/, "The component should identify its design-system role.");
assert.match(component, /aria-label.:\s*label/, "The input should have an accessible name.");
assert.match(component, /aria-invalid.:\s*isError/, "The input should expose invalid state semantics.");
assert.match(component, /aria-describedby.:\s*errorText\s*\?\s*errorId/, "Visible error text should be associated with the input.");
assert.match(component, /disabled:\s*disabled\s*\|\|\s*loading/, "Disabled and loading states should prevent duplicate submits.");
assert.match(component, /const\s+formId\s*=\s*`\$\{inputId\}-form`/, "The sibling submit button should have a stable form association.");
assert.match(component, /form:\s*formId/, "The submit affordance should submit the component form from its reference anatomy.");
assert.match(component, /window\.BlankCanvasDesignSystem/, "The component should be exported through the static canvas runtime.");

for (const token of [
  "--ds-color-surface-primary",
  "--ds-color-text-placeholder",
  "--ds-color-action-primary",
  "--ds-chatbot-input-max-width",
  "--ds-chatbot-input-height",
  "--ds-chatbot-input-radius",
  "--ds-motion-fast",
]) {
  assert.ok(styles.includes(token), `The component tokens should include ${token}.`);
}

for (const stateSelector of [
  'data-state="error"',
  'data-state="disabled"',
  'data-state="loading"',
  ":focus-within",
  ":active:not(:disabled)",
  "@media (hover: hover) and (pointer: fine)",
  "@media (prefers-reduced-motion: reduce)",
  "@media (max-width: 600px)",
]) {
  assert.ok(styles.includes(stateSelector), `The chatbot-input styles should cover ${stateSelector}.`);
}

assert.match(app, /h\(DesignSystemPreview\)/, "The reusable component should be placed inside the blank canvas.");
assert.match(app, /placeholder:\s*"Ask me anything\.\.\."/, "The canvas preview should preserve the captured placeholder.");
assert.match(html, /design-system\.css/, "The blank canvas should load the design-system styles.");
assert.match(html, /design-system\.js/, "The blank canvas should load the design-system component runtime.");
