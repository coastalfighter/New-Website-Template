/**
 * Living Globe (§5.3 #3, asset IMG-H01): a WebGL dot-globe whose Cyber Lime
 * "Signal" arcs leave the India delivery hub for New York, London, Dubai and
 * Sydney. Lazy-loaded after first paint (§13.2 performance budget), paused
 * when off-screen or in a background tab, static under reduced motion, and
 * skipped entirely on Save-Data — the CSS poster remains in that case.
 */
import { $, $$, whenIdle, prefersReducedMotion, clamp } from './utils.js';

const LIME = [207 / 255, 1, 4 / 255];
const LAVENDER = [181 / 255, 126 / 255, 220 / 255];

/** Convert [lat, lng] into the cobe rotation that faces that point. */
export function locationToAngles([lat, lng]) {
  return [Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
}

export function initGlobe() {
  const host = $('[data-globe]');
  const canvas = $('[data-globe-canvas]');
  if (!host || !canvas) return;
  if (navigator.connection?.saveData) return;

  let data;
  try { data = JSON.parse(host.dataset.globe); } catch { return; }

  whenIdle(async () => {
    let createGlobe;
    try {
      ({ default: createGlobe } = await import('/assets/vendor/cobe.js'));
    } catch {
      return; // Poster stays visible — no broken state.
    }

    const reduced = prefersReducedMotion();
    const [hubPhi, hubTheta] = locationToAngles(data.hub);
    const state = { phi: hubPhi - 0.6, theta: 0.28, targetPhi: hubPhi - 0.6, targetTheta: 0.28, drag: null, visible: true, raf: 0, focus: false };
    let globe;

    const create = () => {
      globe?.destroy();
      const size = Math.round(host.getBoundingClientRect().width);
      if (!size) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size,
        height: size,
        phi: state.phi,
        theta: state.theta,
        dark: 1,
        diffuse: 1.25,
        mapSamples: size < 420 ? 12000 : 20000,
        mapBrightness: 5.5,
        mapBaseBrightness: 0.02,
        baseColor: [0.14, 0.13, 0.2],
        markerColor: LIME,
        glowColor: LAVENDER,
        markers: [
          { location: data.hub, size: 0.09 },
          ...data.targets.map((location) => ({ location, size: 0.05, color: LAVENDER })),
        ],
        arcs: data.targets.map((to) => ({ from: data.hub, to })),
        arcColor: LIME,
        arcWidth: 0.9,
        arcHeight: 0.32,
        markerElevation: 0.02,
        opacity: 0.92,
      });
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      globe.update({ phi: state.phi, theta: state.theta });
    };

    const loop = () => {
      state.raf = 0;
      if (!state.visible || document.hidden) return;
      if (!state.drag && !state.focus && !reduced) state.targetPhi += 0.0018;
      // Critically damped follow — feels physical without overshoot.
      state.phi += (state.targetPhi - state.phi) * 0.08;
      state.theta += (state.targetTheta - state.theta) * 0.08;
      globe?.update({ phi: state.phi, theta: state.theta });
      const settling = Math.abs(state.targetPhi - state.phi) > 0.0005 || Math.abs(state.targetTheta - state.theta) > 0.0005;
      if (!reduced || state.drag || settling) state.raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!state.raf) state.raf = requestAnimationFrame(loop); };

    create();
    host.classList.add('is-ready');
    start();

    // Pause when scrolled out of view (§13.2: protect INP + battery).
    new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
      if (state.visible) start();
    }).observe(host);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });

    // Drag to rotate (§5.3 #3) — pointer capture keeps the drag alive off-canvas.
    host.addEventListener('pointerdown', (event) => {
      state.drag = { x: event.clientX, y: event.clientY, phi: state.targetPhi, theta: state.targetTheta };
      host.setPointerCapture(event.pointerId);
      start();
    });
    host.addEventListener('pointermove', (event) => {
      if (!state.drag) return;
      state.targetPhi = state.drag.phi + (event.clientX - state.drag.x) / 160;
      state.targetTheta = clamp(state.drag.theta + (event.clientY - state.drag.y) / 320, -0.6, 0.9);
    });
    const endDrag = () => { state.drag = null; };
    host.addEventListener('pointerup', endDrag);
    host.addEventListener('pointercancel', endDrag);

    // Region tiles steer the globe toward that market's arc.
    const items = $$('[data-region]');
    items.forEach((item) => {
      const index = Number(item.dataset.region);
      const focusRegion = () => {
        const [phi, theta] = locationToAngles(data.targets[index]);
        // Take the shortest path around the sphere.
        const twoPi = Math.PI * 2;
        state.targetPhi = phi + Math.round((state.targetPhi - phi) / twoPi) * twoPi;
        state.targetTheta = clamp(theta, -0.6, 0.9);
        state.focus = true;
        items.forEach((el) => el.classList.toggle('is-active', el === item));
        start();
      };
      item.addEventListener('pointerenter', focusRegion);
      item.addEventListener('pointerleave', () => {
        state.focus = false;
        item.classList.remove('is-active');
        start();
      });
    });

    let resizeTimer;
    new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { create(); start(); }, 150);
    }).observe(host);
  });
}
