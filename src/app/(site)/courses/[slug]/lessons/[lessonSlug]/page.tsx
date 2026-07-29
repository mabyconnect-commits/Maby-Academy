import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { getLessonForViewer } from "@/server/services/courses";
import { getQuizAttempts } from "@/server/services/assessment";
import { Alert, Card, LinkButton, Pill, ProgressBar } from "@/components/ui";
import { formatDuration } from "@/lib/utils";
import { CompleteLessonForm } from "./CompleteLessonForm";
import { QuizForm } from "./QuizForm";
import { AssignmentForm } from "./AssignmentForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const data = await getLessonForViewer(slug, lessonSlug);
  return { title: data ? `${data.lesson.title} · ${data.course.title}` : "Lesson" };
}

const LESSON_ICONS: Record<string, string> = {
  VIDEO: "▶",
  TEXT: "📄",
  QUIZ: "❓",
  ASSIGNMENT: "✍",
  LIVE: "🔴",
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const user = await getCurrentUser();
  const data = await getLessonForViewer(slug, lessonSlug, user?.id);

  if (!data) notFound();

  const { lesson, course, enrollment, progress, submission, completedLessonIds } =
    data;

  // Preview lessons are open to everyone; everything else needs enrolment.
  if (!enrollment && !lesson.isPreview) {
    if (!user) redirect(`/login?next=/courses/${slug}/lessons/${lessonSlug}`);
    redirect(`/courses/${slug}`);
  }

  const quizAttempts =
    lesson.quiz && user ? await getQuizAttempts(lesson.quiz.id, user.id) : [];
  const bestAttempt = quizAttempts.reduce<number>(
    (best, a) => Math.max(best, a.scorePercent),
    0,
  );
  const hasPassedQuiz = quizAttempts.some((a) => a.passed);

  const path = `/courses/${slug}/lessons/${lessonSlug}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* ------------------------------------------------------------- */}
        {/* Lesson body                                                    */}
        {/* ------------------------------------------------------------- */}
        <article>
          <nav className="text-sm text-mist-400 mb-4" aria-label="Breadcrumb">
            <Link href={`/courses/${course.slug}`} className="hover:text-mist-200">
              ← {course.title}
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="neutral">
              {LESSON_ICONS[lesson.type]} {lesson.type.toLowerCase()}
            </Pill>
            <span className="text-xs text-mist-400">
              Lesson {data.position.index} of {data.position.total}
            </span>
            {progress?.isCompleted && <Pill tone="growth">✓ Complete</Pill>}
            {lesson.isPreview && !enrollment && (
              <Pill tone="gold">Free preview</Pill>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {lesson.title}
          </h1>

          {/* Video ---------------------------------------------------- */}
          {lesson.videoUrl && (
            <div className="mt-6 rounded-xl overflow-hidden border border-ink-700 bg-black aspect-video">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {lesson.type === "VIDEO" && !lesson.videoUrl && (
            <div className="mt-6">
              <Alert tone="info">
                The video for this lesson hasn&apos;t been uploaded yet. Notes
                below cover the same ground.
              </Alert>
            </div>
          )}

          {/* Written content ------------------------------------------ */}
          {lesson.content && (
            <div className="mt-8 prose-lesson">
              {lesson.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return <h2 key={i}>{block.slice(3)}</h2>;
                }
                if (block.startsWith("### ")) {
                  return <h3 key={i}>{block.slice(4)}</h3>;
                }
                if (block.startsWith("- ")) {
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-1.5">
                      {block.split("\n").map((li, j) => (
                        <li key={j}>{li.replace(/^-\s*/, "")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i}>{block}</p>;
              })}
            </div>
          )}

          {/* Resources ------------------------------------------------- */}
          {lesson.resources.length > 0 && (
            <Card className="mt-8">
              <h2 className="text-sm font-semibold text-mist-100">
                Resources for this lesson
              </h2>
              <ul className="mt-3 space-y-2">
                {lesson.resources.map((r) => (
                  <li key={r.id}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold-400 hover:text-gold-300"
                    >
                      {r.title} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Quiz ------------------------------------------------------ */}
          {lesson.quiz && enrollment && (
            <section className="mt-10">
              <QuizForm
                quiz={lesson.quiz}
                path={path}
                attemptsUsed={quizAttempts.length}
                bestScore={bestAttempt}
                hasPassed={hasPassedQuiz}
              />
            </section>
          )}

          {/* Assignment ------------------------------------------------ */}
          {lesson.assignment && enrollment && (
            <section className="mt-10">
              <AssignmentForm
                assignment={lesson.assignment}
                submission={submission}
                path={path}
              />
            </section>
          )}

          {/* Completion + navigation ----------------------------------- */}
          {enrollment && (
            <div className="mt-10 pt-6 border-t border-ink-700">
              <CompleteLessonForm
                lessonId={lesson.id}
                path={path}
                isCompleted={progress?.isCompleted ?? false}
                nextHref={
                  data.next
                    ? `/courses/${course.slug}/lessons/${data.next.slug}`
                    : null
                }
              />
            </div>
          )}

          <nav className="mt-8 flex justify-between gap-4" aria-label="Lesson navigation">
            {data.prev ? (
              <LinkButton
                href={`/courses/${course.slug}/lessons/${data.prev.slug}`}
                variant="secondary"
                size="sm"
              >
                ← {data.prev.title}
              </LinkButton>
            ) : (
              <span />
            )}
            {data.next ? (
              <LinkButton
                href={`/courses/${course.slug}/lessons/${data.next.slug}`}
                variant="secondary"
                size="sm"
              >
                {data.next.title} →
              </LinkButton>
            ) : (
              <span />
            )}
          </nav>
        </article>

        {/* ------------------------------------------------------------- */}
        {/* Course outline                                                 */}
        {/* ------------------------------------------------------------- */}
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <Card className="p-0 overflow-hidden">
            <div className="px-4 py-3.5 border-b border-ink-700 bg-ink-800/50">
              <p className="text-sm font-semibold text-mist-100">
                {course.title}
              </p>
              {enrollment && (
                <div className="mt-2.5">
                  <ProgressBar value={enrollment.progressPercent} showLabel />
                </div>
              )}
            </div>

            <div className="divide-y divide-ink-800">
              {course.modules.map((module) => (
                <div key={module.id} className="py-2">
                  <p className="px-4 py-1.5 text-xs uppercase tracking-wide text-mist-400 font-semibold">
                    {module.title}
                  </p>
                  <ul>
                    {module.lessons.map((l) => {
                      const isCurrent = l.id === lesson.id;
                      const done = completedLessonIds.has(l.id);
                      const openable = Boolean(enrollment) || l.isPreview;

                      const body = (
                        <>
                          <span className="w-4 shrink-0 text-xs" aria-hidden>
                            {done ? "✓" : (LESSON_ICONS[l.type] ?? "•")}
                          </span>
                          <span className="flex-1 line-clamp-2">{l.title}</span>
                          {l.videoDuration ? (
                            <span className="text-[11px] text-mist-400 tabular-nums shrink-0">
                              {formatDuration(l.videoDuration)}
                            </span>
                          ) : null}
                        </>
                      );

                      const classes = [
                        "flex items-start gap-2 px-4 py-2 text-sm transition-colors",
                        isCurrent
                          ? "bg-gold-500/10 text-gold-300 border-l-2 border-gold-500"
                          : done
                            ? "text-mist-400 hover:bg-ink-800/60"
                            : "text-mist-200 hover:bg-ink-800/60",
                      ].join(" ");

                      return (
                        <li key={l.id}>
                          {openable ? (
                            <Link
                              href={`/courses/${course.slug}/lessons/${l.slug}`}
                              className={classes}
                              aria-current={isCurrent ? "page" : undefined}
                            >
                              {body}
                            </Link>
                          ) : (
                            <div className={`${classes} opacity-60`}>{body}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
