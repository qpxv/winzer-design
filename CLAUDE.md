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

## 22. Navbar Layout — `grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]`, Never `justify-between`, Equal `grid-cols-3`, or `[auto_1fr_auto]`, for a Page-Centered Middle Nav

Never build a navbar with `flex justify-between` across three children (logo, nav links, CTA/hamburger). That only centers the middle nav links when the logo and the right-side content happen to be the same width — in practice they rarely are, so the links visibly drift toward whichever side is narrower.

Equal `grid-cols-3` (three `1fr` tracks) is also not safe as a default — it only works when the logo and CTA text are both short. If the logo/site name is long (e.g. "Primary Tutoring Wisconsin"), an equal third is too narrow for it, and the middle nav column gets squeezed even smaller, causing link labels to wrap and the whole thing to look off-center again.

`grid-cols-[auto_1fr_auto]` is the trap, because it looks correct and is not. It centers the nav **within the leftover space** between the logo and the CTA, not on the page. Whenever the logo and the CTA are different widths (almost always, since a wordmark and a button plate rarely match), the midpoint of that leftover space is not the midpoint of the page, and the links sit visibly off-center toward the narrower side. This was caught on a real build: a navbar carrying a comment citing this very rule, with a 92px logo and a 200px CTA, put its links about 55px left of the page center.

Always use `grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]`: the nav column is `auto`, so it takes exactly the width its links need and never wraps, and the two outer tracks are equal, so whatever space is left is split evenly and the nav lands on the true page center regardless of how wide the logo or the CTA is. `minmax(0,1fr)` rather than a bare `1fr` so a long wordmark shrinks its own track instead of overflowing it.

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

**Also bad (centers in the leftover space, not on the page):**

```tsx
<div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-4 px-6 py-4 md:grid-cols-[auto_1fr_auto]">
  <Logo />
  <nav className="hidden items-center justify-center gap-8 md:flex">{links}</nav>
  <div className="flex items-center justify-end gap-4">
    <Button />
  </div>
</div>
```

**Good:**

```tsx
<div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-4 px-6 py-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
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

Verify rather than assume: screenshot the page at desktop width and check that the midpoint of the link row matches the midpoint of the viewport. A comment in the code claiming to follow this rule is not evidence that it does.

## 23. Faces Always Come From randomuser.me

Any time a design needs a human face (testimonial authors, tutor/team/staff cards, "trusted by" avatars, hero mockups, avatar stacks), use **randomuser.me** portraits. Never use DiceBear, cartoon/illustrated avatar generators, initials placeholders, `pravatar.cc`, `generated.photos`, or `thispersondoesnotexist.com`.

- URL shape: `https://randomuser.me/api/portraits/{men|women}/{0-99}.jpg` (thumbnails: `.../portraits/thumb/...`).
- Pick a fixed integer per person so the face is **stable** across reloads. Store the URL in `lib/data.ts` alongside the rest of that person's data, built via a small `buildAvatarUrl(gender, index)` helper.
- Match the `men` / `women` path to the person's name so the photo isn't jarring.
- Render with a plain `<img>` (these are external, non-optimizable), add `loading="lazy"`, and give real `alt` text like `Portrait of {name}`.
- These are real donated stock photos, not synthetic faces. Add a one-line comment noting the placeholder and that it should be swapped for a real photo when available.

---

## 24. Commit From the `websites/` Monorepo, Never Per-Project

All site projects live inside `~/Projects/Website Collection/websites/`, which is a single git repo (remote: `github.com/qpxv/website-collection`, private). The individual project folders (`ironside`, `jot`, `volta`, `tedx`, etc.) are **not** their own git repos anymore.

When asked to commit (or push), always do it from `~/Projects/Website Collection/websites/`:

- `cd` to the `websites/` root, stage the changes there, and make one commit covering whatever was worked on.
- Never run `git init` or `git commit` inside an individual project folder, and never treat a project folder as a standalone repo.
- Push goes to `origin/main` of the `website-collection` repo.
- Scope the commit message to the project(s) actually changed, e.g. `feat(volta): redesign footer`.

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

**Full viewport height means EQUAL to the viewport, never taller.** A hero that overflows the fold breaks this rule just as badly as one that is too short, and it is far harder to see: a full-page screenshot of an over-tall hero is pixel-identical to a correct one, because the fold is never drawn. The bottom of the hero, often its call to action, is simply cut off on that person's screen.

The trap is the interaction between `items-center` and top padding:

