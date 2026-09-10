import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(rootDir, "component-grab.js"), "utf8");

assert.match(
  source,
  /const\s+MARQUEE_DRAG_THRESHOLD\s*=\s*6/,
  "A small movement threshold should keep normal clicks distinct from marquee drags."
);

assert.match(
  source,
  /function\s+marqueeRectFromPoints\s*\([\s\S]*?Math\.min\(x1, x2\)[\s\S]*?Math\.abs\(x2 - x1\)/,
  "The marquee rectangle should support dragging in either direction."
);

assert.match(
  source,
  /function\s+getMarqueeCandidates\s*\([\s\S]*?document\.elementsFromPoint\([\s\S]*?node\s*=\s*node\.parentElement/,
  "Region selection should consider both sampled child elements and their containing components."
);

assert.match(
  source,
  /function\s+scoreMarqueeCandidate\s*\([\s\S]*?selectionCoverage[\s\S]*?candidateCoverage[\s\S]*?edgeError/,
  "The selected component should be ranked by how closely its complete bounds match the drawn region."
);

assert.match(
  source,
  /document\.addEventListener\("mouseup",\s*onMouseUp,\s*true\)/,
  "Releasing a marquee drag should finalize the whole-component selection."
);

assert.match(
  source,
  /if\s*\(suppressNextPageClick\)\s*\{[\s\S]*?e\.preventDefault\(\)[\s\S]*?e\.stopImmediatePropagation\(\)/,
  "The synthetic click after a drag must not activate the underlying page."
);
