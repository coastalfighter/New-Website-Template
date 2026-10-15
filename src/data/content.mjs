/**
 * Shared marketing content. Numbers and people here are PLACEHOLDERS supplied
 * in the brief — replace them with verified figures and permissioned quotes
 * before launch (design system §15, "Content & facts").
 */

/** Impact counters. `value` is the final number rendered in the HTML. */
export const stats = [
  { value: 500, suffix: '+', label: 'Projects delivered', note: 'across all five service lines' },
  { value: 98, suffix: '%', label: 'Client retention', note: 'clients who renew year over year' },
  { value: 50, suffix: '+', label: 'Team members', note: 'specialists, not freelancers' },
  { value: 12, suffix: '+', label: 'Industries served', note: 'from SaaS to legal practices' },
];

/** Social-proof logo placeholders — swap for permissioned client logos. */
export const clients = Array.from({ length: 8 }, (_, i) => `Client ${i + 1}`);

/** Industries marquee (design system §7.1, section 7). */
export const industries = [
  'SaaS', 'E-commerce', 'Law firms', 'Accounting practices', 'Healthcare admin',
  'Real estate', 'Agencies', 'Fintech', 'Logistics', 'Professional services',
];

/** "Why Akrostech" differentiators. */
export const differentiators = [
  {
    icon: 'users',
    title: 'Dedicated teams, not freelancers',
    desc: 'The same vetted people, every day, learning your business. No task marketplaces, no rotating strangers, no starting from zero each week.',
  },
  {
    icon: 'receipt',
    title: 'Transparent pricing, no surprises',
    desc: 'One clear monthly fee per specialist or a fixed project price — agreed in writing before work starts. No padded hours, no hidden margins.',
  },
  {
    icon: 'scale',
    title: 'Built for scale',
    desc: 'Add a specialist in days, not months. Flex capacity up for a launch or busy season and back down again without hiring or layoffs.',
  },
  {
    icon: 'layers',
    title: 'Cross-functional expertise',
    desc: 'Engineering, recruiting, admin, finance and legal under one partner, one contract and one point of contact. Fewer vendors to manage.',
  },
];

/** Home-page "How it works". */
export const process = [
  { title: 'Discovery call', desc: 'A 30-minute call in your time zone. We learn your operations, goals and where the hours are leaking.', meta: 'Week 0' },
  { title: 'Team assembly', desc: 'We shortlist specialists matched to your tools, industry and working hours — you meet them before they start.', meta: 'Days, not months' },
  { title: 'Onboarding & integration', desc: 'NDAs, secure access and documented playbooks. Your team joins your Slack, your stand-ups and your systems.', meta: 'Plug-in' },
  { title: 'Execution & reporting', desc: 'Daily delivery during your business hours, with weekly reporting you can actually read. We deliver; you grow.', meta: 'Every week' },
];

/**
 * Testimonials — PLACEHOLDERS. Publish only real quotes with written client
 * permission (design system §7.1 section 6, §13.3).
 */
export const testimonials = [
  {
    quote: 'We went from a six-month hiring backlog to a fully staffed web team in under three weeks. They join our stand-ups like they’ve always been here.',
    name: 'Client Name',
    role: 'CTO',
    company: 'Client Company',
    initials: 'CN',
  },
  {
    quote: 'Month-end used to swallow our first week. Now the books are reconciled before I ask, and my team finally has time for forecasting.',
    name: 'Client Name',
    role: 'CFO',
    company: 'Client Company',
    initials: 'CN',
  },
  {
    quote: 'Our recruiters stopped scheduling and started closing. Time-to-hire dropped noticeably in the first quarter and candidate feedback improved.',
    name: 'Client Name',
    role: 'Head of Talent',
    company: 'Client Company',
    initials: 'CN',
  },
  {
    quote: 'What sold me was the overlap with our working day. Questions get answered in minutes, not overnight. It feels like an in-house team.',
    name: 'Client Name',
    role: 'Head of Operations',
    company: 'Client Company',
    initials: 'CN',
  },
];

