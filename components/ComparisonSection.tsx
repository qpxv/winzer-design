import type { LucideIcon } from "lucide-react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPARISON } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import LogoMark from "@/components/ui/LogoMark";

function Mark({ icon: Icon, isUs }: { icon: LucideIcon; isUs: boolean }) {
  return (
    <span className={cn("mt-px grid size-5.5 shrink-0 place-items-center rounded-full", isUs ? "bg-accent text-white" : "bg-line text-ink-soft")}>
      <Icon className="size-3.5" strokeWidth={3} />
    </span>
  );
}

export default function ComparisonSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2.2rem,4.2vw,3.6rem)]/[1] font-medium tracking-[-0.04em] text-balance text-ink">{COMPARISON.heading}</h2>
          <p className="mx-auto mt-5 max-w-[30rem] text-[1.05rem]/[1.6] text-ink-muted">{COMPARISON.intro}</p>
        </Reveal>

        {/* Both lists sit side by side so the whole comparison reads in one look. Mine is raised and lit;
            the agency's card tucks under its edge on desktop. */}
        <Reveal className="mt-14 grid items-center gap-5 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:mt-20">
          <div className="relative z-10 rounded-[2rem] bg-card p-7 ring-2 ring-accent sm:p-10">
            <div className="flex items-center gap-3">
              <LogoMark />
              <h3 className="font-display text-[1.6rem]/[1.1] font-medium tracking-[-0.03em] text-ink">{COMPARISON.columnUs}</h3>
            </div>
            <ul className="mt-8 flex flex-col gap-4.5">
              {COMPARISON.rows.map((row) => (
                <li key={row.id} className="flex gap-3.5 text-[1.05rem]/[1.45] font-medium text-ink">
                  <Mark icon={Check} isUs />
                  {row.feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-surface p-7 ring-1 ring-line sm:p-10 md:-ml-8 md:pl-16">
            <h3 className="font-display text-[1.6rem]/[1.1] font-medium tracking-[-0.03em] text-ink-soft">{COMPARISON.columnThem}</h3>
            <ul className="mt-8 flex flex-col gap-4.5">
              {COMPARISON.rows.map((row) => (
                <li key={row.id} className="flex gap-3.5 text-[1rem]/[1.45] text-ink-soft">
                  <Mark icon={Minus} isUs={false} />
                  {row.them}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
