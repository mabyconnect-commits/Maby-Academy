import { timingSafeEqual } from "node:crypto";
import {
  PaymentError,
  toMajorUnits,
  toMinorUnits,
  type CheckoutRequest,
  type CheckoutSession,
  type PaymentProvider,
  type VerificationResult,
  type VerificationStatus,
  type WebhookVerification,
} from "./types";

/**
 * Flutterwave (v3 Standard checkout).
 *
 * Flow:
 *   1. POST /payments → a hosted payment link, payer is redirected there
 *   2. Payer completes on Flutterwave's page
 *   3. Flutterwave calls our webhook AND redirects the payer back
 *   4. We call GET /transactions/verify_by_reference — the only source of truth
 *
 * Neither the redirect nor the webhook body is trusted on its own. The
 * redirect is attacker-controllable (it is just a URL in the payer's browser),
 * and a webhook body proves only that someone knew our endpoint. Both are
 * treated purely as a signal to go and ask Flutterwave what happened.
 */

const API_BASE = "https://api.flutterwave.com/v3";

/** Currencies Flutterwave settles. Order currency is checked against this. */
const CURRENCIES = [
  "NGN",
  "USD",
  "GHS",
  "KES",
  "ZAR",
  "UGX",
  "TZS",
  "RWF",
  "ZMW",
  "XAF",
  "XOF",
  "EUR",
  "GBP",
] as const;

type FlutterwaveEnvelope<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

type FlutterwaveTransaction = {
  id: number;
  tx_ref: string;
  flw_ref: string;
  amount: number;
  currency: string;
  charged_amount: number;
  status: string;
  created_at: string;
};

function mapStatus(raw: string): VerificationStatus {
  switch (raw?.toLowerCase()) {
    case "successful":
      return "SUCCESSFUL";
    case "pending":
      return "PENDING";
    case "cancelled":
      return "CANCELLED";
    case "failed":
      return "FAILED";
    default:
      return "FAILED";
  }
}

export class FlutterwaveProvider implements PaymentProvider {
  readonly name = "flutterwave";
  readonly currencies = CURRENCIES;

  private readonly secretKey = process.env.FLUTTERWAVE_SECRET_KEY ?? "";
  private readonly secretHash = process.env.FLUTTERWAVE_SECRET_HASH ?? "";

  isConfigured() {
    return this.secretKey.length > 0;
  }

  private assertConfigured() {
    if (!this.isConfigured()) {
      throw new PaymentError(
        "Payments are not configured. Set FLUTTERWAVE_SECRET_KEY.",
        503,
      );
    }
  }

  private async call<T>(
    path: string,
    init?: RequestInit,
  ): Promise<FlutterwaveEnvelope<T>> {
    this.assertConfigured();

    let response: Response;
    try {
      response = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
          ...(init?.headers ?? {}),
        },
        // Never let a hung gateway hold a request open indefinitely.
        signal: AbortSignal.timeout(20_000),
        cache: "no-store",
      });
    } catch (error) {
      throw new PaymentError(
        "Could not reach the payment provider. Please try again.",
        504,
        error,
      );
    }

    const text = await response.text();
    let body: FlutterwaveEnvelope<T>;
    try {
      body = JSON.parse(text);
    } catch {
      throw new PaymentError(
        `Payment provider returned an unreadable response (${response.status}).`,
        502,
      );
    }

    if (!response.ok || body.status !== "success") {
      throw new PaymentError(
        body?.message || `Payment provider error (${response.status}).`,
        response.status >= 500 ? 502 : 400,
      );
    }

    return body;
  }

  async createCheckout(request: CheckoutRequest): Promise<CheckoutSession> {
    const currency = request.currency.toUpperCase();
    if (!this.currencies.includes(currency as (typeof CURRENCIES)[number])) {
      throw new PaymentError(
        `${currency} is not supported by this payment provider.`,
        400,
      );
    }
    if (request.amountMinor <= 0) {
      throw new PaymentError("Payment amount must be greater than zero.", 400);
    }

    const body = await this.call<{ link: string }>("/payments", {
      method: "POST",
      body: JSON.stringify({
        tx_ref: request.reference,
        amount: toMajorUnits(request.amountMinor),
        currency,
        redirect_url: request.redirectUrl,
        customer: {
          email: request.customer.email,
          name: request.customer.name,
          ...(request.customer.phone
            ? { phonenumber: request.customer.phone }
            : {}),
        },
        customizations: {
          title: "Maby Academy",
          description: request.description.slice(0, 120),
        },
        meta: request.metadata ?? {},
      }),
    });

    if (!body.data?.link) {
      throw new PaymentError("Payment provider did not return a checkout link.");
    }

    return { paymentUrl: body.data.link, providerRef: null };
  }

  /**
   * Verify by our own reference rather than the provider's transaction id.
   *
   * The transaction id only reaches us through the redirect or the webhook —
   * both attacker-influenced. Our reference comes from our own database, so
   * looking up by it removes a whole class of substitution attack.
   */
  async verify(reference: string): Promise<VerificationResult> {
    let body: FlutterwaveEnvelope<FlutterwaveTransaction>;

    try {
      body = await this.call<FlutterwaveTransaction>(
        `/transactions/verify_by_reference?tx_ref=${encodeURIComponent(reference)}`,
      );
    } catch (error) {
      // A 400 from this endpoint means "no such transaction", which is a
      // legitimate answer rather than an outage.
      if (error instanceof PaymentError && error.status === 400) {
        return {
          status: "NOT_FOUND",
          reference,
          providerRef: null,
          amountMinor: null,
          currency: null,
          paidAt: null,
          message: error.message,
        };
      }
      throw error;
    }

    const tx = body.data;
    return {
      status: mapStatus(tx.status),
      reference: tx.tx_ref,
      providerRef: String(tx.id),
      // `charged_amount` includes fees the payer covered; `amount` is what the
      // order was for, which is what must match.
      amountMinor: toMinorUnits(tx.amount),
      currency: tx.currency?.toUpperCase() ?? null,
      paidAt: tx.created_at ? new Date(tx.created_at) : null,
      message: body.message,
    };
  }

  /**
   * Flutterwave signs webhooks with a shared secret echoed in `verif-hash`.
   *
   * Compared in constant time: a plain `===` on a secret leaks its prefix
   * through timing, and this endpoint is public and unauthenticated.
   */
  verifyWebhook(rawBody: string, headers: Headers): WebhookVerification {
    if (!this.secretHash) {
      return {
        valid: false,
        reason: "FLUTTERWAVE_SECRET_HASH is not set — webhooks cannot be trusted.",
      };
    }

    const provided = headers.get("verif-hash") ?? "";
    if (!provided) {
      return { valid: false, reason: "Missing verif-hash header." };
    }

    const a = Buffer.from(provided);
    const b = Buffer.from(this.secretHash);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { valid: false, reason: "Signature mismatch." };
    }

    // The body is only mined for identifiers; the amount and status it claims
    // are ignored in favour of an authoritative verify() call.
    try {
      const parsed = JSON.parse(rawBody) as {
        data?: { tx_ref?: string; id?: number | string };
        txRef?: string;
      };
      return {
        valid: true,
        reference: parsed.data?.tx_ref ?? parsed.txRef ?? null,
        providerRef:
          parsed.data?.id !== undefined ? String(parsed.data.id) : null,
      };
    } catch {
      return { valid: false, reason: "Webhook body was not valid JSON." };
    }
  }
}
