import Link from "next/link";
import { LogoMark } from "@/components/Brand";
import { Avatar, LinkButton } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth/session";

/**
 * The public site header, per the design: mark and wordmark on the left, a few
 * text links, and one gold action on the right. The border is a faint gold
 * hairline rather than a neutral one — it is the only place on the marketing
 * site where gold is used structurally rather than for an action.
 */
const NAV = [
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/verify", label: "Verify" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/15 bg-ink-950/92 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3.5 px-4 py-4 sm:px-6">
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

        <div className="flex items-center gap-4 sm:gap-7">
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
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
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-ink-800"
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
                className="text-[13px] font-medium text-mist-100/70 transition-colors hover:text-gold-500"
              >
                Sign in
              </Link>
              <LinkButton
                href="/register"
                size="sm"
                className="tracking-[0.08em] uppercase"
              >
                {/* One span, not a bare text node plus a span: the button is a
                    flex row with a gap, so two children would render as
                    "Join  free" with a double space. */}
                <span>
                  Join<span className="hidden sm:inline"> free</span>
                </span>
              </LinkButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
