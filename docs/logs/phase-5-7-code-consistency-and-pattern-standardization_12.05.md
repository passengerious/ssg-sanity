# Project Log: Phase 5.7 code consistency and pattern standardization

- **Date**: 2026-05-12
- **Task**: Implement Phase 5.7 — standardize component exports, add queries barrel file, add consistent fetch error handling, create SanityImage wrapper, extract Tailwind patterns, and add ErrorBoundary for block rendering.
- **Agent**: architect; `code-reviewer`.

## Summary

Created `sanity/queries/index.ts` barrel file; rewrote `sanity/lib/fetch.ts` with `try/catch` for all fetchers; created `SanityImage` and `SanityImageFill` wrapper components; created `lib/tailwind-patterns.ts` with shared constants; created `ErrorBoundary` component; updated `Blocks` to wrap each block in an error boundary with visible fallback; updated landing components (`ArtistsLineup`, `LocationsGrid`, `PartnersSection`) to use new patterns.

## Files changed

- `frontend/sanity/queries/index.ts`
- `frontend/sanity/lib/fetch.ts`
- `frontend/components/sanity-image.tsx`
- `frontend/components/error-boundary.tsx`
- `frontend/lib/tailwind-patterns.ts`
- `frontend/components/blocks/index.tsx`
- `frontend/app/(main)/[slug]/page.tsx`
- `landing components`

## Verification

`pnpm --filter frontend typecheck`; `pnpm --filter frontend lint`; `pnpm --filter frontend build`; `git diff --check`.

## Risks

`Blocks` default export is preserved for backward compatibility; `SanityImage` does not yet replace all ad-hoc Image usages across the entire codebase (Hero, FestivalCityPage, Founder, AboutFestival still use raw `next/image`).

## Follow-ups

Continue migrating remaining components to `SanityImage`; standardize remaining block/UI component exports to named-only if desired.
