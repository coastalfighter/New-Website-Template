/**
 * Shared helpers for all interaction modules.
 */

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

/** True when the visitor asked the OS for reduced motion (§5.1 #4). */
export const prefersReducedMotion = () => reducedQuery.matches;

/** True on mouse/trackpad devices — gates cursor, tilt and magnetic effects. */
export const hasFinePointer = () => finePointerQuery.matches;

/** Query helpers scoped to an optional root. */
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/** Run work when the main thread is idle (falls back to a short timeout). */
export function whenIdle(fn, timeout = 1500) {
  if ('requestIdleCallback' in window) return window.requestIdleCallback(fn, { timeout });
  return window.setTimeout(fn, 200);
}

/** Load a classic (UMD) script once; resolves when it has executed. */
const scriptCache = new Map();
export function loadScript(src) {
  if (scriptCache.has(src)) return scriptCache.get(src);
  const promise = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.append(el);
  });
  scriptCache.set(src, promise);
  return promise;
}

/** Clamp a number into [min, max]. */
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** Announce a message to screen readers via the global polite live region. */
export function announce(message) {
  const region = $('[data-announcer]');
  if (!region) return;
  region.textContent = '';
  window.setTimeout(() => { region.textContent = message; }, 50);
}

/** Format a time in a given IANA zone, e.g. "10:42". Returns null if unsupported. */
export function formatTime(date, timeZone, options = {}) {
  try {
    return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone, ...options }).format(date);
  } catch {
    return null;
  }
}
