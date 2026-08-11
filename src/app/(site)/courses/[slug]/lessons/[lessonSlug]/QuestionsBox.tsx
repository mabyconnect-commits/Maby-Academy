"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { Role } from "@prisma/client";
import { Alert, Avatar, Card, Field, Pill, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState, type FormState } from "@/server/actions/formState";
import {
  acceptAnswerAction,
  answerQuestionAction,
  askQuestionAction,
  deleteAnswerAction,
  deleteQuestionAction,
  resolveQuestionAction,
} from "@/server/actions/lessonQuestions";
import { formatDate } from "@/lib/utils";
import type { LessonQuestionWithAnswers } from "@/server/services/lessonQuestions";

type ServerAction = (
  prev: FormState,
  formData: FormData,
) => Promise<FormState>;

const STAFF_ROLES: Role[] = [
  "MENTOR",
  "INSTRUCTOR",
  "REVIEWER",
  "MODERATOR",
  "SUPPORT",
  "FINANCE",
  "ADMIN",
  "SUPER_ADMIN",
];

/** A small tag on a staff author's name so learners can trust the reply. */
function RoleTag({ role }: { role: Role }) {
  if (!STAFF_ROLES.includes(role)) return null;
  const label = role.charAt(0) + role.slice(1).toLowerCase().replace("_", " ");
  return <Pill tone="gold">{label}</Pill>;
}

function Byline({
  author,
  createdAt,
}: {
  author: { name: string; avatarUrl: string | null; role: Role };
  createdAt: Date | string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar name={author.name} src={author.avatarUrl} size={32} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-mist-100">
            {author.name}
          </span>
          <RoleTag role={author.role} />
        </div>
        <p className="text-xs text-mist-400">{formatDate(createdAt, true)}</p>
      </div>
    </div>
  );
}

/**
 * A one-button server-action form for the small controls — accept, resolve,
 * delete. Surfaces an inline error if the action is refused; success just lets
 * the revalidated list re-render.
 */
function InlineAction({
  action,
  hidden,
  children,
  variant = "ghost",
  confirm,
}: {
  action: ServerAction;
  hidden: Record<string, string>;
  children: React.ReactNode;
  variant?: "ghost" | "danger" | "growth";
  confirm?: string;
}) {
  const [state, formAction] = useActionState(action, emptyFormState);
  return (
    <form
      action={formAction}
      className="inline-flex flex-col"
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <SubmitButton
        variant={variant}
        size="sm"
        className="!px-2.5 !py-1.5 !text-[11px]"
        pendingText="…"
      >
        {children}
      </SubmitButton>
      {state.message && !state.ok && (
        <span className="mt-1 text-[11px] text-flag-400">{state.message}</span>
      )}
    </form>
  );
}

function AskForm({ lessonId, path }: { lessonId: string; path: string }) {
  const [state, formAction] = useActionState(askQuestionAction, emptyFormState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);

  return (
    <Card className="mt-5">
      <form ref={ref} action={formAction} className="space-y-3">
        <input type="hidden" name="lessonId" value={lessonId} />
        <input type="hidden" name="path" value={path} />
        <Field
          label="Ask a question"
          htmlFor="lesson-q-body"
          error={state.fieldErrors?.body}
        >
          <Textarea
            id="lesson-q-body"
            name="body"
            rows={3}
            placeholder="Stuck on something in this lesson? Ask here — a mentor or a fellow learner will help, and the thread stays for the next person."
          />
        </Field>
        {state.message && (
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        )}
        <SubmitButton size="sm" pendingText="Posting…">
          Post question
        </SubmitButton>
      </form>
    </Card>
  );
}

