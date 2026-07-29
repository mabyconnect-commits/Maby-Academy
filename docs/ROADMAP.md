# Maby Academy — Master Build Roadmap

The complete feature checklist, mapped against the master specification.
Every item is marked so nothing gets lost across sessions.

| Mark | Meaning |
| --- | --- |
| ✅ | Built and verified working |
| 🟡 | Partially built — foundation exists, needs completion |
| ⬜ | Not started |
| 🔒 | Deliberately deferred (needs legal, compliance or a paid provider) |

Last updated: Phase A (schema + permissions foundation).

---

## Phase 1 — Foundation

### Authentication & identity
| Item | State | Notes |
| --- | --- | --- |
| Email + password auth | ✅ | bcrypt 12 rounds, timing-safe login |
| Server-side sessions | ✅ | HMAC'd tokens, httpOnly cookies |
| Password reset | ✅ | Token flow works; email delivery ⬜ |
| Email verification | ✅ | Token flow works; email delivery ⬜ |
| Session listing | ✅ | Visible in settings |
| Session revocation (individual) | 🟡 | Revoke-all on password change works; per-device ⬜ |
| Two-factor authentication | ⬜ | TOTP + recovery codes |
| Device management | 🟡 | Devices recorded; management UI ⬜ |
| Suspicious-login alerts | ⬜ | Needs notification channel |
| Backup recovery codes | ⬜ | |
| Phone authentication | ⬜ | Needs SMS provider |
| Google sign-in | ⬜ | OAuth |
| Apple sign-in | ⬜ | OAuth |
| Wallet connection (optional, never replaces auth) | ⬜ | |
| Brute-force protection / rate limiting | ⬜ | Needs Redis |
| Account lockout rules | ⬜ | |

### Roles & permissions
| Item | State | Notes |
| --- | --- | --- |
| Role model | 🟡 | 3 of 10 roles exist |
| Visitor | ✅ | Public routes |
| Student | ✅ | |
| Instructor | ✅ | Scoped to own courses |
| Administrator | ✅ | |
| Mentor | ⬜ | |
| Course Reviewer | ⬜ | |
| Community Moderator | ⬜ | |
| Support Agent | ⬜ | |
| Finance Manager | ⬜ | |
| Super Administrator | ⬜ | |
| Granular permission system | ⬜ | Permission + RolePermission tables |
| Object-level access control | 🟡 | Enforced ad-hoc in services; needs a policy layer |
| Audit log | ✅ | Model + writes on privileged actions |

### Onboarding
| Item | State | Notes |
| --- | --- | --- |
| Onboarding questionnaire | ⬜ | Knowledge level, goals, interests, availability |
| Personalised learning pathway generation | ⬜ | Depends on questionnaire |
| Time zone capture | ✅ | In profile settings |

### Public website
| Item | State | Notes |
| --- | --- | --- |
| Homepage | ✅ | Hero, pillars, how-it-works, featured, CTA |
| Course catalogue | ✅ | Filters + search |
| Course detail | ✅ | |
| Certificate verification | ✅ | Public, QR-ready |
| Login / Register / Reset | ✅ | |
| About | ⬜ | |
| Programmes / individual programme | ⬜ | Depends on Programme model |
| Schools / individual school | ⬜ | Depends on School model |
| Instructors / instructor profile | ⬜ | |
| Pricing | ⬜ | Depends on Plan model |
| Scholarships | ⬜ | |
| Community (public) | ⬜ | |
| Success stories | ⬜ | |
| Events | ⬜ | |
| Blog / article | ⬜ | |
| FAQ | ⬜ | |
| Contact | ⬜ | |
| Careers | ⬜ | |
| Partners | ⬜ | |
| Affiliate programme | ⬜ | |
| Terms / Privacy / Cookies / Refund | ⬜ | |
| Community guidelines | ⬜ | |
| Financial education disclaimer | 🟡 | Footer line exists; full page ⬜ |
| Risk disclosure | ⬜ | |

### Dashboards
| Item | State | Notes |
| --- | --- | --- |
| Student dashboard | ✅ | Stats, resume, courses, feedback, sessions |
| Admin dashboard | ✅ | Overview + grading queue |
| Instructor dashboard | 🟡 | Shares admin shell; needs own analytics |
| Daily growth checklist | ⬜ | Depends on Habit model |
| Personal growth score | ⬜ | |

---

## Phase 2 — Learning system

| Item | State | Notes |
| --- | --- | --- |
| Course → Module → Lesson | ✅ | |
| School layer | ⬜ | Above Programme |
| Programme layer | ⬜ | Between School and Course |
| Cohorts | ⬜ | |
| Enrolment | ✅ | |
| Lesson progress + resume | ✅ | Watch position, last lesson |
| Lesson types: video, text, quiz, assignment, live | ✅ | |
| Lesson types: audio, presentation, interactive, case study, resource, reading, discussion, reflection, challenge, exam, capstone | ⬜ | |
| Video: resume position | ✅ | |
| Video: adaptive quality, captions, transcripts, PiP, speed | ⬜ | Needs a video provider |
| Configurable completion conditions | 🟡 | Quiz/assignment gate lessons; watch-% ⬜ |
| Lesson notes | ⬜ | |
| Bookmarks at timestamps | ⬜ | |
| Saved lessons | ⬜ | |
| Prerequisites | ⬜ | |
| Drip content | ⬜ | |
| Learning paths | ⬜ | |
| Course builder (drag-and-drop) | ⬜ | Instructors currently need seed/DB access |
| Draft / review / approve / publish workflow | 🟡 | DRAFT/PUBLISHED/ARCHIVED exist; review states ⬜ |
| Course versioning | ⬜ | |
| Co-instructors | ⬜ | |
| Course cloning | ⬜ | |
| Course bundles | ⬜ | |