/** "Why our model works" (services hub). */
export const modelAdvantages = [
  { icon: 'wallet', title: 'Lower total cost', desc: 'Skilled specialists for a fraction of a fully loaded local hire — no recruiting fees, benefits overhead, equipment or office space.' },
  { icon: 'scale', title: 'Elastic capacity', desc: 'Scale a team up for a launch, audit or hiring sprint, then back down. Capacity follows your plan, not your headcount.' },
  { icon: 'spark', title: 'Expertise on tap', desc: 'Access engineers, recruiters, accountants and legal professionals you would struggle to hire individually.' },
  { icon: 'clock', title: 'Your time zone', desc: 'Teams run shifts aligned to your working day across the US, Europe, Australia and the Middle East. No overnight hand-offs.' },
];

/** About page: values. */
export const values = [
  { icon: 'eye', title: 'Radical transparency', desc: 'Clear pricing, honest timelines and reporting you can see. If something slips, you hear it from us first.' },
  { icon: 'target', title: 'Operational excellence', desc: 'Documented playbooks, measured quality and continuous improvement in every engagement.' },
  { icon: 'heart', title: 'People first', desc: 'Fair schedules, real careers and genuine wellbeing support — rested people do better work for you.' },
  { icon: 'shield', title: 'Relentless reliability', desc: 'We show up when you do, every day. Backups, cover plans and NDAs are standard, not upsells.' },
  { icon: 'bolt', title: 'Innovation always', desc: 'We adopt better tools and automation early, and pass the efficiency gains straight to you.' },
];

/** About page: team — PLACEHOLDERS. Replace with real people and photos. */
export const team = [
  { name: 'Team Member', role: 'Founder & CEO', initials: 'TM', zone: 'New York hours' },
  { name: 'Team Member', role: 'Head of Operations', initials: 'TM', zone: 'London hours' },
  { name: 'Team Member', role: 'Engineering Lead', initials: 'TM', zone: 'Sydney hours' },
  { name: 'Team Member', role: 'Head of Talent Solutions', initials: 'TM', zone: 'Dubai hours' },
  { name: 'Team Member', role: 'Finance Operations Lead', initials: 'TM', zone: 'New York hours' },
  { name: 'Team Member', role: 'Legal Services Lead', initials: 'TM', zone: 'London hours' },
];

/** Home FAQ (AEO block). Answers are self-contained by design (§9.1). */
export const homeFaqs = [
  { q: 'What does Akrostech do?', a: 'Akrostech is a backend operations partner. We provide dedicated teams for web development, recruitment assistance, virtual assistance, accounting assistance and legal assistance, so growing companies can scale operations without growing headcount.' },
  { q: 'Do your teams really work in my time zone?', a: 'Yes. Teams run shifts aligned to your working day — whether you are in New York, London, Sydney or Dubai — so you get live collaboration, same-day responses and attendance at your meetings rather than overnight hand-offs.' },
  { q: 'How is Akrostech different from a freelancer marketplace?', a: 'You get a dedicated, vetted team managed by us, with documented processes, backups for leave, NDAs and a single accountable partner — not a rotating cast of individual contractors you have to manage yourself.' },
  { q: 'How quickly can a team start?', a: 'Most clients have their first specialist onboarded within days of the discovery call, including NDAs, tool access and a trial task. Larger multi-role teams are typically assembled in a few weeks.' },
  { q: 'Is it safe to share sensitive data with an outsourced team?', a: 'Yes, with the right controls. Every engagement uses NDAs, role-based access, secure devices and GDPR-aware data handling. Access is limited to what each specialist needs and can be revoked at any time.' },
  { q: 'Is there a minimum contract?', a: 'Engagements are flexible and agreed in writing during onboarding. We will walk you through options on the discovery call so the commitment fits your plans.' },
];

/** Contact page mini-FAQ. */
export const contactFaqs = [
  { q: 'How soon can we start?', a: 'Usually within days of the discovery call. We confirm scope, sign the NDA and match your specialist, then start with a short trial task.' },
  { q: 'Do you sign NDAs before the call?', a: 'Yes. Mention it in your message and we will send our mutual NDA before we discuss anything confidential.' },
  { q: 'Is there a minimum contract?', a: 'Engagement terms are flexible and agreed in writing. We will explain the options clearly on the call — no pressure, no lock-in surprises.' },
];

export const budgetOptions = ['$1K–$5K', '$5K–$15K', '$15K–$50K', '$50K+', 'Let’s discuss'];
