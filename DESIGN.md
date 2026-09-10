# Design System

`http://localhost:5173/products` is the source of truth for product design decisions. At the time this document was written, that route redirects unauthenticated users to the public HERRO landing experience at `/?next=%2Fproducts`; use that live page as the canonical visual reference.

Do not use the local Supabase clone styling as the design target for this workspace. The live `/products` page defines a different product: HERRO, an AI sales agent for marketplace commerce.

## Product Direction

HERRO should feel like a polished commerce operating system, not a generic AI landing page. The visual language is premium, calm, and dashboard-native: a cinematic dark hero, white text, glass panels, compact SaaS controls, and concrete marketplace examples.

The audience is merchants and operators who sell across marketplaces and chat channels. Design choices should make the agent feel active, practical, and revenue-oriented.

## Brand Voice

- Direct, confident, and merchant-focused.
- Use plain commerce language: orders, messages, channels, marketplaces, revenue, customers.
- Keep Indonesian commerce context where shown in the product demo: `Rp`, `jt`, casual chat replies such as `Oke kak`, and marketplace categories.
- Avoid abstract AI jargon unless it is tied to a visible workflow.

## Core Palette

Use the HERRO landing page palette as the default visual system.

- Page background: white shell for authenticated app views, cinematic dark/black landing background for public hero sections.
- Hero foreground: `#FFFFFF`.
- Primary dark text: `oklch(0.145 0 0)` or near `#222222`.
- Muted text on dark: `rgba(255,255,255,0.55)` to `rgba(255,255,255,0.8)`.
- Glass border: `rgba(255,255,255,0.10)`; subtle border: `rgba(255,255,255,0.06)`.
- Glass card fill: `rgba(15, 23, 42, 0.5)`.
- Light overlay fill: `rgba(255,255,255,0.03)` to `rgba(255,255,255,0.08)`.
- Primary blue accent: `#2363EB`.
- Blue highlight text: `#5B9BFF`.
- Success green: `#22c55e` / Tailwind `emerald-400`.
- Neutral app borders: `oklch(0.922 0 0)` or Tailwind `slate-200`.

Avoid reverting to the Supabase green-on-black palette from `supabase-clone`.

## Typography

- Primary font: Geist variable.
- Signature/accent font: Caveat, used sparingly for founder signature moments.
- Hero H1: medium weight, tight tracking, `30px` mobile, `42px` small screens, `48px` desktop, line-height around `1.1`.
- Section H2: medium weight, `30px` to `40px`, line-height around `1.15`.
- Body copy: `14px` mobile, `17px` to `18px` desktop, relaxed line-height.
- Dashboard labels and metrics: compact, often `11px` to `15px`, with clear hierarchy through weight and opacity.

## Layout

- Public landing sections are centered in a max-width column, generally `max-w-5xl` for hero/demo content and `max-w-7xl` for manifesto content.
- Hero content sits over a full-viewport dark visual background with top nav overlaid.
- Use generous vertical rhythm: hero top padding around `pt-32` mobile, `pt-52` desktop; major content blocks separated by `48px` to `96px`.
- The product demo appears directly under the hero CTAs and should remain a first-viewport signal where possible.
- Bento feature grids use `grid-cols-1` on mobile and `md:grid-cols-4` on desktop with tight `12px` gaps.

## Components

### Navigation

- Overlay nav on the dark hero.
- Items: `Features`, `Integrations`, `ROI`, `Security`, `Pricing`, plus `Launch Agent`.
- Dropdown-capable items use small animated chevrons.
- Navigation should stay lightweight and not compete with the hero.

### Status Pill

- Use a compact rounded rectangle with dark translucent fill, subtle white border, blur, and a pulsing emerald dot.
- Canonical copy: `Agent is live`.

### Primary CTA

- Primary CTA copy: `Try for free`.
- Use the existing liquid button treatment where available.
- Rounded corner: about `9px`.
- Secondary CTA copy: `Talk to founder`, white fill, dark text, no heavy border.
- Buttons should use subtle active scale and opacity transitions.

### Chatbot Demo

The live demo is central to the visual identity. Preserve these traits:

- Vertical examples: Retail, Clinic, F&B, Hospitality, Florist.
- Chat content should feel real, local, and merchant-specific.
- Include timestamps and active status cues.
- Keep the demo compact enough to read as a product surface, not a decorative mockup.

### Feature Bento

Feature bento section headline:

`Everything your agent needs, in one dashboard`

Supporting copy:

`Feed it knowledge, connect your channels, and watch it sell your product while you sleep.`

Use four glass cards:

- AI Knowledge Base: file upload/training visual with progress states.
- Auto Follow-Ups: quiet customer recovery activity.
- Recovered Sales: revenue metric, `Rp 12.4jt`, `+32% vs last month`.
- Link All Your Accounts: marketplace/channel connection status.

Cards use rounded `16px` corners, `24px` padding, blur, white translucent borders, and a deep shadow. Glow is acceptable when subtle and tied to blue or green product activity.

## Motion

- Motion should imply an active agent: pulsing live dot, scan/progress bars, count-up metrics, hover border changes, and small button scale on press.
- Keep transitions short and functional, roughly `150ms` to `600ms`.
- Avoid decorative motion that does not communicate product state.

## Authenticated App Shell

For authenticated `/products`, `/materials`, and related workspace routes:

- Use a white app background.
- Use compact full-height layouts with sidebar navigation.
- Fullscreen catalog/workspace views should use `overflow-hidden p-0`.
- Standard settings/content pages may use scrollable padding: `p-4 sm:p-5 md:p-6`.
- Use shared primitives from the app system: `.btn`, `.card`, `.badge`, `.input`.

## Implementation Notes

- The live page currently runs from `/Users/felixmichael/HERRO_1/frontend`, while this workspace contains `supabase-clone`. Treat the live localhost page as higher authority than local clone files.
- Preserve Google font usage: Geist for product UI, Caveat for signature accent.
- Preserve HERRO title casing and punctuation: `HERRO — AI Sales Agent`.
- When in doubt, compare against `http://localhost:5173/products` with `/browse` before changing layout, copy, or visual tokens.
