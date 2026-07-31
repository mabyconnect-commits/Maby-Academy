import { describe, expect, it } from "vitest";
import { NAV, WORKSPACE_REQUIRES, type Workspace } from "./nav-config";
import { PERMISSIONS, permissionsFor } from "@/lib/auth/permissions";

/**
 * The navigation declaration is a display filter, not a security boundary — the
 * services refuse on their own authority regardless of what is rendered. These
 * tests exist because getting it wrong is silent in a different way: a member
 * is either shown a door that opens onto a redirect, or shown a whole workspace
 * they have no business being offered.
 *
 * That second one shipped. `payment:view` unlocked the Admin workspace and also
 * sits in the baseline every member holds, for their own billing page, so every
 * student on the site was offered an Admin switcher in the sidebar.
 */

const STUDENT = permissionsFor(["STUDENT"]);
const WORKSPACES = Object.keys(NAV) as Workspace[];

describe("workspace unlocks", () => {
  it("offers a student the Learn workspace and nothing else", () => {
    const offered = WORKSPACES.filter((w) => {
      const needs = WORKSPACE_REQUIRES[w];
      return needs.length === 0 || needs.some((p) => STUDENT.has(p));
    });
    expect(offered).toEqual(["learn"]);
  });

  it("never gates a staff workspace on a permission every member holds", () => {
    for (const workspace of WORKSPACES) {
      if (workspace === "learn") continue;
      for (const key of WORKSPACE_REQUIRES[workspace]) {
        expect(STUDENT.has(key), `${workspace} unlocked by ${key}`).toBe(false);
      }
    }
  });

  it("still lets each staff role reach the workspaces it needs", () => {
    const reaches = (role: Parameters<typeof permissionsFor>[0][number], w: Workspace) => {
      const needs = WORKSPACE_REQUIRES[w];
      return needs.length === 0 || needs.some((p) => permissionsFor([role]).has(p));
    };
    expect(reaches("INSTRUCTOR", "teach")).toBe(true);
    expect(reaches("MENTOR", "mentor")).toBe(true);
    expect(reaches("FINANCE", "admin")).toBe(true);
    expect(reaches("SUPPORT", "admin")).toBe(true);
    expect(reaches("MODERATOR", "admin")).toBe(true);
    expect(reaches("ADMIN", "admin")).toBe(true);
    expect(reaches("SUPER_ADMIN", "admin")).toBe(true);
  });
});

describe("nav rows", () => {
  const rows = WORKSPACES.flatMap((w) =>
    NAV[w].flatMap((s) => s.items.map((i) => ({ workspace: w, ...i }))),
  );

  it("only requires permissions that exist", () => {
    const known = new Set(Object.keys(PERMISSIONS));
    for (const row of rows) {
      if (!row.requires) continue;
      expect(known.has(row.requires), `${row.href} → ${row.requires}`).toBe(true);
    }
  });

  it("shows a student no staff destination", () => {
    const visible = NAV.learn
      .flatMap((s) => s.items)
      .filter((i) => !i.requires || STUDENT.has(i.requires));
    for (const row of visible) {
      expect(row.href.startsWith("/admin"), row.href).toBe(false);
      expect(row.href.startsWith("/teach"), row.href).toBe(false);
      expect(row.href.startsWith("/mentor"), row.href).toBe(false);
    }
  });

  it("keeps hrefs unique within a workspace", () => {
    for (const workspace of WORKSPACES) {
      const hrefs = NAV[workspace].flatMap((s) => s.items.map((i) => i.href));
      expect(new Set(hrefs).size, workspace).toBe(hrefs.length);
    }
  });

  it("keeps the mobile bar ordering unambiguous", () => {
    for (const workspace of WORKSPACES) {
      const orders = NAV[workspace]
        .flatMap((s) => s.items)
        .map((i) => i.mobileOrder)
        .filter((o): o is number => o !== undefined);
      expect(new Set(orders).size, workspace).toBe(orders.length);
    }
  });
});
