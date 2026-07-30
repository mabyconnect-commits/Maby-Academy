import { redirect } from "next/navigation";
import { getCurrentUser } from "./session";
import type { PermissionKey } from "./permissions";
import { permissionsFor } from "./permissions";
import type { SessionUser } from "./session";

/**
 * Page-level permission guard.
 *
 * Distinct from `requirePermission`, which *throws* — the right behaviour in a
 * service or a server action, where the caller turns the error into a status
 * code or a form message. In a page render a thrown error reaches the error
 * boundary and renders "Something broke on our side" with a 500, telling the
 * member the platform is broken when it is in fact working exactly as designed.
 *
 * So pages redirect to an explanatory page instead. This is presentation only:
 * the services the page calls check the same capability again on their own
 * authority, so removing this guard would change the message, not the access.
 */
export async function guardPermission(
  permission: PermissionKey,
  area: string,
): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const granted = new Set(permissionsFor([user.role, ...user.extraRoles]));
  if (!granted.has(permission)) {
    redirect(`/forbidden?area=${encodeURIComponent(area)}`);
  }

  return user;
}
