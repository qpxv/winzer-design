import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Copy, Lock, PanelLeft, Plus, RotateCw, Share } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  domain: string;
  children: ReactNode;
  tone?: "light" | "dark";
  /**
   * Lock the whole window, toolbar included, to 16:9. The child then fills the
   * space under the toolbar (give it `size-full object-cover`).
   */
  isWidescreen?: boolean;
  className?: string;
}

const LIGHTS = ["bg-mac-red", "bg-mac-yellow", "bg-mac-green"] as const;

/** macOS window controls: real colours, a hairline inner edge and a faint top highlight, like the system ones. */
function TrafficLights() {
  return (
    <span className="flex items-center gap-[7px]" aria-hidden>
      {LIGHTS.map((color) => (
        <span
          key={color}
          className={cn(
            "size-[11px] rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.25)]",
            color
          )}
        />
      ))}
    </span>
  );
}

/**
 * A faithful macOS Safari window: unified toolbar, centred address field, real controls.
 * It is a container, so on small frames (marquee thumbnails) the extra controls drop out
 * and only the lights and the address remain.
 */
export default function BrowserFrame({ domain, children, tone = "light", isWidescreen = false, className }: BrowserFrameProps) {
  const isDark = tone === "dark";
  const icon = cn("size-[15px] shrink-0", isDark ? "text-white/45" : "text-black/40");
  return (
    <div
      className={cn(
        "@container overflow-hidden rounded-[11px] shadow-window ring-1 transition-colors duration-300",
        isDark ? "bg-chrome-dark ring-white/[0.06]" : "bg-chrome-light ring-black/[0.04]",
        isWidescreen && "flex aspect-video flex-col",
        className
      )}
    >
      <div
        className={cn(
          "grid h-[38px] shrink-0 grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_minmax(0,1fr)] items-center gap-3 border-b px-3.5 @max-sm:h-8 @max-sm:grid-cols-[auto_minmax(0,1fr)_auto] @max-sm:px-2.5",
          isDark
            ? "border-black/50 bg-gradient-to-b from-white/[0.055] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
            : "border-black/10 bg-gradient-to-b from-white to-chrome-light shadow-[inset_0_1px_0_white]"
        )}
      >
        <div className="flex items-center gap-4">
          <TrafficLights />
          <span className="flex items-center gap-2.5 @max-md:hidden" aria-hidden>
            <PanelLeft className={icon} />
            <span className="flex">
              <ChevronLeft className={icon} />
              <ChevronRight className={cn(icon, "opacity-50")} />
            </span>
          </span>
        </div>
        <div
          className={cn(
            "relative flex h-[26px] min-w-0 items-center justify-center gap-1.5 rounded-[7px] px-7 @max-sm:h-[22px] @max-sm:px-3",
            isDark ? "bg-chrome-dark-field text-white/75 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.06)]" : "bg-chrome-light-deep/70 text-black/70"
          )}
        >
          <Lock className="size-[10px] shrink-0 opacity-60" strokeWidth={2.6} aria-hidden />
          <span className="truncate text-[0.74rem]/[1] font-medium tracking-[-0.005em] @max-sm:text-[0.66rem]/[1]">{domain}</span>
          <RotateCw className={cn(icon, "absolute right-2 size-[11px] @max-md:hidden")} aria-hidden />
        </div>
        <div className="flex items-center justify-end gap-3.5 @max-md:hidden" aria-hidden>
          <Share className={icon} />
          <Plus className={icon} />
          <Copy className={icon} />
        </div>
      </div>
      <div className={cn("relative", isWidescreen && "min-h-0 flex-1 overflow-hidden")}>{children}</div>
    </div>
  );
}
