import "server-only";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import type { Actor } from "./policy";
import { actorCan } from "./policy";

/**
 * Course authoring.
 *
 * Every function takes the acting user and confirms *ownership* as well as
 * capability. Holding `course:create` says an instructor may author courses; it
 * says nothing about whether they may edit *this* one. That pairing is the rule
 * throughout this codebase, and authoring is where it matters most — a course
 * is the thing students pay for.
 *
 * Editing is restricted by status, not just by owner. A PUBLISHED course cannot
 * be restructured in place: students are part-way through it, and silently
 * deleting lesson 4 under someone would destroy their progress and possibly
 * their certificate eligibility. Structural edits require the course to be back
 * in a draft state, which routes it through review again.
 */

const EDITABLE_STATUSES = ["DRAFT", "CHANGES_REQUESTED"] as const;

type EditableStatus = (typeof EDITABLE_STATUSES)[number];

function isEditable(status: string): status is EditableStatus {
  return (EDITABLE_STATUSES as readonly string[]).includes(status);
}

/** Loads a course for authoring, or refuses. */
async function requireAuthorableCourse(
  actor: Actor,
  courseId: string,
  opts: { structural?: boolean } = {},
) {
  const course = await db.course.findUnique({
    where: { id: courseId },
    select: { id: true, instructorId: true, status: true, title: true, slug: true },
  });

  if (!course) throw new ServiceError("Course not found.", 404);

  const owns = course.instructorId === actor.id;
  const mayEditAnything = actorCan(actor, "course:publish");

  if (!owns && !mayEditAnything) {
    // 404 rather than 403: an instructor has no business learning that another
    // instructor's course exists by probing IDs.
    throw new ServiceError("Course not found.", 404);
  }

  if (!actorCan(actor, "course:edit")) {
    throw new ServiceError("You cannot edit course content.", 403);
  }

  if (opts.structural && !isEditable(course.status)) {
    throw new ServiceError(
      course.status === "PUBLISHED"
        ? "This course is published and students are part-way through it. Unpublish it first — adding or removing lessons under a learner would break their progress."
        : `A course in review cannot be restructured. Current status: ${course.status.replace(/_/g, " ").toLowerCase()}.`,
      409,
    );
  }

  return course;
}

/** The instructor's own courses, with the numbers they need. */
export async function listAuthoredCourses(actor: Actor) {
  // Scoped to the author unless they can publish anything, in which case they
  // are staff overseeing the catalogue.
  const where: Prisma.CourseWhereInput = actorCan(actor, "course:publish")
    ? {}
    : { instructorId: actor.id };

  const courses = await db.course.findMany({
    where,
    orderBy: [{ updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      level: true,
      priceMinor: true,
      currency: true,
      updatedAt: true,
      category: { select: { name: true, iconEmoji: true } },
      _count: { select: { enrollments: true, modules: true } },
      reviews: { select: { rating: true } },
      enrollments: { select: { progressPercent: true } },
    },
  });

  return courses.map((c) => {
    const ratings = c.reviews.map((r) => r.rating);
    const progress = c.enrollments.map((e) => e.progressPercent);
    return {
      id: c.id,
      title: c.title,
      slug: c.slug,
      status: c.status,
      level: c.level,
      priceMinor: c.priceMinor,
      currency: c.currency,
      updatedAt: c.updatedAt,
      category: c.category,
      moduleCount: c._count.modules,
      enrolledCount: c._count.enrollments,
      avgRating: ratings.length
        ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
        : null,
      /** Mean progress across enrolments — the number that reveals a stall. */
      avgCompletion: progress.length
        ? Math.round(progress.reduce((a, b) => a + b, 0) / progress.length)
        : 0,
    };
  });
}

/** The full tree for the builder. */
export async function getCourseForBuilder(actor: Actor, courseId: string) {
  await requireAuthorableCourse(actor, courseId);

  return db.course.findUniqueOrThrow({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      subtitle: true,
      status: true,
      level: true,
      priceMinor: true,
      currency: true,
      passThreshold: true,
      category: { select: { name: true } },
      modules: {
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          sortOrder: true,
          lessons: {
            orderBy: { sortOrder: "asc" },
            select: {
              id: true,
              title: true,
              slug: true,
              type: true,
              sortOrder: true,
              isPreview: true,
              minWatchPercent: true,
              minReflectionChars: true,
              activityTitle: true,
              activityPrompt: true,
              videoUrl: true,
              videoDuration: true,
              content: true,
              pointsValue: true,
              quiz: { select: { id: true, passScore: true, _count: { select: { questions: true } } } },
              assignment: { select: { id: true, maxScore: true, passScore: true } },
            },
          },
        },
      },
    },
  });
}

