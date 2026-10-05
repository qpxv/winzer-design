"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PROCESS, PROJECTS } from "@/lib/data";
import { SCREENSHOT_QUALITY } from "@/lib/constants";
import { easeOutExpo } from "@/lib/animations";
import BrowserFrame from "@/components/ui/BrowserFrame";

const { stage } = PROCESS;
const liveProject = PROJECTS.find((project) => project.id === stage.liveProjectId);

// The drawings are sized in container units (the window is a size container), so they keep
// their proportions at any window width.

function CallStage() {
  return (
    <div className="flex size-full items-center justify-center bg-night-raised">
      <div className="grid w-[74%] grid-cols-[auto_minmax(0,1fr)] gap-[5cqw] rounded-[2.4cqw] bg-night p-[4.5cqw] ring-1 ring-snow-line">
        <div>
          <span className="block size-[7cqw] rounded-full bg-accent" />
          <p className="mt-[2cqw] text-[2.6cqw]/[1.2] font-semibold">{stage.callTitle}</p>
          <p className="mt-[0.6cqw] text-[2.3cqw]/[1.2] text-snow-muted">{stage.callLength}</p>
        </div>
        <div className="grid grid-cols-2 gap-[1.6cqw]">
          {stage.slots.map((slot, index) => (
            <span
              key={slot}
              className={cn(
                "grid place-items-center rounded-[1.4cqw] py-[1.8cqw] text-[2.3cqw]/[1] font-medium ring-1",
                index === 1 ? "bg-accent text-white ring-accent" : "text-accent-light ring-accent-light/40"
              )}
            >
              {slot}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DraftStage() {
  return (
    <div className="relative flex size-full flex-col bg-night-raised px-[7%] py-[5%]">
      <div className="flex items-center justify-between">
        <span className="h-[1.8cqw] w-[14%] rounded-full bg-snow/25" />
        <span className="flex w-[30%] gap-[6%]">
          <span className="h-[1.3cqw] flex-1 rounded-full bg-snow/15" />
          <span className="h-[1.3cqw] flex-1 rounded-full bg-snow/15" />
          <span className="h-[1.3cqw] flex-1 rounded-full bg-snow/15" />
        </span>
      </div>
      <div className="mt-[7%] flex flex-1 items-center gap-[7%]">
        <div className="flex flex-1 flex-col gap-[1.8cqw]">
          <span className="h-[2.8cqw] w-[90%] rounded-full bg-snow/45" />
          <span className="h-[2.8cqw] w-[70%] rounded-full bg-snow/45" />
          <span className="mt-[1cqw] h-[1.3cqw] w-[80%] rounded-full bg-snow/15" />
          <span className="h-[1.3cqw] w-[60%] rounded-full bg-snow/15" />
          <span className="mt-[1.6cqw] h-[4cqw] w-[38%] rounded-full bg-accent" />
        </div>
        <div className="aspect-[4/3] w-[42%] rounded-[1.6cqw] border border-dashed border-accent-light/50 bg-accent/10" />
      </div>
      <span className="absolute right-[5%] bottom-[6%] rounded-full bg-accent px-[2cqw] py-[0.8cqw] text-[2.2cqw]/[1] font-semibold text-white">{stage.draftTag}</span>
    </div>
  );
}

function LiveStage() {
  if (!liveProject) return null;
  return (
    <Image
      src={liveProject.image.src}
      alt={liveProject.image.alt}
      width={liveProject.image.width}
      height={liveProject.image.height}
      quality={SCREENSHOT_QUALITY}
      sizes="(min-width: 1024px) 680px, 92vw"
      className="size-full object-cover object-top"
    />
  );
}

const STAGES: Record<string, () => React.JSX.Element | null> = { call: CallStage, draft: DraftStage, launch: LiveStage };

/** The steps after booking. Pick one and the window beside it becomes that stage. */
export default function ProcessStages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PROCESS.steps[activeIndex] ?? PROCESS.steps[0];
  const Stage = STAGES[active.id] ?? LiveStage;

  return (
    <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <h3 className="font-display text-[clamp(2rem,3.6vw,3rem)]/[1] font-medium tracking-[-0.04em] max-md:text-center lg:self-end">{PROCESS.heading}</h3>

      {/* Beside the steps on desktop; above them on a phone, so the stage you pick is always in view. */}
      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: easeOutExpo }}>
            <BrowserFrame domain={active.domain} tone="dark" isWidescreen>
              <Stage />
            </BrowserFrame>
          </motion.div>
        </AnimatePresence>
      </div>

      <ol className="flex flex-col lg:self-start">
        {PROCESS.steps.map((step, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={step.id} className="border-t border-snow-line last:border-b">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className="grid w-full cursor-pointer grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-6 text-left"
              >
                <span className={cn("pt-1 text-[0.92rem] font-medium transition-colors duration-300", isActive ? "text-accent-light" : "text-snow/30")}>0{index + 1}</span>
                <span>
                  <span
                    className={cn(
                      "block font-display text-[1.45rem]/[1.15] font-medium tracking-[-0.025em] transition-colors duration-300",
                      isActive ? "text-snow" : "text-snow/40"
                    )}
                  >
                    {step.title}
                  </span>
                  <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out", isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <span className="overflow-hidden">
                      <span className="block pt-2.5 text-[0.98rem]/[1.6] text-snow-muted">
                        <span className="font-medium text-snow">{step.when}.</span> {step.description}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
