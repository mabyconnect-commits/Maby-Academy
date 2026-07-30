import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { needsOnboarding } from "@/server/services/onboarding";
import {
  completeOnboardingAction,
  skipOnboardingAction,
} from "@/server/actions/onboarding";
import { OnboardingWizard } from "./OnboardingWizard";

export const metadata: Metadata = {
  title: "Set up your path",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/onboarding");

  // Already answered: don't make someone re-run a wizard they finished. The
  // answers stay editable from Settings, which is the right place to change
  // them deliberately.
  if (!(await needsOnboarding(user.id))) redirect("/dashboard");

  return (
    <main id="main">
      <OnboardingWizard
        onSubmit={completeOnboardingAction}
        onSkip={skipOnboardingAction}
      />
    </main>
  );
}
