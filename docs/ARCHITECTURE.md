# Maby Academy — Technical Architecture

## A. Product interpretation

Maby Academy is not a course marketplace. It is a **digital institution**: an
academy where enrolment means obligation, work is graded by a human, progress
is measurable, and completion produces a credential a third party can verify.

Three commitments distinguish it:

1. **Proof over consumption.** Watching a video earns nothing. Points,
   progress and certificates come from passing assessments and submitting work
   that a person reads. Completion conditions are configurable per lesson so
   "finished" always means something.
2. **The whole person.** Crypto and Web3 are the core, but the platform treats
   faith, health, discipline and purpose as first-class curriculum, not
   decoration. A member's growth record spans all of it.
3. **Responsibility.** Crypto education attracts people who can be hurt by it.
   The platform never gives financial advice, never touches user funds, never
   asks for a seed phrase, and states risk plainly wherever money is discussed.

## B. Recommended architecture, and why

**Modular monolith, Next.js + TypeScript + PostgreSQL + Prisma.**

The reasoning:

- **One deployable unit** removes an entire class of failure (network calls
  between services, distributed transactions, version skew) at a stage where
  the product has no scale problem to solve. Referral commissions, points and
  enrolment must commit atomically with orders — trivial in one database,
  genuinely hard across services.
- **Domain separation inside the monolith** means any domain can be extracted
  later without rewriting it. The rule that enforces this: all business logic
  lives in `src/server/services`, and nothing else talks to the database.
- **Server Components** let the catalogue and marketing pages render on the
  server with no client JavaScript cost, which matters for learners on mobile
  data in West Africa.
- **Prisma** gives a typed schema shared by the app, the API and the seed, so
  a schema change surfaces as a compile error rather than a runtime one.

Deliberate deferrals, with triggers for revisiting:

| Deferred | Revisit when |
| --- | --- |
| Redis (cache, queues, rate limits) | First rate-limiting requirement, or background jobs |
| Microservices | A single domain needs independent scaling |
| Object storage | Real file uploads (currently URLs) |
| Search engine | Catalogue search outgrows Postgres `ILIKE` |
| WebSockets | Live community requires push, not poll |

## C. Layering rule

```
Route handler / Server action / Page      ← thin adapters, no business logic
        ↓
    Services  (src/server/services)       ← ALL business logic, transactions
        ↓
    Prisma client (src/lib/db)            ← the only database access
```

Consequences that make this worth enforcing:

- The web UI and the REST API cannot drift, because both call the same
  functions.
- Permissions are checked server-side inside services, so a forged client
  request cannot bypass them.
- A future mobile app gets identical behaviour for free.

## D. Domains

Each maps to a service module and a slice of the schema.

| Domain | Status |
| --- | --- |
| Identity — users, sessions, tokens, roles, permissions | ✅ built |
| Learning — schools, programmes, courses, modules, lessons | 🟡 courses down |
| Enrolment & progress | ✅ built |
| Assessment — quizzes, assignments, rubrics, grading | ✅ built |
| Certification | ✅ built |
| Rewards — points, badges, streaks, levels | ✅ built |
| Referrals & affiliates | ✅ built |
| Events — live sessions, attendance | ✅ built |
| Commerce — plans, subscriptions, payments, invoices | 🟡 orders only |
| Community — posts, comments, moderation | ⬜ |
| Growth — habits, goals, journals | ⬜ |
| Mentorship | ⬜ |
| Support — tickets, help centre | ⬜ |
| Notifications | 🟡 in-app only |
| Analytics | 🟡 basic counts |
| Administration & audit | ✅ built |

## E. Repository structure

```
prisma/
  schema.prisma            Single source of truth for the data model
  migrations/              Versioned, applied automatically on deploy
  seed.ts                  Realistic demo academy (blocked in production)
scripts/
  migrate.mjs              Deploy-time migration with credential resolution
  set-role.ts              Promote a user to INSTRUCTOR / ADMIN
docs/                      Product, architecture, roles, data model, roadmap
src/
  app/
    (site)/                Public: home, catalogue, course, player, verify
    (auth)/                Login, register, password reset
    dashboard/             Student area
    admin/                 Instructor + administrator area
    setup/                 Shown when no database is configured
    api/v1/                Versioned REST API
  components/
    ui/                    Design-system primitives
    *.tsx                  Shared composed components
  lib/
    auth/                  Password hashing, tokens, sessions, RBAC
    db.ts                  Prisma singleton
    env.ts                 Validated configuration (fails fast)
    database-url.ts        Multi-provider credential resolution
    validation.ts          Zod schemas shared by actions and API
    utils.ts               Formatting helpers
  server/
    actions/               Server actions — thin adapters over services
    services/              ALL business logic
  middleware.ts            Setup-mode routing
```

## F. Environment variables

Placeholders only — never commit real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | for a working app | Pooled Postgres connection. `POSTGRES_PRISMA_URL` and `POSTGRES_URL` are also accepted, so platform-provisioned databases work unchanged. |
| `DIRECT_DATABASE_URL` | recommended | Unpooled URL for migrations. `DATABASE_URL_UNPOOLED` and `POSTGRES_URL_NON_POOLING` also accepted; falls back to the pooled URL. |
| `SESSION_SECRET` | yes | 32+ chars. Keys the HMAC over session tokens. Must be stable across deploys and instances. |
| `NEXT_PUBLIC_APP_URL` | recommended | Public origin. Defaults to the Vercel domain. Printed permanently onto certificates. |
| `SESSION_TTL_DAYS` | no | Session lifetime, default 30 |
| `REFERRAL_COMMISSION_RATES` | no | Comma-separated decimals per level, e.g. `0.10,0.05,0.02` |
| `ALLOW_PRODUCTION_SEED` | no | Escape hatch to seed demo data into a live database. Do not set on production. |

Planned as features land:

`REDIS_URL`, `S3_*`, `RESEND_API_KEY`, `PAYSTACK_SECRET_KEY`,
`FLUTTERWAVE_SECRET_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`ANTHROPIC_API_KEY`, `SENTRY_DSN`, `ZOOM_*`, `GOOGLE_CLIENT_*`.

## G. Non-negotiable implementation rules

- TypeScript strict; no unchecked `any`.
- Every external input validated with Zod before it reaches a service.
- Permissions checked server-side. Client-side checks are presentation only.
- Money, points and enrolment mutations run inside database transactions.
- Reward and payment operations are idempotent via stable reference keys.
- Append-only ledgers for points and audit; denormalised totals only ever
  change inside the same transaction that writes the ledger row.
- Configuration validated at import so a bad deploy fails at build, not at 2am.
- No secrets in source, logs, or error messages.
- A feature is not "done" until it has been exercised end to end.