export async function createModule(
  actor: Actor,
  params: { courseId: string; title: string },
) {
  await requireAuthorableCourse(actor, params.courseId, { structural: true });

  const title = params.title.trim();
  if (title.length < 3) throw new ServiceError("Give the module a title.", 400);

  // Append at the end. Reading max+1 inside the same statement avoids two
  // simultaneous adds landing on the same sortOrder.
  const last = await db.module.findFirst({
    where: { courseId: params.courseId },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  return db.module.create({
    data: {
      courseId: params.courseId,
      title,
      sortOrder: (last?.sortOrder ?? -1) + 1,
    },
    select: { id: true, title: true },
  });
}

export async function createLesson(
  actor: Actor,
  params: {
    courseId: string;
    moduleId: string;
    title: string;
    type: "VIDEO" | "TEXT" | "QUIZ" | "ASSIGNMENT" | "LIVE";
  },
) {
  await requireAuthorableCourse(actor, params.courseId, { structural: true });

  const title = params.title.trim();
  if (title.length < 3) throw new ServiceError("Give the lesson a title.", 400);

  const module = await db.module.findUnique({
    where: { id: params.moduleId },
    select: { courseId: true },
  });
  // Guards against a module id from a different course being posted in.
  if (!module || module.courseId !== params.courseId) {
    throw new ServiceError("That module is not part of this course.", 400);
  }

  const last = await db.lesson.findFirst({
    where: { moduleId: params.moduleId },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  return db.lesson.create({
    data: {
      moduleId: params.moduleId,
      title,
      slug: await uniqueLessonSlug(params.courseId, title),
      type: params.type,
      sortOrder: (last?.sortOrder ?? -1) + 1,
    },
    select: { id: true, title: true, slug: true },
  });
}

/**
 * Lesson slugs must be unique within a course, because the lesson URL is
 * `/courses/[slug]/lessons/[lessonSlug]`. Two lessons called "Introduction" in
 * different modules would otherwise collide and one would be unreachable.
 */
async function uniqueLessonSlug(courseId: string, title: string) {
  const base =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "lesson";

  const existing = await db.lesson.findMany({
    where: { module: { courseId }, slug: { startsWith: base } },
    select: { slug: true },
  });
  const taken = new Set(existing.map((l) => l.slug));

  if (!taken.has(base)) return base;
  for (let n = 2; n < 200; n++) {
    const candidate = `${base}-${n}`;
    if (!taken.has(candidate)) return candidate;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function updateLesson(
  actor: Actor,
  params: {
    courseId: string;
    lessonId: string;
    title?: string;
    content?: string | null;
    videoUrl?: string | null;
    videoDuration?: number | null;
    minWatchPercent?: number;
    isPreview?: boolean;
    pointsValue?: number;
  },
) {
  // Content edits are not structural — fixing a typo in a published lesson is
  // exactly what an instructor should be able to do without a review cycle.
  await requireAuthorableCourse(actor, params.courseId);

  const lesson = await db.lesson.findUnique({
    where: { id: params.lessonId },
    select: { module: { select: { courseId: true } } },
  });
  if (!lesson || lesson.module.courseId !== params.courseId) {
    throw new ServiceError("That lesson is not part of this course.", 404);
  }

  const data: Prisma.LessonUpdateInput = {};
  if (params.title !== undefined) {
    const title = params.title.trim();
    if (title.length < 3) throw new ServiceError("Give the lesson a title.", 400);
    data.title = title;
  }
  if (params.content !== undefined) data.content = params.content;
  if (params.videoUrl !== undefined) data.videoUrl = params.videoUrl;
  if (params.videoDuration !== undefined) {
    data.videoDuration = params.videoDuration ?? 0;
  }
  if (params.minWatchPercent !== undefined) {
    if (params.minWatchPercent < 0 || params.minWatchPercent > 100) {
      throw new ServiceError("Watch threshold must be between 0 and 100.", 400);
    }
    data.minWatchPercent = params.minWatchPercent;
  }
  if (params.isPreview !== undefined) data.isPreview = params.isPreview;
  if (params.pointsValue !== undefined) {
    if (params.pointsValue < 0 || params.pointsValue > 500) {
      throw new ServiceError("Lesson points must be between 0 and 500.", 400);
    }
    data.pointsValue = params.pointsValue;
  }

  return db.lesson.update({
    where: { id: params.lessonId },
    data,
    select: { id: true, title: true },
  });
}

export async function deleteLesson(
  actor: Actor,
  params: { courseId: string; lessonId: string },
) {
  await requireAuthorableCourse(actor, params.courseId, { structural: true });

  const lesson = await db.lesson.findUnique({
    where: { id: params.lessonId },
    select: {
      module: { select: { courseId: true } },
      _count: { select: { progress: true } },
    },
  });
  if (!lesson || lesson.module.courseId !== params.courseId) {
    throw new ServiceError("That lesson is not part of this course.", 404);
  }

  /**
   * Refuse to delete a lesson somebody has already worked through. Their
   * progress row would go with it, silently lowering their completion
   * percentage and possibly revoking certificate eligibility they had earned.
   * Archiving is a future feature; destroying evidence of someone's work is not
   * something to do quietly.
   */
  if (lesson._count.progress > 0) {
    throw new ServiceError(
      "Students have already worked through this lesson, so it cannot be deleted — their progress would go with it. Edit it instead, or unpublish the course and rebuild it as a new version.",
      409,
    );
  }

  await db.lesson.delete({ where: { id: params.lessonId } });
}

/**
 * Reorders lessons within a module.
 *
 * Takes the complete ordered list rather than a move instruction, so the result
 * is idempotent and a dropped request cannot leave two lessons sharing a
 * position.
 */
export async function reorderLessons(
  actor: Actor,
  params: { courseId: string; moduleId: string; lessonIds: string[] },
) {
  await requireAuthorableCourse(actor, params.courseId, { structural: true });

  const lessons = await db.lesson.findMany({
    where: { moduleId: params.moduleId, module: { courseId: params.courseId } },
    select: { id: true },
  });

  const known = new Set(lessons.map((l) => l.id));
  // The submitted list must be exactly the module's lessons. A partial list
  // would leave the omitted ones at stale positions.
  if (
    params.lessonIds.length !== known.size ||
    !params.lessonIds.every((id) => known.has(id))
  ) {
    throw new ServiceError(
      "The reorder request did not match this module's lessons. Reload and try again.",
      409,
    );
  }

  await db.$transaction(
    params.lessonIds.map((id, index) =>
      db.lesson.update({ where: { id }, data: { sortOrder: index } }),
    ),
  );
}

export async function reorderModules(
  actor: Actor,
  params: { courseId: string; moduleIds: string[] },
) {
  await requireAuthorableCourse(actor, params.courseId, { structural: true });

  const modules = await db.module.findMany({
    where: { courseId: params.courseId },
    select: { id: true },
  });
  const known = new Set(modules.map((m) => m.id));

  if (
    params.moduleIds.length !== known.size ||
    !params.moduleIds.every((id) => known.has(id))
  ) {
    throw new ServiceError(
      "The reorder request did not match this course's modules. Reload and try again.",
      409,
    );
  }

  await db.$transaction(
    params.moduleIds.map((id, index) =>
      db.module.update({ where: { id }, data: { sortOrder: index } }),
    ),
  );
}

/**
 * Whether a lesson has a completion condition.
 *
 * The academy's central promise is that opening a page is not learning. A
 * lesson with no condition completes on a click, so publishing one silently
 * devalues every certificate the course issues — which is why this is checked
 * at submit-for-review time rather than left to an instructor's diligence.
 */
export function lessonCompletionGap(lesson: {
  type: string;
  minWatchPercent: number;
  minReflectionChars: number;
  videoUrl: string | null;
  quiz: unknown;
  assignment: unknown;
}): string | null {
  if (lesson.quiz || lesson.assignment) return null;
  // A required write-up is a genuine gate: the learner has to have done the
  // exercise and said what happened before the lesson will complete.
  if (lesson.minReflectionChars > 0) return null;
  if (lesson.type === "VIDEO") {
    if (!lesson.videoUrl) return "No video uploaded";
    if (lesson.minWatchPercent <= 0) return "No watch threshold set";
    return null;
  }
  return "No quiz, assignment or required write-up";
}

/** Everything blocking submission for review. */
export async function auditCourseReadiness(actor: Actor, courseId: string) {
  const course = await getCourseForBuilder(actor, courseId);

  const problems: { where: string; problem: string }[] = [];

  if (course.modules.length === 0) {
    problems.push({ where: "Course", problem: "No modules yet" });
  }

  for (const module of course.modules) {
    if (module.lessons.length === 0) {
      problems.push({ where: module.title, problem: "No lessons in this module" });
    }
    for (const lesson of module.lessons) {
      const gap = lessonCompletionGap(lesson);
      if (gap) problems.push({ where: lesson.title, problem: gap });
      if (lesson.type === "TEXT" && !lesson.content?.trim()) {
        problems.push({ where: lesson.title, problem: "No written content" });
      }
    }
  }

  return { course, problems, ready: problems.length === 0 };
}

/**
 * Completion rate per lesson, in course order.
 *
 * The single most useful number an instructor can see: the lesson where the
 * curve falls is the lesson to rewrite. Computed as a share of *enrolments*
 * rather than of the previous lesson's finishers, so the series is monotonic
 * and a reader cannot mistake a small cohort for improvement.
 */
export async function getCourseDropoff(actor: Actor, courseId: string) {
  await requireAuthorableCourse(actor, courseId);

  const [enrolled, lessons] = await Promise.all([
    db.enrollment.count({ where: { courseId } }),
    db.lesson.findMany({
      where: { module: { courseId } },
      orderBy: [{ module: { sortOrder: "asc" } }, { sortOrder: "asc" }],
      select: {
        id: true,
        title: true,
        _count: { select: { progress: { where: { isCompleted: true } } } },
      },
    }),
  ]);

  return lessons.map((l) => ({
    id: l.id,
    title: l.title,
    completedCount: l._count.progress,
    // Guard the divide: a course with lessons but no enrolments is real.
    completionRate: enrolled > 0
      ? Math.round((l._count.progress / enrolled) * 100)
      : 0,
  }));
}
