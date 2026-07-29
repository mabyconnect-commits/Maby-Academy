import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { Card, Pill, SectionHeading } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { ProfileForm } from "./ProfileForm";
import { PasswordForm } from "./PasswordForm";

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
    db.session.findMany({
      where: { userId: sessionUser.id },
      orderBy: { lastActivityAt: "desc" },
      take: 10,
      select: {
        id: true,
        ipAddress: true,
        userAgent: true,
        createdAt: true,
        expiresAt: true,
      },
    }),
  ]);

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
          title="Active sessions"
          subtitle="Devices currently signed in to your account."
        />
        <ul className="space-y-2.5">
          {sessions.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-800 pb-2.5 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="text-sm text-mist-200 truncate max-w-md">
                  {s.userAgent ?? "Unknown device"}
                </p>
                <p className="text-xs text-mist-400">
                  {s.ipAddress ?? "unknown IP"} · started{" "}
                  {formatDate(s.createdAt, true)}
                </p>
              </div>
              <Pill tone={s.expiresAt > new Date() ? "growth" : "neutral"}>
                {s.expiresAt > new Date() ? "Active" : "Expired"}
              </Pill>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

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
