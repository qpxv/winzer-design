'use client'

import { useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightButtonProps {
  href?: string
  onClick?: () => void
  size?: 'sm' | 'default'
  className?: string
  children: React.ReactNode
}

export default function SpotlightButton({
  href,
  onClick,
  size = 'default',
  className,
  children,
}: SpotlightButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    ref.current.style.setProperty('--y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }, [])

  const base = cn(
    'relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-full cursor-pointer',
    'bg-btn-primary text-white border border-transparent hover:border-white/20 transition-colors duration-200',
    size === 'default' && 'px-6 py-3 text-base',
    size === 'sm' && 'px-4 py-2 text-sm',
    className,
  )

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          opacity: hovered ? 1 : 0,
          transitionProperty: 'opacity',
          transitionDuration: hovered ? '150ms' : '300ms',
          background:
            'radial-gradient(circle 130px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={base}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={base}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </button>
  )
}
