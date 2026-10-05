import { ArrowDown } from "lucide-react";
import { BOOKING_URL, HERO } from "@/lib/data";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ProjectWall from "@/components/work/ProjectWall";

// Two buttons side by side fit a 390px phone at this size; stacked, they push the hero past the fold.
const COMPACT_ON_PHONE = "max-sm:h-12 max-sm:px-5 max-sm:text-[0.95rem]";

export default function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-clip pt-24 pb-10 short-phone:pt-[4.6rem]">
      <ProjectWall />
      <div className="relative mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Reveal className="relative z-10 text-center">
          <h1 className="font-display text-[clamp(2.6rem,min(7vw,10.5vh),7.2rem)]/[0.92] font-medium tracking-[-0.055em] text-balance text-ink short-phone:text-[2.15rem]/[0.98]">
            {HERO.headline}{" "}
            <span className="text-accent">{HERO.headlineAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[34rem] text-[1.06rem]/[1.6] text-ink-muted short-phone:mt-4 short-phone:text-[0.96rem]/[1.5]">
            {HERO.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 short-phone:mt-5 sm:gap-3">
            <Button href={BOOKING_URL} size="lg" className={COMPACT_ON_PHONE}>
              {HERO.cta}
            </Button>
            <Button href="#work" variant="outline" size="lg" className={COMPACT_ON_PHONE}>
              {HERO.ctaSecondary}
              <ArrowDown className="size-4 transition-transform duration-300 group-hover/button:translate-y-0.5" />
            </Button>
          </div>
          <p className="mt-4 text-[0.88rem]/[1.5] text-ink-soft short-phone:mt-3 short-phone:text-[0.82rem]/[1.4]">{HERO.guarantee}</p>

          <dl className="mx-auto mt-8 flex w-fit justify-center gap-8 border-t border-line pt-6 short-phone:mt-5 short-phone:pt-4 lg:mt-10">
            {HERO.proof.map((stat) => (
              <div key={stat.label} className="max-w-[12rem] text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[1.9rem]/[1] font-medium tracking-[-0.03em] text-ink short-phone:text-[1.5rem]/[1]">{stat.value}</dd>
                <dd className="mt-1.5 text-[0.86rem]/[1.35] text-ink-muted short-phone:text-[0.8rem]/[1.3]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
