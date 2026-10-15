# Design-System Gaps

`docs/website-blueprint.md` is the single source of truth for every visual decision. Where the site needed something the blueprint does not define, the value was **extrapolated from existing tokens** and marked `[GAP]` in `src/styles/tokens.css`. Add or adjust each item below in the blueprint, then update the matching token.

| # | Gap | What the site uses now | Where | Suggested addition to the blueprint |
|---|---|---|---|---|
| 1 | **Breakpoints**: only "desktop 12-col / mobile 4-col" are defined | Mobile-first ladder: `640 / 768 / 1024 / 1280px` | All stylesheets | A breakpoint table (sm / md / lg / xl) |
| 2 | **Semantic colours**: none defined (error, success, warning) | Error `#FF8FA3` (≈ 9.1:1 on Midnight Ink, tested), success = Cyber Lime | Contact form | Error / success / warning tokens with contrast pairs |
| 3 | **Inverse button** for lime, Aurora and white surfaces (a lime button disappears on lime) | `btn--inverse`: Midnight Ink fill, white text | CTA banner, Contact "Book a meeting" card | A 4th button variant |
| 4 | **Accent word on light sections**: the Aurora fill would put lime on white (§4.1 ❌) | Plum Shadow `#5B3A78` solid (≈ 9.1:1 on white) | `.section--light .accent` | A rule for the headline accent on light surfaces |
| 5 | **Accent word on the Aurora CTA** | Midnight Ink serif italic | `.cta-banner__title .accent` | Same as #4 |
| 6 | **Drop shadows**: only glass + Signal glow are defined | `--shadow-float` (menus) and `--shadow-card-light` (cards on white) | Mega-menu, use-case cards | An elevation scale for light and dark surfaces |
| 7 | **Intermediate type sizes** (H4/card titles, lead copy, small/meta, micro) | `--text-h4` 18→21px, `--text-body-lg` 17→21px, `--text-small` 15px, `--text-micro` 12px | Cards, leads, captions | Extend the §4.2 type table |
| 8 | **Inner-page H1 size**: the display size (96–140px) is too large for long inner-page titles | `--text-display-sm` 40→88px | `.page-hero__title` | A "display-sm" role |
| 9 | **Hero H1 size**: 140px would push the CTAs below the fold at 1440×900 | Home hero capped at 108px | `.hero__title` | Confirm the maximum display size per viewport height |
| 10 | **Z-index scale** | grain 1 · header 50 · menu 60 · cursor 100 | tokens.css | A layering scale |
| 11 | **Form input styling**: §12 lists behaviours, not visuals | 52px height, 12px radius, white-12 border, lavender focus ring | Contact form | Input radius, height and states |
| 12 | **Font choice**: "Clash Display *or* Space Grotesk" | Space Grotesk (free via Google Fonts, already the heading face) | Global | Lock the display face; Clash Display would need self-hosting and a licence |
| 13 | **Chip on light surfaces** | `chip--plum` (white on Plum, ≈ 9.1:1) | Use-case tags | A light-surface chip variant |
| 14 | **Live status semantics**: the header clock needed an "offline" state | Lavender dot + "Back at 09:00 your time" outside Mon–Fri 08:00–19:00 visitor-local | Header, Contact | Copy and colour for offline status |

## Brief vs. blueprint decisions to confirm

- **Entity statement**: the blueprint's canonical sentence says "India-based outsourcing company". The new brief positions Akrostech as a "backend operations partner" and doesn't mention India, so `src/config.mjs → brand.entity` uses that framing. India appears only as the origin of the hero globe’s Signal arcs. Pick one wording and use it everywhere (§10.2).
- **Insights section**: the blueprint includes `/insights`, but the brief's page list doesn't. It isn't built, and nothing links to it.
- **WebGL globe on mobile**: the blueprint suggests a pre-rendered video on mobile. The site uses the same lightweight globe (cobe, ~6 KB gzipped) at reduced detail, and skips WebGL entirely on Save-Data. The CSS poster stays in place until WebGL is ready.
- **Copyright year**: the brief asked for "© 2025". The footer renders the build year (currently 2026) so it never goes stale.
