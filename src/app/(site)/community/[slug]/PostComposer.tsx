"use client";

import { useActionState, useRef, useState } from "react";
import { Alert, Button, Card, Field, Input, Select, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  createPostAction,
  joinCommunityAction,
  leaveCommunityAction,
} from "@/server/actions/community";

export function PostComposer({
  communityId,
  slug,
}: {
  communityId: string;
  slug: string;
}) {
  const [state, formAction] = useActionState(createPostAction, emptyFormState);
  const [expanded, setExpanded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.ok && formRef.current) {
    formRef.current.reset();
  }

  if (!expanded) {
    return (
      <Card>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-full text-left text-sm text-mist-400 hover:text-mist-200 py-2"
        >
          Ask something, or share what you&apos;re working on…
        </button>
      </Card>
    );
  }

  return (
    <Card>
      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="communityId" value={communityId} />
        <input type="hidden" name="slug" value={slug} />

        {state.message && (
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        )}

        <div className="grid sm:grid-cols-[auto_1fr] gap-3">
          <Field label="Type" htmlFor="type">
            <Select id="type" name="type" defaultValue="DISCUSSION">
              <option value="DISCUSSION">💬 Discussion</option>
              <option value="QUESTION">❓ Question</option>
              <option value="RESOURCE">🔗 Resource</option>
            </Select>
          </Field>

          <Field label="Title" htmlFor="title" hint="Optional but helps people find it">
            <Input id="title" name="title" maxLength={140} />
          </Field>
        </div>

        <Field label="Your post" htmlFor="body">
          <Textarea
            id="body"
            name="body"
            rows={6}
            required
            placeholder="Be specific. If you're stuck, say what you tried and what happened."
          />
        </Field>

        <Field
          label="Tags"
          htmlFor="tags"
          hint="Comma separated, up to five. e.g. wallets, on-chain"
        >
          <Input id="tags" name="tags" maxLength={120} />
        </Field>

        <p className="text-xs text-mist-400 leading-relaxed">
          Never post a seed phrase, private key or recovery phrase — not even
          partially, not even to get help. No price calls and no referral links.
        </p>

        <div className="flex gap-2">
          <SubmitButton pendingText="Posting…">Post</SubmitButton>
          <Button type="button" variant="ghost" onClick={() => setExpanded(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function JoinButton({
  communityId,
  slug,
  isMember,
}: {
  communityId: string;
  slug: string;
  isMember: boolean;
}) {
  const [joinState, join] = useActionState(joinCommunityAction, emptyFormState);
  const [leaveState, leave] = useActionState(
    leaveCommunityAction,
    emptyFormState,
  );

  const message = joinState.message || leaveState.message;

  return (
    <div className="shrink-0 text-right">
      <form action={isMember ? leave : join}>
        <input type="hidden" name="communityId" value={communityId} />
        <input type="hidden" name="slug" value={slug} />
        <SubmitButton
          variant={isMember ? "secondary" : "primary"}
          pendingText={isMember ? "Leaving…" : "Joining…"}
        >
          {isMember ? "Leave" : "Join community"}
        </SubmitButton>
      </form>
      {message && (
        <p className="mt-2 text-xs text-mist-400 max-w-[14rem]">{message}</p>
      )}
    </div>
  );
}
