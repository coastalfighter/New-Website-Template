/** SERVICE PAGE TEMPLATE — shared by all five pillars (§7.4). */
import { esc, each } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import { button, sectionHead, pageHero, faqList, ctaBanner, serviceCard } from '../components/ui.mjs';
import { breadcrumbSchema, faqSchema } from '../components/layout.mjs';
import { services } from '../data/services.mjs';

export function render(s, { siteUrl }) {
  const path = `/services/${s.slug}/`;
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: s.name, href: path }];
  const related = relatedFor(s);

  const body = `
${pageHero({
  kicker: s.hero.eyebrow,
  title: s.hero.title,
  sub: s.hero.sub,
  crumbs,
  className: `page-hero--service page-hero--${s.accent}`,
  actions: `${button({ label: 'Get Started', href: `/contact/?service=${s.slug}`, variant: 'primary' })}${button({ label: 'What’s included', href: '#included', variant: 'secondary', iconName: 'arrowDown' })}`,
  aside: `<div class="service-hero-object service-hero-object--${s.accent}" aria-hidden="true" data-tilt>
    <span class="service-hero-object__ring"></span><span class="service-hero-object__ring service-hero-object__ring--2"></span>
    <span class="service-hero-object__core">${icon(s.icon, { size: 72 })}</span>
  </div>`,
})}

<section class="section overview" aria-labelledby="overview-title">
  <div class="container overview__layout">
    <div class="overview__aside">
      ${sectionHead({ kicker: 'Overview', title: `What ${s.name.toLowerCase()} covers — and who it’s *for.*`, id: 'overview-title' })}
      <p class="definition" data-reveal><span class="definition__label">Definition</span>${esc(s.definition)}</p>
    </div>
    <div class="overview__body prose" data-reveal>
      ${each(s.overview, (p) => `<p>${esc(p)}</p>`)}
      ${s.note ? `<p class="notice">${icon('alert', { size: 20 })}<span>${esc(s.note)}</span></p>` : ''}
    </div>
  </div>
</section>

<section class="section included" id="included" aria-labelledby="included-title">
  <div class="container">
    ${sectionHead({ kicker: `What’s included · ${s.included.length} deliverables`, title: 'Everything your team needs, *handled.*', lead: 'Pick the full scope or just the parts you need. Every engagement is documented in a written playbook.', id: 'included-title' })}
    <ul class="included__grid" data-stagger>
      ${each(s.included, (item) => `<li class="included__item" data-reveal data-spotlight>
        <span class="included__icon">${icon(item.icon, { size: 22 })}</span>
        <h3 class="included__title">${esc(item.title)}</h3>
        <p class="included__desc">${esc(item.desc)}</p>
      </li>`)}
    </ul>
    <div class="tools" data-reveal>
      <p class="eyebrow">Tools our team works in</p>
      <ul class="tools__list">${each(s.tools, (t) => `<li class="chip chip--outline">${esc(t)}</li>`)}</ul>
    </div>
  </div>
</section>

<section class="section process process--three" aria-labelledby="how-title" data-process>
  <div class="container">
    ${sectionHead({ kicker: 'How it works', title: 'Three steps to *momentum.*', align: 'center', id: 'how-title' })}
    <ol class="process__steps" data-stagger>
      <li class="process__rail" aria-hidden="true"><span class="process__rail-fill" data-process-fill></span></li>
      ${each(s.process, (step, i) => `<li class="process__step" data-reveal data-process-step>
        <span class="process__node" aria-hidden="true"><span>${String(i + 1).padStart(2, '0')}</span></span>
        <h3 class="process__title">${esc(step.title)}</h3>
        <p class="process__desc">${esc(step.desc)}</p>
      </li>`)}
    </ol>
  </div>
</section>

<section class="section section--light use-cases" aria-labelledby="usecases-title">
  <div class="container">
    ${sectionHead({ kicker: 'Who it’s for', title: 'Built for teams like *yours.*', id: 'usecases-title' })}
    <div class="use-cases__grid" data-stagger>
      ${each(s.useCases, (u) => `<article class="use-case" data-reveal>
        <span class="chip chip--plum">${esc(u.tag)}</span>
        <h3 class="use-case__title">${esc(u.title)}</h3>
        <p class="use-case__desc">${esc(u.desc)}</p>
      </article>`)}
    </div>
  </div>
</section>

<section class="section faq-section" aria-labelledby="faq-title">
  <div class="container faq-section__layout">
    ${sectionHead({ kicker: 'FAQ', title: `${s.name}, *answered.*`, lead: 'The questions decision-makers ask us before they sign. Something missing? Ask us directly.', id: 'faq-title' })}
    ${faqList(s.faqs, { idPrefix: `${s.slug}-faq` })}
  </div>
</section>

<section class="section section--tight related" aria-labelledby="related-title">
  <div class="container">
    ${sectionHead({ kicker: 'Pairs well with', title: 'Combine pillars, *compound* the impact.', id: 'related-title' })}
    <div class="related__grid" data-stagger>${related.map((r) => serviceCard(r, services.indexOf(r))).join('')}</div>
  </div>
</section>

${ctaBanner({
  title: s.cta,
  body: `Tell us where ${s.name.toLowerCase()} is slowing you down. Let’s talk — 30 minutes, in your time zone, with a clear plan at the end.`,
  label: 'Let’s Talk',
  href: `/contact/?service=${s.slug}`,
})}`;

  return {
    path,
    title: s.seo.title,
    description: s.seo.description,
    pageClass: `page-service page-service--${s.slug}`,
    body,
    schema: [
      breadcrumbSchema(siteUrl, crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.name,
        serviceType: s.name,
        description: s.definition,
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: ['US', 'GB', 'EU', 'AU', 'AE'],
        url: `${siteUrl}${path}`,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${s.name} deliverables`,
          itemListElement: s.included.map((i) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: i.title } })),
        },
      },
      faqSchema(s.faqs),
    ],
  };
}

/** Cross-sell pairings that make commercial sense (§7.3 bundles). */
const PAIRS = {
  'web-development': ['virtual-assistance', 'recruitment-assistance'],
  'recruitment-assistance': ['virtual-assistance', 'accounting-assistance'],
  'virtual-assistance': ['accounting-assistance', 'web-development'],
  'accounting-assistance': ['legal-assistance', 'virtual-assistance'],
  'legal-assistance': ['accounting-assistance', 'virtual-assistance'],
};

function relatedFor(s) {
  return PAIRS[s.slug].map((slug) => services.find((x) => x.slug === slug));
}
