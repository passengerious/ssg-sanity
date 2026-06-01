# Project Log: Deploy-managed staging host rules

- **Date**: 2026-05-17
- **Task**: Preserve staging host route and custom 404 rules across `rsync --delete` deployments.
- **Agent**: architect.

## Summary

Updated `.github/workflows/deploy-staging.yml` to generate `frontend/out/.htaccess` after the static export build and before deployment. The workflow now verifies `.htaccess` in the local export and deployed webroot so route canonicalization and `ErrorDocument 404 /404.html` are not lost when `frontend/out/` is synced to `/www/`.

## Files changed

- `github/workflows/deploy-staging.yml`
- `docs/logs/2026-05.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`

## Verification

Pending GitHub Actions run. Local diff check should be run before commit.

## Risks

Host may reject `Options -MultiViews` on some configurations; if the workflow deploy succeeds but the site returns 500, remove that directive and keep `DirectoryIndex`, `ErrorDocument`, and rewrite rules.

## Follow-ups

Commit/push, run staging workflow, verify non-slash routes redirect to `https://.../`, verify `/not-a-real-page` serves the exported 404 body, then proceed to local city-card theme styling.
