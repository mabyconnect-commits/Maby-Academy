import Link from "next/link";
import { LogoMark } from "@/components/Brand";
import { Avatar, LinkButton } from "@/components/ui";
import { SiteMobileMenu } from "@/components/SiteMobileMenu";
import { getCurrentUser } from "@/lib/auth/session";

/**
 * The public site header, per the design: mark and wordmark on the left, a few
 * text links, and one gold action on the right. The border is a faint gold
 * hairline rather than a neutral one — the only place on the marketing site
 * where gold is used structurally rather than for an action.
 *
 * The nav collapses into `SiteMobileMenu` below `md` rather than simply
 * disappearing. It used to disappear, which left phones with no way to reach
 * Courses, Community or Verify at all.
 */
const NAV = [
  { href: "/courses", label: "Courses" },
  { href: "/schools", label: "Schools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/community", label: "Community" },
  { href: "/verify", label: "Verify" },
];

/** The mobile panel has room for more, so it carries the secondary pages too. */
const MOBILE_NAV = [
  { href: "/", label: "Home" },
  ...NAV,
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/15 bg-ink-950/92 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3.5 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Maby Academy home"
        >
          <LogoMark size={30} className="text-mist-100" />
          {/* nowrap: at 390px the wordmark otherwise breaks after "Maby",
              stacking the brand over two lines inside the header. */}
          <span className="text-[15px] font-extrabold tracking-[0.2em] whitespace-nowrap text-mist-100 uppercase">
            Maby <span className="text-gold-500">Academy</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-mist-100/70 transition-colors hover:text-gold-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 rounded-lg px-1 py-1.5 transition-colors hover:bg-ink-800"
              aria-label="My dashboard"
            >
              <Avatar name={user.name} src={user.avatarUrl} size={30} />
              <span className="hidden text-[13px] font-semibold text-mist-200 sm:block">
                Dashboard
              </span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-[13px] font-medium text-mist-100/70 transition-colors hover:text-gold-500 sm:block"
              >
                Sign in
              </Link>
              <LinkButton
                href="/register"
                size="sm"
                className="hidden tracking-[0.08em] uppercase sm:inline-flex"
              >
                Join free
              </LinkButton>
            </>
          )}

          <SiteMobileMenu items={MOBILE_NAV} signedIn={Boolean(user)} />
        </div>
      </div>
    </header>
  );
}
