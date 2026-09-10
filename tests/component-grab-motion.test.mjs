import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "component-grab.js"), "utf8");

assert.match(source, /function\s+extractMotionData\s*\(root\)/, "Grab mode should extract component motion data.");
assert.match(source, /root\.getAnimations\(\{ subtree: true \}\)/, "JS and Web Animations API effects should be captured.");
assert.match(source, /animationIterationCount/, "Animation iteration counts should be preserved.");
assert.match(source, /selectorTouchesComponent\(rule\.selectorText\)/, "Hover and focus motion rules for the component should be included.");
assert.match(source, /allKeyframes\.filter\(\(rule\) => referencedKeyframeNames\.has\(rule\.name\)\)/, "Only keyframes used by the grabbed component should be exported.");
assert.match(source, /motion:\s*extractMotionData\(el\)/, "Motion data should be included in component JSON.");
assert.match(source, /MOTION SPEC \(exact computed transitions\/animations/, "The component prompt should expose the extracted motion spec.");
assert.match(source, /Make the animation easy to replay during review/, "The handoff should request an interactive animation preview.");
assert.match(source, /Respect prefers-reduced-motion/, "Generated components should preserve reduced-motion accessibility.");
