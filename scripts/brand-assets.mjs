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
const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Geist+Mono:wght@500&display=block">';

const og = `<!doctype html><html><head>${FONTS}<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#fff;color:#0B0B12;font-family:'Bricolage Grotesque',sans-serif;position:relative;overflow:hidden}
  .r{position:absolute;border-radius:50%;filter:blur(50px)}
  .r1{width:900px;height:260px;left:-200px;top:-90px;background:#CFFF04;opacity:.55;transform:rotate(-8deg)}
  .r2{width:900px;height:280px;right:-260px;bottom:-120px;background:#B57EDC;opacity:.45;transform:rotate(10deg)}
  .wrap{position:absolute;inset:70px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .tag{align-self:flex-start;display:flex;align-items:center;gap:12px;padding:8px 18px 8px 10px;border-radius:999px;background:rgba(255,255,255,.85);border:1px solid rgba(11,11,18,.08);font-family:'Geist Mono',monospace;font-size:18px;letter-spacing:.06em;text-transform:uppercase}
  .tag b{padding:3px 10px;border-radius:999px;background:linear-gradient(120deg,#CFFF04,#E9FF8F 34%,#E7D2F5 66%,#B57EDC)}
  h1{font-size:104px;line-height:.96;letter-spacing:-.03em;font-weight:700;max-width:1000px}
  .hl{background:linear-gradient(100deg,rgba(207,255,4,.95),rgba(226,255,110,.9) 42%,rgba(226,200,245,.9) 64%,rgba(181,126,220,.85)) no-repeat 0 88%/100% 40%;padding:0 6px}
  .foot{display:flex;justify-content:space-between;align-items:center}
  .brand{display:flex;align-items:center;gap:14px;font-size:38px;font-weight:800;letter-spacing:-.04em}
  .brand svg{width:54px;height:54px}
  .svc{font-family:'Geist Mono',monospace;font-size:18px;color:#4B4B5C;letter-spacing:.05em;text-transform:uppercase}
</style></head><body><div class="r r1"></div><div class="r r2"></div>
<div class="wrap"><p class="tag"><b>Live</b>Backend operations partner</p>
<h1>Scale the business, <span class="hl">not the headcount.</span></h1>
<div class="foot"><span class="svc">Web · Recruitment · VA · Accounting · Legal</span><span class="brand">${favicon}Akrostech</span></div></div>
</body></html>`;

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

