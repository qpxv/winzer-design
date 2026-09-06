# Global Coding Rules — Website Collection

These rules apply over any other rules and are top priority in any project.

---

## 1. Tailwind First — No Exceptions

**Always use Tailwind CSS utility classes for styling.** This means colors, spacing, typography, shadows, border-radius, transitions, responsive variants, and state variants.

The `style` prop is only acceptable for values that cannot be expressed as static Tailwind classes — e.g. a JS-computed pixel position (`left: cursorX + 'px'`), a runtime CSS variable write via `ref.current.style.setProperty`, or a `radial-gradient()` string that's too long for an arbitrary value. If you're reaching for `style={{}}` for a static design property, use a Tailwind class instead.

**Bad:**

```tsx
<div style={{ backgroundColor: '#7c6dfa', padding: '16px 24px', borderRadius: '8px' }}>
<div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
```

**Good:**

```tsx
<div className="bg-accent px-6 py-4 rounded-lg">
<div className="text-white text-sm font-semibold">
```

---

## 2. No Inline Event Handlers for Hover States

Never use `onMouseEnter`/`onMouseLeave` + `useState` to simulate CSS hover behavior. That pattern causes unnecessary re-renders and is what `hover:` variants exist for.

**Bad:**

```tsx
const [hovered, setHovered] = useState(false);
<button
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  style={{ background: hovered ? '#9585fc' : '#7c6dfa' }}
>
```

**Good:**

```tsx
<button className="bg-accent hover:bg-accent-hover transition-colors duration-200">
```

**The one real exception** — high-frequency mouse tracking that must be zero-re-render (e.g. a spotlight overlay following the cursor). In that case, write `--x`/`--y` CSS variables directly via `ref.current.style.setProperty` in `onMouseMove`. Only a `boolean` state for enter/leave is acceptable, and only to toggle `opacity`, never to recalculate positions.

---

## 3. CSS Group/Group-Hover for Parent-to-Child Hover

To react to a parent hover from a child element, use `group` on the parent and `group-hover:*` on the child. No JS needed.

```tsx
<div className="group">
  <div className="bg-border group-hover:bg-accent transition-colors" />
</div>
```

---

## 4. Generalize Repeated Components — Minimal Props

If a component is rendered more than once with structural similarities, extract it into a shared component and drive differences through props. The props list should contain only what **must** differ — keep it minimal. Never copy-paste a component with slight edits.

**Bad:**

```tsx
// TestimonialCard copied 3 times with different names/quotes inline
<div className="...">
  <p>"Quote one"</p>
  <span>Alice</span>
</div>
<div className="...">
  <p>"Quote two"</p>
  <span>Bob</span>
</div>
```

**Good:**

```tsx
// One TestimonialCard component, data-driven
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarId: number;
}
// Rendered from lib/data.ts array via .map()
```

Real examples from this codebase: `Button.tsx`, `PricingCard.tsx`, `FeatureCard.tsx`, `TestimonialCard.tsx`, `GlassButton.tsx`. If you're writing the same JSX structure twice, stop and extract.

---

## 5. All Copy and Data Live in `lib/data.ts` or `lib/constants.ts`

Never hardcode strings, numbers, lists, or copy inside component JSX. Export typed constants from the data file; components only read from it. This makes content edits a one-file change.

**Bad:**

```tsx
<h2>40,000+ designers trust VOLTA</h2>
<p>Start free. Upgrade when you're ready.</p>
```

**Good:**

```tsx
// lib/data.ts
export const HERO = {
  headline: '40,000+ designers trust VOLTA',
  subheadline: 'Start free. Upgrade when you\'re ready.',
}

// component
<h2>{HERO.headline}</h2>
<p>{HERO.subheadline}</p>
```

---

## 6. No Unicode Symbols or Emoji — Use Lucide React

Never use `→`, `↗`, `✦`, `·`, `•`, `★`, `♥`, `✓`, `×`, `⌘`, or any unicode decoration in JSX, data files, or CSS `content`. Always use the appropriate Lucide React icon.

| Replace       | With                              |
| ------------- | --------------------------------- |
| `→`           | `<ArrowRight />`                  |
| `↗`           | `<ArrowUpRight />`                |
| `✦`           | `<Sparkles />`                    |
| `·` separator | `<Dot />`                         |
| `✓` checkmark | `<CheckCircle2 />` or `<Check />` |
| `×` close     | `<X />`                           |

