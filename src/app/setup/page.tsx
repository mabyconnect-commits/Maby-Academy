import type { Metadata } from "next";
import { Logo } from "@/components/Brand";

export const metadata: Metadata = {
  title: "Setup required",
  robots: { index: false, follow: false },
};

/**
 * Shown when DATABASE_URL is absent. Deliberately self-contained: it touches
 * no database, no session and no service — it has to render on a deployment
 * where none of those exist.
 */
export default function SetupPage() {
  const steps = [
    {
      n: "01",
      title: "Add a database from your Vercel project",
      body: "Open the Storage tab → Create Database → Neon (Serverless Postgres). Pick a region near your students — Frankfurt is the closest for West and East Africa. Connect it to this project.",
    },
    {
      n: "02",
      title: "Let Vercel inject the connection",
      body: "The integration adds the connection variables to your project automatically. This app accepts whichever names Vercel uses, so there is nothing to copy by hand.",
    },
    {
      n: "03",
      title: "Add SESSION_SECRET yourself",
      body: "This is the only value you must set manually: 32+ random characters that sign login sessions. It has to stay the same across deploys, so it cannot be generated automatically — a changing secret would sign everyone out at random.",
    },
    {
      n: "04",
      title: "Redeploy",
      body: "Deployments → Redeploy. The build creates every table automatically, and this page disappears on its own.",
    },
  ];

  const vars = [
    {
      name: "SESSION_SECRET",
      required: true,
      note: "Set this by hand — 32+ random characters that sign login sessions",
    },
    {
      name: "DATABASE_URL",
      required: false,
      note: "Provided by the Vercel Postgres/Neon integration. POSTGRES_PRISMA_URL and POSTGRES_URL are also accepted.",
    },
    {
      name: "DIRECT_DATABASE_URL",
      required: false,
      note: "Unpooled URL for migrations. DATABASE_URL_UNPOOLED and POSTGRES_URL_NON_POOLING also accepted; falls back to the pooled URL.",
    },
    {
      name: "NEXT_PUBLIC_APP_URL",
      required: false,
      note: "Defaults to your Vercel domain. Set it to your real domain before issuing certificates — the verification links are permanent.",
    },
  ];

  return (
    <main id="main" className="min-h-screen px-5 py-16">
      <div className="mx-auto max-w-2xl">
        <Logo />

        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold-600/40 bg-gold-500/12 px-3 py-1 text-xs font-medium text-gold-300">
          Deployment live · configuration needed
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight leading-tight">
          Maby Academy is deployed.
          <br />
          <span className="text-gradient-gold">It just needs a database.</span>
        </h1>

        <p className="mt-5 text-mist-300 leading-relaxed">
          Your hosting is working and the application built successfully —
          you&apos;re seeing this page served from it right now. The academy
          stores courses, students, progress and certificates in a Postgres
          database, and no connection has been configured yet.
        </p>

        <p className="mt-4 text-sm text-mist-400 leading-relaxed">
          The quickest route is Vercel&apos;s built-in Neon integration: it
          provisions the database and wires the credentials in for you. The
          only value you have to enter yourself is{" "}
          <code className="text-gold-400">SESSION_SECRET</code>.
        </p>

        {/* Steps ------------------------------------------------------- */}
        <ol className="mt-10 space-y-3">
          {steps.map((s) => (
            <li key={s.n} className="surface p-5 flex gap-4">
              <span className="font-mono text-sm font-semibold text-gold-500 shrink-0">
                {s.n}
              </span>
              <div>
                <h2 className="font-semibold text-mist-100">{s.title}</h2>
                <p className="mt-1.5 text-sm text-mist-400 leading-relaxed">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Variable reference ------------------------------------------ */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-mist-100">
            Environment variables
          </h2>
          <div className="mt-4 surface p-0 overflow-x-auto">
            <table className="w-full text-sm min-w-[440px]">
              <thead>
                <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wide text-mist-400">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Required</th>
                  <th className="px-4 py-3 font-medium">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800">
                {vars.map((v) => (
                  <tr key={v.name}>
                    <td className="px-4 py-3 font-mono text-xs text-gold-300 whitespace-nowrap">
                      {v.name}
                    </td>
                    <td className="px-4 py-3">
                      {v.required ? (
                        <span className="text-flag-400">yes</span>
                      ) : (
                        <span className="text-mist-400">optional</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-mist-400">{v.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-8 text-sm text-mist-400 leading-relaxed">
          Full instructions, including connecting a custom domain and creating
          your first admin account, are in{" "}
          <code className="text-gold-400">DEPLOYMENT.md</code> in the
          repository.
        </p>

        <p className="mt-10 pt-6 border-t border-ink-800 text-xs text-mist-400">
          This page is only visible while the database is unconfigured. It
          disappears on its own once <code>DATABASE_URL</code> is set.
        </p>
      </div>
    </main>
  );
}
