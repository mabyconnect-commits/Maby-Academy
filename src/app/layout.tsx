import type { Metadata, Viewport } from "next";
import { Archivo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/**
 * Self-hosted at build time by next/font, so there is no request to Google
 * and no need to widen the Content-Security-Policy for a third-party origin.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

/** Certificates and award moments only — the institutional voice. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic", "normal"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maby Academy — Learn crypto, build wealth, grow whole",
    template: "%s · Maby Academy",
  },
  description:
    "A serious academy for crypto, Web3, on-chain analysis and finance — taught alongside faith, health and mindset. Real courses, real assignments, real certificates.",
  keywords: [
    "crypto education",
    "web3 academy",
    "on-chain analysis",
    "trading course",
    "financial literacy",
    "personal growth",
  ],
  openGraph: {
    title: "Maby Academy",
    description:
      "Learn crypto, Web3 and finance the serious way — with assignments, mentorship and verifiable certificates.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${cormorant.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:bg-gold-500 focus:text-ink-950 focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
