// ============================================================
// popup.js — Wrangler
// Thin UI controller. The capture workflow runs in the
// background service worker (background.js + capture-core.js)
// so it survives the popup closing — Chrome closes extension
// popups on ANY focus loss (e.g. dismissing the download
// bubble), which used to kill the capture mid-flight.
// ============================================================

const statusEl = document.getElementById('status');
const manualCopyArea = document.getElementById('manualCopyArea');
const copyPromptBtn = document.getElementById('copyPromptBtn');
const extractBtn = document.getElementById('extractBtn');

function isCaptureStateActive(state) {
  if (!state || !state.status) return false;
  if (state.status === 'running') return true;
  // Keep showing a finished/errored capture for 10 minutes so the user
  // can reopen the popup and grab the prompt.
  return Date.now() - (state.finishedAt || 0) < 10 * 60 * 1000;
}

function renderCaptureState(state) {
  if (!state || !state.status) return;

  if (state.status === 'running') {
    extractBtn.disabled = true;
    statusEl.textContent = `${state.step || 'Working...'} — safe to close this popup, the capture keeps running in the background.`;
    statusEl.className = '';
    copyPromptBtn.style.display = 'none';
    return;
  }

  // Full-page multi-capture is intentionally not available in this release.
  // Keep showing any previously started capture, but do not re-enable the
  // coming-soon control when the stored state changes.
  extractBtn.disabled = true;

  if (state.status === 'done') {
    statusEl.textContent = `✅ ${state.step || 'Capture finished.'}`;
    statusEl.className = 'success';
    if (state.prompt) {
      copyPromptBtn.style.display = 'block';
      manualCopyArea.style.display = 'block';
      manualCopyArea.value = state.prompt;
    }
    return;
  }

  if (state.status === 'error') {
    statusEl.textContent = `❌ ${state.error || 'Capture failed.'}`;
    statusEl.className = 'error';
    copyPromptBtn.style.display = 'none';
  }
}

async function copyPrompt() {
  const { captureState } = await chrome.storage.local.get({ captureState: {} });
  if (!captureState?.prompt) return;
  try {
    await navigator.clipboard.writeText(captureState.prompt);
    statusEl.textContent = '✅ Prompt copied to clipboard.';
    statusEl.className = 'success';
  } catch (clipErr) {
    manualCopyArea.style.display = 'block';
    manualCopyArea.value = captureState.prompt;
    manualCopyArea.select();
    statusEl.textContent = '⚠️ Clipboard blocked — select & copy manually below.';
    statusEl.className = 'error';
  }
}

extractBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('chrome-extension://')) {
      throw new Error(`Cannot run on extension or settings pages. (URL: ${tab?.url || 'unknown'})`);
    }
    statusEl.textContent = 'Starting capture in background...';
    statusEl.className = '';
    manualCopyArea.style.display = 'none';
    copyPromptBtn.style.display = 'none';

    const res = await chrome.runtime.sendMessage({ action: 'START_FULL_CAPTURE', tabId: tab.id, windowId: tab.windowId });
    if (!res?.success) throw new Error(res?.error || 'Failed to start capture.');
    if (res.alreadyRunning) {
      statusEl.textContent = 'A capture is already running — progress below.';
    }
  } catch (err) {
    statusEl.textContent = `❌ ${err.message}`;
    statusEl.className = 'error';
    console.error('[Wrangler]', err);
  }
});

copyPromptBtn.addEventListener('click', copyPrompt);

// Live progress while the popup is open; the state itself lives in
// chrome.storage.local so it survives the popup being closed.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.captureState) renderCaptureState(changes.captureState.newValue);
});

chrome.storage.local.get({ captureState: null }).then(({ captureState }) => {
  if (captureState) renderCaptureState(captureState);
});

// ============================================================
// Component Grab Toggle
// ============================================================
const grabToggle = document.getElementById('grabToggle');

async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!Number.isInteger(tab?.id)) throw new Error('Could not identify the active tab.');
  return tab.id;
}

async function getGrabModeState() {
  const tabId = await getActiveTabId();
  const response = await chrome.runtime.sendMessage({ action: 'GET_GRAB_MODE', tabId });
  if (!response?.success) {
    throw new Error(response?.error || 'Failed to read grab mode state.');
  }
  return Boolean(response.enabled);
}

async function setGrabModeState(enabled) {
  const tabId = await getActiveTabId();
  const response = await chrome.runtime.sendMessage({ action: 'SET_GRAB_MODE', tabId, enabled });
  if (!response?.success) {
    throw new Error(response?.error || 'Failed to update grab mode.');
  }
  return Boolean(response.enabled);
}

async function setGrabModeStatus(enabled) {
  const statusEl = document.getElementById('status');
  if (!statusEl) return;

  // Don't overwrite live capture progress / a fresh finished capture.
  const { captureState } = await chrome.storage.local.get({ captureState: null });
  if (isCaptureStateActive(captureState)) return;

  if (enabled) {
    statusEl.textContent = 'Grab mode is on. Click a part, or drag around a whole component.';
    statusEl.className = 'success';
  } else {
    statusEl.textContent = 'Step 1: Turn on Grab Mode to begin.';
    statusEl.className = '';
  }
}

if (grabToggle) {
  (async () => {
    try {
      const enabled = await getGrabModeState();
      grabToggle.checked = enabled;
      await setGrabModeStatus(enabled);
    } catch (err) {
      const statusEl = document.getElementById('status');
      if (statusEl) {
        statusEl.textContent = `❌ ${err.message}`;
        statusEl.className = 'error';
      }
    }
  })();

  grabToggle.addEventListener('change', async () => {
    const enabled = grabToggle.checked;
    const statusEl = document.getElementById('status');

    try {
      const actual = await setGrabModeState(enabled);
      grabToggle.checked = actual;
      await setGrabModeStatus(actual);
    } catch (err) {
      grabToggle.checked = !enabled;
      if (statusEl) {
        statusEl.textContent = `❌ ${err.message}`;
        statusEl.className = 'error';
      }
    }
  });
}
