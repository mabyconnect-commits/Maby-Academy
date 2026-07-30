# Payments — Flutterwave

## Why Flutterwave

The academy's audience is concentrated in Nigeria, Ghana and Kenya.
Flutterwave settles in NGN, GHS, KES, ZAR and USD, and accepts the methods
those members actually use — card, bank transfer, USSD and mobile money —
rather than assuming everyone has an international card.

Nothing above `src/lib/payments` names a provider. Adding Paystack or Stripe
later means implementing the `PaymentProvider` interface and registering it.

## Setup

### 1. Get your keys

Flutterwave dashboard → **Settings → API Keys**.

Use **test keys** (`FLWSECK_TEST-…`) until you are ready to take real money.

### 2. Set a webhook secret hash

Dashboard → **Settings → Webhooks**:

- **URL**: `https://mabyacademy.online/api/webhooks/flutterwave`
- **Secret hash**: any long random string — generate one with
  `openssl rand -hex 32`

The same value goes into `FLUTTERWAVE_SECRET_HASH`. Every webhook is rejected
unless its `verif-hash` header matches, so **if this is blank no webhook is
ever trusted** and enrolments will rely solely on the payer returning to the
site.

### 3. Environment variables

```
FLUTTERWAVE_SECRET_KEY    FLWSECK_TEST-xxxxxxxx
FLUTTERWAVE_SECRET_HASH   <the same string you set in the dashboard>
FLUTTERWAVE_PUBLIC_KEY    FLWPUBK_TEST-xxxxxxxx   (not required yet)
```

Without these the academy still runs. Paid courses simply cannot be bought,
and the enrol button says so instead of throwing at the payer.

### 4. Test it

Flutterwave's test cards are in their documentation. Buy a paid course, and
check that:

- the order moves `PENDING → PAID`
- an enrolment appears
- an invoice is created
- the webhook shows a 200 in the Flutterwave dashboard

## How the flow works

```
  Student clicks "Pay ₦14,900"
      ↓
  startCourseCheckout()   creates/reuses a PENDING order, mints a reference
      ↓
  Flutterwave hosted checkout page
      ↓
  ┌─────────────────────────┬──────────────────────────┐
  │  Webhook → our endpoint │  Payer redirected back   │
  └───────────┬─────────────┴────────────┬─────────────┘
              └──────────┬───────────────┘
                         ↓
                   fulfilOrder()
                         ↓
          GET /transactions/verify_by_reference   ← the only source of truth
                         ↓
        order PAID + enrolment + invoice + notification   (one transaction)
```

## The security decisions, and why

**Neither the redirect nor the webhook is believed.** The redirect is just a
URL in the payer's browser — anyone can visit `/checkout/return?status=successful`.
A webhook body proves only that someone found the endpoint. Both are treated
as a *hint* to go and ask Flutterwave what actually happened.

**Verification is by our reference, not their transaction id.** The
transaction id only ever reaches us through those two attacker-influenced
channels. Our reference comes from our own database, which removes a class of
substitution attack where an attacker points us at someone else's real payment.

**The signature is compared in constant time.** A plain `===` on a secret leaks
its prefix through timing, and this endpoint is public.

**Amount and currency are re-checked.** Underpayment never grants access. A
mismatch is written to the audit log rather than silently ignored, so support
can see exactly what happened.

**Fulfilment is idempotent and transactional.** Flutterwave retries webhooks;
a payer may also land on the return page. The order status is re-read *inside*
the transaction, so two simultaneous webhooks cannot both enrol.

**Free enrolment refuses paid courses outright.** `enrollUser` throws 402 for
anything priced above zero. Previously it created a `PAID` order directly,
which was harmless with no gateway and would be a way to give away paid
courses now that there is one.

**A 200 is returned for failed payments.** A non-2xx tells Flutterwave to
retry, and retrying a genuinely declined card achieves nothing. Only *our*
errors return 500, because those are the ones where a retry helps.

## Referral commissions

Commissions are gated behind the `referral_commissions` feature flag, which is
**off by default**. Orders fulfil normally; nobody accrues a payout until the
flag is switched on.

This is deliberate. Multi-level commissions carry real regulatory exposure and
must be tied to genuine product purchases, never recruitment. Turn the flag on
only after the compliance review recorded in `docs/ROADMAP.md`, and re-check
the commission-liability warning on the finance dashboard afterwards.

## Not yet built

| Item | Note |
| --- | --- |
| Refunds through the API | The model and finance UI exist; the provider call does not |
| Subscriptions / recurring | Flutterwave payment plans |
| Coupons at checkout | Model exists, not applied to the order total |
| Saved cards | Tokenised charges |
| Reconciliation report | Matching settlements to orders |
| Multi-currency FX | Prices are set per course; no conversion |
