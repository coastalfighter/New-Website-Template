# Design-System Gaps & Overrides

`docs/website-blueprint.md` defines the palette, motion tokens and component patterns. **Client direction v2** then overrode its dark-first visual direction:

> Strictly white background · black text · Cyber Lime + Digital Lavender as flowing elements and gradient-highlighted text · modern, stylish fonts · a unique interactive hero on every page · an interactive footer, the same on every page.

Every override and every value the blueprint does not define is marked `[GAP]` in `src/styles/tokens.css` and listed below, so the blueprint can be updated to match.

## Client v2 overrides of the blueprint

| Blueprint says | Site now does | Why |
|---|---|---|
| Midnight Ink canvas, 60/30/10 dark ratio (§4.1) | **White canvas**; Ink is used only for text and primary buttons | Client v2 |
| Aurora gradient *filled into* headline text (§4.2) | Black text on a **Lime → Lavender highlighter stroke** (`.hl`) that swipes in on reveal | Lime text on white is 1.1:1 (§4.1 ❌). The marker keeps black text readable (17:1 on Lime, 6.6:1 on Lavender) |
| Space Grotesk / Instrument Serif / Inter / JetBrains Mono (§4.2) | **Bricolage Grotesque** (display, variable 200–800, optical sizing) · **Geist** (body) · **Geist Mono** (labels) | Client v2: "modern and stylish" |
| Glassmorphism on dark (§4.3) | Frosted **white** glass (`rgba(255,255,255,.62)` + 20px blur) over the flowing colour layer | Same idea, light surface |
| WebGL globe on a dark sphere (§5.3 #3) | Light globe: white sphere, ink dots, Lavender Signal arcs, Lime/Plum markers | Sits naturally on white |
| Film grain overlay (§4.4) | Removed | Grain greys a white canvas |
| Straight `#CFFF04 → #B57EDC` Aurora gradient | Gradient passes through pale tints (`#E9FF8F`, `#E7D2F5`) | A direct sRGB blend of the two passes through khaki/beige |

## Gaps the blueprint does not cover

| # | Gap | What the site uses now |
|---|---|---|
| 1 | **Breakpoints** | Mobile-first: `640 / 768 / 1024 / 1280px` |
| 2 | **Readable neutrals on white**: Mist `#A7A7B8` is 2.3:1 on white | Graphite `#4B4B5C` (secondary, 8.2:1) and Slate `#6B6B7D` (tertiary, 5.3:1). Mist is used for decoration only |
| 3 | **Semantic colours** | Error `#B3203F` (tested ≥ 4.5:1 on white). Success uses Plum or Lime chips |
| 4 | **Button on white**: a lime button has no visible edge on white | Primary = ink pill with a Lime→Lavender sweep on hover; Secondary = ink outline |
| 5 | **Elevation scale** | `--shadow-sm / md / lg` and a Lime/Lavender `--shadow-glow` |
| 6 | **Intermediate type sizes** (H4, lead, small, micro) | `--text-h4`, `--text-body-lg`, `--text-small`, `--text-micro` |
| 7 | **Display sizes**: 140px pushes the home CTAs below the fold | Home H1 up to 104px; inner-page H1 up to 104px via `--text-display-sm` |
| 8 | **Z-index scale** | flow 0 · content 1 · header 50 · menu 60 · cursor 100 |
| 9 | **Form inputs** | 54px height, 14px radius, ink focus border with a Lime focus halo |
| 10 | **Live-status colour** | Lime dot = online, Lavender dot = off-hours |

## Brief vs. blueprint decisions to confirm

- **Entity statement**: the blueprint says "India-based outsourcing company"; the site uses the brief's "backend operations partner" framing. Pick one and use it everywhere (§10.2).
- **Insights section**: in the blueprint, not in the brief. Not built.
- **Copyright year**: rendered from the build date so it never goes stale.
