'use client'

import { useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SpotlightButton from '@/components/ui/SpotlightButton'
import { HERO, PROJECTS } from '@/lib/data'

// References --color-accent so it follows the theme knob in globals.css.
const GRID_LINE = 'color-mix(in srgb, var(--color-accent) 8%, transparent)'
const GRID_LINES = `linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)`

interface CubeConfig {
  project: (typeof PROJECTS)[0]
  depth: number
  top: string
  left: string
  width: string
}

const CUBE_CONFIGS: CubeConfig[] = [
  { project: PROJECTS[0], depth: 0.8, top: '20%', left: '8%',  width: 'w-56' },
  { project: PROJECTS[1], depth: 0.5, top: '16%', left: '72%', width: 'w-52' },
  { project: PROJECTS[2], depth: 1.2, top: '62%', left: '10%', width: 'w-44' },
  { project: PROJECTS[3], depth: 0.6, top: '70%', left: '68%', width: 'w-60' },
  { project: PROJECTS[4], depth: 1.0, top: '38%', left: '78%', width: 'w-48' },
  { project: PROJECTS[5], depth: 0.4, top: '82%', left: '35%', width: 'w-40' },
  { project: PROJECTS[6], depth: 0.9, top: '13%', left: '44%', width: 'w-44' },
]

function CubeImage({ src, name, width, height }: { src: string; name: string; width: number; height: number }) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className="w-full aspect-video bg-surface flex items-center justify-center text-xs text-text-muted font-medium select-none">
        {name}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={name}
      width={width}
      height={height}
      priority
      className="w-full h-auto"
      onError={() => setErrored(true)}
      sizes="(max-width: 768px) 0px, 260px"
    />
  )
}

function CubeCard({
  cfg,
  springX,
  springY,
}: {
  cfg: CubeConfig
  springX: MotionValue<number>
  springY: MotionValue<number>
}) {
  const x = useTransform(springX, (v) => v * cfg.depth * 8)
  const y = useTransform(springY, (v) => v * cfg.depth * 8)

  return (
    <motion.div
      className={`absolute ${cfg.width} rounded-lg shadow-accent-sm overflow-hidden`}
      style={{ top: cfg.top, left: cfg.left, x, y }}
    >
      <CubeImage src={cfg.project.image} name={cfg.project.name} width={cfg.project.imageWidth} height={cfg.project.imageHeight} />
    </motion.div>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
    },
    [mouseX, mouseY],
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GRID_LINES,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, transparent 20%, black 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, transparent 20%, black 75%)',
        }}
      />

      {CUBE_CONFIGS.map((cfg, i) => (
        <CubeCard key={i} cfg={cfg} springX={springX} springY={springY} />
      ))}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex flex-col items-center">
        <motion.h1
          className="text-5xl md:text-7xl font-serif tracking-tight text-text-primary leading-[1.05]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        >
          {HERO.headline}
          <br />
          <span className="text-accent italic">{HERO.headlineAccent}</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-sm md:text-base text-text-secondary max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        >
          {HERO.subheadline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center gap-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        >
          <SpotlightButton onClick={() => window.dispatchEvent(new CustomEvent('open-calendly'))}>
            {HERO.cta}
          </SpotlightButton>
          <a
            href="#work"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
          >
            {HERO.ctaSecondary}
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
