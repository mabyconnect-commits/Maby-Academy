import Link from "next/link";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { fulfilOrder, getOrderByReference } from "@/server/services/checkout";
import { Card, LinkButton, Pill } from "@/components/ui";
import { formatMoney } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Payment",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * Where Flutterwave returns the payer.
 *
 * The query string is attacker-controllable — anyone can visit this URL with
 * `status=successful`. It is treated purely as a hint that a payment *may*
 * have completed; `fulfilOrder` re-verifies with Flutterwave before granting
 * anything, and the webhook remains the reliable path.
 */
export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ tx_ref?: string; status?: string }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();
  const reference = params.tx_ref;

  if (!reference) {
    return (
      <Shell icon="?" tone="neutral" title="No payment reference">
        <p className="text-mist-300">
          We couldn&apos;t tell which payment this was. If money left your
          account, it is safe — open a support ticket and we&apos;ll sort it
          out.
        </p>
        <Actions />
      </Shell>
    );
  }

  const result = await fulfilOrder(reference);
  const order = await getOrderByReference(reference, user?.id);

  if (result.ok) {
    return (
      <Shell icon="✓" tone="growth" title="Payment confirmed">
        <p className="text-mist-300">
          You&apos;re enrolled
          {order?.course ? ` in ${order.course.title}` : ""}. Your seat is
          confirmed and a receipt is in your account.
        </p>
        {order && (
          <p className="mt-3 text-sm text-mist-400">
            {formatMoney(order.amountMinor, order.currency)} · reference{" "}
            <span className="font-mono text-xs">{reference}</span>
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {order?.course && (
            <LinkButton href={`/courses/${order.course.slug}`} size="lg">
              Start the course
            </LinkButton>
          )}
          <LinkButton href="/dashboard" variant="secondary" size="lg">
            My dashboard
          </LinkButton>
        </div>
      </Shell>
    );
  }

  if (result.reason === "pending") {
    return (
      <Shell icon="⏳" tone="gold" title="Payment is still processing">
        <p className="text-mist-300">
          Your bank hasn&apos;t confirmed this yet. Some methods take a few
          minutes. You don&apos;t need to pay again — we&apos;ll enrol you and
          send a notification the moment it clears.
        </p>
        <p className="mt-3 text-sm text-mist-400">
          Reference <span className="font-mono text-xs">{reference}</span>
        </p>
        <Actions />
      </Shell>
    );
  }

  if (result.reason === "amount_mismatch") {
    return (
      <Shell icon="⚠" tone="flag" title="Payment amount didn't match">
        <p className="text-mist-300">
          The amount received doesn&apos;t match the price of this course, so we
          haven&apos;t enrolled you. Nothing further has been taken. Open a
          support ticket with the reference below and we&apos;ll resolve it.
        </p>
        <p className="mt-3 text-sm text-mist-400">
          Reference <span className="font-mono text-xs">{reference}</span>
        </p>
        <Actions />
      </Shell>
    );
  }

  return (
    <Shell icon="✕" tone="flag" title="Payment not completed">
      <p className="text-mist-300">
        This payment didn&apos;t go through, so you haven&apos;t been charged
        for a course you can&apos;t access. You can try again whenever
        you&apos;re ready.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {order?.course && (
          <LinkButton href={`/courses/${order.course.slug}`} size="lg">
            Try again
          </LinkButton>
        )}
        <LinkButton href="/courses" variant="secondary" size="lg">
          Browse courses
        </LinkButton>
      </div>
    </Shell>
  );
}

function Shell({
  icon,
  tone,
  title,
  children,
}: {
  icon: string;
  tone: "growth" | "gold" | "flag" | "neutral";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="text-5xl mb-4" aria-hidden>
        {icon}
      </div>
      <Pill tone={tone}>{title}</Pill>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight">{title}</h1>
      <Card className="mt-6 text-left sm:text-center">{children}</Card>
    </div>
  );
}

function Actions() {
  return (
    <div className="mt-8 flex flex-wrap gap-3 justify-center">
      <LinkButton href="/dashboard" size="lg">
        My dashboard
      </LinkButton>
      <Link
        href="/legal/risk-disclosure"
        className="self-center text-sm text-mist-400 hover:text-mist-200"
      >
        Need help?
      </Link>
    </div>
  );
}
