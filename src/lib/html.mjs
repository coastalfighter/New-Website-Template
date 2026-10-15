/**
 * Tiny, dependency-free HTML helpers used by every template.
 *
 * Templates are plain template literals. Any value that originates from data
 * (copy, URLs, names) goes through `esc()`; markup produced by other templates
 * is already trusted and is concatenated as-is.
 */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape a value for safe use in HTML text or a double-quoted attribute. */
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

/**
 * Render "rich" headline copy. Words wrapped in *asterisks* become the
 * signature editorial accent (Instrument Serif italic + Aurora fill), per the
 * design system's headline treatment (§4.2).
 */
export function rich(text) {
  return esc(text).replace(/\*([^*]+)\*/g, '<em class="accent">$1</em>');
}

/** Strip the *accent* markers for places that need plain text (meta, aria). */
export function plain(text) {
  return String(text ?? '').replace(/\*/g, '');
}

/** Map an array through a template and join without separators. */
export function each(items, fn) {
  return (items ?? []).map(fn).join('');
}

/** Conditionally render a fragment. */
export function when(condition, fragment) {
  return condition ? (typeof fragment === 'function' ? fragment() : fragment) : '';
}

/** Serialise JSON-LD safely inside a <script> element. */
export function jsonLd(data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}
