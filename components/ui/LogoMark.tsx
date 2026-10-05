import { cn } from "@/lib/utils";

/**
 * The W mark from the existing Winzer Design site: an italic serif W in ink on a white tile with a
 * hairline edge. Same drawing as app/icon.svg. Georgia is set directly (as in the original) rather
 * than the page's serif, so the mark looks the same here as in the browser tab.
 */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden className={cn("size-7", className)}>
      <rect x="8" y="8" width="496" height="496" rx="104" strokeWidth="16" className="fill-white stroke-chrome-light-deep" />
      <text
        x="236"
        y="266"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="400"
        className="fill-ink font-[Georgia,'Times_New_Roman','Noto_Serif',serif] italic"
      >
        W
      </text>
    </svg>
  );
}
