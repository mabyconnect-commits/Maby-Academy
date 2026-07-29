"use client";

import { useActionState, useRef, useState } from "react";
import { Alert, Button, Card, Input, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  createCommentAction,
  deletePostAction,
  reportContentAction,
  toggleLockAction,
  togglePinAction,
  toggleReactionAction,
} from "@/server/actions/community";

export function PostControls({
  postId,
  path,
  slug,
  reactionCount,
  hasReacted,
  isAuthor,
  canModerate,
  isPinned,
  isLocked,
}: {
  postId: string;
  path: string;
  slug: string;
  reactionCount: number;
  hasReacted: boolean;
  isAuthor: boolean;
  canModerate: boolean;
  isPinned: boolean;
  isLocked: boolean;
}) {
  const [, react] = useActionState(toggleReactionAction, emptyFormState);
  const [, pin] = useActionState(togglePinAction, emptyFormState);
  const [, lock] = useActionState(toggleLockAction, emptyFormState);
  const [deleteState, remove] = useActionState(
    deletePostAction,
    emptyFormState,
  );
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="space-y-3">
      {deleteState.message && !deleteState.ok && (
        <Alert tone="error">{deleteState.message}</Alert>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <form action={react}>
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="path" value={path} />
          <SubmitButton
            variant={hasReacted ? "growth" : "secondary"}
            size="sm"
            pendingText="…"
          >
            {hasReacted ? "♥" : "♡"} {reactionCount}
          </SubmitButton>
        </form>

        {canModerate && (
          <>
            <form action={pin}>
              <input type="hidden" name="postId" value={postId} />
              <input type="hidden" name="path" value={path} />
              <SubmitButton variant="ghost" size="sm" pendingText="…">
                {isPinned ? "Unpin" : "📌 Pin"}
              </SubmitButton>
            </form>

            <form action={lock}>
              <input type="hidden" name="postId" value={postId} />
              <input type="hidden" name="path" value={path} />
              <SubmitButton variant="ghost" size="sm" pendingText="…">
                {isLocked ? "Unlock" : "Lock thread"}
              </SubmitButton>
            </form>
          </>
        )}

        {(isAuthor || canModerate) &&
          (confirming ? (
            <form action={remove} className="flex items-center gap-2">
              <input type="hidden" name="postId" value={postId} />
              <input type="hidden" name="slug" value={slug} />
              <SubmitButton variant="danger" size="sm" pendingText="Removing…">
                Confirm delete
              </SubmitButton>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </Button>
            </form>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setConfirming(true)}
            >
              Delete
            </Button>
          ))}

        {!isAuthor && <ReportButton postId={postId} />}
      </div>
    </div>
  );
}

export function CommentForm({
  postId,
  parentId,
  compact = false,
}: {
  postId: string;
  parentId?: string;
  compact?: boolean;
}) {
  const [state, formAction] = useActionState(
    createCommentAction,
    emptyFormState,
  );
  const [open, setOpen] = useState(!compact);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.ok && formRef.current) formRef.current.reset();

  if (compact && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-mist-400 hover:text-gold-300"
      >
        Reply
      </button>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-2.5">
      <input type="hidden" name="postId" value={postId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}

      {state.message && !state.ok && (
        <Alert tone="error">{state.message}</Alert>
      )}

      <Textarea
        name="body"
        rows={compact ? 2 : 4}
        required
        aria-label={parentId ? "Your reply" : "Your comment"}
        placeholder={
          parentId ? "Reply…" : "Add something useful — an answer, or a better question."
        }
      />

      <div className="flex gap-2">
        <SubmitButton size="sm" pendingText="Posting…">
          {parentId ? "Reply" : "Post reply"}
        </SubmitButton>
        {compact && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export function ReportButton({
  postId,
  commentId,
}: {
  postId?: string;
  commentId?: string;
}) {
  const [state, formAction] = useActionState(
    reportContentAction,
    emptyFormState,
  );
  const [open, setOpen] = useState(false);

  if (state.ok) {
    return <span className="text-xs text-growth-400">Reported — thank you.</span>;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-mist-400 hover:text-flag-400"
      >
        Report
      </button>
    );
  }

  return (
    <Card className="w-full">
      <form action={formAction} className="space-y-2.5">
        {postId && <input type="hidden" name="postId" value={postId} />}
        {commentId && <input type="hidden" name="commentId" value={commentId} />}

        {state.message && !state.ok && (
          <Alert tone="error">{state.message}</Alert>
        )}

        <Input
          name="reason"
          required
          maxLength={100}
          placeholder="What's wrong with it? e.g. asking for a seed phrase"
          aria-label="Reason"
        />
        <Textarea
          name="details"
          rows={2}
          placeholder="Any detail that helps a moderator (optional)"
          aria-label="Details"
        />

        <div className="flex gap-2">
          <SubmitButton variant="danger" size="sm" pendingText="Sending…">
            Send report
          </SubmitButton>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
