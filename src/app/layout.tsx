import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  themeColor: "#07090f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
