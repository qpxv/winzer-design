import { FAQ } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import FaqGroups from "@/components/faq/FaqGroups";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.2rem,4.2vw,3.6rem)]/[1] font-medium tracking-[-0.04em] text-balance text-ink max-md:text-center">
            {FAQ.heading}
          </h2>
        </Reveal>
        <div className="mt-14 lg:mt-20">
          <FaqGroups />
        </div>
      </div>
    </section>
  );
}
