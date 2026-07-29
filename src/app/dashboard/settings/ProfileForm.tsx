"use client";

import { useActionState } from "react";
import { Alert, Field, Input, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { updateProfileAction } from "@/server/actions/auth";
import { emptyFormState } from "@/server/actions/formState";

export function ProfileForm({
  defaults,
}: {
  defaults: { name: string; bio: string; country: string; timezone: string };
}) {
  const [state, formAction] = useActionState(updateProfileAction, emptyFormState);

  return (
    <form action={formAction} className="space-y-4">
      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <Field label="Display name" htmlFor="name" error={state.fieldErrors?.name}>
        <Input id="name" name="name" defaultValue={defaults.name} required />
      </Field>

      <Field
        label="Bio"
        htmlFor="bio"
        hint="A couple of lines about what you're working towards."
        error={state.fieldErrors?.bio}
      >
        <Textarea id="bio" name="bio" rows={4} defaultValue={defaults.bio} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Country" htmlFor="country" error={state.fieldErrors?.country}>
          <Input
            id="country"
            name="country"
            defaultValue={defaults.country}
            placeholder="Nigeria"
          />
        </Field>

        <Field
          label="Timezone"
          htmlFor="timezone"
          hint="Used for live session times."
          error={state.fieldErrors?.timezone}
        >
          <Input
            id="timezone"
            name="timezone"
            defaultValue={defaults.timezone}
            placeholder="Africa/Lagos"
          />
        </Field>
      </div>

      <SubmitButton pendingText="Saving…">Save profile</SubmitButton>
    </form>
  );
}
