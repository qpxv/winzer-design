"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/animations";
import { SCREENSHOT_QUALITY } from "@/lib/constants";
import type { MessageShot } from "@/types";

// The pile is composed on a fixed 1216 x 860 table and scaled as one piece, so every
// overlap stays the same at any desktop width. Positions are px on that table.
const TABLE = { width: 1216, height: 860 };

const SPOTS: Record<number, { x: number; y: number; rotate: number }> = {
  2: { x: 12, y: 20, rotate: -4 },
  11: { x: 511, y: 0, rotate: 3 },
  5: { x: 900, y: 30, rotate: 5 },
  1: { x: 438, y: 180, rotate: -2 },
  4: { x: 61, y: 290, rotate: 3 },
  10: { x: 863, y: 340, rotate: -5 },
  9: { x: 353, y: 380, rotate: 2 },
  3: { x: 24, y: 580, rotate: -3 },
  7: { x: 316, y: 540, rotate: 4 },
  8: { x: 669, y: 560, rotate: -2 },
  6: { x: 973, y: 600, rotate: 6 },
};

const percent = (value: number, of: number): string => `${(value / of) * 100}%`;

function Shot({ shot, sizes, className }: { shot: MessageShot; sizes: string; className?: string }) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      quality={SCREENSHOT_QUALITY}
      sizes={sizes}
      className={cn("h-auto w-full rounded-[0.9rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)] ring-1 ring-snow-line", className)}
    />
  );
}

/** Every chat screenshot tossed onto the table. Each one lands as the section arrives and straightens under the cursor. */
export default function MessagePile({ shots }: { shots: MessageShot[] }) {
  return (
    <>
      <div className="relative hidden aspect-[1216/860] lg:block">
        {shots.map((shot, index) => {
          const spot = SPOTS[shot.id];
          if (!spot) return null;
          return (
            <motion.div
              key={shot.id}
              className="group absolute z-[var(--z)] hover:z-50"
              style={
                {
                  left: percent(spot.x, TABLE.width),
                  top: percent(spot.y, TABLE.height),
                  width: percent(shot.width, TABLE.width),
                  "--z": index,
                } as CSSProperties
              }
              initial={{ opacity: 0, y: 80, rotate: spot.rotate * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: index * 0.06 }}
            >
              <div
                className="[rotate:calc(var(--r)*1deg)] transition-[rotate] duration-500 ease-out group-hover:[rotate:0deg] motion-reduce:transition-none"
                style={{ "--r": spot.rotate } as CSSProperties}
              >
                <Shot shot={shot} sizes={`(min-width: 1280px) ${shot.width}px, ${Math.round((shot.width / TABLE.width) * 100)}vw`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Below desktop there is no room to scatter, so the pile settles into two loose columns. */}
      {/* Two explicit columns rather than CSS columns: WebKit splits a rotated card across a column break. */}
      <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:hidden">
        {[0, 1].map((column) => (
          <div key={column} className="flex flex-col gap-3 sm:gap-5">
            {shots
              .filter((_, index) => index % 2 === column)
              .map((shot, index) => (
                <div key={shot.id} className={(index + column) % 2 ? "rotate-2" : "-rotate-2"}>
                  <Shot shot={shot} sizes="50vw" className="rounded-[0.7rem]" />
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
