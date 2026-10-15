/**
 * Akrostech — client entry point (native ES module, no bundler required).
 *
 * Every feature is progressive enhancement: the HTML is complete and usable
 * without JavaScript. Modules are initialised in priority order — what the
 * visitor sees first runs first; heavy work (WebGL, GSAP) waits for idle.
 */
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initClocks } from './modules/clocks.js';
import { initCounters } from './modules/counters.js';
import { initPointer } from './modules/pointer.js';
import { initCarousels } from './modules/carousel.js';
import { initContactForm } from './modules/form.js';
import { initGlobe } from './modules/globe.js';
import { initScroll } from './modules/scroll.js';

const tasks = [
  ['nav', initNav],
  ['reveal', initReveal],
  ['clocks', initClocks],
  ['counters', initCounters],
  ['form', initContactForm],
  ['carousel', initCarousels],
  ['pointer', initPointer],
  ['globe', initGlobe],
  ['scroll', initScroll],
];

for (const [name, init] of tasks) {
  try {
    const result = init();
    if (result instanceof Promise) result.catch((error) => console.error(`[Akrostech] ${name} failed`, error));
  } catch (error) {
    // One failing enhancement must never take the rest of the page down.
    console.error(`[Akrostech] ${name} failed`, error);
  }
}
