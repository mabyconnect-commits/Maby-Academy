import Link from "next/link";
import { Logo } from "@/components/Brand";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: the pitch. Hidden on small screens so the form leads. */}
      <aside className="hidden lg:flex flex-col justify-between p-12 border-r border-ink-800">
        <Logo />

        <div className="max-w-md">
          <h2 className="text-3xl font-semibold tracking-tight leading-tight">
            The difference between knowing about crypto and{" "}
            <span className="text-gradient-gold">understanding it</span> is
            being graded on it.
          </h2>
          <p className="mt-5 text-mist-400 leading-relaxed">
            Structured courses, real assignments with instructor feedback, live
            sessions, and a certificate anyone can verify. Plus the faith,
            health and mindset work that makes it all hold.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Track every lesson, grade and streak in one dashboard",
              "Submit work and get graded against a real rubric",
              "Earn points, badges and multi-level referral commissions",
              "Leave with a serialised, publicly verifiable certificate",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-mist-300">
                <span className="text-growth-400 shrink-0" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-mist-400">
          © {new Date().getFullYear()} Maby Academy · Education only, not
          financial advice.
        </p>
      </aside>

      {/* Right: the form. */}
      <main id="main" className="flex flex-col justify-center px-5 py-12 sm:px-12">
        <div className="lg:hidden mb-8">
          <Logo />
        </div>

        <div className="w-full max-w-sm mx-auto">{children}</div>

        <p className="mt-10 text-center text-xs text-mist-400">
          <Link href="/" className="hover:text-mist-200">
            ← Back to Maby Academy
          </Link>
        </p>
      </main>
    </div>
  );
}
