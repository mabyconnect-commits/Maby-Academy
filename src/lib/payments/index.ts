import { FlutterwaveProvider } from "./flutterwave";
import { PaymentError, type PaymentProvider } from "./types";

export * from "./types";

/**
 * Provider registry.
 *
 * Adding Paystack or Stripe later means implementing PaymentProvider and
 * adding it here — nothing above this module changes.
 */
const providers: Record<string, PaymentProvider> = {
  flutterwave: new FlutterwaveProvider(),
};

/** The provider new checkouts use. */
export const DEFAULT_PROVIDER = "flutterwave";

export function getProvider(name: string = DEFAULT_PROVIDER): PaymentProvider {
  const provider = providers[name];
  if (!provider) {
    throw new PaymentError(`Unknown payment provider "${name}".`, 500);
  }
  return provider;
}

/**
 * Whether paid checkout can run at all.
 *
 * Used to degrade gracefully: with no credentials the academy still works,
 * paid courses simply cannot be bought rather than throwing at the payer.
 */
export function paymentsEnabled(name: string = DEFAULT_PROVIDER): boolean {
  try {
    return getProvider(name).isConfigured();
  } catch {
    return false;
  }
}

export function supportedCurrencies(
  name: string = DEFAULT_PROVIDER,
): readonly string[] {
  try {
    return getProvider(name).currencies;
  } catch {
    return [];
  }
}
