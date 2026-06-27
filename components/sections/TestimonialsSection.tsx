'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { TESTIMONIALS_SECTION, TESTIMONIALS } from '@/lib/data'
import type { Testimonial } from '@/types'

function TestimonialColumn({ testimonial }: { testimonial: Testimonial }) {
  const firstParagraph = testimonial.quote.trim().split('\n\n')[0]

  return (
    <motion.div
      variants={fadeUp}
      className="px-8 py-2 first:pl-0 last:pr-0 flex flex-col gap-4"
    >
      <p className="text-text-secondary text-base leading-relaxed flex-1">
        <span className="text-accent">&ldquo;</span>
        {firstParagraph}<span className="text-accent">&rdquo;</span>
      </p>
      <div>
        <p className="font-serif italic text-accent text-sm leading-snug">{testimonial.name}</p>
        <p className="text-text-muted text-xs mt-0.5">{testimonial.role}</p>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent font-medium text-sm mb-3">{TESTIMONIALS_SECTION.label}</p>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary">
            {TESTIMONIALS_SECTION.heading}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 divide-y divide-border md:divide-y-0 md:divide-x md:divide-border"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialColumn key={t.id} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
