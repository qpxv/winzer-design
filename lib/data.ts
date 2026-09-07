import type {
  Project,
  ProcessStep,
  TestimonialScreenshot,
  PricingTier,
  ComparisonRow,
  FaqItem,
  CaseStudy,
} from '@/types'

// Risk-reversal line, shown once in the hero.
export const GUARANTEE = "Book a call and we'll build you a real first draft, on us. No commitment."

export const NAV = {
  logo: 'Winzer Design',
  links: [
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Case studies', href: '#case-study' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: 'Book a call',
}

export const HERO = {
  headline: 'Websites that',
  headlineAccent: 'get results',
  subheadline: 'Custom-designed, custom-coded sites built to convert. Not templates, not page builders, not shortcuts. Live in days, not months.',
  cta: 'Book a free call',
  ctaSecondary: 'See the work',
  guarantee: GUARANTEE,
}

export const WORK_SECTION = {
  label: 'The work',
  heading: 'Built from scratch, every time',
  subheading: 'No templates, no drag-and-drop builders. Just clean code and design that actually looks like your brand, not someone else\'s theme.',
}

// `url` is the live deployment used for the in-app preview iframe. `domain` is the
// display-only host shown in the browser-chrome pill (what the site's real domain
// would look like).
export const PROJECTS: Project[] = [
  {
    id: 'volta',
    name: 'VOLTA',
    tagline: 'SaaS design studio platform',
    url: 'https://winzer-volta.vercel.app',
    domain: 'volta.design',
    image: '/projects/volta-work.png',
    imageWidth: 1797,
    imageHeight: 946,
  },
  {
    id: 'synmedia',
    name: 'SynMedia',
    tagline: 'Done-for-you YouTube growth agency',
    url: 'https://synmedia-preview.vercel.app',
    domain: 'synmedia.agency',
    image: '/projects/synmedia-work.png',
    imageWidth: 1800,
    imageHeight: 780,
  },
  {
    id: 'jot',
    name: 'Jot',
    tagline: 'iOS app landing page',
    url: 'https://winzer-jot.vercel.app',
    domain: 'getjot.app',
    image: '/projects/jot-work.png',
    imageWidth: 1759,
    imageHeight: 1035,
  },
  {
    id: 'anil-seth',
    name: 'Anil Seth',
    tagline: 'Neuroscientist and author personal brand',
    url: 'https://winzer-tedx.vercel.app',
    domain: 'anilseth.com',
    image: '/projects/anil-seth-work.png',
    imageWidth: 1837,
    imageHeight: 881,
  },
  {
    id: 'snipvault',
    name: 'SnipVault',
    tagline: 'Code snippet manager for developers',
    url: 'https://winzer-snip-vault.vercel.app',
    domain: 'snipvault.dev',
    image: '/projects/snipvault-work.png',
    imageWidth: 1848,
    imageHeight: 1008,
  },
  {
    id: 'kai-nakamura',
    name: 'Kai Nakamura',
    tagline: 'Photographer and filmmaker portfolio',
    url: 'https://winzer-photography.vercel.app',
    domain: 'kainakamura.com',
    image: '/projects/kai-nakamura-work.png',
    imageWidth: 1802,
    imageHeight: 1054,
  },
  {
    id: 'ironside',
    name: 'IRONSIDE',
    tagline: 'Performance coaching programme',
    url: 'https://winzer-ironside.vercel.app',
    domain: 'ironside.coach',
    image: '/projects/ironside-work.png',
    imageWidth: 1818,
    imageHeight: 884,
  },
]

export const PROCESS_SECTION = {
  label: 'How it works',
  heading: 'Three steps, no surprises',
  subheading:
    'From first call to live site, you always know what happens next, what it costs, and where things stand.',
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '1',
    title: 'Discovery call',
    description: "A 30-minute call to figure out what you actually need. We'll tell you straight if we can help, and how. No pitch.",
  },
  {
    number: '2',
    title: 'Design & build',
    description: "We handle the design, the code, and the copy direction, all of it. You watch it take shape as we go, not wait for one big reveal.",
  },
  {
    number: '3',
    title: 'Launch & aftercare',
    description: "We go live. We connect your domain, set up hosting, and run the final checks. From there it stays looked after: updates, fixes, and small changes whenever you need them.",
  },
]

