/**
 * Document shell: <head> (SEO, Open Graph, fonts, JSON-LD), the flowing
 * background layer, global header with mega-menu + mobile dialog, the
 * interactive footer, and the module entry script.
 */
import { esc, each, jsonLd } from '../lib/html.mjs';
import { icon } from './icons.mjs';
import { button } from './ui.mjs';
import { brand, contact, social, nav, legal, regions } from '../config.mjs';
import { services } from '../data/services.mjs';

/** Inline boot script: flips `no-js` → `js` before first paint. Hashed into the CSP at build time. */
export const BOOT_SCRIPT = "document.documentElement.classList.replace('no-js','js')";

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Geist:wght@300..700&family=Geist+Mono:wght@400..600&display=swap';

/** Brand mark: a time ring with the Signal arc in the Lime→Lavender gradient. */
export function logoMark(size = 34, id = 'logo') {
  return `<svg class="logo__mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <defs><linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#CFFF04"/><stop offset="1" stop-color="#B57EDC"/></linearGradient></defs>
    <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" stroke-opacity=".14" stroke-width="2.5"/>
    <path d="M16 3a13 13 0 0 1 11.3 19.4" fill="none" stroke="url(#${id}-g)" stroke-width="3" stroke-linecap="round"/>
    <path d="M9.5 22.5 16 8.5l6.5 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.75 17.5h8.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}

function logo(id) {
  return `<a class="logo" href="/" aria-label="${brand.name} — home">${logoMark(34, id)}<span class="logo__word">${brand.name}</span></a>`;
}

const isActive = (href, path) => (href === '/' ? path === '/' : path.startsWith(href));
const current = (href, path) => (href === path ? ' aria-current="page"' : isActive(href, path) ? ' aria-current="true"' : '');

/** Decorative flowing layer behind every page (flow.css / flow.js). */
function flowLayer() {
  return `<div class="flow" data-flow aria-hidden="true"><canvas class="flow__canvas" data-flow-canvas></canvas></div>
<svg class="flow-signal" data-flow-signal aria-hidden="true" focusable="false" preserveAspectRatio="none">
  <defs>
    <linearGradient id="flow-signal-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="4000">
      <stop offset="0" stop-color="#CFFF04"/><stop offset=".25" stop-color="#B57EDC"/><stop offset=".5" stop-color="#CFFF04"/><stop offset=".75" stop-color="#B57EDC"/><stop offset="1" stop-color="#CFFF04"/>
    </linearGradient>
  </defs>
  <path class="flow-signal__track"/>
  <path class="flow-signal__path"/>
  <g class="flow-signal__headgroup"><circle class="flow-signal__halo" r="14"/><circle class="flow-signal__head" r="7"/></g>
</svg>`;
}

function megaMenu(path) {
  return `<div class="mega" id="menu-services" data-menu-panel>
    <div class="mega__inner">
      <div class="mega__intro">
        <p class="eyebrow"><span class="eyebrow__dot" aria-hidden="true"></span>Five pillars · one partner</p>
        <p class="mega__title">Everything behind the scenes, <span class="hl">handled.</span></p>
        <a class="arrow-link" href="/services/"><span>All services</span>${icon('arrowRight', { size: 16 })}</a>
      </div>
      <ul class="mega__grid">
        ${each(services, (s) => `<li><a class="mega__card" href="/services/${s.slug}/"${current(`/services/${s.slug}/`, path)}>
          <span class="icon-badge icon-badge--${s.accent} icon-badge--sm">${icon(s.icon, { size: 20 })}</span>
          <span class="mega__card-text"><span class="mega__card-title">${esc(s.name)}</span><span class="mega__card-desc">${esc(s.nav)}</span></span>
        </a></li>`)}
      </ul>
    </div>
  </div>`;
}

function header(path) {
  const links = each(nav, (item) => {
    if (item.children) {
      return `<li class="site-nav__item site-nav__item--menu" data-menu>
        <a class="site-nav__link" href="${item.href}"${current(item.href, path)}>${esc(item.label)}</a>
        <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="menu-services" data-menu-toggle>
          <span class="visually-hidden">Show ${esc(item.label)} menu</span>${icon('chevronDown', { size: 16 })}
        </button>
        ${megaMenu(path)}
      </li>`;
    }
    return `<li class="site-nav__item"><a class="site-nav__link" href="${item.href}"${current(item.href, path)}>${esc(item.label)}</a></li>`;
  });

  return `<header class="site-header" data-header>
    <div class="site-header__bar" aria-hidden="true"></div>
    <div class="container site-header__inner">
      ${logo('logo-h')}
      <nav class="site-nav" aria-label="Primary"><ul class="site-nav__list">${links}</ul></nav>
      <div class="site-header__actions">
        <p class="live-badge" data-live-clock><span class="live-badge__dot" aria-hidden="true"></span><span data-live-clock-text>Working in your time zone</span></p>
        ${button({ label: 'Book a Call', href: '/contact/', variant: 'primary', iconName: 'arrowUpRight', attrs: 'data-cta="header"' })}
        <button class="menu-toggle" type="button" aria-haspopup="dialog" aria-controls="mobile-menu" data-mobile-open>
          ${icon('menu', { size: 22 })}<span class="visually-hidden">Open menu</span>
        </button>
      </div>
    </div>
    ${mobileMenu(path)}
  </header>`;
}

function mobileMenu(path) {
  return `<dialog class="mobile-menu" id="mobile-menu" aria-label="Site menu" data-mobile-menu>
    <div class="mobile-menu__inner">
      <div class="mobile-menu__top">
        ${logo('logo-m')}
        <button class="menu-toggle" type="button" data-mobile-close>${icon('close', { size: 22 })}<span class="visually-hidden">Close menu</span></button>
      </div>
      <nav aria-label="Mobile">
        <ul class="mobile-menu__list">
          ${each(nav, (item, i) => `<li style="--i:${i}"><a class="mobile-menu__link" href="${item.href}"${current(item.href, path)}><span class="mobile-menu__num">0${i + 1}</span><span class="mobile-menu__label">${esc(item.label)}</span></a>${
            item.children
              ? `<ul class="mobile-menu__sub">${each(services, (s) => `<li><a href="/services/${s.slug}/"${current(`/services/${s.slug}/`, path)}>${icon(s.icon, { size: 18 })}${esc(s.name)}</a></li>`)}</ul>`
              : ''
          }</li>`)}
        </ul>
      </nav>
      <div class="mobile-menu__footer">
        ${button({ label: 'Book a Free Consultation', href: '/contact/', variant: 'primary', magnetic: false })}
        <a class="mobile-menu__mail" href="mailto:${contact.email}">${icon('mail', { size: 18 })}${contact.email}</a>
      </div>
    </div>
  </dialog>`;
}

/**
 * Interactive footer — identical on every page:
 *  · kinetic marquee CTA whose speed and direction follow the scroll
 *  · copy-to-clipboard email, live regional desks
 *  · variable-weight wordmark whose letters swell toward the cursor
 *  · back-to-top button with a scroll-progress ring
 */
function footer() {
  const year = new Date().getFullYear();
  const phrases = ['Let’s talk', 'Book a free consultation', 'Your hours. Our horizon.', 'Scale without the overhead'];
  const marqueeItems = (hidden) =>
    each([...phrases, ...phrases], (p, i) => `<li class="footer-marquee__item${i % 2 ? ' footer-marquee__item--outline' : ''}"${hidden ? ' aria-hidden="true"' : ''}>${esc(p)}<span class="footer-marquee__star" aria-hidden="true">✦</span></li>`);

  return `<footer class="site-footer" data-footer>
    <div class="site-footer__spot" data-footer-spot aria-hidden="true"></div>
    <a class="footer-marquee" href="/contact/" data-footer-marquee aria-label="Book a free consultation">
      <ul class="footer-marquee__track" data-footer-marquee-track>${marqueeItems(false)}${marqueeItems(true)}</ul>
    </a>
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          ${logo('logo-f')}
          <p class="site-footer__tagline">Your hours. <span class="hl">Our horizon.</span></p>
          <p class="site-footer__entity">${esc(brand.entity)}</p>
          <button class="copy-email" type="button" data-copy="${contact.email}">
            <span class="copy-email__icon">${icon('mail', { size: 18 })}</span>
            <span class="copy-email__text">${contact.email}</span>
            <span class="copy-email__hint" data-copy-hint>Copy</span>
          </button>
          <ul class="social" aria-label="Social media">
            ${each(social, (s) => `<li><a class="social__link" href="${esc(s.href)}" rel="noopener" target="_blank">${icon(s.icon, { size: 20 })}<span class="visually-hidden">${esc(s.label)} (opens in a new tab)</span></a></li>`)}
          </ul>
        </div>
        <nav class="site-footer__col" aria-labelledby="footer-company"><h2 class="site-footer__heading" id="footer-company">Company</h2>
          <ul>${each(nav, (n) => `<li><a class="footer-link" href="${n.href}">${esc(n.label)}</a></li>`)}${each(legal, (n) => `<li><a class="footer-link" href="${n.href}">${esc(n.label)}</a></li>`)}</ul>
        </nav>
        <nav class="site-footer__col" aria-labelledby="footer-services"><h2 class="site-footer__heading" id="footer-services">Services</h2>
          <ul>${each(services, (s) => `<li><a class="footer-link" href="/services/${s.slug}/">${esc(s.name)}</a></li>`)}</ul>
        </nav>
        <div class="site-footer__col">
          <h2 class="site-footer__heading">Live desks</h2>
          <ul class="footer-desks">
            ${each(regions, (r) => `<li class="footer-desk"><span class="footer-desk__city">${esc(r.city)}</span><time class="footer-desk__time" data-tz="${esc(r.tz)}">--:--</time></li>`)}
          </ul>
          <p class="site-footer__contact"><a class="footer-link" href="tel:${contact.phoneHref}">${icon('phone', { size: 16 })}${contact.phoneDisplay}</a></p>
          <p class="site-footer__hours">${icon('clock', { size: 16 })}${esc(contact.hours)}</p>
        </div>
      </div>
    </div>
    <p class="footer-wordmark" data-wordmark aria-hidden="true">${[...brand.name].map((ch, i) => `<span class="footer-wordmark__char" style="--c:${i}">${ch}</span>`).join('')}</p>
    <div class="container">
      <div class="site-footer__bottom">
        <p>© ${year} ${brand.name}. All rights reserved.</p>
        <ul class="site-footer__legal">${each(legal, (l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`)}</ul>
        <button class="to-top" type="button" data-to-top>
          <svg class="to-top__ring" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" class="to-top__track"/><circle cx="24" cy="24" r="21" class="to-top__progress" data-to-top-progress/></svg>
          ${icon('arrowUpRight', { size: 18, className: 'to-top__icon' })}<span class="visually-hidden">Back to top</span>
        </button>
      </div>
    </div>
  </footer>`;
}

/**
 * Render a complete HTML document.
 * @param {object} page  { title, description, path, body, schema?, siteUrl, noindex?, pageClass? }
 */
export function layout({ title, description, path, body, schema = [], siteUrl, noindex = false, pageClass = '' }) {
  const url = `${siteUrl}${path}`;
  const ogImage = `${siteUrl}/assets/img/og-default.png`;
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#FFFFFF">
<meta name="color-scheme" content="light">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${brand.name}">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="${esc(url)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${brand.name} — ${esc(brand.tagline)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONT_HREF}">
<link rel="stylesheet" href="/assets/css/main.css">
<link rel="modulepreload" href="/assets/js/main.js">
<script>${BOOT_SCRIPT}</script>
${jsonLd(organizationSchema(siteUrl))}
${each(schema, jsonLd)}
</head>
<body class="${esc(pageClass)}">
<a class="skip-link" href="#main">Skip to content</a>
${flowLayer()}
<div class="cursor" aria-hidden="true" data-cursor-el><span class="cursor__dot"></span><span class="cursor__ring"><span class="cursor__label" data-cursor-label></span></span></div>
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
<div class="toast" role="status" data-toast></div>
<div class="visually-hidden" aria-live="polite" data-announcer></div>
<script type="module" src="/assets/js/main.js"></script>
</body>
</html>
`;
}

export function organizationSchema(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: brand.name,
    url: siteUrl,
    logo: `${siteUrl}/assets/img/logo.png`,
    description: brand.entity,
    slogan: brand.tagline,
    ...(brand.founded ? { foundingDate: brand.founded } : {}),
    email: contact.email,
    areaServed: ['US', 'GB', 'EU', 'AU', 'AE', 'SA', 'QA'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: contact.email, telephone: contact.phoneHref, availableLanguage: ['English'] },
    sameAs: social.map((s) => s.href),
  };
}

export function breadcrumbSchema(siteUrl, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.label, item: `${siteUrl}${item.href}` })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
