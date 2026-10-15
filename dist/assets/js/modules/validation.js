/**
 * Contact-form validation rules — pure functions with no DOM access, so the
 * same logic is unit-tested in Node (tests/validation.test.mjs) and run in
 * the browser. Messages follow the brand voice: friendly, specific (§7.6).
 */

export const LIMITS = Object.freeze({
  nameMin: 2,
  nameMax: 100,
  companyMax: 120,
  messageMin: 20,
  messageMax: 2000,
});

export const SERVICE_VALUES = Object.freeze([
  'web-development',
  'recruitment-assistance',
  'virtual-assistance',
  'accounting-assistance',
  'legal-assistance',
  'general',
]);

export const BUDGET_VALUES = Object.freeze(['$1K–$5K', '$5K–$15K', '$15K–$50K', '$50K+', 'Let’s discuss']);

// Pragmatic RFC 5322 subset: local@domain.tld, no spaces, TLD ≥ 2 chars.
const EMAIL_RE = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)*\.[A-Z]{2,}$/i;

/** Collapse whitespace and trim user input. */
export const normalise = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

/**
 * Validate a single field.
 * @param {string} name   Field name
 * @param {string} raw    Raw field value
 * @returns {string} Error message, or '' when valid.
 */
export function validateField(name, raw) {
  const value = name === 'message' ? String(raw ?? '').trim() : normalise(raw);

  switch (name) {
    case 'name':
      if (!value) return 'Please tell us your name.';
      if (value.length < LIMITS.nameMin) return 'That name looks a little short — mind checking it?';
      if (value.length > LIMITS.nameMax) return `Please keep your name under ${LIMITS.nameMax} characters.`;
      if (!/\p{L}/u.test(value)) return 'Please use letters in your name.';
      return '';

    case 'email': {
      if (!value) return 'We’ll need your business email to reply.';
      if (value.length > 254 || !EMAIL_RE.test(value)) return 'That email looks a little off — mind checking it?';
      return '';
    }

    case 'company':
      if (!value) return 'Which company are you with?';
      if (value.length > LIMITS.companyMax) return `Please keep the company name under ${LIMITS.companyMax} characters.`;
      return '';

    case 'service':
      if (!value) return 'Choose the service you’re most interested in.';
      if (!SERVICE_VALUES.includes(value)) return 'Please choose a service from the list.';
      return '';

    case 'budget':
      if (!value) return 'Choose a budget range — a rough idea is fine.';
      if (!BUDGET_VALUES.includes(value)) return 'Please choose a budget range from the list.';
      return '';

    case 'message':
      if (!value) return 'Tell us a little about what you need.';
      if (value.length < LIMITS.messageMin) return `A bit more detail helps — at least ${LIMITS.messageMin} characters.`;
      if (value.length > LIMITS.messageMax) return `Please keep your message under ${LIMITS.messageMax} characters.`;
      return '';

    default:
      return '';
  }
}

export const REQUIRED_FIELDS = Object.freeze(['name', 'email', 'company', 'service', 'budget', 'message']);

/**
 * Validate a whole submission.
 * @param {Record<string, string>} data
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validateSubmission(data) {
  const errors = {};
  for (const field of REQUIRED_FIELDS) {
    const message = validateField(field, data?.[field]);
    if (message) errors[field] = message;
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

/** True when the hidden honeypot field was filled — almost certainly a bot. */
export const isLikelyBot = (data) => normalise(data?.website).length > 0;

/** Build the clean payload sent to the backend (whitelisted keys only). */
export function toPayload(data, now = new Date()) {
  return {
    name: normalise(data.name),
    email: normalise(data.email).toLowerCase(),
    company: normalise(data.company),
    service: normalise(data.service),
    budget: normalise(data.budget),
    message: String(data.message ?? '').trim(),
    ndaRequested: data.nda === 'yes',
    timezone: data.timezone || null,
    submittedAt: now.toISOString(),
  };
}
