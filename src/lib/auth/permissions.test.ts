import { describe, expect, it } from "vitest";
import type { Role } from "@prisma/client";
import {
  PERMISSIONS,
  ROLE_PERMISSION_MAP,
  permissionsFor,
  type PermissionKey,
} from "./permissions";

/**
 * These assert the *negative* space as much as the positive: what each role
 * must never be able to do. A privilege leak is a silent bug — nothing fails,
 * someone simply sees what they shouldn't — so the denials are the tests that
 * actually earn their keep.
 */

const can = (roles: Role[], permission: PermissionKey) =>
  permissionsFor(roles).has(permission);

describe("role capabilities", () => {
  it("lets students do student things", () => {
    expect(can(["STUDENT"], "submission:create")).toBe(true);
    expect(can(["STUDENT"], "quiz:attempt")).toBe(true);
    expect(can(["STUDENT"], "enrolment:self")).toBe(true);
  });

  it("lets instructors teach and grade", () => {
    expect(can(["INSTRUCTOR"], "submission:grade")).toBe(true);
    expect(can(["INSTRUCTOR"], "course:create")).toBe(true);
    expect(can(["INSTRUCTOR"], "quiz:manage")).toBe(true);
  });

  it("gives reviewers approval rights without teaching rights", () => {
    expect(can(["REVIEWER"], "course:approve")).toBe(true);
    expect(can(["REVIEWER"], "submission:grade")).toBe(false);
    expect(can(["REVIEWER"], "course:create")).toBe(false);
  });

  it("gives finance money powers only", () => {
    expect(can(["FINANCE"], "refund:issue")).toBe(true);
    expect(can(["FINANCE"], "commission:approve")).toBe(true);
    expect(can(["FINANCE"], "financial_report:export")).toBe(true);
  });

  it("gives moderators safety powers only", () => {
    expect(can(["MODERATOR"], "report:review")).toBe(true);
    expect(can(["MODERATOR"], "user:suspend")).toBe(true);
  });
});

describe("privilege boundaries", () => {
  it("keeps students away from staff capabilities", () => {
    const forbidden: PermissionKey[] = [
      "submission:grade",
      "course:view_draft",
      "course:publish",
      "refund:issue",
      "user:suspend",
      "role:assign",
      "audit:view",
      "settings:manage",
    ];
    for (const permission of forbidden) {
      expect(can(["STUDENT"], permission), permission).toBe(false);
    }
  });

  it("stops instructors publishing their own work unreviewed", () => {
    // The editorial gate only means something if the author cannot open it.
    expect(can(["INSTRUCTOR"], "course:approve")).toBe(false);
    expect(can(["INSTRUCTOR"], "course:publish")).toBe(false);
  });

  it("separates money from learning", () => {
    // Finance has no business reading a student's coursework.
    expect(can(["FINANCE"], "submission:view")).toBe(false);
    expect(can(["FINANCE"], "course:edit")).toBe(false);
    // And instructors have no business issuing refunds.
    expect(can(["INSTRUCTOR"], "refund:issue")).toBe(false);
    expect(can(["INSTRUCTOR"], "payout:execute")).toBe(false);
  });

  it("lets support help without letting them move money or content", () => {
    expect(can(["SUPPORT"], "ticket:respond")).toBe(true);
    expect(can(["SUPPORT"], "refund:issue")).toBe(false);
    expect(can(["SUPPORT"], "course:edit")).toBe(false);
    expect(can(["SUPPORT"], "role:assign")).toBe(false);
  });

  it("reserves platform-shaping powers for super admin", () => {
    const superOnly: PermissionKey[] = [
      "permission:configure",
      "feature_flag:manage",
      "data:export",
    ];
    for (const permission of superOnly) {
      expect(can(["ADMIN"], permission), `ADMIN ${permission}`).toBe(false);
      expect(can(["SUPER_ADMIN"], permission), `SUPER ${permission}`).toBe(true);
    }
  });

  it("never lets a non-mentor read a journal", () => {
    for (const role of ["STUDENT", "INSTRUCTOR", "ADMIN", "SUPPORT"] as Role[]) {
      expect(can([role], "mentee:view_journal"), role).toBe(false);
    }
    // Even the mentor's capability is gated again by per-assignment consent.
    expect(can(["MENTOR"], "mentee:view_journal")).toBe(true);
  });
});

describe("multiple roles", () => {
  it("unions permissions across every role held", () => {
    expect(can(["STUDENT"], "mentee:view_progress")).toBe(false);
    expect(can(["STUDENT", "MENTOR"], "mentee:view_progress")).toBe(true);
    expect(can(["STUDENT", "MENTOR"], "submission:create")).toBe(true);
  });

  it("does not invent permissions no held role grants", () => {
    expect(can(["STUDENT", "MENTOR", "SUPPORT"], "permission:configure")).toBe(
      false,
    );
  });
});

describe("catalogue integrity", () => {
  it("grants super admin every permission, derived not listed", () => {
    expect(ROLE_PERMISSION_MAP.SUPER_ADMIN).toHaveLength(
      Object.keys(PERMISSIONS).length,
    );
  });

  it("only references permissions that exist", () => {
    const known = new Set(Object.keys(PERMISSIONS));
    for (const [role, keys] of Object.entries(ROLE_PERMISSION_MAP)) {
      for (const key of keys) {
        expect(known.has(key), `${role} → ${key}`).toBe(true);
      }
    }
  });

  it("gives every role at least the baseline", () => {
    for (const role of Object.keys(ROLE_PERMISSION_MAP) as Role[]) {
      expect(can([role], "course:view_published"), role).toBe(true);
      expect(can([role], "ticket:create"), role).toBe(true);
    }
  });
});
