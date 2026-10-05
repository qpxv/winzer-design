"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SCREENSHOT_QUALITY } from "@/lib/constants";
import type { ImageAsset } from "@/types";
import BrowserFrame from "@/components/ui/BrowserFrame";

export interface StoryStep {
  id: string;
  image: ImageAsset;
  isMuted?: boolean;
  content: ReactNode;
}

/**
 * Scrollytelling: the window pins on the left and swaps its screenshot as each step on the
 * right crosses the middle of the screen. Event-driven (IntersectionObserver), no scroll loop.
 * Phones get the screenshots inline instead of a pinned window, each one only above the first
 * step that uses it, so a screenshot shared by consecutive steps is not repeated down the page.
 */
export default function ScrollStory({ domain, steps }: { domain: string; steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <div className="max-lg:hidden">
        <div className="sticky top-[calc(50vh-14rem)]">
          <BrowserFrame domain={domain} isWidescreen>
            {steps.map((step, index) => (
              <Image
                key={step.id}
                src={step.image.src}
                alt={index === active ? step.image.alt : ""}
                width={step.image.width}
                height={step.image.height}
                quality={SCREENSHOT_QUALITY}
                sizes="720px"
                className={cn(
                  "absolute inset-0 size-full object-cover object-top transition-opacity duration-700",
                  step.isMuted && "saturate-[0.55]",
                  index === active ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </BrowserFrame>
          <div className="mt-5 flex gap-2" aria-hidden>
            {steps.map((step, index) => (
              <span key={step.id} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", index <= active ? "bg-accent" : "bg-line-strong")} />
            ))}
          </div>
        </div>
      </div>
      <div>
        {steps.map((step, index) => {
          const isNewImage = steps[index - 1]?.image.src !== step.image.src;
          return (
            <div
              key={step.id}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              className={cn("flex flex-col justify-center py-10 transition-opacity duration-500 lg:min-h-[75vh]", index === active ? "lg:opacity-100" : "lg:opacity-35")}
            >
              {isNewImage && (
                <div className="mb-6 lg:hidden">
                  <BrowserFrame domain={domain} isWidescreen>
                    <Image src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} quality={SCREENSHOT_QUALITY} sizes="95vw" className={cn("size-full object-cover object-top", step.isMuted && "saturate-[0.55]")} />
                  </BrowserFrame>
                </div>
              )}
              {step.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
