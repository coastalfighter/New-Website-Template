/**
 * The five service pillars. This single dataset drives the home page cards,
 * the services hub, the mega-menu, the footer, every individual service page,
 * the Service JSON-LD and llms.txt — edit copy here, never in templates.
 *
 * Headline strings may wrap one word in *asterisks* for the editorial accent.
 */

/** @typedef {{ title: string, desc: string, icon: string }} Feature */
/** @typedef {{ q: string, a: string }} Faq */

export const services = [
  // ─────────────────────────────────────────────────────────── Web Development
  {
    slug: 'web-development',
    name: 'Web Development',
    icon: 'code',
    accent: 'lime',
    nav: 'Websites & web apps, built and maintained',
    card: 'Websites and web apps engineered to convert, scale and stay fast. From greenfield builds to rescuing a legacy stack, one team owns it end to end.',
    hub: 'A dedicated engineering squad that designs, builds and maintains the web properties your revenue depends on. We ship in visible weekly sprints, inside your repos and your tools. Legacy platform holding you back? We modernise it without a risky big-bang rewrite. And when launch day passes, we stay on.',
    hubBullets: [
      'Custom sites & web apps (React, Next.js, Node)',
      'Redesigns & legacy-system modernisation',
      'E-commerce, CMS builds & API integrations',
      'Ongoing maintenance, performance & security',
    ],
    seo: {
      title: 'Outsourced Web Development Team | Akrostech',
      description:
        'Outsource web development to a dedicated team working your hours. Custom websites, web apps, redesigns, e-commerce, CMS builds and ongoing maintenance.',
    },
    hero: {
      eyebrow: 'Service · Web Development',
      title: 'Websites that *work* as hard as you do.',
      sub: 'A dedicated engineering team that designs, builds and maintains your web platforms — shipping in weekly sprints you can actually watch, during your business hours.',
    },
    definition:
      'Web development outsourcing is handing the design, build and upkeep of your websites and web applications to an external engineering team that works inside your tools and process.',
    overview: [
      'Your website is your hardest-working salesperson and, too often, your most neglected system. Internal engineers are rightly focused on the core product, agencies disappear after launch, and freelancers rarely overlap with your working day. The result: a backlog of “quick fixes”, a stack nobody wants to touch, and a site that no longer matches the business you’ve become.',
      'Akrostech gives you a standing web team without the hiring cycle. Designers, front-end and full-stack engineers join your Slack and stand-ups, work in your repositories, and deliver against a roadmap you control. New build, redesign or a careful migration off a legacy platform — we scope it, ship it in visible increments and stay on to maintain it.',
      'It’s built for CTOs who need to protect core-product velocity, marketing leaders who need pages live this week, and operators running a revenue-critical site on a stack that has outgrown its original builder.',
    ],
    included: [
      { title: 'Full-stack development', desc: 'Front end to database, built on modern, maintainable stacks.', icon: 'layers' },
      { title: 'Website redesigns', desc: 'Reposition the brand and lift conversion without losing your SEO equity.', icon: 'palette' },
      { title: 'Landing pages', desc: 'Campaign-ready pages shipped in days and built for A/B testing.', icon: 'rocket' },
      { title: 'E-commerce', desc: 'Shopify, WooCommerce and headless storefronts that sell.', icon: 'cart' },
      { title: 'CMS builds', desc: 'WordPress, Webflow and headless CMS setups your team can edit safely.', icon: 'doc' },
      { title: 'Web app development', desc: 'Portals, dashboards and internal tools with real business logic.', icon: 'code' },
      { title: 'Maintenance & support', desc: 'Updates, monitoring, backups and fixes on a predictable plan.', icon: 'wrench' },
      { title: 'Performance optimisation', desc: 'Core Web Vitals work that makes pages fast on real devices.', icon: 'gauge' },
      { title: 'SEO-ready builds', desc: 'Semantic markup, schema, clean URLs and technical SEO from day one.', icon: 'search' },
      { title: 'Responsive design', desc: 'Interfaces that feel native on every screen size.', icon: 'eye' },
      { title: 'API integrations', desc: 'CRMs, payment providers, ERPs and third-party services, wired up properly.', icon: 'plug' },
      { title: 'UI/UX design', desc: 'Research-led flows and polished interfaces, prototyped in Figma.', icon: 'compass' },
    ],
    process: [
      { title: 'Scope & architecture', desc: 'We audit what exists, define the outcome and agree a sprint roadmap and stack with your technical lead.' },
      { title: 'Design & build sprints', desc: 'Weekly demos in your time zone. You see working software every Friday, not a big reveal in month three.' },
      { title: 'Launch & care', desc: 'QA, performance and accessibility checks, a zero-drama launch — then ongoing maintenance on a clear plan.' },
    ],
    useCases: [
      { title: 'The stalled redesign', desc: 'A marketing team has waited two quarters for engineering capacity. We take the redesign off the core team’s plate and ship it.', tag: 'Marketing-led' },
      { title: 'The legacy migration', desc: 'A business-critical site is trapped on an outdated CMS. We plan a phased migration that protects rankings and revenue.', tag: 'Modernisation' },
      { title: 'The internal tool backlog', desc: 'Operations runs on spreadsheets. We build the portal or dashboard that finally gives them a proper system.', tag: 'Operations' },
      { title: 'The always-on storefront', desc: 'An e-commerce brand needs continuous improvements and fast fixes during its own trading hours.', tag: 'E-commerce' },
    ],
    faqs: [
      { q: 'Will we own the code and designs?', a: 'Yes. Everything we build lives in your repositories and design files from the first commit, and intellectual property is assigned to you under our agreement.' },
      { q: 'Can you work alongside our in-house engineers?', a: 'That is the most common setup. We follow your branching strategy, code review and deployment process, and join your stand-ups so the work feels like one team.' },
      { q: 'Which technologies do you work with?', a: 'Our core stack is React, Next.js, Node.js and TypeScript, plus WordPress, Webflow and Shopify. If you run something else, we will tell you honestly in the discovery call whether we are the right fit.' },
      { q: 'How do you price web development?', a: 'Either a dedicated monthly team for ongoing work, or a fixed, milestone-based price for a defined project. You get a written scope and estimate before any work starts — no surprise invoices.' },
      { q: 'Do you offer maintenance after launch?', a: 'Yes. Most clients keep us on a maintenance plan covering updates, security patches, monitoring, backups and a monthly allowance of improvements.' },
    ],
    tools: ['Figma', 'React', 'Next.js', 'Node.js', 'TypeScript', 'WordPress', 'Webflow', 'Shopify', 'Vercel', 'AWS', 'GitHub'],
    cta: 'Ready to get started with *Web Development?*',
  },

  // ──────────────────────────────────────────────────── Recruitment Assistance
  {
    slug: 'recruitment-assistance',
    name: 'Recruitment Assistance',
    icon: 'recruit',
    accent: 'lavender',
    nav: 'Sourcing, screening & coordination',
    card: 'Sourcing, screening and interview coordination that keeps every req moving. Your recruiters stay on conversations; we handle the pipeline work behind them.',
    hub: 'Recruitment operations specialists who plug into your ATS and run the high-volume work behind every hire. We write the job ads, source and screen candidates, and coordinate the interview loop. Reference checks, offer paperwork and onboarding documents are handled too. Your recruiters and hiring managers spend their time where it counts: deciding who to hire.',
    hubBullets: [
      'Candidate sourcing & Boolean search',
      'CV screening, shortlists & pre-screens',
      'Interview scheduling & ATS hygiene',
      'Offer letters, references & onboarding docs',
    ],
    seo: {
      title: 'Recruitment Assistance & RPO Support | Akrostech',
      description:
        'Recruitment assistants who source, screen and schedule candidates inside your ATS, during your hours. Scale hiring without adding recruiters.',
    },
    hero: {
      eyebrow: 'Service · Recruitment Assistance',
      title: 'Keep your hiring pipeline *full*.',
      sub: 'Recruitment specialists who source, screen and coordinate candidates for you — so your recruiters spend their time on conversations, not calendar admin.',
    },
    definition:
      'Recruitment assistance — often called recruitment process outsourcing (RPO) support — is delegating the operational parts of hiring, such as sourcing, screening, scheduling and reporting, to an external team.',
    overview: [
      'When headcount plans accelerate, recruiting teams don’t run out of judgment — they run out of hours. Sourcing gets rushed, inboxes overflow with unscreened CVs, interview loops take a week to schedule, and great candidates accept other offers while you are still chasing calendars.',
      'Akrostech adds recruitment coordinators and sourcers who work inside your ATS, follow your scorecards and represent your employer brand. We take on the repeatable, time-consuming work — from job descriptions to onboarding paperwork — and report on every stage so you always know where the pipeline stands.',
      'It’s designed for Heads of Talent scaling through a hiring push, HR leaders without a dedicated coordinator, and founders who are still doing their own recruiting at 11 PM.',
    ],
    included: [
      { title: 'Job description creation', desc: 'Inclusive, compelling job ads written from your intake notes.', icon: 'doc' },
      { title: 'Candidate sourcing', desc: 'LinkedIn, job boards and Boolean search to fill the top of the funnel.', icon: 'search' },
      { title: 'Resume screening', desc: 'Every application reviewed against your must-haves and scorecard.', icon: 'filter' },
      { title: 'Interview scheduling', desc: 'Multi-panel loops coordinated across calendars and time zones.', icon: 'calendar' },
      { title: 'ATS management', desc: 'Clean stages, tidy notes and accurate data in your ATS.', icon: 'database' },
      { title: 'Reference checks', desc: 'Structured reference calls and written summaries.', icon: 'chat' },
      { title: 'Offer letter preparation', desc: 'Offer documents drafted from your approved templates.', icon: 'stamp' },
      { title: 'Onboarding documentation', desc: 'Pre-start paperwork, checklists and new-hire comms.', icon: 'checklist' },
      { title: 'Employer branding support', desc: 'Careers-page content, job-post refreshes and candidate messaging.', icon: 'megaphone' },
      { title: 'Recruitment analytics', desc: 'Weekly funnel, time-to-hire and source-of-hire reporting.', icon: 'chart' },
    ],
    process: [
      { title: 'Role intake', desc: 'We meet your hiring managers, capture must-haves and calibrate on example profiles before sourcing starts.' },
      { title: 'Source, screen & schedule', desc: 'Daily sourcing and screening against your scorecard, with interviews booked straight into your calendars.' },
      { title: 'Report & refine', desc: 'Weekly pipeline reports and calibration calls keep quality high and time-to-hire falling.' },
    ],
    useCases: [
      { title: 'The hiring sprint', desc: 'A Series B company needs 25 hires this half. We add sourcing and coordination capacity for exactly as long as it lasts.', tag: 'Scale-up' },
      { title: 'The solo recruiter', desc: 'One in-house recruiter supports the entire company. We take the admin so they can focus on closing candidates.', tag: 'Lean HR' },
      { title: 'The agency back office', desc: 'A recruitment agency needs reliable researchers and coordinators behind its consultants.', tag: 'Staffing firm' },
      { title: 'The volume role', desc: 'Dozens of similar roles across locations, each needing fast screening and consistent candidate comms.', tag: 'High volume' },
    ],
    faqs: [
      { q: 'Do you work inside our ATS?', a: 'Yes. We work in Greenhouse, Lever, Workable, Bullhorn, BambooHR and most other mainstream systems, using the accounts and permissions you provide.' },
      { q: 'Can your team recruit for roles in other countries?', a: 'Yes. We source and coordinate for roles in the USA, UK, Europe, Australia and the Middle East, following your local process and compliance requirements.' },
      { q: 'Who makes the hiring decision?', a: 'You always do. We source, screen and coordinate against your criteria; your recruiters and hiring managers interview and decide.' },
      { q: 'How do you protect candidate data?', a: 'Candidate data stays inside your systems. Our team works under NDA with role-based access, and we follow GDPR-aware handling for every candidate record.' },
      { q: 'Do you charge per hire?', a: 'No. We charge a transparent monthly fee per dedicated specialist, so there is no incentive to push volume over quality.' },
    ],
    tools: ['LinkedIn Recruiter', 'Greenhouse', 'Lever', 'Workable', 'Bullhorn', 'BambooHR', 'Calendly'],
    cta: 'Ready to get started with *Recruitment Assistance?*',
  },

  // ─────────────────────────────────────────────────────── Virtual Assistance
  {
    slug: 'virtual-assistance',
    name: 'Virtual Assistance',
    icon: 'assistant',
    accent: 'lime',
    nav: 'Admin, inbox, CRM & daily operations',
    card: 'Skilled assistants who take inbox, calendar, CRM and daily admin off your plate. You get your hours back; the busywork still gets done, properly.',
    hub: 'A dedicated assistant, or a small pod of them, who handles the operational load that quietly eats your leadership team’s week. Inbox triage, calendars, research, CRM updates, documents and customer queries are all covered. They are trained on your tools and playbooks, and they work while you do. The result: fewer dropped balls, faster responses and time back for the work only you can do.',
    hubBullets: [
      'Inbox, calendar & travel management',
      'CRM updates, data entry & research',
      'Customer support & document preparation',
      'Project coordination & file management',
    ],
    seo: {
      title: 'Dedicated Virtual Assistant Services | Akrostech',
      description:
        'Dedicated virtual assistants for inbox, calendar, CRM, research and customer support — trained on your tools and online during your business day.',
    },
    hero: {
      eyebrow: 'Service · Virtual Assistance',
      title: 'Get your *hours* back.',
      sub: 'A dedicated assistant who handles the busywork — inbox, calendar, research, CRM and customer queries — so your leadership team can focus on what grows the business.',
    },
    definition:
      'Virtual assistance is remote administrative and operational support — such as email, scheduling, data entry, research and customer service — delivered by a dedicated assistant working inside your tools.',
    overview: [
      'Executives at growing companies spend a startling share of their week on work that doesn’t need them: rescheduling meetings, chasing approvals, updating the CRM, formatting decks, digging through inboxes. It’s not that the work doesn’t matter. It’s that it pulls your most expensive people away from decisions that do.',
      'Akrostech virtual assistants are vetted professionals, not task-marketplace freelancers. Each one learns your preferences, your tools and your standards through a written playbook, then takes ownership of a defined set of responsibilities. Need more coverage? We add another trained assistant to the same pod — no new hiring cycle.',
      'It’s ideal for founders and executives drowning in admin, operations teams stretched across too many systems, and customer-facing teams that need faster response times without adding full-time headcount.',
    ],
    included: [
      { title: 'Email management', desc: 'Inbox triage, drafted replies and follow-ups that never slip.', icon: 'inbox' },
      { title: 'Calendar management', desc: 'Scheduling, rescheduling and protected focus time across time zones.', icon: 'calendar' },
      { title: 'Data entry & databases', desc: 'Accurate, consistent records across your spreadsheets and systems.', icon: 'database' },
      { title: 'Travel arrangements', desc: 'Flights, hotels and itineraries booked to your policy and preferences.', icon: 'plane' },
      { title: 'CRM management', desc: 'Clean pipelines, logged activity and enriched contacts.', icon: 'users' },
      { title: 'Research & reporting', desc: 'Market, competitor and prospect research, summarised clearly.', icon: 'search' },
      { title: 'Document preparation', desc: 'Decks, reports, SOPs and proposals formatted to your brand.', icon: 'doc' },
      { title: 'Customer support', desc: 'Email and chat support that follows your tone and escalation rules.', icon: 'headset' },
      { title: 'Social media management', desc: 'Content scheduling, community monitoring and reporting.', icon: 'share' },
      { title: 'Project coordination', desc: 'Task tracking, status updates and meeting notes that keep work moving.', icon: 'checklist' },
      { title: 'File & cloud organisation', desc: 'Tidy, permissioned folders in Drive, SharePoint or Dropbox.', icon: 'folder' },
    ],
    process: [
      { title: 'Task audit', desc: 'We map what fills your week and identify everything that can be delegated — usually more than you expect.' },
      { title: 'Match & playbook', desc: 'We match a vetted assistant to your needs and document a playbook covering tools, tone and approvals.' },
      { title: 'Daily delivery', desc: 'Your assistant works your hours, reports daily and gets faster every week as they learn your preferences.' },
    ],
    useCases: [
      { title: 'The overloaded executive', desc: 'A COO spends evenings on email and scheduling. A dedicated EA-style assistant gives them hours back every week.', tag: 'Leadership' },
      { title: 'The sales team’s CRM', desc: 'Reps hate data entry, so the CRM is unreliable. An assistant keeps records clean and forecasts trustworthy.', tag: 'Revenue ops' },
      { title: 'The support queue', desc: 'Customer emails wait a day for a response. A trained assistant answers during your hours and escalates the rest.', tag: 'Customer success' },
      { title: 'The operations generalist', desc: 'A growing team needs someone to coordinate projects, vendors and documents across departments.', tag: 'Operations' },
    ],
    faqs: [
      { q: 'What kinds of tasks can a virtual assistant handle?', a: 'Any repeatable work that can be done remotely: email and calendar management, travel booking, CRM updates, data entry, research, document formatting, customer support and project coordination.' },
      { q: 'Will my assistant work during my business hours?', a: 'Yes. Your assistant’s shift is aligned to your working day, so they are online for live requests, meetings and same-day turnaround.' },
      { q: 'How do you keep our accounts secure?', a: 'Assistants work under NDA with the minimum access each task needs, ideally through a password manager, and you can revoke access at any moment.' },
      { q: 'Can we scale from part-time to full-time?', a: 'Yes. You can start part-time, move to a full-time dedicated assistant, or add more assistants to the same pod as your needs grow.' },
      { q: 'What happens if our assistant is unavailable?', a: 'Every client has a documented playbook and a trained backup, so cover during leave or sickness is seamless.' },
    ],
    tools: ['Google Workspace', 'Microsoft 365', 'Slack', 'Asana', 'Notion', 'HubSpot', 'Salesforce', 'Zendesk', 'Trello'],
    cta: 'Ready to get started with *Virtual Assistance?*',
  },

  // ───────────────────────────────────────────────────── Accounting Assistance
  {
    slug: 'accounting-assistance',
    name: 'Accounting Assistance',
    icon: 'ledger',
    accent: 'lavender',
    nav: 'Bookkeeping, AP/AR, payroll & close',
    card: 'Bookkeeping, AP/AR, payroll and month-end support your finance team can rely on. Clean ledgers every month, without adding to headcount.',
    hub: 'Trained accounting assistants who keep your books accurate and your close on schedule. They work directly in your accounting software and follow your chart of accounts and review process. Bookkeeping, payables, receivables, payroll processing and reporting are all covered. Your finance leads keep full control and sign-off, without the late nights.',
    hubBullets: [
      'Bookkeeping & bank reconciliations',
      'Accounts payable & receivable',
      'Payroll processing & expense tracking',
      'Financial reporting & month-end close support',
    ],
    seo: {
      title: 'Outsourced Bookkeeping & Accounting Assistance | Akrostech',
      description:
        'Accounting assistants for bookkeeping, AP/AR, payroll, reporting and month-end close — working in your QuickBooks, Xero or NetSuite, in your hours.',
    },
    hero: {
      eyebrow: 'Service · Accounting Assistance',
      title: 'Close the books, *not* your weekends.',
      sub: 'Skilled accounting assistants who keep your ledgers clean and your month-end calm — working directly in your systems, under your finance team’s review.',
    },
    definition:
      'Accounting assistance is outsourced support for day-to-day finance operations — bookkeeping, payables, receivables, payroll processing, reconciliations and reporting — performed under the review of your finance team or accountant.',
    overview: [
      'Finance teams at growing companies carry a quiet, compounding load. Transactions multiply, invoices pile up, reconciliations slip a week, and month-end turns into a sprint that eats the first days of every month. Hiring locally is slow and expensive, and it still leaves you exposed during busy season.',
      'Akrostech accounting assistants work inside your QuickBooks, Xero, NetSuite or Sage, follow your chart of accounts and hand over work for review on a schedule you set. You get clean, reconciled books and on-time reporting, while your controller or CPA keeps full oversight and final sign-off.',
      'It’s built for CFOs and finance managers who need capacity without headcount, accounting firms facing tax-season peaks, and operators who want reliable numbers to run the business on.',
    ],
    included: [
      { title: 'Bookkeeping', desc: 'Accurate, categorised transactions recorded every week.', icon: 'book' },
      { title: 'Accounts payable', desc: 'Bill capture, approval routing and payment scheduling.', icon: 'wallet' },
      { title: 'Accounts receivable', desc: 'Invoicing, collections follow-up and cash application.', icon: 'receipt' },
      { title: 'Bank reconciliation', desc: 'Bank and card accounts reconciled on a fixed cadence.', icon: 'bank' },
      { title: 'Payroll processing', desc: 'Payroll inputs prepared and checked for your approval.', icon: 'users' },
      { title: 'Financial reporting', desc: 'P&L, balance sheet and cash-flow packs your board can read.', icon: 'pie' },
      { title: 'Invoice management', desc: 'Every invoice issued, tracked and matched to payment.', icon: 'doc' },
      { title: 'Expense tracking', desc: 'Receipts captured, coded and reconciled against policy.', icon: 'checklist' },
      { title: 'Tax preparation support', desc: 'Organised schedules and workpapers ready for your tax adviser.', icon: 'calculator' },
      { title: 'Budget tracking', desc: 'Budget-versus-actual reporting that flags variance early.', icon: 'chart' },
      { title: 'Month-end & year-end close', desc: 'Close checklists, accruals and schedules delivered on time.', icon: 'calendar' },
    ],
    process: [
      { title: 'Review & set up', desc: 'We review your chart of accounts, systems and controls, then agree workflows, cut-offs and review points.' },
      { title: 'Monthly cycle', desc: 'Daily and weekly bookkeeping, AP/AR and reconciliations, all inside your accounting software.' },
      { title: 'Close & report', desc: 'Month-end close support and a reporting pack delivered for your finance lead’s review and sign-off.' },
    ],
    useCases: [
      { title: 'The lean finance team', desc: 'A CFO with two accountants supports a 300-person company. We absorb the transactional work so they can focus on forecasting.', tag: 'Mid-market' },
      { title: 'The accounting firm’s busy season', desc: 'A CPA practice needs extra preparers from January to April without hiring permanently.', tag: 'CPA firm' },
      { title: 'The messy catch-up', desc: 'Months of unreconciled transactions before a funding round or audit. We clean up and keep it clean.', tag: 'Clean-up' },
      { title: 'The multi-entity business', desc: 'Several entities, currencies and bank accounts need consistent, reconciled books every month.', tag: 'Multi-entity' },
    ],
    faqs: [
      { q: 'Do you work in QuickBooks, Xero and NetSuite?', a: 'Yes. Our assistants work directly in QuickBooks, Xero, NetSuite, Sage, MYOB and Zoho Books, plus tools like Dext, Hubdoc and Gusto.' },
      { q: 'Who signs off the accounts?', a: 'Your finance team or licensed accountant does. We prepare and support; final review, sign-off, filings and advisory remain with your qualified professionals.' },
      { q: 'How is our financial data protected?', a: 'Work happens inside your systems under NDA, with role-based access, secure devices and multi-factor authentication. Access is limited to what each task requires.' },
      { q: 'Which accounting standards does your team know?', a: 'Our assistants are trained in US GAAP and IFRS conventions and follow the specific policies and chart of accounts you set.' },
      { q: 'Can you support an accounting firm during tax season?', a: 'Yes. Firms use us to add preparers and bookkeepers for peak months, then scale back once the season ends.' },
    ],
    tools: ['QuickBooks', 'Xero', 'NetSuite', 'Sage', 'MYOB', 'Zoho Books', 'Dext', 'Hubdoc', 'Gusto'],
    note: 'Akrostech provides accounting support services. Final review, sign-off, filings and financial or tax advice remain with your licensed accountant or CPA.',
    cta: 'Ready to get started with *Accounting Assistance?*',
  },

  // ─────────────────────────────────────────────────────────── Legal Assistance
  {
    slug: 'legal-assistance',
    name: 'Legal Assistance',
    icon: 'scales',
    accent: 'lime',
    nav: 'Research, drafting support & compliance',
    card: 'Legal research, drafting support and document review that gives your lawyers leverage. Paralegal-level capacity, working under your attorneys’ supervision.',
    hub: 'Legally trained support professionals who give your in-house counsel or law firm more capacity without lowering the bar. We take on research, first drafts, document review, compliance tracking and matter administration. All of it is delivered confidentially and under the supervision of your licensed attorneys. Your lawyers spend their time on judgment, strategy and clients.',
    hubBullets: [
      'Legal & regulatory research memos',
      'Contract drafting support & review',
      'Compliance monitoring & tracking',
      'Document management & legal correspondence',
    ],
    seo: {
      title: 'Legal Assistance & Paralegal Support | Akrostech',
      description:
        'Paralegal-level support for in-house teams and law firms — legal research, contract drafting support and document review, under attorney supervision.',
    },
    hero: {
      eyebrow: 'Service · Legal Assistance',
      title: 'More capacity. *Same* standards.',
      sub: 'Trained legal professionals who support your attorneys with research, drafting and document review — confidentially, and in your working hours.',
    },
    definition:
      'Legal assistance — also known as legal process outsourcing (LPO) — is delegating legal support work such as research, document review, drafting support and administration to an external team, supervised by licensed attorneys.',
    overview: [
      'Legal teams are expected to move at the speed of the business while carrying an ever-growing volume of contracts, research requests and compliance obligations. The work that consumes the most hours — first drafts, document review, tracking deadlines — is rarely the work that most needs a senior lawyer.',
      'Akrostech provides paralegal-level professionals who work within your matter-management systems, templates and playbooks. They produce research memos, first drafts and review summaries for your attorneys to check and finalise, and they keep compliance calendars and documentation in order. Confidentiality is designed into every engagement from day one.',
      'It’s built for General Counsel running lean in-house teams, law-firm partners who need flexible capacity, and compliance leaders tracking obligations across multiple jurisdictions.',
    ],
    included: [
      { title: 'Legal research', desc: 'Case law and statutory research summarised into clear memos.', icon: 'search' },
      { title: 'Contract drafting & review', desc: 'First drafts and redlines prepared against your playbook.', icon: 'doc' },
      { title: 'NDA & agreement templates', desc: 'Standardised, well-organised templates your team can trust.', icon: 'stamp' },
      { title: 'Compliance monitoring', desc: 'Obligation registers and deadline tracking that never slip.', icon: 'shield' },
      { title: 'Regulatory research', desc: 'Jurisdiction-specific regulatory summaries and change tracking.', icon: 'globe' },
      { title: 'Litigation support', desc: 'Chronologies, bundles, exhibits and document indexing.', icon: 'gavel' },
      { title: 'Corporate governance', desc: 'Board minutes, resolutions and statutory registers kept current.', icon: 'building' },
      { title: 'IP & trademark research', desc: 'Clearance searches, docketing and renewal tracking.', icon: 'trademark' },
      { title: 'Document management', desc: 'Organised, version-controlled matter files and data rooms.', icon: 'folder' },
      { title: 'Legal correspondence', desc: 'Letters and routine correspondence drafted for attorney review.', icon: 'mail' },
    ],
    process: [
      { title: 'Scope & conflicts check', desc: 'We define the work, run a conflicts check and agree supervision, templates and escalation paths with your attorneys.' },
      { title: 'Confidential setup', desc: 'NDAs, restricted access and secure workspaces are in place before any matter information is shared.' },
      { title: 'Supervised delivery', desc: 'Work is delivered for attorney review on agreed turnarounds, with quality feedback built into every cycle.' },
    ],
    useCases: [
      { title: 'The lean in-house team', desc: 'A two-lawyer legal team supports a 1,000-person company. We handle first drafts and NDAs so they can focus on risk.', tag: 'In-house' },
      { title: 'The growing law firm', desc: 'A boutique firm wins a large matter and needs research and document-review capacity immediately.', tag: 'Law firm' },
      { title: 'The compliance programme', desc: 'A regulated business must track obligations across several jurisdictions and prove it to auditors.', tag: 'Compliance' },
      { title: 'The trademark portfolio', desc: 'A consumer brand needs clearance searches and renewal docketing across multiple markets.', tag: 'IP' },
    ],
    faqs: [
      { q: 'Do you provide legal advice?', a: 'No. Akrostech provides legal support services only. All work is performed under the supervision of your licensed attorneys, who remain responsible for legal advice and representation.' },
      { q: 'How do you protect privileged and confidential information?', a: 'Every engagement starts with NDAs and a conflicts check. Work happens in your systems or a restricted workspace, with role-based access and full audit trails.' },
      { q: 'Is your team legally trained?', a: 'Yes. Our legal assistants hold law degrees or paralegal qualifications and are trained on the jurisdictions and practice areas they support.' },
      { q: 'Which jurisdictions can you support?', a: 'We support work relating to the USA, UK, EU, Australia and the UAE, always under the direction of attorneys qualified in the relevant jurisdiction.' },
      { q: 'Who supervises the work?', a: 'Your attorneys do. We agree supervision, review and escalation rules up front, and nothing leaves our team as final without attorney approval.' },
    ],
    tools: ['Clio', 'MyCase', 'PracticePanther', 'Relativity', 'NetDocuments', 'DocuSign', 'Westlaw (client-provided)', 'LexisNexis (client-provided)'],
    note: 'Akrostech provides legal support services under the supervision of your licensed attorneys. We do not provide legal advice or representation.',
    cta: 'Ready to get started with *Legal Assistance?*',
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
