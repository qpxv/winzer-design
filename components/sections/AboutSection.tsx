'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { ABOUT_SECTION } from '@/lib/data'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-surface">
      <motion.div
        className="max-w-3xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.p variants={fadeUp} className="text-accent font-medium text-sm mb-3">
          {ABOUT_SECTION.label}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-8"
        >
          {ABOUT_SECTION.heading}
        </motion.h2>

        <div className="space-y-5">
          {ABOUT_SECTION.paragraphs.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={fadeUp}
              className="text-text-secondary text-base leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-serif italic text-lg text-text-primary"
        >
          {ABOUT_SECTION.signoff}
        </motion.p>
      </motion.div>
    </section>
  )
}
