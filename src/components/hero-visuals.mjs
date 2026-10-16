/**
 * Hero visuals — a unique, interactive centrepiece for every page.
 * Markup only; behaviour lives in src/scripts/modules/heroes.js keyed by
 * the hero's data-hero variant. Every visual is complete and meaningful
 * without JavaScript (static final state).
 */
import { esc, each } from '../lib/html.mjs';
import { icon } from './icons.mjs';
import { services } from '../data/services.mjs';
import { regions, hub } from '../config.mjs';

/* ── HOME · Living globe with the five services in orbit ─────────────── */
export function homeOrbit() {
  const globeData = esc(JSON.stringify({ hub: hub.location, targets: regions.map((r) => r.location) }));
  return `<div class="orbit" data-orbit>
    <div class="orbit__halo" aria-hidden="true"></div>
    <div class="globe" data-globe="${globeData}" aria-hidden="true">
      <div class="globe__poster"></div>
      <canvas class="globe__canvas" data-globe-canvas></canvas>
    </div>
    <svg class="orbit__path" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="50" rx="49" ry="49"/></svg>
    <ul class="orbit__chips" aria-label="Our five services">
      ${each(services, (s, i) => `<li class="orbit__slot" style="--a:${i * 72}deg"><a class="orbit__chip orbit__chip--${s.accent}" href="/services/${s.slug}/">${icon(s.icon, { size: 18 })}<span>${esc(s.name.replace(' Assistance', ''))}</span></a></li>`)}
    </ul>
  </div>`;
}

export function homeClocks() {
  return `<ul class="hero-clocks" aria-label="Local time in the regions we cover" data-reveal>
    ${each(regions, (r, i) => `<li class="hero-clocks__item" data-region="${i}">
      <span class="hero-clocks__dot" aria-hidden="true"></span>
      <span class="hero-clocks__city">${esc(r.city)}</span>
      <time class="hero-clocks__time" data-tz="${esc(r.tz)}">--:--</time>
    </li>`)}
  </ul>`;
}

/* ── ABOUT · "We chose your clock" — a draggable 24-hour dial ─────────── */
export function aboutDial() {
  const ticks = Array.from({ length: 96 }, (_, i) => {
    const major = i % 4 === 0;
    const a = (i / 96) * Math.PI * 2;
    const r1 = 188, r2 = major ? 170 : 180;
    const p = (r) => `${(200 + r * Math.sin(a)).toFixed(1)} ${(200 - r * Math.cos(a)).toFixed(1)}`;
    return `<path d="M${p(r1)}L${p(r2)}" class="dial__tick${major ? ' dial__tick--major' : ''}"/>`;
  }).join('');
  const labels = Array.from({ length: 8 }, (_, i) => {
    const h = i * 3;
    const a = (h / 24) * Math.PI * 2;
    return `<text x="${(200 + 148 * Math.sin(a)).toFixed(1)}" y="${(200 - 148 * Math.cos(a) + 5).toFixed(1)}" class="dial__num">${String(h).padStart(2, '0')}</text>`;
  }).join('');
  // Business-hours arc 08:00 → 19:00 on a 24h face.
  const arc = (from, to, r) => {
    const pt = (h) => { const a = (h / 24) * Math.PI * 2; return `${(200 + r * Math.sin(a)).toFixed(1)} ${(200 - r * Math.cos(a)).toFixed(1)}`; };
    return `M${pt(from)} A${r} ${r} 0 ${to - from > 12 ? 1 : 0} 1 ${pt(to)}`;
  };
  return `<div class="dial" data-dial>
    <svg class="dial__face" viewBox="0 0 400 400" aria-hidden="true">
      <defs><linearGradient id="dial-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#CFFF04"/><stop offset="1" stop-color="#B57EDC"/></linearGradient></defs>
      <circle cx="200" cy="200" r="196" class="dial__bezel"/>
      <path d="${arc(8, 19, 120)}" class="dial__hours"/>
      ${ticks}${labels}
      <g class="dial__hand" data-dial-hand><path d="M200 200 L200 52"/><circle cx="200" cy="52" r="13" class="dial__knob"/></g>
      <circle cx="200" cy="200" r="6" class="dial__pin"/>
    </svg>
    <div class="dial__readout">
      <span class="dial__label">Your time</span>
      <span class="dial__time" data-dial-time>09:00</span>
      <span class="dial__status" data-dial-status>Team online · on your calls</span>
    </div>
    <div class="dial__slider" role="slider" tabindex="0" aria-label="Pick an hour of your working day" aria-valuemin="0" aria-valuemax="1425" aria-valuenow="540" aria-valuetext="09:00, team online" data-dial-slider></div>
    <p class="dial__hint">${icon('clock', { size: 16 })}Drag the hand to any hour of your day</p>
  </div>`;
}

