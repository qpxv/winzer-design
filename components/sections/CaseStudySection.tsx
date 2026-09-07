'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { CASE_STUDY_SECTION, CASE_STUDIES } from '@/lib/data'
import type { CaseStudy } from '@/types'
import SpotlightButton from '@/components/ui/SpotlightButton'

const openCalendly = (): void => {
  window.dispatchEvent(new CustomEvent('open-calendly'))
}

function Shot({
  src,
  alt,
  caption,
  wide = false,
}: {
  src: string
  alt: string
  caption: string
  wide?: boolean
}) {
  return (
    <figure>
      <div
        className={`relative overflow-hidden rounded-xl border border-border bg-bg ${
          wide ? 'aspect-16/10' : 'aspect-4/3'
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={wide ? '100vw' : '(min-width: 640px) 50vw, 100vw'}
          className="object-cover object-top"
        />
      </div>
      <figcaption className="mt-2 text-xs font-medium uppercase tracking-wide text-text-muted">
        {caption}
      </figcaption>
    </figure>
  )
}

function CaseStudyBlock({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <div className={index > 0 ? 'border-t border-border pt-20' : undefined}>
      <motion.h3
        variants={fadeUp}
        className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary"
      >
        {study.heading}
      </motion.h3>
      <motion.p variants={fadeUp} className="mt-4 text-sm text-text-secondary">
        {study.client.name}, {study.client.role}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-10">
        {study.before ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Shot src={study.before.src} alt={study.before.alt} caption="Before" />
            <Shot src={study.after.src} alt={study.after.alt} caption="After" />
          </div>
        ) : (
          <Shot src={study.after.src} alt={study.after.alt} caption="The site today" wide />
        )}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6"
      >
        {study.stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-serif text-3xl text-text-primary">{stat.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <motion.div variants={fadeUp}>
          <h4 className="text-sm font-medium text-accent mb-3">The brief</h4>
          <div className="space-y-3">
            {study.brief.map((paragraph) => (
              <p key={paragraph} className="text-text-secondary text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <h4 className="text-sm font-medium text-accent mb-3">The outcome</h4>
          <p className="text-text-secondary text-base leading-relaxed">{study.outcome}</p>
        </motion.div>
      </div>

      <motion.blockquote
        variants={fadeUp}
        className="mt-12 border-l-2 border-accent pl-6 font-serif text-xl md:text-2xl italic text-text-primary"
      >
        {study.quote}
      </motion.blockquote>
    </div>
  )
}

export default function CaseStudySection() {
  return (
    <section id="case-study" className="py-24 md:py-32 bg-surface">
      <motion.div
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.p variants={fadeUp} className="text-accent font-medium text-sm mb-3">
          {CASE_STUDY_SECTION.label}
        </motion.p>

        <div className="mt-12 space-y-20">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyBlock key={study.id} study={study} index={index} />
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-16">
          <SpotlightButton onClick={openCalendly}>{CASE_STUDY_SECTION.cta}</SpotlightButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
