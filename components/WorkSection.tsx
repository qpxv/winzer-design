import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURED_PROJECTS, OTHER_PROJECTS, WORK } from "@/lib/data";
import { SCREENSHOT_QUALITY } from "@/lib/constants";
import type { Project } from "@/types";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";
import ProjectGlow from "@/components/work/ProjectGlow";
import ProjectMarquee from "@/components/work/ProjectMarquee";

// Each card pins a little lower than the one before, so earlier cards peek out above the stack.
const STACK_TOP = ["top-24", "top-[7.25rem]", "top-[8.5rem]"];

function StackCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group sticky grid items-center gap-8 overflow-clip rounded-[2rem] bg-night-raised p-6 ring-1 ring-snow-line shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:ring-snow-muted sm:p-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14 lg:p-14",
        STACK_TOP[index]
      )}
    >
      <div className="flex flex-col gap-4 max-lg:order-2 max-lg:items-center max-lg:text-center lg:gap-5">
        <h3 className="font-display text-[clamp(2.2rem,4.6vw,4.4rem)]/[0.95] font-medium tracking-[-0.045em]">{project.name}</h3>
        <p className="text-[1.08rem]/[1.55] text-snow-muted">{project.tagline}</p>
        <p className="text-[0.95rem] text-snow-muted/80 max-sm:hidden">{project.domain}</p>
        <span className="inline-flex w-fit items-center gap-1.5 text-[0.95rem] font-medium text-snow-muted transition-colors group-hover:text-snow">
          {WORK.visit}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
      <div className="relative isolate">
        <ProjectGlow project={project} />
        <BrowserFrame domain={project.domain} tone="dark" isWidescreen>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            quality={SCREENSHOT_QUALITY}
            sizes="(min-width: 1024px) 720px, 90vw"
            className="size-full object-cover object-top"
          />
        </BrowserFrame>
      </div>
    </a>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="relative overflow-clip bg-night py-24 text-snow sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end max-md:text-center">
          <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)]/[0.9] font-medium tracking-[-0.05em]">{WORK.heading}</h2>
          <p className="max-w-[32rem] text-[1.05rem]/[1.6] text-snow-muted max-md:mx-auto lg:justify-self-end lg:pb-2">{WORK.intro}</p>
        </Reveal>

        {/* Sticky cards: the section clips with overflow-clip, which (unlike overflow-hidden) keeps sticky
            working. A pinned card can only travel within its parent's content box, so the empty spacer at
            the end (not padding) is what holds the finished stack on screen for a beat. */}
        <div className="mt-16 flex flex-col gap-[12vh] lg:mt-20">
          {FEATURED_PROJECTS.map((project, index) => (
            <StackCard key={project.id} project={project} index={index} />
          ))}
          <div aria-hidden className="h-[8vh]" />
        </div>

        <h3 className="mt-8 mb-8 font-display text-[1.6rem]/[1.1] font-medium tracking-[-0.025em] max-md:text-center lg:mt-12">
          {WORK.moreHeading}
        </h3>
        <ProjectMarquee projects={OTHER_PROJECTS} rows={2} itemClassName="w-[17rem] sm:w-[20rem]" />
      </div>
    </section>
  );
}