/* ── SERVICES · Five expanding pillars ────────────────────────────────── */
export function servicePillars() {
  return `<ul class="pillars" data-pillars>
    ${each(services, (s, i) => `<li class="pillar pillar--${s.accent}${i === 0 ? ' is-active' : ''}" data-pillar>
      <a class="pillar__link" href="/services/${s.slug}/">
        <span class="pillar__num">0${i + 1}</span>
        <span class="pillar__icon">${icon(s.icon, { size: 30 })}</span>
        <span class="pillar__name">${esc(s.name)}</span>
        <span class="pillar__body">
          <span class="pillar__desc">${esc(s.card)}</span>
          <span class="pillar__cta">Explore ${icon('arrowRight', { size: 16 })}</span>
        </span>
      </a>
    </li>`)}
  </ul>`;
}

/* ── WEB DEVELOPMENT · Code that builds the page it describes ─────────── */
const CODE = [
  ['k', 'export default', 'f', ' function ', 'n', 'Home', 'p', '() {'],
  ['p', '  return ', 't', '<Page>'],
  ['t', '    <Hero ', 'a', 'title', 'p', '=', 's', '"Grow faster"', 't', ' />'],
  ['t', '    <Features ', 'a', 'items', 'p', '={', 'n', 'pillars', 'p', '}', 't', ' />'],
  ['t', '    <Pricing ', 'a', 'plan', 'p', '=', 's', '"scale"', 't', ' />'],
  ['t', '    <CTA ', 'a', 'href', 'p', '=', 's', '"/contact"', 't', ' />'],
  ['t', '  </Page>', 'p', ';'],
  ['p', '}'],
];
export function webBrowser() {
  const code = CODE.map((line) => {
    let html = '';
    for (let i = 0; i < line.length; i += 2) html += `<span class="tok tok--${line[i]}">${esc(line[i + 1])}</span>`;
    return `<span class="code__line">${html}</span>`;
  }).join('\n');
  return `<div class="browser" data-tilt aria-hidden="true">
    <div class="browser__bar"><span class="browser__dots"><i></i><i></i><i></i></span><span class="browser__url">${icon('globe', { size: 14 })}yourcompany.com</span><span class="browser__status" data-browser-status>Live</span></div>
    <div class="browser__body">
      <pre class="browser__code"><code data-typewriter>${code}</code></pre>
      <div class="browser__preview">
        <div class="pv pv--nav is-built" data-build="0"><i></i><b></b><b></b><b></b></div>
        <div class="pv pv--hero is-built" data-build="2"><span class="pv__h"></span><span class="pv__h pv__h--short"></span><span class="pv__btn"></span></div>
        <div class="pv pv--grid is-built" data-build="3"><i></i><i></i><i></i></div>
        <div class="pv pv--price is-built" data-build="4"><i></i><i></i></div>
        <div class="pv pv--cta is-built" data-build="5"></div>
      </div>
    </div>
  </div>`;
}

