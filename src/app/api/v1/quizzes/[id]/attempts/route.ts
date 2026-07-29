import { ok, readJson, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { quizAttemptSchema } from "@/lib/validation";
import { getQuizAttempts, submitQuizAttempt } from "@/server/services/assessment";

export const GET = route(
  async (_request: Request, ctx: { params: Promise<{ id: string }> }) => {
    const user = await requireUser();
    const { id } = await ctx.params;
    return ok({ attempts: await getQuizAttempts(id, user.id) });
  },
);

export const POST = route(
  async (request: Request, ctx: { params: Promise<{ id: string }> }) => {
    const user = await requireUser();
    const { id } = await ctx.params;

    const body = (await readJson(request)) as Record<string, unknown>;
    const input = quizAttemptSchema.parse({ ...body, quizId: id });

    const result = await submitQuizAttempt({
      userId: user.id,
      quizId: input.quizId,
      answers: input.answers,
    });

    return ok(result, 201);
  },
);
