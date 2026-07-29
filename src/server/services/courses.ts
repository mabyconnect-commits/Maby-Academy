import "server-only";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { notify } from "./notifications";
import { payoutOrderCommissions } from "./referrals";

export async function listCategories() {
  return db.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { courses: { where: { status: "PUBLISHED" } } } },
    },
  });
}

export async function listPublishedCourses(filters: {
  categorySlug?: string;
  level?: string;
  search?: string;
} = {}) {
  const where: Prisma.CourseWhereInput = { status: "PUBLISHED" };

  if (filters.categorySlug) where.category = { slug: filters.categorySlug };
  if (filters.level && ["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(filters.level)) {
    where.level = filters.level as Prisma.CourseWhereInput["level"];
  }
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { subtitle: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const courses = await db.course.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }],
    include: {
      category: true,
      instructor: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { enrollments: true, reviews: true } },
      modules: { select: { _count: { select: { lessons: true } } } },
      reviews: { select: { rating: true } },
    },
  });

  return courses.map((c) => {
    const lessonCount = c.modules.reduce((n, m) => n + m._count.lessons, 0);
    const ratings = c.reviews.map((r) => r.rating);
    const avgRating =
      ratings.length > 0
        ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
        : null;
    const { modules: _m, reviews: _r, ...rest } = c;
    return { ...rest, lessonCount, avgRating };
  });
}

/** The full course tree, ordered, with the viewer's progress folded in. */
export async function getCourseBySlug(slug: string, userId?: string) {
  const course = await db.course.findUnique({
    where: { slug },
    include: {
      category: true,
      instructor: {
        select: { id: true, name: true, avatarUrl: true, bio: true },
      },
      modules: {
        orderBy: { sortOrder: "asc" },
        include: {
          lessons: {
            orderBy: { sortOrder: "asc" },
            include: {
              resources: true,
              assignment: { select: { id: true, title: true, dueAt: true } },
              quiz: { select: { id: true, title: true, passScore: true } },
            },
          },
        },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { user: { select: { name: true, avatarUrl: true } } },
      },
      _count: { select: { enrollments: true } },
    },
  });

  if (!course) return null;

  const lessons = course.modules.flatMap((m) => m.lessons);
  const lessonIds = lessons.map((l) => l.id);

  let progressByLesson = new Map<
    string,
    { isCompleted: boolean; watchedSeconds: number }
  >();
  let enrollment = null;

  if (userId) {
    const [progress, enr] = await Promise.all([
      db.lessonProgress.findMany({
        where: { userId, lessonId: { in: lessonIds } },
      }),
      db.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId: course.id } },
      }),
    ]);
    progressByLesson = new Map(
      progress.map((p) => [
        p.lessonId,
        { isCompleted: p.isCompleted, watchedSeconds: p.watchedSeconds },
      ]),
    );
    enrollment = enr;
  }

  const totalSeconds = lessons.reduce((n, l) => n + (l.videoDuration ?? 0), 0);
  const completedCount = lessons.filter(
    (l) => progressByLesson.get(l.id)?.isCompleted,
  ).length;

  const ratings = course.reviews.map((r) => r.rating);
  const avgRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
      : null;

  return {
    ...course,
    modules: course.modules.map((m) => ({
      ...m,
      lessons: m.lessons.map((l) => ({
        ...l,
        progress: progressByLesson.get(l.id) ?? {
          isCompleted: false,
          watchedSeconds: 0,
        },
      })),
    })),
    enrollment,
    stats: {
      lessonCount: lessons.length,
      completedCount,
      totalSeconds,
      avgRating,
      reviewCount: ratings.length,
    },
  };
}

