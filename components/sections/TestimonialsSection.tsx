'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { TESTIMONIALS_SECTION, TESTIMONIALS } from '@/lib/data'
import type { Testimonial } from '@/types'

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-bg border border-border rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex gap-1 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <Sparkles key={i} size={14} />
        ))}
      </div>
      <p className="text-text-primary text-base flex-1">&ldquo;{testimonial.quote}&rdquo;</p>
      <div>
        <p className="font-semibold text-text-primary">{testimonial.name}</p>
        <p className="text-sm text-text-secondary">{testimonial.role}</p>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
