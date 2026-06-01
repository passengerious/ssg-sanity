# Project Log: Phase 8 production deployment scope

- **Date**: 2026-06-01
- **Task**: Scope the post-staging production deployment phase and related launch decisions.
- **Agent**: architect.

## Summary

Documented that production should reuse the same manual GitHub Actions workflow with a separate GitHub Environment and a different production domain webroot on the same host/directory pattern. Clarified that production-specific values are primarily `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_ENV=production`, and `DEPLOY_PATH`; SSH and Sanity values may match staging if the same host/account/dataset is used. Deferred content refresh, homepage SEO migration to Sanity, newsletter enablement, and Sanity webhook automation to future waves. Closed `/landing` redirect as no-op and recorded font usage as confirmed.

## Files changed

- `workflow.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/2026-06.md`

## Verification

Documentation update only.

## Risks

Production deploy must not reuse the staging `DEPLOY_PATH`; production must use `NEXT_PUBLIC_SITE_ENV=production` so SEO indexing metadata changes from staging behavior.

## Follow-ups

Implement same-workflow environment selection, configure production GitHub Environment variables/secrets, run manual production deploy, and verify production canonical URLs/indexing.