/* ── RECRUITMENT · A live hiring pipeline ─────────────────────────────── */
export function recruitPipeline() {
  const stages = [['Sourced', 128], ['Screened', 46], ['Interviewing', 12], ['Offer', 3]];
  return `<div class="pipeline" data-pipeline>
    <div class="pipeline__head"><span class="eyebrow">Role · Senior Product Engineer</span><span class="chip chip--lime">Live pipeline</span></div>
    <ol class="pipeline__stages">
      ${each(stages, ([label, n], i) => `<li class="pipeline__stage" data-stage="${i}"><span class="pipeline__label">${label}</span><span class="pipeline__count" data-stage-count>${n}</span><span class="pipeline__bar" style="--fill:${Math.round((n / 128) * 100)}%"></span></li>`)}
    </ol>
    <div class="pipeline__flow" data-pipeline-flow aria-hidden="true"></div>
    <div class="pipeline__hire" data-pipeline-hire>
      <span class="avatar">JL</span>
      <span><strong>Offer accepted</strong><span class="pipeline__hire-meta">Time-to-hire: 19 days</span></span>
      ${icon('checkCircle', { size: 22 })}
    </div>
  </div>`;
}

/* ── VIRTUAL ASSISTANCE · A to-do list that clears itself ─────────────── */
export const VA_TASKS = [
  ['Triage inbox — 42 new emails', '09:04'],
  ['Move board prep to Thursday', '09:18'],
  ['Update 18 deals in HubSpot', '09:40'],
  ['Book flights: NYC → London', '10:02'],
  ['Draft weekly ops report', '10:30'],
  ['Reply to 6 customer tickets', '11:05'],
  ['Clean up shared Drive folders', '11:40'],
  ['Prep agenda for Monday stand-up', '12:10'],
];
export function vaTasks() {
  return `<div class="tasks" data-tasks>
    <div class="tasks__head">
      <span class="tasks__who"><span class="avatar">VA</span><span><strong>Your assistant</strong><span class="tasks__meta">Online · your hours</span></span></span>
      <span class="tasks__saved"><span>Hours back this week</span><strong data-hours>14.5</strong></span>
    </div>
    <ul class="tasks__list" data-task-list>
      ${each(VA_TASKS.slice(0, 5), ([text, time]) => `<li class="task" data-task>
        <button class="task__check" type="button" aria-label="Mark “${esc(text)}” as done">${icon('check', { size: 16 })}</button>
        <span class="task__text">${esc(text)}</span><span class="task__time">${time}</span>
      </li>`)}
    </ul>
    <p class="tasks__hint">${icon('spark', { size: 14 })}Tap a task to hand it over</p>
  </div>`;
}

/* ── ACCOUNTING · An interactive, self-reconciling ledger chart ───────── */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const VALUES = [312, 348, 336, 371, 402, 395, 428, 446, 439, 471, 498, 526];
export function ledgerChart() {
  const max = 560;
  const pts = VALUES.map((v, i) => `${((i + 0.5) / 12) * 100},${100 - (v / max) * 100}`).join(' ');
  return `<div class="ledger" data-ledger>
    <div class="ledger__head">
      <div><span class="eyebrow">Revenue · FY close</span><strong class="ledger__total" data-ledger-total>$4.97M</strong><span class="ledger__sub" data-ledger-sub>12 months · reconciled</span></div>
      <span class="chip chip--lime">Books closed · Day 3</span>
    </div>
    <div class="ledger__chart">
      <ol class="ledger__bars" aria-label="Monthly revenue">
        ${each(VALUES, (v, i) => `<li class="ledger__bar" tabindex="0" style="--h:${((v / max) * 100).toFixed(1)}%;--i:${i}" data-month="${MONTHS[i]}" data-value="$${v}K" aria-label="${MONTHS[i]}: $${v}K"><span class="ledger__fill"></span><span class="ledger__month">${MONTHS[i][0]}</span></li>`)}
      </ol>
      <svg class="ledger__line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts}" pathLength="1"/></svg>
    </div>
    <ul class="ledger__foot">
      <li><span class="ledger__ring" style="--p:100" aria-hidden="true"></span><span><strong>100%</strong> reconciled</span></li>
      <li><span class="ledger__ok">${icon('check', { size: 14 })}</span><span><strong>0</strong> overdue AP</span></li>
      <li><span class="ledger__ok">${icon('check', { size: 14 })}</span><span>Payroll <strong>approved</strong></span></li>
    </ul>
  </div>`;
}

