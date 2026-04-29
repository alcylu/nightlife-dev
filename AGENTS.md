# Agents context — nightlife-dev

For OpenAI Codex / Cursor.

## What this repo is

Developer landing page + self-service dashboard at `nightlife.dev`. Front for the `nightlife-mcp` API (key issuance, usage stats, docs). Astro.

## Non-negotiable rules

1. **API key issuance / revocation flows** are coordinated with `nightlife-mcp`. Don't change RPC contracts (`create_user_api_key`, `revoke_user_api_key`) without coordinating.
2. **Bug fixes ship with a regression check** — manual verification recipe is acceptable here (Astro tests are sparse).
3. **UI changes get visual verification** locally before push.

Workflow: `CONTRIBUTING.md`. Architecture: `CLAUDE.md`.
