// ============================================================
// capture-core.js — Wrangler shared capture logic
// Loaded by background.js via importScripts(). Contains the
// in-page functions (injected with chrome.scripting), the
// capture plan math, and the prompt builder. Moved out of
// popup.js so the workflow survives the popup closing.
// ============================================================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runInTab(tabId, func, args = []) {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func,
    args,
  });
  return results?.[0]?.result;
}

function uniqueSortedNumbers(values, tolerance = 40) {
  const sorted = [...new Set(values.map((v) => Math.round(v)).filter((v) => Number.isFinite(v) && v >= 0))].sort((a, b) => a - b);
  const deduped = [];
  for (const value of sorted) {
    if (!deduped.length || Math.abs(value - deduped[deduped.length - 1]) > tolerance) {
      deduped.push(value);
    }
  }
  return deduped;
}

function downsampleEvenly(values, maxCount) {
  if (values.length <= maxCount) return values;
  const picked = [];
  for (let i = 0; i < maxCount; i += 1) {
    const idx = Math.round((i * (values.length - 1)) / (maxCount - 1));
    picked.push(values[idx]);
  }
  return uniqueSortedNumbers(picked, 0);
}

function computeCapturePlan(prep) {
  const scrollHeight = Math.max(0, Number(prep.scrollHeight) || 0);
  const viewportHeight = Math.max(1, Number(prep.viewportHeight) || 1);
  const maxScroll = Math.max(0, scrollHeight - viewportHeight);

  const step = Math.max(200, Math.round(viewportHeight * 0.82));
  const generated = [0, maxScroll, Math.round(maxScroll * 0.33), Math.round(maxScroll * 0.66)];
  for (let y = step; y < maxScroll; y += step) {
    generated.push(y);
  }

  if (Array.isArray(prep.sectionStarts)) {
    for (const y of prep.sectionStarts) {
      if (Number.isFinite(y)) generated.push(Math.max(0, Math.min(maxScroll, y)));
    }
  }

  let positions = uniqueSortedNumbers(generated);
  positions = downsampleEvenly(positions, 8);

  if (!positions.includes(0)) positions.unshift(0);
  if (!positions.includes(maxScroll)) positions.push(maxScroll);
  positions = uniqueSortedNumbers(positions);

  return {
    scrollHeight,
    viewportHeight,
    maxScroll,
    step,
    positions,
    sectionStarts: prep.sectionStarts || [],
    startScrollY: prep.originalScrollY || 0,
  };
}

