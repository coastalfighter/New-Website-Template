/**
 * Pointer-driven micro-interactions — fine pointers only, never under
 * reduced motion:
 *  · custom cursor  (§5.3 #6)  lime dot + lavender ring, grows to "VIEW"
 *  · magnetic CTAs  (§5.3 #5)  buttons follow the cursor within ~40px
 *  · tilt cards     (§5.3 #9)  3D tilt, max 8°
 *  · spotlight      (§12)      specular highlight that tracks the pointer
 * Transforms are written straight to the element (not inherited CSS vars)
 * to avoid style recalculation on children.
 */
import { $, $$, hasFinePointer, prefersReducedMotion } from './utils.js';

const lerp = (a, b, t) => a + (b - a) * t;

function initCursor() {
  const cursor = $('[data-cursor-el]');
  if (!cursor) return;
  const dot = $('.cursor__dot', cursor);
  const ring = $('.cursor__ring', cursor);
  const label = $('[data-cursor-label]', cursor);
  document.documentElement.classList.add('has-cursor');
  cursor.classList.add('is-hidden'); // until the first mouse move

  const pos = { x: -100, y: -100, rx: -100, ry: -100 };
  let raf = 0;

  const render = () => {
    pos.rx = lerp(pos.rx, pos.x, 0.18);
    pos.ry = lerp(pos.ry, pos.y, 0.18);
    dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    ring.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0)`;
    raf = Math.abs(pos.rx - pos.x) + Math.abs(pos.ry - pos.y) > 0.2 ? requestAnimationFrame(render) : 0;
  };

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    pos.x = event.clientX;
    pos.y = event.clientY;
    cursor.classList.remove('is-hidden');
    if (!raf) raf = requestAnimationFrame(render);
  }, { passive: true });

  document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));

  const interactive = 'a, button, summary, label, [data-cursor], input[type="checkbox"]';
  document.addEventListener('pointerover', (event) => {
    const target = event.target.closest(interactive);
    const labelled = event.target.closest('[data-cursor]');
    cursor.classList.toggle('is-hover', Boolean(target) && !labelled);
    cursor.classList.toggle('is-label', Boolean(labelled));
    label.textContent = labelled ? labelled.dataset.cursor.toUpperCase() : '';
  });
}

function initMagnetic() {
  for (const el of $$('[data-magnetic]')) {
    const strength = 0.28;
    let raf = 0;
    const move = (x, y) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { el.style.translate = `${x}px ${y}px`; });
    };
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      // Clamp to the 40px radius from the design system.
      const max = 40 * strength;
      move(Math.max(-max, Math.min(max, x)), Math.max(-max, Math.min(max, y)));
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'translate 450ms var(--ease-playful)';
      move(0, 0);
      window.setTimeout(() => { el.style.transition = ''; }, 460);
    });
  }
}

function initTilt() {
  const MAX = 8; // degrees (§5.3 #9)
  for (const el of $$('[data-tilt]')) {
    let raf = 0;
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transition = 'transform 120ms ease-out, border-color var(--dur-base) ease';
        el.style.transform = `perspective(900px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg)`;
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transition = 'transform 700ms var(--ease-signature), border-color var(--dur-base) ease';
      el.style.transform = '';
    });
  }
}

function initSpotlight() {
  for (const el of $$('[data-spotlight]')) {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  }
}

export function initPointer() {
  if (!hasFinePointer() || prefersReducedMotion()) return;
  initCursor();
  initMagnetic();
  initTilt();
  initSpotlight();
}
