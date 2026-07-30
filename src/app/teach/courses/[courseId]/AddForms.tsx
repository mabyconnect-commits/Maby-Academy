"use client";

import { useActionState, useState } from "react";
import { Alert, Button, Field, Input, Select } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  createLessonAction,
  createModuleAction,
} from "@/server/actions/authoring";

const LESSON_TYPES = [
  { value: "TEXT", label: "Written lesson" },
  { value: "VIDEO", label: "Video lesson" },
  { value: "QUIZ", label: "Quiz" },
  { value: "ASSIGNMENT", label: "Assignment" },
  { value: "LIVE", label: "Live session" },
] as const;

export function AddLessonForm({
  courseId,
  moduleId,
}: {
  courseId: string;
  moduleId: string;
}) {
  const [state, formAction] = useActionState(createLessonAction, emptyFormState);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button
        type="button"
        variant="dashed"
        size="sm"
        onClick={() => setOpen(true)}
      >
        + Add lesson
      </Button>
    );
  }

  return (
    <form action={formAction} className="surface-inset space-y-3 p-3.5">
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="moduleId" value={moduleId} />

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <Field label="Lesson title" htmlFor={`new-lesson-${moduleId}`}>
        <Input
          id={`new-lesson-${moduleId}`}
          name="title"
          required
          minLength={3}
          maxLength={140}
          placeholder="What will they be able to do afterwards?"
        />
      </Field>

      <Field label="Type" htmlFor={`new-lesson-type-${moduleId}`}>
        <Select id={`new-lesson-type-${moduleId}`} name="type" defaultValue="TEXT">
          {LESSON_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
      </Field>

      <div className="flex flex-wrap gap-2.5">
        <SubmitButton size="sm" pendingText="Adding…">
          Add lesson
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
  );
}

export function AddModuleForm({ courseId }: { courseId: string }) {
  const [state, formAction] = useActionState(createModuleAction, emptyFormState);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button
        type="button"
        variant="dashed"
        onClick={() => setOpen(true)}
      >
        + Add module
      </Button>
    );
  }

  return (
    <form action={formAction} className="surface-inset space-y-3 p-4">
      <input type="hidden" name="courseId" value={courseId} />

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <Field
        label="Module title"
        htmlFor="new-module"
        hint="A module is a chapter — a group of lessons that belong together."
      >
        <Input
          id="new-module"
          name="title"
          required
          minLength={3}
          maxLength={140}
          placeholder="e.g. Self-custody, properly"
        />
      </Field>

      <div className="flex flex-wrap gap-2.5">
        <SubmitButton size="sm" pendingText="Adding…">
          Add module
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
  );
}
