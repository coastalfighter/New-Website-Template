/**
 * Counter roll (§5.3 #10). The final value is always present in the HTML
 * (§12: "final value in DOM") — JS only animates from 0 when the number is
 * about to scroll into view, so no-JS and reduced-motion users see the truth.
 */
import { $$, prefersReducedMotion } from './utils.js';

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

function animate(el, target, duration = 1800) {
  const start = performance.now();
  const formatter = new Intl.NumberFormat();
  const frame = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    el.textContent = formatter.format(Math.round(target * easeOutExpo(progress)));
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

export function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        observer.unobserve(el);
        animate(el, Number(el.dataset.counter));
      }
    },
    { threshold: 0.6 },
  );

  for (const el of counters) {
    const rect = el.getBoundingClientRect();
    // Only reset numbers that are still below the fold; never flash visible ones.
    if (rect.top > window.innerHeight) {
      el.textContent = '0';
      el.closest('[data-counter-wrap], dd, .stat')?.setAttribute('aria-live', 'off');
      observer.observe(el);
    }
  }
}
