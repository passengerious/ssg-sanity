# Project Log: Staging deployment live and testing focus

- **Date**: 2026-05-17
- **Task**: Record completed staging deployment and shift Phase 7 toward browser/host testing and update-loop validation.
- **Agent**: architect.

## Summary

Staging deployment is live through `.github/workflows/deploy-staging.yml`, which builds on GitHub-hosted runners, validates the static export, backs up the host webroot, and rsyncs `frontend/out/` contents into `/home/admin/<STAGING-DOMAIN>/www/`. Updated the active plan and ledger to treat the deployment foundation as established and to focus testing on repeated updates, clean URLs, HTTPS metadata, rollback readiness, and the first observed staging blocker: Chrome mixed-content console errors.

## Files changed

- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/ai/PROJECT_CONTEXT.md`
- `docs/logs/2026-05.md`

## Verification

Documentation update; reviewed `.github/workflows/deploy-staging.yml` and searched frontend/source references for likely insecure URL sources.

## Risks

Mixed-content source is not identified yet because the blocked request URLs were not captured; likely causes are `NEXT_PUBLIC_SITE_URL` using `http://` in the staging GitHub environment or Sanity-managed external URL fields containing `http://` values.

## Follow-ups

Capture at least one blocked URL from Chrome DevTools Network/Console, verify staging GitHub `NEXT_PUBLIC_SITE_URL` starts with `https://`, audit Sanity URL fields for `http://`, then decide whether to add workflow checks that fail on insecure generated resource URLs.
