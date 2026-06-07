'use client'

import { motion } from 'framer-motion'
import Script from 'next/script'
import { fadeUp } from '@/lib/animations'
import { CONTACT_SECTION } from '@/lib/data'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-text-primary">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent-muted text-sm font-medium mb-4">{CONTACT_SECTION.label}</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {CONTACT_SECTION.heading}
          </h2>
          <p className="text-white/60 text-base max-w-md mx-auto">{CONTACT_SECTION.subheading}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div
            className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
            data-url={CONTACT_SECTION.calendlyUrl}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </motion.div>
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  )
}
