'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { ABOUT_SECTION } from '@/lib/data'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-bg">
      <motion.div
        className="max-w-4xl mx-auto px-6 grid gap-10 md:grid-cols-[260px_1fr] md:gap-14 md:items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp}
          className="relative aspect-4/5 w-48 overflow-hidden rounded-2xl border border-border md:w-full"
        >
          <Image
            src={ABOUT_SECTION.photo.src}
            alt={ABOUT_SECTION.photo.alt}
            fill
            sizes="(min-width: 768px) 260px, 192px"
            className="object-cover"
          />
        </motion.div>

        <div>
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
        </div>
      </motion.div>
    </section>
  )
}
