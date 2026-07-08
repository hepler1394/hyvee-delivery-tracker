# Hy-Vee Delivery Tracker — theme.md

## Scene sentence
A closer at Hy-Vee Lee's Summit #1380 sits at the back-office PC after the last van rolls in, drops the day's MTO printouts into the tracker, and reads the week's tips back like a receipt — who drove, how many orders, what they made. The interface should feel like a well-kept ledger book, not a SaaS dashboard: quiet, legible, employee-owned, competent.

## Register
Product / tool (design serves the task). Restrained color strategy: tinted neutrals + one accent. Familiarity is a feature — the tool disappears into the work.

## Color tokens (OKLCH intent; hex shipped for reach)
One accent — Hy-Vee red — carries brand, primary actions, current selection, and state. Everything else is a neutral ramp. Body ink clears 4.5:1 on its surface in both themes.

Light:
- `--bg-0` #FFFFFF · `--bg-1` #F8F8F8 · `--bg-2` #F1F1F1 · `--bg-3` #E8E8E8
- `--txt-0` #111 · `--txt-1` #262626 · `--txt-2` #444 · `--txt-3` #5F5F5F (labels sit at txt-1/txt-2, not txt-3, after the de-eyebrow pass)
- `--red` #CC0000 · `--red-dk` #A30000 (accent, ≤ ~10% of surface)
- `--success` #1A7A4A · `--warn` #B45309 · `--info` #1A5FA3 (semantic states only)
- `--line` / `--line-2` / `--line-3`: hairline → structural borders

Dark (`body.dark`):
- `--bg-0` #141417 · `--bg-1` #1C1C21 · `--bg-2` #25252B · `--bg-3` #2F2F37
- `--txt-0` #F2F2F4 … `--txt-3` #8C8C96 · `--red` #F05050
- Driver-colored figures (ledger amounts, dots, comparison names) get `filter: brightness(1.4) saturate(.85)` so a stored driver color like #CC0000 stays legible on dark surfaces.

Driver identity = a saturated dot + colored figure, never a stripe.

## Type
Pairing on the proportional-vs-mono contrast axis — one type family in two cuts that share DNA yet read distinctly, ideal for a data/receipt tool:
- **UI / headings:** `IBM Plex Sans` (400/500/600/700)
- **Numbers / data / metadata:** `IBM Plex Mono` (400/500/600/700), `font-variant-numeric: tabular-nums`
- Base 13px (dense utility). Fixed px scale, not fluid clamp.
- Headings: `.week-title` 20/700, `.sch-h2` 19/700, section/card titles 12–13/600. Display letter-spacing -0.02em on large headings, -0.005em on labels (never wider than 0). `text-wrap: balance` on h1–h3.
- **No tracked uppercase eyebrows.** Section, panel, and card titles are sentence case. Uppercase survives only where it's a genuine data convention: table column headers (tracking 0.3px) and status/badge chips.

## Icons
Real inline SVG only (stroke, 24-grid, `currentColor`). No emoji as icons. Status/identity shown with small filled dots, not stripes.

## Motion
- 140–500ms, `ease` / ease-out; state feedback only (hover, selection, progress fill, drawer). No page-load choreography.
- Determinate progress bars animate `width` intentionally.
- `@media (prefers-reduced-motion: reduce)` collapses transitions to ~0 and disables smooth scroll (already in place).

## Banned (this project)
Side-stripe borders (border-left/right >1px accent) · inset side-stripe box-shadows · hero-metric KPI-card templates for the weekly view (replaced by the tip ledger) · tracked uppercase eyebrows above sections · gradient/neon/glow text · colored "glow" drop shadows · glassmorphism as default · emoji icons · cream/sand near-white "warm" body bg.

Exceptions, intentional: the **printed route sheet** and the **exported weekly summary** (separate paper/PDF documents) keep Arial/Helvetica and a print scan-stripe on day headers — correct for print, not the app chrome.

## Voice
Plain, shift-floor, first-person-plural ("Add a driver, then parse a printout to log this week's tips"). Employee-owned, unfussy. Numbers do the talking; labels stay short and lowercase.
