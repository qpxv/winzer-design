"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOKING_URL, NAV } from "@/lib/data";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr] items-center gap-4 px-5 py-3 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <a href="#top" aria-label={NAV.homeLabel} className="w-fit justify-self-start">
          <Logo isCompactOnNarrow />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.92rem] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button href={BOOKING_URL} size="sm">
            {NAV.cta}
          </Button>
          <button
            type="button"
            aria-label={isOpen ? NAV.closeMenu : NAV.openMenu}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink md:hidden"
          >
            {isOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 md:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col px-5 pb-5 pt-1">
            {NAV.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-line py-3.5 font-display text-[1.4rem]/[1.1] font-medium tracking-[-0.02em] text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
