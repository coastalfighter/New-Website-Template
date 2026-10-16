/**
 * Hero interactions — one behaviour per page, keyed by [data-hero].
 * Each degrades to a complete static visual without JS, and keeps motion
 * minimal under prefers-reduced-motion (user-driven interaction still works).
 */
import { $, $$, clamp, prefersReducedMotion, hasFinePointer } from './utils.js';

const reduced = prefersReducedMotion();
const wait = (ms) => new Promise((r) => window.setTimeout(r, ms));

/** Run `fn` only while `el` is on screen; returns a getter for visibility. */
function whileVisible(el) {
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(el);
  return () => visible && !document.hidden;
}

/* ── HOME · word cycler ───────────────────────────────────────────────── */
function cycler(root) {
  const word = $('[data-cycler]', root);
  if (!word || reduced) return;
  const words = word.dataset.cycler.split('|');
  const visible = whileVisible(word);
  let i = 0;
  window.setInterval(async () => {
    if (!visible()) return;
    word.classList.add('is-out');
    await wait(380);
    i = (i + 1) % words.length;
    word.textContent = words[i];
    word.classList.remove('is-out');
    word.classList.add('is-in');
    void word.offsetWidth; // restart transition from below
    word.classList.remove('is-in');
  }, 2400);
}

/* ── ABOUT · draggable 24h dial ───────────────────────────────────────── */
function dial(root) {
  const el = $('[data-dial]', root);
  if (!el) return;
  const hand = $('[data-dial-hand]', el);
  const slider = $('[data-dial-slider]', el);
  const time = $('[data-dial-time]', el);
  const status = $('[data-dial-status]', el);
  const fmt = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

  const set = (minutes) => {
    const m = ((Math.round(minutes / 15) * 15) % 1440 + 1440) % 1440;
    const online = m >= 8 * 60 && m < 19 * 60;
    hand.style.transform = `rotate(${(m / 1440) * 360}deg)`;
    time.textContent = fmt(m);
    status.textContent = online ? 'Team online · on your calls' : 'Off-hours · back 09:00';
    el.dataset.state = online ? 'on' : 'off';
    slider.setAttribute('aria-valuenow', String(m));
    slider.setAttribute('aria-valuetext', `${fmt(m)}, ${online ? 'team online' : 'team off-hours'}`);
    return m;
  };

  const now = new Date();
  let value = now.getHours() * 60 + now.getMinutes();

  // Intro sweep from midnight to the visitor's real local time.
  if (!reduced) {
    const start = performance.now();
    const target = value;
    const sweep = (t) => {
      const p = Math.min(1, (t - start) / 1600);
      set(target * (1 - (1 - p) ** 3));
      if (p < 1) requestAnimationFrame(sweep);
    };
    requestAnimationFrame(sweep);
  } else set(value);

  const fromPointer = (event) => {
    const r = slider.getBoundingClientRect();
    const angle = Math.atan2(event.clientX - (r.left + r.width / 2), -(event.clientY - (r.top + r.height / 2)));
    value = set((((angle / (Math.PI * 2)) * 1440) + 1440) % 1440);
  };
  slider.addEventListener('pointerdown', (e) => { slider.setPointerCapture(e.pointerId); fromPointer(e); });
  slider.addEventListener('pointermove', (e) => { if (slider.hasPointerCapture(e.pointerId)) fromPointer(e); });
  slider.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 15, ArrowUp: 15, ArrowLeft: -15, ArrowDown: -15, PageUp: 60, PageDown: -60 }[e.key];
    if (e.key === 'Home') value = set(0);
    else if (e.key === 'End') value = set(1425);
    else if (step) value = set(value + step);
    else return;
    e.preventDefault();
  });
}

/* ── SERVICES · expanding pillars ─────────────────────────────────────── */
function pillars(root) {
  const items = $$('[data-pillar]', root);
  const activate = (item) => items.forEach((el) => el.classList.toggle('is-active', el === item));
  for (const item of items) {
    item.addEventListener('pointerenter', () => activate(item));
    item.addEventListener('focusin', () => activate(item));
  }
}

/* ── WEB DEV · typewriter that builds the preview ─────────────────────── */
function code(root) {
  const codeEl = $('[data-typewriter]', root);
  const status = $('[data-browser-status]', root);
  const blocks = $$('[data-build]', root);
  if (!codeEl || reduced) return;
  const lines = $$('.code__line', codeEl).map((l) => l.cloneNode(true));
  const visible = whileVisible(codeEl);

  const run = async () => {
    for (;;) {
      codeEl.replaceChildren();
      blocks.forEach((b) => b.classList.remove('is-built'));
      status.textContent = 'Building…';
      status.classList.add('is-building');
      for (let i = 0; i < lines.length; i++) {
        const line = document.createElement('span');
        line.className = 'code__line';
        codeEl.append(line, '\n');
        for (const tok of $$('.tok', lines[i])) {
          const span = document.createElement('span');
          span.className = tok.className;
          line.append(span);
          for (const ch of tok.textContent) {
            while (!visible()) await wait(300);
            span.textContent += ch;
            await wait(ch === ' ' ? 10 : 26);
          }
        }
        blocks.filter((b) => Number(b.dataset.build) === i).forEach((b) => b.classList.add('is-built'));
      }
      const caret = document.createElement('span');
      caret.className = 'caret';
      codeEl.lastElementChild?.append(caret);
      status.textContent = 'Live ✓';
      status.classList.remove('is-building');
      await wait(4200);
    }
  };
  run();
}

