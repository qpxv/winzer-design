<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Winzer Design — Project Context for Agents

## Stack

- **Next.js 16** (App Router) — `app/` directory, server components by default
- **Tailwind CSS v4** — no `tailwind.config.ts`. All tokens in `app/globals.css` inside `@theme {}`.
- **Framer Motion** — animation variants in `lib/animations.ts`, never defined inline
- **TypeScript** — strict, no `any`. Shared interfaces in `types/index.ts`
- **lucide-react** — only icon library. Verify icon names before use (see global CLAUDE.md rule 17)
- **clsx** — use `cn()` from `lib/utils.ts` for all conditional class merging

## Design System

### Color Tokens (`app/globals.css` `@theme {}`)

| Token | Value | Tailwind class |
|---|---|---|
| `--color-bg` | `#ffffff` | `bg-bg`, `text-bg` |
| `--color-surface` | `#f7f7f8` | `bg-surface` |
| `--color-border` | `#e8e8ec` | `border-border` |
| `--color-text-primary` | `#0a0a0b` | `text-text-primary` |
| `--color-text-secondary` | `#6b6b80` | `text-text-secondary` |
| `--color-text-muted` | `#a0a0b0` | `text-text-muted` |
| `--color-accent` | `#7c3aed` | `bg-accent`, `text-accent` |
| `--color-accent-hover` | `#6d28d9` | `hover:bg-accent-hover` |
| `--color-accent-light` | `#f3eeff` | `bg-accent-light` |
| `--color-accent-muted` | `#ede9fe` | `bg-accent-muted`, `text-accent-muted` |

Never hardcode hex values in components. Never add new tokens without adding them to `@theme {}` first.

### Typography

- Font: **Inter** (loaded in `app/layout.tsx` via `next/font/google`, CSS var `--font-inter-var`)
- Hero headline: `text-5xl md:text-7xl font-bold tracking-tight`
- Section headings: `text-3xl md:text-4xl font-bold tracking-tight`
- Section label (small accent line above heading): `text-accent font-medium text-sm`
- Body copy: `text-base text-text-secondary`

### Layout

- Max content width: `max-w-6xl mx-auto px-6`
- Section vertical padding: `py-24 md:py-32`
- Grid gap: `gap-8` between major items, `gap-6` between cards
- Alternating section backgrounds: `bg-bg` → `bg-surface` → `bg-bg` → `bg-surface` → `bg-text-primary` (contact) → footer

## File Structure

```
app/
  layout.tsx           # Inter font, metadata, body wrapper
  page.tsx             # Server component — assembles all sections
  globals.css          # @theme tokens, scroll-behavior, body font

components/
  ui/
    Button.tsx         # Shared button — variants: primary | secondary; sizes: default | sm
    ProjectModal.tsx   # 'use client' — full-screen iframe overlay for work items
  sections/
    NavBar.tsx         # 'use client' — sticky, scroll-blur on >20px
    HeroSection.tsx    # 'use client' — parallax cube grid + headline + CTAs
    WorkSection.tsx    # 'use client' — 3×2 project card grid, opens ProjectModal
    ProcessSection.tsx # 'use client' — 3-step grid with step numbers
    TestimonialsSection.tsx  # 'use client' — 3-card testimonial grid
    PricingSection.tsx # 'use client' — 2-tier pricing cards
    ContactSection.tsx # 'use client' — Calendly embed on dark bg
    FooterSection.tsx  # server — logo, email, tagline

lib/
  data.ts              # ALL copy, projects, testimonials, pricing, process steps
  animations.ts        # Framer Motion variants: fadeUp, fadeIn, staggerContainer, scaleIn
  utils.ts             # cn() helper

types/
  index.ts             # Project, ProcessStep, Testimonial, PricingTier interfaces
```

## Content & Data

**All copy lives in `lib/data.ts`.** Never hardcode strings in JSX. Exported constants:

- `NAV` — logo text, link labels, CTA label
- `HERO` — headline, headlineAccent, subheadline, cta, ctaSecondary
- `WORK_SECTION` + `PROJECTS` — 6 portfolio projects with id/name/tagline/url/image
- `PROCESS_SECTION` + `PROCESS_STEPS` — 3 process steps
- `TESTIMONIALS_SECTION` + `TESTIMONIALS` — 3 testimonial cards (placeholders until Ben fills in real ones)
- `PRICING_SECTION` + `PRICING_TIERS` — Landing Page (£500) and Full Website (£1,000)
- `CONTACT_SECTION` — label, heading, subheading, calendlyUrl
- `FOOTER` — logo, email, note, copyright

## Key Conventions

- `'use client'` — required on any component using hooks, browser APIs, or event handlers. All section components currently need it due to Framer Motion `whileInView`.
- **Framer Motion** — always `whileInView` with `viewport={{ once: true, margin: '-80px' }}`. Stagger with `staggerContainer` + `fadeUp` from `lib/animations.ts`.
- **Button** — always use `<Button>` from `components/ui/Button.tsx`. Never recreate button markup.
- **Section IDs** — `id="work"`, `id="process"`, `id="pricing"`, `id="contact"`. Nav links use `#work`, `#process`, `#pricing`. CTAs link to `#contact`.
- **Project images** — placeholder `div` elements in `public/projects/` directory. Real screenshots to be dropped in by Ben.
- **Calendly** — loaded via `<Script strategy="lazyOnload">` in ContactSection. URL in `lib/data.ts`.

## Placeholder Items (Ben to update before launch)

1. `public/projects/*.png` — 6 real project screenshot images
2. `lib/data.ts` → `PROJECTS[*].url` — real live URLs
3. `lib/data.ts` → `TESTIMONIALS` — real quotes, names, roles
4. `lib/data.ts` → `CONTACT_SECTION.calendlyUrl`
5. `lib/data.ts` → `FOOTER.email`
