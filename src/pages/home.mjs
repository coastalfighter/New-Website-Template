/**
 * HOME — "Scale the business, not the headcount."
 * Story arc follows the design system's six chapters (§2.4): Tension → Shift
 * → Toolkit → Method → Proof → Invitation.
 */
import { esc, each } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import { button, eyebrow, sectionHead, serviceCard, feature, faqList, ctaBanner, avatar } from '../components/ui.mjs';
import { faqSchema } from '../components/layout.mjs';
import { services } from '../data/services.mjs';
import { stats, clients, differentiators, process, testimonials, homeFaqs, industries } from '../data/content.mjs';
import { regions, hub } from '../config.mjs';

export const meta = {
  path: '/',
  title: 'Akrostech — Outsourced Backend Operations Teams',
  description:
    'Dedicated teams for web development, recruitment, virtual, accounting and legal assistance — working live in your hours. Scale without the headcount.',
};

function hero() {
  const globeData = esc(JSON.stringify({ hub: hub.location, targets: regions.map((r) => r.location) }));
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__glow hero__glow--lavender"></div>
      <div class="hero__glow hero__glow--lime"></div>
      <div class="hero__grid"></div>
    </div>
    <div class="container hero__inner">
      <div class="hero__content">
        ${eyebrow('Team online — working in your time zone', { dot: true })}
        <h1 class="hero__title display" id="hero-title" data-split>Scale the business, <em class="accent">not</em> the headcount.</h1>
        <p class="hero__sub" data-reveal>Akrostech is the backend operations partner for growing companies. Dedicated teams for engineering, recruiting, admin, finance and legal work — plugged into your tools and working your hours, so your people can focus on growth.</p>
        <div class="hero__actions" data-reveal>
          ${button({ label: 'Get Started', href: '/contact/', variant: 'primary', size: 'lg', attrs: 'data-cta="hero"' })}
          ${button({ label: 'See Our Services', href: '#services', variant: 'secondary', size: 'lg', iconName: 'arrowDown' })}
        </div>
        <ul class="hero__trust" aria-label="At a glance" data-reveal>
          <li><strong>5</strong> service pillars</li>
          <li><strong>4</strong> regions, live hours</li>
          <li><strong>NDA-first</strong> onboarding</li>
        </ul>
      </div>
      <div class="hero__visual">
        <div class="globe" data-globe="${globeData}" aria-hidden="true">
          <div class="globe__poster"></div>
          <canvas class="globe__canvas" data-globe-canvas></canvas>
          <div class="globe__halo"></div>
        </div>
        <ul class="region-list" aria-label="Local time in the regions we cover" data-reveal>
          ${each(regions, (r, i) => `<li class="region-list__item" data-region="${i}">
            <span class="region-list__name">${esc(r.city)}</span>
            <time class="region-list__time" data-tz="${esc(r.tz)}">--:--</time>
          </li>`)}
        </ul>
      </div>
    </div>
    <a class="scroll-cue" href="#trusted" aria-label="Scroll to content"><span class="scroll-cue__label">Scroll</span><span class="scroll-cue__track"><span class="scroll-cue__thumb"></span></span></a>
  </section>`;
}

function trusted() {
  const logos = (hidden) => each(clients, (c) => `<li class="logo-placeholder"${hidden ? ' aria-hidden="true"' : ''}><span class="logo-placeholder__shape"></span>${esc(c)}</li>`);
  return `<section class="trusted" id="trusted" aria-labelledby="trusted-title">
    <div class="container"><h2 class="trusted__title eyebrow" id="trusted-title">Trusted by teams at</h2></div>
    <div class="marquee" data-marquee>
      <ul class="marquee__track">${logos(false)}${logos(true)}</ul>
    </div>
  </section>`;
}

function servicesSection() {
  return `<section class="section services-overview" id="services" aria-labelledby="services-title">
    <div class="container">
      ${sectionHead({ kicker: '03 — The toolkit · Five pillars, one partner', title: 'Everything behind the scenes, *handled.*', lead: 'Pick one service or combine several. Every team is trained in your tools, your process and your hours — and managed by us, so you never babysit a vendor.', id: 'services-title' })}
      <div class="services-grid" data-stagger>${each(services, serviceCard)}
        <aside class="services-grid__cta" data-reveal>
          <p class="services-grid__cta-title">Not sure where to start?</p>
          <p>Most clients begin with one pillar and add more within months. We’ll map where the hours are leaking.</p>
          ${button({ label: 'Compare all services', href: '/services/', variant: 'ghost' })}
        </aside>
      </div>
    </div>
  </section>`;
}

/** Light section — design system's White "light sections" role (§4.1 ratio). */
function why() {
  return `<section class="section section--light why" aria-labelledby="why-title">
    <div class="container">
      <div class="why__layout">
        <div class="why__intro">
          ${sectionHead({ kicker: '02 — The shift · Why Akrostech', title: 'Outsourcing, *upgraded.*', lead: 'Most outsourcing feels distant: emails at night, answers tomorrow, a team you never meet. We built the opposite — a dedicated team that shows up in your hours, on your calls, accountable to your goals.', id: 'why-title' })}
          <div class="clock-sync" data-reveal>
            <p class="clock-sync__label">Your 9 AM is our 9 AM.</p>
            <ul class="clock-sync__list">
              ${each(regions, (r) => `<li class="clock-sync__item"><span class="clock-sync__face" aria-hidden="true"><span class="clock-sync__hand clock-sync__hand--h"></span><span class="clock-sync__hand clock-sync__hand--m"></span></span><span class="clock-sync__city">${esc(r.city)}</span><span class="clock-sync__time">09:00</span></li>`)}
              <li class="clock-sync__item clock-sync__item--team"><span class="clock-sync__status">${icon('checkCircle', { size: 22 })}</span><span class="clock-sync__city">Your team</span><span class="clock-sync__time">In sync</span></li>
            </ul>
          </div>
        </div>
        <div class="why__grid" data-stagger>
          ${each(differentiators, (d, i) => feature(d, { tone: i % 2 ? 'plum' : 'ink' }))}
        </div>
      </div>
    </div>
  </section>`;
}

function how() {
  return `<section class="section process" aria-labelledby="process-title" data-process>
    <div class="container">
      ${sectionHead({ kicker: '04 — The method · How it works', title: 'From first call to *fully* embedded.', lead: 'A simple, documented path from hello to a team that works like it has always been yours.', align: 'center', id: 'process-title' })}
      <ol class="process__steps" data-stagger>
        <li class="process__rail" aria-hidden="true"><span class="process__rail-fill" data-process-fill></span></li>
        ${each(process, (step, i) => `<li class="process__step" data-reveal data-process-step>
          <span class="process__node" aria-hidden="true"><span>${String(i + 1).padStart(2, '0')}</span></span>
          <p class="process__meta">${esc(step.meta)}</p>
          <h3 class="process__title">${esc(step.title)}</h3>
          <p class="process__desc">${esc(step.desc)}</p>
        </li>`)}
      </ol>
    </div>
  </section>`;
}

function impact() {
  return `<section class="section impact" aria-labelledby="impact-title">
    <div class="impact__bg" aria-hidden="true"></div>
    <div class="container">
      ${sectionHead({ kicker: '05 — The proof · Results', title: 'Built for teams that *move* fast.', lead: 'Numbers we’re proud of — and that we report on, every month, for every client.', id: 'impact-title' })}
      <dl class="stats" data-stagger>
        ${each(stats, (s) => `<div class="stat" data-reveal>
          <dt class="stat__label">${esc(s.label)}</dt>
          <dd class="stat__value"><span data-counter="${s.value}">${s.value}</span><span class="stat__suffix">${esc(s.suffix)}</span></dd>
          <dd class="stat__note">${esc(s.note)}</dd>
        </div>`)}
      </dl>
    </div>
    <div class="marquee marquee--kinetic" aria-label="Industries we serve">
      <ul class="marquee__track marquee__track--slow">
        ${[0, 1].map((dup) => each(industries, (ind, i) => `<li class="kinetic${i % 3 === 1 ? ' kinetic--outline' : i % 3 === 2 ? ' kinetic--lavender' : ''}"${dup ? ' aria-hidden="true"' : ''}>${esc(ind)}<span class="kinetic__star" aria-hidden="true">✦</span></li>`)).join('')}
      </ul>
    </div>
  </section>`;
}

function testimonialsSection() {
  return `<section class="section testimonials" aria-labelledby="testimonials-title">
    <div class="container">
      <div class="testimonials__head">
        ${sectionHead({ kicker: 'In their words', title: 'Operators, *on the record.*', id: 'testimonials-title' })}
        <div class="carousel-controls" data-reveal>
          <button class="icon-btn" type="button" data-carousel-prev aria-controls="testimonial-track">${icon('chevronLeft', { size: 20 })}<span class="visually-hidden">Previous testimonial</span></button>
          <button class="icon-btn" type="button" data-carousel-next aria-controls="testimonial-track">${icon('chevronRight', { size: 20 })}<span class="visually-hidden">Next testimonial</span></button>
        </div>
      </div>
      <div class="carousel" data-carousel>
        <ul class="carousel__track" id="testimonial-track" aria-label="Client testimonials" tabindex="0">
          ${each(testimonials, (t, i) => `<li class="carousel__slide" aria-roledescription="slide" aria-label="${i + 1} of ${testimonials.length}">
            <figure class="testimonial" data-spotlight>
              <span class="testimonial__mark" aria-hidden="true">${icon('quote', { size: 40 })}</span>
              <blockquote class="testimonial__quote"><p>${esc(t.quote)}</p></blockquote>
              <figcaption class="testimonial__author">
                ${avatar(t.initials)}
                <span><span class="testimonial__name">${esc(t.name)}</span><span class="testimonial__role">${esc(t.role)}, ${esc(t.company)}</span></span>
              </figcaption>
            </figure>
          </li>`)}
        </ul>
        <div class="carousel__dots" data-carousel-dots aria-hidden="true">${each(testimonials, (_, i) => `<span class="carousel__dot${i === 0 ? ' is-active' : ''}"></span>`)}</div>
      </div>
    </div>
  </section>`;
}

function faq() {
  return `<section class="section faq-section" aria-labelledby="faq-title">
    <div class="container faq-section__layout">
      ${sectionHead({ kicker: 'FAQ', title: 'Questions, *answered.*', lead: 'Straight answers to what operators ask us most. Anything else? Ask us on a call.', id: 'faq-title' })}
      ${faqList(homeFaqs, { idPrefix: 'home-faq' })}
    </div>
  </section>`;
}

export function render({ siteUrl }) {
  return {
    ...meta,
    pageClass: 'page-home',
    schema: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Akrostech', url: `${siteUrl}/`, publisher: { '@id': `${siteUrl}/#organization` } },
      faqSchema(homeFaqs),
    ],
    body: [hero(), trusted(), servicesSection(), why(), how(), impact(), testimonialsSection(), faq(), ctaBanner()].join('\n'),
  };
}
