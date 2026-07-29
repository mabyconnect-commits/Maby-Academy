import { NextResponse, type NextRequest } from "next/server";
import { hasDatabase } from "@/lib/database-url";

/**
 * When the app has no database configured, send every request to /setup.
 *
 * Doing this in middleware — rather than a check inside each page — is what
 * makes the guarantee airtight: no route handler, layout or server component
 * ever runs, so nothing can attempt a query against a database that isn't
 * there. The deployment is live and explains itself instead of returning 500s.
 *
 * Detection goes through the same resolver the app uses — a platform
 * integration may inject the connection under a name other than
 * DATABASE_URL, and middleware must agree with the rest of the app about
 * whether a database exists.
 */
export function middleware(request: NextRequest) {
  const configured = hasDatabase();
  const { pathname } = request.nextUrl;

  if (!configured && pathname !== "/setup") {
    const url = request.nextUrl.clone();
    url.pathname = "/setup";
    url.search = "";
    // 307 rather than a rewrite: the address bar should show /setup, so the
    // state is obvious and a refresh doesn't land back on a dead route.
    return NextResponse.redirect(url, 307);
  }

  // Once configured, /setup has nothing useful to say.
  if (configured && pathname === "/setup") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /**
     * Everything except Next's internals and static files — those must keep
     * serving normally or the setup page itself would render unstyled.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
