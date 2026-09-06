'use client'

import { motion } from 'framer-motion'
import { Check, DollarSign } from 'lucide-react'
import { fadeUp } from '@/lib/animations'
import { PRICING_SECTION, PRICING_TIERS } from '@/lib/data'
import Button from '@/components/ui/Button'
import SpotlightButton from '@/components/ui/SpotlightButton'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/types'

const openCalendly = () => window.dispatchEvent(new CustomEvent('open-calendly'))

// Long gradient strings kept out of the class list per the project styling rules.
// Colours reference --color-accent so they follow the theme knob in globals.css.
const ACCENT_LINE = 'color-mix(in srgb, var(--color-accent) 7%, transparent)'
const GRID_LINES = `linear-gradient(to right, ${ACCENT_LINE} 1px, transparent 1px), linear-gradient(to bottom, ${ACCENT_LINE} 1px, transparent 1px)`
const GRID_FADE = 'linear-gradient(to bottom, transparent, #000 15%, #000 80%, transparent)'
const CARD_GLOW =
  'radial-gradient(ellipse 55% 45% at 50% 42%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%)'

function PricingColumn({ tier, isFirst }: { tier: PricingTier; isFirst: boolean }) {
  const dark = Boolean(tier.highlighted)

  return (
    <div
      className={cn(
        'relative p-8 flex flex-col gap-6',
        dark ? 'bg-text-primary' : 'bg-bg',
        isFirst
          ? 'border-b border-border md:border-b-0 md:border-r md:border-border'
          : '',
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className={cn('font-serif italic text-sm', dark ? 'text-accent-light' : 'text-accent')}>
            {tier.name}
          </p>
          {tier.highlighted && (
            <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-white">
              {PRICING_SECTION.recommendedLabel}
            </span>
          )}
        </div>
        <div className="flex items-start gap-1">
          <DollarSign size={16} className={cn('mt-3 shrink-0', dark ? 'text-white/40' : 'text-text-secondary')} />
          <span
            className={cn(
              'font-serif text-5xl md:text-6xl tracking-tight leading-none',
              dark ? 'text-white' : 'text-text-primary',
            )}
          >
            {tier.price}
          </span>
        </div>
        <p className={cn('text-sm leading-relaxed', dark ? 'text-white/60' : 'text-text-secondary')}>
          {tier.description}
        </p>
      </div>

      <div className={cn('border-t', dark ? 'border-white/15' : 'border-border')} />

      <ul className="flex flex-col gap-3 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={14} className={cn('shrink-0 mt-0.5', dark ? 'text-accent-light' : 'text-text-muted')} />
            <span className={cn('text-sm', dark ? 'text-white/70' : 'text-text-secondary')}>{feature}</span>
          </li>
        ))}
      </ul>

      {dark ? (
        <SpotlightButton onClick={openCalendly} className="w-full">
          {PRICING_SECTION.cta}
        </SpotlightButton>
      ) : (
        <Button variant="secondary" onClick={openCalendly} className="w-full">
          {PRICING_SECTION.cta}
        </Button>
      )}
    </div>
  )
}

export default function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 md:py-32 bg-surface">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: GRID_LINES,
          backgroundSize: '48px 48px',
          maskImage: GRID_FADE,
          WebkitMaskImage: GRID_FADE,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-[640px] -translate-y-1/2"
        style={{ background: CARD_GLOW }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
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
          className="bg-bg border border-border rounded-2xl overflow-hidden max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 shadow-accent-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          {PRICING_TIERS.map((tier, i) => (
            <PricingColumn key={tier.id} tier={tier} isFirst={i === 0} />
          ))}
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto mt-4 flex flex-col gap-3 rounded-2xl border border-border bg-bg px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div className="max-w-md">
            <p className="font-serif italic text-sm text-accent">{PRICING_SECTION.retainer.label}</p>
            <p className="mt-1 text-sm text-text-secondary leading-relaxed">
              {PRICING_SECTION.retainer.description}
            </p>
          </div>
          <div className="flex shrink-0 items-baseline gap-1">
            <span className="text-xs text-text-secondary">{PRICING_SECTION.retainer.prefix}</span>
            <DollarSign size={14} className="self-center text-text-secondary" />
            <span className="font-serif text-3xl leading-none tracking-tight text-text-primary">
              {PRICING_SECTION.retainer.price}
            </span>
            <span className="text-sm text-text-secondary">{PRICING_SECTION.retainer.cadence}</span>
          </div>
        </motion.div>

        <p className="text-text-secondary text-sm text-center mt-10">
          {PRICING_SECTION.note}{' '}
          <button
            onClick={openCalendly}
            className="text-accent hover:text-accent-hover transition-colors duration-200 font-medium cursor-pointer"
          >
            {PRICING_SECTION.cta}
          </button>
        </p>
      </div>
    </section>
  )
}
