import type { Project, ProcessStep, Testimonial, PricingTier } from '@/types'

export const NAV = {
  logo: 'Winzer Design',
  links: ['Work', 'Process', 'Pricing'],
  cta: 'Book a call',
}

export const HERO = {
  headline: 'Websites that mean',
  headlineAccent: 'business.',
  subheadline: 'Custom-designed, custom-coded websites for brands that take their online presence seriously.',
  cta: 'Book a free call',
  ctaSecondary: 'See the work',
}

export const WORK_SECTION = {
  label: 'The work',
  heading: 'Every site built from scratch.',
  subheading: 'No templates. No page builders. Just clean code and considered design.',
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
    description: 'We talk for 30 minutes. You tell me what you need, I tell you if I can make it better than you imagined. No commitment required.',
  },
  {
    number: '02',
    title: 'Design & build',
    description: 'I handle everything — design, code, and copy guidance. You get regular updates, not endless revision rounds.',
  },
  {
    number: '03',
    title: 'Launch & handoff',
    description: 'Your site goes live. You get the keys. No confusing contracts, no surprise invoices — just a site that works.',
  },
]

export const TESTIMONIALS_SECTION = {
  label: 'Kind words',
  heading: "Don't take my word for it.",
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
  heading: 'Straightforward pricing.',
  subheading: "No vague quotes. No surprise add-ons. You'll know what you're getting before we start.",
  note: "Not sure which fits? Let's figure it out on a call.",
  cta: 'Book a call',
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    price: '500',
    description: 'One page, built to convert. Perfect for launches, personal brands, or a single focused goal.',
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
    description: "Up to 3 pages, custom designed and coded. Everything you need, nothing you don't.",
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
  label: "Let's work together",
  heading: "Let's build something.",
  subheading: "Pick a time that works for you. We'll talk through your project — no pitch, no pressure.",
  calendlyUrl: 'https://calendly.com/benwinzer',
}

export const FOOTER = {
  logo: 'Winzer Design',
  email: 'ben@winzerdesign.com',
  note: 'Built by me, obviously.',
  copyright: '2025 Winzer Design',
}
