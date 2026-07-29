# Maby Academy — Design System

## Identity

The brand sits at the intersection of a **modern university** and a **serious
technology product**. Not a crypto startup, not a course marketplace.

What the identity must communicate: knowledge, transformation, direction,
discipline, trust, purpose.

What it must avoid — and these are explicit exclusions, because the crypto
category defaults to all of them: neon, casino imagery, coin symbols, glass
morphism, rocket emojis, profit claims, countdown urgency.

### Wordmark & monogram

`M` monogram in a rounded square, gold gradient on deep ink, beside
"Maby **Academy**" where "Academy" carries the gold gradient. The monogram
survives at favicon size, which a graduation cap would not.

## Colour

A single dark surface scale plus two accents. Restraint is the point: two
accents mean a colour always carries meaning.

```
Ink     950 #07090f  900 #0b0f18  850 #101623  800 #151d2d
        700 #1d2739  600 #2a3550  500 #3d4a68        surfaces, borders
Mist    400 #7c8aa8  300 #9aa7c2  200 #c3cddf  100 #e6ebf5   text
Gold    600 #b8862b  500 #d9a441  400 #eec46a  300 #f6dfa6   brand, primary
Growth  600 #14855f  500 #1eb37f  400 #45d3a0              progress, pass, money
Flag    500 #e0574f  400 #f47c74                            errors, overdue, risk
```

**Semantic assignment — colour is never decorative:**

| Meaning | Colour |
| --- | --- |
| Brand, primary action, points | Gold |
| Progress, passing, money earned, success | Growth |
| Error, overdue, revocation, risk | Flag |
| Structure, inactive, secondary | Ink / Mist |

Progress bars deliberately switch gold → growth at 100%, so completion reads
without needing the number.

## Typography

System font stack — it renders instantly on a slow connection, which matters
more than a bespoke typeface for learners on mobile data.

| Role | Treatment |
| --- | --- |
| Display | `text-4xl`–`text-6xl`, `font-semibold`, `tracking-tight`, `leading-[1.05]` |
| Section heading | `text-3xl` / `text-xl`, `font-semibold` |
| Body | `text-sm`–`text-base`, `leading-relaxed`, Mist-300 |
| Meta | `text-xs`, Mist-400 |
| Numbers | `tabular-nums` always — figures must not jitter as they update |
| Code, serials | `font-mono`, Gold-300 |

## Spacing & shape

4px base. Card radius `1rem`, control radius `0.5rem`. Cards use the `surface`
utility: translucent Ink-850, Ink-700 border. Page width `max-w-6xl`, reading
width `max-w-2xl`.

## Components

Built (`src/components/ui`): Button (5 variants × 3 sizes), LinkButton, Card,
SectionHeading, EmptyState, Pill, StatusPill, ProgressBar, StatTile, Field,
Input, Textarea, Select, Alert, Avatar.

`StatusPill` maps every domain status to a tone in one place, so an enrolment,
a submission and a commission are coloured consistently without each screen
re-deciding.

To build: Modal, Tabs, Dropdown, Toast, Table, Tooltip, Accordion, Calendar,
FileUpload, RichText, Chart primitives, Skeleton, Command palette.

## Interaction

- Transitions 150–200ms, colour and opacity only. Never animate layout.
- `prefers-reduced-motion` disables all of it globally.
- Every mutating control shows pending state via `useFormStatus` — a button
  that looks idle while working is how users double-submit.
- Every list has a designed empty state with a route out of it.

## Accessibility — WCAG 2.2 AA

Built in, not audited on afterwards:

- Global `:focus-visible` ring in gold, offset 2px — the browser default is
  invisible on these surfaces.
- Skip-to-content link on every page.
- Semantic landmarks; `aria-current` on active navigation.
- `role="progressbar"` with value/min/max on every progress indicator.
- `role="alert"` on errors, `role="status"` on confirmations.
- Decorative emoji marked `aria-hidden`; icon-only controls carry labels.
- Reduced-motion honoured globally.

Outstanding: measured contrast audit, light mode, automated axe tests.

## Light mode

Not yet built. The token structure supports it — the work is a second
`@theme` block behind `prefers-color-scheme`, and replacing hard-coded
`bg-ink-*` usages with semantic aliases (`bg-surface`, `text-primary`) so both
themes resolve from the same component code.

## Voice

The interface talks like a demanding but fair instructor.

- "Show your reasoning — that's what gets graded."
- "You scored 48/100, below the pass mark. Read the feedback and resubmit —
  this is how it's supposed to work."
- "Consistency beats intensity. Pick up where you left off."

Never: hype, guaranteed returns, false urgency, or shame. A failed assignment
is framed as the process working, not as the student failing.
