# nightlife-dev — Developer Landing Page + Dashboard

## Overview
Static marketing landing page + self-service API key dashboard for the nightlife MCP API product. Separate brand from the consumer site (nightlifetokyo.com).

- **Stack**: Astro 5 (static output), Tailwind CSS v4 (Vite plugin), astro-expressive-code, @supabase/supabase-js
- **Location**: `~/Apps/nightlife-dev/`
- **Domain**: nightlife.dev (Cloudflare DNS)
- **Deployment**: Docker (node:22-slim build → nginx:alpine serve) on Railway
- **Supabase**: Shared project `nqwyhdfwcaedtycojslb` (same as consumer site + MCP server)

## URLs
- **Production**: https://nightlife-dev-production.up.railway.app
- **GitHub**: https://github.com/alcylu/nightlife-dev (public)
- **Railway project**: nightlife-dev (ID: 0232c59f-d3ee-462f-a48c-c112ca6f25e4)
- **Service ID**: 7bb6f5dc-ef1a-4485-9715-0e127a604b2c

## Running
```bash
npm run dev      # → http://localhost:4321
npm run build    # → ./dist/
```

## Architecture
```
nightlife-dev/
├── astro.config.mjs      # Astro + Tailwind Vite plugin + expressive-code
├── tailwind.css           # Global styles, @theme with dark palette
├── Dockerfile             # Multi-stage: node:22-slim → nginx:alpine (port 8080)
├── nginx/nginx.conf       # Static serve, gzip, cache headers, /health endpoint
├── src/
│   ├── lib/supabase.ts    # Supabase client (anon key, public — RLS protects data)
│   ├── layouts/
│   │   ├── Base.astro     # Dark bg, Inter + JetBrains Mono fonts, OG meta
│   │   └── AuthPage.astro # Centered card layout for auth pages (noindex)
│   ├── pages/
│   │   ├── index.astro    # Landing page assembling all components
│   │   ├── signup.astro   # Email + password → supabase.auth.signUp()
│   │   ├── login.astro    # Email + password → signInWithPassword() → /dashboard
│   │   ├── forgot-password.astro # Email → resetPasswordForEmail() → check email
│   │   ├── reset-password.astro  # New password form → updateUser() → /dashboard
│   │   └── dashboard.astro # Key management + usage (auth-guarded, client-side JS)
│   ├── components/
│   │   ├── Header.astro   # Sticky nav, "Dashboard" link, "Get API Key" → /signup
│   │   ├── Hero.astro     # Headline, CTAs, terminal preview with sample JSON
│   │   ├── Tools.astro    # Section wrapper for 3 tool cards
│   │   ├── ToolCard.astro # Individual tool card with params + example JSON
│   │   ├── Connect.astro  # Tabbed code blocks (Claude Desktop, curl, TypeScript)
│   │   ├── UseCases.astro # 4 use case cards
│   │   ├── Pricing.astro  # 3-column pricing (Free/Pro/Enterprise), conditional target
│   │   ├── OpenSource.astro # GitHub CTA with MIT badge
│   │   └── Footer.astro   # Links + "Dashboard" + "Get API Key" → /signup
│   └── data/
│       ├── tools.ts       # Tool definitions for card rendering
│       ├── pricing.ts     # Pricing tier data (Free/Pro → /signup, Enterprise → mailto)
│       └── useCases.ts    # Use case card data
```

## Auth + Dashboard

### Conversion fixes and optional analytics (2026-10-22)

Production Supabase currently auto-confirms email signup. Signup must inspect
`data.session`: an immediate session goes to the chosen Starter/Pro checkout or
dashboard; only no-session responses show “check your email”. Do not change the
shared auth confirmation configuration for this developer site. Plan selection
is carried in auth links as well as localStorage, and storage/network failures
must not strand the form. Regression: `npm test` covers both signup outcomes.

`Analytics.astro` runs on public/auth pages, only after explicit opt-in. Daily
tab UUID lives in sessionStorage; consent is a local preference, not a tracking
identifier. DNT/GPC, webdriver, local previews and storage failures disable it.
It sends fixed page/event/source/plan labels to `/site-analytics/event`, never
form contents or full URLs. `/privacy` explains retention and allows opt-out.
Backend table/RPC is private; analytics is not proof of people or payment. Both
build CI and local checks run frontend regression tests. Landing examples are
explicitly illustrative, not actual artist appearances or current availability.
All auth/dashboard is **client-side JavaScript** (Astro static output, no SSR).

