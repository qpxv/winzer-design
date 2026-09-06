'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp } from '@/lib/animations'
import { WORK_SECTION, PROJECTS } from '@/lib/data'
import ProjectModal from '@/components/ui/ProjectModal'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function ShowcaseRow({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const flipped = index % 2 === 1

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      variants={fadeUp}
      className={cn(
        'flex flex-col gap-8 md:flex-row md:items-center md:gap-14',
        flipped && 'md:flex-row-reverse',
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Preview ${project.name}`}
        className="group w-full md:w-[58%] cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-accent-lg transition-transform duration-300 group-hover:-translate-y-1">
          <div className="flex items-center gap-2 border-b border-border px-4 h-10">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="ml-3 truncate text-xs text-text-muted">{hostOf(project.url)}</span>
          </div>
          <Image
            src={project.image}
            alt={project.name}
            width={project.imageWidth}
            height={project.imageHeight}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="w-full h-auto block"
          />
        </div>
      </button>

      <div className="relative md:w-[42%]">
        <span
          aria-hidden
          className="absolute -top-10 left-0 select-none pointer-events-none font-serif text-6xl md:text-7xl text-accent/10"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="relative font-serif text-3xl md:text-4xl tracking-tight text-text-primary">
          {project.name}
        </h3>
        <p className="mt-3 text-base text-text-secondary max-w-sm">{project.tagline}</p>
        <div className="mt-6 flex items-center gap-6">
          <button
            type="button"
            onClick={onOpen}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
          >
            Open preview
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
          >
            View live site
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkSection() {
  const [modalProject, setModalProject] = useState<Project | null>(null)

  return (
    <section id="work" className="py-24 md:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-accent font-medium text-sm mb-3">{WORK_SECTION.label}</p>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-4">
            {WORK_SECTION.heading}
          </h2>
          <p className="text-text-secondary text-base max-w-xl">{WORK_SECTION.subheading}</p>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-32">
          {PROJECTS.map((project, i) => (
            <ShowcaseRow
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setModalProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  )
}
