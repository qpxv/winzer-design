'use client'

import { useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { HERO, PROJECTS } from '@/lib/data'

interface CubeConfig {
  project: (typeof PROJECTS)[0]
  depth: number
  top: string
  left: string
  width: string
  height: string
  rotateFactor: number
  floatDuration: number
  floatDelay: number
}

const CUBE_CONFIGS: CubeConfig[] = [
  { project: PROJECTS[0], depth: 0.8, top: '8%', left: '2%', width: 'w-56', height: 'h-36', rotateFactor: 1, floatDuration: 7, floatDelay: 0 },
  { project: PROJECTS[1], depth: 0.5, top: '15%', left: '72%', width: 'w-52', height: 'h-32', rotateFactor: -1, floatDuration: 9, floatDelay: 1 },
  { project: PROJECTS[2], depth: 1.2, top: '62%', left: '5%', width: 'w-44', height: 'h-28', rotateFactor: 1.2, floatDuration: 6, floatDelay: 0.5 },
  { project: PROJECTS[3], depth: 0.6, top: '70%', left: '68%', width: 'w-60', height: 'h-40', rotateFactor: -0.8, floatDuration: 8, floatDelay: 2 },
  { project: PROJECTS[4], depth: 1.0, top: '38%', left: '78%', width: 'w-48', height: 'h-32', rotateFactor: 1.5, floatDuration: 10, floatDelay: 1.5 },
  { project: PROJECTS[5], depth: 0.4, top: '82%', left: '35%', width: 'w-40', height: 'h-28', rotateFactor: -1.2, floatDuration: 7.5, floatDelay: 3 },
  { project: PROJECTS[0], depth: 0.9, top: '25%', left: '1%', width: 'w-40', height: 'h-28', rotateFactor: 0.7, floatDuration: 8.5, floatDelay: 2.5 },
  { project: PROJECTS[2], depth: 0.7, top: '48%', left: '70%', width: 'w-36', height: 'h-24', rotateFactor: -0.5, floatDuration: 6.5, floatDelay: 1.2 },
]

function CubeImage({ src, name }: { src: string; name: string }) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className="w-full h-full bg-surface flex items-center justify-center text-xs text-text-muted font-medium select-none">
        {name}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      className="object-cover object-top"
      onError={() => setErrored(true)}
      sizes="(max-width: 768px) 0px, 260px"
    />
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    el.style.setProperty('--mx', String(mx))
    el.style.setProperty('--my', String(my))
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
      onMouseMove={handleMouseMove}
      style={
        {
          '--mx': '0',
          '--my': '0',
        } as React.CSSProperties
      }
    >
      {CUBE_CONFIGS.map((cfg, i) => (
        <motion.div
          key={i}
          className={`absolute ${cfg.width} ${cfg.height} rounded-2xl shadow-lg overflow-hidden opacity-60`}
          style={
            {
              top: cfg.top,
              left: cfg.left,
              '--depth': cfg.depth,
              transform: `perspective(800px) rotateX(calc(var(--my) * ${cfg.rotateFactor * 4}deg)) rotateY(calc(var(--mx) * ${cfg.rotateFactor * 4}deg)) translateX(calc(var(--mx) * ${cfg.depth * 30}px)) translateY(calc(var(--my) * ${cfg.depth * 20}px))`,
              transition: 'transform 0.1s linear',
            } as React.CSSProperties
          }
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: cfg.floatDuration,
            delay: cfg.floatDelay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <CubeImage src={cfg.project.image} name={cfg.project.name} />
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
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
          className="text-lg md:text-xl text-text-secondary max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        >
          {HERO.subheadline}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        >
          <Button variant="primary" href="#contact">
            {HERO.cta}
          </Button>
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
