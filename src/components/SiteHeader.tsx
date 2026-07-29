import Link from "next/link";
import { Logo } from "@/components/Brand";
import { LinkButton, Avatar } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth/session";

const NAV = [
  { href: "/courses", label: "Courses" },
  { href: "/#pillars", label: "Pillars" },
  { href: "/#how", label: "How it works" },
  { href: "/verify", label: "Verify a certificate" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-mist-300 hover:text-mist-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-ink-800 transition-colors"
            >
              <Avatar name={user.name} src={user.avatarUrl} size={30} />
              <span className="hidden sm:block text-sm text-mist-200">
                Dashboard
              </span>
            </Link>
          ) : (
            <>
              <LinkButton href="/login" variant="ghost" size="sm">
                Sign in
              </LinkButton>
              <LinkButton href="/register" size="sm">
                Join the academy
              </LinkButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
