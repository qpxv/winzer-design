"use client";

import { cn } from "@/lib/utils";
import { useIsRunning } from "@/hooks/use-is-running";
import type { Project } from "@/types";
import ProjectThumb from "@/components/work/ProjectThumb";

interface ProjectMarqueeProps {
  projects: Project[];
  rows: 1 | 2;
  itemClassName?: string;
}

const EDGE_FADE = "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]";

/** Runs only while on screen and while the tab is visible. Reduced motion gets a plain scroll row. */
export default function ProjectMarquee({ projects, rows, itemClassName }: ProjectMarqueeProps) {
  const [ref, isRunning] = useIsRunning<HTMLDivElement>();

  const half = Math.ceil(projects.length / 2);
  const lanes = rows === 2 ? [projects.slice(0, half), projects.slice(half)] : [projects];

  return (
    // Each lane must clip sideways and its edge mask hides anything outside its box, so the
    // lanes carry vertical padding (offset by the wrapper's negative margin) to keep the frames'
    // hover outline and shadow inside it.
    <div ref={ref} className="-my-5 flex flex-col">
      {lanes.map((lane, laneIndex) => (
        <div key={laneIndex} className={cn("overflow-hidden py-5 motion-reduce:overflow-x-auto", EDGE_FADE)}>
          <div
            className={cn(
              "flex w-max animate-marquee motion-reduce:animate-none",
              laneIndex === 1 && "[animation-direction:reverse]",
              !isRunning && "[animation-play-state:paused]"
            )}
          >
            {[false, true].map((isDuplicate) =>
              lane.map((project) => (
                <div
                  key={`${project.id}-${isDuplicate ? "copy" : "main"}`}
                  className={cn("shrink-0 pr-6", isDuplicate && "motion-reduce:hidden")}
                >
                  <ProjectThumb project={project} isDuplicate={isDuplicate} className={itemClassName} />
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
