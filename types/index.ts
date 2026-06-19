export interface Project {
  id: string
  name: string
  tagline: string
  url: string
  image: string
  imageWidth: number
  imageHeight: number
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  detail: string
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