function AnswerForm({
  questionId,
  path,
}: {
  questionId: string;
  path: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(answerQuestionAction, emptyFormState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      ref.current?.reset();
      setOpen(false);
    }
  }, [state]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold text-gold-400 hover:text-gold-300"
      >
        Write an answer
      </button>
    );
  }

  return (
    <form ref={ref} action={formAction} className="space-y-2.5">
      <input type="hidden" name="questionId" value={questionId} />
      <input type="hidden" name="path" value={path} />
      <Field label="Your answer" htmlFor={`answer-${questionId}`} error={state.fieldErrors?.body}>
        <Textarea
          id={`answer-${questionId}`}
          name="body"
          rows={3}
          placeholder="Share what you know. Point to the part of the lesson if it helps."
        />
      </Field>
      {state.message && !state.ok && <Alert tone="error">{state.message}</Alert>}
      <div className="flex gap-2">
        <SubmitButton size="sm" pendingText="Posting…">
          Post answer
        </SubmitButton>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs font-semibold text-mist-400 hover:text-mist-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function QuestionCard({
  question,
  path,
  currentUserId,
  canModerate,
  isStaff,
  canParticipate,
}: {
  question: LessonQuestionWithAnswers;
  path: string;
  currentUserId: string | null;
  canModerate: boolean;
  isStaff: boolean;
  canParticipate: boolean;
}) {
  const isAsker = currentUserId != null && question.authorId === currentUserId;
  const canResolve = isAsker || isStaff;

  return (
    <Card variant={question.isResolved ? "inset" : "default"}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <Byline author={question.author} createdAt={question.createdAt} />
        {question.isResolved && <Pill tone="growth">✓ Resolved</Pill>}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-mist-200 whitespace-pre-wrap">
        {question.body}
      </p>

      {/* Question controls */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        {canResolve && (
          <InlineAction
            action={resolveQuestionAction}
            hidden={{ questionId: question.id, path }}
            variant={question.isResolved ? "ghost" : "growth"}
          >
            {question.isResolved ? "Reopen" : "Mark resolved"}
          </InlineAction>
        )}
        {(isAsker || canModerate) && (
          <InlineAction
            action={deleteQuestionAction}
            hidden={{ questionId: question.id, path }}
            variant="danger"
            confirm="Remove this question? Its answers go with it."
          >
            Delete
          </InlineAction>
        )}
      </div>

      {/* Answers */}
      {question.answers.length > 0 && (
        <ul className="mt-4 space-y-3 border-l border-rule pl-4">
          {question.answers.map((answer) => {
            const canAccept = isAsker || isStaff;
            const canDelete =
              (currentUserId != null && answer.authorId === currentUserId) ||
              canModerate;
            return (
              <li key={answer.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <Byline author={answer.author} createdAt={answer.createdAt} />
                  {answer.isAccepted && <Pill tone="growth">✓ Answer</Pill>}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mist-300 whitespace-pre-wrap">
                  {answer.body}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {canAccept && (
                    <InlineAction
                      action={acceptAnswerAction}
                      hidden={{ answerId: answer.id, path }}
                      variant={answer.isAccepted ? "ghost" : "growth"}
                    >
                      {answer.isAccepted ? "Unaccept" : "Accept answer"}
                    </InlineAction>
                  )}
                  {canDelete && (
                    <InlineAction
                      action={deleteAnswerAction}
                      hidden={{ answerId: answer.id, path }}
                      variant="danger"
                      confirm="Remove this answer?"
                    >
                      Delete
                    </InlineAction>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {canParticipate && (
        <div className="mt-4">
          <AnswerForm questionId={question.id} path={path} />
        </div>
      )}
    </Card>
  );
}

export function QuestionsBox({
  lessonId,
  path,
  questions,
  currentUserId,
  canModerate,
  isStaff,
  canParticipate,
}: {
  lessonId: string;
  path: string;
  questions: LessonQuestionWithAnswers[];
  currentUserId: string | null;
  canModerate: boolean;
  isStaff: boolean;
  canParticipate: boolean;
}) {
  return (
    <section id="lesson-questions" className="mt-12 scroll-mt-24">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-semibold text-mist-100">Questions</h2>
        {questions.length > 0 && (
          <Pill tone="neutral">
            {questions.length} {questions.length === 1 ? "question" : "questions"}
          </Pill>
        )}
      </div>
      <p className="mt-1.5 text-sm text-mist-400">
        Something not clicking? Ask here. A mentor or a fellow learner answers,
        and the thread stays for the next person with the same question.
      </p>

      {canParticipate ? (
        <AskForm lessonId={lessonId} path={path} />
      ) : (
        <div className="mt-5">
          <Alert tone="info">Enrol in this course to ask a question.</Alert>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {questions.length === 0 ? (
          <p className="text-sm text-mist-400">
            No questions yet — be the first to ask.
          </p>
        ) : (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              path={path}
              currentUserId={currentUserId}
              canModerate={canModerate}
              isStaff={isStaff}
              canParticipate={canParticipate}
            />
          ))
        )}
      </div>
    </section>
  );
}
