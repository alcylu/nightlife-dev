# Checkout regression checks

Backend dependency: nightlife-mcp Pro billing migration, Stripe configuration,
and `/billing/*` routes. Production stays unchanged until rollout approval.

Verified locally at 1440×1100 and 390×844, using mocked billing responses and
a synthetic local Supabase session (no real signup/payment):

- Signed out → create-account / sign-in CTA; correct US$19 monthly offer.
- Pricing source and Pro intent persist through signup/login links.
- Cancel return → Free status and retry button.
- Confirmed paid status → Pro confirmation and dashboard link.
- Cancelled subscription → new checkout allowed.
- Missing configuration / failed request → visible error, payment button disabled.
- No horizontal overflow on mobile. Terms and Free signup remain reachable.

After backend rollout, verify with a confirmed account: open Stripe checkout,
check USD 19/month and cancel back to this page. Do not submit a real card as a
test. Verify actual first-payment activation from Stripe's signed webhook and
the backend conversion report. Test fixtures cover application state changes;
they do not constitute a live Stripe payment test.
