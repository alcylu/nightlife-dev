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
All auth/dashboard is **client-side JavaScript** (Astro static output, no SSR).

### Auth flow
1. User signs up at `/signup` → confirmation email sent
2. Clicks email link → redirected to `/dashboard` with session tokens
3. Dashboard calls `supabase.auth.getSession()` to validate, redirects to `/login` if none

### Dashboard features
- **Auth guard**: redirects to /login if no session
- **Auto-key on first visit**: if no keys, auto-creates one and shows raw key modal
- **Key table**: name, prefix, status, created, today's usage, revoke button
- **Create key**: opens name modal → calls `create_user_api_key` RPC → shows raw key
- **Max 3 active keys**: create button disabled at limit
- **Key reveal modal**: monospace display, copy button, "won't be shown again" warning
- **Usage**: today's count / 100 quota bar, last 30 days total
- **Plan banner**: "Free Plan — 100 req/day" + "Upgrade" mailto
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

# Manual Railway deploy:
cd ~/Apps/nightlife-dev
railway up --service nightlife-dev

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

## Pending
- OG image (needs design)
- GitHub star count (currently placeholder)
