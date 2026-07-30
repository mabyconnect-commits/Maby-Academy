import type { PrismaClient } from "@prisma/client";
import type { ContentCourse, ContentLesson } from "./types";

/**
 * Loads authored course content into the database.
 *
 * Idempotent by design — it upserts on stable natural keys so the seed can be
 * re-run against an existing database without duplicating a curriculum or
 * orphaning student progress. That matters more than it sounds: lesson progress
 * points at a lesson id, so recreating lessons rather than updating them would
 * silently reset every student's completion.
 *
 * Ordering (`sortOrder`) and lesson slugs are derived here rather than authored,
 * so a writer adding a lesson in the middle of a module does not have to
 * renumber anything by hand.
 */

/** URL-safe slug from a title, stable for the same input. */
function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[''']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "lesson"
  );
}

/**
 * Lesson slugs must be unique per course, because the lesson URL is
 * `/courses/[slug]/lessons/[lessonSlug]`. Two lessons titled "Check your
 * understanding" in different modules would otherwise collide and one would be
 * permanently unreachable.
 */
function uniqueSlugs(course: ContentCourse): Map<ContentLesson, string> {
  const used = new Set<string>();
  const assigned = new Map<ContentLesson, string>();

  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      const base = slugify(lesson.title);
      let slug = base;
      let n = 2;
      while (used.has(slug)) slug = `${base}-${n++}`;
      used.add(slug);
      assigned.set(lesson, slug);
    }
  }

  return assigned;
}

/** Rough reading time, used to give video-less text lessons a sane duration. */
function readingSeconds(body: string): number {
  const words = body.trim().split(/\s+/).length;
  // 200 words per minute, floored at a minute so nothing reads as instant.
  return Math.max(60, Math.round((words / 200) * 60));
}

export async function loadCourse(db: PrismaClient, course: ContentCourse) {
  const category = await db.category.findUnique({
    where: { slug: course.categorySlug },
    select: { id: true },
  });
  if (!category) {
    throw new Error(
      `Course "${course.slug}" references category "${course.categorySlug}", which does not exist. Seed categories first.`,
    );
  }

  const instructor = await db.user.findUnique({
    where: { email: course.instructorEmail },
    select: { id: true },
  });
  if (!instructor) {
    throw new Error(
      `Course "${course.slug}" references instructor "${course.instructorEmail}", who does not exist. Seed people first.`,
    );
  }

  const courseData = {
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    categoryId: category.id,
    instructorId: instructor.id,
    level: course.level,
    priceMinor: course.priceMinor,
    currency: course.currency ?? "USD",
    estimatedHours: course.estimatedHours,
    passThreshold: course.passThreshold,
    outcomes: course.outcomes,
    status: "PUBLISHED" as const,
  };

  const row = await db.course.upsert({
    where: { slug: course.slug },
    create: { slug: course.slug, ...courseData, publishedAt: new Date() },
    update: courseData,
    select: { id: true },
  });

  const slugs = uniqueSlugs(course);

  /**
   * Modules have no natural unique key in the schema, so they are matched on
   * (courseId, title). A retitled module therefore creates a new one and the old
   * one is removed below — which is correct, but means a retitle is a structural
   * change, not a cosmetic one.
   */
  const keptModuleIds: string[] = [];
  const keptLessonIds: string[] = [];

  for (const [moduleIndex, module] of course.modules.entries()) {
    const existingModule = await db.module.findFirst({
      where: { courseId: row.id, title: module.title },
      select: { id: true },
    });

    const moduleRow = existingModule
      ? await db.module.update({
          where: { id: existingModule.id },
          data: {
            description: module.description,
            sortOrder: moduleIndex,
          },
          select: { id: true },
        })
      : await db.module.create({
          data: {
            courseId: row.id,
            title: module.title,
            description: module.description,
            sortOrder: moduleIndex,
          },
          select: { id: true },
        });

    keptModuleIds.push(moduleRow.id);

    for (const [lessonIndex, lesson] of module.lessons.entries()) {
      const slug = slugs.get(lesson)!;

      const lessonData = {
        title: lesson.title,
        type: lesson.type,
        content: lesson.body,
        sortOrder: lessonIndex,
        isPreview: lesson.isPreview ?? false,
        pointsValue: lesson.points ?? 10,
        // A text lesson has no video, so it needs no watch gate; its completion
        // condition comes from its quiz or assignment. A VIDEO lesson without a
        // real video would otherwise be completable by opening the page.
        minWatchPercent: lesson.type === "VIDEO" ? 80 : 0,
        videoDuration: lesson.type === "VIDEO" ? readingSeconds(lesson.body) : 0,
        activityTitle: lesson.activity?.title ?? null,
        activityPrompt: lesson.activity?.prompt ?? null,
        /**
         * A written lesson with an activity is gated on the learner's write-up.
         * Without this a TEXT lesson with no quiz and no assignment completes
         * simply by being opened, which contradicts the academy's central
         * promise — and 120 characters is short enough to be honest work rather
         * than a hurdle.
         */
        minReflectionChars:
          lesson.activity && !lesson.quiz && !lesson.assignment ? 120 : 0,
      };

      // Upsert on (moduleId, slug): re-running the seed updates the lesson in
      // place, so existing LessonProgress rows keep pointing at it.
      const existingLesson = await db.lesson.findFirst({
        where: { moduleId: moduleRow.id, slug },
        select: { id: true },
      });

      const lessonRow = existingLesson
        ? await db.lesson.update({
            where: { id: existingLesson.id },
            data: lessonData,
            select: { id: true },
          })
        : await db.lesson.create({
            data: { moduleId: moduleRow.id, slug, ...lessonData },
            select: { id: true },
          });

      keptLessonIds.push(lessonRow.id);

      // ---- Quiz -------------------------------------------------------
      if (lesson.quiz) {
        const quizRow = await db.quiz.upsert({
          where: { lessonId: lessonRow.id },
          create: {
            lessonId: lessonRow.id,
            title: lesson.quiz.title,
            passScore: lesson.quiz.passScore,
            maxAttempts: lesson.quiz.maxAttempts,
          },
          update: {
            title: lesson.quiz.title,
            passScore: lesson.quiz.passScore,
            maxAttempts: lesson.quiz.maxAttempts,
          },
          select: { id: true },
        });

        /**
         * Questions are replaced wholesale rather than matched. Attempts store
         * the score, not a reference to each option, so replacing questions
         * cannot corrupt a past attempt — and matching questions by prompt text
         * would silently keep a stale answer key when a prompt is reworded.
         */
        await db.quizQuestion.deleteMany({ where: { quizId: quizRow.id } });

        for (const [qi, question] of lesson.quiz.questions.entries()) {
          await db.quizQuestion.create({
            data: {
              quizId: quizRow.id,
              prompt: question.prompt,
              explanation: question.explanation,
              type: "SINGLE_CHOICE",
              sortOrder: qi,
              points: 1,
              options: {
                create: question.options.map((option, oi) => ({
                  text: option.text,
                  isCorrect: option.correct,
                  sortOrder: oi,
                })),
              },
            },
          });
        }
      }

      // ---- Assignment -------------------------------------------------
      if (lesson.assignment) {
        const a = lesson.assignment;
        await db.assignment.upsert({
          where: { lessonId: lessonRow.id },
          create: {
            lessonId: lessonRow.id,
            title: a.title,
            instructions: a.instructions,
            maxScore: a.maxScore,
            passScore: a.passScore,
            rubric: a.rubric,
            pointsValue: lesson.points ?? 25,
          },
          update: {
            title: a.title,
            instructions: a.instructions,
            maxScore: a.maxScore,
            passScore: a.passScore,
            rubric: a.rubric,
          },
        });
      }
    }

    /**
     * Remove lessons that are no longer in the authored content — but only ones
     * nobody has touched. Deleting a lesson a student has completed would lower
     * their percentage and could revoke certificate eligibility they earned, so
     * stale lessons with progress are left in place for a human to decide about.
     */
    const orphanLessons = await db.lesson.findMany({
      where: { moduleId: moduleRow.id, id: { notIn: keptLessonIds } },
      select: { id: true, title: true, _count: { select: { progress: true } } },
    });

    for (const orphan of orphanLessons) {
      if (orphan._count.progress > 0) {
        console.warn(
          `  ! keeping removed lesson "${orphan.title}" — ${orphan._count.progress} student(s) have progress on it`,
        );
        continue;
      }
      await db.lesson.delete({ where: { id: orphan.id } });
    }
  }

  // Same rule for modules: only remove ones left completely empty.
  const orphanModules = await db.module.findMany({
    where: { courseId: row.id, id: { notIn: keptModuleIds } },
    select: { id: true, title: true, _count: { select: { lessons: true } } },
  });

  for (const orphan of orphanModules) {
    if (orphan._count.lessons > 0) {
      console.warn(
        `  ! keeping removed module "${orphan.title}" — it still has lessons`,
      );
      continue;
    }
    await db.module.delete({ where: { id: orphan.id } });
  }

  const lessonCount = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const quizCount = course.modules.reduce(
    (s, m) => s + m.lessons.filter((l) => l.quiz).length,
    0,
  );
  const assignmentCount = course.modules.reduce(
    (s, m) => s + m.lessons.filter((l) => l.assignment).length,
    0,
  );

  return { courseId: row.id, lessonCount, quizCount, assignmentCount };
}

export async function loadCourses(db: PrismaClient, courses: ContentCourse[]) {
  for (const course of courses) {
    const result = await loadCourse(db, course);
    console.log(
      `  ✓ ${course.title} — ${result.lessonCount} lessons, ${result.quizCount} quizzes, ${result.assignmentCount} assignments`,
    );
  }
}
