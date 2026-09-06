import type {
  Project,
  ProcessStep,
  Testimonial,
  TestimonialScreenshot,
  PricingTier,
} from '@/types'

export const NAV = {
  logo: 'Winzer Design',
  links: ['Work', 'Process', 'Pricing'],
  cta: 'Book a call',
}

export const HERO = {
  headline: 'Websites that',
  headlineAccent: 'get results',
  subheadline: 'Custom-designed, custom-coded sites built to convert. Not templates, not page builders, not shortcuts. Live in days, not months.',
  cta: 'Book a free call',
  ctaSecondary: 'See the work',
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
    description: "A 30-minute call to figure out what you actually need. I'll tell you straight if I can help, and how. No pitch.",
  },
  {
    number: '2',
    title: 'Design & build',
    description: "I handle the design, the code, and the copy direction, all of it. You watch it take shape as we go, not wait for one big reveal.",
  },
  {
    number: '3',
    title: 'Launch & handoff',
    description: "We go live. You get the code, the accounts, and a real walkthrough, not a zip file and radio silence.",
  },
]

export const TESTIMONIALS_SECTION = {
  label: 'Testimonials',
  heading: 'Clients say it best',
  subheading:
    'Real messages, unedited, from people I\'ve built for.',
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

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Hey Ben - needed to reach out personally. Your speed and initiative are next level. Had to tweak some copy for Meta's guidelines, but your work ethic is seriously impressive. You're crushing it way beyond your years and I'm genuinely excited to see where we can take this together ⚡️",
    name: 'Darrell Kawooya',
    role: 'E-Commerce Store',
  },
  {
    id: 2,
    quote: "The thing I like the most about your service was that you were able to deliever on a short time schedule. I needed multiple last minute edits that were handled not only fast but with the quality of the webiste.\n\nBefore we started working together I was using a carrd website that looked unprofessional and only able to convert people that I had built up a lot of trust with. After working with you I now have a sales page that has already converted but will also continue to a valuable asset in my business.\n\nI would recommend you to anyone who wants to make money online with a professional looking webiste.",
    name: 'Tyler Van Acker',
    role: 'Physical Coach',
  },
  {
    id: 3,
    quote: "I liked the speed in which you replied and how fast you completed the project. I was taking forever when I tried it and I was amazed at how little time it took for you to do it.\n\nI would, absolutely recommend you to anyone else. Finding someone that’s easy to work with like you and is very willing and creative to help someone solve their problem is rare. If I know someone who needs your services, I would definitely recommend you.\n\n",
    name: 'Daniel Wedel',
    role: 'Copywriter',
  },
]

export const PRICING_SECTION = {
  label: 'Pricing',
  heading: 'Fixed pricing, no hourly rates',
  subheading: "Know the cost before anything starts. No scope creep, no awkward conversations at the end.",
  note: "Not sure which fits? We can work that out on a call.",
  cta: 'Book a call',
  recommendedLabel: 'Recommended',
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

export const CONTACT_SECTION = {
  label: 'Start a project',
  heading: 'Your site starts with a',
  headingAccent: 'conversation',
  subheading: "Book a slot. We'll talk through what you need, what's realistic, and whether it's a fit. Thirty minutes, no pressure.",
  cta: 'Book a free call',
  calendlyUrl: 'https://calendly.com/benwinzer/website-call?hide_gdpr_banner=1',
}

export const FOOTER = {
  logo: 'Winzer Design',
  email: 'ben@winzerdesign.com',
  note: 'Built by me, obviously.',
}
