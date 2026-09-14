import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Jost } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { BUSINESS, SITE } from "@/lib/content";
import "./globals.css";

/* Display: a light, high-contrast serif with a true italic — the calm,
   editorial register the room has. Body + brand caps: a geometric sans, the
   nearest open face to the ONTEN CAFE wordmark's own letterforms, so the
   logo's voice carries through nav, buttons and labels. */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

/* No production domain is confirmed yet. Set NEXT_PUBLIC_SITE_URL at deploy
   so canonical, OG and JSON-LD URLs resolve to the real site. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3620";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BUSINESS.legalName,
    title: SITE.title,
    description: SITE.description,
    url: "/",
    locale: "en_US",
    /* A static crop of the official interior photo, not a generated card —
       a generated one is a build-time fetch away from breaking. */
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Cafe Onten's sunlit dining room with wooden chairs and potted trees",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
        <StructuredData siteUrl={siteUrl} />
      </body>
    </html>
  );
}
