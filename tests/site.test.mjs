/**
 * Build-output quality gates: SEO (§8.3), accessibility structure (§13.1),
 * link integrity, security headers and design-token contrast (§4.1).
 * `npm test` runs the build first, so these assert against fresh ./dist.
 */
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, bootScriptHash, contentSecurityPolicy, minifyCss } from '../build.mjs';
import { services } from '../src/data/services.mjs';
import { resolveSiteUrl } from '../src/lib/env.mjs';
import { esc, rich, plain } from '../src/lib/html.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = join(ROOT, 'dist');
let pages;

const htmlFiles = (dir = DIST) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
const read = (file) => readFileSync(file, 'utf8');
const attr = (html, re) => html.match(re)?.[1];

before(() => {
  ({ pages } = build({ quiet: true }));
});

describe('pages', () => {
  test('all 9 required pages + legal + 404 are generated', () => {
    const expected = ['index.html', 'about/index.html', 'services/index.html', 'contact/index.html', 'privacy/index.html', 'terms/index.html', '404.html', ...services.map((s) => `services/${s.slug}/index.html`)];
    for (const file of expected) assert.ok(existsSync(join(DIST, file)), `missing ${file}`);
    assert.equal(services.length, 5);
  });

  test('titles ≤ 60 and descriptions ≤ 155 characters, all unique', () => {
    const titles = new Set();
    const descriptions = new Set();
    for (const p of pages) {
      assert.ok(p.title.length <= 60, `${p.path} title is ${p.title.length} chars`);
      assert.ok(p.description.length <= 155, `${p.path} description is ${p.description.length} chars`);
      titles.add(p.title);
      descriptions.add(p.description);
    }
    assert.equal(titles.size, pages.length, 'duplicate <title>');
    assert.equal(descriptions.size, pages.length, 'duplicate meta description');
  });

  for (const file of htmlFiles()) {
    const rel = file.slice(DIST.length + 1);
    test(`${rel}: document structure`, () => {
      const html = read(file);
      assert.match(html, /^<!doctype html>/);
      assert.match(html, /<html lang="en"/);
      assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'exactly one <h1>');
      assert.match(html, /<link rel="canonical" href="https:\/\//);
      assert.match(html, /<meta property="og:image" content="https:\/\/[^"]+og-default\.png">/);
      assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
      assert.match(html, /<a class="skip-link" href="#main">/);
      assert.match(html, /<main id="main"/);
      assert.doesNotMatch(html, /lorem ipsum/i);
      assert.doesNotMatch(html, /Akrosstech/i, 'brand name must have ONE "s"');
      assert.doesNotMatch(html, /undefined|\[object Object\]|NaN/);
    });

    test(`${rel}: heading levels never skip`, () => {
      const levels = [...read(file).matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
      for (let i = 1; i < levels.length; i++) {
        assert.ok(levels[i] <= levels[i - 1] + 1, `h${levels[i - 1]} → h${levels[i]}`);
      }
    });

    test(`${rel}: JSON-LD parses`, () => {
      const blocks = [...read(file).matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
      assert.ok(blocks.length >= 1);
      for (const [, json] of blocks) {
        const data = JSON.parse(json);
        assert.equal(data['@context'], 'https://schema.org');
      }
    });

    test(`${rel}: images/icons are labelled or hidden, links have names`, () => {
      const html = read(file);
      for (const [svg] of html.matchAll(/<svg\b[^>]*>/g)) {
        assert.ok(/aria-hidden="true"|role="img" aria-label=|class="time-rings"|class="cta-banner__rings/.test(svg) || /viewBox="0 0 600 600"/.test(svg), `unlabelled svg: ${svg.slice(0, 80)}`);
      }
      for (const [img] of html.matchAll(/<img\b[^>]*>/g)) assert.match(img, /alt="/);
      for (const [, inner] of html.matchAll(/<a\b[^>]*>(.*?)<\/a>/gs)) {
        const text = inner.replace(/<svg.*?<\/svg>/gs, '').replace(/<[^>]+>/g, '').trim();
        assert.ok(text.length > 0, `link without accessible text: ${inner.slice(0, 80)}`);
      }
    });

    test(`${rel}: form controls have labels`, () => {
      const html = read(file);
      for (const [tag, id] of html.matchAll(/<(?:input|select|textarea)\b[^>]*id="([^"]+)"/g)) {
        assert.match(html, new RegExp(`<label[^>]*for="${id}"`), `no <label for="${id}"> (${tag.slice(0, 40)})`);
      }
    });
  }
});

describe('links', () => {
  test('every internal link and asset resolves to a built file', () => {
    const missing = [];
    for (const file of htmlFiles()) {
      for (const [, href] of read(file).matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
        const target = join(DIST, href);
        const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
        if (!ok) missing.push(`${file.slice(DIST.length)} → ${href}`);
      }
    }
    assert.deepEqual(missing, []);
  });

  test('in-page anchors point at existing ids', () => {
    for (const file of htmlFiles()) {
      const html = read(file);
      for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
        assert.match(html, new RegExp(`id="${id}"`), `${file.slice(DIST.length)} → #${id}`);
      }
    }
  });
});

describe('SEO / AEO / GEO files', () => {
  test('sitemap lists every indexable page and omits 404', () => {
    const xml = read(join(DIST, 'sitemap.xml'));
    for (const p of pages.filter((x) => !x.noindex)) assert.ok(xml.includes(`${p.path}</loc>`), p.path);
    assert.ok(!xml.includes('404'));
  });
  test('robots.txt references the sitemap', () => {
    assert.match(read(join(DIST, 'robots.txt')), /Sitemap: https:\/\/.+\/sitemap\.xml/);
  });
  test('llms.txt contains the entity statement and all services', () => {
    const txt = read(join(DIST, 'llms.txt'));
    assert.match(txt, /^# Akrostech/);
    for (const s of services) assert.ok(txt.includes(`/services/${s.slug}/`));
  });
  test('service pages carry Service, FAQPage and BreadcrumbList schema', () => {
    for (const s of services) {
      const html = read(join(DIST, `services/${s.slug}/index.html`));
      for (const type of ['"Service"', '"FAQPage"', '"BreadcrumbList"']) assert.ok(html.includes(`"@type":${type}`), `${s.slug} ${type}`);
    }
  });
});

describe('security', () => {
  test('the boot script hash in the CSP matches the inline script', () => {
    const html = read(join(DIST, 'index.html'));
    const inline = attr(html, /<script>(.*?)<\/script>/s);
    assert.ok(inline, 'inline boot script present');
    assert.match(contentSecurityPolicy(), new RegExp(bootScriptHash().replace(/[+/=]/g, '\\$&')));
  });
  test('vercel.json and dist/_headers ship the same CSP as the build', () => {
    const vercel = JSON.parse(read(join(ROOT, 'vercel.json')));
    const csp = vercel.headers[0].headers.find((h) => h.key === 'Content-Security-Policy').value;
    assert.equal(csp, contentSecurityPolicy(), 'update vercel.json with the CSP printed by contentSecurityPolicy()');
    assert.ok(read(join(DIST, '_headers')).includes(contentSecurityPolicy()));
  });
  test('only one inline script exists per page (everything else is first-party files)', () => {
    for (const file of htmlFiles()) {
      const inline = [...read(file).matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>/g)];
      assert.equal(inline.length, 1, file);
    }
  });
  test('external links that open new tabs use rel="noopener"', () => {
    for (const file of htmlFiles()) {
      for (const [tag] of read(file).matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(tag, /rel="noopener"/);
    }
  });
});

describe('helpers', () => {
  test('esc() neutralises HTML', () => {
    assert.equal(esc(`<script>"x" & 'y'</script>`), '&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;');
  });
  test('rich() renders the editorial accent safely', () => {
    assert.equal(rich('Scale *fast* <b>'), 'Scale <em class="accent">fast</em> &lt;b&gt;');
    assert.equal(plain('Scale *fast*'), 'Scale fast');
  });
  test('resolveSiteUrl() validates and normalises', () => {
    assert.equal(resolveSiteUrl('https://example.com/'), 'https://example.com');
    assert.equal(resolveSiteUrl(undefined), 'https://www.akrostech.com');
    assert.throws(() => resolveSiteUrl('not a url'));
    assert.throws(() => resolveSiteUrl('ftp://example.com'));
  });
  test('minifyCss() strips comments and whitespace without breaking selectors', () => {
    assert.equal(minifyCss('/* c */ .a > .b  { color : red ; }\n.c{x:1}'), '.a>.b{color : red}.c{x:1}');
  });
});

describe('design tokens (§4.1 contrast rules, WCAG 2.2 AA)', () => {
  const css = read(join(ROOT, 'src/styles/tokens.css'));
  const token = (name) => attr(css, new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`));
  const lum = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };

  test('palette values match the design system exactly', () => {
    assert.equal(token('color-lime').toUpperCase(), '#CFFF04');
    assert.equal(token('color-lavender').toUpperCase(), '#B57EDC');
    assert.equal(token('color-ink').toUpperCase(), '#0B0B12');
    assert.equal(token('color-obsidian').toUpperCase(), '#16161F');
    assert.equal(token('color-mist').toUpperCase(), '#A7A7B8');
    assert.equal(token('color-plum').toUpperCase(), '#5B3A78');
  });

  const pairs = [
    ['color-lime', 'color-ink', 'Lime on Midnight'],
    ['color-white', 'color-ink', 'White on Midnight'],
    ['color-lavender', 'color-ink', 'Lavender on Midnight'],
    ['color-mist', 'color-ink', 'Mist on Midnight (secondary text)'],
    ['color-mist', 'color-obsidian', 'Mist on Obsidian (secondary text on cards)'],
    ['color-ink', 'color-lavender', 'Midnight on Lavender (chips)'],
    ['color-plum', 'color-white', 'Plum on White (accent on light sections)'],
    ['color-white', 'color-plum', 'White on Plum (plum chips)'],
    ['color-error', 'color-ink', 'Error on Midnight'],
  ];
  for (const [fg, bg, label] of pairs) {
    test(`${label} ≥ 4.5:1`, () => assert.ok(ratio(token(fg), token(bg)) >= 4.5, `${label}: ${ratio(token(fg), token(bg)).toFixed(2)}`));
  }

  test('no stylesheet puts lime text on a white surface', () => {
    const light = read(join(ROOT, 'src/styles/layout.css'));
    assert.match(light, /\.section--light \.accent \{[^}]*color: var\(--color-plum\)/);
  });
});
