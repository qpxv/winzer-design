'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { PROCESS_SECTION, PROCESS_STEPS } from '@/lib/data'
import type { ProcessStep } from '@/types'

function Step({ step }: { step: ProcessStep }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-4">
      <span className="text-6xl font-bold text-accent-muted leading-none">{step.number}</span>
      <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
      <p className="text-text-secondary text-base">{step.description}</p>
    </motion.div>
  )
}

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent font-medium text-sm mb-3">{PROCESS_SECTION.label}</p>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary">
            {PROCESS_SECTION.heading}
          </h2>
        </motion.div>

        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-border" />

          {PROCESS_STEPS.map((step) => (
            <Step key={step.number} step={step} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
