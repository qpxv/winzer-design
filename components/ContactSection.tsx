import { ArrowRight } from "lucide-react";
import { BOOKING_URL, CONTACT } from "@/lib/data";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ProjectWall from "@/components/work/ProjectWall";

/** The hero's wall of builds returns, dark, behind the closing line, so the page ends where it began. */
export default function ContactSection() {
  return (
    <section id="contact" className="relative isolate overflow-clip bg-night py-24 text-snow sm:py-32">
      <ProjectWall tone="night" />
      <Reveal className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)]/[0.9] font-medium tracking-[-0.055em] text-balance">
          {CONTACT.heading} <span className="text-accent-light">{CONTACT.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-7 max-w-[34rem] text-[1.1rem]/[1.6] text-pretty text-snow-muted">{CONTACT.body}</p>
        <div className="mt-9 flex justify-center">
          <Button href={BOOKING_URL} size="lg">
            {CONTACT.cta}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
