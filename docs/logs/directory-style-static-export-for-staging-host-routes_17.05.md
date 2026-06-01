# Project Log: Directory-style static export for staging host routes

- **Date**: 2026-05-17
- **Task**: Implement the staging host route-output fix after mixed-content and broken navigation persisted with flat route files.
- **Agent**: architect.

## Summary

Accepted ADR 0005 and switched the frontend static export to directory-style route output via `trailingSlash: true`. Updated internal route links, sitemap entries, canonical metadata, and the staging workflow checks to expect route pages at `kamianets/index.html`, `lviv/index.html`, and `tickets/index.html`. This avoids the host conflict between flat `.html` route files and same-named Next App Router payload directories.

## Files changed

- `frontend/next.config.mjs`
- `github/workflows/deploy-staging.yml`
- `route link/metadata/query files`
- `docs/adr/0005-directory-style-static-export.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/ai/PROJECT_CONTEXT.md`
- `docs/logs/2026-05.md`

## Verification

Pending local validation and staging redeploy.

## Risks

Staging host may still have cached redirects or HTTPS canonicalization outside the app; validate with curl and Chrome after redeploy.

## Follow-ups

Redeploy staging, remove custom flat-file `.htaccess` rewrites, keep only minimal directory index handling, verify slash routes and absence of mixed-content errors, then test repeat update workflow.
