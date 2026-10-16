/** ABOUT — "Built to power your growth." (§7.2) */
import { esc, each } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import { button, sectionHead, pageHero, feature, ctaBanner, avatar, eyebrow } from '../components/ui.mjs';
import { breadcrumbSchema } from '../components/layout.mjs';
import { aboutDial } from '../components/hero-visuals.mjs';
import { values, team, stats } from '../data/content.mjs';
import { brand } from '../config.mjs';

export const meta = {
  path: '/about/',
  title: 'About Akrostech — The Team Behind Your Operations',
  description:
    'Akrostech builds dedicated operations teams for growing companies — the middle ground between overpriced consultancies and unreliable freelancers.',
};

const story = [
  {
    label: '01 — The gap',
    title: 'Two bad options.',
    text: 'Growing companies kept telling us the same story. When operations outgrew their team, they could pay a consultancy premium rates for slide decks and junior staff, or gamble on freelancers who vanished mid-project and never overlapped with their working day. Neither option was built for companies that simply needed reliable, skilled people doing the work — every day.',
  },
  {
    label: '02 — The decision',
    title: 'So we built the middle ground.',
    text: 'Akrostech was founded to be the partner we wished existed: dedicated, vetted specialists, managed properly, priced transparently and aligned to our clients’ hours rather than our own. We flipped the clock, so our teams start their day when yours does — in New York, London, Dubai or Sydney.',
  },
  {
    label: '03 — Today',
    title: 'One partner. Five pillars.',
    text: 'Today our engineers, recruiters, assistants, accountants and legal professionals run the backend operations of companies across four regions. The promise hasn’t changed since day one: we show up when you do, we own the outcome, and we make your team bigger without making your org chart heavier.',
  },
];

export function render({ siteUrl }) {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }];
  const body = `
${pageHero({
  variant: 'about',
  kicker: 'About Akrostech',
  title: 'Built to *power* your growth.',
  sub: 'We exist so ambitious companies can scale operations without scaling overhead — with dedicated teams that feel in-house, work your hours and answer to your goals.',
  crumbs,
  actions: `${button({ label: 'Meet the team', href: '#team', variant: 'secondary', iconName: 'arrowDown' })}${button({ label: 'Book a Call', href: '/contact/', variant: 'primary' })}`,
  visual: aboutDial(),
})}

<section class="section story" aria-labelledby="story-title">
  <div class="container story__layout">
    <div class="story__sticky">
      ${sectionHead({ kicker: 'Our story', title: 'Why we chose *your* clock.', id: 'story-title' })}
      <p class="story__entity" data-reveal>${esc(brand.entity)}</p>
    </div>
    <ol class="story__frames">
      ${each(story, (s) => `<li class="story__frame" data-reveal>
        <p class="story__label">${esc(s.label)}</p>
        <h3 class="story__title">${esc(s.title)}</h3>
        <p class="story__text">${esc(s.text)}</p>
      </li>`)}
    </ol>
  </div>
</section>

<section class="section section--tight mission" aria-label="Mission and vision">
  <div class="container mission__grid" data-stagger>
    <article class="mission__card mission__card--lime" data-reveal data-spotlight>
      ${eyebrow('Mission')}
      <h2 class="mission__title">Give growing companies world-class operational support — in their hours, without the cost and delay of traditional hiring.</h2>
    </article>
    <article class="mission__card mission__card--lavender" data-reveal data-spotlight>
      ${eyebrow('Vision')}
      <h2 class="mission__title">A world where any business can build a brilliant team, regardless of borders, time zones or headcount budgets.</h2>
    </article>
  </div>
</section>

<section class="section section--light values" aria-labelledby="values-title">
  <div class="container">
    ${sectionHead({ kicker: 'What we stand for', title: 'Five values. *Zero* fine print.', lead: 'These aren’t posters on a wall. They decide how we price, how we hire and what happens when something goes wrong.', id: 'values-title' })}
    <div class="values__grid" data-stagger>${each(values, (v, i) => feature(v, { tone: i % 2 ? 'plum' : 'ink' }))}</div>
  </div>
</section>

<section class="section team" id="team" aria-labelledby="team-title">
  <div class="container">
    ${sectionHead({ kicker: 'Leadership', title: 'The people behind the *operations.*', lead: 'Operators, engineers and specialists who have run the same functions they now run for you.', id: 'team-title' })}
    <ul class="team__grid" data-stagger>
      ${each(team, (m) => `<li class="team-card" data-reveal data-spotlight>
        ${avatar(m.initials, { size: 'lg', label: `Photo placeholder for ${m.name}` })}
        <div class="team-card__body">
          <h3 class="team-card__name">${esc(m.name)}</h3>
          <p class="team-card__role">${esc(m.role)}</p>
          <p class="team-card__zone">${icon('clock', { size: 14 })}Favourite time zone: ${esc(m.zone)}</p>
        </div>
        <a class="team-card__social" href="https://www.linkedin.com/" rel="noopener" target="_blank">${icon('linkedin', { size: 20 })}<span class="visually-hidden">${esc(m.name)} on LinkedIn (opens in a new tab)</span></a>
      </li>`)}
    </ul>
  </div>
</section>

<section class="section section--tight trust-band" aria-labelledby="trust-title">
  <div class="container trust-band__layout">
    <div>
      ${sectionHead({ kicker: 'Security & trust', title: 'Confidential by *default.*', id: 'trust-title' })}
    </div>
    <ul class="trust-band__list" data-stagger>
      ${each(
        [
          ['shield', 'NDAs for every engagement and every team member'],
          ['idcard', 'Role-based access — only what each task needs'],
          ['bolt', 'Secure, managed devices with VPN and MFA'],
          ['globe', 'GDPR-aware data handling, documented'],
        ],
        ([ic, text]) => `<li data-reveal>${icon(ic, { size: 22 })}<span>${esc(text)}</span></li>`,
      )}
    </ul>
    <dl class="trust-band__stats">
      ${each(stats.slice(0, 3), (s) => `<div><dt>${esc(s.label)}</dt><dd><span data-counter="${s.value}">${s.value}</span>${esc(s.suffix)}</dd></div>`)}
    </dl>
  </div>
</section>

${ctaBanner({ title: 'Meet the team that’ll meet *you* at 9.' })}`;

  return { ...meta, pageClass: 'page-about', body, schema: [breadcrumbSchema(siteUrl, crumbs), { '@context': 'https://schema.org', '@type': 'AboutPage', name: meta.title, url: `${siteUrl}${meta.path}`, about: { '@id': `${siteUrl}/#organization` } }] };
}
