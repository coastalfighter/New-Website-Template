/**
 * Reusable UI primitives. Each maps 1:1 to an entry in the design system's
 * component library (§12). Class names follow BEM: block__element--modifier.
 */
import { esc, rich, plain, each, when } from '../lib/html.mjs';
import { icon } from './icons.mjs';

/**
 * Button (§12): primary (lime fill, ink text) · secondary (lavender outline)
 * · ghost · inverse (ink fill — used on lime/Aurora/light surfaces, see GAPS).
 * Magnetic hover is opt-in via `data-magnetic` and handled in pointer.js.
 */
export function button({ label, href, variant = 'primary', iconName = 'arrowRight', size = 'md', magnetic = true, attrs = '' }) {
  const cls = `btn btn--${variant}${size === 'lg' ? ' btn--lg' : ''}`;
  const iconHtml = iconName ? `<span class="btn__icon">${icon(iconName, { size: 18 })}</span>` : '';
  return `<a class="${cls}" href="${esc(href)}"${magnetic ? ' data-magnetic' : ''}${attrs ? ` ${attrs}` : ''}><span class="btn__label">${esc(label)}</span>${iconHtml}</a>`;
}

/** Mono eyebrow label — "● TEAM ONLINE" style (§7.1, §4.2 mono role). */
export function eyebrow(text, { dot = false, tone = '' } = {}) {
  return `<p class="eyebrow${tone ? ` eyebrow--${tone}` : ''}">${dot ? '<span class="eyebrow__dot" aria-hidden="true"></span>' : ''}${esc(text)}</p>`;
}

/** Section heading block: eyebrow + H2 (with editorial accent) + lead. */
export function sectionHead({ kicker, title, lead, align = 'start', level = 2, id }) {
  const tag = `h${level}`;
  return `<header class="section-head section-head--${align}" data-reveal>
    ${when(kicker, () => eyebrow(kicker))}
    <${tag} class="section-head__title"${id ? ` id="${esc(id)}"` : ''}>${rich(title)}</${tag}>
    ${when(lead, () => `<p class="section-head__lead">${esc(lead)}</p>`)}
  </header>`;
}

/** The Signal (§2.2, §4.4): a 2px lime line that draws itself into view. */
export function signal({ className = '' } = {}) {
  return `<div class="signal ${className}" aria-hidden="true" data-reveal="signal"><span class="signal__line"></span><span class="signal__pulse"></span></div>`;
}

/** "Learn more →" style text link with animated arrow. */
export function arrowLink({ label, href, srContext = '' }) {
  const sr = srContext ? `<span class="visually-hidden"> about ${esc(srContext)}</span>` : '';
  return `<a class="arrow-link" href="${esc(href)}"><span>${esc(label)}</span>${sr}${icon('arrowRight', { size: 16 })}</a>`;
}

