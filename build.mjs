#!/usr/bin/env node
/**
 * Akrostech static site generator — zero runtime dependencies.
 *
 *   node build.mjs            → writes the deployable site to ./dist
 *
 * Pages are rendered from typed data (src/data) through shared templates
 * (src/components), so the header, footer and five service pages can never
 * drift out of sync. The output is plain HTML/CSS/JS that any static host
 * serves as-is.
 */
import { mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync, copyFileSync, statSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

import { loadEnv, resolveSiteUrl } from './src/lib/env.mjs';
import { layout, BOOT_SCRIPT } from './src/components/layout.mjs';
import { services } from './src/data/services.mjs';
import { brand, contact } from './src/config.mjs';
import * as home from './src/pages/home.mjs';
import * as about from './src/pages/about.mjs';
import * as servicesHub from './src/pages/services.mjs';
import * as servicePage from './src/pages/service.mjs';
import * as contactPage from './src/pages/contact.mjs';
import { privacy, terms, notFound } from './src/pages/legal.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(ROOT, 'dist');

/** Stylesheets in cascade order. Each file maps to a design-system chapter. */
export const CSS_ORDER = ['tokens.css', 'base.css', 'layout.css', 'components.css', 'sections.css', 'pages.css', 'motion.css'];

/** Vendored runtime libraries (pinned in package.json, served first-party). */
const VENDOR = [
  ['node_modules/gsap/dist/gsap.min.js', 'gsap.min.js'],
  ['node_modules/gsap/dist/ScrollTrigger.min.js', 'ScrollTrigger.min.js'],
  ['node_modules/lenis/dist/lenis.min.js', 'lenis.min.js'],
  ['node_modules/cobe/dist/index.esm.js', 'cobe.js'],
];

export function bootScriptHash() {
  return `sha256-${createHash('sha256').update(BOOT_SCRIPT).digest('base64')}`;
}

export function contentSecurityPolicy() {
  return [
    "default-src 'self'",
    `script-src 'self' '${bootScriptHash()}'`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self'",
    "frame-src https://www.google.com https://calendly.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

function write(file, contents) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

function copyDir(from, to) {
  if (!existsSync(from)) return;
  for (const entry of readdirSync(from)) {
    const src = join(from, entry);
    const dest = join(to, entry);
    if (statSync(src).isDirectory()) copyDir(src, dest);
    else {
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(src, dest);
    }
  }
}

/** Conservative CSS minifier: strips comments and redundant whitespace. */
export function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

/** Collect every page definition with its rendered body. */
export function collectPages(siteUrl) {
  const ctx = { siteUrl };
  return [
    home.render(ctx),
    about.render(ctx),
    servicesHub.render(ctx),
    ...services.map((s) => servicePage.render(s, ctx)),
    contactPage.render(ctx),
    privacy(),
    terms(),
    notFound(),
  ];
}

function outputPath(path) {
  if (path.endsWith('.html')) return join(DIST, path);
  return join(DIST, path, 'index.html');
}

function sitemap(siteUrl, pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const priority = p.path === '/' ? '1.0' : p.path.startsWith('/services') ? '0.9' : p.path.match(/privacy|terms/) ? '0.3' : '0.8';
      return `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** llms.txt (§10.4) — plain-text brief for AI assistants. */
function llmsTxt(siteUrl) {
  return `# ${brand.name}

> ${brand.entity}

## Services
${services.map((s) => `- [${s.name}](${siteUrl}/services/${s.slug}/): ${s.definition}`).join('\n')}

## Company
- [About](${siteUrl}/about/): Story, mission, values and leadership.
- [Services overview](${siteUrl}/services/): All five service pillars compared.
- [Contact](${siteUrl}/contact/): Book a free 30-minute consultation. Email ${contact.email}.
`;
}

function headersFile() {
  const csp = contentSecurityPolicy();
  return `/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
`;
}

export function build({ quiet = false } = {}) {
  loadEnv(ROOT);
  const siteUrl = resolveSiteUrl(process.env.SITE_URL);
  rmSync(DIST, { recursive: true, force: true });

  // 1 · Static assets
  copyDir(resolve(ROOT, 'public'), DIST);

  // 2 · Pages
  const pages = collectPages(siteUrl);
  for (const page of pages) {
    write(outputPath(page.path), layout({ ...page, siteUrl }));
  }

  // 3 · CSS bundle (concatenated in cascade order, lightly minified)
  const css = CSS_ORDER.map((f) => readFileSync(resolve(ROOT, 'src/styles', f), 'utf8')).join('\n');
  write(join(DIST, 'assets/css/main.css'), minifyCss(css));

  // 4 · JS modules (served as native ES modules) + vendored libraries
  copyDir(resolve(ROOT, 'src/scripts'), join(DIST, 'assets/js'));
  for (const [from, to] of VENDOR) {
    const src = resolve(ROOT, from);
    if (!existsSync(src)) throw new Error(`Missing ${from}. Run "npm install" first.`);
    write(join(DIST, 'assets/vendor', to), readFileSync(src));
  }

  // 5 · SEO / AEO / GEO + hosting files
  write(join(DIST, 'sitemap.xml'), sitemap(siteUrl, pages));
  write(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  write(join(DIST, 'llms.txt'), llmsTxt(siteUrl));
  write(join(DIST, '_headers'), headersFile());
  write(
    join(DIST, 'site.webmanifest'),
    JSON.stringify(
      {
        name: brand.name,
        short_name: brand.name,
        description: brand.tagline,
        start_url: '/',
        display: 'standalone',
        background_color: '#0B0B12',
        theme_color: '#0B0B12',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
          { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      null,
      2,
    ),
  );

  if (!quiet) console.log(`✔ Built ${pages.length} pages → dist/  (SITE_URL=${siteUrl})`);
  return { pages, siteUrl };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build();
}