export const ABOUT_SECTION = {
  label: 'About me',
  heading: 'It started on my dad\'s computer',
  paragraphs: [
    "I'm Ben. My dad sat me down at his computer when I was nine and showed me how a web page was made. I changed a line, the page changed with it, and that was pretty much what got me hooked.",
    "I kept building websites through school, small things for myself at first, then websites for people who asked. Now it's what I do full time. Design and build websites and landing pages for ecommerce brands, personal brands, and small businesses.",
    "After launch the site stays looked after: hosting, updates, and changes as the business grows.",
  ],
  signoff: 'Ben Winzer',
  // Placeholder: back-view beach shot. Swap public/about/ben.jpg for a
  // front-facing portrait when available (portrait orientation, ~800x1000).
  photo: {
    src: '/about/ben.jpg',
    alt: 'Ben Winzer',
    width: 800,
    height: 1000,
  },
}

export const TESTIMONIALS_SECTION = {
  label: 'Testimonials',
  heading: 'Clients say it best',
  subheading:
    'Real messages, unedited, from people we\'ve built for.',
}

// Real chat screenshots for the scrolling testimonial wall. Deliberately not in
// filename order so the three marquee columns read as a varied mix.
export const TESTIMONIAL_SCREENSHOTS: TestimonialScreenshot[] = [
  { id: 7, src: '/testimonials/ss7.png', alt: "Client message: \"bro thats awesome man, you're a professional\"", width: 390, height: 215 },
  { id: 2, src: '/testimonials/ss2.png', alt: 'Client message from Tyler Van Acker about delivery speed and last-minute edits', width: 526, height: 224 },
  { id: 11, src: '/testimonials/ss11.png', alt: 'Client message: "DUDE YOU ARE SO GOOD AT WEBSITES"', width: 343, height: 96 },
  { id: 4, src: '/testimonials/ss4.png', alt: 'Client message: "you\'ve been a star player man, I couldn\'t have asked for anything more"', width: 299, height: 255 },
  { id: 9, src: '/testimonials/ss9.png', alt: 'Client message from Daniel W. about reply speed and turnaround', width: 519, height: 131 },
  { id: 1, src: '/testimonials/ss1.png', alt: 'Client message from Darrell Kawooya about speed and work ethic', width: 478, height: 138 },
  { id: 6, src: '/testimonials/ss6.png', alt: 'Client message from Ben Winzer thread: "This is sensational work!"', width: 239, height: 147 },
  { id: 10, src: '/testimonials/ss10.png', alt: 'Client message: "WOWOWWOW, It looks so professional! It\'s like an Apple Website"', width: 341, height: 202 },
  { id: 3, src: '/testimonials/ss3.png', alt: 'Client message: "this website is beautiful on mobile"', width: 271, height: 192 },
  { id: 8, src: '/testimonials/ss8.png', alt: 'Client message: "damn looks clean man"', width: 347, height: 216 },
  { id: 5, src: '/testimonials/ss5.png', alt: 'Client message: "this is fucking nice, im calling you maestro from now"', width: 294, height: 295 },
]

