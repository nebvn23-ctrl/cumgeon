import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cumgeonConfig } from "@/config/cumgeon";
import { SiteStateProvider } from "@/components/providers/SiteStateProvider";
import SmoothScroll from "@/components/effects/SmoothScroll";
import FilmGrain from "@/components/effects/FilmGrain";
import ScanLines from "@/components/effects/ScanLines";
import ContaminationCursor from "@/components/effects/ContaminationCursor";
import AmbientPresence from "@/components/effects/AmbientPresence";

const { seo } = cumgeonConfig;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: "CUMGEON",
  keywords: ["Cumgeon", "meme", "pigeon", "trenches", "internet culture"],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: "/icons/favicon.svg",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.siteUrl,
    siteName: "CUMGEON",
    images: [{ url: seo.ogImage, width: 1024, height: 1024, alt: "Cumgeon in the trenches" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: seo.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="fixed left-2 top-2 z-[200] -translate-y-24 rounded bg-lime px-4 py-2 font-mono text-xs font-bold uppercase text-black transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteStateProvider>
          <SmoothScroll>
            {children}
            <FilmGrain />
            <ScanLines />
            <ContaminationCursor />
            <AmbientPresence />
          </SmoothScroll>
        </SiteStateProvider>
      </body>
    </html>
  );
}