Import only what you use. No emoji anywhere in the codebase.

---

## 7. Design Tokens in `globals.css` — No Hardcoded Color Values in Components

All colors live as CSS custom properties inside `@theme {}` in `globals.css`. Tailwind v4 auto-generates utility classes from them. Never hardcode hex values in component class strings.

```css
/* globals.css */
@theme {
  --color-accent: #7c6dfa;
  --color-accent-hover: #9585fc;
}
```

```tsx
/* component */
<div className="bg-accent hover:bg-accent-hover">
```

The only acceptable use of raw hex in components is inside a `style` prop for a dynamic value that Tailwind can't express (e.g. a `radial-gradient()` with a runtime opacity). In that case, define it as a constant at the top of the file, not inline.

---

## 8. `'use client'` Only When Actually Needed

A component needs `'use client'` only if it uses: hooks (`useState`, `useEffect`, `useRef`, `useInView`, etc.), browser APIs, or event handlers. Server components can receive pre-rendered client children — that's not a reason to make the parent a client component.

Keep the boundary as deep as possible. If only one sub-component in a file needs interactivity, extract it into its own `'use client'` file instead of marking the whole section client.

---

## 9. Tailwind v4 Config Pattern

There is no `tailwind.config.ts`. All theme configuration lives in `globals.css` via `@theme {}`. Custom tokens use the `--color-*` prefix which auto-generates `bg-*`, `text-*`, `border-*` utilities.

```css
@theme {
  --color-surface: #111113;
  --color-accent: #7c6dfa;
}
/* Generates: bg-surface, text-surface, border-surface, bg-accent, text-accent, etc. */
```

Never create a `tailwind.config.ts` or `tailwind.config.js` in these projects.

---

## 10. Component Structure — Section Files Own Their Sub-Components

Each major page section lives in its own file (e.g. `HeroSection.tsx`, `PricingSection.tsx`). Internal sub-components (mockups, single-use UI pieces) are defined as private named functions inside that file. Extract to `components/ui/` only when a second section needs the same piece.

```tsx
// FeaturesSection.tsx — private sub-component, not exported
function AIChatPreview() { ... }

// Used only here:
export default function FeaturesSection() {
  return <FeatureCard preview={<AIChatPreview />} ... />
}
```

---

## 11. CSS filter: blur() — Never Toggle On/Off

Toggling `filter: blur()` on/off via opacity or conditional rendering causes a visible compositor flicker. Always keep the filter unconditionally applied; animate `opacity` only.

**Bad:**

```tsx
<span
  style={{ filter: hovered ? "blur(40px)" : "none", opacity: hovered ? 1 : 0 }}
/>
```

**Good:**

```tsx
<span
  style={{
    filter: "blur(40px)", // always present — never toggled
    opacity: hovered ? 1 : 0,
    transition: "opacity 250ms",
    willChange: "opacity",
  }}
/>
```

---

## 12. Framer Motion Conventions

- Scroll animations use `whileInView` with `viewport={{ once: true, margin: '-80px' }}` — not `useEffect` + scroll listeners.
- Cubic bezier arrays must be typed as `[number, number, number, number]` (tuple) to satisfy the `Easing` type.
- Animation variants (`fadeUp`, `staggerContainer`, etc.) live in `lib/animations.ts` — not defined inline in components.
- Never put `filter: drop-shadow` and `clip-path` on the same `motion.div` — compositing layers fight. Use a plain outer `div` for `filter` and a plain inner `div` for `clip-path`; only content rows inside should be `motion.div`.

---

## 13. No next/image for Decorative Elements

Decorative shapes, gradients, and backgrounds are Tailwind `div` elements — not `<img>` or `<Image>`. Only use `next/image` for real content images (photos, avatars, product screenshots).

---

## 14. Buttons Are Shared Components

Every project has a `Button.tsx` (or equivalent). Use it — never recreate button markup inline. Hover/focus/active states belong in the Button component's CSS via Tailwind `hover:`, `focus:`, `active:` variants. No Framer Motion tap effects on `<button>` — they cause subpixel text shifts. If a specialized button is needed (e.g. `SpotlightButton`), it lives in `components/ui/` and is used everywhere that button appears.

---

## 15. No External UI Libraries

No shadcn, Radix UI, MUI, Chakra, or similar. All components are purpose-built with Tailwind. The only approved third-party component/icon libraries are `lucide-react` and `framer-motion`.

