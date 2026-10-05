import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/data";
import "./globals.css";

const funnel = Funnel_Display({ variable: "--font-funnel", subsets: ["latin"], weight: ["500", "600"] });
// Funnel Sans for body text: the companion to the display face, with a normal-width hyphen
// (Host Grotesk drew hyphens nearly as long as an en dash).
const funnelSans = Funnel_Sans({ variable: "--font-funnel-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["italic"], weight: ["400"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  openGraph: { title: SITE.title, description: SITE.description, type: "website" },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${funnel.variable} ${funnelSans.variable} ${newsreader.variable} antialiased`}>
      <body className="min-h-svh bg-paper text-ink">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
