/**
 * Flowing background (client v2) — soft Cyber Lime + Digital Lavender
 * ribbons on a white canvas that drift with time AND travel with the scroll
 * position, so colour keeps flowing past the reader on every page.
 *
 * Performance: drawn on a canvas at ~1/3 resolution and upscaled by CSS
 * (free, natural blur — no filter cost), paused in background tabs, and
 * frozen (redrawn only on scroll) under prefers-reduced-motion.
 *
 * Also draws "The Signal" (§2.2): a single gradient line that meanders down
 * the full page height and is drawn on as the visitor scrolls.
 */
import { $, prefersReducedMotion } from './utils.js';

const LIME = [207, 255, 4];
const LAVENDER = [181, 126, 220];
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

/** Ribbon recipes — positions are fractions of the viewport height. */
const RIBBONS = [
  { y: 0.16, amp: 0.08, len: 0.9, speed: 0.18, width: 0.12, scroll: 0.32, from: LIME, to: LIME, alpha: 0.42 },
  { y: 0.7, amp: 0.11, len: 1.3, speed: -0.12, width: 0.15, scroll: 0.22, from: LAVENDER, to: LAVENDER, alpha: 0.3 },
  { y: 1.15, amp: 0.07, len: 0.7, speed: 0.22, width: 0.08, scroll: 0.42, from: LIME, to: LIME, alpha: 0.34 },
  { y: 1.5, amp: 0.1, len: 1.1, speed: -0.16, width: 0.11, scroll: 0.28, from: LAVENDER, to: LAVENDER, alpha: 0.28 },
];

function initRibbons() {
  const host = $('[data-flow]');
  const canvas = $('[data-flow-canvas]');
  const ctx = canvas?.getContext('2d');
  if (!host || !ctx) return;

  const reduced = prefersReducedMotion();
  const SCALE = 0.34;
  let w = 0;
  let h = 0;
  let raf = 0;
  const start = performance.now();

  const resize = () => {
    w = Math.max(1, Math.round(window.innerWidth * SCALE));
    h = Math.max(1, Math.round(window.innerHeight * SCALE));
    canvas.width = w;
    canvas.height = h;
  };

  const draw = (now) => {
    const t = reduced ? 0 : (now - start) / 1000;
    const scroll = window.scrollY * SCALE;
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Drifting orbs — one of each brand colour, parallaxed to scroll.
    const orb = (cx, cy, r, color, a) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, rgba(color, a));
      g.addColorStop(1, rgba(color, 0));
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    };
    orb(w * (0.85 + 0.05 * Math.sin(t * 0.2)), h * 0.15 - ((scroll * 0.15) % (h * 2)) + h * 0.5 * Math.sin(scroll / (h * 3)), h * 0.55, LIME, 0.34);
    orb(w * (0.1 + 0.06 * Math.cos(t * 0.17)), h * 0.85 + h * 0.35 * Math.cos(scroll / (h * 2.4)), h * 0.6, LAVENDER, 0.3);

    const span = h * 1.8;
    // Portrait screens: ribbons are relatively thicker, so soften them.
    const soften = w < h ? 0.7 : 1;
    for (const r of RIBBONS) {
      // Wrap vertically so ribbons keep arriving as the reader scrolls on.
      const base = ((((r.y * h - scroll * r.scroll) % span) + span) % span) - h * 0.4;
      const amp = r.amp * h;
      const k = (Math.PI * 2) / (r.len * w);
      const phase = t * r.speed + scroll * 0.004;

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, rgba(r.from, 0));
      grad.addColorStop(0.18, rgba(r.from, r.alpha * soften));
      grad.addColorStop(0.82, rgba(r.to, r.alpha * soften));
      grad.addColorStop(1, rgba(r.to, 0));
      ctx.strokeStyle = grad;
      ctx.lineWidth = r.width * Math.min(h, w * 1.1);

      ctx.beginPath();
      for (let x = -20; x <= w + 20; x += 6) {
        const y = base + amp * Math.sin(x * k + phase) + amp * 0.45 * Math.sin(x * k * 2.3 - phase * 1.4);
        if (x === -20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  };

  const loop = (now) => {
    raf = 0;
    if (document.hidden) return;
    draw(now);
    if (!reduced) raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

  resize();
  draw(performance.now());
  host.classList.add('is-live');
  kick();

  window.addEventListener('resize', () => { resize(); kick(); }, { passive: true });
  document.addEventListener('visibilitychange', kick);
  // Reduced motion: no ambient drift, but ribbons still follow the scroll.
  if (reduced) window.addEventListener('scroll', kick, { passive: true });
}

/** Build a smooth meandering path down the page (Catmull-Rom → cubic Béziers). */
export function signalPath(width, height, step = 760) {
  const points = [];
  const count = Math.max(2, Math.ceil(height / step) + 1);
  for (let i = 0; i < count; i++) {
    // Start under the hero so the line never crosses the headline.
    const top = Math.min(height * 0.5, window.innerHeight * 0.92);
    const y = Math.min(height, top + i * step);
    const x = width * (i % 2 ? 0.06 : 0.94);
    points.push([x, y]);
  }
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

function initSignal() {
  const svg = $('[data-flow-signal]');
  if (!svg) return;
  const track = $('.flow-signal__track', svg);
  const path = $('.flow-signal__path', svg);
  const head = $('.flow-signal__headgroup', svg);
  const gradient = $('#flow-signal-gradient', svg);
  const reduced = prefersReducedMotion();
  let length = 0;
  let ticking = false;

  const layout = () => {
    // Collapse first so the SVG never props the page open after content shrinks.
    svg.style.height = '0px';
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.scrollHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.height = `${height}px`;
    const d = signalPath(width, height);
    track.setAttribute('d', d);
    path.setAttribute('d', d);
    gradient.setAttribute('y2', String(height));
    length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    update();
  };

  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = reduced ? 1 : Math.min(1, Math.max(0.04, (window.scrollY + window.innerHeight * 0.1) / Math.max(1, max)));
    const drawn = length * progress;
    path.style.strokeDashoffset = `${length - drawn}`;
    if (head && length) {
      const p = path.getPointAtLength(drawn);
      head.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
    }
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });

  let resizeTimer;
  new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(layout, 120);
  }).observe(document.body);
  layout();
}

export function initFlow() {
  initRibbons();
  initSignal();
}
