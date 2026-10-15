/**
 * Scroll choreography (§5.3 #1, #2) — Lenis inertia scroll (lerp 0.1) wired
 * into GSAP ScrollTrigger. Loaded only when motion is allowed; if either
 * vendor script fails to load, the page keeps working with native scrolling
 * and fully drawn static states.
 *
 *  · Process rail: the Signal draws step-to-step, scrubbed to scroll; each
 *    step "arrives" (node lights up) as the line reaches it.
 *  · Hero parallax: globe and glows drift at different depths.
 *  · Page-hero time rings rotate gently with scroll.
 */
import { $, $$, loadScript, prefersReducedMotion } from './utils.js';

function initLenis(gsap, ScrollTrigger) {
  if (typeof window.Lenis !== 'function') return null;
  const lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -96 } });
  document.documentElement.classList.add('lenis');
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  // Keep native scrolling inside the mobile menu dialog and carousels.
  for (const el of $$('dialog, .carousel__track')) el.setAttribute('data-lenis-prevent', '');
  return lenis;
}

function initProcess(gsap, ScrollTrigger) {
  for (const section of $$('[data-process]')) {
    const fill = $('[data-process-fill]', section);
    const steps = $$('[data-process-step]', section);
    if (!fill || !steps.length) continue;

    fill.style.setProperty('--progress', '0');
    ScrollTrigger.create({
      trigger: $('.process__steps', section),
      start: 'top 70%',
      end: 'bottom 55%',
      scrub: 0.6,
      onUpdate: (self) => {
        fill.style.setProperty('--progress', self.progress.toFixed(4));
        const reached = Math.floor(self.progress * (steps.length - 1) + 0.02);
        steps.forEach((step, i) => step.classList.toggle('is-active', i <= reached && self.progress > 0.01));
      },
    });
  }
}

function initParallax(gsap) {
  const hero = $('.hero');
  if (hero) {
    const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero__visual', { yPercent: 14, ease: 'none', scrollTrigger: scrub });
    gsap.to('.hero__glow--lavender', { yPercent: 30, ease: 'none', scrollTrigger: { ...scrub } });
    gsap.to('.hero__content', { opacity: 0.25, yPercent: -6, ease: 'none', scrollTrigger: { ...scrub, start: '30% top' } });
  }
  for (const rings of $$('.page-hero__bg .time-rings, .cta-banner__rings')) {
    gsap.to(rings, { rotate: 40, ease: 'none', scrollTrigger: { trigger: rings.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } });
  }
}

export async function initScroll() {
  // Without GSAP the rail must still read as complete — default --progress is 1.
  if (prefersReducedMotion()) {
    $$('[data-process-step]').forEach((s) => s.classList.add('is-active'));
    return;
  }
  try {
    await Promise.all([loadScript('/assets/vendor/gsap.min.js'), loadScript('/assets/vendor/lenis.min.js')]);
    await loadScript('/assets/vendor/ScrollTrigger.min.js');
  } catch {
    $$('[data-process-step]').forEach((s) => s.classList.add('is-active'));
    return;
  }
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  initLenis(gsap, ScrollTrigger);
  // Create triggers top-to-bottom so refresh order matches page order.
  initParallax(gsap);
  initProcess(gsap, ScrollTrigger);

  // Fonts shift layout once they swap in — recalculate trigger positions.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
