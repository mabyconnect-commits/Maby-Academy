import type { Role } from "@prisma/client";

/**
 * The authorisation catalogue.
 *
 * Roles are coarse labels; permissions are the unit of authorisation, so a
 * capability can move between roles without an application change.
 *
 * Two things this file deliberately does NOT do:
 *
 * 1. It does not decide *which record* a capability applies to. `submission:grade`
 *    is meaningless without asking whose submission — services pair the
 *    capability check with an ownership test. Capability alone is never enough.
 * 2. It is not consulted by client components for anything but hiding
 *    irrelevant UI. Every service re-checks server-side.
 *
 * The catalogue lives in code rather than only in the database so that a
 * permission rename is a compile error, not a silent authorisation gap. The
 * database tables mirror it, letting an administrator re-bundle permissions
 * at runtime without a deploy.
 */

export const PERMISSIONS = {
  // Learning ---------------------------------------------------------------
  "course:view_published": "View published courses",
  "course:view_draft": "View unpublished course content",
  "course:create": "Create courses",
  "course:edit": "Edit course content",
  "course:submit_for_review": "Submit a course for editorial review",
  "course:approve": "Approve course content for publication",
  "course:publish": "Publish or unpublish a course",
  "course:archive": "Archive a course",
  "enrolment:self": "Enrol yourself in a course",
  "enrolment:manage_others": "Enrol or remove other members",

  // Assessment -------------------------------------------------------------
  "submission:create": "Submit assignment work",
  "submission:view": "View assignment submissions",
  "submission:grade": "Grade assignment submissions",
  "quiz:attempt": "Attempt quizzes",
  "quiz:manage": "Create and edit quizzes",

  // Certification ----------------------------------------------------------
  "certificate:view_own": "View your own certificates",
  "certificate:issue_manual": "Issue a certificate manually",
  "certificate:revoke": "Revoke a certificate",

  // Mentorship -------------------------------------------------------------
  "mentee:view_progress": "View a mentee's learning progress",
  "mentee:view_journal": "View a mentee's journal (requires their consent)",
  "mentor_session:manage": "Schedule and record mentor sessions",

  // Community --------------------------------------------------------------
  "post:create": "Create community posts",
  "post:edit": "Edit community posts",
  "post:delete": "Delete community posts",
  "post:pin": "Pin posts",
  "report:review": "Review reported content",
  "user:suspend": "Suspend a member",

  // Commerce ---------------------------------------------------------------
  "payment:view": "View payments and invoices",
  "refund:issue": "Approve and issue refunds",
  "commission:approve": "Approve referral commissions",
  "payout:execute": "Execute commission payouts",
  "financial_report:export": "Export financial reports",

  // Support ----------------------------------------------------------------
  "ticket:create": "Open a support ticket",
  "ticket:respond": "Respond to support tickets",
  "ticket:assign": "Assign support tickets",

  // Growth -----------------------------------------------------------------
  "habit:manage": "Manage your own habits and goals",
  "journal:read": "Read journal entries",

  // Administration ---------------------------------------------------------
  "user:view": "View member records",
  "user:edit": "Edit member records",
  "role:assign": "Assign roles to members",
  "permission:configure": "Reconfigure the permission catalogue",
  "audit:view": "View the audit log",
  "feature_flag:manage": "Manage feature flags",
  "data:export": "Export platform data",
  "settings:manage": "Change platform settings",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

/** Permissions every authenticated member holds, regardless of role. */
const BASELINE: PermissionKey[] = [
  "course:view_published",
  "enrolment:self",
  "certificate:view_own",
  "post:create",
  "post:edit",
  "post:delete",
  "ticket:create",
  "habit:manage",
  "journal:read",
  "payment:view",
];

/**
 * Role → permission bundles. Mirrors the matrix in docs/ROLES.md.
 *
 * Scoping (own / assigned / consented) is enforced by the services that own
 * each record; this map answers only "may this role ever do this at all?".
 */
const ROLE_PERMISSIONS: Record<Role, PermissionKey[]> = {
  STUDENT: [...BASELINE, "submission:create", "quiz:attempt"],

  MENTOR: [
    ...BASELINE,
    "mentee:view_progress",
    "mentee:view_journal",
    "mentor_session:manage",
    "submission:view",
    "user:view",
  ],

  INSTRUCTOR: [
    ...BASELINE,
    "course:view_draft",
    "course:create",
    "course:edit",
    "course:submit_for_review",
    "quiz:manage",
    "submission:view",
    "submission:grade",
    "post:pin",
    "user:view",
  ],

  REVIEWER: [...BASELINE, "course:view_draft", "course:approve"],

  MODERATOR: [
    ...BASELINE,
    "post:pin",
    "report:review",
    "user:suspend",
    "user:view",
  ],

  SUPPORT: [
    ...BASELINE,
    "ticket:respond",
    "ticket:assign",
    "user:view",
    "submission:view",
    "enrolment:manage_others",
  ],

  FINANCE: [
    ...BASELINE,
    "refund:issue",
    "commission:approve",
    "payout:execute",
    "financial_report:export",
  ],

  ADMIN: [
    ...BASELINE,
    "course:view_draft",
    "course:create",
    "course:edit",
    "course:approve",
    "course:publish",
    "course:archive",
    "enrolment:manage_others",
    "submission:view",
    "submission:grade",
    "quiz:manage",
    "certificate:issue_manual",
    "certificate:revoke",
    "mentee:view_progress",
    "mentor_session:manage",
    "post:pin",
    "report:review",
    "user:suspend",
    "user:view",
    "user:edit",
    "role:assign",
    "audit:view",
    "refund:issue",
    "commission:approve",
    "financial_report:export",
    "ticket:respond",
    "ticket:assign",
    "settings:manage",
  ],

  // Super Admin holds everything, including the ability to reshape the
  // catalogue itself. Derived rather than listed so it can never drift.
  SUPER_ADMIN: Object.keys(PERMISSIONS) as PermissionKey[],
};

/** Every permission held by a set of roles, de-duplicated. */
export function permissionsFor(roles: Role[]): Set<PermissionKey> {
  const held = new Set<PermissionKey>();
  for (const role of roles) {
    for (const key of ROLE_PERMISSIONS[role] ?? []) held.add(key);
  }
  return held;
}

export function roleHas(roles: Role[], permission: PermissionKey): boolean {
  return permissionsFor(roles).has(permission);
}

export const ROLE_PERMISSION_MAP = ROLE_PERMISSIONS;

/** Roles that may reach the instructor/admin area at all. */
export const STAFF_ROLES: Role[] = [
  "MENTOR",
  "INSTRUCTOR",
  "REVIEWER",
  "MODERATOR",
  "SUPPORT",
  "FINANCE",
  "ADMIN",
  "SUPER_ADMIN",
];

export function isStaffRole(role: Role) {
  return STAFF_ROLES.includes(role);
}