---

## 16. Tailwind Cascade Layer Gotcha

Tailwind v4 emits utilities inside `@layer utilities`. Any unlayered rule in `globals.css` (e.g. a `*` reset) **beats every Tailwind utility** regardless of specificity. Never write `* { margin: 0; padding: 0 }` outside a layer — Tailwind's preflight already handles it inside `@layer base`. If you ever see `px-*` / `py-*` stop working while `flex` and `grid` still work, suspect an unlayered universal rule in `globals.css`.

---

## 17. Icons from lucide-react — Verify Before Use

Several Lucide icon names changed in v1. Always verify an icon exists before importing it.

Known renames/removals: `Twitter` → `X`, `Github` → removed, `Linkedin` → removed.

Safe icons across all projects: `ArrowRight`, `ArrowUpRight`, `Sparkles`, `CheckCircle2`, `Check`, `Lock`, `ShieldCheck`, `CreditCard`, `Menu`, `X`, `Zap`, `Dot`, `ArrowLeft`, `Home`, `Command`, `ChevronDown`, `ChevronRight`.

---

## 18. clsx / cn() for Conditional Classes

Use `clsx` or the project's `cn()` helper (from `lib/utils.ts`) for conditional class merging. Never build class strings with template literals or string concatenation.

**Bad:**

```tsx
<div className={`card ${isActive ? 'border-accent' : 'border-default'}`}>
```

**Good:**

```tsx
<div className={cn('card', isActive ? 'border-accent' : 'border-default')}>
```

---

## 19. TypeScript — No `any`

All props, data shapes, and function signatures must be typed. Define interfaces in `types/index.ts` for shared shapes. Use `ReactNode` for children/slot props. Never use `any` or `as any`.

---

## 20. Default Exports on Components

Every component file uses a default export. Named exports are for types, constants, and utility functions only.

---

## 21. Dev-Indicators false

Every Project has the Development indicators inside next.config.ts set to false.

```tsx
const nextConfig: NextConfig = {
  devIndicators: false,
};
```

---

## 22. Navbar Layout — `grid-cols-[auto_1fr_auto]`, Never `justify-between` or Equal `grid-cols-3`, for a Centered Middle Nav

Never build a navbar with `flex justify-between` across three children (logo, nav links, CTA/hamburger). That only centers the middle nav links when the logo and the right-side content happen to be the same width — in practice they rarely are, so the links visibly drift toward whichever side is narrower.

Equal `grid-cols-3` (three `1fr` tracks) is also not safe as a default — it only works when the logo and CTA text are both short. If the logo/site name is long (e.g. "Primary Tutoring Wisconsin"), an equal third is too narrow for it, and the middle nav column gets squeezed even smaller, causing link labels to wrap and the whole thing to look off-center again.

Always use `grid-cols-[auto_1fr_auto]`: logo column sized to its own content, nav column takes the true remaining space with `justify-center`, CTA/hamburger column sized to its own content with `justify-end`. This centers the nav links in the actual leftover space regardless of how wide the logo or CTA area is, and never causes wrapping.

**Bad (asymmetric side content breaks centering):**

```tsx
<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
  <Logo />
  <nav className="hidden md:flex gap-8">{links}</nav>
  <Button />
</div>
```

**Also bad (equal thirds break when logo/CTA text is long):**

```tsx
<div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-4">
  <Logo />
  <nav className="hidden items-center justify-center gap-8 md:flex">
    {links}
  </nav>
  <Button />
</div>
```

**Good:**

```tsx
<div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-4 px-6 py-4 md:grid-cols-[auto_1fr_auto]">
  <Logo />
  <nav className="hidden items-center justify-center gap-8 md:flex">
    {links}
  </nav>
  <div className="flex items-center justify-end gap-4">
    <Button />
    <MobileMenuToggle />
  </div>
</div>
```

Note the mobile fallback: on small screens `nav` is `hidden` so it doesn't participate in grid layout, leaving a simple 2-column `[auto_1fr]` (logo + hamburger). At `md:` it becomes 3 columns.

## 23. Faces Always Come From randomuser.me

Any time a design needs a human face (testimonial authors, tutor/team/staff cards, "trusted by" avatars, hero mockups, avatar stacks), use **randomuser.me** portraits. Never use DiceBear, cartoon/illustrated avatar generators, initials placeholders, `pravatar.cc`, `generated.photos`, or `thispersondoesnotexist.com`.

