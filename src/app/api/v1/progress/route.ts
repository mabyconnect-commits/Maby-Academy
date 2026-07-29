import { ok, readJson, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { progressSchema } from "@/lib/validation";
import { trackLessonProgress } from "@/server/services/progress";

export const POST = route(async (request: Request) => {
  const user = await requireUser();
  const input = progressSchema.parse(await readJson(request));

  const result = await trackLessonProgress({
    userId: user.id,
    lessonId: input.lessonId,
    watchedSeconds: input.watchedSeconds,
    completed: input.completed,
  });

  return ok(result);
});
