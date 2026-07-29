import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Card, Pill } from "@/components/ui";
import { LEGAL_PAGES, type LegalPage } from "@/content/legal";

/**
 * `satisfies` on the catalogue keeps exact key inference for the slugs, but
 * narrows each entry to its own literal shape — so optional fields vanish
 * from the union. Widen back to the declared type on lookup.
 */
function findPage(slug: string): LegalPage | undefined {
  return (LEGAL_PAGES as Record<string, LegalPage>)[slug];
}

export function generateStaticParams() {
  return Object.keys(LEGAL_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  return page
    ? { title: page.title, description: page.summary }
    : { title: "Not found" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {page.isCritical && <Pill tone="flag">Read this carefully</Pill>}

      <h1 className="mt-5 text-4xl font-semibold tracking-tight">
        {page.title}
      </h1>
      <p className="mt-3 text-lg text-mist-300 leading-relaxed">
        {page.summary}
      </p>
      <p className="mt-3 text-xs text-mist-400">
        Last updated {page.updated}
      </p>

      <div className="mt-10 space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-mist-100">
              {section.heading}
            </h2>
            <div className="mt-3 prose-lesson">
              {section.body.map((paragraph, i) =>
                paragraph.startsWith("- ") ? (
                  <ul key={i} className="list-disc pl-5 space-y-1.5">
                    {paragraph.split("\n").map((item, j) => (
                      <li key={j}>{item.replace(/^-\s*/, "")}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{paragraph}</p>
                ),
              )}
            </div>
          </section>
        ))}
      </div>

      <Card className="mt-12">
        <h2 className="text-sm font-semibold text-mist-100">
          Other policies
        </h2>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2">
          {Object.entries(LEGAL_PAGES)
            .filter(([key]) => key !== slug)
            .map(([key, other]) => (
              <li key={key}>
                <Link
                  href={`/legal/${key}`}
                  className="text-sm text-gold-400 hover:text-gold-300"
                >
                  {other.title} →
                </Link>
              </li>
            ))}
        </ul>
      </Card>
    </div>
  );
}
