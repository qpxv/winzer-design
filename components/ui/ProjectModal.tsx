'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [iframeError, setIframeError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!project) return

    setIframeError(false)
    document.body.style.overflow = 'hidden'

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="panel"
            className="fixed inset-4 md:inset-8 bg-bg rounded-2xl overflow-hidden flex flex-col z-50"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          >
            <div className="flex items-center justify-between px-5 h-12 border-b border-border shrink-0">
              <span className="font-semibold text-text-primary">{project.name}</span>
              <div className="flex items-center gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors duration-200"
                >
                  Visit live site
                  <ArrowUpRight size={14} />
                </a>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0">
              {iframeError ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-text-secondary">
                  <p className="text-base">This site can't be embedded in a preview.</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent hover:text-accent-hover transition-colors duration-200 font-medium"
                  >
                    Open {project.name} directly
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  src={project.url}
                  width="100%"
                  height="100%"
                  className="border-0"
                  onError={() => setIframeError(true)}
                  title={project.name}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