/* ── RECRUITMENT · candidates flowing through the funnel ──────────────── */
function pipeline(root) {
  const flow = $('[data-pipeline-flow]', root);
  const counts = $$('[data-stage-count]', root);
  const stages = $$('[data-stage]', root);
  const hire = $('[data-pipeline-hire]', root);
  if (!flow || reduced) return;
  const visible = whileVisible(flow);
  const initials = ['AK', 'MR', 'JS', 'LP', 'TN', 'CW', 'EB', 'RD', 'SO', 'VH'];
  const survive = [0.55, 0.45, 0.5]; // chance to advance past stage 0, 1, 2
  const values = counts.map((c) => Number(c.textContent));

  const bump = (i) => {
    values[i] += 1;
    counts[i].textContent = String(values[i]);
    stages[i].classList.add('is-pulse');
    window.setTimeout(() => stages[i].classList.remove('is-pulse'), 400);
  };

  const spawn = async () => {
    const dot = document.createElement('span');
    dot.className = 'pipeline__dot';
    dot.textContent = initials[Math.floor(Math.random() * initials.length)];
    dot.style.left = '-4%';
    dot.style.top = `${30 + Math.random() * 40}%`;
    flow.append(dot);
    await wait(30);
    for (let stage = 0; stage < 4; stage++) {
      dot.style.left = `${12.5 + stage * 25}%`;
      await wait(950);
      bump(stage);
      if (stage === 3) {
        hire.classList.add('is-pop');
        window.setTimeout(() => hire.classList.remove('is-pop'), 500);
        break;
      }
      if (Math.random() > survive[stage]) { dot.classList.add('is-out'); break; }
    }
    await wait(500);
    dot.remove();
  };

  window.setInterval(() => { if (visible() && flow.children.length < 9) spawn(); }, 700);
}

/* ── VIRTUAL ASSISTANCE · tasks that tick themselves off ──────────────── */
const MORE_TASKS = [
  ['Chase 3 unsigned contracts', '12:40'], ['Schedule Q3 vendor reviews', '13:15'], ['Summarise competitor launches', '13:50'],
  ['Reconcile expense receipts', '14:20'], ['Send onboarding pack to new hire', '14:55'], ['Update team OKR tracker', '15:30'],
];
function tasks(root) {
  const list = $('[data-task-list]', root);
  const hours = $('[data-hours]', root);
  if (!list) return;
  let pool = 0;
  let saved = Number(hours.textContent);
  let paused = false;
  const visible = whileVisible(list);

  const complete = (task) => {
    if (!task || task.classList.contains('is-done')) return;
    task.classList.add('is-done');
    saved += 0.5;
    hours.textContent = saved.toFixed(1);
    window.setTimeout(() => {
      task.classList.add('is-leaving');
      window.setTimeout(() => {
        task.remove();
        const [text, time] = MORE_TASKS[pool++ % MORE_TASKS.length];
        const li = task.cloneNode(true);
        li.className = 'task is-entering';
        $('.task__text', li).textContent = text;
        $('.task__time', li).textContent = time;
        $('.task__check', li).setAttribute('aria-label', `Mark “${text}” as done`);
        list.append(li);
        requestAnimationFrame(() => requestAnimationFrame(() => li.classList.remove('is-entering')));
      }, 520);
    }, 900);
  };

  list.addEventListener('click', (e) => complete(e.target.closest('[data-task]')));
  list.addEventListener('pointerenter', () => { paused = true; });
  list.addEventListener('pointerleave', () => { paused = false; });
  if (!reduced) {
    window.setInterval(() => {
      if (!paused && visible()) complete($('[data-task]:not(.is-done)', list));
    }, 2600);
  }
}

/* ── ACCOUNTING · ledger grows in; hover a month to inspect it ────────── */
function ledger(root) {
  const el = $('[data-ledger]', root);
  if (!el) return;
  const total = $('[data-ledger-total]', el);
  const sub = $('[data-ledger-sub]', el);
  const base = [total.textContent, sub.textContent];
  new IntersectionObserver(([e], obs) => {
    if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); }
  }, { threshold: 0.3 }).observe(el);
  const show = (bar) => {
    total.textContent = bar.dataset.value;
    sub.textContent = `${bar.dataset.month} · reconciled ✓`;
  };
  const reset = () => { [total.textContent, sub.textContent] = base; };
  for (const bar of $$('.ledger__bar', el)) {
    bar.addEventListener('pointerenter', () => show(bar));
    bar.addEventListener('focus', () => show(bar));
    bar.addEventListener('pointerleave', reset);
    bar.addEventListener('blur', reset);
  }
}

