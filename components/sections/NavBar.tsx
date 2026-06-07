'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NAV } from '@/lib/data'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass =
    'text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-semibold text-text-primary tracking-tight">
          {NAV.logo}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className={linkClass}>
              {link}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="primary" size="sm" href="#contact">
            {NAV.cta}
          </Button>
        </div>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-border px-6 pb-6 pt-2 flex flex-col gap-4">
          {NAV.links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <Button
            variant="primary"
            size="sm"
            href="#contact"
            onClick={() => setMobileOpen(false)}
          >
            {NAV.cta}
          </Button>
        </div>
      )}
    </header>
  )
}
