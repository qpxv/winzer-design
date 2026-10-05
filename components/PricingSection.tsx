import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOKING_URL, PRICING, PROJECTS } from "@/lib/data";
import { SCREENSHOT_QUALITY } from "@/lib/constants";
import type { PricingTier } from "@/types";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import BrowserFrame from "@/components/ui/BrowserFrame";
import ProjectGlow from "@/components/work/ProjectGlow";
import ProcessStages from "@/components/pricing/ProcessStages";

// Windows behind the front one, nearest first: each sits a step higher and narrower, and a
// little darker, so the stack reads as depth while every window stays solid. The steps are
// margins, which resolve against the width like the headroom above, so each step uncovers
// exactly one address bar at any card size.
const BEHIND = ["mt-[9%] scale-x-[0.94] brightness-[0.8]", "scale-x-[0.88] brightness-[0.6]"];

/** The tier's build in a Safari window, with a window per subpage stacked behind it. */
function TierWindows({ tier }: { tier: PricingTier }) {
  const project = PROJECTS.find((item) => item.id === tier.preview.projectId);
  if (!project) return null;
  return (
    // The same headroom on every tier, so the names and prices below line up across cards.
    <div className="relative isolate pt-[18%]">
      <ProjectGlow project={project} />
      {tier.preview.subpages
        .map((subpage, index) => (
          <div key={subpage} aria-hidden className={cn("absolute inset-x-0 top-0 origin-top", BEHIND[index])}>
            <BrowserFrame domain={`${project.domain}/${subpage}`} tone="dark" isWidescreen>
              <div className="size-full bg-chrome-dark" />
            </BrowserFrame>
          </div>
        ))
        .reverse()}
      <div className="relative">
        <BrowserFrame domain={project.domain} tone="dark" isWidescreen>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            quality={SCREENSHOT_QUALITY}
            sizes="(min-width: 768px) 560px, 90vw"
            className="size-full object-cover object-top"
          />
        </BrowserFrame>
      </div>
    </div>
  );
}

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "group flex w-full flex-col overflow-clip rounded-[2rem] bg-night-raised p-6 sm:p-9",
        tier.isHighlighted ? "shadow-accent-lg ring-2 ring-accent" : "ring-1 ring-snow-line"
      )}
    >
      <TierWindows tier={tier} />
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <h3 className="font-display text-[1.6rem]/[1.1] font-medium tracking-[-0.03em]">{tier.name}</h3>
        {tier.isHighlighted && (
          <span className="rounded-full bg-accent px-3 py-1 text-[0.8rem] font-medium text-white">{PRICING.recommendedLabel}</span>
        )}
      </div>
      <p className="mt-4 flex items-start gap-1 font-display text-[clamp(3.6rem,6vw,5rem)]/[0.9] font-medium tracking-[-0.055em]">
        <span className="mt-[0.2em] text-[0.3em] text-snow-muted">{PRICING.currency}</span>
        {tier.price}
      </p>
      <p className="mt-5 text-[0.98rem]/[1.55] text-snow-muted">{tier.description}</p>
      <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-snow-line pt-7">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-[0.98rem]/[1.4]">
            <Check className="mt-0.5 size-4.5 shrink-0 text-accent-light" strokeWidth={2.4} />
            {feature}
          </li>
        ))}
      </ul>
      <Button href={BOOKING_URL} variant={tier.isHighlighted ? "primary" : "snow"} className="mt-9 w-full">
        {PRICING.cta}
      </Button>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-night py-24 text-snow sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl max-md:text-center">
          <h2 className="font-display text-[clamp(2.4rem,4.6vw,4rem)]/[0.98] font-medium tracking-[-0.045em] text-balance">{PRICING.heading}</h2>
          <p className="mt-5 max-w-[26rem] text-[1.05rem]/[1.6] text-snow-muted max-md:mx-auto">{PRICING.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20">
          {PRICING.tiers.map((tier, index) => (
            <Reveal key={tier.id} delay={index * 0.1} className="flex">
              <TierCard tier={tier} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5 flex flex-col gap-4 rounded-[2rem] p-7 ring-1 ring-snow-line sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <h3 className="font-display text-[1.35rem]/[1.1] font-medium tracking-[-0.025em]">{PRICING.retainer.name}</h3>
            <p className="mt-2 text-[0.96rem]/[1.55] text-snow-muted">{PRICING.retainer.description}</p>
          </div>
          <p className="flex shrink-0 items-baseline gap-1.5">
            <span className="text-[0.9rem] text-snow-muted">{PRICING.retainer.prefix}</span>
            <span className="font-display text-[2.6rem]/[1] font-medium tracking-[-0.04em]">
              {PRICING.currency}
              {PRICING.retainer.price}
            </span>
            <span className="text-[0.95rem] text-snow-muted">{PRICING.retainer.cadence}</span>
          </p>
        </Reveal>
        <p className="mt-6 text-[0.95rem] text-snow-muted max-md:text-center">{PRICING.note}</p>

        <div className="mt-24 sm:mt-32">
          <ProcessStages />
        </div>
      </div>
    </section>
  );
}
