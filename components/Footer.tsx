import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOOTER, NAV, SITE, X_PROFILE } from "@/lib/data";

const LINK = "w-fit text-[0.92rem] text-snow-muted transition-colors hover:text-snow";

/** Links and the small print, then the studio name set across the full width as the page's last word. */
export default function Footer() {
  return (
    <footer className="overflow-clip bg-night text-snow">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 border-t border-snow-line pt-10 md:flex-row md:items-start md:justify-between">
          <p className="max-w-sm text-[0.92rem]/[1.55] text-snow-muted max-md:mx-auto max-md:text-center">{FOOTER.description}</p>
          <nav className="flex flex-wrap gap-x-7 gap-y-3 max-md:justify-center">
            {NAV.links.map((link) => (
              <a key={link.href} href={link.href} className={LINK}>
                {link.label}
              </a>
            ))}
            <a href={X_PROFILE.href} target="_blank" rel="noopener noreferrer" className={cn(LINK, "inline-flex items-center gap-1")}>
              {X_PROFILE.label}
              <ArrowUpRight className="size-3.5" />
            </a>
          </nav>
        </div>
        <p className="mt-8 text-[0.85rem] text-snow-muted max-md:text-center">&copy; {FOOTER.copyright}</p>
      </div>
      {/* Decoration only: the name is already in the copyright line for screen readers. Sized in vw so
          it spans the width without overflowing, and cut off at the bottom edge by the negative margin. */}
      <p
        aria-hidden
        className="mt-6 -mb-[0.2em] bg-gradient-to-b from-snow/25 to-snow/0 bg-clip-text text-center font-display text-[clamp(3.4rem,15.2vw,15rem)]/[0.8] font-medium tracking-[-0.06em] whitespace-nowrap text-transparent select-none"
      >
        {SITE.name}
      </p>
    </footer>
  );
}
