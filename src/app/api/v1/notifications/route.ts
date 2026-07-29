import { ok, readJson, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import {
  countUnread,
  listNotifications,
  markRead,
} from "@/server/services/notifications";

export const GET = route(async () => {
  const user = await requireUser();
  const [notifications, unread] = await Promise.all([
    listNotifications(user.id),
    countUnread(user.id),
  ]);
  return ok({ notifications, unread });
});

/** Mark one notification read, or all of them when no id is supplied. */
export const PATCH = route(async (request: Request) => {
  const user = await requireUser();
  const body = (await readJson(request)) as { id?: string } | null;
  const result = await markRead(user.id, body?.id);
  return ok({ updated: result.count });
});
