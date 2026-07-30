import "server-only";
import { db } from "@/lib/db";

/**
 * Search.
 *
 * The design promises "results are permission-aware — you only ever see what
 * your enrolment and role allow", and that promise is the whole design of this
 * module: every branch scopes by the *requester*, never by a flag passed in.
 * A search endpoint is the classic way private content leaks, because it walks
 * tables that the rest of the app only ever reaches through guarded routes.
 *
 * Specifically:
 *  - Lessons are returned only for courses the member is enrolled in, or where
 *    the lesson is a published free preview.
 *  - Journal entries are searched only within the requester's own rows. No
 *    role, including super admin, can search another member's journal — the
 *    query has no parameter that would let it.
 *  - Community posts exclude removed content, matching the feed's own rule.
 *  - Certificates are the requester's own.
 */

export type SearchKind = "lesson" | "course" | "assignment" | "post" | "certificate" | "journal";

export type SearchHit = {
  kind: SearchKind;
  title: string;
  snippet: string;
  href: string;
};

export const SEARCH_KINDS: { value: SearchKind; label: string }[] = [
  { value: "course", label: "Courses" },
  { value: "lesson", label: "Lessons" },
  { value: "assignment", label: "Assignments" },
  { value: "post", label: "Community" },
  { value: "certificate", label: "Certificates" },
  { value: "journal", label: "My journal" },
];

/** Trims a body down to a readable line around nothing in particular. */
function snippet(text: string | null | undefined, max = 150): string {
  if (!text) return "";
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max).trimEnd()}…` : flat;
}

export async function search(params: {
  userId: string;
  query: string;
  kinds?: SearchKind[];
  limitPerKind?: number;
}): Promise<SearchHit[]> {
  const q = params.query.trim();
  // Two characters is the floor: a single letter matches most of the catalogue
  // and makes the page look broken rather than helpful.
  if (q.length < 2) return [];

  const take = params.limitPerKind ?? 5;
  const wanted = new Set(params.kinds?.length ? params.kinds : SEARCH_KINDS.map((k) => k.value));
  const contains = { contains: q, mode: "insensitive" as const };

  const hits: SearchHit[] = [];

  if (wanted.has("course")) {
    const rows = await db.course.findMany({
      where: {
        status: "PUBLISHED",
        OR: [{ title: contains }, { subtitle: contains }, { description: contains }],
      },
      take,
      select: { title: true, slug: true, subtitle: true, description: true },
    });
    hits.push(
      ...rows.map((c) => ({
        kind: "course" as const,
        title: c.title,
        snippet: snippet(c.subtitle ?? c.description),
        href: `/courses/${c.slug}`,
      })),
    );
  }

  if (wanted.has("lesson")) {
    const rows = await db.lesson.findMany({
      where: {
        OR: [{ title: contains }, { content: contains }],
        // The access rule, expressed in the query rather than filtered after.
        module: {
          course: {
            status: "PUBLISHED",
            OR: [
              { enrollments: { some: { userId: params.userId } } },
              // A free preview is public by definition, so it is searchable.
              { modules: { some: { lessons: { some: { isPreview: true } } } } },
            ],
          },
        },
      },
      take,
      select: {
        title: true,
        slug: true,
        content: true,
        isPreview: true,
        module: {
          select: {
            course: {
              select: {
                slug: true,
                enrollments: {
                  where: { userId: params.userId },
                  select: { id: true },
                },
              },
            },
          },
        },
      },
    });

    // The OR above can match an unenrolled course because *some* lesson in it
    // is a preview. Narrow to lessons this member may actually open.
    const readable = rows.filter(
      (l) => l.isPreview || l.module.course.enrollments.length > 0,
    );

    hits.push(
      ...readable.map((l) => ({
        kind: "lesson" as const,
        title: l.title,
        snippet: snippet(l.content),
        href: `/courses/${l.module.course.slug}/lessons/${l.slug}`,
      })),
    );
  }

  if (wanted.has("assignment")) {
    const rows = await db.assignment.findMany({
      where: {
        OR: [{ title: contains }, { instructions: contains }],
        lesson: {
          module: {
            course: { enrollments: { some: { userId: params.userId } } },
          },
        },
      },
      take,
      select: {
        title: true,
        instructions: true,
        lesson: {
          select: {
            slug: true,
            module: { select: { course: { select: { slug: true } } } },
          },
        },
      },
    });
    hits.push(
      ...rows.map((a) => ({
        kind: "assignment" as const,
        title: a.title,
        snippet: snippet(a.instructions),
        href: `/courses/${a.lesson.module.course.slug}/lessons/${a.lesson.slug}`,
      })),
    );
  }

  if (wanted.has("post")) {
    const rows = await db.post.findMany({
      where: {
        OR: [{ title: contains }, { body: contains }],
        // Same visibility rule the feed uses: flagged content is still
        // visible, removed content is not.
        status: { in: ["VISIBLE", "FLAGGED"] },
      },
      take,
      select: { id: true, title: true, body: true },
    });
    hits.push(
      ...rows.map((p) => ({
        kind: "post" as const,
        title: p.title ?? snippet(p.body, 60),
        snippet: snippet(p.body),
        href: `/community/post/${p.id}`,
      })),
    );
  }

  if (wanted.has("certificate")) {
    const rows = await db.certificate.findMany({
      // Scoped to the requester. There is no branch here that reads anyone
      // else's certificates — public verification is its own page, by serial.
      where: { userId: params.userId, course: { title: contains } },
      take,
      select: {
        serial: true,
        verifyToken: true,
        course: { select: { title: true } },
        issuedAt: true,
      },
    });
    hits.push(
      ...rows.map((c) => ({
        kind: "certificate" as const,
        title: c.course.title,
        snippet: `Certificate ${c.serial} · issued ${c.issuedAt.toISOString().slice(0, 10)}`,
        href: `/verify/${c.verifyToken}`,
      })),
    );
  }

  if (wanted.has("journal")) {
    const rows = await db.journalEntry.findMany({
      // Own rows only, always. This function takes no "on behalf of" argument
      // by design, so there is no way to call it for another member.
      where: { userId: params.userId, OR: [{ title: contains }, { body: contains }] },
      take,
      select: { id: true, title: true, body: true, createdAt: true },
    });
    hits.push(
      ...rows.map((j) => ({
        kind: "journal" as const,
        title: j.title ?? `Entry from ${j.createdAt.toISOString().slice(0, 10)}`,
        snippet: snippet(j.body),
        href: "/dashboard/journal",
      })),
    );
  }

  return hits;
}
