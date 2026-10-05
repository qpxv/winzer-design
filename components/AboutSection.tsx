import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ABOUT, X_PROFILE } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

/** Read like a short note from Ben: who is writing, the story, his signature. */
export default function AboutSection() {
  return (
    <section className="py-24 sm:py-32">
      <Reveal className="mx-auto max-w-[40rem] px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Image
            src={ABOUT.photo.src}
            alt={ABOUT.photo.alt}
            width={ABOUT.photo.width}
            height={ABOUT.photo.height}
            sizes="64px"
            className="size-16 rounded-full object-cover object-[50%_40%]"
          />
          <div>
            <p className="text-[1rem] font-semibold text-ink">{ABOUT.signoff}</p>
            <p className="flex items-center gap-1 text-[0.9rem] text-ink-muted">
              <MapPin className="size-3.5 text-accent" />
              {ABOUT.location}
            </p>
          </div>
        </div>

        <h2 className="mt-10 font-display text-[clamp(2.2rem,4.2vw,3.6rem)]/[1] font-medium tracking-[-0.04em] text-balance text-ink">{ABOUT.heading}</h2>
        <div className="mt-8 space-y-6">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[1.25rem]/[1.65] text-ink max-sm:text-[1.12rem]/[1.65]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8">
          <div>
            <p className="font-serif text-[2.6rem]/[1] italic text-ink">{ABOUT.signoff}</p>
            <p className="mt-2.5 text-[0.95rem] text-ink-muted">{ABOUT.role}</p>
          </div>
          <a
            href={X_PROFILE.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-1.5 text-[0.95rem] font-medium text-ink-muted transition-colors hover:text-ink"
          >
            {X_PROFILE.label}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
