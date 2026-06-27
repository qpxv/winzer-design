'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { TESTIMONIALS_SECTION, TESTIMONIALS } from '@/lib/data'
import type { Testimonial } from '@/types'

function TestimonialRow({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      variants={fadeUp}
      className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-6 md:gap-12 border-t border-border py-10 md:py-12"
    >
      <p className="text-text-primary text-base md:text-lg leading-relaxed whitespace-pre-line">
        <span className="text-accent">&ldquo;</span>
        {testimonial.quote.trim()}&rdquo;
      </p>
      <div className="md:text-right md:pt-1">
        <p className="font-serif italic text-accent text-sm leading-snug">{testimonial.name}</p>
        <p className="text-text-muted text-sm mt-1">{testimonial.role}</p>
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
          className="border-b border-border"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialRow key={t.id} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
