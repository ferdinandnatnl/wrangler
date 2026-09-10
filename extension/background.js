// background.js

// Shared capture logic (in-page functions, capture plan, prompt builder).
// The full-capture workflow runs HERE, not in the popup: Chrome closes
// extension popups on any focus loss (e.g. dismissing the download bubble),
// which used to kill the capture mid-flight.
importScripts('capture-core.js');

// All captures go through one gate: Chrome rejects more than
// MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND (2) captureVisibleTab calls in a
// rolling second, so calls are serialized and spaced >=600ms apart no matter
// which path (full capture, grab menu, popup) asks for one.
const CAPTURE_MIN_INTERVAL_MS = 600;
const GRAB_MODE_BY_TAB_KEY = "grabModeByTab";
let lastCaptureAt = 0;
let captureChain = Promise.resolve();

function captureVisibleTabOnce(windowId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(windowId || null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) {
        reject(new Error(chrome.runtime.lastError?.message || "Failed to capture viewport screenshot."));
        return;
      }
      resolve(dataUrl);
    });
  });
}

function captureVisiblePromise(windowId) {
  const run = captureChain.then(async () => {
    const wait = lastCaptureAt + CAPTURE_MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    try {
      return await captureVisibleTabOnce(windowId);
    } catch (err) {
      if (/MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND/i.test(err.message)) {
        await sleep(1000);
        return await captureVisibleTabOnce(windowId);
      }
      throw err;
    } finally {
      lastCaptureAt = Date.now();
    }
  });
  captureChain = run.then(() => {}, () => {});
  return run;
}

function captureVisible(windowId, sendResponse) {
  captureVisiblePromise(windowId)
    .then((dataUrl) => sendResponse({ success: true, dataUrl }))
    .catch((err) => sendResponse({ success: false, error: err.message }));
}

function downloadUrl(url, filename, sendResponse) {
  chrome.downloads.download(
    {
      url,
      filename,
      saveAs: false,
    },
    (downloadId) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      sendResponse({ success: true, downloadId, filename });
    }
  );
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read blob as data URL."));
    reader.readAsDataURL(blob);
  });
}

async function cropDataUrlToRect(dataUrl, rect, viewportMeta = {}) {
  const rectX = Number(rect?.x) || 0;
  const rectY = Number(rect?.y) || 0;
  const rectW = Number(rect?.width) || 0;
  const rectH = Number(rect?.height) || 0;

  if (!Number.isFinite(rectW) || !Number.isFinite(rectH) || rectW <= 0 || rectH <= 0) {
    throw new Error("Invalid crop rect.");
  }

  const imgResponse = await fetch(dataUrl);
  const blob = await imgResponse.blob();
  const fullBmp = await createImageBitmap(blob);

  const viewportWidth = Number(viewportMeta?.viewportWidth || rect?.viewportWidth) || 0;
  const viewportHeight = Number(viewportMeta?.viewportHeight || rect?.viewportHeight) || 0;
  const viewportOffsetX = Number(viewportMeta?.viewportOffsetX || rect?.viewportOffsetX) || 0;
  const viewportOffsetY = Number(viewportMeta?.viewportOffsetY || rect?.viewportOffsetY) || 0;

  const scaleX = viewportWidth > 0 ? fullBmp.width / viewportWidth : 1;
  const scaleY = viewportHeight > 0 ? fullBmp.height / viewportHeight : 1;

  const scaledX = (rectX + viewportOffsetX) * scaleX;
  const scaledY = (rectY + viewportOffsetY) * scaleY;
  const scaledW = rectW * scaleX;
  const scaledH = rectH * scaleY;

  const cropX = Math.max(0, Math.min(Math.round(scaledX), fullBmp.width - 1));
  const cropY = Math.max(0, Math.min(Math.round(scaledY), fullBmp.height - 1));
  const cropW = Math.max(1, Math.min(Math.round(scaledW), fullBmp.width - cropX));
  const cropH = Math.max(1, Math.min(Math.round(scaledH), fullBmp.height - cropY));

  const croppedBmp = await createImageBitmap(fullBmp, cropX, cropY, cropW, cropH);
  const canvas = new OffscreenCanvas(cropW, cropH);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(croppedBmp, 0, 0);
  const croppedBlob = await canvas.convertToBlob({ type: "image/png" });
  return blobToDataUrl(croppedBlob);
}

