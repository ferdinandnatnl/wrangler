# Luma Discover Preview

This page contains the React + Tailwind implementation of the captured Luma
Discover page component, including its top navbar, event grid, categories,
featured calendars, local city tabs, and footer. It also includes the local
design-system preview for the reusable `ChatbotInput` component.

Open `index.html` directly, or serve this folder with any static web server.

## Chatbot input design system

The component lives in `design-system.js`, with semantic tokens and styles in
`design-system.css`. The captured default is intentionally represented as the
`ChatbotInput` default state rather than as page-specific markup:

```js
h(ChatbotInput, {
  placeholder: "Ask me anything...",
  label: "Chat message",
  onSubmit: (message) => sendMessage(message),
});
```

Anatomy: surface, content row, text input, and submit button. The public
states are empty, filled, error, disabled, and loading. The submit button
supports hover, pressed, and focus-visible behavior; the input surface keeps a
visible focus ring and preserves a 16px mobile input size to avoid iOS zoom.

`onSubmit` receives the current string and the native submit event. Use
`errorMessage` for an announced, visible error, `loading` while the request is
in flight, and `disabled` when the control cannot be used. `value`/`onChange`
can be used for controlled inputs; `defaultValue` is available for uncontrolled
usage. The optional `submitIcon` replaces the default spark glyph.

The captured desktop dimensions are tokenized as a 540px maximum width and a
48px control height. The component becomes fluid within its parent at smaller
widths. The dark token set is opt-in through `[data-theme="dark"]`; the canvas
itself continues to use the existing light Luma fixture theme.

The project-level capture record is [design_system.md](../../design_system.md).
The extension handoff prompt asks the receiving coding agent to read and update
that file whenever a new design-system capture is implemented.
