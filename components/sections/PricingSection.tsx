'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { fadeUp } from '@/lib/animations'
import { PRICING_SECTION, PRICING_TIERS } from '@/lib/data'
import Button from '@/components/ui/Button'
import SpotlightButton from '@/components/ui/SpotlightButton'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/types'

function PricingColumn({ tier, isFirst }: { tier: PricingTier; isFirst: boolean }) {
  return (
    <div
      className={cn(
        'relative p-8 flex flex-col gap-6',
        isFirst
          ? 'border-b border-border md:border-b-0 md:border-r md:border-border'
          : '',
      )}
    >
      {tier.highlighted && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-accent" />
      )}

      <div className="flex flex-col gap-3">
        <p className="font-serif italic text-accent text-sm">{tier.name}</p>
        <div className="flex items-start gap-1">
          <span className="font-serif text-xl text-text-secondary mt-2">£</span>
          <span className="font-serif text-5xl md:text-6xl tracking-tight text-text-primary leading-none">
            {tier.price}
          </span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">{tier.description}</p>
      </div>

      <div className="border-t border-border" />

      <ul className="flex flex-col gap-3 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={14} className="text-text-muted shrink-0 mt-0.5" />
            <span className="text-sm text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      {tier.highlighted ? (
        <SpotlightButton href="#contact" className="w-full justify-center">
          {PRICING_SECTION.cta}
        </SpotlightButton>
      ) : (
        <Button variant="secondary" href="#contact" className="w-full">
          {PRICING_SECTION.cta}
        </Button>
      )}
    </div>
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
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-4">
            {PRICING_SECTION.heading}
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            {PRICING_SECTION.subheading}
          </p>
        </motion.div>

        <motion.div
          className="bg-bg border border-border rounded-2xl overflow-hidden max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          {PRICING_TIERS.map((tier, i) => (
            <PricingColumn key={tier.id} tier={tier} isFirst={i === 0} />
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
