# Project Log: TicketInfo schema and tickets MVP route

- **Date**: 2026-05-08
- **Task**: TicketInfo schema and tickets MVP route
- **Agent**: architect
- **Subagent**: sanity-schema-architect
- **Plan**: `docs/plans/implementation-plan.md`
- **ADR**: N/A

## Summary

Added an MVP Sanity singleton document for ticket information and a static-safe `/tickets` page. The page uses the festival design tokens and renders safe placeholders when the Sanity document or external box office URL is not yet configured.

## Files changed

- `studio/schemas/documents/ticket-info.ts`
- `studio/schema-types.ts`
- `studio/sanity.config.ts`
- `studio/structure.ts`
- `frontend/sanity/queries/ticket-info.ts`
- `frontend/sanity/lib/fetch.ts`
- `frontend/sanity.types.ts`
- `frontend/app/tickets/page.tsx`
- `frontend/components/landing/Header.tsx`
- `frontend/components/landing/BuyTickets.tsx`
- `studio/tsconfig.json`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/2026-05.md`

## Verification

- `pnpm typegen` passed.
- `pnpm typecheck` passed.
- `pnpm --filter frontend lint` passed.
- `pnpm --filter frontend build` passed.
- Build exported `/tickets` as static content in the current non-export build mode.
- `pnpm --filter studio typecheck` passed.
- `pnpm --filter studio build` passed.

## Architectural impact

Low to medium. Introduces a small content model and route, but does not change static export architecture. Static export remains the next implementation target and still requires resolving documented blockers before enabling `output: 'export'`.

## Risks

- `/tickets` uses placeholders until editors publish the singleton document and external partner URL.
- `boxOfficeUrl` is optional because the ticket partner URL is not available yet; when set, Studio validation requires HTTPS.
- Static export blockers remain outside this ticket MVP scope.
- Studio typecheck required adding Node types to `studio/tsconfig.json` for existing `process.env` usage.

## Follow-ups

- [ ] Publish a `ticketInfo` document in Sanity with final ticket copy and box office URL.
- [ ] Re-run validation after any schema or query changes.
- [ ] Continue Phase 1 static export compatibility work before adding `output: 'export'`.
