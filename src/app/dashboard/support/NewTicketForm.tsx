"use client";

import { useActionState, useState } from "react";
import { Alert, Button, Field, Input, Select, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { openTicketAction } from "@/server/actions/support";
import { SUPPORT_CATEGORIES } from "@/lib/support/categories";

export function NewTicketForm({ initialCategory }: { initialCategory?: string }) {
  const [state, formAction] = useActionState(openTicketAction, emptyFormState);
  const [open, setOpen] = useState(Boolean(initialCategory));
  const [category, setCategory] = useState(initialCategory ?? "account");

  const sla = SUPPORT_CATEGORIES.find((c) => c.value === category)?.sla;

  if (!open) {
    return (
      <Button type="button" size="sm" onClick={() => setOpen(true)}>
        New ticket
      </Button>
    );
  }

  return (
    <form action={formAction} className="w-full space-y-3.5">
      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <Field label="What is this about?" htmlFor="ticket-category">
        <Select
          id="ticket-category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {SUPPORT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* Showing the promised response time next to the choice, before the
          member writes anything, sets an expectation the queue can meet. */}
      {sla && <p className="text-[11px] font-semibold text-gold-500">{sla}</p>}

      <Field label="Subject" htmlFor="ticket-subject">
        <Input
          id="ticket-subject"
          name="subject"
          required
          minLength={4}
          maxLength={120}
          placeholder="One line — what went wrong"
        />
      </Field>

      <Field
        label="Details"
        htmlFor="ticket-body"
        hint="Never include your password, seed phrase or private keys. Support will never ask for them."
      >
        <Textarea
          id="ticket-body"
          name="body"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder="What you did, what you expected, and what happened instead."
        />
      </Field>

      <div className="flex flex-wrap gap-2.5">
        <SubmitButton pendingText="Opening…">Open ticket</SubmitButton>
        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
