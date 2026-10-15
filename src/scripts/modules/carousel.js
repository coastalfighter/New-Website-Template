/**
 * Testimonial carousel — native scroll-snap does the heavy lifting (touch,
 * trackpad, keyboard scroll all work without JS). JS adds prev/next buttons,
 * the active-slide emphasis and progress dots. No autoplay: content that
 * moves on its own fails WCAG 2.2.2 without a pause control.
 */
import { $, $$ } from './utils.js';

export function initCarousels() {
  for (const root of $$('[data-carousel]')) {
    const track = $('.carousel__track', root);
    const slides = $$('.carousel__slide', track);
    const dots = $$('.carousel__dot', root);
    const section = root.closest('section');
    const prev = section && $('[data-carousel-prev]', section);
    const next = section && $('[data-carousel-next]', section);
    if (!track || !slides.length) continue;

    let current = 0;

    const setCurrent = (index) => {
      current = index;
      slides.forEach((slide, i) => slide.classList.toggle('is-current', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index >= slides.length - 1;
    };

    const goTo = (index) => {
      const target = slides[Math.max(0, Math.min(slides.length - 1, index))];
      track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    };

    prev?.addEventListener('click', () => goTo(current - 1));
    next?.addEventListener('click', () => goTo(current + 1));

    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); }
    });

    // The slide most visible inside the track is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setCurrent(slides.indexOf(best.target));
      },
      { root: track, threshold: [0.6, 0.9] },
    );
    slides.forEach((slide) => observer.observe(slide));
    setCurrent(0);
  }
}
