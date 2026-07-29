import { fail, ok, route } from "@/lib/api";
import { verifyCertificate } from "@/server/services/certificates";

/** Public endpoint — no auth. Anyone holding a certificate can check it. */
export const GET = route(
  async (_request: Request, ctx: { params: Promise<{ token: string }> }) => {
    const { token } = await ctx.params;
    const result = await verifyCertificate(token);

    if (result.status === "not_found") {
      return fail("No certificate matches that code.", 404);
    }

    const { certificate } = result;
    return ok({
      status: result.status,
      serial: certificate.serial,
      issuedAt: certificate.issuedAt,
      revokedAt: certificate.revokedAt,
      recipient: certificate.user.name,
      course: certificate.course.title,
      level: certificate.course.level,
      instructor: certificate.course.instructor.name,
      finalScore: certificate.finalScore,
    });
  },
);
