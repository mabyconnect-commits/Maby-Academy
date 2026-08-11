import "server-only";
import { db } from "@/lib/db";
import { shortName } from "@/lib/utils";

/**
 * The community activity feed: who just earned a certificate (completed and
 * passed a course) and who just joined. Shown to signed-in members only, and
 * names are shortened to a first name and last initial — social proof and
 * momentum without publishing everyone's full name to the world.
 */
export type ActivityItem =
  | {
      id: string;
      kind: "certificate";
      name: string;
      courseTitle: string;
      at: Date;
    }
  | { id: string; kind: "joined"; name: string; at: Date };

export async function getActivityFeed(limit = 40): Promise<ActivityItem[]> {
  const [certs, joins] = await Promise.all([
    db.certificate.findMany({
      where: { revokedAt: null },
      orderBy: { issuedAt: "desc" },
      take: limit,
      select: {
        id: true,
        issuedAt: true,
        user: { select: { name: true } },
        course: { select: { title: true } },
      },
    }),
    db.user.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, name: true, createdAt: true },
    }),
  ]);

  const items: ActivityItem[] = [
    ...certs.map((c) => ({
      id: `cert-${c.id}`,
      kind: "certificate" as const,
      name: shortName(c.user.name),
      courseTitle: c.course.title,
      at: c.issuedAt,
    })),
    ...joins.map((u) => ({
      id: `join-${u.id}`,
      kind: "joined" as const,
      name: shortName(u.name),
      at: u.createdAt,
    })),
  ];

  items.sort((a, b) => b.at.getTime() - a.at.getTime());
  return items.slice(0, limit);
}
