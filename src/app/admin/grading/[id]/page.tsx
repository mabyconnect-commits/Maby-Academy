import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { getSubmissionForGrader } from "@/server/services/assessment";
import { Avatar, Card, Pill, StatusPill } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { GradeForm } from "./GradeForm";

export const metadata: Metadata = { title: "Grade submission" };
export const dynamic = "force-dynamic";

type RubricCriterion = { name: string; description?: string; maxPoints: number };

export default async function GradeSubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const staff = await requireRole("INSTRUCTOR", "ADMIN");
  const { id } = await params;

  const submission = await getSubmissionForGrader(id, {
    id: staff.id,
    role: staff.role,
  });
  if (!submission) notFound();

  const { assignment, student } = submission;
  const rubric = Array.isArray(assignment.rubric)
    ? (assignment.rubric as RubricCriterion[])
    : [];

  return (
    <div className="space-y-6">
      <nav className="text-sm text-mist-400" aria-label="Breadcrumb">
        <Link href="/admin/grading" className="hover:text-mist-200">
          ← Grading queue
        </Link>
      </nav>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Student's work ------------------------------------------------ */}
        <div className="space-y-5">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={submission.status} />
              <Pill tone="neutral">Attempt {submission.attempt}</Pill>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              {assignment.title}
            </h1>
            <p className="mt-1.5 text-sm text-mist-400">
              {assignment.lesson.module.course.title} · {assignment.lesson.title}
            </p>
          </header>

          <Card className="flex items-center gap-3">
            <Avatar name={student.name} src={student.avatarUrl} size={40} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-mist-100">{student.name}</p>
              <p className="text-xs text-mist-400 truncate">{student.email}</p>
            </div>
            <span className="ml-auto text-xs text-mist-400 shrink-0">
              {submission.submittedAt
                ? formatDate(submission.submittedAt, true)
                : "—"}
            </span>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-mist-100">
              The assignment
            </h2>
            <div className="mt-3 prose-lesson text-sm">
              {assignment.instructions.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-mist-100">
              Submitted work
            </h2>

            {submission.textAnswer ? (
              <div className="mt-3 rounded-lg bg-ink-900 border border-ink-700 p-4">
                <p className="text-sm text-mist-200 whitespace-pre-wrap leading-relaxed">
                  {submission.textAnswer}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-mist-400">
                No written answer submitted.
              </p>
            )}

            {(submission.linkUrl || submission.fileUrl) && (
              <ul className="mt-4 space-y-2">
                {submission.linkUrl && (
                  <li>
                    <a
                      href={submission.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold-400 hover:text-gold-300 break-all"
                    >
                      🔗 {submission.linkUrl} ↗
                    </a>
                  </li>
                )}
                {submission.fileUrl && (
                  <li>
                    <a
                      href={submission.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold-400 hover:text-gold-300 break-all"
                    >
                      📎 {submission.fileUrl} ↗
                    </a>
                  </li>
                )}
              </ul>
            )}
          </Card>
        </div>

        {/* Grading panel -------------------------------------------------- */}
        <aside className="lg:sticky lg:top-24">
          <Card>
            <h2 className="text-sm font-semibold text-mist-100">Grade</h2>
            <p className="mt-1 text-xs text-mist-400">
              Pass mark {assignment.passScore} of {assignment.maxScore}. A pass
              credits {assignment.pointsValue} points and completes the lesson.
            </p>

            <div className="mt-5">
              <GradeForm
                submissionId={submission.id}
                maxScore={assignment.maxScore}
                passScore={assignment.passScore}
                rubric={rubric}
                defaultScore={submission.score}
                defaultFeedback={submission.feedback ?? ""}
              />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
