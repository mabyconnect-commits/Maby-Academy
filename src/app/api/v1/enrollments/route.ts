import { ok, readJson, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { enrollSchema } from "@/lib/validation";
import { enrollUser, getMyEnrollments } from "@/server/services/courses";

export const GET = route(async () => {
  const user = await requireUser();
  return ok({ enrollments: await getMyEnrollments(user.id) });
});

export const POST = route(async (request: Request) => {
  const user = await requireUser();
  const { courseId } = enrollSchema.parse(await readJson(request));
  const enrollment = await enrollUser(user.id, courseId);
  return ok(enrollment, 201);
});
