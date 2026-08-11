import type { IconName } from "@/components/Icon";
import type { PermissionKey } from "@/lib/auth/permissions";

/**
 * The navigation model for the authenticated app.
 *
 * One declaration drives three surfaces — the desktop sidebar, the mobile tab
 * bar, and the page title in the sticky header — so a destination cannot exist
 * in one and be missing from another. That was a real bug class before: the
 * sidebar and the tab bar were separate lists and drifted apart.
 *
 * `requires` is a *display* filter only. It hides what a user cannot do so the
 * interface doesn't advertise dead ends; the server still refuses the request
 * on its own authority. Nothing here is a security boundary.
 */

export type NavItem = {
  href: string;
  label: string;
  /** Used in the mobile bar, where there is room for about eight characters. */
  short: string;
  icon: IconName;
  /** Match this href exactly rather than by prefix. */
  exact?: boolean;
  requires?: PermissionKey;
  /** Show the unread-notification count on this row. */
  badge?: boolean;
  /** Pinned into the mobile bottom bar, in this order. */
  mobileOrder?: number;
};

export type NavSection = {
  /** Sidebar section label. `null` for the first group, which needs no header. */
  heading: string | null;
  items: NavItem[];
};

/** A workspace is a role's own view of the app, with its own sidebar. */
export type Workspace = "learn" | "teach" | "mentor" | "admin";

export const WORKSPACE_LABELS: Record<Workspace, string> = {
  learn: "Learn",
  teach: "Teach",
  mentor: "Mentor",
  admin: "Admin",
};

export const WORKSPACE_ROOT: Record<Workspace, string> = {
  learn: "/dashboard",
  teach: "/teach",
  mentor: "/mentor",
  admin: "/admin",
};

/**
 * What unlocks a workspace. Holding *any* of these offers it; an empty list
 * means everyone gets it.
 *
 * This has to be declared rather than inferred from the items. Inferring
 * "offer the workspace if any row survives filtering" put a Teach tab in front
 * of every student, because the Overview row carried no requirement of its own
 * and therefore always survived.
 *
 * Admin lists several capabilities because the admin area is shared: a
 * moderator, a support agent and a finance manager each reach it for their own
 * queue and see nothing else.
 *
 * Every key here must be one that no ordinary member holds. `payment:view` was
 * listed for the finance manager and is in `BASELINE` — it means "see my own
 * invoices" on the billing page — so it offered an Admin workspace switcher to
 * every student on the site. Finance is unlocked by `financial_report:export`
 * instead, which only FINANCE, ADMIN and SUPER_ADMIN hold.
 */
export const WORKSPACE_REQUIRES: Record<Workspace, PermissionKey[]> = {
  learn: [],
  teach: ["course:create"],
  mentor: ["mentee:view_progress"],
  admin: [
    "course:approve",
    "report:review",
    "ticket:respond",
    "financial_report:export",
    "user:edit",
    "audit:view",
    "feature_flag:manage",
    "certificate:issue_manual",
    "submission:grade",
  ],
};