- Padding moves the centred content by only **half** its value (`top = pt + (available - contentHeight) / 2`), but it adds its **full** value to the section's height.
- So "push the headline down a bit" tempts you into a large `pt-*`, which barely moves the content and quietly makes the section taller than the window.
- Tuned on a 1080px screen it looks right; at 700px (a 13" laptop with browser chrome and a dock) the hero overflows.

Use a fluid top padding that collapses on short windows, and let the centring do the rest:

```tsx
/* clears the absolute navbar on a short window, generous on a tall one */
<section className="flex min-h-screen items-center pt-28 pb-12 lg:pt-[max(6rem,13vh)] lg:pb-10">
```

Verify by measuring, not by looking: check `section.getBoundingClientRect().height <= window.innerHeight` at 700, 900 and 1080px tall. One screenshot at one window size cannot tell you.

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

---

## 27. Monospace Sparingly, and No Eyebrow Labels

Two habits that read as "AI generated site" at a glance, on an otherwise good page.

**Monospace is for terminal content only.** A mono face is hard to read at small
sizes, the same way a serif like Times is: it is fine for a few words and
punishing for a whole interface. Use it only where the content genuinely IS
terminal or code: a terminal transcript, a command, a file name, a literal
CLI/skill identifier. Everywhere else, use the body sans, at a readable size
(0.85rem and up), sentence case.

Not monospace: nav links, buttons, captions under a form, social-proof lines
("Over 1,502 founders…"), stat labels, table headers and cells, card labels,
footer links, footer legal lines, error/404 codes, form validation messages.
Small-caps + wide `tracking-[0.2em]` mono is the specific combination to avoid;
it turns every label on the page into the same stamp.

**No eyebrow labels above section headings.** The little `01 —— SECTION NAME`
marker (a number, a hairline rule, a tiny tracked uppercase label) stamped above
every heading is one of the clearest tells of a page assembled from one
component. Drop it. Let the headline open the section and carry the spacing the
eyebrow used to occupy. This includes the hero's badge pill and numbered section
markers.

**Bad:**

```tsx
<p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
  01 — What is in the pack
</p>
<h2>Two of them do the work above.</h2>
```

```tsx
<a className="font-mono text-[0.72rem] uppercase tracking-[0.18em]">The run</a>
```

**Good:**

```tsx
<h2>Two of them do the work above.</h2>
```

```tsx
<a className="text-[0.92rem] font-medium text-ink-70">The run</a>
```

```tsx
{/* mono earns its place here: this is a real terminal transcript */}
<pre className="font-mono text-[0.8rem]">{session.output}</pre>
```

When an eyebrow is removed, check the section's top padding: the eyebrow was
often supplying it, and the heading will otherwise sit flush against the
section boundary.

---

## 28. `cn()` Can Silently Drop a Class — Pin Line-Height to the Font-Size Utility

`cn()` merges with tailwind-merge, which resolves *conflicting* utilities by keeping the last one. It sometimes treats an arbitrary `text-[<length>]` as also owning line-height, so a `leading-*` class in the same merge is **dropped with no error and no warning**. The class simply is not in the rendered `class` attribute, the element keeps the font's default `line-height: 1.5`, and every vertical measurement downstream is wrong.

This is the same family of trap as rule 16: nothing fails, the styling is just quietly not what the code says. It was caught on a real build only by reading `getComputedStyle()` — a row of stat numbers refused to align no matter how the container was changed, because `leading-[0.85]` had never applied.

**Bad** — `leading-[0.85]` vanishes when merged with the conditional `text-[…]`:

```tsx
<span className={cn(
  "font-display leading-[0.85]",
  isLast ? "text-[4.2rem]" : "text-[3.2rem]"
)} />
```

**Good** — line-height rides along with the font size, so nothing can separate them:

```tsx
<span className={cn(
  "font-display",
  isLast ? "text-[4.2rem]/[0.85]" : "text-[3.2rem]/[0.85]"
)} />
```

Applies to any `size/line-height` pair: `text-sm/6`, `text-[2.1rem]/[1.04]`. More generally: when a class you wrote is not doing anything, read the element's actual `class` attribute and computed style before changing the layout around it. A class that is present in the source is not evidence that it survived the merge.

---

## 29. A Hover Target Is the Content, Not the Track It Sits In

An interactive element (a link, a logo lockup, a text button) must be exactly as
wide as the thing you can see. Flex and grid both stretch their children across
the full line by default (`align-items: stretch`, `justify-items: stretch`), so
an `<a>` or a `<Link>` placed directly in a flex column or a grid track silently
becomes a full-width hit area. Nothing looks wrong in a screenshot: the hover
state simply fires with the cursor 200px to the right of the label, on empty
card padding, which reads as broken to anyone paying attention.

`inline-flex` does **not** save you here. It sets the element's *inner* layout;
the parent still stretches its outer box.

Fix it at the child, so the element is self-contained and cannot be broken by a
later change to the parent:

- flex parent: add `w-fit self-start` (or `items-start` on the parent when
  every child should behave that way)
- grid parent: add `w-fit justify-self-start`

**Bad** — fills the whole card / the whole `1fr` track:

```tsx
<aside className="flex h-full flex-col justify-between">
  <a className="group inline-flex items-center gap-1.5 text-accent hover:text-accent-hover">
    Sign me up <ArrowRight className="size-4" />
  </a>
</aside>
```

**Good:**

```tsx
<a className="group inline-flex w-fit self-start items-center gap-1.5 text-accent hover:text-accent-hover">
  Sign me up <ArrowRight className="size-4" />
</a>
```

Verify by measuring, not by hovering once near the label: compare the element's
box to its container's.

```js
el.getBoundingClientRect().width; // must be the content width
el.parentElement.getBoundingClientRect().width; // not this
```

Real cases in this codebase: a navbar logo in a `minmax(0,1fr)` grid track
(111px of wordmark, 600px+ of hover), and a "Sign me up" link in a flex column
card (98px of link, 290px of hover). Both looked correct on screen.

### `self-start` Is Only Correct In A Flex Column. Anywhere Else It Moves The Element.

The recipes above are not interchangeable, and picking the wrong one does not
fail loudly: it silently introduces a *different* bug, vertical misalignment,
while leaving the width problem unfixed.

`self-start` sets `align-self`, which acts on the **cross axis** in flex and on
the **block (vertical) axis** in grid. That is the axis you wanted only in a
flex *column*, where the cross axis happens to be horizontal. In a flex row or
in any grid, `align-self: start` overrides the parent's `items-center` and
pins the element to the top of its row.

| parent | recipe | why |
| --- | --- | --- |
| flex column | `w-fit self-start` | cross axis is horizontal, so `self-start` constrains width |
| flex row | `w-fit` alone | row items already size to content horizontally; `self-start` would only pin them to the top |
| grid | `w-fit justify-self-start` | `justify-self` is the inline (horizontal) axis; `align-self` stays centred |

Real case: the Ascenxion navbar logo carried `w-fit self-start` inside a
`grid ... items-center` row. The wordmark's centre sat at y=29.8 while the nav
links and the CTA sat at y=38.6, so the logo floated **8.8px above everything
else**, and because `self-start` does nothing to the inline axis in grid, the
oversized hover target it was added to fix was never fixed either. The class
string looked like compliance with this very rule.

**Verify both axes.** The width check above passes happily on an element that
is vertically wrong, which is exactly how this survived a full review pass:

```js
const r = el.getBoundingClientRect();
const peer = sibling.getBoundingClientRect(); // a nav link, a button, any row-mate

r.width; // the content width, not the track's
(r.top + r.bottom) / 2 - (peer.top + peer.bottom) / 2; // must be ~0
```

If you are reaching for `self-start`, first read the parent's `display`. A
screenshot will not show you an 8px offset, and neither will a width assertion.

---

## 30. Section Headings and Their Buttons Center on Mobile

On desktop a left-aligned heading reads as editorial, because the column
beside it balances it. On a phone the column is the whole screen, so a
left-aligned heading with a short last line, a left-aligned intro and a lone
button hugging the left edge leave a ragged empty right side and look
unfinished. Below `md`, center the section's introduction: the heading, its
intro paragraph, and the call-to-action row under it.

- Headings and intro copy: `max-md:text-center`. A paragraph with a `max-w-*`
  also needs `max-md:mx-auto`, or its block stays pinned left while the text
  inside centers.
- Button rows and other flex rows: `max-md:justify-center`. In a flex column
  use `max-md:items-center`.
- Inline-flex pills or badges with `w-fit`: `max-md:mx-auto max-md:flex`, since
  auto margins do nothing on an inline box.
- Leave body content left-aligned: cards, accordion questions and answers,
  testimonial notes, stat rows, lists. Long centered text is harder to read,
  and a card's title stays aligned with the copy under it.

```tsx
<Reveal className="max-md:text-center">
  <h2>{CALL.heading}</h2>
  <p className="mt-7 max-w-xl max-md:mx-auto">{CALL.body}</p>
  <div className="mt-9 flex flex-wrap gap-4 max-md:justify-center">
    <Button />
  </div>
</Reveal>
```

Check it at 390px wide: the heading, the intro and the buttons share one
center line, and nothing inside a card has moved.

---

## 31. Headings Are Plain Phrases: No Full Stops, No Comma Slogans

Two heading habits read as AI-generated copy at a glance, on any page.

**No full stop at the end of a heading, ever.** That covers the hero
headline, every section `h2`, card titles, error and 404 headings, and the
headline baked into the Open Graph image. A heading is a label, not a
sentence, and a period on it is the stamp of a page written by a model.
Question marks are fine when the heading genuinely is a question.

**No comma-stacked slogan fragments.** "Launch day, shipped", "Kind words,
pinned up", "Made to be watched, not scrolled past", "Bold, fast, yours":
two or three clipped beats joined by commas. It is the most recognisable
copy pattern on generated sites, and it says nothing specific. Write the
heading as one plain phrase that says what the section shows, the way a person
would label it out loud.

**Bad:**

```ts
heading: "Launch day, shipped.",
heading: "Kind words, pinned up.",
heading: "Straight off the feed.",
```

**Good:**

```ts
heading: "Recent client launches",
heading: "What our clients say",
heading: "Latest work from our X feed",
```

Before calling copy done, grep the data file for headings and titles that end
in `.` or contain a comma, and rewrite each one. A name that genuinely
contains a comma (a company called "Smith, Jones & Co") is the only exception.

---

## 32. Restraint: Quiet Decoration, Quiet States

A premium site is mostly what it leaves out. Each of these was added on a real
build, read as "trying too hard", and was removed again.

- **Decorative motifs frame media, never type, buttons or the logo.** A
  signature motif (corner brackets, crosshairs, a viewfinder, a squiggle) can
  frame an image, a video or a portrait. Put on a headline word, a button or
  the logo mark, it turns the motif into a gimmick. Highlight a headline word
  with colour alone.
- **Display type is refined, not loud.** Default to a calm grotesk at a medium
  weight (500 to 600) for headings. Chunky, quirky or extra-bold display faces
  read as playful and cheap unless the brand itself is playful.
- **Background texture barely registers.** Dot grids, noise, glows and
  halftones sit behind one area and fade out early (a mask ending around
  50 to 60% of its box), never across a whole section. If the texture is the
  first thing you notice, it is too strong.
- **Interactive states change colour and border, nothing more.** No glow or
  accent shadow behind an open accordion item, no scale-up on hover, no
  pausing a marquee on hover. Hover and open states are a quiet confirmation,
  not an event.
- **Match density across sections.** A new section (FAQ, cards, a form) uses
  the same padding and type scale as its neighbours. If it looks puffier than
  the rest of the page, tighten it before shipping.

---

## 33. Layout Behaviour: Nothing Jumps, One Ask Per Area

- **Interacting never moves anything else.** Opening an accordion, expanding a
  card or loading more must not shift a heading or a column beside it. Do not
  put a sticky column next to content that grows. If you need sticky, note
  that `overflow-hidden` on any ancestor makes that ancestor the scroll
  container and silently breaks it; use `overflow-clip` to clip instead.
  Verify by toggling the content open in place (`el.open = true`, not a
  Playwright click, which scrolls) and measuring the neighbour's
  `getBoundingClientRect().top` before and after.
- **One call to action per area.** Do not add a CTA row to a section that sits
  next to the final call-to-action section, and keep the footer to the logo,
  a one-line description, links and the copyright. Two identical asks in a row
  read as pushy and dilute the real one.
- **Logo marquees are logos only**, in the brands' own colours, scrolling
  continuously, with no hover pause or scale. Pause them offscreen and when the
  tab is hidden (Battery rules).
- **Video or animated previews return to their poster** when the pointer
  leaves. A tile frozen on a random mid-frame looks broken.
- **Horizontal carousels get arrow buttons and mouse drag** with snapping, not
  just a scrollbar. Desktop mice cannot scroll sideways.
- **On phones the navbar is fixed to the top with the primary CTA in it.** On a
  long page the ask must stay one tap away; on desktop it can scroll away with
  the hero.
- **Social proof by the hero CTA is "Trusted by" plus logo marks**, overlapping,
  most recognisable brand in front, with no list of names beside them. The
  logos carry it.

---

## 34. Copy Is Honest, Specific and Written for the Real Buyer

- **Write for whoever signs off the purchase**, in their terms. A studio that
  serves funded companies talks to product and marketing teams about launches,
  brand fit and deadlines, not to solo founders about "getting attention".
- **Cut details that undermine credibility.** A "concept" or "spec" label on
  every tile, a caption explaining that work was unpaid, a "made this in 5
  days" anecdote: disclose once, in the section intro, and let the work stand.
- **Placeholders are allowed only when visibly marked.** If the client has not
  supplied something a page needs (pricing, timelines, FAQ answers), invented
  content may stand in, but the page shows a small badge saying so, and
  `lib/data.ts` carries a comment listing what must be confirmed and how to
  remove the badge. Never present invented figures as real.
- **Reproduce real posts and testimonials faithfully, trimmed of bystanders.**
  Keep the words verbatim, and drop @-mentions or names of people who are not
  part of the endorsement.
- **Date live figures.** Follower counts, view counts and similar numbers get a
  comment with the date they were read and a note to refresh before
  publishing.

---
