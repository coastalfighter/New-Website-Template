/**
 * Icon set — design system §11.3: 1.5px stroke line icons, rounded caps,
 * white on dark, Cyber Lime when active. Drawn on a 24×24 grid, Lucide-style.
 *
 * Every icon is decorative by default (aria-hidden). Pass a `label` to expose
 * it to assistive tech when the icon carries meaning on its own.
 */
const paths = {
  // ── Service icons (§11.3: code window · magnet-person · calendar-check · ledger-chart · scales)
  code: '<rect x="2.75" y="4" width="18.5" height="16" rx="2.5"/><path d="M2.75 8.5h18.5"/><path d="m9.5 12.5-2.25 2.25L9.5 17"/><path d="m14.5 12.5 2.25 2.25L14.5 17"/><circle cx="5.75" cy="6.25" r=".4" fill="currentColor"/><circle cx="7.75" cy="6.25" r=".4" fill="currentColor"/>',
  recruit: '<circle cx="9" cy="7.5" r="3.25"/><path d="M3.25 20c.6-3.4 2.9-5.5 5.75-5.5 1.3 0 2.5.4 3.4 1.2"/><path d="M15 13.5v3.25a2.75 2.75 0 0 0 5.5 0V13.5"/><path d="M15 13.5h1.75M18.75 13.5h1.75"/><path d="M15 11.25v-1M20.5 11.25v-1"/>',
  assistant: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.75v3.5M16 2.75v3.5"/><path d="m9 15 2 2 4-4"/>',
  ledger: '<path d="M4 3.75h11.5L20 8.25V20.25H4z"/><path d="M15.5 3.75v4.5H20"/><path d="M8 17v-3M12 17v-5.5M16 17v-2"/>',
  scales: '<path d="M12 3.5v17"/><path d="M7.5 20.5h9"/><path d="M4.5 7.5h15"/><path d="M12 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="m4.5 7.5-2.75 6.25a3 3 0 0 0 5.5 0z"/><path d="m19.5 7.5-2.75 6.25a3 3 0 0 0 5.5 0z"/>',

  // ── Value / feature icons
  users: '<circle cx="9" cy="8" r="3.25"/><path d="M3 19.5c.5-3.25 2.8-5.25 6-5.25s5.5 2 6 5.25"/><path d="M15.5 4.9a3.25 3.25 0 0 1 0 6.2"/><path d="M18 14.6c1.6.8 2.6 2.4 3 4.9"/>',
  receipt: '<path d="M5.5 2.75h13v18.5l-2.15-1.5-2.2 1.5-2.15-1.5-2.15 1.5-2.2-1.5-2.15 1.5z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>',
  scale: '<path d="M3.5 20.5h17"/><rect x="5" y="13" width="3" height="5" rx=".75"/><rect x="10.5" y="9" width="3" height="9" rx=".75"/><rect x="16" y="4.5" width="3" height="13.5" rx=".75"/>',
  layers: '<path d="m12 3 9 4.75-9 4.75-9-4.75z"/><path d="m3 12.25 9 4.75 9-4.75"/><path d="m3 16.5 9 4.75 9-4.75"/>',
  clock: '<circle cx="12" cy="12" r="8.75"/><path d="M12 7.25V12l3.25 2"/>',
  shield: '<path d="M12 2.75 19.5 5.5v6c0 4.6-3.1 8.3-7.5 9.75C7.6 19.8 4.5 16.1 4.5 11.5v-6z"/><path d="m8.75 12 2.25 2.25 4.25-4.5"/>',
  eye: '<path d="M2.25 12S5.75 5.25 12 5.25 21.75 12 21.75 12 18.25 18.75 12 18.75 2.25 12 2.25 12z"/><circle cx="12" cy="12" r="3"/>',
  target: '<circle cx="12" cy="12" r="8.75"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.25" fill="currentColor"/>',
  heart: '<path d="M12 20.25s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.75c0 5.9-8 10.5-8 10.5z"/>',
  bolt: '<path d="M13.25 2.75 4.75 13.5H12l-1.25 7.75 8.5-10.75H12z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6 6 2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  globe: '<circle cx="12" cy="12" r="8.75"/><path d="M3.25 12h17.5"/><path d="M12 3.25c2.4 2.4 3.6 5.3 3.6 8.75S14.4 18.35 12 20.75C9.6 18.35 8.4 15.45 8.4 12S9.6 5.65 12 3.25z"/>',
  compass: '<circle cx="12" cy="12" r="8.75"/><path d="m15.75 8.25-2.1 5.4-5.4 2.1 2.1-5.4z"/>',
  chart: '<path d="M3.5 20.5h17"/><path d="m4.5 15.5 4.75-4.75 3.5 3.5L19.5 7.5"/><path d="M15 7.5h4.5V12"/>',
  rocket: '<path d="M14.5 4.5c2.6-1.1 5-1.25 5.75-1.25 0 .75-.15 3.15-1.25 5.75-1.1 2.6-3.6 5.1-6.75 7l-3.5-3.5c1.9-3.15 4.4-5.65 6.75-6.75z"/><path d="M8.75 12.5 5 12l2.5-3.25h3.75M11.5 15.25l.5 3.75 3.25-2.5V12.75"/><path d="M6.25 16.25c-1.5.5-2.5 2.25-2.5 4 1.75 0 3.5-1 4-2.5"/><circle cx="15.25" cy="8.75" r="1.25"/>',
  search: '<circle cx="10.75" cy="10.75" r="6.5"/><path d="m15.5 15.5 5 5"/>',
  doc: '<path d="M6 2.75h8.5L19 7.25v14H6z"/><path d="M14.5 2.75v4.5H19"/><path d="M9 12h7M9 15.5h7M9 8.75h3"/>',
  mail: '<rect x="2.75" y="5" width="18.5" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.25 8.5-6.25"/>',
  phone: '<path d="M5.25 3.25h3.5l1.75 4.5-2.25 1.5a11 11 0 0 0 6.5 6.5l1.5-2.25 4.5 1.75v3.5a2 2 0 0 1-2 2C10.6 20.25 3.75 13.4 3.25 5.25a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21.25s-6.75-5.9-6.75-11.5a6.75 6.75 0 0 1 13.5 0c0 5.6-6.75 11.5-6.75 11.5z"/><circle cx="12" cy="9.75" r="2.5"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.75v3.5M16 2.75v3.5"/><path d="M7.5 13.25h.01M12 13.25h.01M16.5 13.25h.01M7.5 16.75h.01M12 16.75h.01"/>',
  chat: '<path d="M20.5 11.75a8.25 8.25 0 0 1-12.2 7.25L3.5 20.5 5 16.1A8.25 8.25 0 1 1 20.5 11.75z"/>',
  plug: '<path d="M9 2.75v4.5M15 2.75v4.5"/><path d="M6.25 7.25h11.5v3.5a5.75 5.75 0 0 1-11.5 0z"/><path d="M12 16.5v4.75"/>',
  handshake: '<path d="m11 17.5 1.75 1.5a1.75 1.75 0 0 0 2.5-2.5"/><path d="m13.5 15 2.25 2.25a1.75 1.75 0 0 0 2.5-2.5L14 10.5l-1.75 1.25a2 2 0 0 1-2.5-3l3-2.5a3 3 0 0 1 3.25-.4L21.25 8"/><path d="M2.75 8 7 6.25l5 4.25"/><path d="m2.75 14 3.5 3.5a1.75 1.75 0 0 0 2.5-2.5"/><path d="m8.25 16.5 1.25 1.25a1.75 1.75 0 0 0 2.5-2.5"/>',
  cart: '<path d="M2.75 3.75h2.5l2.25 11.5h11l2-8.25H6.25"/><circle cx="9" cy="19.5" r="1.25"/><circle cx="17" cy="19.5" r="1.25"/>',
  building: '<path d="M4 21V5.5L13 3v18"/><path d="M13 9h7v12"/><path d="M2.75 21h18.5"/><path d="M7.5 8.5h2M7.5 12h2M7.5 15.5h2M16 12.5h1M16 16h1"/>',
  wrench: '<path d="M14.75 6.25a4.25 4.25 0 0 0 5.4 5.4l-8.65 8.65a2.4 2.4 0 0 1-3.4-3.4l8.65-8.65z"/><path d="M14.75 6.25 17.5 3.5a4.25 4.25 0 0 1 3 3l-2.75 2.75"/>',
  gauge: '<path d="M3.25 15.5a8.75 8.75 0 1 1 17.5 0"/><path d="m12 15.5 4-5"/><circle cx="12" cy="15.5" r="1.25"/>',
  palette: '<path d="M12 3.25a8.75 8.75 0 0 0 0 17.5c1 0 1.75-.75 1.75-1.75 0-.45-.2-.85-.45-1.15-.25-.3-.45-.7-.45-1.15 0-1 .75-1.75 1.75-1.75h2.1a4.55 4.55 0 0 0 4.55-4.55C21.25 6.6 17.1 3.25 12 3.25z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/>',
  link: '<path d="M10 14a4.25 4.25 0 0 0 6 0l3-3a4.25 4.25 0 0 0-6-6l-1 1"/><path d="M14 10a4.25 4.25 0 0 0-6 0l-3 3a4.25 4.25 0 0 0 6 6l1-1"/>',
  folder: '<path d="M2.75 6.25a2 2 0 0 1 2-2h4.5l2 2.5h8a2 2 0 0 1 2 2v9.5a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2z"/>',
  plane: '<path d="M21 3 10.5 13.5"/><path d="m21 3-6.75 18-3.75-7.5L3 9.75z"/>',
  database: '<ellipse cx="12" cy="5.5" rx="7.75" ry="2.75"/><path d="M4.25 5.5v13c0 1.5 3.5 2.75 7.75 2.75s7.75-1.25 7.75-2.75v-13"/><path d="M4.25 12c0 1.5 3.5 2.75 7.75 2.75s7.75-1.25 7.75-2.75"/>',
  megaphone: '<path d="M3.5 10v4a1.5 1.5 0 0 0 1.5 1.5h2L18.5 20V4L7 8.5H5A1.5 1.5 0 0 0 3.5 10z"/><path d="M7.5 15.5 9 20.5h2.75l-1.25-5"/><path d="M21 10.5v3"/>',
  wallet: '<path d="M19.5 7.25V5.5a1.5 1.5 0 0 0-1.5-1.5H5a2 2 0 0 0 0 4h14.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5a2 2 0 0 1-2-2V6"/><path d="M16.5 14h.01"/>',
  bank: '<path d="m3 9 9-5.25L21 9"/><path d="M5 9.5v8M9.5 9.5v8M14.5 9.5v8M19 9.5v8"/><path d="M3 20.5h18"/>',
  calculator: '<rect x="4.5" y="2.75" width="15" height="18.5" rx="2"/><path d="M8 7h8"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15v2.5M8.5 18h.01M12 18h.01"/>',
  pie: '<path d="M20.75 13.25A8.75 8.75 0 1 1 10.75 3.25"/><path d="M14 2.75a7.25 7.25 0 0 1 7.25 7.25H14z"/>',
  book: '<path d="M4 4.75A1.75 1.75 0 0 1 5.75 3h13.5v15.25H5.75A1.75 1.75 0 0 0 4 20z"/><path d="M4 20a1.75 1.75 0 0 0 1.75 1.75h13.5v-3.5"/>',
  stamp: '<path d="M5 21h14"/><path d="M5.75 17.5h12.5v-2.25a1.75 1.75 0 0 0-1.75-1.75h-2.75v-2.75a3.5 3.5 0 1 0-3.5 0v2.75H7.5a1.75 1.75 0 0 0-1.75 1.75z"/>',
  gavel: '<path d="m13.5 4.5 6 6"/><path d="m11 7 6 6"/><path d="m12.25 5.75-3.5 3.5 6 6 3.5-3.5"/><path d="M10.5 11 3.25 18.25a1.75 1.75 0 0 0 2.5 2.5L13 13.5"/>',
  trademark: '<circle cx="12" cy="12" r="8.75"/><path d="M8.5 9h4M10.5 9v6.5"/><path d="M13.5 15.5V9l1.75 3 1.75-3v6.5"/>',
  checklist: '<path d="m3.75 6.5 1.5 1.5 2.5-2.75"/><path d="m3.75 12.5 1.5 1.5 2.5-2.75"/><path d="m3.75 18.5 1.5 1.5 2.5-2.75"/><path d="M11 7h9.25M11 13h9.25M11 19h9.25"/>',
  inbox: '<path d="M2.75 13.5 5.5 4.75h13l2.75 8.75v5.75a1.5 1.5 0 0 1-1.5 1.5H4.25a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M2.75 13.5h5l1.25 2.5h6l1.25-2.5h5"/>',
  share: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.25 10.75 7.5-4M8.25 13.25l7.5 4"/>',
  headset: '<path d="M3.75 14v-2a8.25 8.25 0 0 1 16.5 0v2"/><rect x="3.75" y="13.5" width="4" height="6" rx="1.5"/><rect x="16.25" y="13.5" width="4" height="6" rx="1.5"/><path d="M20.25 18.5c0 1.6-1.6 2.75-4 2.75h-2"/>',
  idcard: '<rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5"/><circle cx="8.75" cy="11" r="2.25"/><path d="M5.5 16.5c.5-1.6 1.7-2.5 3.25-2.5S11.5 14.9 12 16.5"/><path d="M14.5 10h4M14.5 13.5h3"/>',
  filter: '<path d="M3.25 4.75h17.5l-6.75 8V19.5l-4 1.75v-8.5z"/>',

  // ── UI icons
  arrowRight: '<path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>',
  arrowDown: '<path d="M12 4.5v15"/><path d="m6 13.5 6 6 6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  check: '<path d="m4.5 12.5 4.75 4.75L19.5 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.75"/><path d="m8.25 12.25 2.5 2.5 5-5.25"/>',
  alert: '<circle cx="12" cy="12" r="8.75"/><path d="M12 7.5v5.25"/><path d="M12 16.25h.01"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M3.75 7.5h16.5M3.75 16.5h16.5"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  quote: '<path d="M9.5 6.5c-3 1-5 3.6-5 7v4h5.25v-5.25H7c0-2 1.1-3.6 2.5-4.25z"/><path d="M19.5 6.5c-3 1-5 3.6-5 7v4h5.25v-5.25H17c0-2 1.1-3.6 2.5-4.25z"/>',

  // ── Social (filled marks drawn as strokes where possible for consistency)
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.75 10.5v6"/><path d="M7.75 7.5h.01"/><path d="M11.5 16.5v-6"/><path d="M11.5 13a2.5 2.5 0 0 1 5 0v3.5"/>',
  x: '<path d="m4 4 6.6 8.8L4.2 20h1.6l5.6-6.2L16 20h4l-6.9-9.3L19.2 4h-1.6l-5.3 5.9L8 4z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.25 6.75h.01"/>',
};

/**
 * Render an inline SVG icon.
 * @param {keyof typeof paths} name
 * @param {{ size?: number, label?: string, className?: string }} [options]
 */
export function icon(name, { size = 24, label, className = '' } = {}) {
  const body = paths[name];
  if (!body) throw new Error(`Unknown icon "${name}"`);
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  const cls = ['icon', className].filter(Boolean).join(' ');
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${body}</svg>`;
}

export const iconNames = Object.keys(paths);
