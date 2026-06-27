'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { CONTACT_SECTION } from '@/lib/data'
import SpotlightButton from '@/components/ui/SpotlightButton'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-40 bg-text-primary">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent-muted text-sm font-medium mb-8">
            {CONTACT_SECTION.label}
          </p>
          <h2 className="font-serif text-5xl md:text-6xl tracking-tight text-white leading-[1.1] max-w-2xl">
            {CONTACT_SECTION.heading}{' '}
            <span className="italic text-accent-light">
              {CONTACT_SECTION.headingAccent}
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8"
        >
          <p className="text-white/50 text-base leading-relaxed max-w-sm">
            {CONTACT_SECTION.subheading}
          </p>
          <SpotlightButton
            onClick={() => window.dispatchEvent(new CustomEvent('open-calendly'))}
          >
            {CONTACT_SECTION.cta}
          </SpotlightButton>
        </motion.div>

      </div>
    </section>
  )
}