### Auth flow
1. User signs up at `/signup` → confirmation email sent
2. Clicks email link → redirected to `/dashboard` with session tokens
3. Dashboard calls `supabase.auth.getSession()` to validate, redirects to `/login` if none
4. Forgot password: `/login` → "Forgot password?" → `/forgot-password` → email sent → `/reset-password` → new password → `/dashboard`

### Dashboard features
- **Auth guard**: redirects to /login if no session
- **Auto-key on first visit**: if no keys, auto-creates one and shows raw key modal
- **Key table**: name, prefix, status, created, today's usage, revoke button
- **Create key**: opens name modal → calls `create_user_api_key` RPC → shows raw key
- **Max 3 active keys**: create button disabled at limit
- **Key reveal modal**: monospace display, copy button, "won't be shown again" warning
- **Usage**: today's count / 100 quota bar, last 30 days total
- **Plan banner**: account-wide monthly allowance + checkout / Manage billing
- **Sign out**: clears session → /login

### Supabase RPCs called
- `create_user_api_key(p_key_name)` → returns `[{key_id, raw_key, key_name, key_prefix}]`
- `revoke_user_api_key(p_key_id)` → returns boolean
- `get_user_usage_summary()` → returns `[{key_id, key_name, key_prefix, status, tier, daily_quota, per_minute_quota, created_at, today_usage, last_30_days_usage}]`

## Design
- Dark theme: bg `#0a0a12`, violet primary `#8b5cf6`, cyan secondary `#22d3ee`
- Stripe/Vercel/Resend aesthetic — clean, minimal, developer-focused
- Self-hosted fonts: Inter (body), JetBrains Mono (code/keys) via Google Fonts CDN
- Mobile-first responsive
- Client JS: tab switcher (Connect section) + auth pages + dashboard

## Deploy
```bash
# Push to GitHub (auto-deploy if connected, or manual):
git push origin main

# Manual Railway deploy (ALWAYS use token — never bare `railway up`):
source ~/.railway/tokens.env
cd ~/Apps/nightlife-dev
RAILWAY_TOKEN=$RAILWAY_TOKEN_NIGHTLIFE_DEV railway up

# Check logs:
RAILWAY_TOKEN=$RAILWAY_TOKEN_NIGHTLIFE_DEV railway logs -n 50

# Health check:
curl https://nightlife-dev-production.up.railway.app/health
```

## External Links
- "Get API Key" CTA → /signup (self-service)
- "Dashboard" → /dashboard
- GitHub links → https://github.com/alcylu/nightlife-mcp (MCP server repo, not this repo)
- MCP endpoint → https://api.nightlife.dev/mcp

## DB Migration (in nightlife-mcp repo)
- `~/Apps/nightlife-mcp/supabase/migrations/20260220_user_api_keys.sql`
- Adds `user_id` to `mcp_api_keys`, enables RLS, creates 3 RPCs
- Must be applied via Supabase SQL editor before dashboard works
- After migration: set `MCP_HTTP_USE_DB_KEYS=true` on nightlife-mcp Railway

## Supabase Auth Redirect URLs (DONE)
Added via Management API on 2026-02-20:
- `http://localhost:4321/dashboard` (local dev)
- `https://nightlife.dev/dashboard` (production custom domain)
- `https://nightlife-dev-production.up.railway.app/dashboard` (Railway URL)

Added on 2026-03-02 (password reset):
- `http://localhost:4321/reset-password` (local dev)
- `https://nightlife.dev/reset-password` (production)
- `https://nightlife-dev-production.up.railway.app/reset-password` (Railway)

## Custom Domain (DONE)
- **Domain**: `nightlife.dev` (Cloudflare DNS)
- **Live URL**: https://nightlife.dev
- **Railway CNAME target**: `s7u51lce.up.railway.app`
- **Cloudflare DNS**: CNAME `@` → `s7u51lce.up.railway.app` (DNS only for Railway verification)
- **TXT record**: `_railway-verify` → `railway-verify=f8475fba4196f6ffef9c0475...`
- **API subdomain**: `api.nightlife.dev` → `7dc2dqau.up.railway.app` (DNS only)

