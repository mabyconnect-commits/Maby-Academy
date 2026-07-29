import { ok, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { getDashboardSummary } from "@/server/services/progress";

export const GET = route(async () => {
  const user = await requireUser();
  const summary = await getDashboardSummary(user.id);
  return ok({ user, summary });
});
