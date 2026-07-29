import { ok, route } from "@/lib/api";
import { listPublishedCourses } from "@/server/services/courses";

export const GET = route(async (request: Request) => {
  const url = new URL(request.url);
  const courses = await listPublishedCourses({
    categorySlug: url.searchParams.get("category") ?? undefined,
    level: url.searchParams.get("level") ?? undefined,
    search: url.searchParams.get("q") ?? undefined,
  });
  return ok({ courses, count: courses.length });
});
