import Image from "next/image";
import type { Project } from "@/types";

/** The project's own screenshot, blurred, as a light behind its frame. Blur is fixed, never toggled. */
export default function ProjectGlow({ project }: { project: Project }) {
  return (
    <Image
      src={project.image.src}
      alt=""
      aria-hidden
      width={project.image.width}
      height={project.image.height}
      sizes="200px"
      className="pointer-events-none absolute inset-0 -z-10 size-full scale-x-[1.08] scale-y-[1.18] object-cover opacity-75 blur-[44px] saturate-[1.8] transition-opacity duration-500 group-hover:opacity-100"
    />
  );
}
