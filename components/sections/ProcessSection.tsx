'use client'

import { useState, useEffect, useCallback, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { PROCESS_SECTION, PROCESS_STEPS } from '@/lib/data'
import type { ProcessStep } from '@/types'

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

function CurveArrow({ flipped = false }: { flipped?: boolean }) {
  const path = flipped ? 'M0,16 C20,26 60,6 80,16' : 'M0,16 C20,6 60,26 80,16'
  return (
    <div className="hidden md:flex items-center justify-center w-20 shrink-0">
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
        <motion.path
          d={path}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-accent/30"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        />
      </svg>
    </div>
  )
}

function ProcessStepModal({
  step,
  onClose,
}: {
  step: ProcessStep | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!step) return
    document.body.style.overflow = 'hidden'
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [step, onClose])

  return (
    <AnimatePresence>
      {step && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="w-full max-w-lg bg-bg rounded-2xl overflow-hidden pointer-events-auto"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <div className="flex items-center justify-between px-6 h-14 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-accent text-white text-xs font-semibold flex items-center justify-center shrink-0">
                    {step.number}
                  </span>
                  <span className="font-semibold text-text-primary">{step.title}</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative overflow-hidden p-8">
                <span
                  className="absolute top-0 right-2 font-serif leading-none select-none pointer-events-none text-accent/[0.05]"
                  style={{ fontSize: 'clamp(72px, 10vw, 108px)' }}
                >
                  {step.number}
                </span>
                <p className="relative text-base text-text-primary font-medium leading-relaxed">
                  {step.description}
                </p>
                <hr className="my-6 border-border" />
                <p className="relative text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

function StepCard({
  step,
  onOpen,
}: {
  step: ProcessStep
  onOpen: (s: ProcessStep) => void
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex-1 bg-bg rounded-2xl border border-border p-8 cursor-pointer overflow-hidden hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)] transition-all duration-300"
      onClick={() => onOpen(step)}
    >
      <span
        className="absolute top-0 left-0 font-serif leading-none select-none pointer-events-none text-accent/[0.08]"
        style={{ fontSize: 'clamp(96px, 9vw, 144px)' }}
      >
        {step.number}
      </span>
      <div className="relative pt-20">
        <h3 className="font-serif text-2xl tracking-tight text-text-primary">{step.title}</h3>
        <p className="mt-3 text-text-secondary text-sm leading-relaxed">{step.description}</p>
        <div className="mt-6 flex items-center gap-1 text-xs text-accent/50 group-hover:text-accent transition-colors duration-200">
          <span>Read more</span>
          <ChevronRight size={12} />
        </div>
      </div>
    </motion.div>
  )
}

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<ProcessStep | null>(null)
  const handleClose = useCallback(() => setActiveStep(null), [])

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
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          {PROCESS_STEPS.map((step, i) => (
            <Fragment key={step.number}>
              <StepCard step={step} onOpen={setActiveStep} />
              {i < PROCESS_STEPS.length - 1 && <CurveArrow flipped={i === 1} />}
            </Fragment>
          ))}
        </motion.div>
      </div>

      <ProcessStepModal step={activeStep} onClose={handleClose} />
    </section>
  )
}
