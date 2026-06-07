'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { PRICING_SECTION, PRICING_TIERS } from '@/lib/data'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/types'

function PricingCard({ tier }: { tier: PricingTier }) {
  const highlighted = tier.highlighted ?? false

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'rounded-2xl p-8 flex flex-col gap-6',
        highlighted
          ? 'bg-accent text-white'
          : 'bg-bg border border-border text-text-primary',
      )}
    >
      <div>
        <p
          className={cn(
            'font-semibold text-base mb-1',
            highlighted ? 'text-white/80' : 'text-text-secondary',
          )}
        >
          {tier.name}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={cn('text-sm', highlighted ? 'text-white/70' : 'text-text-secondary')}>
            from £
          </span>
          <span className="text-4xl font-bold">{tier.price}</span>
        </div>
      </div>

      <p className={cn('text-sm', highlighted ? 'text-white/80' : 'text-text-secondary')}>
        {tier.description}
      </p>

      <ul className="flex flex-col gap-3 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              size={16}
              className={cn(
                'shrink-0 mt-0.5',
                highlighted ? 'text-white' : 'text-accent',
              )}
            />
            <span className={cn('text-sm', highlighted ? 'text-white/90' : 'text-text-secondary')}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div>
        {highlighted ? (
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center px-6 py-3 rounded-full font-semibold text-base bg-white text-accent hover:bg-accent-light transition-colors duration-200"
          >
            {PRICING_SECTION.cta}
          </a>
        ) : (
          <Button variant="primary" href="#contact" className="w-full">
            {PRICING_SECTION.cta}
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent font-medium text-sm mb-3">{PRICING_SECTION.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            {PRICING_SECTION.heading}
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            {PRICING_SECTION.subheading}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </motion.div>

        <p className="text-text-secondary text-sm text-center mt-10">
          {PRICING_SECTION.note}{' '}
          <a href="#contact" className="text-accent hover:text-accent-hover transition-colors duration-200 font-medium">
            {PRICING_SECTION.cta}
          </a>
        </p>
      </div>
    </section>
  )
}
