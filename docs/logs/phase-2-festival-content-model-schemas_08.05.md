# Project Log: Phase 2 festival content model schemas

- **Date**: 2026-05-08
- **Task**: Phase 2 festival content model schemas
- **Agent**: architect
- **Subagent**: sanity-schema-architect
- **Plan**: `docs/plans/implementation-plan.md`
- **ADR**: `docs/adr/0002-festival-content-model.md`

## Summary

Accepted and implemented the Phase 2 Sanity festival content model. Added a dedicated `festivalCity` document type, city-owned references to reusable `location`, `artist`, and `partner` documents, stable `themeKey` values (`epic`, `heroic`) for landing/city theming, and optional city ticket URL overrides. Skipped `ticketInfo` because it was already completed in Phase 1.

## Files changed

- `docs/adr/0002-festival-content-model.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/2026-05.md`
- `studio/schemas/documents/festival-city.ts`
- `studio/schemas/documents/location.ts`
- `studio/schemas/documents/artist.ts`
- `studio/schemas/documents/partner.ts`
- `studio/schema-types.ts`
- `studio/structure.ts`
- `studio/schemas/blocks/shared/link.ts`
- `studio/schemas/blocks/shared/block-content.ts`
- `studio/schema.json`
- `frontend/sanity.types.ts`

## Verification

- `pnpm --filter studio typecheck` passed.
- `pnpm --filter frontend typecheck` passed.
- `pnpm --filter studio typegen` passed and regenerated `studio/schema.json` plus `frontend/sanity.types.ts`.
- `pnpm --filter frontend build` passed with static export output.
- `git diff --check` passed.

## Architectural impact

Medium. City pages will use dedicated `festivalCity` documents rather than generic `page` documents. Phase 3 must add GROQ/static route contracts and replace temporary fallback route params.

## Risks

- Frontend routes are not yet wired to `festivalCity` content.
- Existing generic `page` documents with city slugs could conflict until Phase 3 route behavior is finalized.
- Detailed artist performance scheduling is intentionally out of scope for MVP.

## Follow-ups

- [ ] Add GROQ queries for city static params, city details, and landing city cards.
- [ ] Replace temporary `/kamianets` and `/lviv` fallback params with Sanity-backed `festivalCity` params.
- [ ] Render city pages from `festivalCity` content and apply `themeKey` to city page theme.
