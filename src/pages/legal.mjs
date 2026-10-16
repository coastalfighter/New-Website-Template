/**
 * Privacy Policy, Terms of Service and 404.
 *
 * The legal copy is a plain-English STARTER TEMPLATE so footer links never
 * 404. It is not legal advice — have counsel review and complete it before
 * launch (design system §13.3, §15).
 */
import { esc, each } from '../lib/html.mjs';
import { pageHero, button } from '../components/ui.mjs';
import { contact, brand } from '../config.mjs';
import { privacyShield, termsStack, lostSignal } from '../components/hero-visuals.mjs';

const UPDATED = 'To be confirmed before launch';

function legalPage({ path, title, description, heading, intro, sections, variant, visual }) {
  const crumbs = [{ label: 'Home', href: '/' }, { label: heading.replace(/\*/g, ''), href: path }];
  const body = `
${pageHero({ variant, kicker: 'Legal', title: heading, sub: intro, crumbs, visual, className: 'hero--compact' })}
<section class="section section--tight">
  <div class="container legal">
    <p class="notice notice--draft" role="note"><strong>Draft template.</strong> This page must be reviewed and completed by legal counsel before launch. Last updated: ${UPDATED}.</p>
    <div class="prose">
      ${each(sections, (s) => `<h2>${esc(s.h)}</h2>${each(s.p, (p) => `<p>${esc(p)}</p>`)}`)}
      <h2>Contact</h2>
      <p>Questions about this page? Email <a href="mailto:${contact.email}">${contact.email}</a>.</p>
    </div>
  </div>
</section>`;
  return { path, title, description, body, pageClass: 'page-legal' };
}

export const privacy = () =>
  legalPage({
    path: '/privacy/',
    title: 'Privacy Policy — Akrostech',
    description: `How ${brand.name} collects, uses and protects personal information shared through this website.`,
    heading: 'Privacy *Policy*',
    variant: 'shield',
    visual: privacyShield(),
    intro: 'How we collect, use and protect the information you share with us.',
    sections: [
      { h: 'Information we collect', p: ['When you contact us we collect the details you provide: your name, business email, company, the service you are interested in, your budget range and your message. We also collect limited technical data, such as browser type and pages visited, to keep the site secure and working well.'] },
      { h: 'How we use it', p: ['We use your information to respond to your enquiry, prepare for and hold discovery calls, send an NDA if you request one, and improve our website. We do not sell your personal information.'] },
      { h: 'Legal basis and retention', p: ['Where GDPR or UK GDPR applies, we process enquiry data on the basis of our legitimate interest in responding to you, or to take steps at your request before entering into a contract. We keep enquiry data only as long as needed for these purposes.'] },
      { h: 'Your rights', p: ['Depending on where you live, you may have the right to access, correct, delete or restrict use of your personal information, and to object to processing. Contact us to exercise these rights.'] },
      { h: 'Cookies', p: ['This website does not set advertising cookies. If analytics are added, this section and a cookie consent banner must be updated before they are enabled.'] },
    ],
  });

export const terms = () =>
  legalPage({
    path: '/terms/',
    title: 'Terms of Service — Akrostech',
    description: `The terms that govern use of the ${brand.name} website.`,
    heading: 'Terms of *Service*',
    variant: 'stack',
    visual: termsStack(),
    intro: 'The ground rules for using this website.',
    sections: [
      { h: 'Using this website', p: ['This website provides general information about Akrostech and our services. You may use it for lawful purposes only and must not attempt to disrupt or gain unauthorised access to it.'] },
      { h: 'No professional advice', p: ['Content on this site is for information only. Akrostech provides support services; we do not provide legal, tax, accounting or financial advice. Accounting and legal assistance is delivered under the review and supervision of your own licensed professionals.'] },
      { h: 'Service agreements', p: ['Any services we provide are governed by a separate written agreement. If that agreement conflicts with these terms, the agreement prevails.'] },
      { h: 'Intellectual property', p: ['The Akrostech name, logo, design and content of this website belong to Akrostech unless stated otherwise and may not be reused without permission.'] },
      { h: 'Liability', p: ['We work hard to keep this website accurate and available, but it is provided “as is”. To the extent permitted by law, we are not liable for losses arising from its use.'] },
    ],
  });

export const notFound = () => ({
  path: '/404.html',
  title: 'Page not found — Akrostech',
  description: 'The page you were looking for has moved or no longer exists.',
  noindex: true,
  pageClass: 'page-404',
  body: `${pageHero({
    variant: 'lost',
    visual: lostSignal(),
    kicker: 'Error 404',
    title: 'Signal *lost.*',
    sub: 'The page you were looking for has moved or no longer exists. Let’s get you back on track.',
    className: 'hero--compact',
    actions: `${button({ label: 'Back to home', href: '/', variant: 'primary' })}${button({ label: 'See our services', href: '/services/', variant: 'secondary' })}`,
  })}`,
});