/** Breadcrumbs (§8.3) — visual trail; BreadcrumbList schema is added by the page. */
export function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol class="breadcrumbs__list">${each(items, (item, i) => {
    const last = i === items.length - 1;
    return `<li class="breadcrumbs__item">${last ? `<span aria-current="page">${esc(item.label)}</span>` : `<a href="${esc(item.href)}">${esc(item.label)}</a>`}</li>`;
  })}</ol></nav>`;
}

/**
 * Inner-page hero. Uses the Dusk Glow gradient + time rings motif rather than
 * the WebGL globe, which is reserved for the Home hero (§5.3 #3).
 */
export function pageHero({ kicker, title, sub, actions = '', crumbs, aside = '', className = '' }) {
  return `<section class="page-hero ${className}" aria-labelledby="page-title">
    <div class="page-hero__bg" aria-hidden="true">
      <div class="page-hero__glow"></div>
      <svg class="time-rings" viewBox="0 0 600 600">${timeRings()}</svg>
    </div>
    <div class="container page-hero__inner${aside ? ' page-hero__inner--split' : ''}">
      <div class="page-hero__content">
        ${when(crumbs, () => breadcrumbs(crumbs))}
        ${when(kicker, () => eyebrow(kicker, { dot: true }))}
        <h1 class="page-hero__title display" id="page-title" data-split>${rich(title)}</h1>
        ${when(sub, () => `<p class="page-hero__sub" data-reveal>${esc(sub)}</p>`)}
        ${when(actions, () => `<div class="page-hero__actions" data-reveal>${actions}</div>`)}
      </div>
      ${aside}
    </div>
    ${signal({ className: 'page-hero__signal' })}
  </section>`;
}

/** Concentric "time rings" with clock ticks (§4.4). Pure SVG, decorative. */
export function timeRings() {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0;
    const a = (i / 60) * Math.PI * 2;
    const r1 = 286, r2 = major ? 270 : 278;
    const p = (r) => `${(300 + r * Math.sin(a)).toFixed(2)} ${(300 - r * Math.cos(a)).toFixed(2)}`;
    return `<path d="M${p(r1)}L${p(r2)}" class="${major ? 'tick tick--major' : 'tick'}"/>`;
  }).join('');
  return `<circle cx="300" cy="300" r="290" class="ring"/><circle cx="300" cy="300" r="220" class="ring ring--dashed"/><circle cx="300" cy="300" r="150" class="ring"/><circle cx="300" cy="300" r="80" class="ring ring--faint"/>${ticks}<g class="ring-hand"><path d="M300 300 L300 40" class="hand"/><circle cx="300" cy="40" r="5" class="hand-dot"/></g>`;
}

/** FAQ accordion (§12): native <details> progressive enhancement. */
export function faqList(faqs, { idPrefix = 'faq' } = {}) {
  return `<div class="faq" data-stagger>${each(faqs, (f, i) => `
    <details class="faq__item" id="${idPrefix}-${i + 1}" data-reveal>
      <summary class="faq__question"><span>${esc(f.q)}</span><span class="faq__icon" aria-hidden="true">${icon('plus', { size: 20 })}</span></summary>
      <div class="faq__answer"><p>${esc(f.a)}</p></div>
    </details>`)}
  </div>`;
}

/**
 * Closing CTA banner (§7.1 section 10) on the Aurora gradient — the design
 * system's most prominent treatment. Ink text keeps contrast ≥ 6.6:1.
 */
export function ctaBanner({
  title = 'Ready to offload your *operations?*',
  body = 'Tell us what’s slowing your team down. In 30 minutes — in your time zone — we’ll map exactly how a dedicated Akrostech team would take it off your plate.',
  label = 'Book a Free Consultation',
  href = '/contact/',
} = {}) {
  return `<section class="cta-banner" aria-labelledby="cta-title">
    <div class="container">
      <div class="cta-banner__panel" data-reveal="scale">
        <div class="cta-banner__grain" aria-hidden="true"></div>
        <svg class="cta-banner__rings time-rings" viewBox="0 0 600 600" aria-hidden="true">${timeRings()}</svg>
        <div class="cta-banner__content">
          ${eyebrow('Your next step', { tone: 'ink', dot: true })}
          <h2 class="cta-banner__title" id="cta-title">${rich(title)}</h2>
          <p class="cta-banner__body">${esc(body)}</p>
          <div class="cta-banner__actions">${button({ label, href, variant: 'inverse', size: 'lg' })}</div>
          <ul class="cta-banner__micro" aria-label="What to expect">
            <li>${icon('check', { size: 16 })}No commitment</li>
            <li>${icon('check', { size: 16 })}NDA available before the call</li>
            <li>${icon('check', { size: 16 })}Reply within 1 business hour</li>
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}

/** Glass service card with spotlight + tilt (§12 glass card, §5.3 #9). */
export function serviceCard(service, index) {
  return `<article class="service-card service-card--${service.accent}" data-reveal data-tilt data-spotlight data-cursor="view">
    <div class="service-card__top">
      <span class="service-card__index">${String(index + 1).padStart(2, '0')}</span>
      <span class="icon-badge icon-badge--${service.accent}">${icon(service.icon, { size: 28 })}</span>
    </div>
    <h3 class="service-card__title"><a class="service-card__link" href="/services/${service.slug}/">${esc(service.name)}</a></h3>
    <p class="service-card__desc">${esc(service.card)}</p>
    <span class="arrow-link service-card__more" aria-hidden="true"><span>Learn more</span>${icon('arrowRight', { size: 16 })}</span>
  </article>`;
}

/** Icon + title + description feature block. */
export function feature({ icon: iconName, title, desc }, { tone = 'lime', level = 3 } = {}) {
  return `<div class="feature" data-reveal>
    <span class="icon-badge icon-badge--${tone}">${icon(iconName, { size: 24 })}</span>
    <h${level} class="feature__title">${esc(title)}</h${level}>
    <p class="feature__desc">${esc(desc)}</p>
  </div>`;
}

/** Monogram avatar used until real, permissioned photography exists (§11.1). */
export function avatar(initials, { size = 'md', label = '' } = {}) {
  return `<span class="avatar avatar--${size}"${label ? ` role="img" aria-label="${esc(label)}"` : ' aria-hidden="true"'}>${esc(initials)}</span>`;
}

export { plain };
