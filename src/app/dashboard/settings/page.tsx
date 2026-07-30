import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireUser, SESSION_COOKIE } from "@/lib/auth/session";
import { db } from "@/lib/db";
import {
  listSessions,
  recentSecurityActivity,
} from "@/server/services/security";
import { Button, Card, PanelHead, SectionHeading } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { logoutAction } from "@/server/actions/auth";
import { ProfileForm } from "./ProfileForm";
import { PasswordForm } from "./PasswordForm";
import { SessionList } from "./SessionList";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const sessionUser = await requireUser();

  const [profile, sessions] = await Promise.all([
    db.user.findUniqueOrThrow({
      where: { id: sessionUser.id },
      select: {
        name: true,
        email: true,
        bio: true,
        country: true,
        timezone: true,
        createdAt: true,
        emailVerifiedAt: true,
        referralCode: true,
        referredBy: { select: { name: true } },
      },
    }),
    (async () => {
      const store = await cookies();
      return listSessions(sessionUser.id, store.get(SESSION_COOKIE)?.value);
    })(),
  ]);

  const activity = await recentSecurityActivity(sessionUser.id, 8);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Your account, your profile, and where you&apos;re signed in.
        </p>
      </header>

      {/* Account summary -------------------------------------------------- */}
      <Card>
        <SectionHeading title="Account" />
        <dl className="space-y-3 text-sm">
          <Row label="Email" value={profile.email} />
          <Row
            label="Email verified"
            value={
              profile.emailVerifiedAt
                ? formatDate(profile.emailVerifiedAt)
                : "Not verified"
            }
          />
          <Row label="Member since" value={formatDate(profile.createdAt)} />
          <Row label="Your referral code" value={profile.referralCode} mono />
          {profile.referredBy && (
            <Row label="Invited by" value={profile.referredBy.name} />
          )}
        </dl>
      </Card>

      {/* Profile ---------------------------------------------------------- */}
      <Card>
        <SectionHeading
          title="Profile"
          subtitle="This is what other members see on the leaderboard and in reviews."
        />
        <ProfileForm
          defaults={{
            name: profile.name,
            bio: profile.bio ?? "",
            country: profile.country ?? "",
            timezone: profile.timezone,
          }}
        />
      </Card>

      {/* Password --------------------------------------------------------- */}
      <Card>
        <SectionHeading
          title="Password"
          subtitle="Changing your password signs you out on every device, including this one."
        />
        <PasswordForm />
      </Card>

      {/* Sessions --------------------------------------------------------- */}
      <Card>
        <SectionHeading
          title="Where you're signed in"
          subtitle="Every device holding a live session. Sign out anything you don't recognise."
        />
        <SessionList sessions={sessions} />
      </Card>

      {/* Security activity ------------------------------------------------ */}
      <Card>
        <SectionHeading
          title="Recent security activity"
          subtitle="Sign-ins and credential changes on your account."
        />
        {activity.length === 0 ? (
          <p className="text-sm text-mist-400">Nothing recorded yet.</p>
        ) : (
          <ul className="space-y-2.5">
            {activity.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-800 pb-2.5 last:border-0 last:pb-0"
              >
                <span className="text-sm text-mist-200">
                  {SECURITY_LABELS[entry.action] ?? entry.action}
                </span>
                <span className="text-xs text-mist-400">
                  {entry.ipAddress ? `${entry.ipAddress} · ` : ""}
                  {formatDate(entry.createdAt, true)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Sign out lives here as well as in the header menu. Settings is where
          people look for it, and it must be reachable at every screen size —
          it was previously only in the desktop sidebar, which meant there was
          no way to sign out on a phone at all. */}
      <Card>
        <PanelHead title="Sign out" className="mb-2" />
        <p className="text-[11.5px] leading-[1.65] text-mist-400">
          Signs out this device only. To sign out everywhere — after losing a
          device, or if you suspect someone else has access — use sign-out
          everywhere in the sessions list above, and change your password.
        </p>
        <form action={logoutAction} className="mt-4">
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </Card>
    </div>
  );
}

const SECURITY_LABELS: Record<string, string> = {
  "user.login": "Signed in",
  "user.register": "Account created",
  "user.password_change": "Password changed",
  "user.password_reset": "Password reset",
  "session.revoked": "A device was signed out",
  "session.revoked_others": "All other devices signed out",
};

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-ink-800 pb-3 last:border-0 last:pb-0">
      <dt className="text-mist-400">{label}</dt>
      <dd className={`text-mist-100 text-right ${mono ? "font-mono" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
