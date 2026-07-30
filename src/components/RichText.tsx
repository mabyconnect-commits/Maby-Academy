import { Fragment, type ReactNode } from "react";

/**
 * The small markdown subset the academy's authored content actually uses:
 * blank-line paragraphs, `## ` and `### ` headings, `- ` list items, and
 * inline `**bold**`.
 *
 * This exists because assignment instructions were rendered as plain
 * paragraphs, so every `**1. Inventory.**` in the authored courses displayed
 * its asterisks. Three places were splitting on blank lines with slightly
 * different rules; they now share this one.
 *
 * Deliberately not a general markdown renderer. Content here is authored by
 * instructors rather than by learners, but it is still safer to support a
 * fixed list of constructs than to run arbitrary markup — nothing in this
 * component can emit raw HTML.
 */

/** Splits a line into runs, turning `**bold**` into <strong>. */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichText({
  content,
  className,
  headings = true,
}: {
  content: string;
  className?: string;
  /**
   * Assignment instructions sit inside a card that already has a heading, so
   * a `## ` there should read as a bold lead-in rather than a page heading.
   */
  headings?: boolean;
}) {
  const blocks = content.split("\n\n");

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed === "") return null;

        if (headings && trimmed.startsWith("## ")) {
          return <h2 key={i}>{inline(trimmed.slice(3))}</h2>;
        }
        if (headings && trimmed.startsWith("### ")) {
          return <h3 key={i}>{inline(trimmed.slice(4))}</h3>;
        }
        if (!headings && (trimmed.startsWith("## ") || trimmed.startsWith("### "))) {
          return (
            <p key={i}>
              <strong>{inline(trimmed.replace(/^#{2,3}\s+/, ""))}</strong>
            </p>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5">
              {trimmed.split("\n").map((li, j) => (
                <li key={j}>{inline(li.replace(/^-\s*/, ""))}</li>
              ))}
            </ul>
          );
        }

        return <p key={i}>{inline(trimmed)}</p>;
      })}
    </div>
  );
}
