import { MESSAGES, MESSAGE_SHOTS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import MessagePile from "@/components/messages/MessagePile";

export default function MessagesSection() {
  return (
    <section className="overflow-clip bg-night py-24 text-snow sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)]/[0.98] font-medium tracking-[-0.045em] text-balance">{MESSAGES.heading}</h2>
          <p className="mt-5 text-[1.05rem]/[1.6] text-snow-muted">{MESSAGES.intro}</p>
        </Reveal>

        <div className="mt-12 sm:mt-16">
          <MessagePile shots={MESSAGE_SHOTS} />
        </div>
      </div>
    </section>
  );
}
