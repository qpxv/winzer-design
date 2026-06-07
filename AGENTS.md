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
| `--color-btn-primary` | `#8b5cf6` | `bg-btn-primary` — used only on SpotlightButton, lighter than accent |

Never hardcode hex values in components. Never add new tokens without adding them to `@theme {}` first.

### Typography

- **DM Serif Display** — headings only (`font-serif`). Weight 400 only; do not add `font-bold` to serif elements (browser synthesis looks bad). Available in normal and italic. CSS var: `--font-dm-serif`.
- **DM Sans** — all body text, UI labels, buttons, nav (`font-sans` or default). Weights 100–900 all work. CSS var: `--font-dm-sans`.
- Hero headline: `text-5xl md:text-7xl font-serif tracking-tight`
- Hero accent word ("business."): `text-accent italic` — serif italic is intentional and defines the brand voice
- Section headings (h2): `text-3xl md:text-4xl font-serif tracking-tight`
- Contact heading: `text-4xl md:text-5xl font-serif`
- Section label (small accent line above heading): `text-accent font-medium text-sm` — DM Sans
- Body copy: `text-base text-text-secondary` — DM Sans
- Any highlighted/branded word inside a heading should be `text-accent italic` (inherits serif from parent)

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
    SpotlightButton.tsx # Hero primary CTA only — spotlight glow on hover. Renders <a> with href or <button>. Uses useMotionValue for zero-rerender mouse tracking.
    ProjectModal.tsx   # 'use client' — full-screen iframe overlay for work items
  sections/
    NavBar.tsx         # 'use client' — sticky, scroll-blur on >20px
    HeroSection.tsx    # 'use client' — parallax image grid + headline + CTAs
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

## HeroSection — Current Implementation

The hero has a floating project image grid with a mouse-parallax effect. Key details:

- **Images**: 6 project screenshots in `public/projects/` (real PNGs, wired to `PROJECTS` array). Rendered via `next/image` with `width={1663} height={950} className="w-full h-auto"` — no cropping, natural aspect ratio.
- **Parallax**: `useMotionValue` + `useSpring` (stiffness: 60, damping: 20) track the mouse position. Each image is a `CubeCard` component that calls `useTransform` to scale the spring by its own `depth` value (0.4–1.2). Deeper images move more. **Do NOT use CSS transitions or `onMouseMove` + CSS custom properties for this** — it causes a snap on cursor stop.
- **CubeCard**: must be its own component (not inline in `.map()`) so `useTransform` is a valid hook call.
- **No float animation** — the old `animate={{ y: [0, -12, 0] }}` loop has been removed.
- **Image styles**: `rounded-lg`, `shadow-[0_4px_24px_rgba(124,58,237,0.25)]`, no opacity.
- **Grid background**: purple `rgba(124,58,237,0.08)` grid lines at `48px` spacing, with a radial mask that fades the center (keeping the text readable). Lives in an `absolute inset-0` div as the first child of the section.
- **Primary CTA**: uses `SpotlightButton`, NOT `Button`.
- **Secondary CTA** ("See the work"): plain `<a>` with `ArrowRight` icon, links to `#work`.

## SpotlightButton — Implementation Notes

- Used **only** for the hero primary CTA. All other buttons use `Button.tsx`.
- Mouse tracking: `onMouseMove` writes `--x`/`--y` directly via `ref.current.style.setProperty` — zero React re-renders.
- `hovered` boolean state toggles only on `onMouseEnter`/`onMouseLeave` — only used for opacity transitions.
- Spotlight overlay: `radial-gradient(circle 130px at var(--x) var(--y))` fades in 150ms, out 300ms.
- Has a subtle `border-transparent hover:border-white/20` border that appears on hover.
- Renders as `<a>` when `href` is passed, `<button>` otherwise.

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
- **Button** — always use `<Button>` from `components/ui/Button.tsx` except for the hero primary CTA which uses `SpotlightButton`.
- **Section IDs** — `id="work"`, `id="process"`, `id="pricing"`, `id="contact"`. Nav links use `#work`, `#process`, `#pricing`. CTAs link to `#contact`.
- **Calendly** — loaded via `<Script strategy="lazyOnload">` in ContactSection. URL in `lib/data.ts`.

## Placeholder Items (Ben to update before launch)

1. `lib/data.ts` → `PROJECTS[*].url` — real live URLs (currently placeholder domains)
2. `lib/data.ts` → `TESTIMONIALS` — real quotes, names, roles (currently placeholder text)
3. `lib/data.ts` → `CONTACT_SECTION.calendlyUrl` — verify this is the correct Calendly link
4. `lib/data.ts` → `FOOTER.email` — verify this is the correct email
