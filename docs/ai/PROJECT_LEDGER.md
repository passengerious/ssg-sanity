# Project Ledger

Last updated: 2026-05-08

## Current phase

Architecture / implementation planning

## Active priorities

1. Validate and deploy `frontend/out/` to `adm.tools`.
2. Define the rebuild workflow for Sanity content updates.
3. Define Sanity-backed city content model for `/kamianets` and `/lviv`.
4. Treat `.stitch/DESIGN.md` as the source of truth for festival UI design tokens and page styling.
5. Use the new `ticketInfo` singleton as the MVP source for `/tickets` ticket CTA content.

## Active plans

| Plan | Status | Owner | Updated |
|---|---|---|---|
| `docs/plans/implementation-plan.md` | Draft | Architect | 2026-05-07 |
| `docs/plans/stitch-task.md` | MVP implemented | UI agent | 2026-05-08 |

## Architecture decisions

| ADR | Status | Decision | Date |
|---|---|---|---|
| `docs/adr/0001-static-export-to-adm-tools.md` | Accepted | Use `output: 'export'`; remove frontend API routes, Draft Mode, live editing, and runtime redirects | 2026-05-08 |

## Open architecture questions

| Question | Impact | Needed decision |
|---|---:|---|
| How should newsletter submissions work on static hosting if reintroduced? | Medium | External provider or separate backend that does not expose secrets |
| Should city pages use existing `Page` documents or a dedicated festival city schema? | Medium | Sanity content model decision before schema work |
| How are Sanity content updates deployed? | Medium | Webhook-triggered rebuild, scheduled rebuild, or manual deployment workflow |
| How should Kyiv Region and Kobzar KS fonts be licensed and served? | Medium | Use approved self-hosted font files or documented fallbacks before launch |

## Current risks

| Risk | Severity | Owner | Mitigation |
|---|---:|---|---|
| Static export removes draft preview/live editing | High | Architect | Use Studio-only editing and document rebuild workflow; consider separate preview deployment later |
| Newsletter signup is disabled on static hosting | Medium | Architect | Choose external form backend or separate endpoint before enabling newsletter collection |
| Sanity content updates require rebuilds | Medium | Architect | Add webhook-triggered or manual rebuild workflow |
| Festival UI can drift from updated `.stitch/DESIGN.md` tokens | Medium | UI agents | Keep landing/city styling aligned to Brand Red, Natural Green, Warm Beige, Dark Grey tokens |

## Recent significant changes

| Date | Change | Log |
|---|---|---|
| 2026-05-08 | Static export enabled and runtime frontend features removed | `docs/logs/2026-05.md` |
| 2026-05-08 | Landing MVP realigned to updated Stitch design guidance and validation fixed | `docs/logs/2026-05.md` |
| 2026-05-08 | TicketInfo singleton and `/tickets` MVP route added | `docs/logs/2026-05.md` |
| 2026-05-07 | Static export implementation plan improved | `docs/logs/2026-05.md` |
| 2026-05-07 | Project ledger initialized | `docs/logs/2026-05.md` |

## Agent handoff notes

- Read this ledger before starting non-trivial work.
- Use ADRs for architecture decisions.
- Use plans for multi-step implementation work.
- Use monthly logs for factual task history.
