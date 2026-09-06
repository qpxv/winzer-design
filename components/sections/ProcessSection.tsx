'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { PROCESS_SECTION, PROCESS_STEPS } from '@/lib/data'
import type { ProcessStep } from '@/types'

function TimelineStep({ step, isLast }: { step: ProcessStep; isLast: boolean }) {
  return (
    <motion.li variants={fadeUp} className="relative flex gap-5 pb-12 last:pb-0">
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-4 top-10 bottom-0 w-0 border-l border-dashed border-accent/25"
        />
      )}

      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-semibold">
        {step.number}
      </span>

      <div className="pt-1">
        <h3 className="font-serif text-xl md:text-2xl tracking-tight text-text-primary">
          {step.title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.li>
  )
}

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent font-medium text-sm mb-3">{PROCESS_SECTION.label}</p>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary">
            {PROCESS_SECTION.heading}
          </h2>
          <p className="text-text-secondary text-base mt-4 max-w-md">
            {PROCESS_SECTION.subheading}
          </p>
        </motion.div>

        <motion.ol
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          {PROCESS_STEPS.map((step, i) => (
            <TimelineStep
              key={step.number}
              step={step}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