function captureElementImage(request, sendResponse) {
  captureVisiblePromise(null)
    .then(async (dataUrl) => {
      try {
        const croppedDataUrl = await cropDataUrlToRect(dataUrl, request.rect, request);
        sendResponse({ success: true, dataUrl: croppedDataUrl });
      } catch (err) {
        // Graceful fallback to full viewport image
        sendResponse({ success: true, dataUrl, note: `Crop failed: ${err.message}` });
      }
    })
    .catch((err) => sendResponse({ success: false, error: err.message || "Capture failed." }));
}

// ============================================================
// Full capture workflow — survives popup close. Progress and the
// final prompt live in chrome.storage.local under "captureState".
// ============================================================

let captureKeepAlive = null;

async function setCaptureState(patch) {
  const store = await chrome.storage.local.get({ captureState: {} });
  const next = { ...store.captureState, ...patch, updatedAt: Date.now() };
  await chrome.storage.local.set({ captureState: next });
  return next;
}

function downloadUrlPromise(url, filename) {
  return new Promise((resolve, reject) => {
    chrome.downloads.download({ url, filename, saveAs: false }, (downloadId) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(downloadId);
    });
  });
}

async function runFullCapture(tabId, windowId) {
  // Periodic trivial API call so Chrome doesn't idle-kill this service
  // worker during the long in-page extraction step.
  captureKeepAlive = setInterval(() => {
    chrome.runtime.getPlatformInfo(() => {});
  }, 20000);

  try {
    await setCaptureState({
      status: 'running',
      step: 'Preparing page...',
      prompt: '',
      error: '',
      files: [],
      startedAt: Date.now(),
      finishedAt: 0,
    });

    const prep = await runInTab(tabId, inPagePrepareForCapture);
    if (!prep || prep.__error) {
      throw new Error(prep?.__error || 'Failed to prepare page for capture.');
    }

    const capturePlan = computeCapturePlan(prep);
    const stamp = Date.now();
    const files = [];
    for (let i = 0; i < capturePlan.positions.length; i += 1) {
      const y = capturePlan.positions[i];
      await setCaptureState({ step: `Capturing viewport ${i + 1}/${capturePlan.positions.length}...` });

      const scrolled = await runInTab(tabId, inPageScrollToY, [y]);
      if (scrolled?.__error) throw new Error(scrolled.__error);
      await sleep(220);

      const dataUrl = await captureVisiblePromise(windowId);
      const filename = `ui-clone-viewport-${String(i + 1).padStart(2, '0')}-y${Math.round(y)}-${stamp}.png`;
      const downloadId = await downloadUrlPromise(dataUrl, filename);
      files.push({ index: i + 1, y, filename, downloadId });
      await sleep(60);
    }

    await setCaptureState({ step: 'Extracting full page data...', files });
    const extraction = await chrome.scripting.executeScript({
      target: { tabId },
      func: extractPageData,
    });
    const data = extraction?.[0]?.result;
    if (!data) throw new Error('Extraction returned no data — the page may have blocked script injection.');
    if (data.__error) throw new Error(`Page extraction failed: ${data.__error}`);

    data.capturePlan = capturePlan;
    data.capturedScreens = files;
    data.captureTimestamp = new Date().toISOString();

    await setCaptureState({ step: 'Saving raw JSON export...' });
    const rawFilename = `ui-clone-data-${stamp}.json`;
    const jsonDataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    await downloadUrlPromise(jsonDataUrl, rawFilename);
    data.rawExportFile = rawFilename;

    await setCaptureState({ step: 'Building prompt...' });
    const prompt = buildPrompt(data);

    await setCaptureState({
      status: 'done',
      step: `Captured ${files.length} views, saved ${rawFilename}. Prompt ready — click Copy Prompt.`,
      prompt,
      finishedAt: Date.now(),
    });
  } catch (err) {
    await setCaptureState({ status: 'error', error: err.message, finishedAt: Date.now() });
  } finally {
    clearInterval(captureKeepAlive);
    captureKeepAlive = null;
    try {
      await runInTab(tabId, inPageRestoreAfterCapture);
    } catch (restoreErr) {
      // Page may have navigated/closed mid-capture; nothing to restore.
    }
  }
}

function getGrabModeStorage() {
  // Session storage survives service-worker restarts without turning the mode
  // into a permanent browser-wide preference. The local fallback supports
  // older Chromium builds while retaining the same per-tab shape.
  return chrome.storage.session || chrome.storage.local;
}

async function getGrabModeEnabled(tabId) {
  if (!Number.isInteger(tabId)) return false;
  const storage = getGrabModeStorage();
  const store = await storage.get({ [GRAB_MODE_BY_TAB_KEY]: {} });
  return Boolean(store[GRAB_MODE_BY_TAB_KEY]?.[String(tabId)]);
}

