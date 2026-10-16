/**
 * Time-zone storytelling ("Your hours. Our horizon."):
 *  · header live badge   — "Team online · 10:42 your time" (§6.2)
 *  · region clocks       — any <time data-tz="Area/City">
 *  · contact detection   — "It's 10:42 AM in Chicago. Our team is online now." (§5.3 #14)
 *
 * Status is honest: "online" only during the visitor's own business hours
 * (Mon–Fri, 08:00–19:00 local), since that is when their team is working.
 */
import { $, $$, formatTime } from './utils.js';

const visitorZone = (() => {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || null; } catch { return null; }
})();

/** "America/Los_Angeles" → "Los Angeles". */
export function cityFromZone(zone) {
  if (!zone || !zone.includes('/')) return null;
  return zone.split('/').pop().replace(/_/g, ' ');
}

/** Visitor-local business hours: Mon–Fri, 08:00–18:59. */
export function isBusinessHours(date = new Date()) {
  const day = date.getDay();
  const hour = date.getHours();
  return day >= 1 && day <= 5 && hour >= 8 && hour < 19;
}

const escapeHtml = (text) => text.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

function tick() {
  const now = new Date();

  for (const el of $$('time[data-tz]')) {
    const value = formatTime(now, el.dataset.tz);
    if (value && el.textContent !== value) {
      el.textContent = value;
      el.dateTime = now.toISOString();
    }
  }

  const online = isBusinessHours(now);
  const local = formatTime(now, undefined);
  for (const el of $$('[data-local-time]')) if (local) el.textContent = local;
  const badge = $('[data-live-clock]');
  const badgeText = $('[data-live-clock-text]');
  if (badge && badgeText && local) {
    badge.dataset.state = online ? 'online' : 'offline';
    badgeText.textContent = online ? `Team online · ${local} your time` : `Back at 09:00 your time · ${local}`;
  }

  const tzLine = $('[data-tz-line]');
  if (tzLine && visitorZone) {
    const city = cityFromZone(visitorZone);
    const time12 = formatTime(now, undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
    const where = city ? ` in <strong>${escapeHtml(city)}</strong>` : '';
    tzLine.innerHTML = online
      ? `It’s <strong>${time12}</strong>${where}. Our team is <strong>online now</strong>.`
      : `It’s <strong>${time12}</strong>${where}. Leave a message — we’ll reply as your business day starts.`;
    const meta = $('[data-tz-meta]');
    if (meta) meta.textContent = online ? 'Typically replies within 1 business hour.' : 'Replies within 1 business hour of your next working day.';
  }
}

export function initClocks() {
  if (!$('time[data-tz], [data-live-clock], [data-tz-line], [data-local-time]')) return;
  tick();
  // Align updates to the start of each minute, then tick every 60s.
  const msToNextMinute = 60000 - (Date.now() % 60000);
  window.setTimeout(() => {
    tick();
    window.setInterval(tick, 60000);
  }, msToNextMinute + 50);
}

export { visitorZone };
