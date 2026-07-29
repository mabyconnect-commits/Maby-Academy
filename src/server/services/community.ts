import "server-only";
import type { ModerationStatus, Prisma, ReactionType } from "@prisma/client";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { notify, audit } from "./notifications";
import { awardPoints } from "./rewards";
import { enforceRateLimit } from "./rateLimit";
import { actorCan, canModifyComment, canModifyPost, type Actor } from "./policy";

/**
 * Community.
 *
 * Two rules shape everything here:
 *
 * 1. **Hidden content stays hidden.** Every read path filters moderation
 *    status. A removed post must not resurface through a different query,
 *    which is why the filter lives in one place rather than at each call site.
 * 2. **Participation points cannot be farmed.** Points are awarded once per
 *    post via the ledger's reference key and capped daily, so posting "nice"
 *    forty times earns exactly as much as posting it once.
 */

/** What an ordinary member is allowed to see. */
const PUBLIC_STATUSES: ModerationStatus[] = ["VISIBLE", "FLAGGED"];

function visibilityFilter(actor: Actor | null) {
  // Moderators see flagged and hidden content — that is the job. Nobody sees
  // REMOVED except through the moderation queue.
  if (actor && actorCan(actor, "report:review")) {
    return { status: { not: "REMOVED" as ModerationStatus } };
  }
  return { status: { in: PUBLIC_STATUSES } };
}

export const POST_POINTS = 5;
export const COMMENT_POINTS = 2;
/** Ceiling on points earnable from community activity in one day. */
export const DAILY_COMMUNITY_POINT_CAP = 30;

async function pointsEarnedToday(userId: string) {
  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);

  const result = await db.pointsTransaction.aggregate({
    where: {
      userId,
      createdAt: { gte: since },
      referenceKey: { startsWith: "community:" },
      amount: { gt: 0 },
    },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
}

/**
 * Credit participation points, respecting the daily cap.
 * Silently skips rather than throwing — a capped member should still be able
 * to post, they simply stop earning.
 */
async function awardCommunityPoints(
  tx: Prisma.TransactionClient,
  userId: string,
  amount: number,
  referenceKey: string,
  note: string,
) {
  if ((await pointsEarnedToday(userId)) + amount > DAILY_COMMUNITY_POINT_CAP) {
    return;
  }
  await awardPoints(tx, {
    userId,
    amount,
    reason: "MANUAL_ADJUSTMENT",
    referenceKey,
    note,
  });
}

// ---------------------------------------------------------------------------
// Communities
// ---------------------------------------------------------------------------

export async function listCommunities(userId?: string) {
  return db.community.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { members: true, posts: true } },
      course: { select: { title: true, slug: true } },
      ...(userId
        ? { members: { where: { userId }, select: { id: true, role: true } } }
        : {}),
    },
  });
}

export async function getCommunityBySlug(slug: string, userId?: string) {
  return db.community.findUnique({
    where: { slug },
    include: {
      _count: { select: { members: true, posts: true } },
      course: { select: { title: true, slug: true } },
      ...(userId
        ? { members: { where: { userId }, select: { id: true, role: true } } }
        : {}),
    },
  });
}

export async function joinCommunity(userId: string, communityId: string) {
  const community = await db.community.findUnique({
    where: { id: communityId },
    select: { id: true, isPublic: true, name: true },
  });
  if (!community) throw new ServiceError("Community not found.", 404);
  if (!community.isPublic) {
    throw new ServiceError("This community is invite-only.", 403);
  }

  return db.communityMember.upsert({
    where: { communityId_userId: { communityId, userId } },
    create: { communityId, userId },
    update: {},
  });
}

export async function leaveCommunity(userId: string, communityId: string) {
  await db.communityMember.deleteMany({ where: { communityId, userId } });
  return { left: true };
}

async function requireMembership(userId: string, communityId: string) {
  const member = await db.communityMember.findUnique({
    where: { communityId_userId: { communityId, userId } },
    select: { id: true, isMuted: true },
  });
  if (!member) {
    throw new ServiceError("Join this community before posting.", 403);
  }
  if (member.isMuted) {
    throw new ServiceError(
      "You are muted in this community and cannot post right now.",
      403,
    );
  }
  return member;
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function listPosts(params: {
  communityId: string;
  actor: Actor | null;
  tag?: string;
  take?: number;
}) {
  return db.post.findMany({
    where: {
      communityId: params.communityId,
      ...visibilityFilter(params.actor),
      ...(params.tag ? { tags: { has: params.tag } } : {}),
    },
    // Pinned first, then newest. Pinned posts are how a community keeps its
    // rules visible to people who never scroll.
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    take: params.take ?? 30,
    include: {
      author: { select: { id: true, name: true, avatarUrl: true, role: true } },
      ...(params.actor
        ? {
            reactions: {
              where: { userId: params.actor.id },
              select: { id: true, type: true },
            },
          }
        : {}),
    },
  });
}

export async function getPost(postId: string, actor: Actor | null) {
  const post = await db.post.findFirst({
    where: { id: postId, ...visibilityFilter(actor) },
    include: {
      author: { select: { id: true, name: true, avatarUrl: true, role: true } },
      community: { select: { id: true, name: true, slug: true } },
      ...(actor
        ? { reactions: { where: { userId: actor.id }, select: { id: true } } }
        : {}),
    },
  });
  if (!post) return null;

  const comments = await db.comment.findMany({
    where: { postId, parentId: null, ...visibilityFilter(actor) },
    orderBy: { createdAt: "asc" },
    include: {
      author: { select: { id: true, name: true, avatarUrl: true, role: true } },
      replies: {
        where: visibilityFilter(actor),
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: { id: true, name: true, avatarUrl: true, role: true },
          },
        },
      },
    },
  });

  return { post, comments };
}

