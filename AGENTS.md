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
| `--color-bg` | `#f8f7ff` | `bg-bg`, `text-bg` |
| `--color-surface` | `#f2f0ff` | `bg-surface` |
| `--color-border` | `#e4e0f5` | `border-border` |
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

### Hero Typography Hierarchy Rules

These two rules apply to the hero (and inform any future hero-style sections):

1. **Subheading font size = ½ of headline.** If the headline reads as "1" in visual weight, the subheading is "0.5". Currently: headline `text-5xl md:text-7xl`, subheading `text-sm md:text-base`. Never let the subheading creep back up to `text-lg` or above — it erodes the hierarchy.

2. **Spacing doubles from heading→sub to sub→CTA.** If the gap between headline and subheading is N, the gap between subheading and the button row must be 2N. Currently: `mt-4` (16px) headline→sub, `mt-8` (32px) sub→buttons. Do not use a single shared `gap-*` on the flex container — it can't express different spacings per pair.

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
    SpotlightButton.tsx # High-emphasis CTA — spotlight glow on hover. Renders <a> with href or <button>. Used in: hero, pricing highlighted tier, contact section.
    ProjectModal.tsx   # 'use client' — full-screen iframe overlay for work items; shows spinner until iframe loads
    CalendlyModal.tsx  # 'use client' — always-mounted booking popup; listens for 'open-calendly' CustomEvent on window; backdrop + centered panel; Calendly iframe scrollbar hidden via width-overflow clip trick (width: calc(100% + 20px) inside overflow-hidden wrapper)
  sections/
    NavBar.tsx         # 'use client' — sticky, scroll-blur on >20px
    HeroSection.tsx    # 'use client' — parallax image grid + headline + CTAs
    WorkSection.tsx    # 'use client' — mosaic 3-column layout (2 cards per col, flex-col gap-[10px], items-start), opens ProjectModal
    ProcessSection.tsx # 'use client' — 3 clickable cards (serif watermark number, hover glow) in a horizontal flex row; connected by two mirrored curvy SVG lines (first dips down, second arcs up, no arrowhead); click opens inline ProcessStepModal with description + detail field
    TestimonialsSection.tsx  # 'use client' — 3-column grid (no cards), each column: first paragraph of quote only (split on \n\n), serif italic name + muted role below; bg-bg; columns divided by divide-x divide-border on md
    PricingSection.tsx # 'use client' — single unified panel (bg-bg border rounded-2xl), two columns divided by border-r; highlighted tier gets h-0.5 accent stripe at top; price in large font-serif with DollarSign icon; tier name in font-serif italic text-accent; ghost Button on lower tier, SpotlightButton on highlighted tier; all CTAs dispatch 'open-calendly' event
    ContactSection.tsx # 'use client' — dark bg (bg-text-primary); full-width serif heading (max-w-2xl) with italic text-accent-light accent word on last line; thin border-t border-white/10 divider below heading; flex row: subheading (text-white/50) left, SpotlightButton right; dispatches 'open-calendly'
    FooterSection.tsx  # server — logo, email, tagline; copyright year derived from new Date().getFullYear() (not hardcoded)

lib/
  data.ts              # ALL copy, projects, testimonials, pricing, process steps
  animations.ts        # Framer Motion variants: fadeUp, fadeIn, staggerContainer, scaleIn
  utils.ts             # cn() helper

types/
  index.ts             # Project, ProcessStep, Testimonial, PricingTier interfaces
```

## HeroSection — Current Implementation

The hero has a floating project image grid with a mouse-parallax effect. Key details:

- **Images**: 6 project screenshots in `public/projects/` named `*-work.png` (hero uses the same images as the work grid). Rendered via `next/image` with per-image `width={project.imageWidth}` and `height={project.imageHeight}` from `lib/data.ts`, `className="w-full h-auto"`, and `priority` (above the fold). Exact pixel dimensions stored on the `Project` interface — do not hardcode dimensions.
- **Parallax**: `useMotionValue` + `useSpring` (stiffness: 60, damping: 20) track the mouse position. Each image is a `CubeCard` component that calls `useTransform` to scale the spring by `v * cfg.depth * 8` (multiplier is 8 — intentionally subtle). Deeper images move more. **Do NOT use CSS transitions or `onMouseMove` + CSS custom properties for this** — it causes a snap on cursor stop.
- **CubeCard**: must be its own component (not inline in `.map()`) so `useTransform` is a valid hook call.
- **No float animation** — the old `animate={{ y: [0, -12, 0] }}` loop has been removed.
- **Image styles**: `rounded-lg`, `shadow-[0_4px_24px_rgba(124,58,237,0.25)]`, no opacity.
- **Grid background**: purple `rgba(124,58,237,0.08)` grid lines at `48px` spacing, with a radial mask that fades the center (keeping the text readable). Lives in an `absolute inset-0` div as the first child of the section.
- **Primary CTA**: uses `SpotlightButton`, NOT `Button`.
- **Secondary CTA** ("See the work"): plain `<a>` with `ArrowRight` icon, links to `#work`.