## Completed (2026-02-19/20)
- ~~Apply DB migration + flip MCP_HTTP_USE_DB_KEYS=true~~ ✅
- ~~E2E test: signup → key → curl MCP → dashboard usage~~ ✅ 7/7 tests PASS
- ~~Supabase redirect URLs~~ ✅
- ~~Custom domain registered on Railway~~ ✅
- ~~Cloudflare DNS → Railway~~ ✅ nightlife.dev live

## Completed (2026-03-02)
- ~~OG image~~ ✅ `public/og-image.png` (1200x630), og:image + twitter:image meta tags in Base.astro
- ~~Forgot password flow~~ ✅ `/forgot-password` + `/reset-password` pages, link on login page
- ~~Per-minute rate limit display~~ ✅ Plan banner + usage card show 20 req/min
- ~~Supabase redirect URLs for reset~~ ✅ 3 URLs added via Management API

## Pending

## Additional usage requests

`/request-usage` collects expected total monthly requests, optional website and
use case from a confirmed, signed-in account. The backend uses the verified
account email, not a browser-supplied recipient/email. Pricing, Enterprise,
checkout and dashboard link here. Submission sends an authenticated POST to
`/billing/usage-request`; saved requests queue email and LINE to Allen.
The form explains manual review and no automatic quota/billing changes, keeps
its request UUID on retry, and displays saved/error/signed-out states. Current
Free/Pro prices and limits are unchanged by this feature.

Regression recipe: signed-out shows login/signup links; verified account shows
email read-only; submit 10,000 requests/month + a use case; 503 retains the form
and retry UUID; 202 hides the form and confirms receipt, not guaranteed delivery.
Check 390px and desktop layouts. Backend tests cover forged email/recipients,
validation, daily caps, deduplication, queue leasing and per-channel retries.
- GitHub star count (currently placeholder)

## Pro checkout (prepared 2026-10-15)

Approved Pro enrichment: performer bios, primary profile images and social
profiles, plus venue socials where available. Demand/followers/rankings/VIP
pricing remain internal-only. Verified billing entitlements are enforced by
the API, not this client. CI builds each PR/push.

- `/checkout`: US$19/month Pro offer; confirmed Supabase account → Stripe-hosted
  subscription checkout. Pricing CTA and dashboard Upgrade link target this page.
- The Supabase browser client uses the supported `sb_publishable_*` public key;
  the retired legacy JWT returns 401 even on auth/settings. Launch regression:
  GET `/auth/v1/settings` with the public key must return 200; unauthenticated
  POST `get_user_usage_summary` must reach Postgres (not "Legacy API keys are
  disabled"). Browser signup/login and authenticated key RPCs must work.
- `src/lib/billing.ts`: authenticated calls to `https://api.nightlife.dev/billing`;
  `PUBLIC_BILLING_API_URL` can override it for isolated tests. Signup intent and
  source survive login/email confirmation using localStorage; all redirects are
  fixed destinations, and Stripe URL hosts are checked before navigation.
- `/terms`: renewal, limits, cancellation, support and billing data disclosure.
- Dashboard reads the paid plan and shared monthly allowance (Starter US$5/500,
  Pro US$19/5,000 per billing month; no free allowance), links to Stripe's customer
  portal and handles scheduled cancellation/payment problems. Key RPCs unchanged.
- Both paid plans include advanced data. Starter is 10/min/key, Pro 30/min/key.
  No active subscription means key creation is disabled and no auto-key is issued.
  Checkout selection survives login/signup via nlt_checkout_plan. Additional usage
  enquiries do not require a subscription. Backend paid-plans migration:
  `20261015140000_mcp_paid_plans.sql`; both Stripe price IDs are required.
- Paired backend: nightlife-mcp `feat/pro-billing`, migration
  `20261015090000_mcp_pro_billing.sql` and `20261015100000_mcp_monthly_allowances.sql`,
  dedicated `/billing/webhook`, Stripe Pro
  price/portal/signing-secret configuration. VIP billing is independent.
- Signup tags `signup_app=nightlife-dev` and `signup_source` for aggregate reports.
- `get_user_monthly_usage()` returns the account allowance/count/reset. Quotas
  are shared across three keys; key management RPC contracts remain unchanged.
- Launch order and conversion report: nightlife-mcp `docs/pro-billing-rollout.md`.
- Visual QA: desktop 1440px + mobile 390px; fixture-backed checks cover signed-out,
  cancelled checkout, paid confirmation and cancelled-user resubscription.