export const PRICING_SECTION = {
  label: 'Pricing',
  heading: 'Fixed pricing, no hourly rates',
  subheading: "Know the cost before anything starts. No scope creep, no awkward conversations at the end.",
  note: "Not sure which fits? We can work that out on a call.",
  cta: 'Book a call',
  recommendedLabel: 'Recommended',
  retainer: {
    prefix: 'From',
    price: '150',
    cadence: '/mo',
    label: 'Maintenance',
    description:
      'A separate monthly plan on top of the build price. Covers hosting, domain management, updates, and small changes whenever you need them.',
  },
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    price: '500',
    description: 'One page, done right. Built for launches, personal brands, or anyone who needs a clean, credible presence, delivered fast.',
    features: [
      'Custom design & code',
      'Mobile responsive',
      'Contact form or CTA integration',
      'Basic SEO setup',
      'Delivered within 7 days',
    ],
  },
  {
    id: 'full',
    name: 'Full Website',
    price: '1,000',
    description: "A full site with room to tell your story properly. Home, about, and contact, or whatever actually makes sense for your business.",
    features: [
      'Everything in Landing Page',
      'Unlimited pages',
      'CMS integration if needed',
      'Performance optimised',
      'Delivered within 14 days',
    ],
    highlighted: true,
  },
]

export const COMPARISON_SECTION = {
  label: 'Direct vs. agency',
  heading: 'Everything an agency does, minus the overhead',
  subheading:
    'An agency can build you a good site too. Line by line, here is what working with us directly gets you that they can\'t.',
  columnUs: 'Winzer Design',
  columnThem: 'Agencies',
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { icon: 'Palette', feature: 'Designed around your brand', them: 'A strong look, shaped by the agency\'s portfolio' },
  { icon: 'Code2', feature: 'Hand-coded, nothing bloated', them: 'Often a heavy CMS build you do not control' },
  { icon: 'Gauge', feature: 'Tuned for speed and search', them: 'Bolted on after sign-off, if the budget is left' },
  { icon: 'TrendingUp', feature: 'Laid out to convert, not decorate', them: 'Beautiful decks, results left to you' },
  { icon: 'PenLine', feature: 'Copy direction handled with you', them: 'Quoted as a separate workstream' },
  { icon: 'Server', feature: 'Hosting and domain set up and managed for you', them: 'A hosting retainer on top, or handed back to you' },
  { icon: 'UserRound', feature: 'A direct line to the people who built your site', them: 'Sold by a lead, built by whoever is free' },
  { icon: 'Rocket', feature: 'A draft in days, live shortly after', them: 'A discovery phase, then weeks of rounds' },
  { icon: 'Tag', feature: 'One build price, then a flat monthly that covers everything', them: 'A big upfront quote, then billable hours' },
  { icon: 'Wrench', feature: 'Small changes and fixes handled whenever you need them', them: 'Every change is a new statement of work' },
]

export const CONTACT_SECTION = {
  label: 'Start a project',
  heading: 'Your site starts with a',
  headingAccent: 'conversation',
  subheading: "Book a slot. We'll talk through what you need, what's realistic, and whether it's a fit. Thirty minutes, no pressure.",
  cta: 'Book a free call',
  calendlyUrl: 'https://calendly.com/benwinzer/website-call?hide_gdpr_banner=1',
}

export const FAQ_SECTION = {
  label: 'FAQ',
  heading: 'Questions people ask',
}

export const CASE_STUDY_SECTION = {
  label: 'Case studies',
  cta: 'Book a free call',
}

