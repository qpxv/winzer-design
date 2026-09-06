'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import { fadeUp } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { TESTIMONIALS_SECTION, TESTIMONIAL_SCREENSHOTS } from '@/lib/data'
import type { TestimonialScreenshot } from '@/types'

type Direction = 'up' | 'down'

const COLUMN_COUNT = 3
const COLUMN_DIRECTIONS: Direction[] = ['up', 'down', 'up']

function ScreenshotCard({ screenshot }: { screenshot: TestimonialScreenshot }) {
  if (screenshot.src) {
    return (
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        sizes="(max-width: 768px) 90vw, 30vw"
        className="w-full h-auto rounded-xl border border-border shadow-sm"
      />
    )
  }

  return (
    <div
      className="w-full rounded-xl border border-dashed border-border bg-surface flex flex-col items-center justify-center gap-2 text-text-muted"
      style={{ aspectRatio: `${screenshot.width} / ${screenshot.height}` }}
    >
      <ImageIcon className="size-6" strokeWidth="1.5" />
      <span className="text-xs">Screenshot coming soon</span>
    </div>
  )
}

function MarqueeColumn({
  screenshots,
  direction,
  paused,
  animate,
}: {
  screenshots: TestimonialScreenshot[]
  direction: Direction
  paused: boolean
  animate: boolean
}) {
  const rows = animate ? [...screenshots, ...screenshots] : screenshots

  return (
    <div className="group h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className={cn(
          'flex flex-col',
          animate && (direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down'),
          animate && 'group-hover:[animation-play-state:paused]',
          animate && paused && '[animation-play-state:paused]',
        )}
      >
        {rows.map((screenshot, i) => (
          <div key={`${screenshot.id}-${i}`} aria-hidden={i >= screenshots.length} className="mb-5">
            <ScreenshotCard screenshot={screenshot} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion()
  const [isPageHidden, setIsPageHidden] = useState(false)

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageHidden(document.visibilityState === 'hidden')
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const animate = !prefersReducedMotion

  const columns = TESTIMONIAL_SCREENSHOTS.reduce<TestimonialScreenshot[][]>(
    (cols, screenshot, i) => {
      cols[i % COLUMN_COUNT].push(screenshot)
      return cols
    },
    Array.from({ length: COLUMN_COUNT }, () => []),
  )

  return (
    <section className="py-24 md:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent font-medium text-sm mb-3">{TESTIMONIALS_SECTION.label}</p>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary">
            {TESTIMONIALS_SECTION.heading}
          </h2>
          <p className="text-text-secondary text-base mt-4 max-w-md mx-auto">
            {TESTIMONIALS_SECTION.subheading}
          </p>
        </motion.div>

        <div className="hidden md:grid grid-cols-3 gap-5">
          {columns.map((columnScreenshots, i) => (
            <MarqueeColumn
              key={i}
              screenshots={columnScreenshots}
              direction={COLUMN_DIRECTIONS[i]}
              paused={isPageHidden}
              animate={animate}
            />
          ))}
        </div>

        <div className="grid md:hidden grid-cols-1 gap-5 max-w-sm mx-auto">
          {TESTIMONIAL_SCREENSHOTS.map((screenshot) => (
            <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
          ))}
        </div>
      </div>
    </section>
  )
}
