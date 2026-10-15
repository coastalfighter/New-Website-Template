/** SERVICES HUB — "Services built for scale." (§7.3) */
import { esc, each } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import { button, sectionHead, pageHero, feature, ctaBanner } from '../components/ui.mjs';
import { breadcrumbSchema } from '../components/layout.mjs';
import { services } from '../data/services.mjs';
import { modelAdvantages } from '../data/content.mjs';

export const meta = {
  path: '/services/',
  title: 'Outsourcing Services: Web, Recruiting, VA, Finance & Legal',
  description:
    'Five backend operations services from one partner — web development, recruitment, virtual, accounting and legal assistance, delivered in your time zone.',
};

function serviceBlock(s, i) {
  return `<article class="service-block service-block--${s.accent}" id="${s.slug}" data-reveal aria-labelledby="${s.slug}-title">
    <div class="service-block__meta">
      <span class="service-block__index">${String(i + 1).padStart(2, '0')} / 05</span>
      <span class="icon-badge icon-badge--${s.accent} icon-badge--lg">${icon(s.icon, { size: 36 })}</span>
    </div>
    <div class="service-block__body">
      <h2 class="service-block__title" id="${s.slug}-title">${esc(s.name)}</h2>
      <p class="service-block__desc">${esc(s.hub)}</p>
      <ul class="checklist">${each(s.hubBullets, (b) => `<li>${icon('check', { size: 18 })}<span>${esc(b)}</span></li>`)}</ul>
      ${button({ label: 'Explore This Service', href: `/services/${s.slug}/`, variant: 'secondary' })}
    </div>
  </article>`;
}

export function render({ siteUrl }) {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }];
  const body = `
${pageHero({
  kicker: 'Services',
  title: 'Services built for *scale.*',
  sub: 'Five operational pillars, one accountable partner. Start with the function that’s slowing you down most, then add more as you grow — same team, same standards, same contract.',
  crumbs,
  actions: `${button({ label: 'Get Started', href: '/contact/', variant: 'primary' })}`,
  aside: `<nav class="service-index" aria-label="Jump to a service" data-reveal>
    <p class="eyebrow">Jump to</p>
    <ol>${each(services, (s, i) => `<li><a href="#${s.slug}"><span>${String(i + 1).padStart(2, '0')}</span>${esc(s.name)}${icon('arrowDown', { size: 16 })}</a></li>`)}</ol>
  </nav>`,
})}

<section class="section services-list" aria-label="All services">
  <div class="container services-list__stack">${each(services, serviceBlock)}</div>
</section>

<section class="section section--light model" aria-labelledby="model-title">
  <div class="container">
    ${sectionHead({ kicker: 'Why our model works', title: 'The leverage of a big team. The cost of a *lean* one.', lead: 'Outsourcing used to mean trading quality for price. A dedicated, managed team in your time zone means you no longer have to choose.', id: 'model-title' })}
    <div class="model__grid" data-stagger>${each(modelAdvantages, (m, i) => feature(m, { tone: i % 2 ? 'plum' : 'ink' }))}</div>
    <div class="model__compare" data-reveal>
      <table class="compare">
        <caption class="visually-hidden">How Akrostech compares with traditional offshore vendors and local hiring</caption>
        <thead><tr><th scope="col"><span class="visually-hidden">Capability</span></th><th scope="col">Traditional offshore</th><th scope="col">Local hire</th><th scope="col" class="compare__us">Akrostech</th></tr></thead>
        <tbody>
          ${each(
            [
              ['Works in your hours', false, true, true],
              ['Cost-efficient', true, false, true],
              ['Live collaboration', false, true, true],
              ['Scale up or down quickly', 'partial', false, true],
              ['Multi-service, one partner', false, false, true],
            ],
            ([label, a, b, c]) => `<tr><th scope="row">${esc(label)}</th>${[a, b, c].map((v, i) => `<td${i === 2 ? ' class="compare__us"' : ''}>${v === true ? `${icon('check', { size: 20, className: 'compare__yes' })}<span class="visually-hidden">Yes</span>` : v === 'partial' ? '<span class="compare__partial">Partly</span>' : `<span class="compare__no" aria-hidden="true">—</span><span class="visually-hidden">No</span>`}</td>`).join('')}</tr>`,
          )}
        </tbody>
      </table>
    </div>
  </div>
</section>

${ctaBanner({ title: 'Not sure which pillar comes *first?*', body: 'Most clients start with the function that costs their leaders the most hours. Book a free consultation and we’ll map it with you — in your time zone, in 30 minutes.' })}`;

  return {
    ...meta,
    pageClass: 'page-services',
    body,
    schema: [
      breadcrumbSchema(siteUrl, crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Akrostech services',
        itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `${siteUrl}/services/${s.slug}/` })),
      },
    ],
  };
}
