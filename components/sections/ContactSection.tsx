'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { CONTACT_SECTION } from '@/lib/data'
import SpotlightButton from '@/components/ui/SpotlightButton'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-text-primary">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent-muted text-sm font-medium mb-4">{CONTACT_SECTION.label}</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {CONTACT_SECTION.heading}
          </h2>
          <p className="text-white/60 text-base max-w-md mx-auto mb-10">
            {CONTACT_SECTION.subheading}
          </p>
          <SpotlightButton onClick={() => window.dispatchEvent(new CustomEvent('open-calendly'))}>
            {CONTACT_SECTION.cta}
          </SpotlightButton>
        </motion.div>
      </div>
    </section>
  )
}
