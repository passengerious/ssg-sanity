# Project Log: Directory-style static export local validation

- **Date**: 2026-05-17
- **Task**: Validate the ADR 0005 directory-style static export before staging redeploy.
- **Agent**: architect; `static-export-reviewer`.

## Summary

Ran local validation for the `trailingSlash: true` route-output changes. Confirmed the static export now emits route pages as directory indexes for `/kamianets/`, `/lviv/`, and `/tickets/`, while omitting flat route files such as `kamianets.html`, `lviv.html`, and `tickets.html`.

## Files changed

- `docs/logs/2026-05.md`; `frontend/sanity.types.ts` refreshed by `pnpm typegen`

## Verification

`pnpm typegen`; `pnpm --filter frontend typecheck`; `pnpm --filter frontend lint`; `git diff --check`; `NEXT_PUBLIC_SITE_ENV=development pnpm --filter frontend build`; exported output checks for `index.html`, `404.html`, `sitemap.xml`, `robots.txt`, `_next/`, `kamianets/index.html`, `lviv/index.html`, `tickets/index.html`, no direct `api` output, and no flat city/tickets route files. Static export review found no absolute blockers.

## Risks

Local shell did not provide a staging-specific `NEXT_PUBLIC_SITE_URL`, so this validation used the frontend local environment for canonical URLs; staging must still be built with the actual HTTPS staging URL through GitHub environment variables. The host may still have stale `.htaccess` rules or redirects until redeployed and cleaned up.

## Follow-ups

Commit and push the directory-style export changes, dispatch staging deploy, keep `.htaccess` minimal, then verify browser navigation and mixed-content behavior for `/kamianets/`, `/lviv/`, and `/tickets/`.
