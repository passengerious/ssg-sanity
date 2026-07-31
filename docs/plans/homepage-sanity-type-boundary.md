# Plan: Homepage Sanity type boundary cleanup

Date: 2026-07-31
Status: Completed
Owner: Architect
Implementing agents: `react-next-component-specialist`, `sanity-groq-specialist`, `code-reviewer`

## Goal

Keep the canonical single-Lviv `festivalCity` query contract while preventing the Hero presentation component from depending on the full generated homepage result and removing unused legacy route/theme projections from that result.

## Non-goals

- Do not change the `festivalCity` schema or published content.
- Do not remove the retained `epic` schema token or otherwise supersede ADR 0006.
- Do not rename the shared festival-city query/fetch contract in this focused cleanup.
- Do not alter current Hero layout, fallback behavior, or product-owned CTA changes.

## Context

The homepage is fixed to Lviv and the Heroic theme, but `Hero` imported the complete generated `FESTIVAL_CITY_QUERY_RESULT`. The query also projected top-level `slug` and `themeKey` values that no current consumer used. This exposed obsolete multi-city concerns in generated homepage types even though route and theme selection are code-owned under ADR 0006.

## Relevant files

- `frontend/components/landing/Hero.tsx`
- `frontend/components/landing/LandingExperience.tsx`
- `frontend/sanity/queries/festival-city.ts`
- `frontend/sanity.types.ts`
- `docs/adr/0006-single-city-lviv-root-route.md`

## Relevant ADRs

- ADR 0001 — static export remains required.
- ADR 0002 — the `festivalCity` content model remains accepted.
- ADR 0006 — `/` renders canonical Lviv content with a fixed Heroic frontend theme.

## Implementation steps

1. Define a small `HeroContent` presentation type for the CMS-owned event text consumed by the Hero.
2. Map the generated festival query result to `HeroContent` in `LandingExperience`.
3. Remove unused top-level `slug` and `themeKey` projections from `FESTIVAL_CITY_QUERY`; after the approved local-art pivot, also remove the no-longer-consumed homepage `heroImage` projection.
4. Regenerate `frontend/sanity.types.ts` from the Studio schema and frontend queries.
5. Run TypeScript, lint, static build, diff, and specialist review checks.

## Verification checklist

- [x] `Hero` no longer imports `FESTIVAL_CITY_QUERY_RESULT`.
- [x] `LandingExperience` owns the query-to-presentation mapping.
- [x] Generated `FESTIVAL_CITY_QUERY_RESULT` no longer contains top-level `slug`, `themeKey`, or the unused `heroImage` projection.
- [x] `pnpm typegen` passes and reports 69 schema types and 9 query types.
- [x] `pnpm --filter frontend typecheck` passes.
- [x] `pnpm --filter frontend lint` passes.
- [x] Production-like static build passes with eight routes.
- [x] `git diff --check` passes.

## Risks

- The schema-generated `FestivalCity` document type still correctly includes retained `slug`, `themeKey`, and `heroImage` fields; removing those schema fields requires an explicit content-model decision and migration.

## Completion notes

Completed on 2026-07-31. The Hero consumes a narrow event-text presentation model, the composition boundary performs the mapping, and TypeGen faithfully omits unused homepage query projections. A same-day approved visual follow-up made Hero artwork code-owned and removed `heroImage` from this query result while retaining the schema field. No schema, routing, revalidation, or deployment architecture changed, so no new ADR was required.