## SpotlightButton — Implementation Notes

- Used for high-emphasis CTAs: hero primary, pricing highlighted tier, and ContactSection. All other buttons use `Button.tsx`.
- Mouse tracking: `onMouseMove` writes `--x`/`--y` directly via `ref.current.style.setProperty` — zero React re-renders.
- `hovered` boolean state toggles only on `onMouseEnter`/`onMouseLeave` — only used for opacity transitions.
- Spotlight overlay: `radial-gradient(circle 130px at var(--x) var(--y))` fades in 150ms, out 300ms.
- Has a subtle `border-transparent hover:border-white/20` border that appears on hover.
- Renders as `<a>` when `href` is passed, `<button>` otherwise.

## Content & Data

**All copy lives in `lib/data.ts`.** Never hardcode strings in JSX. Exported constants:

- `NAV` — logo text, link labels, CTA label
- `HERO` — headline, headlineAccent, subheadline, cta, ctaSecondary
- `WORK_SECTION` + `PROJECTS` — 6 portfolio projects with id/name/tagline/url/image/imageWidth/imageHeight
- `PROCESS_SECTION` + `PROCESS_STEPS` — 3 process steps; each has `number`, `title`, `description` (card summary), `detail` (modal body — multi-paragraph, uses `\n\n`, rendered with `whitespace-pre-line`)
- `TESTIMONIALS_SECTION` + `TESTIMONIALS` — 3 real client testimonials (quote, name, role); quotes support `\n\n` paragraph breaks
- `PRICING_SECTION` + `PRICING_TIERS` — Landing Page ($500) and Full Website ($1,000); currency rendered as `<DollarSign />` icon
- `CONTACT_SECTION` — label, heading, headingAccent (split like HERO for italic accent word), subheading, cta, calendlyUrl (includes `?hide_gdpr_banner=1`)
- `FOOTER` — logo, email, note (no copyright field — year is derived at render time)

## Key Conventions

- `'use client'` — required on any component using hooks, browser APIs, or event handlers. All section components currently need it due to Framer Motion `whileInView`.
- **Framer Motion** — always `whileInView` with `viewport={{ once: true, margin: '-80px' }}`. Stagger with `staggerContainer` + `fadeUp` from `lib/animations.ts`.
- **Button** — always use `<Button>` from `components/ui/Button.tsx`. `SpotlightButton` is reserved for high-emphasis CTAs: hero, pricing highlighted tier, contact section.
- **CTA booking flow** — all "Book a call" buttons dispatch `window.dispatchEvent(new CustomEvent('open-calendly'))`. Never link to `#contact` for booking. `CalendlyModal` listens for this event and opens the popup.
- **Section IDs** — `id="work"`, `id="process"`, `id="pricing"`, `id="contact"`. Nav links use `#work`, `#process`, `#pricing`.
- **Calendly** — Script loaded in `app/layout.tsx` via `strategy="afterInteractive"` (preloads with page). URL + cookie param in `lib/data.ts`. `CalendlyModal` is always mounted (never conditionally rendered) so the embed stays alive across open/close cycles.
- **Scrollbar** — `scrollbar-gutter: stable` on `html` prevents layout shift on modal open. Custom thin purple scrollbar via `::-webkit-scrollbar` in `globals.css`.

## Deployed Portfolio Sites (Vercel)

Each portfolio project in `lib/data.ts` links to a live Vercel deployment. The naming convention is `winzer-<dirname>.vercel.app` where `<dirname>` is the folder name under `/Users/benwinzer/Desktop/Website Collection/websites/`.

| Project (data.ts) | Directory | Live URL |
|---|---|---|
| VOLTA | `volta` | `https://winzer-volta.vercel.app` |
| Anil Seth | `tedx` | `https://winzer-tedx.vercel.app` |
| SnipVault | `snip-vault` | `https://winzer-snip-vault.vercel.app` |
| Kai Nakamura | `photography` | `https://winzer-photography.vercel.app` |
| Jot | `jot` | `https://winzer-jot.vercel.app` |
| IRONSIDE | `ironside` | `https://winzer-ironside.vercel.app` |

Two additional sites are deployed but not currently featured in the portfolio:

| Directory | Live URL |
|---|---|
| `einaudi` | `https://winzer-einaudi.vercel.app` |
| `root-and-rise` | `https://winzer-root-and-rise.vercel.app` |

**To deploy a new site:** `cd` into its directory under `Website Collection/websites/` and run:
```
vercel --yes --prod --name winzer-<dirname>
```
Then add the resulting `https://winzer-<dirname>.vercel.app` URL to `lib/data.ts`.

## Placeholder Items (Ben to update before launch)

1. `lib/data.ts` → `CONTACT_SECTION.calendlyUrl` — verify this is the correct Calendly link
2. `lib/data.ts` → `FOOTER.email` — verify this is the correct email
