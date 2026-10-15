/**
 * Contact form (§7.6): inline, friendly validation on blur and on input once
 * a field has been touched; an error summary on submit that links to each
 * field; a loading state; and a success state announced to screen readers.
 *
 * Submission is logged to the console until a backend is connected — swap
 * `deliver()` for a fetch() to your API route, form service or CRM webhook.
 */
import { $, $$, announce, prefersReducedMotion } from './utils.js';
import { validateField, validateSubmission, isLikelyBot, toPayload, LIMITS } from './validation.js';
import { visitorZone } from './clocks.js';
import { burst } from './confetti.js';

/** Replace this with a real request when the backend is ready. */
async function deliver(payload) {
  await new Promise((resolve) => window.setTimeout(resolve, 1200));
  console.info('[Akrostech] Contact form submission', payload);
  return { ok: true };
}

function readForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  data.timezone = visitorZone;
  return data;
}

export function initContactForm() {
  const form = $('[data-contact-form]');
  if (!form) return;

  const summary = $('[data-error-summary]', form);
  const summaryList = $('[data-error-list]', form);
  const submit = $('[data-submit]', form);
  const submitLabel = $('[data-submit-label]', form);
  const success = $('[data-form-success]', form);
  const counter = $('[data-char-count]', form);
  const touched = new Set();

  // Pre-select the service when arriving from a service page CTA (?service=slug).
  const preset = new URLSearchParams(window.location.search).get('service');
  const serviceSelect = form.elements.namedItem('service');
  if (preset && serviceSelect && [...serviceSelect.options].some((o) => o.value === preset)) serviceSelect.value = preset;

  const showError = (name, message) => {
    const wrapper = $(`[data-field="${name}"]`, form);
    const control = form.elements.namedItem(name);
    const slot = $(`[data-error-for="${name}"]`, form);
    if (!wrapper || !control || !slot) return;
    wrapper.classList.toggle('is-invalid', Boolean(message));
    wrapper.classList.toggle('is-valid', !message && Boolean(String(control.value).trim()));
    control.setAttribute('aria-invalid', String(Boolean(message)));
    slot.textContent = message;
  };

  const check = (name) => {
    const control = form.elements.namedItem(name);
    if (!control) return '';
    const message = validateField(name, control.value);
    showError(name, message);
    return message;
  };

  for (const control of $$('input, select, textarea', form)) {
    const { name } = control;
    if (!name || name === 'website' || name === 'nda') continue;
    control.addEventListener('blur', () => {
      if (String(control.value).trim() || touched.has(name)) {
        touched.add(name);
        check(name);
      }
    });
    control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'input', () => {
      if (touched.has(name)) check(name);
    });
  }

  if (counter) {
    const message = form.elements.namedItem('message');
    const update = () => { counter.textContent = `${message.value.length} / ${LIMITS.messageMax}`; };
    message.addEventListener('input', update);
    update();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submit.getAttribute('aria-busy') === 'true') return;

    const data = readForm(form);
    const { valid, errors } = validateSubmission(data);

    for (const name of ['name', 'email', 'company', 'service', 'budget', 'message']) {
      touched.add(name);
      showError(name, errors[name] || '');
    }

    if (!valid) {
      summaryList.replaceChildren(
        ...Object.entries(errors).map(([name, message]) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${name}`;
          a.textContent = message;
          a.addEventListener('click', (e) => {
            e.preventDefault();
            form.elements.namedItem(name)?.focus();
          });
          li.append(a);
          return li;
        }),
      );
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;

    // Silently drop bot submissions while showing the normal success state.
    const bot = isLikelyBot(data);

    submit.setAttribute('aria-busy', 'true');
    submitLabel.textContent = 'Sending…';
    try {
      if (!bot) await deliver(toPayload(data));
      form.classList.add('is-sent');
      success.hidden = false;
      success.focus();
      announce('Message received. Expect a reply from a real human within one business hour.');
      if (!prefersReducedMotion()) burst(success);
    } catch (error) {
      console.error('[Akrostech] Contact form delivery failed', error);
      summaryList.replaceChildren(Object.assign(document.createElement('li'), { textContent: 'Something went wrong on our side. Please try again, or email hello@akrostech.com.' }));
      summary.hidden = false;
      summary.focus();
    } finally {
      submit.removeAttribute('aria-busy');
      submitLabel.textContent = 'Send message';
    }
  });
}
