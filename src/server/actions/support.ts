"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { openTicket, replyToTicket } from "@/server/services/support";
import { toFormState, type FormState } from "./formState";

export async function openTicketAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const ticket = await openTicket({
      userId: user.id,
      category: String(formData.get("category") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      body: String(formData.get("body") ?? ""),
    });
    revalidatePath("/dashboard/support");
    return {
      message: `Ticket ${ticket.reference} is open. Support will reply here.`,
      ok: true,
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function replyToTicketAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    await replyToTicket({
      userId: user.id,
      ticketId: String(formData.get("ticketId") ?? ""),
      body: String(formData.get("body") ?? ""),
    });
    revalidatePath("/dashboard/support");
    return { message: "Reply sent.", ok: true };
  } catch (error) {
    return toFormState(error);
  }
}