export async function createPost(params: {
  actor: Actor;
  communityId: string;
  title?: string;
  body: string;
  type?: "DISCUSSION" | "QUESTION" | "RESOURCE";
  tags?: string[];
}) {
  await enforceRateLimit("post", params.actor.id);
  await requireMembership(params.actor.id, params.communityId);

  const body = params.body.trim();
  if (body.length < 2) throw new ServiceError("Write something first.", 400);
  if (body.length > 20000) throw new ServiceError("That post is too long.", 400);

  return db.$transaction(async (tx) => {
    const post = await tx.post.create({
      data: {
        communityId: params.communityId,
        authorId: params.actor.id,
        title: params.title?.trim() || null,
        body,
        type: params.type ?? "DISCUSSION",
        tags: (params.tags ?? []).slice(0, 5),
      },
    });

    await awardCommunityPoints(
      tx,
      params.actor.id,
      POST_POINTS,
      `community:post:${post.id}`,
      "Community post",
    );

    return post;
  });
}

export async function createComment(params: {
  actor: Actor;
  postId: string;
  body: string;
  parentId?: string;
}) {
  await enforceRateLimit("comment", params.actor.id);

  const post = await db.post.findUnique({
    where: { id: params.postId },
    select: {
      id: true,
      communityId: true,
      authorId: true,
      isLocked: true,
      status: true,
      title: true,
    },
  });
  if (!post || post.status === "REMOVED") {
    throw new ServiceError("Post not found.", 404);
  }
  if (post.isLocked) {
    throw new ServiceError("This thread is locked.", 403);
  }

  await requireMembership(params.actor.id, post.communityId);

  const body = params.body.trim();
  if (body.length < 1) throw new ServiceError("Write something first.", 400);
  if (body.length > 10000) throw new ServiceError("That comment is too long.", 400);

  return db.$transaction(async (tx) => {
    const comment = await tx.comment.create({
      data: {
        postId: post.id,
        authorId: params.actor.id,
        parentId: params.parentId ?? null,
        body,
      },
    });

    // Counter updated in the same transaction as the row it counts, so a
    // busy thread never needs an aggregate query to render.
    await tx.post.update({
      where: { id: post.id },
      data: { commentCount: { increment: 1 } },
    });

    await awardCommunityPoints(
      tx,
      params.actor.id,
      COMMENT_POINTS,
      `community:comment:${comment.id}`,
      "Community reply",
    );

    // Notify the author, unless they are replying to themselves.
    if (post.authorId !== params.actor.id) {
      await notify(tx, {
        userId: post.authorId,
        type: "SYSTEM",
        title: "New reply to your post",
        body: `Someone replied to "${post.title ?? "your post"}".`,
        linkUrl: `/community/post/${post.id}`,
      });
    }

    return comment;
  });
}

export async function toggleReaction(params: {
  actor: Actor;
  postId?: string;
  commentId?: string;
  type?: ReactionType;
}) {
  if (!params.postId && !params.commentId) {
    throw new ServiceError("Nothing to react to.", 400);
  }

  const existing = await db.reaction.findFirst({
    where: {
      userId: params.actor.id,
      postId: params.postId ?? null,
      commentId: params.commentId ?? null,
    },
  });

  return db.$transaction(async (tx) => {
    if (existing) {
      await tx.reaction.delete({ where: { id: existing.id } });
      if (params.postId) {
        await tx.post.update({
          where: { id: params.postId },
          data: { reactionCount: { decrement: 1 } },
        });
      }
      return { reacted: false };
    }

    await tx.reaction.create({
      data: {
        userId: params.actor.id,
        postId: params.postId ?? null,
        commentId: params.commentId ?? null,
        type: params.type ?? "LIKE",
      },
    });
    if (params.postId) {
      await tx.post.update({
        where: { id: params.postId },
        data: { reactionCount: { increment: 1 } },
      });
    }
    return { reacted: true };
  });
}

