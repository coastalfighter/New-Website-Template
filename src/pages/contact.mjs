/** CONTACT — "The signal has reached you." (§7.6) */
import { esc, each } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import { button, sectionHead, pageHero, faqList, eyebrow } from '../components/ui.mjs';
import { breadcrumbSchema, faqSchema } from '../components/layout.mjs';
import { contactBeacon } from '../components/hero-visuals.mjs';
import { services } from '../data/services.mjs';
import { contactFaqs, budgetOptions } from '../data/content.mjs';
import { contact, regions } from '../config.mjs';

export const meta = {
  path: '/contact/',
  title: 'Contact Akrostech — Book a Free Consultation',
  description:
    'Talk to Akrostech in your time zone. Book a free 30-minute consultation about web development, recruitment, virtual, accounting or legal assistance.',
};

/** Accessible field wrapper: visible label, hint, inline error slot (§12 form fields). */
function field({ id, label, type = 'text', required = true, autocomplete, hint, control }) {
  const describedBy = [hint ? `${id}-hint` : '', `${id}-error`].filter(Boolean).join(' ');
  const input =
    control ??
    `<input class="field__control" id="${id}" name="${id}" type="${type}"${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${required ? ' required aria-required="true"' : ''} aria-describedby="${describedBy}">`;
  return `<div class="field" data-field="${id}">
    <label class="field__label" for="${id}">${esc(label)}${required ? '<span class="field__req" aria-hidden="true">*</span>' : '<span class="field__optional">Optional</span>'}</label>
    ${input}
    ${hint ? `<p class="field__hint" id="${id}-hint">${esc(hint)}</p>` : ''}
    <p class="field__error" id="${id}-error" data-error-for="${id}"></p>
  </div>`;
}

function select({ id, label, options, placeholder, hint }) {
  const control = `<div class="field__select-wrap"><select class="field__control field__control--select" id="${id}" name="${id}" required aria-required="true" aria-describedby="${hint ? `${id}-hint ` : ''}${id}-error">
      <option value="" disabled selected>${esc(placeholder)}</option>
      ${each(options, (o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`)}
    </select>${icon('chevronDown', { size: 18, className: 'field__chevron' })}</div>`;
  return field({ id, label, control, hint });
}

function form() {
  const serviceOptions = [...services.map((s) => ({ value: s.slug, label: s.name })), { value: 'general', label: 'Not sure / General inquiry' }];
  const budget = budgetOptions.map((b) => ({ value: b, label: b }));
  return `<form class="contact-form" id="contact-form" novalidate data-contact-form aria-labelledby="form-title">
    <div class="contact-form__head">
      <h2 class="contact-form__title" id="form-title">Tell us what’s slowing you down.</h2>
      <p class="contact-form__lead">A real human replies within one business hour. Fields marked <span aria-hidden="true">*</span><span class="visually-hidden">with an asterisk</span> are required.</p>
    </div>
    <div class="form-summary" role="alert" tabindex="-1" hidden data-error-summary>
      <p class="form-summary__title">${icon('alert', { size: 20 })}Please fix the highlighted fields:</p>
      <ul data-error-list></ul>
    </div>
    <div class="contact-form__grid">
      ${field({ id: 'name', label: 'Full name', autocomplete: 'name' })}
      ${field({ id: 'email', label: 'Business email', type: 'email', autocomplete: 'email', hint: 'We’ll only use this to reply to you.' })}
      ${field({ id: 'company', label: 'Company name', autocomplete: 'organization' })}
      ${select({ id: 'service', label: 'Service interested in', options: serviceOptions, placeholder: 'Choose a service' })}
      ${select({ id: 'budget', label: 'Project budget range', options: budget, placeholder: 'Choose a range', hint: 'Monthly or per project — a rough idea helps us prepare.' })}
      <div class="field field--full" data-field="message">
        <label class="field__label" for="message">Message<span class="field__req" aria-hidden="true">*</span></label>
        <textarea class="field__control field__control--textarea" id="message" name="message" rows="6" required aria-required="true" maxlength="2000" aria-describedby="message-hint message-error"></textarea>
        <p class="field__hint" id="message-hint"><span>What would you hand over first? Tools, volumes and timelines help.</span><span class="field__count" data-char-count aria-hidden="true">0 / 2000</span></p>
        <p class="field__error" id="message-error" data-error-for="message"></p>
      </div>
      <div class="field field--full field--check">
        <input class="checkbox" type="checkbox" id="nda" name="nda" value="yes">
        <label for="nda">Send me a mutual NDA before the call</label>
      </div>
      <div class="field--honeypot" aria-hidden="true">
        <label for="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
      </div>
    </div>
    <div class="contact-form__footer">
      <button class="btn btn--primary btn--lg contact-form__submit" type="submit" data-submit data-magnetic>
        <span class="btn__label" data-submit-label>Send message</span>
        <span class="btn__spinner" aria-hidden="true"></span>
        <span class="btn__icon">${icon('arrowRight', { size: 18 })}</span>
      </button>
      <p class="contact-form__privacy">By sending this form you agree to our <a href="/privacy/">Privacy Policy</a>. No spam, ever.</p>
    </div>
    <div class="form-success" hidden tabindex="-1" data-form-success>
      <span class="form-success__icon">${icon('checkCircle', { size: 48 })}</span>
      <h2 class="form-success__title">Message received.</h2>
      <p>Expect a reply from a real human within one business hour. In the meantime, you can grab a time directly:</p>
      ${button({ label: 'Book a meeting', href: contact.bookingUrl, variant: 'secondary', iconName: 'calendar', attrs: 'rel="noopener" target="_blank"' })}
    </div>
  </form>`;
}

export function render({ siteUrl }) {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact/' }];
  const body = `
