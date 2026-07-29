import { fail, ok, route } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth/session";
import { getCourseBySlug } from "@/server/services/courses";

export const GET = route(
  async (_request: Request, ctx: { params: Promise<{ slug: string }> }) => {
    const { slug } = await ctx.params;
    const user = await getCurrentUser();
    const course = await getCourseBySlug(slug, user?.id);

    if (!course) return fail("Course not found.", 404);
    if (course.status !== "PUBLISHED" && user?.role !== "ADMIN") {
      return fail("Course not found.", 404);
    }

    return ok(course);
  },
);
