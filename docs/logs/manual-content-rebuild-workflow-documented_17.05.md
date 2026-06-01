# Project Log: Manual content rebuild workflow documented

- **Date**: 2026-05-17
- **Task**: Document the ideal update workflow for code and Sanity Studio content changes.
- **Agent**: architect; documentation-writer guidance.

## Summary

Added `workflow.md` with the current operating model: code changes and Sanity content batches both require a manual GitHub Actions staging deployment to regenerate the static site. Documented why published Sanity content is not visible until rebuild, how editors should batch and verify content changes, how maintainers run the deploy workflow, rollback expectations, and the future Sanity webhook to GitHub `repository_dispatch` enhancement path.

## Files changed

- `workflow.md`
- `docs/logs/2026-05.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`

## Verification

Documentation update; reviewed active Phase 7 plan and ledger for rebuild workflow requirements.

## Risks

Manual dispatch is less immediate than normal dynamic CMS publishing; editorial teams must coordinate batches and rebuilds until webhook automation is introduced.

## Follow-ups

Test a real Sanity content edit → manual workflow dispatch → staging verification loop, then decide whether editorial frequency justifies webhook automation.
