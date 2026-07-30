import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { Card, PanelHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Organisations",
  robots: { index: false, follow: false },
};

export default async function AdminOrganisationsPage() {
  await guardPermission("user:view", "Organisations");

  return (
    <div className="max-w-2xl">
      <Card pad="wide">
        <PanelHead title="Not built yet" className="mb-2" />
        <p className="text-[11.5px] leading-[1.7] text-mist-400">
          Organisation accounts — seat management, bulk enrolment and an
          org-admin who manages seats without seeing member coursework — are
          specified in the blueprint as phase 9 work and depend on a schema that
          does not exist yet.
        </p>
        <p className="mt-3 text-[11.5px] leading-[1.7] text-mist-400">
          This page exists so the navigation does not link to a 404. It is
          labelled honestly rather than mocked up with placeholder rows, because
          a screen that looks finished is how unbuilt features get forgotten.
        </p>
      </Card>
    </div>
  );
}
