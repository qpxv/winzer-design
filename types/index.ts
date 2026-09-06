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

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
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
