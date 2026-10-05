import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HERO, SITE } from "@/lib/data";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse cannot read globals.css, so these mirror the theme tokens by necessity.
// ACCENT must track --color-accent, PAPER --color-paper and INK --color-ink in app/globals.css.
const ACCENT = "#2b3bff";
const PAPER = "#f5f3ee";
const INK = "#0d0d11";
const MUTED = "#55555f";
const EDGE = "#e2e2ee";

// The site's own faces, as TTF files, because the image renderer has no access to next/font.
const loadFont = (file: string): Promise<Buffer> => readFile(join(process.cwd(), "assets/fonts", file));

/** The share card: the hero headline on paper, signed with the W mark. */
export default async function OpengraphImage(): Promise<ImageResponse> {
  const [display, serif] = await Promise.all([loadFont("funnel-display-600.ttf"), loadFont("newsreader-italic-400.ttf")]);
  const words = HERO.headline.split(" ");
  // Two balanced lines: "I design and code" / "websites that sell".
  const firstLine = words.slice(0, 4).join(" ");
  const secondLine = words.slice(4).join(" ");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: PAPER, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, fontFamily: "Funnel Display" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: "#ffffff",
              border: `2px solid ${EDGE}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Newsreader",
              fontStyle: "italic",
              fontSize: 48,
              color: INK,
              paddingRight: 4,
            }}
          >
            W
          </div>
          <div style={{ fontSize: 32, color: INK }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1, color: INK, letterSpacing: -4 }}>
          <div style={{ display: "flex" }}>{firstLine}</div>
          <div style={{ display: "flex", gap: 26 }}>
            {secondLine}
            <span style={{ color: ACCENT }}>{HERO.headlineAccent}</span>
          </div>
        </div>

        <div style={{ fontSize: 28, color: MUTED }}>{SITE.url.replace("https://", "")}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Funnel Display", data: display, weight: 600, style: "normal" },
        { name: "Newsreader", data: serif, weight: 400, style: "italic" },
      ],
    }
  );
}
