# Project Log: Phase 7 deployment plan scoping

- **Date**: 2026-05-15
- **Task**: Update Phase 7 plan for GitHub Actions deployment to a static host webroot.
- **Agent**: architect; GitHub Actions docs guidance.

## Summary

Scoped Phase 7 around GitHub Actions building `frontend/out/` on GitHub-hosted runners and deploying the contents to `/home/<SSH_USER>/<STAGING-DOMAIN>/www/` over SSH/rsync. Added host preflight commands for the SSH web console, documented required staging secrets/variables, clarified that the build-time canonical URL must be the actual staging website URL, and added the initial manual staging deployment workflow.

## Files changed

- `github/workflows/deploy-staging.yml`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/2026-05.md`

## Verification

Documentation-only update; reviewed GitHub Actions workflow syntax, secrets, and environments documentation.

## Risks

Host OS version, SSH/rsync availability, webroot permissions, and clean URL behavior still need verification on the staging host.

## Follow-ups

Add required Sanity build variables if not already present, run the staging deployment workflow, verify clean URLs, and test rollback from a backup.
