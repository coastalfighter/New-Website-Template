/**
 * Lime confetti burst for the form success state (§7.6, §12 toast/success).
 * Tiny canvas particle system — self-removes after ~1.6s. Decorative only.
 */
const COLORS = ['#CFFF04', '#B57EDC', '#FFFFFF'];

export function burst(anchor) {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti';
  canvas.setAttribute('aria-hidden', 'true');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas.remove();
  ctx.scale(dpr, dpr);

  const rect = anchor.getBoundingClientRect();
  const originX = rect.left + Math.min(rect.width, 120) / 2;
  const originY = rect.top + 40;
  const particles = Array.from({ length: 90 }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
    const speed = 6 + Math.random() * 9;
    return {
      x: originX, y: originY,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  const start = performance.now();
  const frame = (now) => {
    const t = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.vy += 0.32;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - t / 1600);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    if (t < 1600) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
