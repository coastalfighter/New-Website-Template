/**
 * Scroll reveals (§5.3 #7) — IntersectionObserver toggles `.is-visible`;
 * the actual motion is CSS transitions (off the main thread, interruptible).
 * Also performs the split-text headline treatment: words rise from a mask
 * with a 60ms stagger.
 */
import { $$, prefersReducedMotion } from './utils.js';

/** Wrap each word of a headline in mask + inner spans, keeping accent <em>s intact. */
function splitWords(el) {
  if (el.classList.contains('is-split')) return;
  let index = 0;
  const wrap = (node) => {
    const outer = document.createElement('span');
    outer.className = 'split-word';
    const inner = document.createElement('span');
    inner.className = 'split-word__inner';
    inner.style.setProperty('--w', String(index++));
    inner.append(node);
    outer.append(inner);
    return outer;
  };

  const fragment = document.createDocumentFragment();
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part) continue;
        fragment.append(/^\s+$/.test(part) ? document.createTextNode(part) : wrap(document.createTextNode(part)));
      }
    } else {
      fragment.append(wrap(node));
    }
  }
  el.replaceChildren(fragment);
  el.classList.add('is-split');
}

export function initReveal() {
  // Stagger children of grouped containers (cap so long lists don't drag).
  for (const group of $$('[data-stagger]')) {
    $$('[data-reveal]', group).forEach((el, i) => el.style.setProperty('--i', String(Math.min(i, 8))));
  }

  const splitTargets = $$('[data-split]');
  if (!prefersReducedMotion()) splitTargets.forEach(splitWords);

  const targets = [...$$('[data-reveal]'), ...splitTargets];
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => observer.observe(el));
}
