import "server-only";
import { db } from "@/lib/db";

/**
 * Schools and programmes — the two layers above a course.
 *
 * A **school** is a pillar of the academy (Crypto, Money, Faith…). A
 * **programme** is an ordered route through several courses within one, with a
 * stated outcome. Both are public reads, so nothing here takes an actor: only
 * published rows and published courses are ever returned.
 */

export async function listSchools() {
  const schools = await db.school.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      tagline: true,
      description: true,
      pillar: true,
      iconEmoji: true,
      // Counting only published courses — a school advertising four courses
      // that turn out to be three drafts and an archive is worse than one
      // honestly saying it has none yet.
      _count: { select: { courses: { where: { status: "PUBLISHED" } } } },
      programmes: {
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
        select: { id: true, title: true, slug: true, subtitle: true },
      },
    },
  });

  return schools;
}

export async function getSchoolBySlug(slug: string) {
  return db.school.findFirst({
    where: { slug, isPublished: true },
    select: {
      id: true,
      name: true,
      slug: true,
      tagline: true,
      description: true,
      pillar: true,
      iconEmoji: true,
      courses: {
        where: { status: "PUBLISHED" },
        orderBy: [{ level: "asc" }, { priceMinor: "asc" }],
        select: {
          id: true,
          title: true,
          slug: true,
          subtitle: true,
          level: true,
          priceMinor: true,
          currency: true,
          estimatedHours: true,
          category: { select: { name: true, iconEmoji: true } },
          instructor: { select: { name: true } },
          _count: { select: { enrollments: true } },
          modules: { select: { _count: { select: { lessons: true } } } },
        },
      },
      programmes: {
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          title: true,
          slug: true,
          subtitle: true,
          description: true,
          estimatedWeeks: true,
          level: true,
          outcomes: true,
          courses: {
            orderBy: { sortOrder: "asc" },
            select: {
              sortOrder: true,
              isRequired: true,
              course: {
                select: { title: true, slug: true, status: true, level: true },
              },
            },
          },
        },
      },
    },
  });
}

export async function listPlans() {
  return db.plan.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      priceMinor: true,
      currency: true,
      interval: true,
      trialDays: true,
      features: true,
    },
  });
}
