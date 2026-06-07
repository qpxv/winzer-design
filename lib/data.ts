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
    url: 'https://volta.design',
    image: '/projects/volta.png',
  },
  {
    id: 'anil-seth',
    name: 'Anil Seth',
    tagline: 'Neuroscientist & author personal brand',
    url: 'https://anilseth.com',
    image: '/projects/anil-seth.png',
  },
  {
    id: 'snipvault',
    name: 'SnipVault',
    tagline: 'Developer tool — code snippet manager',
    url: 'https://snipvault.dev',
    image: '/projects/snipvault.png',
  },
  {
    id: 'kai-nakamura',
    name: 'Kai Nakamura',
    tagline: 'Photographer & filmmaker portfolio',
    url: 'https://kainakamura.com',
    image: '/projects/kai-nakamura.png',
  },
  {
    id: 'jot',
    name: 'Jot',
    tagline: 'iOS app landing page',
    url: 'https://jot.app',
    image: '/projects/jot.png',
  },
  {
    id: 'ironside',
    name: 'IRONSIDE',
    tagline: 'Performance coaching programme',
    url: 'https://ironside.co',
    image: '/projects/ironside.png',
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
  },
  {
    number: '02',
    title: 'Design & build',
    description: "I take care of everything — design, code, copy direction. You'll see it taking shape as we go, not one big reveal at the end.",
  },
  {
    number: '03',
    title: 'Launch & handoff',
    description: "We go live. You get the code, the accounts, and a proper walkthrough — not a zip file and a goodbye.",
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