/* ── LEGAL · clause-by-clause review ──────────────────────────────────── */
function redline(root) {
  const el = $('[data-redline]', root);
  if (!el) return;
  const clauses = $$('[data-clause]', el);
  const data = JSON.parse(el.dataset.clauses || 'null');
  const state = $('[data-clause-state]', el);
  const title = $('[data-clause-title]', el);
  const note = $('[data-clause-note]', el);
  let index = 0;
  let paused = false;
  const visible = whileVisible(el);

  const select = (i) => {
    index = i;
    clauses.forEach((c, j) => c.classList.toggle('is-active', j === i));
    const d = data[i];
    state.textContent = d.state;
    state.dataset.state = d.state;
    title.textContent = d.label;
    note.textContent = d.note;
  };
  clauses.forEach((c, i) => {
    c.addEventListener('click', () => { paused = true; select(i); });
    c.addEventListener('pointerenter', () => select(i));
  });
  el.addEventListener('pointerleave', () => { paused = false; });
  select(0);
  if (!reduced) window.setInterval(() => { if (!paused && visible()) select((index + 1) % clauses.length); }, 2800);
}

/* ── CONTACT · ripple beacon (dot field that reacts to the cursor) ────── */
function beacon(root) {
  const canvas = $('[data-beacon-canvas]', root);
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0;
  const pointer = { x: -999, y: -999 };
  const ripples = [];
  const visible = whileVisible(canvas);

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  canvas.parentElement.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('pointerleave', () => { pointer.x = pointer.y = -999; });
  canvas.parentElement.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
  });

  let last = 0;
  const frame = (now) => {
    requestAnimationFrame(frame);
    if (!visible()) return;
    if (now - last > 2200 && !reduced) { ripples.push({ x: w / 2, y: h / 2, t: now }); last = now; }
    ctx.clearRect(0, 0, w, h);
    const gap = 22;
    for (let y = gap / 2; y < h; y += gap) {
      for (let x = gap / 2; x < w; x += gap) {
        let s = 1.4;
        let mix = 0;
        const dp = Math.hypot(x - pointer.x, y - pointer.y);
        if (dp < 120) { s += (1 - dp / 120) * 4; mix = 1 - dp / 120; }
        for (const r of ripples) {
          const radius = ((now - r.t) / 1000) * 220;
          const d = Math.abs(Math.hypot(x - r.x, y - r.y) - radius);
          if (d < 26) { const k = (1 - d / 26) * Math.max(0, 1 - radius / Math.max(w, h)); s += k * 3.5; mix = Math.max(mix, k); }
        }
        const lime = x / w;
        ctx.fillStyle = mix > 0.05
          ? `rgba(${Math.round(207 * lime + 181 * (1 - lime))},${Math.round(255 * lime + 126 * (1 - lime))},${Math.round(4 * lime + 220 * (1 - lime))},${0.35 + mix * 0.65})`
          : 'rgba(11,11,18,0.12)';
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    while (ripples.length && now - ripples[0].t > 4000) ripples.shift();
  };
  requestAnimationFrame(frame);
}

/* ── PRIVACY · shield turns to watch the cursor ───────────────────────── */
function shield(root) {
  const el = $('[data-shield]', root);
  if (!el || reduced || !hasFinePointer()) return;
  window.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const dx = clamp((e.clientX - (r.left + r.width / 2)) / window.innerWidth, -0.5, 0.5);
    const dy = clamp((e.clientY - (r.top + r.height / 2)) / window.innerHeight, -0.5, 0.5);
    el.style.transform = `perspective(800px) rotateY(${dx * 40}deg) rotateX(${-dy * 40}deg)`;
  }, { passive: true });
}

/* ── TERMS · tap to fan the documents (hover handled in CSS) ──────────── */
function stack(root) {
  const el = $('[data-stack]', root);
  el?.addEventListener('click', () => el.classList.toggle('is-fanned'));
  if (el && !hasFinePointer()) window.setTimeout(() => el.classList.add('is-fanned'), 900);
}

/* ── 404 · digits scatter away from the cursor ────────────────────────── */
function scatter(root) {
  const chars = $$('.scatter__char', root);
  if (!chars.length || reduced) return;
  window.addEventListener('pointermove', (e) => {
    for (const c of chars) {
      const r = c.getBoundingClientRect();
      const dx = r.left + r.width / 2 - e.clientX;
      const dy = r.top + r.height / 2 - e.clientY;
      const d = Math.hypot(dx, dy);
      const force = Math.max(0, 1 - d / 320) * 60;
      c.style.transform = `translate(${(dx / (d || 1)) * force}px, ${(dy / (d || 1)) * force}px) rotate(${(dx / (d || 1)) * force * 0.3}deg)`;
    }
  }, { passive: true });
}

const HANDLERS = {
  home: cycler, about: dial, services: pillars, code, pipeline, tasks, ledger, redline,
  contact: beacon, shield, stack, lost: scatter,
};

export function initHeroes() {
  for (const root of $$('[data-hero]')) {
    const handler = HANDLERS[root.dataset.hero];
    if (!handler) continue;
    try { handler(root); } catch (error) { console.error(`[Akrostech] hero "${root.dataset.hero}" failed`, error); }
  }
}
