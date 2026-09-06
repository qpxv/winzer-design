'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { fadeUp } from '@/lib/animations'
import { FAQ_SECTION, FAQS } from '@/lib/data'

export default function FaqSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-bg">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent font-medium text-sm mb-3">{FAQ_SECTION.label}</p>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary">
            {FAQ_SECTION.heading}
          </h2>
        </motion.div>

        <div className="border-t border-border">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group border-b border-border py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-text-primary">{faq.question}</span>
                <ChevronDown className="size-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
