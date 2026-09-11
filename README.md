```
██      ██ ██████▒     ▒██▒    ███   ██    ▒████▒  ██        ████████  ██████▒
██░    ░██ ███████▓    ▓██▓    ███   ██   ▓██████  ██        ████████  ███████▓
██▒    ▒██ ██   ▒██    ████    ███▒  ██  ▒██▒  ░█  ██        ██        ██   ▒██
▓█▒ ██ ▒█▓ ██    ██    ████    ████  ██  ██▒       ██        ██        ██    ██
▒█▓░██ ██▒ ██   ▒██   ▒█▓▓█▒   ██▒█▒ ██  ██░       ██        ██        ██   ▒██
▒██░██░██▒ ███████▒   ▓█▒▒█▓   ██ ██ ██  ██        ██        ███████   ███████▒
░██▒██▒██░ ██████▓    ██  ██   ██ ██ ██  ██  ████  ██        ███████   ██████▓
 ██▓▓▓▓██░ ██  ▓██░   ██████   ██ ▒█▒██  ██░ ████  ██        ██        ██  ▓██░
 ███▒▒███  ██   ██▓  ░██████░  ██  ████  ██▒   ██  ██        ██        ██   ██▓
 ███░░███  ██   ▒██  ▒██  ██▒  ██  ▒███  ▒██▒  ██  ██        ██        ██   ▒██
 ███  ███  ██    ██▒ ███  ███  ██   ███   ███████  ████████  ████████  ██    ██▒
 ▓██  ███  ██    ███ ██▒  ▒██  ██   ███    ▒████░  ████████  ████████  ██    ███

```
 
Wrangler is a Chrome extension for grabbing a UI component from the current
page and handing it to an AI coding or computer-use agent.

## Repository layout

```text
background.js           Background service worker
capture-core.js         Shared capture and prompt logic
component-grab.js       In-page Grab Mode controller
manifest.json           Chrome extension manifest
popup.html / popup.js   Extension popup UI
examples/blank-canvas/  Small local page for trying Grab Mode
tests/                  Node-based regression tests
```

## Quick start

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Choose **Load unpacked** and select this repository folder.
4. Open a web page, open Wrangler, and turn on **Grab Mode**.
5. Click a component or drag around it, then choose **Copy for Codex**, **Copy
   for Computer Use**, or **Copy Design System**. The design-system option asks
   you to name the component (for example, `button`) before copying a prompt to
   create or update the current project's design system.

Run the regression tests from the repository root with:

```bash
node --test tests/*.test.mjs
```

Grab Mode is scoped to the current tab. Each copy action captures a screenshot
and component JSON, then saves both files under:

```text
~/Downloads/wrangler-capture-history/<capture-id>/
```

The nested download path creates the history folder automatically the first
time it is used. No separate folder or AI-agent setup is required.

## Current status

- **Grab Mode** — available for click and drag selection.
- **Copy for Codex** — saves visual and structural references and copies a
  ready-to-use handoff prompt.
- **Copy for Computer Use** — saves the same references and copies a prompt
  for locating the component in the live browser.
- **Copy Design System** — asks for the component role, saves the same
  references, and copies a prompt to create or update the current project's
  reusable design-system component and tokens.
- **Multi-Capture + Full Extract** — coming soon.

## Known limitations

### Viewport overfitting

The main risk is that the clone becomes *overfit to one viewport*, usually the
laptop/browser width used as the reference. It may look extremely accurate
there, but break or feel awkward on:

- wider monitors
- smaller laptops
- tablets and phones
- different browser zoom or fonts
- longer or different content

Treat the captured dimensions as a precise reference, not as a substitute for
responsive design. Test the generated implementation at the sizes and content
lengths your product needs.

### Referenced images and icons

Wrangler extracts image URLs, SVG hints, and other asset references from the
source component. That is useful for visual fidelity, but it is also a risk:

- a URL may be private, temporary, authenticated, or blocked by CORS;
- an asset may change or disappear after the capture;
- the reference may use third-party or copyrighted artwork;
- an AI agent may reproduce an asset that you do not have permission to ship.

Review every extracted image and icon before shipping a clone. Replace remote
or restricted assets with local assets that you own or are licensed to use.

It is strongly advised to replace copied logos, icons, images, and other
branded material with your own original or properly licensed alternatives.
Do not use Wrangler for illegal activities, deception, unauthorized copying,
or other uses that violate copyright, trademark, privacy, or applicable law.
You are responsible for reviewing the captured material and the final output
before using or publishing it; this project is not legal advice.

Capture JSON and screenshots can also contain page content, URLs, and
authenticated-session context. Keep the local capture-history folder private
and do not commit it to a public repository.
