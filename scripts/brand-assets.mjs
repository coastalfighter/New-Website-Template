#!/usr/bin/env node
/**
 * One-off generator for raster brand assets (committed to /public):
 *   og-default.png (1200×630, design system IMG-OG), logo.png,
 *   favicon-32.png, apple-touch-icon.png, icon-512.png
 *
 * Requires Playwright (`npx playwright` or a global install). Run:
 *   node scripts/brand-assets.mjs
 * Re-run only when the brand mark or OG template changes.
 */
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  playwright = require(resolve(execSync('npm root -g').toString().trim(), 'playwright'));
}

const favicon = readFileSync(resolve(ROOT, 'public/favicon.svg'), 'utf8');
const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@600;700&display=block">';

const og = `<!doctype html><html><head>${FONTS}<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0B0B12;color:#fff;font-family:'Space Grotesk',sans-serif;position:relative;overflow:hidden}
  .glow{position:absolute;width:900px;height:900px;left:-250px;top:-450px;background:radial-gradient(circle,#B57EDC55,transparent 60%)}
  .glow2{position:absolute;width:600px;height:600px;right:-200px;bottom:-320px;background:radial-gradient(circle,rgba(207,255,4,.14),transparent 65%)}
  .rings{position:absolute;right:-140px;top:50%;transform:translateY(-50%);width:640px;height:640px;border-radius:50%;border:1px solid rgba(255,255,255,.12)}
  .rings::before{content:'';position:absolute;inset:90px;border-radius:50%;border:1px dashed rgba(255,255,255,.18)}
  .rings::after{content:'';position:absolute;inset:200px;border-radius:50%;border:1px solid rgba(255,255,255,.1)}
  .wrap{position:absolute;inset:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .eyebrow{font-family:'JetBrains Mono',monospace;font-size:20px;letter-spacing:.08em;text-transform:uppercase;color:#CFFF04;display:flex;align-items:center;gap:12px}
  .eyebrow i{width:12px;height:12px;border-radius:50%;background:#CFFF04;box-shadow:0 0 16px #CFFF04}
  h1{font-size:92px;line-height:1;letter-spacing:-.03em;font-weight:700;max-width:900px}
  em{font-family:'Instrument Serif',serif;font-weight:400;font-style:italic;background:linear-gradient(135deg,#CFFF04,#B57EDC);-webkit-background-clip:text;color:transparent;padding-right:6px}
  .foot{display:flex;justify-content:space-between;align-items:center}
  .brand{display:flex;align-items:center;gap:16px;font-size:36px;font-weight:700;letter-spacing:-.03em}
  .brand svg{width:56px;height:56px}
  .tag{font-family:'JetBrains Mono',monospace;font-size:18px;color:#A7A7B8;letter-spacing:.06em;text-transform:uppercase}
  .signal{position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,transparent,#CFFF04,transparent);box-shadow:0 0 24px #CFFF04}
</style></head><body><div class="glow"></div><div class="glow2"></div><div class="rings"></div>
<div class="wrap"><p class="eyebrow"><i></i>Backend operations partner</p>
<h1>Scale the business, <em>not</em> the headcount.</h1>
<div class="foot"><span class="tag">Web · Recruitment · VA · Accounting · Legal</span><span class="brand">${favicon}Akrostech</span></div></div>
<div class="signal"></div></body></html>`;

const icon = (size) => `<!doctype html><html><head><style>*{margin:0}body{width:${size}px;height:${size}px;background:transparent}svg{width:${size}px;height:${size}px;display:block}</style></head><body>${favicon}</body></html>`;

const browser = await playwright.chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
const out = (name) => resolve(ROOT, 'public', name);
mkdirSync(resolve(ROOT, 'public/assets/img'), { recursive: true });

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(og, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out('assets/img/og-default.png') });

for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-512.png', 512], ['assets/img/logo.png', 512]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(icon(size));
  await page.screenshot({ path: out(name), omitBackground: true });
}

await browser.close();
console.log('✔ Brand assets written to /public');

