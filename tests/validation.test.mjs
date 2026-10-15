/**
 * Unit tests for the contact-form rules (src/scripts/modules/validation.js).
 * Run with: npm test
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateField,
  validateSubmission,
  isLikelyBot,
  toPayload,
  normalise,
  LIMITS,
  SERVICE_VALUES,
  BUDGET_VALUES,
} from '../src/scripts/modules/validation.js';

const valid = {
  name: 'Jordan Lee',
  email: 'jordan@northwind.com',
  company: 'Northwind Traders',
  service: 'web-development',
  budget: '$5K–$15K',
  message: 'We need a dedicated team to rebuild our marketing site.',
};

describe('normalise', () => {
  test('trims and collapses whitespace', () => {
    assert.equal(normalise('  Jordan   Lee \n'), 'Jordan Lee');
  });
  test('handles null and undefined', () => {
    assert.equal(normalise(undefined), '');
    assert.equal(normalise(null), '');
  });
});

describe('validateField — name', () => {
  test('requires a value', () => assert.match(validateField('name', '  '), /your name/));
  test('rejects a single character', () => assert.match(validateField('name', 'J'), /short/));
  test('rejects names over the limit', () => assert.match(validateField('name', 'a'.repeat(LIMITS.nameMax + 1)), /under/));
  test('rejects names without letters', () => assert.match(validateField('name', '12345'), /letters/));
  test('accepts unicode names', () => {
    assert.equal(validateField('name', 'Zoë Ångström'), '');
    assert.equal(validateField('name', 'प्रिया शर्मा'), '');
  });
});

describe('validateField — email', () => {
  test('requires a value', () => assert.match(validateField('email', ''), /business email/));
  for (const bad of ['jordan', 'jordan@', 'jordan@northwind', 'jordan@@northwind.com', 'jor dan@northwind.com', '@northwind.com', 'jordan@northwind.c']) {
    test(`rejects "${bad}"`, () => assert.match(validateField('email', bad), /looks a little off/));
  }
  for (const good of ['jordan@northwind.com', 'j.lee+ops@sub.northwind.co.uk', 'ops@akrostech.io', 'founder@gmail.com']) {
    test(`accepts "${good}"`, () => assert.equal(validateField('email', good), ''));
  }
  test('rejects addresses over 254 characters', () => {
    assert.match(validateField('email', `${'a'.repeat(250)}@x.com`), /looks a little off/);
  });
});

describe('validateField — selects', () => {
  test('service must be one of the offered values', () => {
    for (const v of SERVICE_VALUES) assert.equal(validateField('service', v), '');
    assert.match(validateField('service', ''), /Choose/);
    assert.match(validateField('service', 'seo'), /from the list/);
  });
  test('budget must be one of the offered ranges', () => {
    for (const v of BUDGET_VALUES) assert.equal(validateField('budget', v), '');
    assert.match(validateField('budget', ''), /budget range/);
    assert.match(validateField('budget', '$1M'), /from the list/);
  });
});

describe('validateField — message', () => {
  test('requires a value', () => assert.match(validateField('message', ''), /what you need/));
  test('enforces the minimum length', () => assert.match(validateField('message', 'Too short'), /at least/));
  test('enforces the maximum length', () => assert.match(validateField('message', 'x'.repeat(LIMITS.messageMax + 1)), /under/));
  test('accepts a reasonable message with line breaks', () => {
    assert.equal(validateField('message', 'Line one of the brief.\nLine two with detail.'), '');
  });
});

describe('validateSubmission', () => {
  test('passes a complete, valid submission', () => {
    assert.deepEqual(validateSubmission(valid), { valid: true, errors: {} });
  });
  test('reports every failing field at once', () => {
    const result = validateSubmission({});
    assert.equal(result.valid, false);
    assert.deepEqual(Object.keys(result.errors).sort(), ['budget', 'company', 'email', 'message', 'name', 'service']);
  });
  test('handles a missing data object', () => {
    assert.equal(validateSubmission(undefined).valid, false);
  });
});

describe('spam + payload', () => {
  test('honeypot flags bots', () => {
    assert.equal(isLikelyBot({ website: 'http://spam.example' }), true);
    assert.equal(isLikelyBot({ website: '' }), false);
    assert.equal(isLikelyBot({}), false);
  });
  test('payload is normalised and whitelisted', () => {
    const now = new Date('2026-10-15T10:00:00Z');
    const payload = toPayload({ ...valid, email: ' Jordan@Northwind.COM ', nda: 'yes', website: '', extra: 'drop me', timezone: 'America/Chicago' }, now);
    assert.deepEqual(payload, {
      name: 'Jordan Lee',
      email: 'jordan@northwind.com',
      company: 'Northwind Traders',
      service: 'web-development',
      budget: '$5K–$15K',
      message: valid.message,
      ndaRequested: true,
      timezone: 'America/Chicago',
      submittedAt: '2026-10-15T10:00:00.000Z',
    });
  });
});
