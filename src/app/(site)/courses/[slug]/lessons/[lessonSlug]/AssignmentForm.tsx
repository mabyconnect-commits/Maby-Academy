"use client";

import { useActionState } from "react";
import {
  Alert,
  Card,
  Field,
  Input,
  Pill,
  StatusPill,
  Textarea,
} from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { submitAssignmentAction } from "@/server/actions/learning";
import { formatDate } from "@/lib/utils";

type RubricCriterion = { name: string; description?: string; maxPoints: number };

type Assignment = {
  id: string;
  title: string;
  instructions: string;
  rubric: unknown;
  maxScore: number;
  passScore: number;
  dueAt: Date | null;
  allowsFile: boolean;
  allowsText: boolean;
  pointsValue: number;
};

type Submission = {
  id: string;
  status: string;
  textAnswer: string | null;
  linkUrl: string | null;
  fileUrl: string | null;
  score: number | null;
  feedback: string | null;
  attempt: number;
  gradedAt: Date | null;
} | null;

export function AssignmentForm({
  assignment,
  submission,
  path,
}: {
  assignment: Assignment;
  submission: Submission;
  path: string;
}) {
  const [state, formAction] = useActionState(
    submitAssignmentAction,
    emptyFormState,
  );

  const rubric = Array.isArray(assignment.rubric)
    ? (assignment.rubric as RubricCriterion[])
    : [];

  // Submitted work is frozen while it waits for a grade; a returned
  // submission can be reworked and sent again as a new attempt.
  const awaitingReview =
    submission?.status === "SUBMITTED" || submission?.status === "UNDER_REVIEW";
  const passed = submission?.status === "GRADED";
  const canEdit = !awaitingReview && !passed;

  const overdue =
    assignment.dueAt && new Date(assignment.dueAt) < new Date() && !submission;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-mist-100">
            {assignment.title}
          </h2>
          <p className="mt-1 text-sm text-mist-400">
            Pass mark {assignment.passScore}/{assignment.maxScore}
            {assignment.dueAt && ` · due ${formatDate(assignment.dueAt)}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {submission && <StatusPill status={submission.status} />}
          <Pill tone="gold">+{assignment.pointsValue} pts</Pill>
        </div>
      </div>

      {overdue && (
        <div className="mt-4">
          <Alert tone="error">
            This assignment is past its due date. You can still submit — late
            work is better than no work — but flag it to your instructor.
          </Alert>
        </div>
      )}

      <div className="mt-5 prose-lesson text-sm">
        {assignment.instructions.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {rubric.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-mist-100">
            How this is graded
          </h3>
          <ul className="mt-2.5 space-y-2">
            {rubric.map((c) => (
              <li
                key={c.name}
                className="flex justify-between gap-4 text-sm border-b border-ink-800 pb-2 last:border-0"
              >
                <div>
                  <p className="text-mist-200">{c.name}</p>
                  {c.description && (
                    <p className="text-xs text-mist-400 mt-0.5">
                      {c.description}
                    </p>
                  )}
                </div>
                <span className="text-mist-400 tabular-nums shrink-0">
                  {c.maxPoints} pts
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Grade & feedback ------------------------------------------------ */}
      {submission?.gradedAt && (
        <div className="mt-6 rounded-lg border border-ink-600 bg-ink-900 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-mist-100">
              Your grade — attempt {submission.attempt}
            </h3>
            <span
              className={`text-lg font-semibold tabular-nums ${passed ? "text-growth-400" : "text-flag-400"}`}
            >
              {submission.score}/{assignment.maxScore}
            </span>
          </div>
          {submission.feedback && (
            <p className="mt-3 text-sm text-mist-300 leading-relaxed whitespace-pre-wrap">
              {submission.feedback}
            </p>
          )}
        </div>
      )}

      {state.message && (
        <div className="mt-5">
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        </div>
      )}

      {/* Submission form ------------------------------------------------- */}
      {canEdit ? (
        <form action={formAction} className="mt-6 space-y-4">
          <input type="hidden" name="assignmentId" value={assignment.id} />
          <input type="hidden" name="path" value={path} />

          {assignment.allowsText && (
            <Field
              label="Your answer"
              htmlFor="textAnswer"
              error={state.fieldErrors?.textAnswer}
            >
              <Textarea
                id="textAnswer"
                name="textAnswer"
                rows={9}
                defaultValue={submission?.textAnswer ?? ""}
                placeholder="Write your answer here. Show your reasoning — that's what gets graded."
              />
            </Field>
          )}

          <Field
            label="Link to your work"
            htmlFor="linkUrl"
            hint="A Google Doc, Notion page, GitHub repo, Dune dashboard — anything public."
            error={state.fieldErrors?.linkUrl}
          >
            <Input
              id="linkUrl"
              name="linkUrl"
              type="url"
              defaultValue={submission?.linkUrl ?? ""}
              placeholder="https://"
            />
          </Field>

          {assignment.allowsFile && (
            <Field
              label="File URL"
              htmlFor="fileUrl"
              hint="Paste a link to an uploaded file (PDF, spreadsheet, screenshot)."
            >
              <Input
                id="fileUrl"
                name="fileUrl"
                defaultValue={submission?.fileUrl ?? ""}
                placeholder="https://"
              />
            </Field>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <SubmitButton
              name="intent"
              value="submit"
              size="lg"
              pendingText="Submitting…"
            >
              {submission?.status === "RETURNED"
                ? "Resubmit for review"
                : "Submit for review"}
            </SubmitButton>
            <SubmitButton
              name="intent"
              value="draft"
              variant="secondary"
              size="lg"
              pendingText="Saving…"
            >
              Save draft
            </SubmitButton>
          </div>
        </form>
      ) : (
        <div className="mt-6">
          <Alert tone={passed ? "success" : "info"}>
            {passed
              ? "You passed this assignment. Nothing further needed."
              : "Your work is in the review queue. You'll be notified as soon as it's graded."}
          </Alert>
        </div>
      )}
    </Card>
  );
}
