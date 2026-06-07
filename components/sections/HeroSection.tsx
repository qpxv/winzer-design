'use client'

import { useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SpotlightButton from '@/components/ui/SpotlightButton'
import { HERO, PROJECTS } from '@/lib/data'

interface CubeConfig {
  project: (typeof PROJECTS)[0]
  depth: number
  top: string
  left: string
  width: string
}

const CUBE_CONFIGS: CubeConfig[] = [
  { project: PROJECTS[0], depth: 0.8, top: '20%', left: '2%',  width: 'w-56' },
  { project: PROJECTS[1], depth: 0.5, top: '15%', left: '72%', width: 'w-52' },
  { project: PROJECTS[2], depth: 1.2, top: '62%', left: '5%',  width: 'w-44' },
  { project: PROJECTS[3], depth: 0.6, top: '70%', left: '68%', width: 'w-60' },
  { project: PROJECTS[4], depth: 1.0, top: '38%', left: '78%', width: 'w-48' },
  { project: PROJECTS[5], depth: 0.4, top: '82%', left: '35%', width: 'w-40' },
]

function CubeImage({ src, name }: { src: string; name: string }) {
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
      width={1663}
      height={950}
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
  const x = useTransform(springX, (v) => v * cfg.depth * 18)
  const y = useTransform(springY, (v) => v * cfg.depth * 18)

  return (
    <motion.div
      className={`absolute ${cfg.width} rounded-lg shadow-[0_4px_24px_rgba(124,58,237,0.25)] overflow-hidden`}
      style={{ top: cfg.top, left: cfg.left, x, y }}
    >
      <CubeImage src={cfg.project.image} name={cfg.project.name} />
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
          backgroundImage: 'linear-gradient(to right, rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.08) 1px, transparent 1px)',
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
          className="text-5xl md:text-7xl font-serif tracking-tight text-text-primary leading-tight"
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
          <SpotlightButton href="#contact">
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
