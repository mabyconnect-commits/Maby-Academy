import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listFeatureFlags } from "@/server/services/admin";
import { Card, EmptyState, PanelHead } from "@/components/ui";
import { FlagToggle } from "./FlagToggle";

export const metadata: Metadata = {
  title: "Feature flags",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminFlagsPage() {
  const actor = await guardPermission("feature_flag:manage", "Feature flags");
  const flags = await listFeatureFlags(actor);

  if (flags.length === 0) {
    return (
      <EmptyState
        icon="toggle"
        title="No flags defined"
        description="Flags are seeded with the schema. Run the seed to create them."
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Card pad="wide">
        <PanelHead title="How these behave" className="mb-2" />
        <p className="text-[11.5px] leading-[1.7] text-mist-400">
          Flags <span className="font-bold text-mist-200">fail closed</span>: if
          the flag row is missing or the database is unreachable, the feature is
          off. That is the safe direction for every flag here — an accidental
          outage must not switch on referral commissions or token rewards.
        </p>
        <p className="mt-3 text-[11px] leading-[1.65] text-mist-400/80">
          Rate limiting is the deliberate exception elsewhere in the codebase: it
          fails <em>open</em>, because a limiter outage locking every member out
          of signing in would be worse than briefly unthrottled attempts.
        </p>
      </Card>

      <div className="grid gap-3.5 sm:grid-cols-2">
        {flags.map((f) => (
          <FlagToggle
            key={f.key}
            flagKey={f.key}
            isEnabled={f.isEnabled}
            description={f.description}
          />
        ))}
      </div>
    </div>
  );
}
