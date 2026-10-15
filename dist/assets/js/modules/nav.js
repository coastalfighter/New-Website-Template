/**
 * Navigation: glass-on-scroll header that hides on scroll down and reveals on
 * scroll up (§12 nav bar), the Services mega-menu disclosure, and the
 * full-screen mobile menu built on <dialog>.
 */
import { $, $$, hasFinePointer, prefersReducedMotion } from './utils.js';

function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    const menuOpen = header.querySelector('[data-menu][data-open="true"]');
    if (!prefersReducedMotion() && !menuOpen) {
      if (goingDown && y > 320) header.classList.add('is-hidden');
      else if (goingUp || y < 320) header.classList.remove('is-hidden');
    }
    if (goingDown || goingUp) lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initMegaMenu() {
  for (const item of $$('[data-menu]')) {
    const toggle = $('[data-menu-toggle]', item);
    const panel = $('[data-menu-panel]', item);
    if (!toggle || !panel) continue;
    let closeTimer;
    let openedByHover = false;

    const setOpen = (open) => {
      window.clearTimeout(closeTimer);
      if (!open) openedByHover = false;
      item.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    // A click that lands after hover already opened the menu should "pin" it
    // open rather than toggle it shut under the user's cursor.
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen && openedByHover) openedByHover = false;
      else setOpen(!isOpen);
    });

    // Hover intent on desktop pointers only; a short delay forgives diagonal paths.
    if (hasFinePointer()) {
      item.addEventListener('pointerenter', () => {
        if (item.dataset.open !== 'true') openedByHover = true;
        setOpen(true);
      });
      item.addEventListener('pointerleave', () => { closeTimer = window.setTimeout(() => setOpen(false), 180); });
    }

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && item.dataset.open === 'true') {
        setOpen(false);
        toggle.focus();
      }
      // Arrow-key roving between menu cards.
      if (['ArrowDown', 'ArrowUp'].includes(event.key) && item.dataset.open === 'true') {
        const links = $$('a', panel);
        const index = links.indexOf(document.activeElement);
        event.preventDefault();
        const next = event.key === 'ArrowDown' ? (index + 1) % links.length : (index - 1 + links.length) % links.length;
        links[index === -1 ? 0 : next].focus();
      }
    });

    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) setOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (!item.contains(event.target)) setOpen(false);
    });
  }
}

function initMobileMenu() {
  const dialog = $('[data-mobile-menu]');
  const openBtn = $('[data-mobile-open]');
  if (!dialog || !openBtn || typeof dialog.showModal !== 'function') return;

  const close = () => dialog.close();
  openBtn.addEventListener('click', () => {
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  });
  $('[data-mobile-close]', dialog)?.addEventListener('click', close);
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    openBtn.focus();
  });
  // Close when following an in-page or same-page link.
  for (const link of $$('a', dialog)) link.addEventListener('click', close);
  // Close if the viewport grows past the mobile breakpoint.
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches && dialog.open) close(); });
}

export function initNav() {
  initHeader();
  initMegaMenu();
  initMobileMenu();
}
