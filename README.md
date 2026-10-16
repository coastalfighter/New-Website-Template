# Akrostech — Website

The marketing site for **Akrostech**, the backend operations partner for growing companies. It has 12 static pages (Home, About, Services, 5 service pages, Contact, Privacy, Terms, 404). The HTML, CSS and JavaScript are plain and framework-free, generated from typed data by a zero-dependency Node script.

> **Design source of truth:** [`docs/website-blueprint.md`](docs/website-blueprint.md), with the client's v2 direction layered on top: a strictly white canvas, black text, flowing Cyber Lime + Digital Lavender elements, gradient-highlighted words, and Bricolage Grotesque + Geist type. Every value maps to a token in `src/styles/tokens.css`. Overrides and gaps are listed in [`docs/DESIGN-GAPS.md`](docs/DESIGN-GAPS.md).

## The experience at a glance

| Page | Interactive hero |
|---|---|
| Home | Light WebGL globe with Lavender "Signal" arcs, the five services orbiting it (hover pauses, chips link to the service pages), a word cycler and live regional clocks |
| About | Draggable 24-hour dial ("We chose your clock"). Drag or use the arrow keys, and it tells you whether the team is online at that hour |
| Services | Five expanding pillars that open on hover or focus |
| Web Development | A code editor types a page while the live preview builds alongside it |
| Recruitment | Candidates flow through a live hiring pipeline; the counters tick up |
| Virtual Assistance | A to-do list that clears itself. Click a task to hand it over, and the hours-saved counter rises |
| Accounting | A revenue chart that grows in. Hover a month to inspect it |
| Legal | A contract reviewed clause by clause, with attorney notes |
| Contact | A dot field that ripples from the cursor around the visitor's live local time |
| Privacy / Terms / 404 | A shield that watches the cursor, a fanned document stack, and "404" digits that scatter |

**On every page:**
- Soft lime and lavender ribbons drift behind the content and travel with the scroll (`flow.js`).
- A gradient "Signal" line draws itself down the full page as you read.
- Key words get a highlighter swipe when they appear.

**Footer (identical everywhere):**
- A kinetic marquee whose speed and direction follow your scrolling.
- A cursor spotlight.
- A variable-weight wordmark that swells toward the pointer.
- Copy-email with a toast, live regional desk clocks, and back-to-top with a progress ring.

---

## Quick start

```bash
npm ci          # installs the 3 vendored runtime libs (GSAP, Lenis, cobe) — no other deps
npm run dev     # builds to ./dist and serves http://localhost:4173
npm test        # builds, then runs 118 unit + build-output tests (node:test)
```

Requires **Node 20+**. `./dist` is committed, so the site can be deployed as-is without a build step.

## Deploy

| Host | Steps |
|---|---|
| **Vercel** | Import the repo. `vercel.json` sets the build command, `dist` output, trailing slashes and all security headers. |
| **Netlify** | Import the repo. `netlify.toml` builds to `dist`, and `dist/_headers` applies the headers. |
| **Cloudflare Pages** | Build command `npm run build`, output directory `dist` (`_headers` is honoured). |
| **Any static host / S3 + CloudFront** | Upload the contents of `dist/`. Set `404.html` as the error document and copy the headers from `dist/_headers`. |

Set `SITE_URL` (see `.env.example`) to your production origin before building. It drives canonical URLs, Open Graph tags, JSON-LD, `sitemap.xml`, `robots.txt` and `llms.txt`.

## Project structure

