"use client";

import { useActionState, useEffect, useRef } from "react";
import { Alert, Card, Field, Input, Select, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  cancelSessionAction,
  scheduleSessionAction,
} from "@/server/actions/liveSessions";

export function ScheduleSessionForm({
  courses,
}: {
  courses: { id: string; title: string }[];
}) {
  const [state, formAction] = useActionState(scheduleSessionAction, emptyFormState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-mist-100">Schedule a session</h2>
      <p className="mt-1 text-sm text-mist-400">
        Book a live review or Q&amp;A. Attach it to a course and every enrolled
        learner is notified and can RSVP.
      </p>

      <form ref={ref} action={formAction} className="mt-5 space-y-4">
        <Field label="Title" htmlFor="title" error={state.fieldErrors?.title}>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Week 3 review — questions and walkthrough"
          />
        </Field>

        <Field
          label="Course"
          htmlFor="courseId"
          hint="Leave blank for an academy-wide session open to everyone."
          error={state.fieldErrors?.courseId}
        >
          <Select id="courseId" name="courseId" defaultValue="">
            <option value="">Academy-wide (no course)</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Starts"
            htmlFor="startsAt"
            error={state.fieldErrors?.startsAt}
          >
            <Input id="startsAt" name="startsAt" type="datetime-local" />
          </Field>
          <Field label="Ends" htmlFor="endsAt" error={state.fieldErrors?.endsAt}>
            <Input id="endsAt" name="endsAt" type="datetime-local" />
          </Field>
        </div>

        <Field
          label="Meeting link"
          htmlFor="meetingUrl"
          hint="Zoom, Google Meet or a livestream URL. You can add it later."
          error={state.fieldErrors?.meetingUrl}
        >
          <Input
            id="meetingUrl"
            name="meetingUrl"
            type="url"
            placeholder="https://"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Capacity (optional)"
            htmlFor="capacity"
            hint="Leave blank for unlimited."
            error={state.fieldErrors?.capacity}
          >
            <Input id="capacity" name="capacity" type="number" min={1} />
          </Field>
          <Field
            label="Points for attending"
            htmlFor="pointsValue"
            hint="Default 20."
            error={state.fieldErrors?.pointsValue}
          >
            <Input
              id="pointsValue"
              name="pointsValue"
              type="number"
              min={0}
              placeholder="20"
            />
          </Field>
        </div>

        <Field
          label="Description (optional)"
          htmlFor="description"
          error={state.fieldErrors?.description}
        >
          <Textarea
            id="description"
            name="description"
            rows={3}
            placeholder="What you'll cover, and anything learners should prepare."
          />
        </Field>

        {state.message && (
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        )}

        <SubmitButton size="sm" pendingText="Scheduling…">
          Schedule session
        </SubmitButton>
      </form>
    </Card>
  );
}

export function CancelSessionButton({ sessionId }: { sessionId: string }) {
  const [state, formAction] = useActionState(cancelSessionAction, emptyFormState);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!window.confirm("Cancel this session? Everyone who RSVP'd is told."))
          e.preventDefault();
      }}
    >
      <input type="hidden" name="sessionId" value={sessionId} />
      <SubmitButton
        variant="danger"
        size="sm"
        className="!px-3 !py-1.5 !text-[11px]"
        pendingText="Cancelling…"
      >
        Cancel
      </SubmitButton>
      {state.message && !state.ok && (
        <span className="mt-1 block text-[11px] text-flag-400">
          {state.message}
        </span>
      )}
    </form>
  );
}