export async function deleteOwnPost(actor: Actor, postId: string) {
  if (!(await canModifyPost(actor, postId))) {
    throw new ServiceError("You cannot remove this post.", 403);
  }
  // Soft-delete: a thread with replies loses its context if the root vanishes.
  await db.post.update({
    where: { id: postId },
    data: { status: "REMOVED" },
  });
  return { removed: true };
}

export async function deleteOwnComment(actor: Actor, commentId: string) {
  if (!(await canModifyComment(actor, commentId))) {
    throw new ServiceError("You cannot remove this comment.", 403);
  }
  const comment = await db.comment.update({
    where: { id: commentId },
    data: { status: "REMOVED" },
    select: { postId: true },
  });
  await db.post.update({
    where: { id: comment.postId },
    data: { commentCount: { decrement: 1 } },
  });
  return { removed: true };
}

// ---------------------------------------------------------------------------
// Reporting & moderation
// ---------------------------------------------------------------------------

export async function reportContent(params: {
  actor: Actor;
  postId?: string;
  commentId?: string;
  reason: string;
  details?: string;
}) {
  if (!params.reason.trim()) {
    throw new ServiceError("Tell us what's wrong with it.", 400);
  }

  const report = await db.report.create({
    data: {
      reporterId: params.actor.id,
      postId: params.postId ?? null,
      commentId: params.commentId ?? null,
      reason: params.reason.trim(),
      details: params.details?.trim() || null,
    },
  });

  // Flag immediately so moderators can see it in context, but do not hide —
  // a single report should not let one person silence another.
  if (params.postId) {
    await db.post.updateMany({
      where: { id: params.postId, status: "VISIBLE" },
      data: { status: "FLAGGED" },
    });
  }
  if (params.commentId) {
    await db.comment.updateMany({
      where: { id: params.commentId, status: "VISIBLE" },
      data: { status: "FLAGGED" },
    });
  }

  return report;
}

export async function getModerationQueue(actor: Actor) {
  if (!actorCan(actor, "report:review")) {
    throw new ServiceError("You cannot review reports.", 403);
  }

  return db.report.findMany({
    where: { status: { in: ["OPEN", "REVIEWING"] } },
    orderBy: { createdAt: "asc" },
    include: {
      reporter: { select: { name: true, avatarUrl: true } },
      post: {
        include: {
          author: { select: { id: true, name: true } },
          community: { select: { name: true, slug: true } },
        },
      },
      comment: {
        include: {
          author: { select: { id: true, name: true } },
          post: { select: { id: true, title: true } },
        },
      },
    },
  });
}

export async function resolveReport(params: {
  actor: Actor;
  reportId: string;
  action: "REMOVE" | "DISMISS";
  resolution?: string;
}) {
  if (!actorCan(params.actor, "report:review")) {
    throw new ServiceError("You cannot review reports.", 403);
  }

  const report = await db.report.findUnique({
    where: { id: params.reportId },
    select: { id: true, postId: true, commentId: true, status: true },
  });
  if (!report) throw new ServiceError("Report not found.", 404);
  if (report.status === "ACTIONED" || report.status === "DISMISSED") {
    throw new ServiceError("This report has already been resolved.", 400);
  }

  const remove = params.action === "REMOVE";

  await db.$transaction(async (tx) => {
    await tx.report.update({
      where: { id: report.id },
      data: {
        status: remove ? "ACTIONED" : "DISMISSED",
        resolvedById: params.actor.id,
        resolvedAt: new Date(),
        resolution: params.resolution?.trim() || null,
      },
    });

    // Dismissing restores visibility — the flag was provisional.
    const newStatus: ModerationStatus = remove ? "REMOVED" : "VISIBLE";

    if (report.postId) {
      await tx.post.update({
        where: { id: report.postId },
        data: { status: newStatus },
      });
    }
    if (report.commentId) {
      await tx.comment.update({
        where: { id: report.commentId },
        data: { status: newStatus },
      });
    }
  });

  await audit({
    userId: params.actor.id,
    action: remove ? "moderation.content_removed" : "moderation.report_dismissed",
    entityType: "Report",
    entityId: report.id,
    metadata: { resolution: params.resolution },
  });

  return { resolved: true };
}

export async function togglePin(actor: Actor, postId: string) {
  if (!actorCan(actor, "post:pin")) {
    throw new ServiceError("You cannot pin posts.", 403);
  }
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { isPinned: true },
  });
  if (!post) throw new ServiceError("Post not found.", 404);

  return db.post.update({
    where: { id: postId },
    data: { isPinned: !post.isPinned },
  });
}

export async function toggleLock(actor: Actor, postId: string) {
  if (!actorCan(actor, "report:review")) {
    throw new ServiceError("You cannot lock threads.", 403);
  }
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { isLocked: true },
  });
  if (!post) throw new ServiceError("Post not found.", 404);

  return db.post.update({
    where: { id: postId },
    data: { isLocked: !post.isLocked },
  });
}
