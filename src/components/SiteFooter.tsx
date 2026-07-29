import Link from "next/link";
import { Logo } from "@/components/Brand";

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { href: "/courses", label: "All courses" },
      { href: "/courses?category=crypto-foundations", label: "Crypto foundations" },
      { href: "/courses?category=on-chain-analysis", label: "On-chain analysis" },
      { href: "/courses?category=faith-and-purpose", label: "Faith & purpose" },
    ],
  },
  {
    title: "Academy",
    links: [
      { href: "/dashboard", label: "My dashboard" },
      { href: "/dashboard/live", label: "Live sessions" },
      { href: "/dashboard/rewards", label: "Rewards & leaderboard" },
      { href: "/dashboard/referrals", label: "Referral programme" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "/verify", label: "Verify a certificate" },
      { href: "/legal/risk-disclosure", label: "Risk disclosure" },
      {
        href: "/legal/financial-education-disclaimer",
        label: "Education disclaimer",
      },
      { href: "/legal/community-guidelines", label: "Community guidelines" },
      { href: "/legal/privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-800 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo size="sm" />
            <p className="mt-3 text-sm text-mist-400 max-w-xs leading-relaxed">
              Built for people who are serious about growth — on-chain, in
              business, in health, and in faith.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-wider text-mist-400 font-semibold">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist-300 hover:text-gold-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-ink-800 flex flex-col sm:flex-row gap-3 justify-between text-xs text-mist-400">
          <p>© {new Date().getFullYear()} Maby Academy. All rights reserved.</p>
          <p>
            Education only — nothing here is financial advice.{" "}
            <Link
              href="/legal/risk-disclosure"
              className="text-gold-400 hover:text-gold-300"
            >
              Read the risk disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
