import { ok, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { getReferralOverview } from "@/server/services/referrals";

export const GET = route(async () => {
  const user = await requireUser();
  return ok(await getReferralOverview(user.id));
});
