"use client";

import { useActionState, useState } from "react";
import {
  Alert,
  Button,
  Field,
  Input,
  Pill,
  Textarea,
} from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  deleteLessonAction,
  updateLessonAction,
} from "@/server/actions/authoring";

type Lesson = {
  id: string;
  title: string;
  type: string;
  isPreview: boolean;
  minWatchPercent: number;
  videoUrl: string | null;
  videoDuration: number | null;
  content: string | null;
  pointsValue: number;
};

/**
 * Lesson editor.
 *
 * Collapsed by default. A builder page for a forty-lesson course cannot render
 * forty expanded forms — it would be unusable, and every one of them would be a
 * separate live form competing for the same submit state.
 */
export function LessonEditor({
  courseId,
  lesson,
  structuralEditsAllowed,
  gap,
}: {
  courseId: string;
  lesson: Lesson;
  /** False once the course is published — deletion is blocked upstream too. */
  structuralEditsAllowed: boolean;
  /** Why this lesson has no completion condition, if it hasn't. */
  gap: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(updateLessonAction, emptyFormState);
  const [deleteState, deleteAction] = useActionState(
    deleteLessonAction,
    emptyFormState,
  );
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <div className="surface-inset overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        // flex-wrap so the gap warning drops to its own line rather than
        // running off the right of a phone. The longest warning is 40
        // characters, which cannot fit beside a title at 320px however hard
        // the title is truncated.
        className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 p-3.5 text-left transition-colors hover:bg-gold-500/6"
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-bold text-mist-100">
            {lesson.title}
          </span>
          <span className="mt-1 block text-[10px] font-medium text-mist-400">
            {lesson.type.toLowerCase()} · {lesson.pointsValue} pts
            {lesson.isPreview && " · free preview"}
          </span>
        </span>

        {/* The gap warning is the builder's most important signal: a lesson
            with no condition completes on a click, which is exactly what the
            academy promises never happens. */}
        {gap ? (
          // Not shrink-0: the warning has to be allowed to wrap its own text
          // once it has a line to itself, or it overflows again.
          <Pill tone="ember" shape="tag" className="max-w-full leading-[1.4]">
            {gap}
          </Pill>
        ) : (
          <Pill tone="growth" shape="tag" className="shrink-0">
            Gated
          </Pill>
        )}
      </button>

      {open && (
        <div className="border-t border-rule p-3.5">
          <form action={formAction} className="space-y-3.5">
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={lesson.id} />

            {state.message && (
              <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
            )}

            <Field label="Title" htmlFor={`title-${lesson.id}`}>
              <Input
                id={`title-${lesson.id}`}
                name="title"
                defaultValue={lesson.title}
                minLength={3}
                maxLength={140}
              />
            </Field>

            {lesson.type === "VIDEO" && (
              <>
                <Field
                  label="Video embed URL"
                  htmlFor={`video-${lesson.id}`}
                  hint="An embeddable player URL. Leave empty if the video isn't ready."
                >
                  <Input
                    id={`video-${lesson.id}`}
                    name="videoUrl"
                    type="url"
                    defaultValue={lesson.videoUrl ?? ""}
                    placeholder="https://…"
                  />
                </Field>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <Field
                    label="Duration (seconds)"
                    htmlFor={`dur-${lesson.id}`}
                  >
                    <Input
                      id={`dur-${lesson.id}`}
                      name="videoDuration"
                      inputMode="numeric"
                      defaultValue={String(lesson.videoDuration ?? 0)}
                    />
                  </Field>
                  <Field
                    label="Watch threshold (%)"
                    htmlFor={`watch-${lesson.id}`}
                    hint="0 disables the gate — and then opening the page completes the lesson."
                  >
                    <Input
                      id={`watch-${lesson.id}`}
                      name="minWatchPercent"
                      inputMode="numeric"
                      defaultValue={String(lesson.minWatchPercent)}
                    />
                  </Field>
                </div>
              </>
            )}

            <Field
              label={lesson.type === "VIDEO" ? "Lesson notes" : "Written content"}
              htmlFor={`content-${lesson.id}`}
              hint="Blank line between paragraphs. ## for a heading, - for a list item."
            >
              <Textarea
                id={`content-${lesson.id}`}
                name="content"
                rows={10}
                defaultValue={lesson.content ?? ""}
              />
            </Field>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field label="Points" htmlFor={`points-${lesson.id}`}>
                <Input
                  id={`points-${lesson.id}`}
                  name="pointsValue"
                  inputMode="numeric"
                  defaultValue={String(lesson.pointsValue)}
                />
              </Field>

              <div className="flex items-end">
                <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-mist-200">
                  {/* The companion hidden field is what lets the server tell
                      "unchecked" apart from "not submitted" — an unchecked box
                      sends nothing at all. */}
                  <input type="hidden" name="isPreviewPresent" value="1" />
                  <input
                    type="checkbox"
                    name="isPreview"
                    defaultChecked={lesson.isPreview}
                    className="size-4 accent-gold-500"
                  />
                  Free preview — readable without enrolling
                </label>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <SubmitButton size="sm" pendingText="Saving…">
                Save lesson
              </SubmitButton>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </form>

          {structuralEditsAllowed && (
            <div className="mt-4 border-t border-rule pt-3.5">
              {deleteState.message && (
                <div className="mb-2.5">
                  <Alert tone={deleteState.ok ? "success" : "error"}>
                    {deleteState.message}
                  </Alert>
                </div>
              )}
              {confirmingDelete ? (
                <form action={deleteAction} className="flex flex-wrap gap-2.5">
                  <input type="hidden" name="courseId" value={courseId} />
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <SubmitButton variant="danger" size="sm" pendingText="Deleting…">
                    Yes, delete this lesson
                  </SubmitButton>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfirmingDelete(false)}
                  >
                    Keep it
                  </Button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(true)}
                  className="text-[11px] font-semibold text-flag-500 hover:text-flag-400"
                >
                  Delete lesson
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
