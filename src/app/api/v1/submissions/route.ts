import { ok, readJson, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { submissionSchema } from "@/lib/validation";
import { getMyAssignments, saveSubmission } from "@/server/services/assessment";

export const GET = route(async () => {
  const user = await requireUser();
  return ok({ assignments: await getMyAssignments(user.id) });
});

export const POST = route(async (request: Request) => {
  const user = await requireUser();
  const input = submissionSchema.parse(await readJson(request));

  const submission = await saveSubmission({
    userId: user.id,
    assignmentId: input.assignmentId,
    textAnswer: input.textAnswer || undefined,
    linkUrl: input.linkUrl || undefined,
    fileUrl: input.fileUrl || undefined,
    asDraft: input.asDraft,
  });

  return ok(submission, 201);
});
