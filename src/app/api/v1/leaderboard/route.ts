import { ok, route } from "@/lib/api";
import { getLeaderboard } from "@/server/services/rewards";

export const GET = route(async (request: Request) => {
  const url = new URL(request.url);
  const limit = Math.min(
    Math.max(Number.parseInt(url.searchParams.get("limit") ?? "20", 10) || 20, 1),
    100,
  );
  return ok({ leaderboard: await getLeaderboard(limit) });
});