```
├── build.mjs                  # Static site generator (zero deps)
├── src/
│   ├── config.mjs             # Brand, contact details, nav, regions — edit once, updates everywhere
│   ├── data/
│   │   ├── services.mjs       # All 5 services: copy, deliverables, process, use cases, FAQs, SEO
│   │   └── content.mjs        # Stats, testimonials, values, team, FAQs (placeholders flagged)
│   ├── components/
│   │   ├── layout.mjs         # <head>/SEO/Open Graph, flow layer, header + mega-menu + mobile dialog, interactive footer, schema
│   │   ├── hero-visuals.mjs   # The unique interactive centrepiece for every page
│   │   ├── ui.mjs             # Button, section head, page hero, FAQ, CTA banner, cards, Signal…
│   │   └── icons.mjs          # 1.5px-stroke icon set (§11.3)
│   ├── pages/                 # home · about · services · service (template) · contact · legal
│   ├── lib/                   # html escaping helpers, .env loader
│   ├── styles/                # tokens → base → layout → flow → components → heroes → sections → pages → footer → motion
│   └── scripts/               # Browser ES modules (copied to dist/assets/js)
│       ├── main.js
│       └── modules/           # flow · heroes · footer · nav · reveal · counters · clocks · globe · pointer · carousel · scroll · form · validation · confetti
├── public/                    # Favicons, OG image, logo (copied verbatim)
├── scripts/
│   ├── serve.mjs              # Local preview server (clean URLs, real 404, prod headers)
│   └── brand-assets.mjs       # Regenerates OG image + PNG icons (needs Playwright)
├── tests/                     # validation.test.mjs · site.test.mjs
├── docs/                      # Design system blueprint + gap log
├── dist/                      # ← deployable output (generated)
├── vercel.json · netlify.toml · .env.example
```

## Editing content

- **Copy for a service** lives in `src/data/services.mjs`. Wrap one headline word in `*asterisks*` to get the signature serif-italic Aurora accent.
- **Contact details, socials and booking link** live in `src/config.mjs`.
- **Stats, testimonials and team** live in `src/data/content.mjs`.
- After editing, run `npm run build` (or `npm run dev`) and commit `dist/`.

## Connecting the contact form

Submissions are validated client-side (`src/scripts/modules/validation.js`, which is unit-tested) and are currently **logged to the console**. To go live, replace `deliver()` in `src/scripts/modules/form.js` with a `fetch()` to your endpoint, for example a serverless function, Formspree, HubSpot or Resend. Then:

1. Add your endpoint's origin to `connect-src` in the CSP (`build.mjs → contentSecurityPolicy()`).
2. Update `vercel.json` with the CSP string the build prints. A test fails until the two match.
3. **Re-validate on the server.** Client-side checks are for UX only. Reuse `validateSubmission()` from `validation.js`, which is DOM-free.
4. Add rate limiting and a CAPTCHA (Turnstile or hCaptcha) at the endpoint. The form already includes a honeypot field.

## Motion & accessibility

- Motion follows §5 of the blueprint: Lenis smooth scroll, GSAP ScrollTrigger (the Signal rail is scrubbed through the process steps), split-text headlines, counter roll, magnetic CTAs, 3D tilt and spotlight cards, a custom cursor, marquees, a WebGL globe with Signal arcs, and cross-document View Transitions.
- **Everything is progressive enhancement.** Without JS the content is fully visible. With `prefers-reduced-motion`, smooth scroll, parallax, tilt, the cursor, marquees and auto-rotation are all off, and gentle fades remain.
- Accessibility: WCAG 2.2 AA token contrast is unit-tested, every page has a skip link, there is exactly one H1 per page with no skipped heading levels, and the visible focus ring is lavender 3px. The mobile menu is built on `<dialog>`, which provides a native focus trap and Escape handling. The mega-menu supports Escape and arrow keys. Form errors appear in a linked error summary and inline, and are announced to screen readers.

## Before launch — replace placeholders

| What | Where |
|---|---|
| Stats (500+ projects, 98% retention, 50+ team, 12+ industries) | `src/data/content.mjs → stats` |
| Testimonials (real, **written permission**) | `content.mjs → testimonials` |
| Team names, roles, photos, LinkedIn URLs | `content.mjs → team`, `pages/about.mjs` |
| Client logos ("Client 1…8") | `content.mjs → clients` |
| Phone, address, booking URL, social URLs | `src/config.mjs` |
| Google Maps embed | `pages/contact.mjs → .map-placeholder` (`frame-src` already allows google.com) |
| Privacy Policy & Terms (draft templates) | `pages/legal.mjs` — **have counsel review** |
| Claims to verify: onboarding speed ("within days"), team credentials (law degrees, US GAAP/IFRS training), backup cover | `services.mjs`, `content.mjs` FAQs |
| Analytics + cookie consent (if added) | Update the CSP and the privacy page |