/* ── LEGAL · A contract under review, clause by clause ────────────────── */
export const CLAUSES = [
  { label: 'Limitation of liability', note: 'Cap differs from playbook (12× fees). Flagged for attorney review.', state: 'Flagged' },
  { label: 'Data protection', note: 'GDPR DPA referenced and attached. Matches template v4.', state: 'Approved' },
  { label: 'Termination for convenience', note: 'Notice period 30 → 60 days proposed in redline.', state: 'Redlined' },
  { label: 'Governing law', note: 'England & Wales — consistent with counterparty standard.', state: 'Approved' },
];
export function legalDoc() {
  const line = (w) => `<span class="doc__ln" style="--w:${w}%"></span>`;
  return `<div class="doc" data-redline data-clauses="${esc(JSON.stringify(CLAUSES))}">
    <div class="doc__page">
      <p class="doc__title">Master Services Agreement</p>
      <p class="doc__meta">v3 · 14 pages · Review in progress</p>
      ${each(CLAUSES, (c, i) => `<div class="doc__para">
        <button class="clause${i === 0 ? ' is-active' : ''}" type="button" data-clause="${i}"><span class="clause__num">${i + 1}.</span>${esc(c.label)}</button>
        ${line(96)}${line(88)}${line(i % 2 ? 64 : 78)}
      </div>`)}
      <span class="doc__beam" aria-hidden="true"></span>
    </div>
    <div class="doc__note" aria-live="polite">
      <span class="doc__state" data-clause-state>${esc(CLAUSES[0].state)}</span>
      <p class="doc__note-title" data-clause-title>${esc(CLAUSES[0].label)}</p>
      <p class="doc__note-text" data-clause-note>${esc(CLAUSES[0].note)}</p>
    </div>
  </div>`;
}

/* ── CONTACT · "The signal has reached you" — ripple beacon ───────────── */
export function contactBeacon() {
  return `<div class="beacon" data-beacon>
    <canvas class="beacon__canvas" data-beacon-canvas aria-hidden="true"></canvas>
    <div class="beacon__card" data-timezone>
      <p class="eyebrow"><span class="eyebrow__dot" aria-hidden="true"></span>The signal has reached you</p>
      <p class="beacon__time"><span data-local-time>--:--</span></p>
      <p class="beacon__line" data-tz-line>Our team works during <strong>your</strong> business hours — wherever you are.</p>
      <p class="beacon__meta" data-tz-meta>Typically replies within 1 business hour.</p>
    </div>
  </div>`;
}

/* ── PRIVACY · A shield of rings that turns to watch the cursor ───────── */
export function privacyShield() {
  return `<div class="shield" data-shield aria-hidden="true">
    <span class="shield__ring shield__ring--1"></span>
    <span class="shield__ring shield__ring--2"></span>
    <span class="shield__ring shield__ring--3"></span>
    <span class="shield__core">${icon('shield', { size: 56 })}</span>
  </div>`;
}

/* ── TERMS · A fanned stack of documents ──────────────────────────────── */
export function termsStack() {
  const docs = ['Terms of Service', 'Service Agreement', 'Mutual NDA'];
  return `<div class="stack" data-stack aria-hidden="true">
    ${each(docs, (d, i) => `<div class="stack__doc" style="--i:${i}"><span class="stack__title">${d}</span><span class="stack__ln"></span><span class="stack__ln"></span><span class="stack__ln stack__ln--short"></span><span class="stack__seal">${icon('stamp', { size: 18 })}</span></div>`)}
  </div>`;
}

/* ── 404 · Letters that scatter from the cursor ───────────────────────── */
export function lostSignal() {
  return `<p class="scatter" data-scatter aria-hidden="true">${[...'404'].map((c) => `<span class="scatter__char">${c}</span>`).join('')}</p>`;
}
