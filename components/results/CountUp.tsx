"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/animations";

/** Splits "$2.2K" into "$", 2.2, "K" so the number can count up. */
function parse(value: string): { prefix: string; target: number; decimals: number; suffix: string } | null {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return null;
  const [, prefix = "", digits = "0", suffix = ""] = match;
  return { prefix, target: Number(digits), decimals: digits.split(".")[1]?.length ?? 0, suffix };
}

/**
 * Counts up once when it scrolls into view. Digits are written straight to the DOM, so the
 * count never re-renders React. The final value sits invisibly underneath, so the box is its
 * final width from the start and nothing shifts as the digits grow.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = parse(value);
  const start = parsed ? `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}` : value;

  useEffect(() => {
    const node = digitsRef.current;
    const target = parse(value);
    if (!isInView || !node || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = value;
      return;
    }
    const controls = animate(0, target.target, {
      duration: 1.6,
      ease: easeOutExpo,
      onUpdate: (latest) => {
        node.textContent = `${target.prefix}${latest.toFixed(target.decimals)}${target.suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className={cn("inline-grid tabular-nums", className)}>
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {value}
      </span>
      <span ref={digitsRef} className="col-start-1 row-start-1" aria-hidden>
        {start}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
