import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Load KEY=VALUE pairs from a local `.env` file into process.env without
 * overriding variables that are already set (host dashboards win).
 */
export function loadEnv(root) {
  const file = resolve(root, '.env');
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (!match || line.trim().startsWith('#')) continue;
    const [, key, raw] = match;
    const value = raw.replace(/^(['"])(.*)\1$/, '$2');
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

/** Validate and normalise the production origin used for absolute URLs. */
export function resolveSiteUrl(value) {
  const fallback = 'https://www.akrostech.com';
  const candidate = (value || fallback).trim().replace(/\/+$/, '');
  let url;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error(`SITE_URL "${candidate}" is not a valid absolute URL.`);
  }
  if (!/^https?:$/.test(url.protocol)) {
    throw new Error(`SITE_URL must use http or https (received "${url.protocol}").`);
  }
  return url.origin;
}
