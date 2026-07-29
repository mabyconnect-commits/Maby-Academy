import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { FlutterwaveProvider } from "./flutterwave";
import { toMajorUnits, toMinorUnits } from "./types";

/**
 * The webhook endpoint is public and unauthenticated, so signature checking is
 * the only thing standing between an attacker and free enrolment. These tests
 * exist mainly to assert the rejections.
 */

const SECRET_HASH = "test-secret-hash-value";

function headersWith(hash?: string) {
  const h = new Headers();
  if (hash !== undefined) h.set("verif-hash", hash);
  return h;
}

const validBody = JSON.stringify({
  event: "charge.completed",
  data: { id: 998877, tx_ref: "MABY-ABC-123", status: "successful", amount: 149 },
});

describe("unit conversion", () => {
  it("converts minor to major and back without drift", () => {
    expect(toMajorUnits(14900)).toBe(149);
    expect(toMinorUnits(149)).toBe(14900);
    expect(toMinorUnits(toMajorUnits(2599))).toBe(2599);
  });

  it("handles amounts that would break naive float maths", () => {
    // 0.1 + 0.2 territory — the reason money is stored in minor units.
    expect(toMinorUnits(19.99)).toBe(1999);
    expect(toMinorUnits(0.07)).toBe(7);
    expect(toMajorUnits(1)).toBe(0.01);
  });
});

describe("webhook verification", () => {
  let provider: FlutterwaveProvider;

  beforeEach(() => {
    process.env.FLUTTERWAVE_SECRET_HASH = SECRET_HASH;
    process.env.FLUTTERWAVE_SECRET_KEY = "FLWSECK_TEST-abc";
    provider = new FlutterwaveProvider();
  });

  afterEach(() => {
    delete process.env.FLUTTERWAVE_SECRET_HASH;
    delete process.env.FLUTTERWAVE_SECRET_KEY;
  });

  it("accepts a correctly signed webhook and extracts the reference", () => {
    const result = provider.verifyWebhook(validBody, headersWith(SECRET_HASH));
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.reference).toBe("MABY-ABC-123");
      expect(result.providerRef).toBe("998877");
    }
  });

  it("rejects a wrong signature", () => {
    const result = provider.verifyWebhook(validBody, headersWith("wrong-hash"));
    expect(result.valid).toBe(false);
  });

  it("rejects a missing signature header", () => {
    const result = provider.verifyWebhook(validBody, headersWith());
    expect(result.valid).toBe(false);
  });

  it("rejects an empty signature", () => {
    expect(provider.verifyWebhook(validBody, headersWith("")).valid).toBe(false);
  });

  it("rejects a signature that is a prefix of the real one", () => {
    // Guards the constant-time comparison: a length-only or prefix match
    // must not pass.
    const result = provider.verifyWebhook(
      validBody,
      headersWith(SECRET_HASH.slice(0, -1)),
    );
    expect(result.valid).toBe(false);
  });

  it("rejects everything when no secret hash is configured", () => {
    delete process.env.FLUTTERWAVE_SECRET_HASH;
    const unconfigured = new FlutterwaveProvider();

    // Fails closed: without a shared secret, no webhook can be authenticated,
    // so none may be trusted — including one sending an empty hash.
    expect(unconfigured.verifyWebhook(validBody, headersWith("")).valid).toBe(
      false,
    );
    expect(
      unconfigured.verifyWebhook(validBody, headersWith(SECRET_HASH)).valid,
    ).toBe(false);
  });

  it("rejects a signed request whose body is not JSON", () => {
    const result = provider.verifyWebhook("not json", headersWith(SECRET_HASH));
    expect(result.valid).toBe(false);
  });

  it("accepts a signed body with no reference, reporting null", () => {
    const result = provider.verifyWebhook(
      JSON.stringify({ event: "ping" }),
      headersWith(SECRET_HASH),
    );
    expect(result.valid).toBe(true);
    if (result.valid) expect(result.reference).toBeNull();
  });
});

describe("configuration", () => {
  afterEach(() => {
    delete process.env.FLUTTERWAVE_SECRET_KEY;
  });

  it("reports unconfigured without a secret key", () => {
    delete process.env.FLUTTERWAVE_SECRET_KEY;
    expect(new FlutterwaveProvider().isConfigured()).toBe(false);
  });

  it("reports configured with a secret key", () => {
    process.env.FLUTTERWAVE_SECRET_KEY = "FLWSECK_TEST-abc";
    expect(new FlutterwaveProvider().isConfigured()).toBe(true);
  });

  it("rejects a currency it cannot settle before calling the API", async () => {
    process.env.FLUTTERWAVE_SECRET_KEY = "FLWSECK_TEST-abc";
    const provider = new FlutterwaveProvider();

    await expect(
      provider.createCheckout({
        reference: "MABY-X",
        amountMinor: 1000,
        currency: "JPY",
        customer: { email: "a@b.com", name: "A" },
        description: "Test",
        redirectUrl: "https://example.com/return",
      }),
    ).rejects.toThrow(/not supported/i);
  });

  it("rejects a zero or negative amount before calling the API", async () => {
    process.env.FLUTTERWAVE_SECRET_KEY = "FLWSECK_TEST-abc";
    const provider = new FlutterwaveProvider();

    await expect(
      provider.createCheckout({
        reference: "MABY-X",
        amountMinor: 0,
        currency: "NGN",
        customer: { email: "a@b.com", name: "A" },
        description: "Test",
        redirectUrl: "https://example.com/return",
      }),
    ).rejects.toThrow(/greater than zero/i);
  });

  it("covers the currencies the academy actually prices in", () => {
    const provider = new FlutterwaveProvider();
    for (const currency of ["NGN", "USD", "GHS", "KES", "ZAR"]) {
      expect(provider.currencies).toContain(currency);
    }
  });
});
