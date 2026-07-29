# Maby Academy

A growth academy for crypto, Web3, on-chain analysis and finance — taught with
the structure of a real school, alongside the faith, health and mindset work
that makes any of it worth having.

This is a full-stack Next.js application: real accounts, real dashboards,
graded assignments, verifiable certificates, live sessions, a rewards economy
and a multi-level referral network.

---

## What's built

**Identity & access**
- Email + password auth with bcrypt (12 rounds) and server-side sessions
- Session tokens stored as HMACs — a database leak alone can't be replayed
- Password reset and email-verification token flows
- Three roles: `STUDENT`, `INSTRUCTOR`, `ADMIN`, enforced server-side
- Active session list per user

**Courses & learning**
- Pillars → categories → courses → modules → lessons
- Lesson types: video, text, quiz, assignment, live
- Free preview lessons, gated paid content
- Per-lesson progress with watch position, resume-where-you-left-off
- Course catalogue with pillar/level/search filters
- Course reviews and ratings

**Assessment**
- Assignments with rubrics, due dates, drafts, and multi-attempt resubmission
- Instructor grading UI with per-criterion rubric scoring and feedback
- Grading queue scoped to the courses an instructor actually teaches
- Quiz engine with single-choice, multi-choice and true/false, attempt limits,
  and server-side scoring (the client is never told the answers)

**Certification**
- Auto-issued when a course passes its completion threshold
- Serialised (`MABY-2026-000042`) with a public verification page
- Revocation supported and reported honestly at `/verify`

**Rewards**
- Append-only points ledger; balances can never drift from it
- Idempotent awards — replaying an action never double-credits
- Daily streaks with milestone bonuses
- Criteria-driven badges, evaluated automatically
- Leaderboard and per-user rank

**Referrals**
- Every member gets a referral code and shareable link
- Configurable multi-level commission tree (default 10% / 5% / 2%)
- Commissions written in the same transaction as the paid order
- Referral dashboard with network view and commission history

**Live sessions**
- Scheduled sessions with RSVP, capacity limits and attendance tracking
- Replay links for anyone who missed it

**Platform**
- In-app notifications for grades, certificates, referrals and sessions
- Audit log for privileged actions
- Versioned REST API at `/api/v1/*` alongside server actions

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19, server actions) |
| Language | TypeScript, strict |
| Database | PostgreSQL via Prisma 6 |
| Styling | Tailwind CSS v4 |
| Validation | Zod, shared between server actions and the REST API |
| Auth | Custom sessions — bcrypt + HMAC'd tokens in httpOnly cookies |

---

## Getting started

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env
#    Set DATABASE_URL, and generate a secret:
#    openssl rand -base64 48   →  SESSION_SECRET

# 3. Create the schema
npm run db:migrate

# 4. Load a fully-populated demo academy
npm run db:seed

# 5. Run
npm run dev
```

Open http://localhost:3000.

### Seeded accounts

Password for all: `MabyAcademy2026!`

| Role | Email |
| --- | --- |
| Admin | `mabi@mabyacademy.com` |
| Instructor | `grace@mabyacademy.com` |
| Student | `tobi@example.com` |

The seed builds a three-level referral tree with real paid orders and
commissions, courses with quizzes and graded assignments, issued certificates,
scheduled live sessions, and a populated leaderboard — so every feature is
visible immediately.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (runs `prisma generate` first) |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run db:migrate` | Create and apply a migration |
| `npm run db:deploy` | Apply migrations (production) |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Prisma Studio |

---

## Project layout

```
prisma/
  schema.prisma          Full data model
  seed.ts                Demo academy
src/
  app/
    (site)/              Public: home, catalogue, course pages, player, verify
    (auth)/              Login, register, password reset
    dashboard/           Student dashboard
    admin/               Instructor & admin tools
    api/v1/              Versioned REST API
  components/            UI kit and shared components
  lib/
    auth/                Password hashing, tokens, sessions, RBAC
    db.ts env.ts         Prisma client, validated environment
    validation.ts        Zod schemas shared by actions and API
  server/
    actions/             Server actions (form mutations)
    services/            Domain logic — the single source of truth
```

**The rule that keeps this maintainable:** all business logic lives in
`src/server/services`. Server actions and API routes are thin adapters over
the same functions, so the web UI and any future mobile client can never drift
apart in behaviour.

---

## Configuration

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Public origin — used in referral and certificate links |
| `SESSION_SECRET` | 32+ chars; keys the HMAC over session tokens |
| `SESSION_TTL_DAYS` | Session lifetime (default 30) |
| `REFERRAL_COMMISSION_RATES` | Comma-separated decimals per level, e.g. `0.10,0.05,0.02`. The number of rates sets the depth of the tree. |

---

## Not yet wired up

Deliberately left as integration points rather than half-built:

- **Email delivery.** Reset and verification tokens are generated and stored
  correctly; nothing sends them yet. In development the reset link is surfaced
  in the UI so the flow is testable. Wire a provider into
  `src/server/services/auth.ts`.
- **Payments.** Orders, paid status and referral commissions all work, driven
  through a `manual` provider. `enrollUser()` in
  `src/server/services/courses.ts` is where Stripe/Paystack/crypto checkout
  slots in — the commission fan-out already happens in the same transaction.
- **File uploads.** Submissions accept file *URLs*. Add object storage and
  swap the field for a real uploader.
- **Video hosting.** Lessons embed a `videoUrl` in an iframe. Point it at
  Mux, Cloudflare Stream, YouTube or Vimeo.

---

Education only. Nothing in this platform is financial advice.
