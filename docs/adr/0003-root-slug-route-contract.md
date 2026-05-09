# ADR 0003: Root slug route contract

Date: 2026-05-08
Status: Accepted
Owner: Architect

## Context

The static frontend serves both generic Sanity `page` documents and domain-specific `festivalCity` documents at root-level slugs such as `/kamianets` and `/lviv`.

ADR 0004 separately assigns the root `/` route to the festival landing experience. This ADR governs only dynamic root-level slugs under `/:slug`.

Next.js App Router cannot safely define separate dynamic route files for the same URL segment, even when route groups are used. Static export also requires every dynamic path to be known at build time.

## Decision

Use the existing `frontend/app/(main)/[slug]/page.tsx` route as the single owner of the root `/:slug` namespace.

For a given slug, the route resolves documents in this order:

1. `festivalCity`
2. generic `page`
3. 404 via `notFound()`

`festivalCity` wins if a `festivalCity` and a generic `page` share the same slug.

`generateStaticParams()` must return the union of published `festivalCity` slugs and generic `page` slugs, excluding the `index` page slug because `/` is handled by `frontend/app/page.tsx` and ADR 0004 assigns that route to the festival landing.

Do not keep hardcoded fallback slugs for `/kamianets` and `/lviv`. City routes should be generated from Sanity `festivalCity` documents only.

If the dataset has zero root-level `festivalCity` or `page` slugs, the frontend may emit a non-content technical placeholder path solely to satisfy Next.js static export requirements for the dynamic route. This placeholder must not represent a city and must not be linked from the UI.

## Consequences

### Positive

- The URL contract stays simple: city pages live at `/:slug`.
- Static export remains deterministic because all city/page slugs are collected at build time.
- `festivalCity` pages can be introduced without breaking existing generic pages.
- Hardcoded route placeholders are removed from frontend static params.

### Negative / trade-offs

- Editors must avoid accidental slug collisions; if they occur, `festivalCity` takes precedence.
- If no `festivalCity` documents are published, `/kamianets` and `/lviv` are not exported.
- If no root-level Sanity slugs exist, a non-content placeholder route may be exported for build compatibility.
- Phase 3 needs a dedicated city-page rendering path because `festivalCity` documents do not use the generic `page.blocks[]` builder.

## Alternatives considered

| Option | Why not |
|---|---|
| Separate dynamic route groups for pages and cities | Route groups do not affect URL segments; two `[slug]` pages would conflict for `/:slug`. |
| Move cities under `/city/[slug]` | Changes the approved public URL shape. |
| Keep hardcoded fallback city slugs | Preserves temporary placeholders but violates the Sanity-driven route contract. |
| Let generic `page` win slug collisions | City pages are the domain-specific content model for festival city routes and should be authoritative. |

## Follow-ups

- [ ] Add an editorial checklist or validation to avoid `page`/`festivalCity` slug collisions.
- [ ] Add complete city-page UI/theming in Phase 4/5.
- [ ] Remove any remaining city placeholder assumptions once Sanity content is published.