${pageHero({
  variant: 'contact',
  kicker: 'Contact',
  badge: 'Free',
  title: 'Let’s build something *together.*',
  sub: 'Book a free 30-minute consultation or send us a message. We’ll talk in your time zone, about your operations — and you’ll leave with a clear plan either way.',
  crumbs,
  actions: `${button({ label: 'Send a message', href: '#contact-form', variant: 'primary', iconName: 'arrowDown' })}${button({ label: 'Book a meeting', href: contact.bookingUrl, variant: 'secondary', iconName: 'calendar', attrs: 'rel="noopener" target="_blank"' })}`,
  visual: contactBeacon(),
})}

<section class="section contact" aria-label="Contact options">
  <div class="container contact__layout">
    ${form()}
    <aside class="contact__aside" aria-label="Contact information">
      <div class="info-card" data-reveal>
        <h2 class="info-card__title">Reach us directly</h2>
        <ul class="info-list">
          <li><span class="info-list__icon">${icon('mail', { size: 20 })}</span><span><span class="info-list__label">Email</span><a href="mailto:${contact.email}">${contact.email}</a></span></li>
          <li><span class="info-list__icon">${icon('phone', { size: 20 })}</span><span><span class="info-list__label">Phone</span><a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a></span></li>
          <li><span class="info-list__icon">${icon('pin', { size: 20 })}</span><span><span class="info-list__label">Address</span><address>${contact.addressLines.map(esc).join('<br>')}</address></span></li>
          <li><span class="info-list__icon">${icon('clock', { size: 20 })}</span><span><span class="info-list__label">Business hours</span>${esc(contact.hours)}<br><span class="info-list__muted">Plus live coverage in your own hours once engaged.</span></span></li>
        </ul>
      </div>
      <div class="info-card info-card--accent" data-reveal data-spotlight>
        ${eyebrow('Prefer to talk?', { tone: 'ink' })}
        <h2 class="info-card__title">Schedule a call directly.</h2>
        <p>Pick a slot that suits you — times are shown in your local time zone.</p>
        ${button({ label: 'Book a meeting', href: contact.bookingUrl, variant: 'inverse', iconName: 'calendar', attrs: 'rel="noopener" target="_blank"' })}
      </div>
    </aside>
  </div>
</section>

<section class="section section--tight desks" aria-labelledby="desks-title">
  <div class="container">
    ${sectionHead({ kicker: 'Regional desks', title: 'Four regions. *One* working day.', id: 'desks-title' })}
    <ul class="desks__grid" data-stagger>
      ${each(regions, (r) => `<li class="desk" data-reveal data-spotlight>
        <p class="desk__region">${esc(r.name)}</p>
        <p class="desk__time"><time data-tz="${esc(r.tz)}">--:--</time><span class="desk__city">${esc(r.city)}</span></p>
        <p class="desk__hours">${icon('clock', { size: 16 })}Live coverage, 9 AM – 6 PM local</p>
      </li>`)}
    </ul>
  </div>
</section>

<section class="section section--tight map-section" aria-labelledby="map-title">
  <div class="container">
    <h2 class="visually-hidden" id="map-title">Office location</h2>
    <div class="map-placeholder" role="img" aria-label="Map placeholder — office location map coming soon" data-reveal>
      <div class="map-placeholder__grid"></div>
      <span class="map-placeholder__pin"><span class="map-placeholder__ripple"></span>${icon('pin', { size: 28 })}</span>
      <p class="map-placeholder__label">${icon('pin', { size: 16 })}Map embed placeholder — replace with Google Maps</p>
    </div>
  </div>
</section>

<section class="section faq-section" aria-labelledby="faq-title">
  <div class="container faq-section__layout">
    ${sectionHead({ kicker: 'Before you reach out', title: 'Quick *answers.*', id: 'faq-title' })}
    ${faqList(contactFaqs, { idPrefix: 'contact-faq' })}
  </div>
</section>`;

  return { ...meta, pageClass: 'page-contact', body, schema: [breadcrumbSchema(siteUrl, crumbs), faqSchema(contactFaqs), { '@context': 'https://schema.org', '@type': 'ContactPage', name: meta.title, url: `${siteUrl}${meta.path}` }] };
}