---

## Phase 3 — Assessments

| Item | State | Notes |
| --- | --- | --- |
| Assignments | ✅ | |
| Rubrics | ✅ | Per-criterion scoring |
| Submissions (text, link, file URL) | ✅ | |
| Drafts | ✅ | |
| Resubmission as new attempt | ✅ | |
| Instructor grading UI | ✅ | |
| Grading queue scoped by course | ✅ | |
| Feedback | ✅ | Text |
| Audio / video feedback | ⬜ | |
| Inline annotations | ⬜ | |
| Peer review | ⬜ | |
| Group submissions | ⬜ | |
| Appeals | ⬜ | |
| Real file uploads | ⬜ | Needs object storage |
| Plagiarism check | 🔒 | Needs third-party provider |
| Quizzes: single, multi, true/false | ✅ | Server-side scoring |
| Quizzes: short answer, long answer, matching, ordering, fill-in-blank, image, code, scenario | ⬜ | |
| Attempt limits | ✅ | |
| Timed assessments | ⬜ | |
| Randomised question banks | ⬜ | |
| Negative marking | ⬜ | |
| Delayed result release | ⬜ | |
| Exam integrity controls | ⬜ | Non-invasive by default |
| Certificates | ✅ | Serialised, verifiable, revocable |
| Certificate PDF download | ⬜ | |
| Certificate QR code | ⬜ | |
| Social share card | ⬜ | |

---

## Phase 4 — Commerce

| Item | State | Notes |
| --- | --- | --- |
| Order model | ✅ | |
| Free / paid courses | ✅ | |
| Plans & subscriptions | ⬜ | |
| One-time / monthly / quarterly / annual / lifetime | ⬜ | |
| Instalments | ⬜ | |
| Coupons | ⬜ | |
| Invoices & receipts | ⬜ | |
| Refunds | ⬜ | |
| Scholarships | ⬜ | |
| Gift enrolments | ⬜ | |
| Team / organisation plans | ⬜ | |
| Payment provider abstraction | 🟡 | `provider` field exists; only `manual` implemented |
| Paystack / Flutterwave / Stripe | ⬜ | |
| Webhook verification + idempotency | ⬜ | Design already idempotent on order id |
| Multi-currency | 🟡 | Currency stored per course/order; no FX |
| Tax configuration | ⬜ | |
| Wallet credits | ⬜ | |

---

## Phase 5 — Community & events

| Item | State | Notes |
| --- | --- | --- |
| Live sessions | ✅ | Scheduled, RSVP, capacity, replay link |
| Attendance tracking | ✅ | Service exists; UI ⬜ |
| Calendar / Zoom / Meet integration | ⬜ | |
| Reminders | ⬜ | Needs notification channel |
| Recurring events | ⬜ | |
| Instructor availability / booking | ⬜ | |
| Communities (academy, school, course, cohort, private) | ⬜ | |
| Posts / comments / reactions | ⬜ | |
| Polls, Q&A, pinned posts | ⬜ | |
| Moderation & reports | ⬜ | |
| Direct messages | ⬜ | |
| Member directory | ⬜ | |
| Community guidelines | ⬜ | |

---

## Phase 6 — Growth & gamification

| Item | State | Notes |
| --- | --- | --- |
| Points ledger (append-only, idempotent) | ✅ | |
| Badges with criteria engine | ✅ | |
| Streaks + milestone bonuses | ✅ | |
| Leaderboard + rank | ✅ | |
| Levels / XP | 🟡 | Lifetime points exist; level tiers ⬜ |
| Reward store | ⬜ | |
| Seasonal challenges | ⬜ | |
| Anti-abuse controls | 🟡 | Idempotency prevents replay; rate limits ⬜ |
| Habits | ⬜ | |
| Goals (daily→annual) | ⬜ | |
| Journals (private by default) | ⬜ | |
| Reflections / gratitude / prayer points | ⬜ | |
| Weekly & monthly reviews | ⬜ | |
| Personal scorecards | ⬜ | |
| Faith experience | ⬜ | Devotionals, scripture, prayer reminders |
| Health experience | ⬜ | Workouts, hydration, sleep, disclaimers |

---

## Phase 7 — Referrals & affiliates

