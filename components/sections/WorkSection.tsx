'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { WORK_SECTION, PROJECTS } from '@/lib/data'
import ProjectModal from '@/components/ui/ProjectModal'
import type { Project } from '@/types'

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (p: Project) => void
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-surface"
      onClick={() => onOpen(project)}
    >
      <Image
        src={project.image}
        alt={project.name}
        width={project.imageWidth}
        height={project.imageHeight}
        className="w-full h-auto block"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="absolute inset-0 bg-text-primary/80 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white font-semibold text-lg">{project.name}</p>
        <p className="text-white/70 text-sm mt-1">{project.tagline}</p>
      </div>

      <div className="absolute inset-0 scale-100 group-hover:scale-[1.02] transition-transform duration-300" />
    </motion.div>
  )
}

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <section id="work" className="py-24 md:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16"
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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
