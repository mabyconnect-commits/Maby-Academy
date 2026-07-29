import { ok, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { toggleRsvp } from "@/server/services/liveSessions";

export const POST = route(
  async (_request: Request, ctx: { params: Promise<{ id: string }> }) => {
    const user = await requireUser();
    const { id } = await ctx.params;
    return ok(await toggleRsvp(user.id, id));
  },
);
