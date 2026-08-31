# Living Brand Board — Sage Design System

A step-by-step for turning the Sage token system (colours, type, spacing) into an interactive BBC-style cover. Think: the cover *is* the design system — hover a swatch and it tells you its hex, click type to hear the weight scale, drag the grid to feel the spacing rhythm.

Ship it as **Brand / Living board** in Storybook (`stories/Brand/LivingBoard.tsx`). Fonts are **Rethink Sans** (wordmark + UI) and **Spectral** (body) — never Petrona or Inter.

---

## 1. Decide the cover's job

Before anything visual, pin down the three reads:

- **5-second read** — "this is Sage." Brand mark, name, one signature colour (navy), the Rethink Sans headline.
- **30-second read** — "here's the system." Visible swatches, type ramp, spacing grid, all live tokens.
- **5-minute read** — "I can use it." Click anything → get the token name, hex/px, CSS variable, copy button.

Write these three reads on a sticky before you open Figma. Every element on the cover serves one of them.

## 2. Audit the tokens you actually have

Open `.storybook/src/tokens/colors.ts` (and `typography.ts`, `spacing.ts`) — not a drifted HTML dump. Group them into the families that will become panels:

- Status & Action (navy `interactive.default` for 14px UI; cyan `status.primary` decorative only; sage, warning, error, success on-surface vs chart brights)
- Brand (dark-blue, accent, black, dark-grey, foreground, white, highlight-yellow, dark-red, dark-green)
- Data viz (the `--data-*` hues)
- Typography (Rethink Sans UI, Spectral body, JetBrains Mono — weights and sizes; heading1 = 36px … heading6 = 14px)
- Spacing / radius / layout (`layout.fieldSm`, `fieldMd`, `card`, `readable`, `toast`; `borderRadius.button` = 32px pill)

The audit *is* the content of the board. Don't invent — surface what exists.

## 3. Sketch the BBC-style layout

The BBC pattern is: bold wordmark top-left, a tight modular grid below, every cell a different "block" of the system, generous whitespace between blocks, one accent colour ties it together. For Sage:

- **Row 1** — Wordmark "Sage" in Rethink Sans 600 at ~120px, tagline in Spectral underneath, version chip.
- **Row 2** — Colour wall: a 6×N grid of swatches, biggest tiles for the brand core (navy interactive, sage, cream, accent), smaller for data viz. Cyan is labelled decorative.
- **Row 3** — Type ramp: pageTitle → heading1–6 → body → label, each line labelled with its token and px.
- **Row 4** — Spacing & radius: a row of squares scaling 4 / 8 / 12 / 16 / 24 / 32 / 48px; a row of radius samples including `button` 32px pill.
- **Row 5** — Footer: "built with" credits, link to Storybook, last-updated date.

Use a 12-col grid, 24px gutter, brand-foreground (`#EDE6DE`) background, brand-black text.

## 4. Make the swatches interactive

For each colour tile, the interaction layers go:

- **Resting** — just the colour fill and a tiny token name in the corner (e.g. `interactive.default`).
- **Hover** — tile lifts (4px translateY, warm `shadow-ghibli-md`), reveals hex + CSS-var + Tailwind class.
- **Click** — copies the value (hex by default, modifier-click for the variable name), confirmation toast.
- **Keyboard** — Tab order matches reading order, Enter copies, focus ring in `--highlight-yellow`.

Implement with one delegated click listener on the grid; read `data-token` and `data-hex` off the tile.

## 5. Make typography feel alive

Avoid the dead "here are six headings" wall. Instead:

- Each line is editable (`contenteditable`) so a visitor can type their own product name into the H1 and see how Rethink Sans handles it.
- A slider above the ramp scales every line in unison so you can preview at any base size.
- Hover a line → side panel shows `font-family / weight / size / line-height / letter-spacing` and a copy-to-clipboard button.
- Include a "lorem" toggle that swaps to real Sage copy (mission statement, button labels) so the type is shown in context.

## 6. Make spacing and radius tactile

Two ideas worth stealing from BBC's R&D microsites:

- **Spacing pills** — draggable. Click and drag a pill to feel its width; the readout updates live (`16px → 1rem → space-4`).
- **Radius dial** — a single square with a slider underneath; drag to morph from 0 → full, snapping to the tokens (4/8/12/16/`button`/full). Shows you the named token at each snap point.

## 7. Wire the data layer

Don't hardcode the visuals twice. One source of truth:

- Import from `.storybook/src/tokens` (or export JSON from that module).
- Render swatches, type lines, spacing pills from that object in a single `forEach`. Adding a token later means adding one JSON entry.
- This is what makes the board "living" — it stays in sync with the system instead of drifting.

## 8. Add the BBC-style polish

Small details that sell it:

- **Cursor** — custom cursor over swatches that picks up the tile's colour as it moves (small filled circle that inherits `background-color`).
- **Motion** — stagger swatch fade-in on load (50ms each, top-left to bottom-right). On scroll, parallax the wordmark slightly.
- **Theme switch** — Storybook Theme toolbar (light / dark). Dark surfaces are `brand.black`; filled Primary is cream on black because navy is ~1.9:1 on that surface. Do not use cyan labels.
- **Print mode** — `@media print` collapses to a static one-pager with all values inline. Useful as a takeaway.

`ghibli-brand-aesthetic.html` is a Petrona archive — do not link it from the Sage cover as the type system.

## 9. Accessibility pass

Non-negotiable, since this is the front door:

- Every swatch needs a visible label *and* an `aria-label` with the token name and hex.
- Contrast: the corner labels must hit AA against their tile. Use white on dark tiles, brand-black on light ones — compute the pick from luminance, don't eyeball it.
- Focus states use `--highlight-yellow` outline (3px) — never rely on colour change alone.
- Respect `prefers-reduced-motion`: skip the stagger and parallax.
- Tab through the whole board with no mouse and confirm copy-to-clipboard works on Enter.

## 10. Ship it

- Storybook story `Brand / Living board` is the canonical board.
- `sage-design-tokens.html` is a static token dump in Rethink + Spectral — keep it in sync with `colors.ts`.
- Screenshot the cover for the README hero.

---

## Build order (suggested half-day)

1. JSON / module token export (30 min)
2. Static layout + grid (60 min)
3. Swatch interactions + copy-to-clipboard (45 min)
4. Type ramp + editable + slider (45 min)
5. Spacing/radius interactions (30 min)
6. Motion, cursor, theme switch (45 min)
7. A11y pass + print mode (30 min)
8. Storybook + CI wiring (30 min)
