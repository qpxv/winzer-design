import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BERLIN_CASE, BOOKING_URL, RESULTS, TYLER_CASE } from "@/lib/data";
import type { Stat } from "@/types";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/results/CountUp";
import ScrollStory, { type StoryStep } from "@/components/results/ScrollStory";

const BODY = "text-[1.15rem]/[1.65] text-ink-muted";

function StepText({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="text-[0.95rem] font-semibold text-accent">{label}</h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function StoryIntro({ client, role, heading }: { client: string; role: string; heading: string }) {
  return (
    <div className="max-md:text-center">
      <p className="text-[0.95rem] text-ink-muted">
        {client}, {role}
      </p>
      <h3 className="mt-2 max-w-3xl font-display text-[clamp(1.9rem,3.6vw,3rem)]/[1.04] font-medium tracking-[-0.035em] text-balance text-ink">{heading}</h3>
    </div>
  );
}

// The quotes are real messages from clients, so they are set as one: a chat bubble, name underneath.
function Quote({ text, name, detail }: { text: string; name: string; detail: string }) {
  return (
    <figure>
      <blockquote className="rounded-[1.4rem] rounded-bl-md bg-card px-5 py-4 text-[1.02rem]/[1.6] text-ink shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] ring-1 ring-line">
        {text}
      </blockquote>
      <figcaption className="mt-3 pl-1 text-[0.9rem] text-ink-muted">
        <span className="font-semibold text-ink">{name}</span>, {detail}
      </figcaption>
    </figure>
  );
}

function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <dl className="flex gap-10 border-t border-line-strong pt-5">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-[2rem]/[1] font-medium tracking-[-0.035em]">{stat.value}</dd>
          <dd className="mt-1.5 text-[0.88rem] text-ink-muted">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

const tylerSteps: StoryStep[] = [
  {
    id: "tyler-before",
    image: TYLER_CASE.before,
    isMuted: true,
    content: (
      <StepText label={RESULTS.challengeLabel}>
        <p className={BODY}>{TYLER_CASE.challenge}</p>
      </StepText>
    ),
  },
  {
    id: "tyler-built",
    image: TYLER_CASE.after,
    content: (
      <StepText label={RESULTS.builtLabel}>
        <p className={BODY}>{TYLER_CASE.outcome}</p>
      </StepText>
    ),
  },
  {
    id: "tyler-result",
    image: TYLER_CASE.after,
    content: (
      <StepText label={RESULTS.resultLabel}>
        <div className="flex flex-wrap gap-10">
          {TYLER_CASE.stats.map((stat, index) => (
            <div key={stat.label}>
              <CountUp
                value={stat.value}
                className={cn("font-display text-[clamp(3.4rem,5.5vw,5rem)]/[0.9] font-medium tracking-[-0.055em]", index === 0 ? "text-accent" : "text-ink")}
              />
              <p className="mt-2 text-[0.9rem] text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Quote text={TYLER_CASE.quote} name={TYLER_CASE.client} detail={TYLER_CASE.role} />
        </div>
      </StepText>
    ),
  },
];

// Refined Berlin has no screenshot of the old store, so its window stays on the new one
// throughout rather than implying a before it cannot show.
const berlinSteps: StoryStep[] = [
  {
    id: "berlin-before",
    image: BERLIN_CASE.image,
    content: (
      <StepText label={RESULTS.challengeLabel}>
        <p className={BODY}>{BERLIN_CASE.challenge}</p>
      </StepText>
    ),
  },
  {
    id: "berlin-result",
    image: BERLIN_CASE.image,
    content: (
      <StepText label={RESULTS.resultLabel}>
        <CountUp value={BERLIN_CASE.headlineStat.value} className="font-display text-[clamp(5rem,9vw,8rem)]/[0.85] font-medium tracking-[-0.06em] text-accent" />
        <p className="mt-3 max-w-[22rem] text-[0.95rem]/[1.45] text-ink-muted">{BERLIN_CASE.headlineStat.label}</p>
        <div className="mt-8">
          <StatRow stats={BERLIN_CASE.stats} />
        </div>
        <p className={cn(BODY, "mt-8")}>{BERLIN_CASE.outcome}</p>
        <div className="mt-8">
          <Quote text={BERLIN_CASE.quote} name={BERLIN_CASE.quoteAuthor} detail={BERLIN_CASE.client} />
        </div>
      </StepText>
    ),
  },
];

export default function ResultsSection() {
  return (
    <section id="results" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl max-md:text-center">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)]/[0.98] font-medium tracking-[-0.045em] text-balance text-ink">{RESULTS.heading}</h2>
          <p className="mt-5 text-[1.05rem]/[1.6] text-ink-muted">{RESULTS.intro}</p>
        </Reveal>

        <div className="mt-20">
          <StoryIntro client={TYLER_CASE.client} role={TYLER_CASE.role} heading={TYLER_CASE.heading} />
          <div className="mt-6">
            <ScrollStory domain={TYLER_CASE.client} steps={tylerSteps} />
          </div>
        </div>

        <div className="mt-16">
          <StoryIntro client={BERLIN_CASE.client} role={BERLIN_CASE.role} heading={BERLIN_CASE.heading} />
          <div className="mt-6">
            <ScrollStory domain={BERLIN_CASE.domain} steps={berlinSteps} />
          </div>
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-4 text-center">
          <Button href={BOOKING_URL} size="lg">
            {BERLIN_CASE.cta}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
          </Button>
          <p className="text-[0.92rem] text-ink-muted">{BERLIN_CASE.ctaNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
