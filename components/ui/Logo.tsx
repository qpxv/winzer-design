import { cn } from "@/lib/utils";
import { SITE } from "@/lib/data";
import LogoMark from "@/components/ui/LogoMark";

interface LogoProps {
  tone?: "ink" | "snow";
  /** Hide the wordmark on very narrow phones so the navbar CTA still fits. */
  isCompactOnNarrow?: boolean;
  className?: string;
}

export default function Logo({ tone = "ink", isCompactOnNarrow = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[1.08rem]/[1] font-medium tracking-[-0.02em]",
          tone === "ink" ? "text-ink" : "text-snow",
          isCompactOnNarrow && "max-[379px]:sr-only"
        )}
      >
        {SITE.name}
      </span>
    </span>
  );
}
