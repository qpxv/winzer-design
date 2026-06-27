'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CONTACT_SECTION } from '@/lib/data'

export default function CalendlyModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-calendly', handler)
    return () => window.removeEventListener('open-calendly', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="relative bg-bg rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl">
          <button
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-border transition-colors duration-200"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X size={16} className="text-text-primary" />
          </button>
          <div className="overflow-hidden">
            <div
              className="calendly-inline-widget"
              data-url={CONTACT_SECTION.calendlyUrl}
              style={{ minWidth: '320px', height: '700px', width: 'calc(100% + 20px)' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
