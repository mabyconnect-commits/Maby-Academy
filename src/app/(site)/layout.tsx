import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AppChrome } from "@/components/app/AppChrome";
import { getCurrentUser } from "@/lib/auth/session";

/**
 * The public site layout, which is public only for the people who are actually
 * public.
 *
 * These routes serve two audiences at the same URL. An anonymous visitor
 * reading about a course needs the marketing header and its sign-up action. A
 * signed-in student sitting on a lesson page for forty minutes needs the thing
 * they have on every other page of the app: the sidebar, their streak and
 * points, and the bottom tab bar on a phone.
 *
 * Before this, the chrome followed the route group, so signing in changed
 * nothing here. A student moved from the dashboard into a lesson and lost the
 * whole app navigation, gaining a hamburger menu that exists nowhere else in
 * the product — with no way back to their courses except the browser's back
 * button. The chrome follows the user now, not the URL.
 *
 * The footer is kept in both cases: it carries the legal and contact links,
 * and those must not become unreachable simply because someone signed in.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </>
    );
  }

  // `padded={false}`: every page in this group carries its own
  // `mx-auto max-w-* px-4 py-*` wrapper, so the shell must not add a second.
  return (
    <AppChrome workspace="learn" user={user} padded={false}>
      {children}
      <SiteFooter />
    </AppChrome>
  );
}