// Screenshots live in public/case-study/.
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tyler-van-acker',
    heading: 'Nine days to launch, no sales page, $2.2K in the first weekend',
    client: {
      name: 'Tyler Van Acker',
      role: 'Physical coach',
    },
    challenge: [
      "Tyler came to us nine days out from launching a new coaching offer, still selling it off a carrd page. It looked amateur, buried the offer, and only ever closed people who already knew him. Every cold visitor left without buying.",
      "He needed a real sales page: one that could earn a stranger's trust and close them, finished and live before launch day. The date could not move.",
    ],
    before: {
      src: '/case-study/tyler-before.jpg',
      alt: "Tyler's original carrd page",
    },
    after: {
      src: '/case-study/tyler-after.png',
      alt: "Tyler's new custom sales page",
    },
    stats: [
      { value: '$2.2K', label: 'first launch weekend' },
      { value: '9 days', label: 'start to launch' },
    ],
    outcome:
      "We designed, wrote, and built the full page in nine days, absorbing round after round of last-minute changes without moving the deadline. It went live before the launch. In the first three days it brought in $2,200, including buyers the old page would never have closed, and paid for itself several times over inside the first week. It is still Tyler's sales page today, doing the same job every time he sends traffic to it.",
    quote:
      "Before we started working together I was using a carrd website that looked unprofessional. After working with you I now have a sales page that has already converted but will also continue to be a valuable asset in my business.",
  },
  {
    id: 'refined-berlin',
    heading: "Tripled a Berlin fashion store's monthly sales in six weeks",
    client: {
      name: 'Refined Berlin',
      role: 'Fashion ecommerce',
    },
    challenge: [
      "Refined Berlin had the products and the brand, but the store barely converted. People landed, looked around, and left without buying.",
      "The site was not built to sell. Navigation was unclear, the path to checkout was cluttered, and nothing guided a shopper from landing on a page to placing an order.",
    ],
    after: {
      src: '/case-study/refined-berlin-after.png',
      alt: 'A Refined Berlin product page after the rebuild',
    },
    stats: [
      { value: '25x', label: 'conversion rate' },
      { value: '3x', label: 'monthly sales' },
      { value: '2 weeks', label: 'strategy to launch' },
    ],
    outcome:
      "We rebuilt the store around one goal: making the buying decision easy. Every page, every step to checkout, and every line of copy was restructured around how their customers actually shop. Strategy to launch took two weeks. The conversion rate went from barely registering to over 1%, a 25x jump. A stock gap around Chinese New Year held the revenue increase to 3x over the first six weeks, and the trend kept climbing after that.",
    quote:
      "Hey Ben, needed to reach out personally. Your speed and initiative are next level. Your work ethic is seriously impressive, you're crushing it way beyond your years, and I'm genuinely excited to see where we can take this together.",
  },
]

export const FAQS: FaqItem[] = [
  {
    question: 'What does the monthly fee cover?',
    answer:
      "Hosting, your domain setup and renewal, security and framework updates, uptime monitoring, and small content or design changes whenever you need them.",
  },
  {
    question: 'Do I own the website?',
    answer:
      "Your domain, content, copy, and brand are yours. The site runs on our hosting so we can keep it fast, monitored, and up to date as part of the monthly. If you ever want to move hosting in-house, we'll hand everything over and help you migrate it across.",
  },
  {
    question: 'What happens if I want to stop working together?',
    answer:
      "It's month to month. Give 30 days notice and we'll hand your domain back and point it wherever you like. At the end of that month the site comes off our hosting, and hosting it from there is up to you.",
  },
  {
    question: "What if I don't take the monthly plan?",
    answer:
      "The site stays live for a few days after launch so you can move your domain to it, then it comes off our hosting. From there, hosting, domain management, security updates, and keeping it online are yours to handle. It's a proper Next.js build, not a static HTML page, so it needs a host that supports that and someone comfortable with the framework.",
  },
  {
    question: 'How soon will my website be live?',
    answer:
      "You'll see a real first draft within a few days of our call. Most sites go live one to two weeks after that.",
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      "Half an hour on a call, your logo and brand assets if you have them, and any copy you've already written. We handle the rest, including copy direction if you need it.",
  },
  {
    question: "What if the design isn't what I pictured?",
    answer:
      "We keep refining it until it matches what you had in mind. You booked a call because you want this done right, so revisions are part of the process, not an extra.",
  },
  {
    question: 'Do you build online stores or web apps?',
    answer:
      "Yes. Alongside marketing sites we've built online stores for ecommerce brands and web apps backed by databases, with security handled properly. If that's what you need, bring it to the call.",
  },
  {
    question: 'Can you redo my existing site instead of starting fresh?',
    answer:
      "Yes. Depending on how your current site was built it can get complicated to untangle, especially with page builders. Starting fresh usually lets us use custom code and get you a cleaner, faster result, so we'll weigh it up on the call.",
  },
]

export const FOOTER = {
  email: 'ben@winzerdesign.com',
  x: { label: '@b_winzer', url: 'https://x.com/b_winzer' },
}