| Item | State | Notes |
| --- | --- | --- |
| Referral codes + links | ✅ | |
| Multi-level tree with cycle protection | ✅ | Configurable depth |
| Commission on paid orders | ✅ | Same transaction as order |
| Signup bonus points | ✅ | |
| Referral dashboard | ✅ | Network + earnings + history |
| Commission status workflow | 🟡 | Statuses exist; approval UI ⬜ |
| Campaign links | ⬜ | |
| Fraud detection | ⬜ | |
| Payout workflow | ⬜ | |
| Promotional assets | ⬜ | |
| Compliance controls + default-off | 🔒 | Currently on by default — must gate before charging |

---

## Phase 8 — Advanced intelligence

| Item | State | Notes |
| --- | --- | --- |
| Global search | ⬜ | Permission-aware |
| AI learning assistant | ⬜ | |
| Lesson summaries / flashcards | ⬜ | |
| Recommendations | ⬜ | |
| Student-risk detection | ⬜ | |
| Instructor analytics | ⬜ | |
| Admin analytics | 🟡 | Basic counts; cohort/retention ⬜ |
| Scheduled reports / CSV / PDF export | ⬜ | |

---

## Phase 9 — Mobile & scale

| Item | State | Notes |
| --- | --- | --- |
| Versioned REST API | ✅ | `/api/v1` shares services with UI |
| PWA | ⬜ | |
| Push notifications | ⬜ | |
| Redis caching / queues | ⬜ | |
| Background workers | ⬜ | |
| Object storage (S3) | ⬜ | |
| Docker | ⬜ | |
| CI/CD | ⬜ | |
| Error monitoring | ⬜ | |
| Organisations / teams | ⬜ | |

---

## Cross-cutting

### Support centre
| Item | State |
| --- | --- |
| Tickets, categories, priorities, statuses | ⬜ |
| Agent assignment & internal notes | ⬜ |
| Help centre articles | ⬜ |
| Satisfaction ratings | ⬜ |

### Notifications
| Item | State | Notes |
| --- | --- | --- |
| In-app notifications | ✅ | |
| Preferences | ⬜ | |
| Email / push / SMS / WhatsApp / Telegram | ⬜ | Needs providers |
| Security notifications non-disableable | ⬜ | |

### Design & accessibility
| Item | State | Notes |
| --- | --- | --- |
| Dark mode | ✅ | |
| Light mode | ⬜ | Tokens exist; needs a second theme |
| Design tokens | ✅ | |
| Component library | 🟡 | Buttons, cards, forms, pills, progress, stats |
| Keyboard navigation + focus states | ✅ | Global focus-visible ring |
| Semantic HTML + ARIA | ✅ | Progressbar, alerts, nav landmarks |
| Reduced motion | ✅ | |
| Colour contrast audit | ⬜ | Needs measurement against WCAG 2.2 AA |
| Skip link | ✅ | |
| Brand identity (wordmark, monogram, favicon, app icon) | 🟡 | Wordmark + monogram exist |

### Security
| Item | State |
| --- | --- |
| Password hashing | ✅ |
| Secure cookies | ✅ |
| Security headers | ✅ |
| Input validation (Zod, shared) | ✅ |
| SQL injection prevention (Prisma) | ✅ |
| Open-redirect prevention | ✅ |
| User enumeration prevention | ✅ |
| Audit logs | ✅ |
| Rate limiting | ⬜ |
| CSP | 🟡 | Headers set; CSP itself ⬜ |
| 2FA | ⬜ |
| File upload validation | ⬜ |
| Webhook signature verification | ⬜ |
| Security centre UI | 🟡 | Sessions + password; 2FA/codes ⬜ |

### Privacy
| Item | State |
| --- | --- |
| Consent management | ⬜ |
| Cookie preferences | ⬜ |
| Data download | ⬜ |
| Account deletion request | ⬜ |
| Communication preferences | ⬜ |
| Journals private by default | ⬜ (model not built yet) |

### Testing
| Item | State | Notes |
| --- | --- | --- |
| Manual end-to-end verification | ✅ | Full learner journey verified against a live server |
| Automated unit tests | ⬜ | Vitest installed, no suite yet |
| Integration / API tests | ⬜ | |
| Permission tests | ⬜ | |
| E2E tests | ⬜ | Playwright available |
| Accessibility tests | ⬜ | |

### Deployment
| Item | State |
| --- | --- |
| Vercel deployment | ✅ |
| Setup mode (deploy before configuration) | ✅ |
| Migrations on deploy | ✅ |
| Multi-provider DB credential resolution | ✅ |
| Production seed guard | ✅ |
| Role promotion script | ✅ |
| Staging environment | ⬜ |
| Backups / restore testing | ⬜ |

---

## Compliance gates — must not ship without review

| Item | Why |
| --- | --- |
| Multi-level referral commissions | Must be tied to genuine product purchases, never recruitment alone. Needs configurable default-off, region restrictions, holding periods, refund clawback. |
| Any token or cash reward | Financial regulation. Off by default. |
| Financial education disclaimers | Must appear on every crypto/trading surface. |
| Health features | Must carry "not medical advice". |
| Faith features | Must be opt-in and never assert judgement on a user's spiritual state. |
| AI features | Must not give personalised financial advice, must be labelled, must not issue final grades. |
