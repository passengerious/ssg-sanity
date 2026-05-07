# Project Ledger

Last updated: 2026-05-07

## Current phase

Architecture / implementation planning

## Active priorities

1. Confirm static export architecture for `adm.tools`.
2. Resolve Next.js static export blockers before setting `output: 'export'`.
3. Define Sanity-backed city content model for `/kamianets` and `/lviv`.

## Active plans

| Plan | Status | Owner | Updated |
|---|---|---|---|
| `docs/plans/implementation-plan.md` | Draft | Architect | 2026-05-07 |

## Architecture decisions

| ADR | Status | Decision | Date |
|---|---|---|---|
| Static export to `adm.tools` | Needed | Decide constraints for `output: 'export'`, preview, routes, redirects, and rebuilds | 2026-05-07 |

## Open architecture questions

| Question | Impact | Needed decision |
|---|---:|---|
| Should the frontend permanently use `output: 'export'` for `adm.tools`? | High | ADR documenting loss of API routes, draft mode, ISR, and runtime redirects |
| How should newsletter submissions work on static hosting? | High | External provider or separate backend that does not expose secrets |
| Should city pages use existing `Page` documents or a dedicated festival city schema? | Medium | Sanity content model decision before schema work |
| How are Sanity content updates deployed? | Medium | Webhook-triggered rebuild, scheduled rebuild, or manual deployment workflow |

## Current risks

| Risk | Severity | Owner | Mitigation |
|---|---:|---|---|
| Enabling `output: 'export'` before removing runtime features breaks builds | High | nextjs-ssg-architect | Complete export compatibility phase before config change |
| Static export removes draft preview/live editing | High | Architect | Document editorial workflow and rebuild strategy in ADR |
| Newsletter API route cannot run on static hosting | High | Architect | Choose external form backend or separate serverless endpoint |

## Recent significant changes

| Date | Change | Log |
|---|---|---|
| 2026-05-07 | Static export implementation plan improved | `docs/logs/2026-05.md` |
| 2026-05-07 | Project ledger initialized | `docs/logs/2026-05.md` |

## Agent handoff notes

- Read this ledger before starting non-trivial work.
- Use ADRs for architecture decisions.
- Use plans for multi-step implementation work.
- Use monthly logs for factual task history.
