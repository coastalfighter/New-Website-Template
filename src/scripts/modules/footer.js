/**
 * Interactive footer (same on every page):
 *  · kinetic marquee — drifts on its own, accelerates with scroll speed and
 *    flips direction when the visitor scrolls back up
 *  · cursor spotlight — a Lime/Lavender glow trails the pointer
 *  · variable-weight wordmark — letters swell (wght 300 → 800) as the
 *    cursor approaches
 *  · copy-to-clipboard email with toast, back-to-top with progress ring
 */
import { $, $$, prefersReducedMotion, hasFinePointer, announce } from './utils.js';

const reduced = prefersReducedMotion();

function marquee(footer) {
  const track = $('[data-footer-marquee-track]', footer);
  if (!track || reduced) return;
  let x = 0;
  let velocity = 0;
  let direction = -1;
  let lastY = window.scrollY;
  let visible = false;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(track);

  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastY;
    lastY = window.scrollY;
    if (dy) direction = dy > 0 ? -1 : 1;
    velocity = Math.min(28, velocity + Math.abs(dy) * 0.12);
  }, { passive: true });

  const frame = () => {
    requestAnimationFrame(frame);
    if (!visible) return;
    const half = track.scrollWidth / 2;
    x += direction * (0.6 + velocity);
    velocity *= 0.92;
    if (x <= -half) x += half;
    if (x > 0) x -= half;
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
  };
  requestAnimationFrame(frame);
}

function spotlight(footer) {
  const spot = $('[data-footer-spot]', footer);
  if (!spot || reduced || !hasFinePointer()) return;
  let raf = 0;
  footer.addEventListener('pointerenter', () => footer.classList.add('is-hovered'));
  footer.addEventListener('pointerleave', () => footer.classList.remove('is-hovered'));
  footer.addEventListener('pointermove', (e) => {
    const r = footer.getBoundingClientRect();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      spot.style.setProperty('--fx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--fy', `${e.clientY - r.top}px`);
    });
  });
}

function wordmark(footer) {
  const mark = $('[data-wordmark]', footer);
  if (!mark) return;
  const chars = $$('.footer-wordmark__char', mark);
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    mark.classList.add('is-visible');
    obs.disconnect();
    window.setTimeout(() => mark.classList.add('is-live'), 1200);
  }, { threshold: 0.3 }).observe(mark);

  if (reduced || !hasFinePointer()) {
    // Touch / reduced motion: a gentle, static gradient weight ramp.
    chars.forEach((c, i) => c.style.setProperty('--w', String(300 + (i % 3) * 200)));
    return;
  }
  let raf = 0;
  footer.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      for (const c of chars) {
        const r = c.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 360);
        c.style.setProperty('--w', String(Math.round(300 + k * 500)));
      }
    });
  });
  footer.addEventListener('pointerleave', () => chars.forEach((c) => { c.style.setProperty('--w', '300'); }));
}

function copyEmail(footer) {
  const btn = $('[data-copy]', footer);
  const hint = $('[data-copy-hint]', footer);
  const toast = $('[data-toast]');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const email = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(email);
      btn.classList.add('is-copied');
      hint.textContent = 'Copied';
      if (toast) {
        toast.textContent = `${email} copied to clipboard`;
        toast.classList.add('is-visible');
        window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
      } else announce('Email copied');
      window.setTimeout(() => { btn.classList.remove('is-copied'); hint.textContent = 'Copy'; }, 2200);
    } catch {
      window.location.href = `mailto:${email}`; // Clipboard blocked → open mail client.
    }
  });
}

function toTop(footer) {
  const btn = $('[data-to-top]', footer);
  const ring = $('[data-to-top-progress]', footer);
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  });
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    ring?.style.setProperty('--progress', (max > 0 ? window.scrollY / max : 0).toFixed(3));
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

export function initFooter() {
  const footer = $('[data-footer]');
  if (!footer) return;
  marquee(footer);
  spotlight(footer);
  wordmark(footer);
  copyEmail(footer);
  toTop(footer);
}
