import Image from "next/image";
import { cn } from "@/lib/utils";
import { WORK } from "@/lib/data";
import { SCREENSHOT_QUALITY } from "@/lib/constants";
import type { Project } from "@/types";
import BrowserFrame from "@/components/ui/BrowserFrame";

interface ProjectThumbProps {
  project: Project;
  /** Marquee copies: hidden from assistive tech and the tab order. */
  isDuplicate?: boolean;
  className?: string;
}

/** A live build as a bare window; the whole window opens the site, its address bar names it. */
export default function ProjectThumb({ project, isDuplicate = false, className }: ProjectThumbProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isDuplicate ? undefined : `${project.name}: ${WORK.visit}`}
      aria-hidden={isDuplicate || undefined}
      tabIndex={isDuplicate ? -1 : undefined}
      draggable={false}
      className={cn("group block", className)}
    >
      <BrowserFrame domain={project.domain} tone="dark" isWidescreen className="transition-colors duration-300 group-hover:ring-snow-muted">
        <Image
          src={project.image.src}
          alt={isDuplicate ? "" : project.image.alt}
          width={project.image.width}
          height={project.image.height}
          quality={SCREENSHOT_QUALITY}
          sizes="(min-width: 1024px) 380px, 70vw"
          draggable={false}
          className="size-full object-cover object-top"
        />
      </BrowserFrame>
    </a>
  );
}
