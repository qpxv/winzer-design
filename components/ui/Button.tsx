'use client'

import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'sm'
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
}

export default function Button({
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  href,
  className,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-200 cursor-pointer',
    size === 'default' && 'px-6 py-3 text-base',
    size === 'sm' && 'px-4 py-2 text-sm',
    variant === 'primary' && 'bg-accent text-white hover:bg-accent-hover',
    variant === 'secondary' && 'bg-transparent border border-border text-text-primary hover:border-accent hover:text-accent',
    className,
  )

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  )
}
