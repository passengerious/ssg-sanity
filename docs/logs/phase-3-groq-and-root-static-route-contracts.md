# Project Log: Phase 3 GROQ and root static route contracts

- **Date**: 2026-05-08
- **Task**: Phase 3 GROQ and root static route contracts
- **Agent**: architect
- **Subagents**: sanity-groq-specialist, nextjs-ssg-architect
- **Plan**: `docs/plans/implementation-plan.md`
- **ADR**: `docs/adr/0003-root-slug-route-contract.md`

## Summary

Implemented the Phase 3 root slug contract for static export. Added Sanity GROQ queries for `festivalCity` static params, city detail pages, and landing city cards. Updated the shared `[slug]` route so `festivalCity` content resolves before generic `page` content, removed hardcoded city fallback slugs, added a non-content static-export placeholder for empty datasets, added a minimal city page shell, wired landing city cards to Sanity, and included `festivalCity` documents in the sitemap.

## Files changed

- `docs/adr/0003-root-slug-route-contract.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/2026-05.md`
- `frontend/sanity/queries/festival-city.ts`
- `frontend/sanity/lib/fetch.ts`
- `frontend/sanity/lib/metadata.ts`
- `frontend/lib/tickets.ts`
- `frontend/app/(main)/[slug]/page.tsx`
- `frontend/app/landing/page.tsx`
- `frontend/app/sitemap.ts`
- `frontend/components/festival-city/festival-city-page.tsx`
- `frontend/components/landing/LandingExperience.tsx`
- `frontend/components/landing/Hero.tsx`
- `frontend/sanity.types.ts`

## Verification

- `pnpm --filter studio typegen` passed and generated 11 query result types.
- `pnpm --filter studio typecheck` passed.
- `pnpm --filter frontend typecheck` passed.
- `pnpm --filter frontend lint` passed.
- `pnpm --filter frontend build` passed with static export output.
- `git diff --check` passed.

## Architectural impact

High. The root `/:slug` namespace is now shared by `festivalCity` and generic `page` documents with documented city-first precedence. City route generation is now Sanity-driven rather than hardcoded.

## Risks

- If no `festivalCity` documents are published, `/kamianets` and `/lviv` are not exported.
- If no root-level Sanity slugs exist, a non-content placeholder route is exported only to satisfy Next.js static export.
- `page` and `festivalCity` documents can still share a slug; city content intentionally wins until stronger editorial validation is added.
- City page UI is intentionally minimal pending Phase 4/5 theme and cinematic layout work.

## Follow-ups

- [ ] Publish `festivalCity` documents for Kamianets and Lviv.
- [ ] Add editorial validation/checklist to prevent `page`/`festivalCity` slug collisions.
- [ ] Refine city page theme and section UI in Phase 4/5.
