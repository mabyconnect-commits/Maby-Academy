"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { ServiceError } from "@/server/services/auth";
import {
  createComment,
  createPost,
  deleteOwnComment,
  deleteOwnPost,
  joinCommunity,
  leaveCommunity,
  reportContent,
  resolveReport,
  toggleLock,
  togglePin,
  toggleReaction,
} from "@/server/services/community";
import type { FormState } from "./formState";

function toFormState(error: unknown): FormState {
  if (error instanceof ServiceError) return { ok: false, message: error.message };
  if (error instanceof Error && error.name === "AuthError") {
    return { ok: false, message: error.message };
  }
  console.error("[action] community error:", error);
  return { ok: false, message: "Something went wrong. Please try again." };
}

async function actor() {
  const user = await requireUser();
  return { id: user.id, role: user.role, extraRoles: user.extraRoles };
}

export async function joinCommunityAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    await joinCommunity(user.id, String(formData.get("communityId") || ""));
    revalidatePath("/community");
    const slug = String(formData.get("slug") || "");
    if (slug) revalidatePath(`/community/${slug}`);
    return { ok: true, message: "You're in. Introduce yourself." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function leaveCommunityAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    await leaveCommunity(user.id, String(formData.get("communityId") || ""));
    revalidatePath("/community");
    return { ok: true, message: "You've left this community." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function createPostAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const tags = String(formData.get("tags") || "")
      .split(",")
      .map((t) => t.trim().toLowerCase().replace(/^#/, ""))
      .filter(Boolean);

    await createPost({
      actor: await actor(),
      communityId: String(formData.get("communityId") || ""),
      title: String(formData.get("title") || "") || undefined,
      body: String(formData.get("body") || ""),
      type: (String(formData.get("type") || "DISCUSSION") as
        | "DISCUSSION"
        | "QUESTION"
        | "RESOURCE"),
      tags,
    });

    const slug = String(formData.get("slug") || "");
    if (slug) revalidatePath(`/community/${slug}`);
    return { ok: true, message: "Posted." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function createCommentAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const postId = String(formData.get("postId") || "");
    await createComment({
      actor: await actor(),
      postId,
      body: String(formData.get("body") || ""),
      parentId: String(formData.get("parentId") || "") || undefined,
    });
    revalidatePath(`/community/post/${postId}`);
    return { ok: true, message: "Reply posted." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function toggleReactionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const postId = String(formData.get("postId") || "") || undefined;
    const commentId = String(formData.get("commentId") || "") || undefined;

    const result = await toggleReaction({
      actor: await actor(),
      postId,
      commentId,
    });

    const path = String(formData.get("path") || "");
    if (path.startsWith("/")) revalidatePath(path);
    return { ok: true, message: result.reacted ? "" : "" };
  } catch (error) {
    return toFormState(error);
  }
}

export async function deletePostAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  let slug = "";
  try {
    slug = String(formData.get("slug") || "");
    await deleteOwnPost(await actor(), String(formData.get("postId") || ""));
  } catch (error) {
    return toFormState(error);
  }
  redirect(slug ? `/community/${slug}` : "/community");
}

export async function deleteCommentAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await deleteOwnComment(
      await actor(),
      String(formData.get("commentId") || ""),
    );
    const path = String(formData.get("path") || "");
    if (path.startsWith("/")) revalidatePath(path);
    return { ok: true, message: "Removed." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function reportContentAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await reportContent({
      actor: await actor(),
      postId: String(formData.get("postId") || "") || undefined,
      commentId: String(formData.get("commentId") || "") || undefined,
      reason: String(formData.get("reason") || ""),
      details: String(formData.get("details") || "") || undefined,
    });
    return {
      ok: true,
      message: "Reported. A moderator will look at it — thank you.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function resolveReportAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await resolveReport({
      actor: await actor(),
      reportId: String(formData.get("reportId") || ""),
      action: String(formData.get("action")) === "REMOVE" ? "REMOVE" : "DISMISS",
      resolution: String(formData.get("resolution") || "") || undefined,
    });
    revalidatePath("/admin/moderation");
    return { ok: true, message: "Report resolved." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function togglePinAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const post = await togglePin(
      await actor(),
      String(formData.get("postId") || ""),
    );
    const path = String(formData.get("path") || "");
    if (path.startsWith("/")) revalidatePath(path);
    return { ok: true, message: post.isPinned ? "Pinned." : "Unpinned." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function toggleLockAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const post = await toggleLock(
      await actor(),
      String(formData.get("postId") || ""),
    );
    const path = String(formData.get("path") || "");
    if (path.startsWith("/")) revalidatePath(path);
    return {
      ok: true,
      message: post.isLocked ? "Thread locked." : "Thread unlocked.",
    };
  } catch (error) {
    return toFormState(error);
  }
}
