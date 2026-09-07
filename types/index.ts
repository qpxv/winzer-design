export interface Project {
  id: string
  name: string
  tagline: string
  url: string
  domain: string
  image: string
  imageWidth: number
  imageHeight: number
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface TestimonialScreenshot {
  id: number
  // null while it's a placeholder; set to a path in /public once the real
  // Telegram screenshot is dropped in
  src: string | null
  alt: string
  width: number
  height: number
}

export interface PricingTier {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export type ComparisonIcon =
  | 'Palette'
  | 'Code2'
  | 'Gauge'
  | 'TrendingUp'
  | 'PenLine'
  | 'Server'
  | 'UserRound'
  | 'Rocket'
  | 'Tag'
  | 'Wrench'

export interface ComparisonRow {
  icon: ComparisonIcon
  feature: string
  them: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface CaseStudyStat {
  value: string
  label: string
}

export interface CaseStudy {
  id: string
  heading: string
  client: {
    name: string
    role: string
  }
  challenge: string[]
  before?: { src: string; alt: string }
  after: { src: string; alt: string }
  stats: CaseStudyStat[]
  outcome: string
  quote: string
}
