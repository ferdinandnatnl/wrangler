import React, { useState } from 'react';

/**
 * NOTE: Chrome extensions CANNOT run raw .jsx files without a build step (like Webpack or Vite). 
 * For your extension to be "ready-to-run" immediately from the Chrome Extensions dashboard, 
 * I provided the vanilla popup.js and popup.html equivalent which drops right in.
 * 
 * If you ever decide to set up Vite, this is the exact React version of the popup script.
 */
export default function Popup() {
  const [status, setStatus] = useState('Ready to clone.');
  const [isError, setIsError] = useState(false);

  const handleExtract = async () => {
    setStatus('Extracting...');
    setIsError(false);

    try {
      // 1. Download
      const bgResponse = await chrome.runtime.sendMessage({ action: "CAPTURE_AND_DOWNLOAD" });
      if (!bgResponse?.success) {
        throw new Error(bgResponse?.error || "Failed to capture screenshot");
      }

      // 2. Find Tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab.url || tab.url.startsWith('chrome://')) {
        throw new Error("Cannot run on restricted pages.");
      }

      // 3. Extract & Copy
      chrome.tabs.sendMessage(tab.id, { action: "EXTRACT_FOR_CLIPBOARD" }, async (response) => {
        if (chrome.runtime.lastError) {
          setIsError(true);
          setStatus("Could not connect. Refresh the webpage.");
          return;
        }

        if (response?.textPrompt) {
          await navigator.clipboard.writeText(response.textPrompt);
          setIsError(false);
          setStatus('✅ Success! Image downloaded & prompt copied.');
        } else {
          throw new Error("Did not receive prompt data from page.");
        }
      });
    } catch (err) {
      setIsError(true);
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="w-[250px] p-4 font-sans text-center bg-gray-50 m-0">
      <h2 className="text-lg font-bold mb-3 mt-0">Wrangler</h2>
      <button 
        onClick={handleExtract}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-3 transition"
      >
        Capture & Extract UI
      </button>
      <div className={`text-sm min-h-[20px] leading-tight ${isError ? 'text-red-500' : 'text-emerald-500 font-medium'}`}>
        {status}
      </div>
    </div>
  );
}