- URL shape: `https://randomuser.me/api/portraits/{men|women}/{0-99}.jpg` (thumbnails: `.../portraits/thumb/...`).
- Pick a fixed integer per person so the face is **stable** across reloads. Store the URL in `lib/data.ts` alongside the rest of that person's data, built via a small `buildAvatarUrl(gender, index)` helper.
- Match the `men` / `women` path to the person's name so the photo isn't jarring.
- Render with a plain `<img>` (these are external, non-optimizable), add `loading="lazy"`, and give real `alt` text like `Portrait of {name}`.
- These are real donated stock photos, not synthetic faces. Add a one-line comment noting the placeholder and that it should be swapped for a real photo when available.

---

## 24. Git — This Repo Is Standalone

`winzer.design` is its own git repository (remote: `github.com/qpxv/winzer-design`, private), not part of the `website-collection` monorepo. Ignore the collection-wide "commit from the `websites/` monorepo" rule here.

- Commit and push directly from this repo's root (`~/Projects/winzer.design/`).
- Committing straight to `main` is fine (personal project, no PR workflow).
- Only commit or push when explicitly asked.
- Conventional commit prefixes, imperative mood, one logical change per commit. No need for a `feat(winzer):` scope since the whole repo is this one site.

---

## 25. Home Page Hero Is Always Full Viewport Height

The hero section on the home/landing page (the very first section, whether it's a single-page site or the `/` route of a multi-page site) must always fill the full viewport height, at any window size, not just size to its own padding/content.

```tsx
<section className="relative flex min-h-screen items-center overflow-hidden ...">
  <div className="mx-auto w-full max-w-6xl ...">
    {/* hero content */}
  </div>
</section>
```

- `min-h-screen` on the hero `<section>`, `flex items-center` to vertically center the content within it instead of relying on top/bottom padding to reach full height.
- Add `w-full` to the inner content wrapper so it doesn't shrink to content width once the parent is a flex container.
- This rule is for the home/landing page hero only. Secondary page heroes (About, Contact, Services, etc.) are not required to be full viewport height.

---

## 26. One-Knob Theming — Single Source of Truth, Derive Don't Repeat

The accent color is a **single source of truth**: one `--color-accent` line in `globals.css @theme {}`. Every other themeable value derives from it, so re-skinning a whole site (purple to blue, to near-black, etc.) is a one-line change. Extends rule 7.

- **Accent shades** (`--color-accent-hover`, `-light`, `-muted`, `--color-btn-primary`) are `color-mix(in oklab, var(--color-accent), black|white <n>%)` — never independent hex values that silently drift when the accent changes.
- **Neutral ground** (`--color-bg`, `--color-surface`, `--color-border`) is a faint tint of the accent: `color-mix(in oklab, var(--color-accent) <n>%, white)`. Keeps the palette cohesive across accent swaps.
- **Accent-tinted shadows** are theme tokens too: `--shadow-accent-sm` / `-md` / `-lg` in `@theme` generate `shadow-accent-*` utilities. Never write `shadow-[0_32px_90px_-32px_rgba(124,58,237,0.4)]` in a class string.
- **Accent-tinted gradients / grid overlays / glows** in `style` props or JS string constants must reference `var(--color-accent)` via `color-mix(in srgb, var(--color-accent) <n>%, transparent)` — never a hardcoded `rgba()` of the accent.
- Text colors stay neutral (near-black / grey), not derived.
- Before finishing any theming work, grep the codebase: the accent hex and `rgba(<accent-rgb>` must appear **nowhere** except the one `--color-accent` line.

**Bad:**

```css
--color-accent: #7c3aed;
--color-accent-hover: #6d28d9;   /* independent value — drifts on re-skin */
```

```tsx
<div className="shadow-[0_32px_90px_-32px_rgba(124,58,237,0.4)]" />
```

**Good:**

```css
--color-accent: #7c3aed;                                    /* the only knob */
--color-accent-hover: color-mix(in oklab, var(--color-accent), black 14%);
--color-surface:      color-mix(in oklab, var(--color-accent) 6%, white);
--shadow-accent-lg:   0 32px 90px -32px color-mix(in srgb, var(--color-accent) 40%, transparent);
```

```tsx
<div className="shadow-accent-lg" />
```
