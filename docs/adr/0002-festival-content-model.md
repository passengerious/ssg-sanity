# ADR 0002: Festival content model

Date: 2026-05-08
Status: Accepted
Owner: Architect

## Context

The festival site needs Sanity-managed city experiences for `/kamianets` and `/lviv`, with room for future cities. Phase 1 enabled static export, so all dynamic routes must be generated from build-time Sanity content.

The existing generic `page` document can model flexible marketing pages, but city festival pages need stable, domain-specific content: city name, theme key, venues/stages, artists, partners, and optional city-specific ticket links.

## Decision

Create a dedicated `festivalCity` document type for festival city pages instead of reusing generic `page` documents.

Use a city-owned reference model:

- `festivalCity.locations[]` references `location` documents.
- `festivalCity.artists[]` references `artist` documents.
- `festivalCity.partners[]` references `partner` documents.

Use `festivalCity.themeKey` as the CMS-to-frontend theme contract. The stable keys are:

- `epic`
- `heroic`

These keys preserve the current landing-page city swap logic, where the frontend sets `data-theme` from the selected city.

Do not restrict `festivalCity.slug` to only `kamianets` and `lviv`; editors may add future cities without schema changes. Slugs remain required and stable route identifiers.

Use `location.stageType` as a string/radio field instead of an `isEpicStage` checkbox. This keeps the model extensible if more stage categories are introduced.

Keep `festivalCity.ticketUrlOverride` as an optional city-specific ticket URL. Frontend logic should fall back to the global `ticketInfo.boxOfficeUrl` when it is empty.

Do not require `artist.photo` for the MVP so delayed promotional assets do not block content entry.

Skip `ticketInfo` changes in Phase 2 because the singleton was already introduced in Phase 1.

## Consequences

### Positive

- City routes are backed by a purpose-built content model.
- Landing city cards can become Sanity-driven while preserving existing `epic` / `heroic` theme swapping.
- Artists, locations, and partners are reusable across cities.
- Ordered reference arrays let editors control city-specific display order.
- Future festival cities can be added without schema changes.

### Negative / trade-offs

- Phase 3 must add GROQ queries and route logic for `festivalCity` static params.
- Generic `page` documents and `festivalCity` documents can still conflict at the same slug until route integration is settled.
- No detailed performance schedule is modeled yet.

## Alternatives considered

| Option | Why not |
|---|---|
| Reuse generic `page` documents for city pages | City pages need structured city, lineup, location, partner, and theme fields that would be brittle as page-builder blocks alone. |
| Put city references on `artist`, `location`, and `partner` | Back-references are harder for editors to maintain and make city page ordering less direct. |
| Add `isEpicStage` boolean | A stage type enum is more migration-friendly and can represent future stage categories. |
| Model schedules now | Schedule/performance details are not required for MVP and can be added later without blocking city content entry. |

## Impacted areas

- Sanity schemas: add `festivalCity`, `location`, `artist`, and `partner` documents.
- Studio structure: add a Festival group for city content.
- Shared link schema: internal links should be able to reference `festivalCity`.
- GROQ queries: Phase 3 must add city static params and city detail projections.
- Frontend routes: Phase 3/4 must render `/kamianets` and `/lviv` from `festivalCity` content and remove fallback params when content exists.

## Follow-ups

- [ ] Add GROQ queries for festival city lists, details, and landing city cards.
- [ ] Replace temporary city fallback static params with Sanity-backed `festivalCity` params.
- [ ] Define city page rendering components and theme application from `themeKey`.
- [ ] Add performance/schedule modeling only if editorial needs require date/time/stage combinations.
