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
import { formatDuration, formatMoney, pluralize } from "@/lib/utils";
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

      <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
        {/* ------------------------------------------------------------- */}
        {/* Main column                                                    */}
        {/* ------------------------------------------------------------- */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="gold">
              {course.category.iconEmoji} {course.category.name}
            </Pill>
            <StatusPill status={course.level} />
            {course.status !== "PUBLISHED" && (
              <StatusPill status={course.status} />
            )}
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight leading-tight">
            {course.title}
          </h1>
          {course.subtitle && (
            <p className="mt-3 text-lg text-mist-300 leading-relaxed">
              {course.subtitle}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mist-400">
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
            <h2 className="text-xl font-semibold">About this course</h2>
            <div className="mt-3 prose-lesson">
              {course.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Curriculum ------------------------------------------------- */}
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Curriculum</h2>
              <p className="text-sm text-mist-400">
                {pluralize(course.modules.length, "module")} ·{" "}
                {pluralize(stats.lessonCount, "lesson")} ·{" "}
                {formatDuration(stats.totalSeconds)}
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {course.modules.map((module, mi) => (
                <Card key={module.id} className="p-0 overflow-hidden">
                  <div className="px-5 py-4 bg-ink-800/50 border-b border-ink-700">
                    <h3 className="font-semibold text-mist-100">
                      <span className="text-gold-500 font-mono text-sm mr-2">
                        {String(mi + 1).padStart(2, "0")}
                      </span>
                      {module.title}
                    </h3>
                    {module.description && (
                      <p className="mt-1 text-sm text-mist-400">
                        {module.description}
                      </p>
                    )}
                  </div>

                  <ul className="divide-y divide-ink-800">
                    {module.lessons.map((lesson) => {
                      const openable = isEnrolled || lesson.isPreview;
                      const inner = (
                        <>
                          <span
                            className="text-xs w-5 shrink-0 text-mist-400"
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
                              className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-ink-800/60 transition-colors"
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
              <h2 className="text-xl font-semibold">What students say</h2>
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
        <aside className="lg:sticky lg:top-24">
          <Card>
            {isEnrolled ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-mist-100">
                    Your progress
                  </p>
                  <StatusPill status={enrollment!.status} />
                </div>
                <div className="mt-3">
                  <ProgressBar value={enrollment!.progressPercent} showLabel />
                </div>
                <p className="mt-2 text-xs text-mist-400">
                  {stats.completedCount} of {stats.lessonCount} lessons complete
                </p>

                {resumeLesson && (
                  <LinkButton
                    href={`/courses/${course.slug}/lessons/${resumeLesson.slug}`}
                    className="w-full mt-5"
                    size="lg"
                  >
                    {enrollment!.progressPercent > 0 ? "Continue learning" : "Start course"}
                  </LinkButton>
                )}
              </>
            ) : (
              <>
                <p className="text-3xl font-semibold">
                  {course.priceMinor === 0
                    ? "Free"
                    : formatMoney(course.priceMinor, course.currency)}
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

            <dl className="mt-6 pt-5 border-t border-ink-700 space-y-2.5 text-sm">
              <Row label="Lessons" value={String(stats.lessonCount)} />
              <Row label="Video" value={formatDuration(stats.totalSeconds)} />
              <Row label="Level" value={course.level.toLowerCase()} />
              <Row
                label="Certificate"
                value={`at ${course.passThreshold}% complete`}
              />
            </dl>
          </Card>

          <Card className="mt-4">
            <h3 className="text-sm font-semibold text-mist-100">
              Your instructor
            </h3>
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
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-mist-400">{label}</dt>
      <dd className="text-mist-200 capitalize text-right">{value}</dd>
    </div>
  );
}