async function setGrabModeEnabled(tabId, enabled) {
  if (!Number.isInteger(tabId)) throw new Error("Missing tabId for grab mode.");
  const storage = getGrabModeStorage();
  const store = await storage.get({ [GRAB_MODE_BY_TAB_KEY]: {} });
  const byTab = { ...(store[GRAB_MODE_BY_TAB_KEY] || {}) };
  if (enabled) {
    byTab[String(tabId)] = true;
  } else {
    delete byTab[String(tabId)];
  }
  await storage.set({ [GRAB_MODE_BY_TAB_KEY]: byTab });
}

async function clearGrabModeForTab(tabId) {
  await setGrabModeEnabled(tabId, false);
}

chrome.runtime.onInstalled.addListener(async () => {
  // Remove the legacy global preference. Leaving it behind would make older
  // content scripts appear enabled in every open tab until the next reload.
  await chrome.storage.local.remove?.("grabModeEnabled");
});

chrome.tabs.onRemoved?.addListener((tabId) => {
  void clearGrabModeForTab(tabId);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_FULL_CAPTURE") {
    if (!request.tabId) {
      sendResponse({ success: false, error: "Missing tabId." });
      return true;
    }
    chrome.storage.local.get({ captureState: {} }).then(({ captureState }) => {
      const running = captureState.status === "running" && Date.now() - (captureState.startedAt || 0) < 10 * 60 * 1000;
      if (running) {
        sendResponse({ success: true, alreadyRunning: true });
        return;
      }
      // Intentionally not awaited: respond immediately, work continues
      // in the service worker even if the popup closes.
      runFullCapture(request.tabId, request.windowId);
      sendResponse({ success: true, started: true });
    });
    return true;
  }

  if (request.action === "GET_GRAB_MODE") {
    const tabId = Number.isInteger(request.tabId) ? request.tabId : sender.tab?.id;
    getGrabModeEnabled(tabId)
      .then((enabled) => sendResponse({ success: true, enabled }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (request.action === "SET_GRAB_MODE") {
    const tabId = Number.isInteger(request.tabId) ? request.tabId : sender.tab?.id;
    const enabled = Boolean(request.enabled);
    setGrabModeEnabled(tabId, enabled)
      .then(async () => {
        // A popup has no sender tab, so explicitly update only the active tab's
        // content script. An in-page toggle already updated its own local UI.
        if (sender.tab?.id !== tabId) {
          try {
            await chrome.tabs.sendMessage(tabId, { action: "GRAB_MODE_CHANGED", enabled });
          } catch (err) {
            // Restricted or loading pages may not have a content script yet.
          }
        }
        sendResponse({ success: true, enabled, tabId });
      })
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (request.action === "CAPTURE_VISIBLE") {
    captureVisible(request.windowId, sendResponse);
    return true;
  }

  if (request.action === "DOWNLOAD_DATA_URL") {
    if (!request.dataUrl || !request.filename) {
      sendResponse({ success: false, error: "Missing dataUrl or filename." });
      return true;
    }
    downloadUrl(request.dataUrl, request.filename, sendResponse);
    return true;
  }

  if (request.action === "CAPTURE_AND_DOWNLOAD") {
    captureVisible(request.windowId, (capRes) => {
      if (!capRes?.success || !capRes.dataUrl) {
        sendResponse(capRes || { success: false, error: "Capture failed." });
        return;
      }
      const filename = request.filename || `ui-clone-viewport-${Date.now()}.png`;
      downloadUrl(capRes.dataUrl, filename, sendResponse);
    });
    return true;
  }

  if (request.action === "CAPTURE_ELEMENT_IMAGE") {
    if (!request.rect) {
      sendResponse({ success: false, error: "Missing rect for element capture." });
      return true;
    }
    captureElementImage(request, sendResponse);
    return true;
  }

  if (request.action === "GRAB_ELEMENT") {
    captureElementImage(request, (captureRes) => {
      if (!captureRes?.success || !captureRes.dataUrl) {
        sendResponse(captureRes || { success: false, error: "Capture failed." });
        return;
      }

      if (request.download === false) {
        sendResponse(captureRes);
        return;
      }

      chrome.downloads.download(
        {
          url: captureRes.dataUrl,
          filename: `ui-grab-component-${Date.now()}.png`,
          saveAs: false,
        },
        (downloadId) => {
          if (chrome.runtime.lastError) {
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
            return;
          }
          chrome.storage.local.set({
            lastGrabData: {
              label: request.label,
              timestamp: Date.now(),
            },
          });
          sendResponse({ success: true, downloadId });
        }
      );
    });
    return true;
  }

  return false;
});
