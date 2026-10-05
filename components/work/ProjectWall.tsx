"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/data";
import { SCREENSHOT_QUALITY } from "@/lib/constants";
import type { Project } from "@/types";
import { useIsRunning } from "@/hooks/use-is-running";
import BrowserFrame from "@/components/ui/BrowserFrame";

const COLUMNS = 5;
const PER_COLUMN = 5;

// Each column starts at a different project, so neighbours never line up the same site.
const columns: Project[][] = Array.from({ length: COLUMNS }, (_, column) =>
  Array.from({ length: PER_COLUMN }, (_, row) => PROJECTS[(column * 3 + row * 2) % PROJECTS.length]).filter(
    (project): project is Project => project !== undefined
  )
);

// Seconds per loop. Every column drifts up at its own speed, which reads as depth.
const DURATIONS = [70, 95, 60, 105, 80];

type Tone = "paper" | "night";

// Each tone clears the middle of the wall in its own ground colour, so the copy on top stays readable.
const CLEARING: Record<Tone, string> = {
  paper: "radial-gradient(ellipse 44% 58% at 50% 52%, var(--color-paper) 42%, color-mix(in srgb, var(--color-paper) 70%, transparent) 62%, transparent 100%)",
  night:
    "radial-gradient(ellipse 48% 60% at 50% 50%, var(--color-night) 40%, color-mix(in srgb, var(--color-night) 75%, transparent) 62%, transparent 100%)",
};

const TONE_CLASSES: Record<Tone, { plane: string; phone: string; fade: string }> = {
  paper: { plane: "animate-wall-in motion-reduce:animate-none", phone: "bg-paper/75", fade: "from-paper" },
  // The closing section's wall sits further back, and has no entrance: it is never on screen at load.
  night: { plane: "opacity-60", phone: "bg-night/75", fade: "from-night" },
};

function ColumnCopy({ projects, className }: { projects: Project[]; className?: string }) {
  return (
    <div className={className}>
      {projects.map((project, index) => (
        <div key={`${project.id}-${index}`} className="pb-6">
          <BrowserFrame domain={project.domain} tone="dark" isWidescreen>
            <Image src={project.image.src} alt="" width={project.image.width} height={project.image.height} quality={SCREENSHOT_QUALITY} sizes="360px" className="size-full object-cover object-top" />
          </BrowserFrame>
        </div>
      ))}
    </div>
  );
}

/**
 * Every build laid on a tilted plane behind a headline, cleared in the middle so the copy stays
 * readable. The hero uses it on paper; the closing section brings it back on night.
 */
export default function ProjectWall({ tone = "paper" }: { tone?: Tone }) {
  // The hero's wall runs from first paint, so it is already gliding as it fades in rather than
  // starting from standstill once the page hydrates. Further down it waits until it is on screen.
  const [ref, isRunning] = useIsRunning<HTMLDivElement>(tone === "paper");
  const toneClasses = TONE_CLASSES[tone];

  return (
    // overflow-anchor: none keeps Chrome from picking a moving tile as its scroll anchor on reload,
    // which made it scroll the page down ~120px to follow the wall.
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden [overflow-anchor:none]" aria-hidden>
      {/* The entrance fades and lifts this plain parent. Opacity below 1 on a preserve-3d
          element flattens it and drops the perspective, which snapped back when the fade ended. */}
      <div className={cn("absolute inset-0 [perspective:2000px]", toneClasses.plane)}>
        <div className="absolute top-1/2 left-1/2 grid w-[150%] min-w-[1400px] grid-cols-5 items-start gap-x-6 [transform:translate(-50%,-50%)_rotateX(48deg)_rotateZ(-24deg)]">
          {columns.map((projects, column) => {
            const duration = DURATIONS[column] ?? 80;
            return (
              <div
                key={column}
                // Copies above and below the visible one, so the loop never shows an edge.
                className={cn(
                  "relative animate-wall-scroll will-change-transform motion-reduce:animate-none",
                  !isRunning && "[animation-play-state:paused]"
                )}
                style={
                  {
                    "--wall-duration": `${duration}s`,
                    // Start each column part-way through its loop, so they never move in step.
                    animationDelay: `${-duration * ((column * 0.37) % 1)}s`,
                  } as CSSProperties
                }
              >
                <ColumnCopy projects={projects} className="absolute inset-x-0 bottom-full" />
                <ColumnCopy projects={projects} />
                <ColumnCopy projects={projects} className="absolute inset-x-0 top-full" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute inset-0" style={{ background: CLEARING[tone] }} />
      {/* A phone has no room beside the copy, so the wall steps further back there. */}
      <div className={cn("absolute inset-0 md:hidden", toneClasses.phone)} />
      <div className={cn("absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t to-transparent", toneClasses.fade)} />
      <div className={cn("absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b to-transparent", toneClasses.fade)} />
    </div>
  );
}
