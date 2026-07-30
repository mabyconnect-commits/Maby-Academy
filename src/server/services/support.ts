import "server-only";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { consumeRateLimit } from "./rateLimit";
import {
  CATEGORY_VALUES,
  URGENT_CATEGORIES,
} from "@/lib/support/categories";

/**
 * Support tickets.
 *
 * A ticket is a conversation between one member and the support team, so every
 * read is scoped to the requester unless the caller holds `ticket:respond` —
 * and that distinction is made here rather than in the route, so no page can
 * accidentally widen it.
 */

export async function listMyTickets(userId: string) {
  return db.supportTicket.findMany({
    where: { requesterId: userId },
    orderBy: [{ updatedAt: "desc" }],
    select: {
      id: true,
      reference: true,
      subject: true,
      status: true,
      priority: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      agent: { select: { name: true } },
      messages: {
        // Internal staff notes must never reach the requester, so they are
        // excluded from the member's view of their own ticket — including from
        // the "last message" preview, where a leak would be least noticed.
        where: { isInternal: false },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { body: true, createdAt: true, authorId: true },
      },
      _count: { select: { messages: { where: { isInternal: false } } } },
    },
  });
}

export async function getTicketForMember(userId: string, ticketId: string) {
  const ticket = await db.supportTicket.findUnique({
    where: { id: ticketId },
    include: {
      agent: { select: { name: true, avatarUrl: true } },
      requester: { select: { id: true, name: true, avatarUrl: true } },
      messages: {
        where: { isInternal: false },
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          body: true,
          authorId: true,
          createdAt: true,
          author: { select: { name: true, avatarUrl: true } },
        },
      },
    },
  });

  if (!ticket) throw new ServiceError("Ticket not found.", 404);
  // Ownership, not just existence. Returning 404 rather than 403 avoids
  // confirming that someone else's ticket ID is real.
  if (ticket.requesterId !== userId) {
    throw new ServiceError("Ticket not found.", 404);
  }
  return ticket;
}

export async function openTicket(params: {
  userId: string;
  category: string;
  subject: string;
  body: string;
}) {
  if (!CATEGORY_VALUES.has(params.category)) {
    throw new ServiceError("Choose a category for your request.", 400);
  }
  const subject = params.subject.trim();
  const body = params.body.trim();
  if (subject.length < 4) {
    throw new ServiceError("Give your request a subject.", 400);
  }
  if (body.length < 10) {
    throw new ServiceError(
      "Describe the problem in a sentence or two so support can help without a round trip.",
      400,
    );
  }

  await consumeRateLimit("ticket", params.userId);

  /**
   * The reference is generated from a counter-free random suffix rather than a
   * sequence, so a member cannot infer how many tickets the academy handles —
   * and two simultaneous submissions cannot collide on the same number.
   */
  const reference = `MA-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

  return db.$transaction(async (tx) => {
    const ticket = await tx.supportTicket.create({
      data: {
        reference,
        requesterId: params.userId,
        category: params.category,
        subject,
        priority: URGENT_CATEGORIES.has(params.category) ? "URGENT" : "NORMAL",
      },
      select: { id: true, reference: true },
    });

    // The opening message is part of the ticket, created in the same
    // transaction — a ticket with no message is not actionable, and a partial
    // write would leave support looking at an empty request.
    await tx.supportMessage.create({
      data: {
        ticketId: ticket.id,
        authorId: params.userId,
        body,
      },
    });

    return ticket;
  });
}

export async function replyToTicket(params: {
  userId: string;
  ticketId: string;
  body: string;
}) {
  const body = params.body.trim();
  if (!body) throw new ServiceError("Write a reply first.", 400);

  // Reuses the ownership check above rather than re-implementing it.
  const ticket = await getTicketForMember(params.userId, params.ticketId);

  if (ticket.status === "CLOSED") {
    throw new ServiceError(
      "This ticket is closed. Open a new one and reference " +
        `${ticket.reference} so support has the history.`,
      409,
    );
  }

  return db.$transaction(async (tx) => {
    const message = await tx.supportMessage.create({
      data: {
        ticketId: ticket.id,
        authorId: params.userId,
        body,
      },
    });

    // A member replying to a resolved ticket reopens it — otherwise their
    // follow-up sits in a queue nobody is watching.
    if (ticket.status === "RESOLVED" || ticket.status === "PENDING") {
      await tx.supportTicket.update({
        where: { id: ticket.id },
        data: { status: "OPEN", resolvedAt: null },
      });
    }

    return message;
  });
}
