import type { Project, ProcessStep, Testimonial, PricingTier } from '@/types'

export const NAV = {
  logo: 'Winzer Design',
  links: ['Work', 'Process', 'Pricing'],
  cta: 'Book a call',
}

export const HERO = {
  headline: 'Websites that mean',
  headlineAccent: 'business.',
  subheadline: 'I design and build websites that make people stop, read, and get in touch. Custom code, considered design — no shortcuts.',
  cta: 'Book a free call',
  ctaSecondary: 'See the work',
}

export const WORK_SECTION = {
  label: 'The work',
  heading: 'Every site built from scratch.',
  subheading: 'The design comes from your brand. The code is clean. The result is something that actually reflects what you do.',
}

export const PROJECTS: Project[] = [
  {
    id: 'volta',
    name: 'VOLTA',
    tagline: 'SaaS design studio platform',
    url: 'https://winzer-volta.vercel.app',
    image: '/projects/volta-work.png',
    imageWidth: 1797,
    imageHeight: 946,
  },
  {
    id: 'anil-seth',
    name: 'Anil Seth',
    tagline: 'Neuroscientist & author personal brand',
    url: 'https://winzer-tedx.vercel.app',
    image: '/projects/anil-seth-work.png',
    imageWidth: 1837,
    imageHeight: 881,
  },
  {
    id: 'snipvault',
    name: 'SnipVault',
    tagline: 'Developer tool — code snippet manager',
    url: 'https://winzer-snip-vault.vercel.app',
    image: '/projects/snipvault-work.png',
    imageWidth: 1848,
    imageHeight: 1008,
  },
  {
    id: 'kai-nakamura',
    name: 'Kai Nakamura',
    tagline: 'Photographer & filmmaker portfolio',
    url: 'https://winzer-photography.vercel.app',
    image: '/projects/kai-nakamura-work.png',
    imageWidth: 1802,
    imageHeight: 1054,
  },
  {
    id: 'jot',
    name: 'Jot',
    tagline: 'iOS app landing page',
    url: 'https://winzer-jot.vercel.app',
    image: '/projects/jot-work.png',
    imageWidth: 1759,
    imageHeight: 1035,
  },
  {
    id: 'ironside',
    name: 'IRONSIDE',
    tagline: 'Performance coaching programme',
    url: 'https://winzer-ironside.vercel.app',
    image: '/projects/ironside-work.png',
    imageWidth: 1818,
    imageHeight: 884,
  },
]

export const PROCESS_SECTION = {
  label: 'How it works',
  heading: 'Simple process. No surprises.',
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery call',
    description: "A 30-minute conversation to understand what you actually need. I'll tell you honestly if I think I can help — and how. No sales pitch.",
    detail: "We start with a 30-minute video call — no preparation needed on your end. I'll ask about your goals, your audience, what currently exists, and what hasn't worked before.\n\nBy the end of the call, you'll know exactly what I'd build, roughly what it'll cost, and when it could be done. If I don't think I'm the right fit, I'll tell you.\n\nThere's no obligation, no pitch deck, and no follow-up sequence. Just an honest conversation about whether we're a good match.",
  },
  {
    number: '02',
    title: 'Design & build',
    description: "I take care of everything — design, code, copy direction. You'll see it taking shape as we go, not one big reveal at the end.",
    detail: "Once we've agreed on scope and I have your deposit, I get to work. I handle the whole thing — visual design, layout, code, and copy direction. If you have a brand, I'll work from it. If you don't, I'll establish one that fits.\n\nYou'll see the work in progress through shared previews, not a zip file at the end. Most projects need one or two rounds of feedback, not ten.\n\nI won't disappear for three weeks. You'll know where things are.",
  },
  {
    number: '03',
    title: 'Launch & handoff',
    description: "We go live. You get the code, the accounts, and a proper walkthrough — not a zip file and a goodbye.",
    detail: "When you're happy with the result, we go live. I handle the domain connection, hosting setup, and final checks before anything goes public.\n\nAfter launch, you get the source code in a GitHub repo, access to every account and service used, and a walkthrough call so you actually understand what you own.\n\nI'm available for questions after handoff. Not indefinitely — but I won't ghost you the moment the final invoice clears.",
  },
]

export const TESTIMONIALS_SECTION = {
  label: 'Kind words',
  heading: 'What clients say.',
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: 'Add your real testimonial here.',
    name: 'Client Name',
    role: 'Role, Company',
  },
  {
    id: 2,
    quote: 'Add your real testimonial here.',
    name: 'Client Name',
    role: 'Role, Company',
  },
  {
    id: 3,
    quote: 'Add your real testimonial here.',
    name: 'Client Name',
    role: 'Role, Company',
  },
]

export const PRICING_SECTION = {
  label: 'Pricing',
  heading: 'Fixed pricing. No hourly rates.',
  subheading: "You'll know the cost before anything starts. No scope creep, no awkward conversations at the end.",
  note: "Not sure which fits? We can work that out on a call.",
  cta: 'Book a call',
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    price: '500',
    description: 'One focused page that does one thing well. Good for launches, personal brands, or anyone who needs a clean, credible presence without the complexity.',
    features: [
      'Custom design & code',
      'Mobile responsive',
      'Contact form or CTA integration',
      'Basic SEO setup',
      'Delivered in 1–2 weeks',
    ],
  },
  {
    id: 'full',
    name: 'Full Website',
    price: '1,000',
    description: "A proper site with room to tell your story. Usually home, about, and contact — though we'll work out what actually makes sense for you.",
    features: [
      'Everything in Landing Page',
      'Up to 3 pages',
      'CMS integration if needed',
      'Performance optimised',
      'Delivered in 2–4 weeks',
    ],
    highlighted: true,
  },
]

export const CONTACT_SECTION = {
  label: 'Start a project',
  heading: 'Your site starts with a conversation.',
  subheading: "Book a slot. We'll talk through what you need, what's realistic, and whether it's a good fit. Half an hour, no commitment.",
  calendlyUrl: 'https://calendly.com/benwinzer',
}

export const FOOTER = {
  logo: 'Winzer Design',
  email: 'ben@winzerdesign.com',
  note: 'Built by me, obviously.',
  copyright: '2025 Winzer Design',
}
