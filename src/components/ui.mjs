/**
 * Reusable UI primitives (design system §12, light edition).
 * Class names follow BEM: block__element--modifier.
 */
import { esc, rich, plain, each, when } from '../lib/html.mjs';
import { icon } from './icons.mjs';

/** Button: primary (ink → gradient sweep) · secondary (outline) · ghost. */
export function button({ label, href, variant = 'primary', iconName = 'arrowRight', size = 'md', magnetic = true, attrs = '' }) {
  const cls = `btn btn--${variant}${size === 'lg' ? ' btn--lg' : ''}`;
  const iconHtml = iconName ? `<span class="btn__icon">${icon(iconName, { size: 18 })}</span>` : '';
  return `<a class="${cls}" href="${esc(href)}"${magnetic ? ' data-magnetic' : ''}${attrs ? ` ${attrs}` : ''}><span class="btn__label">${esc(label)}</span>${iconHtml}</a>`;
}

/** Mono eyebrow label. */
export function eyebrow(text, { dot = false, tone = '' } = {}) {
  return `<p class="eyebrow${tone ? ` eyebrow--${tone}` : ''}">${dot ? '<span class="eyebrow__dot" aria-hidden="true"></span>' : ''}${esc(text)}</p>`;
}

/** Glass pill used at the top of heroes. */
export function tag(text, badge = '') {
  return `<p class="tag">${badge ? `<span class="tag__badge">${esc(badge)}</span>` : '<span class="eyebrow__dot" aria-hidden="true"></span>'}${esc(text)}</p>`;
}

/** Section heading block: eyebrow + H2 (with highlight) + lead. */
export function sectionHead({ kicker, title, lead, align = 'start', level = 2, id }) {
  const t = `h${level}`;
  return `<header class="section-head section-head--${align}" data-reveal>
    ${when(kicker, () => eyebrow(kicker, { dot: true }))}
    <${t} class="section-head__title"${id ? ` id="${esc(id)}"` : ''}>${rich(title)}</${t}>
    ${when(lead, () => `<p class="section-head__lead">${esc(lead)}</p>`)}
  </header>`;
}

/** The Signal divider: a gradient line that draws itself into view. */
export function signal({ className = '' } = {}) {
  return `<div class="signal ${className}" aria-hidden="true" data-reveal="signal"><span class="signal__line"></span><span class="signal__pulse"></span></div>`;
}

export function arrowLink({ label, href, srContext = '' }) {
  const sr = srContext ? `<span class="visually-hidden"> about ${esc(srContext)}</span>` : '';
  return `<a class="arrow-link" href="${esc(href)}"><span>${esc(label)}</span>${sr}${icon('arrowRight', { size: 16 })}</a>`;
}

export function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol class="breadcrumbs__list">${each(items, (item, i) => {
    const last = i === items.length - 1;
    return `<li class="breadcrumbs__item">${last ? `<span aria-current="page">${esc(item.label)}</span>` : `<a href="${esc(item.href)}">${esc(item.label)}</a>`}</li>`;
  })}</ol></nav>`;
}

/**
 * Hero shell shared by every page. Each page supplies its own interactive
 * `visual` and a `variant`, which selects both the layout (heroes.css) and
 * the behaviour (heroes.js via data-hero).
 */
export function pageHero({ variant = 'default', kicker, badge = '', title, sub, actions = '', crumbs, visual = '', below = '', className = '' }) {
  return `<section class="hero hero--${variant} ${className}" data-hero="${variant}" aria-labelledby="page-title">
    <div class="container hero__inner">
      <div class="hero__content">
        ${when(crumbs, () => breadcrumbs(crumbs))}
        ${when(kicker, () => tag(kicker, badge))}
        <h1 class="hero__title display" id="page-title" data-split>${rich(title)}</h1>
        ${when(sub, () => `<p class="hero__sub" data-reveal>${esc(sub)}</p>`)}
        ${when(actions, () => `<div class="hero__actions" data-reveal>${actions}</div>`)}
      </div>
      ${when(visual, () => `<div class="hero__visual">${visual}</div>`)}
    </div>
    ${below}
  </section>`;
}

/** Scroll indicator. */
export function scrollCue(target) {
  return `<a class="scroll-cue" href="#${target}" aria-label="Scroll to content"><span class="scroll-cue__mouse"><span class="scroll-cue__wheel"></span></span><span class="scroll-cue__label">Scroll</span></a>`;
}

/** FAQ accordion (native <details>). */
export function faqList(faqs, { idPrefix = 'faq' } = {}) {
  return `<div class="faq" data-stagger>${each(faqs, (f, i) => `
    <details class="faq__item" id="${idPrefix}-${i + 1}" data-reveal>
      <summary class="faq__question"><span>${esc(f.q)}</span><span class="faq__icon" aria-hidden="true">${icon('plus', { size: 20 })}</span></summary>
      <div class="faq__answer"><p>${esc(f.a)}</p></div>
    </details>`)}
  </div>`;
}

/** Closing CTA: a frosted panel with Lime/Lavender currents flowing through it. */
export function ctaBanner({
  title = 'Ready to offload your *operations?*',
  body = 'Tell us what’s slowing your team down. In 30 minutes — in your time zone — we’ll map exactly how a dedicated Akrostech team would take it off your plate.',
  label = 'Book a Free Consultation',
  href = '/contact/',
} = {}) {
  return `<section class="cta-banner" aria-labelledby="cta-title">
    <div class="container">
      <div class="cta-banner__panel" data-reveal="scale" data-spotlight>
        <div class="cta-banner__currents" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="cta-banner__content">
          ${eyebrow('Your next step', { dot: true })}
          <h2 class="cta-banner__title" id="cta-title">${rich(title)}</h2>
          <p class="cta-banner__body">${esc(body)}</p>
          <div class="cta-banner__actions">${button({ label, href, variant: 'primary', size: 'lg' })}</div>
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

/** Glass service card with spotlight + tilt. */
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

export function feature({ icon: iconName, title, desc }, { tone = 'lime', level = 3 } = {}) {
  return `<div class="feature" data-reveal>
    <span class="icon-badge icon-badge--${tone}">${icon(iconName, { size: 24 })}</span>
    <h${level} class="feature__title">${esc(title)}</h${level}>
    <p class="feature__desc">${esc(desc)}</p>
  </div>`;
}

export function avatar(initials, { size = 'md', label = '' } = {}) {
  return `<span class="avatar avatar--${size}"${label ? ` role="img" aria-label="${esc(label)}"` : ' aria-hidden="true"'}>${esc(initials)}</span>`;
}

export { plain };