export async function getLessonForViewer(
  courseSlug: string,
  lessonSlug: string,
  userId?: string,
) {
  const lesson = await db.lesson.findFirst({
    where: { slug: lessonSlug, module: { course: { slug: courseSlug } } },
    include: {
      resources: true,
      assignment: true,
      quiz: {
        include: {
          questions: {
            orderBy: { sortOrder: "asc" },
            include: { options: { orderBy: { sortOrder: "asc" } } },
          },
        },
      },
      module: {
        include: {
          course: {
            include: {
              modules: {
                orderBy: { sortOrder: "asc" },
                include: {
                  lessons: {
                    orderBy: { sortOrder: "asc" },
                    select: {
                      id: true,
                      title: true,
                      slug: true,
                      type: true,
                      isPreview: true,
                      videoDuration: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!lesson) return null;

  const course = lesson.module.course;
  const flat = course.modules.flatMap((m) => m.lessons);
  const index = flat.findIndex((l) => l.id === lesson.id);

  const [progress, enrollment, completed, submission] = userId
    ? await Promise.all([
        db.lessonProgress.findUnique({
          where: { userId_lessonId: { userId, lessonId: lesson.id } },
        }),
        db.enrollment.findUnique({
          where: { userId_courseId: { userId, courseId: course.id } },
        }),
        db.lessonProgress.findMany({
          where: {
            userId,
            isCompleted: true,
            lessonId: { in: flat.map((l) => l.id) },
          },
          select: { lessonId: true },
        }),
        lesson.assignment
          ? db.submission.findFirst({
              where: { assignmentId: lesson.assignment.id, studentId: userId },
              orderBy: { attempt: "desc" },
            })
          : Promise.resolve(null),
      ])
    : [null, null, [], null];

  return {
    lesson,
    course,
    progress,
    enrollment,
    submission,
    completedLessonIds: new Set(completed.map((c) => c.lessonId)),
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
    position: { index: index + 1, total: flat.length },
  };
}

/**
 * Enrol a user in a course.
 *
 * Free courses enrol immediately. Paid courses create a PAID order (payment
 * provider integration slots in here) and fan out multi-level referral
 * commissions in the same transaction, so money and entitlement never diverge.
 */
export async function enrollUser(userId: string, courseId: string) {
  const course = await db.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      priceMinor: true,
      currency: true,
    },
  });

  if (!course || course.status !== "PUBLISHED") {
    throw new ServiceError("That course is not available.", 404);
  }

  const existing = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (existing) return existing;

  return db.$transaction(async (tx) => {
    const enrollment = await tx.enrollment.create({
      data: { userId, courseId, status: "ACTIVE" },
    });

    if (course.priceMinor > 0) {
      const order = await tx.order.create({
        data: {
          userId,
          courseId,
          amountMinor: course.priceMinor,
          currency: course.currency,
          status: "PAID",
          provider: "manual",
          paidAt: new Date(),
        },
      });

      await payoutOrderCommissions(tx, {
        orderId: order.id,
        buyerId: userId,
        amountMinor: course.priceMinor,
        currency: course.currency,
      });
    }

    await notify(tx, {
      userId,
      type: "COURSE",
      title: `You're enrolled in ${course.title}`,
      body: "Your seat is confirmed. Start with lesson one — small consistent steps win.",
      linkUrl: `/courses/${course.slug}`,
    });

    return enrollment;
  });
}

export async function getMyEnrollments(userId: string) {
  return db.enrollment.findMany({
    where: { userId },
    orderBy: [{ lastAccessedAt: "desc" }, { enrolledAt: "desc" }],
    include: {
      course: {
        include: {
          category: true,
          instructor: { select: { name: true, avatarUrl: true } },
          modules: { select: { _count: { select: { lessons: true } } } },
        },
      },
    },
  });
}

export async function upsertReview(
  userId: string,
  courseId: string,
  rating: number,
  comment?: string,
) {
  const enrolled = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: { id: true },
  });
  if (!enrolled) {
    throw new ServiceError("Only enrolled students can review a course.", 403);
  }

  return db.courseReview.upsert({
    where: { courseId_userId: { courseId, userId } },
    create: { courseId, userId, rating, comment: comment || null },
    update: { rating, comment: comment || null },
  });
}
