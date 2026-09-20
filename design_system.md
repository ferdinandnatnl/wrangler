# Design system

This is the project-level source of truth for reusable UI patterns captured
through Wrangler. Before creating a component, read this file and reuse the
closest documented tokens and implementation. When a new capture extends an
existing role, update that role instead of creating a duplicate pattern.

After implementing a captured component, update this file with the stable
visual contract, supported states, accessibility behavior, and usage example.
Keep unrelated component entries intact.

## Components

### `chatbot-input`

Role: a single-line prompt field with a compact submit action.

Source reference: [Mistral Vibe](https://mistral.ai/products/vibe/), captured
as `div.js-chat-input` on 2026-09-11. The capture is visual reference only;
the source page content and selectors are not part of this contract.

Implementation in the blank canvas:

- Component runtime: `examples/blank-canvas/design-system.js`
- Tokens and styles: `examples/blank-canvas/design-system.css`
- Live preview: `examples/blank-canvas/app.js`

#### Anatomy

1. White surface with an 8px inset and a 14px radius.
2. Content row with an 8px gap and 12px leading inset.
3. Flexible single-line text input.
4. 32px square submit button with a 6px radius and a replaceable spark icon.

#### Visual contract

- Maximum width: 540px; default height: 48px.
- Surface: `--ds-color-surface-primary`.
- Text: `--ds-color-text-primary`.
- Placeholder: `--ds-color-text-placeholder`.
- Action: `--ds-color-action-primary` with a 150ms standard color transition.
- Shadow: `--ds-shadow-chatbot-input`.
- Typography: 16px body text, 24px line height, with -0.16px letter spacing.
- The component becomes fluid within its parent below the desktop max width.

#### States and behavior

- Empty: show the configured placeholder and keep the submit affordance
  available.
- Filled: preserve the entered value and submit it through `onSubmit`.
- Hover: change only the submit button surface on fine pointers.
- Pressed: use the action active token.
- Focus-visible: show a visible ring around the input surface/button.
- Disabled: disable both controls and expose native disabled semantics.
- Loading: disable submission, expose `aria-busy`, and show a functional
  progress indicator; stop its animation when reduced motion is requested.
- Error: expose `aria-invalid`, associate `errorMessage` with the input, and
  show the message in addition to the error outline.
- Responsive: keep the input at 16px on narrow screens to avoid iOS zoom, and
  preserve a usable 32px submit target.

#### Usage contract

```js
h(ChatbotInput, {
  placeholder: "Ask me anything...",
  label: "Chat message",
  onSubmit: (message, event) => sendMessage(message, event),
});
```

`value`/`onChange` provide controlled usage; `defaultValue` provides
uncontrolled usage. Pass `loading`, `disabled`, and `errorMessage` from the
request state. Use `submitIcon` to provide an approved product icon when the
default spark glyph is not appropriate. Do not hardcode page URLs, capture
coordinates, or source-page selectors into this component.

## Capture workflow

1. Capture a component and name its role, such as `button` or
   `chatbot-input`.
2. The handoff prompt tells the coding agent to read this file before making
   changes.
3. The coding agent reuses or extends the existing entry and implementation,
   then records the new contract here.
4. Future captures of the same role should consult this entry first and only
   add a new pattern when the existing component cannot satisfy the product
   requirement.
