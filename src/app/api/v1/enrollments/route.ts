import { ok, readJson, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { enrollSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { ServiceError } from "@/server/services/auth";
import { enrollUser, getMyEnrollments } from "@/server/services/courses";

export const GET = route(async () => {
  const user = await requireUser();
  return ok({ enrollments: await getMyEnrollments(user.id) });
});

export const POST = route(async (request: Request) => {
  const user = await requireUser();
  const { courseId } = enrollSchema.parse(await readJson(request));

  // Free enrolment is gated on joining the communities — the same rule the
  // web enrol flow enforces, applied here so the API can't be used to bypass
  // it. Paid courses are unaffected (payment is their gate).
  const course = await db.course.findUnique({
    where: { id: courseId },
    select: { priceMinor: true },
  });
  if (course && course.priceMinor === 0 && !user.communitiesJoinedAt) {
    throw new ServiceError(
      "Join the academy's communities to unlock free courses. Visit /communities/join.",
      403,
    );
  }

  const enrollment = await enrollUser(user.id, courseId);
  return ok(enrollment, 201);
});
