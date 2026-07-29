/**
 * Payment provider abstraction.
 *
 * The academy sells in several currencies across regions where different
 * gateways win, so no provider name appears outside `src/lib/payments`.
 * Everything above this layer speaks in these types.
 */

export type Money = {
  /** Minor units — kobo, cents, pesewas. The database never stores decimals. */
  amountMinor: number;
  currency: string;
};

export type CheckoutRequest = Money & {
  /** Our order id. Sent to the provider and echoed back for reconciliation. */
  reference: string;
  customer: { email: string; name: string; phone?: string };
  description: string;
  /** Where the provider returns the payer once they are done. */
  redirectUrl: string;
  metadata?: Record<string, string>;
};

export type CheckoutSession = {
  /** URL to send the payer to. */
  paymentUrl: string;
  providerRef: string | null;
};

/**
 * Result of asking the provider what actually happened.
 *
 * `SUCCESSFUL` here means the provider confirmed settlement of the expected
 * amount and currency — not merely that the payer returned to our site.
 */
export type VerificationStatus =
  | "SUCCESSFUL"
  | "PENDING"
  | "FAILED"
  | "CANCELLED"
  | "NOT_FOUND";

export type VerificationResult = {
  status: VerificationStatus;
  reference: string | null;
  providerRef: string | null;
  amountMinor: number | null;
  currency: string | null;
  paidAt: Date | null;
  /** Provider-side message, for logs and support tickets. */
  message?: string;
};

export type WebhookVerification =
  | { valid: true; reference: string | null; providerRef: string | null }
  | { valid: false; reason: string };

export interface PaymentProvider {
  readonly name: string;
  /** Currencies this provider is configured to accept. */
  readonly currencies: readonly string[];
  /** False when credentials are absent, so checkout can degrade gracefully. */
  isConfigured(): boolean;
  createCheckout(request: CheckoutRequest): Promise<CheckoutSession>;
  /** Authoritative check. Always called server-side, never trusting a redirect. */
  verify(reference: string, providerRef?: string): Promise<VerificationResult>;
  /** Confirms a webhook really came from the provider. */
  verifyWebhook(rawBody: string, headers: Headers): WebhookVerification;
}

export class PaymentError extends Error {
  constructor(
    message: string,
    readonly status = 502,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "PaymentError";
  }
}

/** Providers quote in major units; we store minor. Keep the maths in one place. */
export function toMajorUnits(amountMinor: number): number {
  return Math.round(amountMinor) / 100;
}

export function toMinorUnits(amountMajor: number): number {
  return Math.round(amountMajor * 100);
}
