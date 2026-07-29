import { NextResponse } from "next/server";
import { getProvider } from "@/lib/payments";
import { fulfilOrder } from "@/server/services/checkout";
import { audit } from "@/server/services/notifications";

/**
 * Flutterwave webhook.
 *
 * Public and unauthenticated by necessity, so it assumes hostility:
 *
 *  - The signature is checked before anything in the body is believed.
 *  - The body is mined only for a reference; the amount and status it claims
 *    are ignored in favour of an authoritative call back to Flutterwave.
 *  - Fulfilment is idempotent, because retries are normal, not exceptional.
 *  - A 200 is returned once the event is understood, even if the payment
 *    failed — a non-2xx tells Flutterwave to retry, and retrying a genuinely
 *    failed payment achieves nothing but noise.
 */
export async function POST(request: Request) {
  const provider = getProvider("flutterwave");

  // Read the body as text: a signature must be checked against exactly the
  // bytes that were sent, not a re-serialised object.
  const rawBody = await request.text();

  const verification = provider.verifyWebhook(rawBody, request.headers);
  if (!verification.valid) {
    console.warn("[webhook:flutterwave] rejected:", verification.reason);
    // 401, not 400: this is an authentication failure, and it should not be
    // retried. Never echo the reason back to the caller.
    return NextResponse.json({ received: false }, { status: 401 });
  }

  const reference = verification.reference;
  if (!reference) {
    await audit({
      action: "webhook.flutterwave.no_reference",
      metadata: { providerRef: verification.providerRef },
    });
    return NextResponse.json({ received: true, ignored: true });
  }

  try {
    const result = await fulfilOrder(reference);

    if (!result.ok) {
      await audit({
        action: "webhook.flutterwave.not_fulfilled",
        entityType: "Order",
        entityId: "order" in result ? result.order?.id : undefined,
        metadata: { reference, reason: result.reason },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    // Something on our side broke. Return 500 so Flutterwave retries — this
    // is the one case where a retry genuinely helps.
    console.error("[webhook:flutterwave] fulfilment error:", error);
    return NextResponse.json({ received: false }, { status: 500 });
  }
}

/** Flutterwave pings the URL when you save it in the dashboard. */
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "flutterwave-webhook" });
}
