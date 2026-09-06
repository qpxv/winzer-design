'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  Minus,
  Palette,
  Code2,
  Gauge,
  TrendingUp,
  PenLine,
  KeyRound,
  UserRound,
  Rocket,
  Tag,
  LifeBuoy,
  type LucideIcon,
} from 'lucide-react'
import { fadeUp } from '@/lib/animations'
import { COMPARISON_SECTION, COMPARISON_ROWS } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { ComparisonIcon, ComparisonRow } from '@/types'

const ICON_MAP: Record<ComparisonIcon, LucideIcon> = {
  Palette,
  Code2,
  Gauge,
  TrendingUp,
  PenLine,
  KeyRound,
  UserRound,
  Rocket,
  Tag,
  LifeBuoy,
}

const GRID_COLS = 'grid-cols-[1fr_210px_1fr] gap-x-8'

function UsCheck() {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white">
      <Check className="size-3.5 text-accent" strokeWidth={3} />
    </span>
  )
}

function ThemMark({ level }: { level: ComparisonRow['themLevel'] }) {
  const Mark = level === 'no' ? X : Minus
  return <Mark className="size-4 shrink-0 text-text-muted" />
}

export default function ComparisonSection() {
  const lastIndex = COMPARISON_ROWS.length - 1

  return (
    <section id="comparison" className="py-24 md:py-32 bg-bg">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent font-medium text-sm mb-3">{COMPARISON_SECTION.label}</p>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-4">
            {COMPARISON_SECTION.heading}
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            {COMPARISON_SECTION.subheading}
          </p>
        </motion.div>

        {/* Desktop: three-column table, middle column is a raised accent card
            whose own column label sits inside it */}
        <motion.div
          className={cn('hidden md:grid', GRID_COLS)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span />
          <div className="-mt-5 flex items-end justify-center rounded-t-3xl bg-accent px-4 pt-6 pb-3 text-center text-xs font-semibold uppercase tracking-wide text-white">
            {COMPARISON_SECTION.columnUs}
          </div>
          <div className="flex items-end pb-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            {COMPARISON_SECTION.columnThem}
          </div>

          {COMPARISON_ROWS.map((row, i) => {
            const Icon = ICON_MAP[row.icon]
            return (
              <Fragment key={row.feature}>
                <div className="flex items-center gap-3 border-b border-border py-4">
                  <Icon className="size-4 shrink-0 text-text-muted" strokeWidth={1.75} />
                  <span className="text-sm text-text-primary">{row.feature}</span>
                </div>

                <div
                  className={cn(
                    'flex items-center justify-center bg-accent py-4',
                    i === lastIndex && '-mb-6 rounded-b-3xl pb-6 shadow-accent-lg',
                  )}
                >
                  <UsCheck />
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-border py-4">
                  <span className="text-sm text-text-secondary">{row.them}</span>
                  <ThemMark level={row.themLevel} />
                </div>
              </Fragment>
            )
          })}
        </motion.div>

        {/* Mobile: one card per row */}
        <motion.div
          className="space-y-4 md:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          {COMPARISON_ROWS.map((row) => {
            const Icon = ICON_MAP[row.icon]
            return (
              <div
                key={row.feature}
                className="overflow-hidden rounded-2xl border border-border"
              >
                <div className="flex items-center gap-2.5 bg-surface px-4 py-3">
                  <Icon className="size-4 shrink-0 text-text-muted" strokeWidth={1.75} />
                  <span className="text-sm font-medium text-text-primary">{row.feature}</span>
                </div>
                <div className="flex items-center gap-2 bg-accent px-4 py-3 text-white">
                  <UsCheck />
                  <span className="text-sm">{COMPARISON_SECTION.columnUs}</span>
                </div>
                <div className="flex items-start gap-2 border-t border-border px-4 py-3">
                  <ThemMark level={row.themLevel} />
                  <span className="text-sm text-text-secondary">{row.them}</span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
