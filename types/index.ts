export interface Project {
  id: string
  name: string
  tagline: string
  url: string
  image: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
}

export interface PricingTier {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}