function inPagePrepareForCapture() {
  try {
    const styleId = '__ui_cloner_freeze_styles__';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
      `;
      document.documentElement.appendChild(styleEl);
    }

    const originalScrollY = Math.round(window.scrollY || window.pageYOffset || 0);
    window.__uiClonerCaptureState = { originalScrollY };

    document.querySelectorAll('video').forEach((video) => {
      try { video.pause(); } catch (e) {}
    });

    const sectionStarts = Array.from(document.querySelectorAll('header,main,section,footer,aside,article,nav'))
      .map((el) => Math.round((window.scrollY || 0) + el.getBoundingClientRect().top))
      .filter((v) => Number.isFinite(v) && v >= 0);

    const docEl = document.documentElement;
    const body = document.body;
    const scrollHeight = Math.max(
      docEl?.scrollHeight || 0,
      body?.scrollHeight || 0,
      docEl?.offsetHeight || 0,
      body?.offsetHeight || 0
    );

    return {
      originalScrollY,
      scrollHeight,
      viewportHeight: window.innerHeight || docEl?.clientHeight || 1,
      sectionStarts: Array.from(new Set(sectionStarts)).sort((a, b) => a - b),
    };
  } catch (err) {
    return { __error: `prepare capture failed: ${err.message}` };
  }
}

async function inPageScrollToY(y) {
  try {
    const target = Math.max(0, Number(y) || 0);
    window.scrollTo(0, target);
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return { scrollY: Math.round(window.scrollY || window.pageYOffset || 0) };
  } catch (err) {
    return { __error: `scroll failed: ${err.message}` };
  }
}

function inPageRestoreAfterCapture() {
  try {
    const state = window.__uiClonerCaptureState || {};
    const styleEl = document.getElementById('__ui_cloner_freeze_styles__');
    if (styleEl) styleEl.remove();
    window.scrollTo(0, Number(state.originalScrollY) || 0);
    delete window.__uiClonerCaptureState;
    return { restored: true };
  } catch (err) {
    return { __error: `restore failed: ${err.message}` };
  }
}

// ============================================================
// extractPageData — runs INSIDE the target webpage context
// Must be self-contained (no external variables/closures).
// Returns a plain data object serializable back to popup.
// ============================================================
async function extractPageData() {
  try {
  // ── Helpers ──────────────────────────────────────────────

  const SKIP_TAGS = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','META','LINK','CANVAS','VIDEO','HEAD']);
  const STRUCTURAL_TAGS = new Set(['HEADER','NAV','MAIN','SECTION','FOOTER','ASIDE','ARTICLE','FORM','DIV','UL','OL','LI','TABLE','THEAD','TBODY','TR','TH','TD','SPAN','P','A','BUTTON','H1','H2','H3','H4','H5','H6','LABEL', 'FIGURE', 'FIGCAPTION']);

  function getKeyStyles(el, pseudo = null, parentStyle = null) {
    try {
      const s = window.getComputedStyle(el, pseudo);
      const p = [];
      // Inherited props: only emit when they differ from the parent's computed
      // value, so container-level typography isn't repeated on every descendant.
      const inh = (prop, fallbackDefault) => {
        const v = s[prop];
        if (!v) return false;
        if (parentStyle) return v !== parentStyle[prop];
        return fallbackDefault === undefined || v !== fallbackDefault;
      };
      if (s.display && s.display !== 'block' && s.display !== 'inline') p.push(`display:${s.display}`);
      if (s.position && s.position !== 'static') p.push(`position:${s.position}`);
      if (s.flexDirection && s.flexDirection !== 'row') p.push(`flex-dir:${s.flexDirection}`);
      if (s.alignItems && s.alignItems !== 'normal' && s.alignItems !== 'stretch') p.push(`align:${s.alignItems}`);
      if (s.justifyContent && s.justifyContent !== 'normal' && s.justifyContent !== 'start') p.push(`justify:${s.justifyContent}`);
      if (s.gap && s.gap !== '0px' && s.gap !== 'normal') p.push(`gap:${s.gap}`);
      if (s.gridTemplateColumns && s.gridTemplateColumns !== 'none') p.push(`grid-cols:${s.gridTemplateColumns}`);
      if (s.gridTemplateAreas && s.gridTemplateAreas !== 'none') p.push(`grid-areas:${s.gridTemplateAreas}`);
      // width/height intentionally omitted: exact per-element sizes live in the
      // r="WxH@(x,y)" rect attribute; keeping them here would fragment the style dictionary.
      if (s.maxWidth && s.maxWidth !== 'none') p.push(`max-w:${s.maxWidth}`);
      if (s.aspectRatio && s.aspectRatio !== 'auto') p.push(`aspect:${s.aspectRatio}`);
      if (s.objectFit && s.objectFit !== 'fill') p.push(`object-fit:${s.objectFit}`);
      if (s.padding && s.padding !== '0px') p.push(`p:${s.padding}`);
      if (s.margin && s.margin !== '0px') p.push(`m:${s.margin}`);
      if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') p.push(`bg:${s.backgroundColor}`);
      if (s.color && s.color !== 'rgba(0, 0, 0, 0)' && inh('color')) p.push(`color:${s.color}`);
      if (s.backgroundImage && s.backgroundImage !== 'none') p.push(`bg-img:${s.backgroundImage.substring(0,80)}`);
      if (s.borderRadius && s.borderRadius !== '0px') p.push(`radius:${s.borderRadius}`);
      if (s.border && s.border !== 'none' && !s.border.startsWith('0px')) p.push(`border:${s.border}`);
      if (s.boxShadow && s.boxShadow !== 'none') p.push(`shadow:${s.boxShadow.substring(0,60)}`);
      if (s.opacity && s.opacity !== '1') p.push(`opacity:${s.opacity}`);
      if (s.zIndex && s.zIndex !== 'auto' && s.zIndex !== '0') p.push(`z:${s.zIndex}`);
      if (s.backdropFilter && s.backdropFilter !== 'none') p.push(`backdrop:${s.backdropFilter}`);
      if (s.filter && s.filter !== 'none') p.push(`filter:${s.filter}`);
      if (s.mixBlendMode && s.mixBlendMode !== 'normal') p.push(`blend:${s.mixBlendMode}`);
      if (s.clipPath && s.clipPath !== 'none') p.push(`clip:${s.clipPath}`);
      if (inh('fontSize', '16px')) p.push(`fs:${s.fontSize}`);
      if (inh('fontWeight', '400')) p.push(`fw:${s.fontWeight}`);
      if (inh('fontFamily')) p.push(`ff:${s.fontFamily.split(',')[0].trim()}`);
      if (s.lineHeight && s.lineHeight !== 'normal' && inh('lineHeight')) p.push(`lh:${s.lineHeight}`);
      if (s.letterSpacing && s.letterSpacing !== 'normal' && inh('letterSpacing')) p.push(`ls:${s.letterSpacing}`);
      if (s.textAlign && s.textAlign !== 'start' && s.textAlign !== 'left' && inh('textAlign')) p.push(`text-align:${s.textAlign}`);
      if (s.visibility && s.visibility !== 'visible') p.push(`visibility:${s.visibility}`);
      if (s.overflow && s.overflow !== 'visible') p.push(`overflow:${s.overflow}`);
      // ── transitions ──────────────
      if (s.transitionDuration && s.transitionDuration !== '0s') p.push(`transition-dur:${s.transitionDuration}`);
      if (s.transitionProperty && s.transitionProperty !== 'all' && s.transitionProperty !== 'none') p.push(`transition-prop:${s.transitionProperty.substring(0,80)}`);
      if (s.transitionTimingFunction && s.transitionTimingFunction !== 'ease') p.push(`transition-ease:${s.transitionTimingFunction.substring(0,40)}`);
      if (s.transform && s.transform !== 'none') p.push(`transform:${s.transform.substring(0,60)}`);
      if (s.animationName && s.animationName !== 'none') {
        p.push(`anim:${s.animationName} ${s.animationDuration} ${s.animationTimingFunction}`);
      }
      if (s.content && s.content !== 'none' && s.content !== 'normal') p.push(`content:${s.content.substring(0,40)}`);
      if (s.cursor && s.cursor !== 'auto' && inh('cursor')) p.push(`cursor:${s.cursor}`);
      return p;
    } catch(e) { return []; }
  }

  function isHidden(el) {
    try {
      const s = window.getComputedStyle(el);
      return s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0;
    } catch(e) { return false; }
  }

  // ── React Fiber Component Extraction ─────────────────────
  function getReactComponentName(el) {
    try {
      const key = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
      if (!key) return null;
      let fiber = el[key];
      let depth = 0;
      while (fiber && depth < 5) {
        if (fiber.type && typeof fiber.type === 'function' && fiber.type.name) {
          const skipNames = ['Link', 'Image', 'div', 'span', 'a', 'p'];
          if (!skipNames.includes(fiber.type.name)) {
            return fiber.type.name;
          }
        }
        fiber = fiber.return;
        depth++;
      }
    } catch(e) {}
    return null;
  }

  function getRect(el) {
    try {
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return null;
      return `${Math.round(r.width)}x${Math.round(r.height)}@(${Math.round(r.left)},${Math.round(r.top)})`;
    } catch(e) { return null; }
  }

  function resolveUrl(url) {
    if (!url || url.startsWith('data:')) return url || '';
    try { return new URL(url, window.location.href).href; } catch(e) { return url; }
  }

  function serializeImg(el, indent) {
    const alt = el.getAttribute('alt') || '';
    const w = el.getAttribute('width') || el.naturalWidth || el.offsetWidth || '';
    const h = el.getAttribute('height') || el.naturalHeight || el.offsetHeight || '';
    const src = resolveUrl(el.getAttribute('src') || '');
    const srcset = (el.getAttribute('srcset') || '').split(',').map(s => {
      const parts = s.trim().split(' '); parts[0] = resolveUrl(parts[0]); return parts.join(' ');
    }).join(', ');
    const rect = getRect(el);
    return `${indent}<img alt="${alt}" width="${w}" height="${h}" src="${src.substring(0,200)}" srcset="${srcset.substring(0,300)}" />${rect ? ` /* RECT:${rect} */` : ''}\n`;
  }

  function serializeSvg(el, indent) {
    const vb = el.getAttribute('viewBox') || '';
    const w = el.getAttribute('width') || '';
    const h = el.getAttribute('height') || '';
    const title = el.querySelector('title')?.textContent || '';
    const ariaLabel = el.getAttribute('aria-label') || '';
    const paths = Array.from(el.querySelectorAll('path')).slice(0,3).map(p => p.getAttribute('d') || '').filter(Boolean);
    const rect = getRect(el);
    let s = `${indent}<svg viewBox="${vb}" w="${w}" h="${h}"${title ? ` title="${title}"` : ''}${ariaLabel ? ` aria-label="${ariaLabel}"` : ''}>${rect ? ` /* RECT:${rect} */` : ''}\n`;
    paths.forEach(d => { s += `${indent}  <path d="${d.substring(0,120)}" />\n`; });
    s += `${indent}</svg>\n`;
    return s;
  }

  // Style dictionary: identical style combos are stored once and referenced
  // by key (s="S12"), instead of repeating the full list on every element.
  const styleDict = new Map(); // signature -> key
  function styleKeyFor(styleProps) {
    if (!styleProps || !styleProps.length) return null;
    const sig = styleProps.join(' | ');
    let key = styleDict.get(sig);
    if (!key) {
      key = `S${styleDict.size + 1}`;
      styleDict.set(sig, key);
    }
    return key;
  }
  function getStyleTable() {
    return Array.from(styleDict.entries()).map(([sig, key]) => `${key}: ${sig}`);
  }

  function simplifyDom(node, depth=0, max=30, parentStyle=null) {
    if (!node || depth >= max) return '';
    const indent = '  '.repeat(depth);
    if (node.nodeType === 3) { const t = node.textContent.trim(); return t ? `${indent}${t.substring(0,160)}\n` : ''; }
    if (node.nodeType === 8) return ''; // comment

    // Pierce Shadow DOM
    if (node.shadowRoot) {
      let s = `${indent}<shadow-root>\n`;
      for (let child of node.shadowRoot.childNodes) s += simplifyDom(child, depth+1, max, parentStyle);
      s += `${indent}</shadow-root>\n`;
      return s;
    }

    const tag = node.nodeName;
    if (SKIP_TAGS.has(tag)) return '';
    if (tag === 'IMG') return serializeImg(node, indent);
    if (tag === 'SVG') return serializeSvg(node, indent);

    let str = `${indent}<${tag.toLowerCase()}`;
    if (node.id) str += ` id="${node.id}"`;
    if (node.className && typeof node.className === 'string') str += ` class="${node.className.trim().substring(0,100)}"`;
    const role = node.getAttribute && node.getAttribute('role');
    const ariaLabel = node.getAttribute && node.getAttribute('aria-label');
    const ariaHaspopup = node.getAttribute && node.getAttribute('aria-haspopup');
    const ariaExpanded = node.getAttribute && node.getAttribute('aria-expanded');
    const dataState = node.getAttribute && node.getAttribute('data-state');
    const dataHeadlessui = node.getAttribute && node.getAttribute('data-headlessui-state');
    const href = node.tagName === 'A' && node.getAttribute('href');
    if (role) str += ` role="${role}"`;
    if (ariaLabel) str += ` aria-label="${ariaLabel}"`;
    if (ariaHaspopup) str += ` aria-haspopup="${ariaHaspopup}"`;
    if (ariaExpanded) str += ` aria-expanded="${ariaExpanded}"`;
    if (dataState) str += ` data-state="${dataState}"`;
    if (dataHeadlessui) str += ` data-headlessui-state="${dataHeadlessui}"`;
    if (href) str += ` href="${href}"`;

    const reactName = getReactComponentName(node);
    if (reactName) str += ` data-react-component="${reactName}"`;

    let ownStyle = null;
    try { ownStyle = window.getComputedStyle(node); } catch(e) {}

    const styleKey = styleKeyFor(getKeyStyles(node, null, parentStyle));
    if (styleKey) str += ` s="${styleKey}"`;

    // Pseudo-elements (diffed against the element's own style)
    const beforeStyles = getKeyStyles(node, '::before', ownStyle);
    if (beforeStyles.length && beforeStyles.some(p => p.startsWith('content:'))) {
      str += ` before="${styleKeyFor(beforeStyles)}"`;
    }
    const afterStyles = getKeyStyles(node, '::after', ownStyle);
    if (afterStyles.length && afterStyles.some(p => p.startsWith('content:'))) {
      str += ` after="${styleKeyFor(afterStyles)}"`;
    }

    // r="" on every element — width/height were dropped from the style
    // dictionary, so the rect is the single source of exact sizes.
    const rect = getRect(node);
    if (rect) str += ` r="${rect}"`;
    if (isHidden(node)) str += ` data-ui-hidden="1"`;

    str += '>\n';

    for (let child of node.childNodes) str += simplifyDom(child, depth+1, max, ownStyle);
    str += `${indent}</${tag.toLowerCase()}>\n`;
    return str;
  }

  // ── Enhanced hover/popover detection ─────────────────────
  function detectHoverTargets() {
    const results = [];

    // 1. ARIA-based triggers (dropdowns, popups, menus)
    document.querySelectorAll('[aria-haspopup],[aria-expanded],[data-headlessui-state],[data-expanded],[aria-pressed],[is-active],[is-open],[data-visible],[data-show],[x-show]').forEach(el => {
      const label = el.getAttribute('aria-label') || (el.innerText || '').trim().substring(0,40) || el.tagName;
      const hiddenChildren = Array.from(el.querySelectorAll('*')).filter(c => isHidden(c)).slice(0,3).map(c => `${c.tagName}[${(c.getAttribute('class')||'').substring(0,40)}]`);
      const s = window.getComputedStyle(el);
      results.push({
        type: 'aria-popup-trigger',
        label,
        tag: el.tagName,
        ariaHaspopup: el.getAttribute('aria-haspopup') || '',
        ariaExpanded: el.getAttribute('aria-expanded') || '',
        dataExpanded: el.getAttribute('data-expanded') || '',
        isActive: el.hasAttribute('is-active') ? 'true' : '',
        isOpen: el.hasAttribute('is-open') ? 'true' : '',
        ariaPressed: el.getAttribute('aria-pressed') || '',
        dataVisible: el.getAttribute('data-visible') || '',
        dataShow: el.getAttribute('data-show') || '',
        xShow: el.getAttribute('x-show') || '',
        hidden_children: hiddenChildren,
        transition: s.transitionDuration !== '0s' ? `${s.transitionProperty} ${s.transitionDuration} ${s.transitionTimingFunction}` : null,
      });
    });

    // 2. Role-based popovers/menus
    document.querySelectorAll('[role="menu"],[role="dialog"],[role="listbox"],[role="tooltip"],[role="popover"]').forEach(el => {
      const s = window.getComputedStyle(el);
      results.push({
        type: 'popover-role',
        role: el.getAttribute('role'),
        class: (el.getAttribute('class')||'').substring(0,60),
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        text: (el.innerText||'').trim().substring(0,120),
      });
    });

    // 3. Tailwind group/peer hover patterns (class-based detection)
    document.querySelectorAll('[class*="group"],[class*="peer"]').forEach(el => {
      const cls = (el.getAttribute('class') || '');
      const hasGroupHover = cls.includes('group-hover') || cls.includes('peer-hover');
      const isGroupRoot  = /\bgroup\b/.test(cls) || /\bpeer\b/.test(cls);
      if (isGroupRoot || hasGroupHover) {
        const rect = el.getBoundingClientRect();
        if (rect.width || rect.height) {
          results.push({
            type: 'tailwind-group-peer',
            role: isGroupRoot ? 'root' : 'target',
            class: cls.substring(0,100),
            rect: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
          });
        }
      }
    });

    // 4. data-state based interactive elements (Radix UI, Headless UI etc.)
    document.querySelectorAll('[data-state],[data-open],[data-closed],[is-active],[is-open],[data-active],[data-expanded],[data-visible],[data-show],[x-show]').forEach(el => {
      const s = window.getComputedStyle(el);
      results.push({
        type: 'data-state',
        dataState: el.getAttribute('data-state') || el.getAttribute('data-open') || el.getAttribute('data-closed') || el.hasAttribute('is-active') || el.hasAttribute('is-open') || el.hasAttribute('data-active') || el.hasAttribute('data-expanded') || el.hasAttribute('data-visible') || el.hasAttribute('data-show') || el.hasAttribute('x-show'),
        tag: el.tagName,
        class: (el.getAttribute('class')||'').substring(0,60),
        display: s.display,
        opacity: s.opacity,
        label: el.getAttribute('aria-label') || (el.innerText||'').trim().substring(0,40),
      });
    });

    // 5. Keyword class-based popovers/dropdowns
    const kw = ['dropdown','popover','popup','modal','flyout','overlay','tooltip','submenu','menu-','open','active','focused','visible','show'];
    document.querySelectorAll('[class]').forEach(el => {
      const cls = (el.getAttribute('class') || '').toLowerCase();
      if (kw.some(k => cls.includes(k)) && !/sr-only|hidden|visually-/.test(cls)) {
        const s = window.getComputedStyle(el);
        if (isHidden(el) || s.position === 'absolute' || s.position === 'fixed' || s.zIndex !== 'auto') {
          results.push({
            type: 'class-popover',
            class: cls.substring(0,80),
            display: s.display,
            visibility: s.visibility,
            position: s.position,
            zIndex: s.zIndex,
            text: (el.innerText||'').trim().substring(0,120),
          });
        }
      }
    });

    return results.slice(0,400);
  }

  // ── Section rects — enhanced with named layout columns ───
  function getSectionRects() {
    const sels = [
      'header','nav','main','footer','aside','section',
      '[role="banner"]','[role="navigation"]','[role="main"]','[role="contentinfo"]',
      '[role="complementary"]',
    ];
    const out = [];
    sels.forEach(sel => {
      document.querySelectorAll(sel).forEach((el,i) => {
        const r = el.getBoundingClientRect();
        if (!r.width && !r.height) return;
        const s = window.getComputedStyle(el);
        out.push({
          selector: `${sel}[${i}]`,
          id: el.id || '',
          class: (el.getAttribute('class')||'').substring(0,60),
          rect: `${Math.round(r.width)}x${Math.round(r.height)}@(${Math.round(r.left)},${Math.round(r.top)})`,
          position: s.position,
          zIndex: s.zIndex,
        });
      });
    });
    return out;
  }

  // ── NEW: Detect major layout columns ─────────────────────
  function getLayoutColumns() {
    // Heuristic: find top-level children of body/main that sit side-by-side
    const cols = [];
    const root = document.querySelector('main,[role="main"]') || document.body;
    const candidates = Array.from(root.children).filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 50 && r.height > 200;
    });
    candidates.forEach(el => {
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      cols.push({
        tag: el.tagName,
        id: el.id || '',
        class: (el.getAttribute('class')||'').substring(0,60),
        rect: `${Math.round(r.width)}x${Math.round(r.height)}@(${Math.round(r.left)},${Math.round(r.top)})`,
        position: s.position,
        widthPx: Math.round(r.width),
        leftPx: Math.round(r.left),
      });
    });
    // Also check body-level fixed/sticky sidebars
    document.querySelectorAll('[class]').forEach(el => {
      const s = window.getComputedStyle(el);
      if ((s.position === 'fixed' || s.position === 'sticky') && s.display !== 'none') {
        const r = el.getBoundingClientRect();
        if (r.width > 40 && r.height > 200) {
          cols.push({
            tag: el.tagName,
            id: el.id || '',
            class: (el.getAttribute('class')||'').substring(0,60),
            rect: `${Math.round(r.width)}x${Math.round(r.height)}@(${Math.round(r.left)},${Math.round(r.top)})`,
            position: s.position,
            widthPx: Math.round(r.width),
            leftPx: Math.round(r.left),
          });
        }
      }
    });
    return cols.slice(0,80);
  }

  // ── NEW: Detect icon usage patterns ──────────────────────
  function getIconHints() {
    const hints = [];
    // Inline SVGs with aria-labels (nav icons, toolbar icons)
    document.querySelectorAll('svg[aria-label],svg[role="img"]').forEach(el => {
      const label = el.getAttribute('aria-label') || '';
      const vb = el.getAttribute('viewBox') || '';
      const w = el.getAttribute('width') || el.getBoundingClientRect().width;
      const h = el.getAttribute('height') || el.getBoundingClientRect().height;
      const paths = Array.from(el.querySelectorAll('path')).slice(0,2).map(p => (p.getAttribute('d')||'').substring(0,80));
      hints.push({ type: 'svg', label, viewBox: vb, size: `${Math.round(w)}x${Math.round(h)}`, paths });
    });
    // Unnamed SVGs inside nav/sidebar links
    document.querySelectorAll('nav svg, header svg, aside svg').forEach(el => {
      const parent = el.closest('[aria-label]');
      const label = parent ? parent.getAttribute('aria-label') : '';
      const vb = el.getAttribute('viewBox') || '';
      const r = el.getBoundingClientRect();
      if (r.width > 10) {
        const paths = Array.from(el.querySelectorAll('path')).slice(0,2).map(p => (p.getAttribute('d')||'').substring(0,80));
        hints.push({ type: 'nav-svg', parentLabel: label, viewBox: vb, size: `${Math.round(r.width)}x${Math.round(r.height)}`, paths });
      }
    });
    // Icon font usage (material-icons, fa, etc.)
    document.querySelectorAll('[class*="fa-"],[class*="material-icons"],[class*="icon-"]').forEach(el => {
      hints.push({ type: 'icon-font', class: (el.getAttribute('class')||'').substring(0,60), text: (el.innerText||'').trim().substring(0,20) });
    });
    return hints.slice(0,200);
  }

  // ── Image catalogue ────────────────────────────────────────
  function getImages() {
    const images = [];
    document.querySelectorAll('img').forEach(img => {
      const src = resolveUrl(img.getAttribute('src') || '');
      const srcset = (img.getAttribute('srcset') || '').split(',').map(s => {
        const p = s.trim().split(' '); p[0] = resolveUrl(p[0]); return p.join(' ');
      }).join(', ');
      images.push({ alt: img.getAttribute('alt')||'', src: src.substring(0,200), srcset: srcset.substring(0,300), width: img.getAttribute('width')||img.naturalWidth||img.offsetWidth, height: img.getAttribute('height')||img.naturalHeight||img.offsetHeight });
    });
    const bgImages = [];
    document.querySelectorAll('*').forEach(el => {
      try {
        const s = window.getComputedStyle(el);
        if (s.backgroundImage && s.backgroundImage !== 'none' && s.backgroundImage.includes('url(')) {
          const m = s.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
          if (m) bgImages.push({ el: el.tagName + (el.id ? '#'+el.id : ''), url: resolveUrl(m[1]).substring(0,200) });
        }
      } catch(e) {}
    });
    return { images: images.slice(0,500), bgImages: bgImages.slice(0,200) };
  }

  // ── CSS variables ─────────────────────────────────────────
  function getCssVars() {
    const vars = new Set();
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules||[]).forEach(rule => {
          if (rule.selectorText && [':root','html','body'].some(s => rule.selectorText.includes(s))) {
            const st = rule.style;
            for (let i=0; i<st.length; i++) {
              const p = st[i];
              if (p.startsWith('--')) { const v = st.getPropertyValue(p).trim(); if(v) vars.add(`${p}: ${v}`); }
            }
          }
        });
      } catch(e) {}
    });
    return Array.from(vars).slice(0,300);
  }

  // ── CSS Keyframes ───────────────────────────────────────
  function getKeyframes() {
    const kfs = new Set();
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules||[]).forEach(rule => {
          if (rule.type === CSSRule.KEYFRAMES_RULE || (rule.cssText && rule.cssText.startsWith('@keyframes'))) {
            kfs.add(rule.cssText);
          }
        });
      } catch(e) {}
    });
    return Array.from(kfs).slice(0,120);
  }

  // ── Font sources ──────────────────────────────────────────
  function getFontSources() {
    const s = new Set();
    document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
      if (l.href && (l.href.includes('fonts.googleapis') || l.href.includes('fonts.gstatic') || l.href.includes('typekit'))) s.add(l.href);
    });
    document.querySelectorAll('link[rel="preload"][as="font"]').forEach(l => s.add(l.href));
    // @font-face rules
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules||[]).forEach(rule => {
          if (rule.type === CSSRule.FONT_FACE_RULE) {
            const family = rule.style.getPropertyValue('font-family');
            const src = rule.style.getPropertyValue('src');
            s.add(`@font-face { font-family: ${family}; src: ${src}; }`);
          }
        });
      } catch(e) {}
    });
    return Array.from(s);
  }

  // ── SEO Metadata & Theme ──────────────────────────────────
  function getMetadata() {
    const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return {
      title: document.title || '',
      description: document.querySelector('meta[name="description"]')?.content || '',
      ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
      ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
      theme: isDark ? 'dark' : 'light'
    };
  }

  // ── Design tokens ─────────────────────────────────────────
  function getDesignTokens() {
    const colors = new Set(), fonts = new Set(), headings = [], buttons = [];
    document.querySelectorAll('*').forEach(el => {
      try {
        const s = window.getComputedStyle(el);
        const tag = el.tagName.toLowerCase();
        if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(s.backgroundColor);
        if (s.color && s.color !== 'rgba(0, 0, 0, 0)') colors.add(s.color);
        if (s.fontFamily) fonts.add(s.fontFamily.split(',')[0].trim());
        if (['h1','h2','h3','h4'].includes(tag)) {
          headings.push({ type:tag.toUpperCase(), text:(el.innerText||'').trim().substring(0,50).replace(/\n/g,' '), fontSize:s.fontSize, fontWeight:s.fontWeight, lineHeight:s.lineHeight, letterSpacing:s.letterSpacing, color:s.color, fontFamily:s.fontFamily.split(',')[0].trim() });
        }
        if (tag==='button' || (tag==='a' && (s.backgroundColor!=='rgba(0, 0, 0, 0)' || s.borderWidth!=='0px'))) {
          buttons.push({ text:(el.innerText||'').trim().substring(0,30).replace(/\n/g,' '), bg:s.backgroundColor, color:s.color, radius:s.borderRadius, padding:s.padding, border:s.border, fontSize:s.fontSize, fontWeight:s.fontWeight });
        }
      } catch(e) {}
    });
    return { colors: Array.from(colors), fonts: Array.from(fonts).slice(0,80), headings: headings.slice(0,80), buttons: [...new Map(buttons.map(b=>[`${b.bg}-${b.radius}`,b])).values()].slice(0,80) };
  }

  // ── Async Hover Simulation ─────────────────────────────────
  async function simulateHoversAndCapture() {
    const hoverResults = [];
    const targetEls = Array.from(document.querySelectorAll(
      'button, a, [role="button"], [aria-haspopup], [class*="group"], [class*="peer"], [role="menuitem"], li, [data-state], [aria-expanded], [is-active], [is-open], [data-expanded], [data-active], [aria-pressed], [data-visible], [data-show], [x-show], [aria-label*="Menu"], [aria-label*="menu"]'
    )).filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && !isHidden(el);
    }).slice(0, 180);

    for (const el of targetEls) {
      const label = el.getAttribute('aria-label') || el.innerText?.trim().substring(0, 30)?.replace(/\n/g, ' ') || '';
      const classStr = el.className && typeof el.className === 'string' ? el.className.substring(0, 30) : '';
      const identifier = `${el.tagName.toLowerCase()}${classStr ? '.'+classStr.replace(/\s+/g,'.') : ''} ${label ? `"${label}"` : ''}`.trim();

      // Style Diffing: Before
      const styleBefore = window.getComputedStyle(el);
      const propsToDiff = ['color', 'backgroundColor', 'transform', 'opacity', 'boxShadow', 'borderColor', 'borderRadius'];
      const beforeVals = {};
      propsToDiff.forEach(p => beforeVals[p] = styleBefore[p]);

      let addedOrChanged = false;
      const observedNodes = new Set();
      
      const observer = new MutationObserver((mutations) => {
        for (const mut of mutations) {
          if (mut.type === 'childList') {
            mut.addedNodes.forEach(n => {
              if (n.nodeType === 1) { observedNodes.add(n); addedOrChanged = true; }
            });
          } else if (mut.type === 'attributes') {
            if (['style', 'class', 'data-state', 'aria-expanded', 'is-active', 'is-open', 'data-expanded', 'data-active', 'aria-pressed', 'data-visible', 'data-show', 'x-show'].includes(mut.attributeName)) {
              observedNodes.add(mut.target);
              addedOrChanged = true;
            }
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class', 'data-state', 'aria-expanded', 'is-active', 'is-open', 'data-expanded', 'data-active', 'aria-pressed', 'data-visible', 'data-show', 'x-show'] });

      el.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));
      
      const hasToggleState = el.hasAttribute('data-state') || el.hasAttribute('aria-expanded') || el.hasAttribute('is-active') || el.hasAttribute('is-open') || el.hasAttribute('data-expanded') || el.hasAttribute('aria-pressed') || el.hasAttribute('data-visible') || el.hasAttribute('data-show') || el.hasAttribute('x-show') || (el.getAttribute('aria-label') || '').toLowerCase().includes('menu');
      if (hasToggleState && el.tagName !== 'A') {
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }

      try { el.focus({ preventScroll: true }); } catch(e){}
      el.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

      await new Promise(r => setTimeout(r, 60));

      // Style Diffing: After
      const styleAfter = window.getComputedStyle(el);
      const diffs = [];
      propsToDiff.forEach(p => {
        if (styleAfter[p] !== beforeVals[p]) {
          diffs.push(`${p.replace(/[A-Z]/g, m => '-'+m.toLowerCase())}: ${styleAfter[p]}`);
        }
      });

      observer.disconnect();

      if (addedOrChanged || diffs.length > 0) {
        const revealedStyles = [];
        const processed = new Set();
        observedNodes.forEach(node => {
          if (node.nodeType === 1 && document.body.contains(node)) {
            const r = node.getBoundingClientRect();
            if (r.width > 0 && r.height > 0 && !isHidden(node)) {
               const html = simplifyDom(node, 0, 4); 
               if (html && !processed.has(html)) {
                 revealedStyles.push(html);
                 processed.add(html);
               }
            }
          }
        });
        
        if (revealedStyles.length > 0 || diffs.length > 0) {
          let joined = revealedStyles.join('\n').trim();
          hoverResults.push({
            trigger: identifier,
            style_changes: diffs.join(' | '),
            revealed_html: joined.substring(0, 6000)
          });
        }
      }

      el.dispatchEvent(new PointerEvent('pointerout', { bubbles: true }));
      el.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
      el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
      
      if (hasToggleState && el.tagName !== 'A') {
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }

      try { el.blur(); } catch(e){}
      el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      
      await new Promise(r => setTimeout(r, 20));
    }

    return hoverResults;
  }

  function splitLongText(text, chunkSize) {
    const chunks = [];
    if (!text) return chunks;
    const safeSize = Math.max(20000, chunkSize || 120000);
    for (let i = 0; i < text.length; i += safeSize) {
      chunks.push(text.slice(i, i + safeSize));
    }
    return chunks;
  }

  // ── Assemble ──────────────────────────────────────────────
  const rootStyle = window.getComputedStyle(document.documentElement);
  const bodyStyle = window.getComputedStyle(document.body);
  
  const dynHoverData = await simulateHoversAndCapture();
  const fullDomSkeletonRaw = simplifyDom(document.body, 0, 40);
  const maxDomChars = 2000000;
  const fullDomSkeleton = fullDomSkeletonRaw.length > maxDomChars
    ? fullDomSkeletonRaw.substring(0, maxDomChars)
    : fullDomSkeletonRaw;
  const DOM_CHUNK_SIZE = 120000;
  const domChunkStrings = splitLongText(fullDomSkeleton, DOM_CHUNK_SIZE);
  const domChunks = domChunkStrings.map((content, idx) => ({
    id: `dom-chunk-${String(idx + 1).padStart(2, '0')}`,
    index: idx + 1,
    total: domChunkStrings.length,
    startChar: idx * DOM_CHUNK_SIZE,
    endChar: (idx * DOM_CHUNK_SIZE) + content.length,
    length: content.length,
    content,
  }));

  // Shallow outline for the prompt: keep only lines nested up to maxDepth.
  // The full-depth skeleton stays in the sidecar JSON (domChunks).
  function buildOutline(skeleton, maxDepth = 8, maxChars = 60000) {
    const maxIndent = maxDepth * 2;
    const out = [];
    let used = 0;
    let elided = false;
    for (const line of skeleton.split('\n')) {
      const trimmed = line.trimStart();
      if (!trimmed) continue;
      const indentLen = line.length - trimmed.length;
      if (indentLen > maxIndent) {
        if (!elided) {
          out.push(`${' '.repeat(maxIndent + 2)}…`);
          used += maxIndent + 4;
          elided = true;
        }
        continue;
      }
      elided = false;
      out.push(line);
      used += line.length + 1;
      if (used > maxChars) {
        out.push('… [outline truncated — read remaining structure from the sidecar JSON domChunks]');
        break;
      }
    }
    return out.join('\n');
  }
  const domOutline = buildOutline(fullDomSkeleton);

  // Map major sections to the chunk that contains them, so an agent can
  // fetch just the relevant chunk from the sidecar JSON per section.
  const sectionChunkMap = [];
  const sectionRe = /<(header|nav|main|section|footer|aside|article)\b[^\n>]*/g;
  let sectionMatch;
  while ((sectionMatch = sectionRe.exec(fullDomSkeleton)) !== null && sectionChunkMap.length < 80) {
    sectionChunkMap.push({
      snippet: sectionMatch[0].substring(0, 90),
      charIndex: sectionMatch.index,
      chunk: Math.floor(sectionMatch.index / DOM_CHUNK_SIZE) + 1,
    });
  }

  return {
    url: window.location.href,
    pageWidth: document.documentElement.scrollWidth,
    pageHeight: document.documentElement.scrollHeight,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    globalStyles: {
      root: { fontFamily: rootStyle.fontFamily, fontSize: rootStyle.fontSize, lineHeight: rootStyle.lineHeight, background: rootStyle.backgroundColor, color: rootStyle.color },
      body: { fontFamily: bodyStyle.fontFamily, fontSize: bodyStyle.fontSize, lineHeight: bodyStyle.lineHeight, background: bodyStyle.backgroundColor, color: bodyStyle.color },
    },
    metadata: getMetadata(),
    cssVars: getCssVars(),
    keyframes: getKeyframes(),
    fontSources: getFontSources(),
    tokens: getDesignTokens(),
    sectionRects: getSectionRects(),
    layoutColumns: getLayoutColumns(),
    iconHints: getIconHints(),
    hoverTargets: detectHoverTargets(),
    dynamicHoverData: dynHoverData,
    ...getImages(),
    styleTable: getStyleTable(),
    domOutline,
    sectionChunkMap,
    domSkeletonLength: fullDomSkeletonRaw.length,
    domSkeletonTruncated: fullDomSkeletonRaw.length > maxDomChars,
    domChunks,
  };
  } catch(err) {
    return { __error: err.message + ' | stack: ' + (err.stack || '').substring(0, 300) };
  }
}

// ============================================================
// buildPrompt — runs in popup context, builds a LEAN prompt.
// Full-fidelity data lives in the downloaded sidecar JSON;
// the prompt carries design tokens, layout rects, a shallow
// DOM outline + style dictionary, and a sidecar manifest so
// an agent can read full chunks on demand.
// ============================================================
function buildPrompt(d) {
  const j = (x) => JSON.stringify(x); // minified on purpose — saves ~30% vs pretty-print
  const cssVarsStr       = d.cssVars.join('\n') || 'None found.';
  const keyframesAll     = d.keyframes ? d.keyframes.join('\n\n') : '';
  const keyframesStr     = keyframesAll
    ? (keyframesAll.length > 12000 ? `${keyframesAll.substring(0, 12000)}\n/* … truncated — full keyframes in sidecar JSON (keyframes) */` : keyframesAll)
    : 'None found.';
  const fontLinks        = d.fontSources.join('\n') || 'None detected.';
  const uniqueFonts      = d.tokens.fonts.join(', ');
  const colorsStr        = d.tokens.colors.slice(0, 60).join(', ');
  const headingMap = new Map();
  for (const h of d.tokens.headings || []) {
    const key = `${h.type}|${h.fontSize}|${h.fontWeight}|${h.color}`;
    if (!headingMap.has(key)) headingMap.set(key, h); // keep first sample per unique style
  }
  const headingsStr      = j([...headingMap.values()]);
  const buttonsStr       = j(d.tokens.buttons);
  const sectionRectsStr  = j(d.sectionRects);
  const layoutColsStr    = j(d.layoutColumns);
  const hoverStr         = j((d.hoverTargets || []).slice(0, 80));
  const iconHintsStr     = j((d.iconHints || []).slice(0, 24));
  const imagesStr        = j((d.images || []).slice(0, 80).map(({ alt, src, width, height }) => ({ alt, src, width, height })));
  const bgImagesStr      = j((d.bgImages || []).slice(0, 40));
  const metaStr          = j(d.metadata);
  const dynHover         = (d.dynamicHoverData || []).slice(0, 40).map((h) => ({
    trigger: h.trigger,
    style_changes: h.style_changes,
    revealed_html: (h.revealed_html || '').substring(0, 1500),
  }));
  const dynHoverStr      = dynHover.length ? j(dynHover) : 'No dynamic elements revealed on hover.';
  const capturedShotsStr = j((d.capturedScreens || []).map((s) => s.filename));
  const capturePositionsStr = j((d.capturePlan && d.capturePlan.positions) || []);
  const styleTableStr    = (d.styleTable || []).join('\n') || 'None.';
  const sectionChunkMapStr = j(d.sectionChunkMap || []);
  const domChunkManifestStr = j((d.domChunks || []).map((c) => ({ id: c.id, index: c.index, total: c.total, startChar: c.startChar, endChar: c.endChar })));

  return `You are an expert at creating near-identical frontend replications from visual + structural references.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GOAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Replicate the UI in the attached screenshot with maximum visual and structural accuracy:
- Layout proportions, exact relative/absolute sizes, spacing ratios
- Typography scale (sizes, weights, line-heights, letter-spacing, font families)
- Colors and shades (backgrounds, text, borders, shadows, gradients)
- Icons and logos (exact shapes, colors, dimensions as shown in screenshot)
- Component structure (cards, grids, bento boxes — use REAL extracted sizes from RECT data)
- Hover/interactive states (dropdowns, popups — replicate structure & trigger reliably)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REFERENCES (priority order)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. SCREENSHOTS (attached, multiple viewport captures with overlap) — source of truth for proportions, colors, logos, hover states
2. EXTRACTED DATA (below) — design tokens, layout rects, DOM outline + style dictionary
3. SIDECAR JSON FILE — full-fidelity data (complete DOM, full image/icon/hover catalogues), read on demand. See SIDECAR section below.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXTRACTED PAGE DATA from ${d.url}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE DIMENSIONS:
- Scroll size: ${d.pageWidth}x${d.pageHeight}px | Viewport: ${d.viewportWidth}x${d.viewportHeight}px

CAPTURE OUTPUT:
- Sidecar JSON (in Downloads): ${d.rawExportFile || 'N/A'}
- Screenshots: ${capturedShotsStr}
- Capture scroll positions (y): ${capturePositionsStr}

SEO METADATA & THEME:
\`\`\`json
${metaStr}
\`\`\`

GLOBAL STYLES:
\`\`\`
html: font-family=${d.globalStyles.root.fontFamily} | font-size=${d.globalStyles.root.fontSize} | bg=${d.globalStyles.root.background} | color=${d.globalStyles.root.color}
body: font-family=${d.globalStyles.body.fontFamily} | font-size=${d.globalStyles.body.fontSize} | bg=${d.globalStyles.body.background} | color=${d.globalStyles.body.color}
\`\`\`

CSS VARIABLES:
\`\`\`
${cssVarsStr}
\`\`\`

CSS KEYFRAMES (Animations):
\`\`\`css
${keyframesStr}
\`\`\`

FONT SOURCES:
${fontLinks}

UNIQUE FONT FAMILIES: ${uniqueFonts}

HEADING SAMPLES:
\`\`\`json
${headingsStr}
\`\`\`

BUTTON/CTA SAMPLES:
\`\`\`json
${buttonsStr}
\`\`\`

COLOR PALETTE:
${colorsStr}

MAJOR SECTION RECTS (WxH at X,Y):
\`\`\`json
${sectionRectsStr}
\`\`\`

LAYOUT COLUMNS (sidebar widths, main content width, right panel):
\`\`\`json
${layoutColsStr}
\`\`\`
NOTE: Use widthPx and leftPx to infer column layout. Fixed/sticky elements are sidebars.
E.g., left sidebar widthPx~275, main content leftPx~298 widthPx~600, right panel widthPx~350.

IMAGE CATALOGUE (first 80, use ACTUAL URLs — not placeholders; full list incl. srcset in sidecar JSON under "images"):
\`\`\`json
${imagesStr}
\`\`\`

BACKGROUND IMAGES (first 40; full list in sidecar JSON under "bgImages"):
\`\`\`json
${bgImagesStr}
\`\`\`

HOVER TARGETS & HIDDEN ELEMENTS (first 80; full list in sidecar JSON under "hoverTargets"):
\`\`\`json
${hoverStr}
\`\`\`

DYNAMIC HOVER-REVEALED CONTENT (recorded by simulating hovers; revealed_html trimmed here — full HTML in sidecar JSON under "dynamicHoverData"):
\`\`\`json
${dynHoverStr}
\`\`\`
NOTE on hover types:
- "aria-popup-trigger": nav items with dropdown menus — use useState + onMouseEnter/Leave or Radix DropdownMenu
- "tailwind-group-peer": use CSS group/peer hover classes, NOT JS event handlers
- "data-state": Radix UI / Headless UI — replicate with Radix primitives (DropdownMenu, Popover, Dialog)
- "class-popover": position:absolute hidden elements that appear on trigger hover
- Transition hints: use "transition-dur" values to set matching CSS transition-duration

ICON HINTS (first 24 SVG paths + sizes; full list in sidecar JSON under "iconHints"):
\`\`\`json
${iconHintsStr}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOM NOTATION (applies to the DOM OUTLINE below and to domChunks in the sidecar JSON)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- s="S12" → computed styles for this element; look up S12 in the STYLE DICTIONARY
- before="S13" / after="S14" → pseudo-element styles (same dictionary)
- r="330x430@(20,100)" → real rendered rect: WIDTHxHEIGHT@(left,top)
- data-ui-hidden="1" → hidden element (likely hover/popup content)
- Inherited typography/color props (ff, fs, fw, lh, ls, color, text-align) are only listed where they CHANGE relative to the parent — resolve them down the tree.

STYLE DICTIONARY:
\`\`\`
${styleTableStr}
\`\`\`

DOM OUTLINE (shallow structure, depth ≤ 8 — full-depth DOM lives in the sidecar JSON):
\`\`\`
${d.domOutline || ''}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIDECAR JSON (progressive disclosure — do NOT load it all at once)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: ${d.rawExportFile || 'N/A'} (in the user's Downloads folder)
It contains everything in this prompt PLUS the full-depth DOM (domChunks[].content, ${(d.domChunks || []).length} chunk(s), total ${d.domSkeletonLength || 0} chars${d.domSkeletonTruncated ? ', truncated at capture' : ''}), complete image/icon/hover catalogues, and full hover-revealed HTML.

How to use it:
- If you can read files (agent/CLI): while building EACH section, read only the chunk(s) covering that section — use the SECTION→CHUNK MAP below. Never load the whole file into context.
- If you cannot read files: build from the DOM OUTLINE + screenshots; ask the user to paste a specific chunk if a section needs more structural detail.

SECTION → CHUNK MAP (where each major section starts in the full DOM):
\`\`\`json
${sectionChunkMapStr}
\`\`\`

DOM CHUNK MANIFEST:
\`\`\`json
${domChunkManifestStr}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SIZES & PROPORTIONS:
- YOU MUST USE EXACT PIXEL SIZES for all reproduced elements based on the r="WxH@(x,y)" rect values! (e.g. w-[330px], h-[430px])
- Do not use flexible responsive sizing (like w-full or flex-1) if the rect shows a strict fixed size for that component.
- Use LAYOUT COLUMNS data to set sidebar/content/right-panel widths (convert to Tailwind: w-[275px], max-w-[600px], etc.)
- Use r="" annotations for real pixel dimensions of EACH component and grid item.
- Use gridTemplateColumns/gap values for bento/grid layouts. Ensure column spans mimic the original sizes.

LOGOS & ICONS:
- For <img> elements: use the ACTUAL src URLs from the image catalogue
- Preserve width/height attributes (they're usually exact for logos)
- For SVG icons: use extracted path data from ICON HINTS where available
- Otherwise match to lucide-react equivalents: Home→<Home>, Search→<Search>, Bell→<Bell>,
  Mail→<Mail>, Sparkles→<Sparkles>(Grok), Bookmark→<Bookmark>, PlaySquare→<PlaySquare>(Creator),
  User→<User>, MoreHorizontal→<MoreHorizontal>, Repeat2→<Repeat2>, Heart→<Heart>, BarChart→<BarChart>
- All sidebar/nav icons: 24-26px, strokeWidth 2, line-style, color matching screenshot

HOVER & INTERACTIVE STATES:
- ANTI-FLICKER RULE: Never attach both onMouseEnter and onMouseLeave to two separate sibling elements
  for the same interaction. This causes the "enter child → leave parent" flicker bug.
  Instead use ONE of: (a) CSS :hover with a parent selector, (b) Tailwind group/group-hover classes,
  (c) a single wrapper element with onMouseEnter/Leave that controls shared state.
- Transition spec: use 150-200ms ease for all hover color/bg transitions (match transition-dur hints above)
- Sidebar nav items: on hover → background fill rounded-full, scale none (X.com style)
- Sidebar icon + label hover → color to #1d9bf0 blue only on some designs; bg fill pill on X
- Post action buttons (reply, repost, like): each has its own color theme on hover:
  reply→blue (#1d9bf0), repost→green (#00ba7c), like→pink (#f91880)
  Use CSS group-hover or a single parent hover class to change icon bg AND text color together.
- Dropdowns/popovers/Accordions (data-state="closed" -> "open", is-active, is-open): use useState isOpen or Radix primitives.
  You MUST replicate the exact animations (fade-in, slide-up, accordion-down) associated with toggle states ('data-state="open"', 'is-active', 'data-visible', etc) by looking at the 'anim:...' properties in the REVEALED CONTENT and matching them to the CSS KEYFRAMES. Code these animations precisely into tailwind.config.js and your components.
- For Radix-based UIs: use @radix-ui/react-dropdown-menu, @radix-ui/react-popover, @radix-ui/react-accordion with data-[state=open] and data-[state=closed] CSS selectors.
- DO NOT invent complex JS for simple CSS hovers — prefer Tailwind group/peer classes.

ANIMATION GUARDRAILS (prevent bugs):
- If CSS KEYFRAMES are provided, implement them in tailwind.config.js and bind them to the elements showing "anim:..." properties. If 'data-state="open"' reveals a specific animation, ALWAYS implement that animation block!
- Use transition: background-color 200ms ease (not transition: all) to avoid layout flicker
- Heart/like animation: use CSS @keyframes scale pop (scale 1→1.35→0.9→1 over 0.35s)
- Avoid transition on width/height changes — use opacity or visibility instead
- Do not use display:none in CSS transitions (use opacity:0 + pointer-events:none instead)
- Keep hover JS handlers simple: only set backgroundColor and color, nothing else

TYPOGRAPHY:
- Import detected font families from font sources
- Use exact heading samples for font-size, font-weight, letter-spacing

COLORS:
- Use exact computed colors from the palette
- CSS variables listed above — use them where appropriate

OUTPUT STACK: React + Tailwind CSS
- WORKFLOW: Plan the page from the DOM OUTLINE + SECTION RECTS, then build section by section. Pull full detail for the current section from the sidecar JSON chunks (see SIDECAR section) — never all chunks at once.
- REACT MODULARIZATION: You MUST look for \`data-react-component="..."\` annotations in the DOM outline / sidecar chunks. If they exist, extract those HTML structures into actual React components with those exact names (e.g., \`export function NavigationMenu() {...}\`, \`export function PricingCard() {...}\`).
- shadcn/ui components where natural (Button, Card, NavigationMenu)
- lucide-react for icons when no SVG data available
- tailwind.config.js snippet for custom colors/fonts
- Responsive & mobile-first (sm:640, md:768, lg:1024, xl:1280)
- Semantic HTML5 (nav, header, main, section, footer)
- Implement <Head> or standard metadata exports using the provided SEO METADATA
- Wrap exactly in "dark" class globally if the extracted theme is "dark"
- Do NOT invent content — replicate exactly what's visible
- Production-ready, modular, and clean code

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Visual & structural analysis (key observations)
2. tailwind.config.js customizations
3. Full component code (split into sub-components if complex)
4. Notes: captured vs inferred (hover states, icons, sizes)

Generate the replication now.`;
}
