"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

/**
 * The questions sorted under their topics. One answer is open at a time across every group,
 * and each one slides open and closed by animating its grid row from 0fr to 1fr, which
 * reaches the content's real height without measuring it.
 */
export default function FaqGroups() {
  const baseId = useId();
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-12">
      {FAQ.groups.map((group, groupIndex) => (
        <Reveal key={group.name} className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h3 className="font-display text-[1.35rem]/[1.1] font-medium tracking-[-0.025em] text-ink lg:pt-5">{group.name}</h3>
          <div className="border-t border-line-strong">
            {group.items.map((item, index) => {
              const isOpen = openQuestion === item.question;
              const panelId = `${baseId}-${groupIndex}-${index}`;
              return (
                <div key={item.question} className="border-b border-line-strong">
                  <h4>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                      className={cn(
                        "group flex w-full cursor-pointer items-center justify-between gap-6 py-5.5 text-left text-[1.08rem]/[1.4] font-medium transition-colors duration-200 hover:text-accent",
                        isOpen ? "text-accent" : "text-ink"
                      )}
                    >
                      {item.question}
                      <Plus
                        className={cn(
                          "size-5 shrink-0 transition-[rotate,color] duration-300 ease-out motion-reduce:transition-none",
                          isOpen ? "rotate-45 text-accent" : "text-ink-soft"
                        )}
                      />
                    </button>
                  </h4>
                  <div
                    id={panelId}
                    role="region"
                    inert={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={cn(
                          "max-w-[40rem] pb-6 text-[1rem]/[1.65] text-ink-muted transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                          isOpen ? "translate-y-0" : "-translate-y-2"
                        )}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
