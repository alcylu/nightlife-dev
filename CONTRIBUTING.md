# Contributing to nightlife-dev

Developer landing page + self-service dashboard for `nightlife.dev` (the developer-facing front for the `nightlife-mcp` API). Stack: Astro.

## Workflow

- Branch from `main`, or push directly for hotfixes
- No automated CI today
- Run locally + verify pages render before pushing

## Rules for new code

1. Bug fixes that affect the dashboard auth flow ship with a regression check (manual verification recipe in PR is fine — Astro tests are sparse).
2. UI changes get visual verification — load the page locally and confirm.
3. Don't change anything that affects API key issuance or revocation without coordinating with `nightlife-mcp`.

See `CLAUDE.md` for architecture. AI agents see `AGENTS.md`.
