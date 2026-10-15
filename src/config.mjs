/**
 * Global brand + contact configuration. Every page reads from here, so a
 * single edit updates the header, footer, contact page, schema and llms.txt.
 *
 * Values marked PLACEHOLDER must be replaced before launch (see README).
 */
export const brand = {
  name: 'Akrostech',
  tagline: 'Your hours. Our horizon.',
  // Canonical entity statement (design system §10.2) — keep word-for-word
  // everywhere: footer, About, Organization schema, LinkedIn, directories.
  entity:
    'Akrostech is a backend operations partner that provides web development, recruitment assistance, virtual assistance, accounting assistance and legal assistance to growing companies in the USA, Europe, Australia and the Middle East. Its dedicated teams work during each client’s local business hours.',
  founded: '', // PLACEHOLDER — e.g. "2019"
};

export const contact = {
  email: 'hello@akrostech.com',
  phoneDisplay: '+1 (555) 000-0000', // PLACEHOLDER
  phoneHref: '+15550000000', // PLACEHOLDER
  addressLines: ['[Street address]', '[City, State ZIP]', '[Country]'], // PLACEHOLDER
  hours: 'Monday – Friday, 9 AM – 6 PM EST',
  bookingUrl: 'https://calendly.com/akrostech/discovery-call', // PLACEHOLDER
};

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/akrostech', icon: 'linkedin' }, // PLACEHOLDER
  { label: 'X (Twitter)', href: 'https://x.com/akrostech', icon: 'x' }, // PLACEHOLDER
  { label: 'Instagram', href: 'https://www.instagram.com/akrostech', icon: 'instagram' }, // PLACEHOLDER
];

/** Primary navigation. `services` renders the mega-menu. */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/', children: 'services' },
  { label: 'Contact', href: '/contact/' },
];

export const legal = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
];

/** Regions served — used by the hero globe, footer and schema. */
export const regions = [
  { name: 'USA', city: 'New York', tz: 'America/New_York', location: [40.7128, -74.006] },
  { name: 'Europe', city: 'London', tz: 'Europe/London', location: [51.5072, -0.1276] },
  { name: 'Middle East', city: 'Dubai', tz: 'Asia/Dubai', location: [25.2048, 55.2708] },
  { name: 'Australia', city: 'Sydney', tz: 'Australia/Sydney', location: [-33.8688, 151.2093] },
];

/** Delivery hub — origin point of every Signal arc on the globe. */
export const hub = { name: 'India', location: [19.076, 72.8777] };
