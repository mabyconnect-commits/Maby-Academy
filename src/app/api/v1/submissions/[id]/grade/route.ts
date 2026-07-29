import { ok, readJson, route } from "@/lib/api";
import { requireRole } from "@/lib/auth/session";
import { gradeSchema } from "@/lib/validation";
import { gradeSubmission } from "@/server/services/assessment";

export const POST = route(
  async (request: Request, ctx: { params: Promise<{ id: string }> }) => {
    const grader = await requireRole("INSTRUCTOR", "ADMIN");
    const { id } = await ctx.params;

    const body = (await readJson(request)) as Record<string, unknown>;
    const input = gradeSchema.parse({ ...body, submissionId: id });

    const submission = await gradeSubmission({
      graderId: grader.id,
      graderRole: grader.role,
      submissionId: input.submissionId,
      score: input.score,
      feedback: input.feedback || undefined,
      rubricScores: input.rubricScores,
    });

    return ok(submission);
  },
);
