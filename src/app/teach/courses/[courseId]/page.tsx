import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import {
  auditCourseReadiness,
  lessonCompletionGap,
} from "@/server/services/authoring";
import { ServiceError } from "@/server/services/auth";
import { Card, PanelHead, Pill, StatusPill } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { cn, formatMoney, pluralize } from "@/lib/utils";
import { LessonEditor } from "./LessonEditor";
import { AddLessonForm, AddModuleForm } from "./AddForms";

export const metadata: Metadata = { title: "Course builder" };
export const dynamic = "force-dynamic";

/** Only these two states allow adding, removing or reordering lessons. */
const STRUCTURAL_STATES = ["DRAFT", "CHANGES_REQUESTED"];

/** The editorial pipeline, in order, for the sidebar tracker. */
const WORKFLOW = [
  { status: "DRAFT", label: "Draft" },
  { status: "IN_REVIEW", label: "In review" },
  { status: "CHANGES_REQUESTED", label: "Changes requested" },
  { status: "APPROVED", label: "Approved" },
  { status: "PUBLISHED", label: "Published" },
  { status: "ARCHIVED", label: "Archived" },
] as const;

export default async function CourseBuilderPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const user = await guardPermission("course:create", "The course builder");

  let audit;
  try {
    audit = await auditCourseReadiness(user, courseId);
  } catch (error) {
    // The service returns 404 for both "missing" and "not yours", so the page
    // does the same rather than leaking which it was.
    if (error instanceof ServiceError && error.status === 404) notFound();
    throw error;
  }

  const { course, problems, ready } = audit;
  const structural = STRUCTURAL_STATES.includes(course.status);
  const lessonCount = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const currentStep = WORKFLOW.findIndex((w) => w.status === course.status);

  return (
    // The base `grid-cols-[minmax(0,1fr)]` is not redundant with the xl
    // variant. Below xl this is a single implicit `auto` track, whose minimum
    // is the item's min-content — so a long module or lesson title pushed the
    // card past the right edge of a phone. Declaring the mobile track with an
    // explicit 0 minimum is what keeps it inside the screen.
    <div className="grid items-start gap-5 grid-cols-[minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card pad="wide">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[17px] leading-[1.3] font-extrabold text-mist-100">
            {course.title}
          </h2>
          <StatusPill status={course.status} />
        </div>
        <p className="mb-5 text-[11.5px] leading-[1.5] text-mist-400">
          {structural
            ? "Add and edit freely while this is a draft. A lesson cannot be published without a completion condition."
            : "This course is not in a draft state, so lessons cannot be added, removed or reordered — students are part-way through it. Content edits are still allowed."}
        </p>

        {course.modules.length === 0 ? (
          <p className="mb-4 text-xs leading-[1.65] text-mist-400">
            No modules yet. A module is a chapter; lessons live inside one.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {course.modules.map((module, mi) => (
              <div key={module.id}>
                <div className="mb-3 flex items-start gap-3">
                  <span
                    className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-gold-500/35 text-xs font-bold text-gold-500 tabular-nums"
                    aria-hidden
                  >
                    {mi + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold text-mist-100">
                      {module.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] font-medium text-mist-400">
                      {pluralize(module.lessons.length, "lesson")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pl-0 sm:pl-10">
                  {module.lessons.map((lesson) => (
                    <LessonEditor
                      key={lesson.id}
                      courseId={course.id}
                      lesson={lesson}
                      structuralEditsAllowed={structural}
                      gap={lessonCompletionGap(lesson)}
                    />
                  ))}

                  {structural && (
                    <div className="mt-1">
                      <AddLessonForm courseId={course.id} moduleId={module.id} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {structural && (
          <div className="mt-5 border-t border-rule pt-5">
            <AddModuleForm courseId={course.id} />
          </div>
        )}
      </Card>

      {/* --------------------------------------------------------------- */}
      {/* Right rail                                                       */}
      {/* --------------------------------------------------------------- */}
      <div className="flex flex-col gap-4">
        <Card>
          <PanelHead title="Readiness" className="mb-2" />
          {ready ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="text-growth-500">
                  <Icon name="check" size={16} strokeWidth={2.5} />
                </span>
                <p className="text-xs font-bold text-growth-500">
                  Every lesson is gated
                </p>
              </div>
              <p className="mt-2.5 text-[11px] leading-[1.6] text-mist-400">
                {pluralize(lessonCount, "lesson")} across{" "}
                {pluralize(course.modules.length, "module")}, each with a real
                completion condition. This course is ready to submit for review.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2.5">
                <span className="text-ember-500">
                  <Icon name="flag" size={16} strokeWidth={2.5} />
                </span>
                <p className="text-xs font-bold text-ember-500">
                  {pluralize(problems.length, "thing")} to fix
                </p>
              </div>
              <ul className="mt-3 space-y-2">
                {problems.slice(0, 10).map((p, i) => (
                  <li key={`${p.where}-${i}`} className="text-[11px] leading-[1.5]">
                    <span className="font-semibold text-mist-200">{p.where}</span>
                    <span className="text-mist-400"> — {p.problem}</span>
                  </li>
                ))}
                {problems.length > 10 && (
                  <li className="text-[11px] text-mist-400">
                    …and {problems.length - 10} more
                  </li>
                )}
              </ul>
            </>
          )}
          <p className="mt-3.5 border-t border-rule pt-3 text-[11px] leading-[1.6] text-mist-400/80">
            Opening a lesson page never marks it complete. Every lesson needs a
            watch threshold, a quiz or an assignment before it can publish —
            that rule is what a Maby Academy certificate rests on.
          </p>
        </Card>

        <Card>
          <PanelHead title="Editorial workflow" className="mb-3" />
          <div className="flex flex-col">
            {WORKFLOW.map((step, i) => {
              const isCurrent = step.status === course.status;
              const isPast = currentStep > i;
              return (
                <div key={step.status} className="flex items-center gap-3 py-2">
                  <span
                    className={cn(
                      "size-[9px] shrink-0 rounded-full",
                      isCurrent
                        ? "bg-gold-500 ring-[3px] ring-gold-500/25"
                        : isPast
                          ? "bg-growth-500"
                          : "bg-mist-100/15",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[11.5px]",
                      isCurrent
                        ? "font-bold text-mist-100"
                        : isPast
                          ? "font-medium text-mist-300"
                          : "text-mist-400",
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 border-t border-rule pt-3 text-[11px] leading-[1.6] text-mist-400/80">
            You cannot approve your own course. A separate reviewer reads it —
            that is the point of the queue, not a formality.
          </p>
        </Card>

        <Card>
          <PanelHead title="Details" className="mb-3" />
          <dl className="space-y-2.5 text-[11.5px]">
            <Row label="Category" value={course.category.name} />
            <Row label="Level" value={course.level.toLowerCase()} capitalize />
            <Row
              label="Price"
              value={
                course.priceMinor === 0
                  ? "Free"
                  : formatMoney(course.priceMinor, course.currency)
              }
            />
            <Row
              label="Certificate at"
              value={`${course.passThreshold}% complete`}
            />
          </dl>
          <div className="mt-3.5 border-t border-rule pt-3">
            <Link
              href={`/courses/${course.slug}`}
              className="-my-2 inline-flex items-center py-2 text-[11px] font-semibold text-gold-500 hover:text-gold-400"
            >
              Preview as a student →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-mist-400">{label}</dt>
      <dd
        className={cn(
          "text-right font-semibold text-mist-200",
          capitalize && "capitalize",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