export const NAV: Record<Workspace, NavSection[]> = {
  // -------------------------------------------------------------------------
  // Learn — the student workspace
  // -------------------------------------------------------------------------
  learn: [
    {
      heading: null,
      items: [
        {
          href: "/dashboard",
          label: "Overview",
          short: "Home",
          icon: "home",
          exact: true,
          mobileOrder: 1,
        },
        {
          href: "/dashboard/courses",
          label: "My courses",
          short: "Courses",
          icon: "book",
          mobileOrder: 2,
        },
        {
          href: "/dashboard/assignments",
          label: "Assignments",
          short: "Tasks",
          icon: "edit",
          mobileOrder: 3,
        },
        {
          // Directly above Certificates, because they answer the same
          // question at different stages: how am I doing, and did I pass.
          href: "/dashboard/scores",
          label: "My scores",
          short: "Scores",
          icon: "chart",
        },
        {
          href: "/dashboard/certificates",
          label: "Certificates",
          short: "Certs",
          icon: "award",
        },
        {
          href: "/dashboard/live",
          label: "Live sessions",
          short: "Live",
          icon: "calendar",
        },
      ],
    },
    {
      heading: "Growth",
      items: [
        {
          href: "/dashboard/growth",
          label: "Growth centre",
          short: "Growth",
          icon: "seedling",
          mobileOrder: 4,
        },
        {
          href: "/dashboard/journal",
          label: "Journal",
          short: "Journal",
          icon: "journal",
        },
        {
          href: "/dashboard/tools",
          label: "Web3 tools",
          short: "Tools",
          icon: "tools",
        },
        {
          href: "/dashboard/rewards",
          label: "Rewards",
          short: "Rewards",
          icon: "spark",
        },
        {
          href: "/dashboard/leaderboard",
          label: "Leaderboard",
          short: "Ranks",
          icon: "trophy",
        },
      ],
    },
    {
      heading: "Community",
      items: [
        {
          href: "/community",
          label: "Community",
          short: "Feed",
          icon: "users",
        },
        {
          href: "/dashboard/activity",
          label: "Activity",
          short: "Activity",
          icon: "flame",
        },
        {
          href: "/dashboard/mentorship",
          label: "Mentorship",
          short: "Mentor",
          icon: "handshake",
        },
        {
          href: "/dashboard/referrals",
          label: "Referrals",
          short: "Refer",
          icon: "target",
          mobileOrder: 5,
        },
      ],
    },
    {
      heading: "Account",
      items: [
        {
          href: "/dashboard/notifications",
          label: "Notifications",
          short: "Alerts",
          icon: "bell",
          badge: true,
        },
        {
          href: "/dashboard/billing",
          label: "Billing",
          short: "Billing",
          icon: "card",
        },
        {
          href: "/dashboard/support",
          label: "Support",
          short: "Help",
          icon: "lifebuoy",
        },
        {
          href: "/dashboard/settings",
          label: "Settings",
          short: "Settings",
          icon: "settings",
        },
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // Teach — instructor
  // -------------------------------------------------------------------------
  teach: [
    {
      heading: null,
      items: [
        {
          href: "/teach",
          label: "Overview",
          short: "Home",
          icon: "home",
          exact: true,
          mobileOrder: 1,
        },
        {
          href: "/teach/courses",
          label: "Course builder",
          short: "Build",
          icon: "book",
          requires: "course:create",
          mobileOrder: 2,
        },
        {
          href: "/teach/grading",
          label: "Grading queue",
          short: "Grade",
          icon: "clipboard",
          requires: "submission:grade",
          mobileOrder: 3,
        },
        {
          href: "/teach/learners",
          label: "Learners",
          short: "People",
          icon: "users",
          requires: "submission:grade",
          mobileOrder: 4,
        },
        {
          href: "/teach/sessions",
          label: "Live sessions",
          short: "Live",
          icon: "calendar",
          // Live sessions are a course feature, so this is the instructor
          // capability. `mentor_session:manage` is a *mentor* permission and
          // gated instructors out of their own sessions page entirely.
          requires: "course:create",
          mobileOrder: 5,
        },
        {
          href: "/teach/analytics",
          label: "Course analytics",
          short: "Stats",
          icon: "chart",
          requires: "course:create",
          mobileOrder: 6,
        },
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // Mentor
  // -------------------------------------------------------------------------
  mentor: [
    {
      heading: null,
      items: [
        {
          href: "/mentor",
          label: "Assigned students",
          short: "Students",
          icon: "users",
          exact: true,
          requires: "mentee:view_progress",
          mobileOrder: 1,
        },
        {
          href: "/mentor/sessions",
          label: "Sessions",
          short: "Sessions",
          icon: "calendar",
          requires: "mentee:view_progress",
          mobileOrder: 2,
        },
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // Admin
  // -------------------------------------------------------------------------
  admin: [
    {
      heading: null,
      items: [
        {
          href: "/admin",
          label: "Overview",
          short: "Home",
          icon: "home",
          exact: true,
          mobileOrder: 1,
        },
        {
          href: "/admin/users",
          label: "Users & roles",
          short: "Users",
          icon: "users",
          requires: "user:view",
          mobileOrder: 2,
        },
        {
          href: "/admin/review",
          label: "Content review",
          short: "Review",
          icon: "check",
          requires: "course:approve",
          mobileOrder: 3,
        },
        {
          href: "/admin/grading",
          label: "Grading queue",
          short: "Grade",
          icon: "clipboard",
          requires: "submission:grade",
        },
      ],
    },
    {
      heading: "Operations",
      items: [
        {
          href: "/admin/finance",
          label: "Finance",
          short: "Finance",
          // Matches the page's own guard. It was `payment:view`, which every
          // member holds for their own billing, so the row advertised a
          // destination that redirects straight back out.
          icon: "wallet",
          requires: "commission:approve",
          mobileOrder: 4,
        },
        {
          href: "/admin/moderation",
          label: "Moderation",
          short: "Mod",
          icon: "shield",
          requires: "report:review",
          mobileOrder: 5,
        },
        {
          href: "/admin/support",
          label: "Support desk",
          short: "Support",
          icon: "lifebuoy",
          requires: "ticket:respond",
        },
        {
          href: "/admin/certificates",
          label: "Certificates",
          short: "Certs",
          icon: "award",
          requires: "certificate:issue_manual",
        },
        {
          href: "/admin/seasons",
          label: "Seasons & prizes",
          short: "Seasons",
          icon: "trophy",
          requires: "settings:manage",
        },
      ],
    },
    {
      heading: "Platform",
      items: [
        {
          href: "/admin/flags",
          label: "Feature flags",
          short: "Flags",
          icon: "toggle",
          requires: "feature_flag:manage",
        },
        {
          href: "/admin/organisations",
          label: "Organisations",
          short: "Orgs",
          icon: "building",
          requires: "user:view",
        },
        {
          href: "/admin/audit",
          label: "Audit log",
          short: "Audit",
          icon: "scroll",
          requires: "audit:view",
        },
      ],
    },
  ],
};

/** Flattened, for title lookups and mobile ordering. */
export function itemsFor(workspace: Workspace): NavItem[] {
  return NAV[workspace].flatMap((section) => section.items);
}

/**
 * Titles for pages that are reachable but deliberately absent from the sidebar
 * — Search lives behind the header icon, Forbidden is a refusal page. Without
 * these the header fell back to the workspace name and showed "Learn" above a
 * search results list.
 */
const EXTRA_TITLES: { href: string; label: string }[] = [
  { href: "/dashboard/search", label: "Search" },
];

/**
 * The page title shown in the sticky header. Longest matching href wins, so
 * `/dashboard/courses` beats `/dashboard` without needing an explicit order.
 */
export function titleFor(workspace: Workspace, pathname: string): string {
  const candidates: { href: string; label: string; exact?: boolean }[] = [
    ...itemsFor(workspace),
    ...EXTRA_TITLES,
  ];

  let best: { href: string; label: string } | undefined;
  for (const item of candidates) {
    const hit = item.exact ? pathname === item.href : pathname.startsWith(item.href);
    if (hit && (!best || item.href.length > best.href.length)) best = item;
  }
  return best?.label ?? WORKSPACE_LABELS[workspace];
}

export function isActive(item: NavItem, pathname: string): boolean {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}
