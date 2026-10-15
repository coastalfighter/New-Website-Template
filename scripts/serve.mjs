#!/usr/bin/env node
/**
 * Minimal zero-dependency static server for previewing ./dist locally.
 * Mirrors production behaviour: clean URLs (/about → /about/index.html),
 * a real 404 page, correct MIME types and the security headers from _headers.
 * Not intended for production — deploy ./dist to a static host instead.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from '../src/lib/env.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = join(ROOT, 'dist');
loadEnv(ROOT);
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.woff2': 'font/woff2',
};

/** Parse the global "/*" block of dist/_headers so local preview matches prod. */
function globalHeaders() {
  const file = join(DIST, '_headers');
  if (!existsSync(file)) return {};
  const block = readFileSync(file, 'utf8').split(/\n(?=\S)/)[0];
  return Object.fromEntries(
    block.split('\n').slice(1).map((l) => l.trim()).filter(Boolean)
      .map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()])
      // Local preview is plain http; HSTS/upgrade-insecure would break it.
      .filter(([k]) => k !== 'Strict-Transport-Security')
      .map(([k, v]) => [k, k === 'Content-Security-Policy' ? v.replace(/; upgrade-insecure-requests/, '') : v]),
  );
}

async function resolveFile(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const candidate = join(DIST, safe);
  if (!candidate.startsWith(DIST)) return null;
  for (const file of [candidate, join(candidate, 'index.html'), `${candidate}.html`]) {
    try {
      if ((await stat(file)).isFile()) return file;
    } catch { /* try next */ }
  }
  return null;
}

const headers = globalHeaders();

createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');
    // Redirect /about → /about/ for a consistent trailing-slash policy (§8.3).
    if (!extname(pathname) && !pathname.endsWith('/')) {
      res.writeHead(301, { Location: `${pathname}/` }).end();
      return;
    }
    const file = await resolveFile(pathname);
    const target = file ?? join(DIST, '404.html');
    const body = await readFile(target);
    res.writeHead(file ? 200 : 404, { 'Content-Type': TYPES[extname(target)] ?? 'application/octet-stream', ...headers });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' }).end('Internal server error');
    console.error(error);
  }
}).listen(PORT, () => console.log(`▸ Akrostech preview → http://localhost:${PORT}`));
