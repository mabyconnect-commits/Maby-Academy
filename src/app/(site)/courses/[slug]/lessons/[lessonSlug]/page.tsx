import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { getLessonForViewer } from "@/server/services/courses";
import { getQuizAttempts } from "@/server/services/assessment";
import { Alert, Card, LinkButton, Pill, ProgressBar } from "@/components/ui";
import { cn, formatDuration } from "@/lib/utils";
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
    // max-w-6xl, not 7xl: the header and footer are 6xl, and a wider body
    // makes the lesson start 64px left of the logo, which reads as a broken
    // layout rather than a deliberately wide reading column.
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_310px]">
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
            <p className="eyebrow">
              Lesson {data.position.index} of {data.position.total}
            </p>
            <span className="text-ink-600" aria-hidden>
              |
            </span>
            <Pill tone="neutral">
              {LESSON_ICONS[lesson.type]} {lesson.type.toLowerCase()}
            </Pill>
            {progress?.isCompleted && <Pill tone="growth">✓ Complete</Pill>}
            {lesson.isPreview && !enrollment && (
              <Pill tone="gold">Free preview</Pill>
            )}
          </div>

          <h1 className="mt-3.5 text-3xl leading-tight font-semibold tracking-tight text-mist-100">
            {lesson.title}
          </h1>

          {/* Video ---------------------------------------------------- */}
          {lesson.videoUrl && (
            // Always black behind the frame, never a themed surface: a video
            // letterboxing against a white card looks like a broken embed.
            <div className="mt-6 aspect-video overflow-hidden rounded-[var(--radius-card)] border border-rule-strong bg-black">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
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
              <p className="eyebrow">Resources</p>
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
            <div className="mt-10 border-t border-rule pt-6">
              <CompleteLessonForm
                lessonId={lesson.id}
                path={path}
                isCompleted={progress?.isCompleted ?? false}
                nextHref={
                  data.next
                    ? `/courses/${course.slug}/lessons/${data.next.slug}`
                    : null
                }
                activity={
                  lesson.activityTitle && lesson.activityPrompt
                    ? {
                        title: lesson.activityTitle,
                        prompt: lesson.activityPrompt,
                      }
                    : null
                }
                minReflectionChars={lesson.minReflectionChars}
                existingReflection={progress?.reflection ?? null}
              />
            </div>
          )}

          <nav
            className="mt-8 flex justify-between gap-3"
            aria-label="Lesson navigation"
          >
            {data.prev ? (
              <LinkButton
                href={`/courses/${course.slug}/lessons/${data.prev.slug}`}
                variant="secondary"
                size="sm"
                className="min-w-0 max-w-[48%]"
              >
                <span aria-hidden>←</span>
                {/* Lesson titles run long; unclamped they blow the button out
                    to the full column width on a phone. */}
                <span className="truncate">{data.prev.title}</span>
              </LinkButton>
            ) : (
              <span />
            )}
            {data.next ? (
              <LinkButton
                href={`/courses/${course.slug}/lessons/${data.next.slug}`}
                variant="secondary"
                size="sm"
                className="ml-auto min-w-0 max-w-[48%]"
              >
                <span className="truncate">{data.next.title}</span>
                <span aria-hidden>→</span>
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
          <Card className="overflow-hidden p-0">
            <div className="border-b border-rule bg-ink-800/50 px-4 py-3.5">
              <p className="eyebrow">Course outline</p>
              <p className="mt-1.5 text-sm font-semibold text-mist-100">
                {course.title}
              </p>
              {enrollment && (
                <div className="mt-2.5">
                  <ProgressBar value={enrollment.progressPercent} showLabel />
                </div>
              )}
            </div>

            <div className="divide-y divide-rule">
              {course.modules.map((module) => (
                <div key={module.id} className="py-2">
                  <p className="px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] text-mist-400 uppercase">
                    {module.title}
                  </p>
                  <ul>
                    {module.lessons.map((l) => {
                      const isCurrent = l.id === lesson.id;
                      const done = completedLessonIds.has(l.id);
                      const openable = Boolean(enrollment) || l.isPreview;

                      const body = (
                        <>
                          <span
                            className={cn(
                              "w-4 shrink-0 text-xs",
                              done && !isCurrent && "text-growth-500",
                            )}
                            aria-hidden
                          >
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

                      const classes = cn(
                        "flex items-start gap-2 py-2 pr-4 text-sm transition-colors",
                        // A left border on the current row only would shift
                        // every other row by 2px; a transparent one on the
                        // rest keeps the text edge aligned down the list.
                        "border-l-2 pl-3.5",
                        isCurrent
                          ? "border-gold-500 bg-gold-500/10 font-medium text-gold-300"
                          : done
                            ? "border-transparent text-mist-400 hover:bg-gold-500/8"
                            : "border-transparent text-mist-200 hover:bg-gold-500/8",
                      );

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
                            <div className={cn(classes, "opacity-60")}>{body}</div>
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
