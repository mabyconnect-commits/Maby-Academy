import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { getCourseBySlug } from "@/server/services/courses";
import {
  Avatar,
  Card,
  LinkButton,
  Pill,
  ProgressBar,
  StatusPill,
} from "@/components/ui";
import { cn, formatDuration, formatMoney, pluralize } from "@/lib/utils";
import { paymentsEnabled } from "@/lib/payments";
import { EnrollButton } from "./EnrollButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.subtitle ?? course.description.slice(0, 155),
  };
}

const LESSON_ICONS: Record<string, string> = {
  VIDEO: "▶",
  TEXT: "📄",
  QUIZ: "❓",
  ASSIGNMENT: "✍",
  LIVE: "🔴",
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();
  const course = await getCourseBySlug(slug, user?.id);
  const checkoutAvailable = paymentsEnabled();

  if (!course) notFound();
  if (course.status !== "PUBLISHED" && user?.role !== "ADMIN") notFound();

  const { enrollment, stats } = course;
  const isEnrolled = Boolean(enrollment);

  // Where "continue" should point: the last lesson touched, else the first.
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const resumeLesson =
    allLessons.find((l) => l.id === enrollment?.lastLessonId) ??
    allLessons.find((l) => !l.progress.isCompleted) ??
    allLessons[0];

  const priceLabel =
    course.priceMinor === 0
      ? "Free"
      : formatMoney(course.priceMinor, course.currency);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-mist-400 mb-6" aria-label="Breadcrumb">
        <Link href="/courses" className="hover:text-mist-200">
          Courses
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <Link
          href={`/courses?category=${course.category.slug}`}
          className="hover:text-mist-200"
        >
          {course.category.name}
        </Link>
      </nav>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* ------------------------------------------------------------- */}
        {/* Main column                                                    */}
        {/* ------------------------------------------------------------- */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="eyebrow flex items-center gap-1.5">
              <span aria-hidden>{course.category.iconEmoji}</span>
              {course.category.name}
            </p>
            <span className="text-ink-600" aria-hidden>
              |
            </span>
            <StatusPill status={course.level} />
            {course.status !== "PUBLISHED" && (
              <StatusPill status={course.status} />
            )}
          </div>

          <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-tight text-mist-100">
            {course.title}
          </h1>
          {course.subtitle && (
            <p className="mt-3.5 text-lg leading-relaxed text-mist-300">
              {course.subtitle}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-5 text-sm text-mist-400">
            <span className="flex items-center gap-2">
              <Avatar
                name={course.instructor.name}
                src={course.instructor.avatarUrl}
                size={26}
              />
              {course.instructor.name}
            </span>
            <span aria-hidden>·</span>
            <span>{pluralize(course._count.enrollments, "student")}</span>
            {stats.avgRating != null && (
              <>
                <span aria-hidden>·</span>
                <span className="text-gold-400">
                  ★ {stats.avgRating} ({stats.reviewCount})
                </span>
              </>
            )}
          </div>

          <section className="mt-10">
            <p className="eyebrow">About</p>
            <h2 className="mt-2 text-xl font-semibold text-mist-100">
              What this course covers
            </h2>
            <div className="prose-lesson mt-3">
              {course.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Curriculum ------------------------------------------------- */}
          <section className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
              <div>
                <p className="eyebrow">Curriculum</p>
                <h2 className="mt-2 text-xl font-semibold text-mist-100">
                  {pluralize(course.modules.length, "module")},{" "}
                  {pluralize(stats.lessonCount, "lesson")}
                </h2>
              </div>
              <p className="text-sm text-mist-400">
                {formatDuration(stats.totalSeconds)} of video
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {course.modules.map((module, mi) => (
                <Card key={module.id} className="overflow-hidden p-0">
                  <div className="flex items-start gap-3.5 border-b border-rule bg-ink-800/50 px-5 py-4">
                    {/* The module number as a gold-ruled numeral — it gives the
                        curriculum the ordered, syllabus feel the design asks
                        for, and makes long module lists scannable. */}
                    <span
                      className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-gold-500/35 text-xs font-bold text-gold-500 tabular-nums"
                      aria-hidden
                    >
                      {mi + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-mist-100">
                        {module.title}
                      </h3>
                      {module.description && (
                        <p className="mt-1 text-sm text-mist-400">
                          {module.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <ul className="divide-y divide-rule">
                    {module.lessons.map((lesson) => {
                      const openable = isEnrolled || lesson.isPreview;
                      const inner = (
                        <>
                          <span
                            className={cn(
                              "w-5 shrink-0 text-xs",
                              lesson.progress.isCompleted
                                ? "text-growth-500"
                                : "text-mist-400",
                            )}
                            aria-hidden
                          >
                            {lesson.progress.isCompleted
                              ? "✓"
                              : (LESSON_ICONS[lesson.type] ?? "•")}
                          </span>
                          <span
                            className={
                              lesson.progress.isCompleted
                                ? "text-mist-400 flex-1"
                                : "text-mist-200 flex-1"
                            }
                          >
                            {lesson.title}
                          </span>
                          <span className="flex items-center gap-2 shrink-0">
                            {lesson.isPreview && !isEnrolled && (
                              <Pill tone="growth">Free preview</Pill>
                            )}
                            {lesson.videoDuration ? (
                              <span className="text-xs text-mist-400 tabular-nums">
                                {formatDuration(lesson.videoDuration)}
                              </span>
                            ) : null}
                            {!openable && (
                              <span className="text-xs text-mist-400" aria-label="Locked">
                                🔒
                              </span>
                            )}
                          </span>
                        </>
                      );

                      return (
                        <li key={lesson.id}>
                          {openable ? (
                            <Link
                              href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                              className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-gold-500/8"
                            >
                              {inner}
                            </Link>
                          ) : (
                            <div className="flex items-center gap-3 px-5 py-3 text-sm opacity-70">
                              {inner}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          {/* Reviews ---------------------------------------------------- */}
          {course.reviews.length > 0 && (
            <section className="mt-12">
              <p className="eyebrow">Reviews</p>
              <h2 className="mt-2 text-xl font-semibold text-mist-100">
                What students say
              </h2>
              <div className="mt-5 space-y-3">
                {course.reviews.map((review) => (
                  <Card key={review.id}>
                    <div className="flex items-center gap-3">
                      <Avatar name={review.user.name} src={review.user.avatarUrl} size={32} />
                      <div>
                        <p className="text-sm font-medium text-mist-100">
                          {review.user.name}
                        </p>
                        <p className="text-xs text-gold-400" aria-label={`${review.rating} out of 5`}>
                          {"★".repeat(review.rating)}
                          <span className="text-mist-400">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </p>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="mt-3 text-sm text-mist-300 leading-relaxed">
                        {review.comment}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Enrolment sidebar                                              */}
        {/* ------------------------------------------------------------- */}
        <aside className="min-w-0 lg:sticky lg:top-24">
          {/* Gold, because on this page enrolling (or resuming) is the single
              action everything else exists to support. */}
          <Card variant="gold" id="enrol" className="scroll-mt-24">
            {isEnrolled ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">Your progress</p>
                  <StatusPill status={enrollment!.status} />
                </div>
                <p className="mt-3 text-3xl font-bold text-mist-100 tabular-nums">
                  {Math.round(enrollment!.progressPercent)}%
                </p>
                <div className="mt-2.5">
                  <ProgressBar value={enrollment!.progressPercent} />
                </div>
                <p className="mt-2.5 text-xs text-mist-400">
                  {stats.completedCount} of {stats.lessonCount} lessons complete
                </p>

                {resumeLesson && (
                  <LinkButton
                    href={`/courses/${course.slug}/lessons/${resumeLesson.slug}`}
                    className="mt-5 w-full"
                    size="lg"
                  >
                    {enrollment!.progressPercent > 0 ? "Continue learning" : "Start course"}
                  </LinkButton>
                )}
              </>
            ) : (
              <>
                <p className="eyebrow">Enrol</p>
                <p className="mt-2.5 text-3xl font-bold text-mist-100">
                  {priceLabel}
                </p>
                <p className="mt-1.5 text-sm text-mist-400">
                  Lifetime access, including every future update.
                </p>

                <div className="mt-5">
                  <EnrollButton
                    courseId={course.id}
                    slug={course.slug}
                    isSignedIn={Boolean(user)}
                    isPaid={course.priceMinor > 0}
                    paymentsAvailable={checkoutAvailable}
                    priceLabel={formatMoney(course.priceMinor, course.currency)}
                  />
                </div>
              </>
            )}

            <dl className="mt-6 space-y-2.5 border-t border-rule pt-5 text-sm">
              <Row label="Lessons" value={String(stats.lessonCount)} />
              <Row label="Video" value={formatDuration(stats.totalSeconds)} />
              <Row label="Level" value={course.level.toLowerCase()} capitalize />
              <Row
                label="Certificate"
                value={`at ${course.passThreshold}% complete`}
              />
            </dl>
          </Card>

          <Card className="mt-4">
            <p className="eyebrow">Your instructor</p>
            <div className="mt-3 flex items-start gap-3">
              <Avatar
                name={course.instructor.name}
                src={course.instructor.avatarUrl}
                size={44}
              />
              <div>
                <p className="text-sm font-medium text-mist-100">
                  {course.instructor.name}
                </p>
                {course.instructor.bio && (
                  <p className="mt-1 text-xs text-mist-400 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </aside>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Sticky enrol bar, phones only                                      */}
      {/* ----------------------------------------------------------------- */}
      {/*
        On a phone the enrolment card stacks below the whole curriculum, so the
        price and the action are several screens down. This keeps both in view.

        It deliberately does not duplicate the enrolment *form*: two forms
        driving the same server action would mean two independent pending
        states, and the paid path's Flutterwave disclosure would have to be
        repeated or dropped. Instead each case links to the one authoritative
        control — straight to the destination where that needs no form at all,
        and to #enrol where it does.

        `sticky`, not `fixed`. A fixed bar sits outside the flow and covers the
        footer's last line, and the padding that would clear it has to live on
        the global footer — which would then carry dead space on every other
        page. Sticky pins the bar for the whole length of the course content,
        then settles above the footer on its own.
      */}
      <div className="sticky bottom-0 z-30 -mx-4 mt-10 border-t border-rule bg-ink-950/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          {isEnrolled ? (
            <>
              <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-[0.12em] text-mist-400 uppercase">
                  Your progress
                </p>
                <p className="text-sm font-semibold text-mist-100 tabular-nums">
                  {Math.round(enrollment!.progressPercent)}% ·{" "}
                  {stats.completedCount}/{stats.lessonCount}
                </p>
              </div>
              {resumeLesson && (
                <LinkButton
                  href={`/courses/${course.slug}/lessons/${resumeLesson.slug}`}
                  className="shrink-0"
                >
                  {enrollment!.progressPercent > 0 ? "Continue" : "Start"}
                </LinkButton>
              )}
            </>
          ) : (
            <>
              <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-[0.12em] text-mist-400 uppercase">
                  {course.priceMinor === 0 ? "Free course" : "One payment"}
                </p>
                <p className="text-lg font-bold text-mist-100">{priceLabel}</p>
              </div>
              <LinkButton
                href={
                  user
                    ? "#enrol"
                    : `/register?next=/courses/${course.slug}`
                }
                className="shrink-0"
              >
                {user ? "Enrol" : "Join to enrol"}
              </LinkButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * `capitalize` is opt-in per row. CSS `capitalize` title-cases *every* word, so
 * applying it to the whole list turned "at 80% complete" into
 * "At 80% Complete" — it belongs only on single-word enum values like the level.
 */
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
      <dd className={cn("text-right text-mist-200", capitalize && "capitalize")}>
        {value}
      </dd>
    </div>
  );
}
