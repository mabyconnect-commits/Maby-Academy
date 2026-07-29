# Maby Academy — Roles & Permissions

## Design

Roles are coarse labels; **permissions** are the unit of authorisation. A role
is a named bundle of permissions, so a capability can be moved between roles
without touching application code.

Two rules make this safe:

1. **Scope, not just capability.** `submission:grade` is meaningless without
   asking *whose* submission. Every permission check that touches a specific
   record also passes an ownership test — an Instructor may grade only work in
   courses they teach. Capability alone is never sufficient.
2. **Server-side only.** Client-side role checks exist to hide irrelevant UI,
   never to protect data. Every service re-checks.

## Role hierarchy

| Role | Purpose |
| --- | --- |
| `VISITOR` | Not authenticated. Public content only. |
| `STUDENT` | Learns, submits, participates, earns. |
| `MENTOR` | Guides assigned students; sees their progress, not their journals. |
| `INSTRUCTOR` | Authors and teaches courses; grades work in their own courses. |
| `REVIEWER` | Quality gate — approves course content before publication. |
| `MODERATOR` | Keeps the community safe. |
| `SUPPORT` | Handles tickets. Sees account state, never credentials. |
| `FINANCE` | Payments, refunds, commissions, reconciliation. No content powers. |
| `ADMIN` | Runs the academy day to day. |
| `SUPER_ADMIN` | Platform authority: permissions, security, feature flags, exports. |

Roles are **additive, not strictly hierarchical** — Finance is not "more" than
Instructor, it is different. A user may hold several roles.

## Permission matrix

`✓` allowed · `own` limited to their own records · `assigned` limited to
records assigned to them · `—` denied

| Permission | Student | Mentor | Instructor | Reviewer | Moderator | Support | Finance | Admin | Super |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **Learning** |
| `course:view_published` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `course:view_draft` | — | — | own | ✓ | — | — | — | ✓ | ✓ |
| `course:create` | — | — | ✓ | — | — | — | — | ✓ | ✓ |
| `course:edit` | — | — | own | — | — | — | — | ✓ | ✓ |
| `course:submit_for_review` | — | — | own | — | — | — | — | ✓ | ✓ |
| `course:approve` | — | — | — | ✓ | — | — | — | ✓ | ✓ |
| `course:publish` | — | — | — | — | — | — | — | ✓ | ✓ |
| `course:archive` | — | — | — | — | — | — | — | ✓ | ✓ |
| `enrolment:self` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `enrolment:manage_others` | — | — | — | — | — | ✓ | — | ✓ | ✓ |
| **Assessment** |
| `submission:create` | own | — | — | — | — | — | — | — | — |
| `submission:view` | own | assigned | own courses | — | — | ✓ | — | ✓ | ✓ |
| `submission:grade` | — | — | own courses | — | — | — | — | ✓ | ✓ |
| `quiz:attempt` | ✓ | — | — | — | — | — | — | — | — |
| `quiz:manage` | — | — | own courses | — | — | — | — | ✓ | ✓ |
| **Certification** |
| `certificate:view_own` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `certificate:issue_manual` | — | — | — | — | — | — | — | ✓ | ✓ |
| `certificate:revoke` | — | — | — | — | — | — | — | ✓ | ✓ |
| **Mentorship** |
| `mentee:view_progress` | — | assigned | own courses | — | — | — | — | ✓ | ✓ |
| `mentee:view_journal` | — | consented | — | — | — | — | — | — | — |
| `mentor_session:manage` | — | assigned | — | — | — | — | — | ✓ | ✓ |
| **Community** |
| `post:create` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `post:edit` | own | own | own | own | ✓ | — | — | ✓ | ✓ |
| `post:delete` | own | own | own | own | ✓ | — | — | ✓ | ✓ |
| `post:pin` | — | — | own courses | — | ✓ | — | — | ✓ | ✓ |
| `report:review` | — | — | — | — | ✓ | — | — | ✓ | ✓ |
| `user:suspend` | — | — | — | — | ✓ | — | — | ✓ | ✓ |
| **Commerce** |
| `payment:view` | own | — | — | — | — | ✓ | ✓ | ✓ | ✓ |
| `refund:issue` | — | — | — | — | — | — | ✓ | ✓ | ✓ |
| `commission:approve` | — | — | — | — | — | — | ✓ | ✓ | ✓ |
| `payout:execute` | — | — | — | — | — | — | ✓ | — | ✓ |
| `financial_report:export` | — | — | — | — | — | — | ✓ | ✓ | ✓ |
| **Support** |
| `ticket:create` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `ticket:respond` | own | — | — | — | — | ✓ | — | ✓ | ✓ |
| `ticket:assign` | — | — | — | — | — | ✓ | — | ✓ | ✓ |
| **Growth** |
| `habit:manage` | own | — | — | — | — | — | — | — | — |
| `journal:read` | own | consented | — | — | — | — | — | — | — |
| **Administration** |
| `user:view` | — | assigned | own students | — | ✓ | ✓ | — | ✓ | ✓ |
| `user:edit` | own | — | — | — | — | — | — | ✓ | ✓ |
| `role:assign` | — | — | — | — | — | — | — | ✓ | ✓ |
| `permission:configure` | — | — | — | — | — | — | — | — | ✓ |
| `audit:view` | — | — | — | — | — | — | — | ✓ | ✓ |
| `feature_flag:manage` | — | — | — | — | — | — | — | — | ✓ |
| `data:export` | own | — | — | — | — | — | — | — | ✓ |
| `settings:manage` | — | — | — | — | — | — | — | ✓ | ✓ |

## Privacy boundaries that must never be crossed

These are not conveniences — they are the reason members will trust the
platform with personal material.

| Rule | Rationale |
| --- | --- |
| Journals are private by default | A reflection or prayer journal is worthless if the writer suspects an audience. Mentor visibility requires explicit, revocable, per-entry consent. |
| Support sees account state, never credentials | A support agent must be able to help without ever being able to impersonate. |
| Finance sees money, not learning | A finance role has no reason to read a student's assignments. |
| Instructors are scoped to their own courses | Teaching one course grants no visibility into another's students. |
| Health and faith data are opt-in | Never inferred, never surfaced to anyone but the member. |
| Super Admin actions are always audited | The most powerful role is the one that most needs a record. |

## Current implementation status

| Role | State |
| --- | --- |
| `STUDENT` | ✅ implemented |
| `INSTRUCTOR` | ✅ implemented, correctly scoped to own courses |
| `ADMIN` | ✅ implemented |
| All others | ⬜ defined here, not yet in the schema |
| Granular `Permission` table | ⬜ currently role checks are hard-coded |

The migration path: add `Permission` / `RolePermission` tables, seed them from
this matrix, and replace `requireRole(...)` with `requirePermission(...)`
inside services. The existing role checks stay valid throughout, so this can
land incrementally without a breaking change.
