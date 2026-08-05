# ADR 0006: Single-city Lviv root route

Date: 2026-07-28
Status: Accepted
Owner: Architect
Supersedes: ADR 0003 festival-city routing and the multi-city landing aspects of ADR 0004

## Context

The 2026 festival scope has changed from city-specific events in Kamianets-Podilskyi and Lviv to one event in Lviv on 15–16 August 2026. The accepted Sanity content model remains suitable: one `festivalCity` document can continue to own ordered references to locations, artists, and partners.

The frontend still models two separate experiences:

- `/` renders a multi-city landing assembled from a lightweight list query.
- `/:slug` can render a detailed `festivalCity` page before falling back to a generic Sanity `page`.

Keeping both `/` and `/lviv/` after the pivot would duplicate the only festival experience, preserve unnecessary route and theme-switching complexity, and weaken the canonical homepage contract. The frontend must remain compatible with `output: "export"` and directory-style static output.

## Decision

- **DEC-001**: Render the complete Lviv festival experience at `/` from the published `festivalCity` document whose stable slug is `lviv`.
- **DEC-002**: Keep the `festivalCity`, `location`, `artist`, and `partner` schemas unchanged. The `festivalCity` document becomes the content source for `/`, not a route generator.
- **DEC-003**: Remove `festivalCity` documents from the root `/:slug` route contract. `frontend/app/(main)/[slug]/page.tsx` will generate and render generic Sanity `page` documents only.
- **DEC-004**: Do not export `/lviv/`, `/kamianets/`, or other city routes. `/` is the canonical festival URL.
- **DEC-005**: Keep the CSS-variable theme system and legacy `epic` tokens, but make `heroic` the deterministic default and the only theme applied by the homepage.
- **DEC-006**: Replace the city-selection Hero with a static, server-rendered Lviv announcement that may use the Sanity hero image as its single high-priority LCP image.
- **DEC-007**: Remove `festivalCity` URLs from the generated sitemap while retaining `/`, `/tickets/`, blog posts, and generic page routes.

## Consequences

### Positive

- **POS-001**: The public URL contract matches the single-city product: the complete festival is available at `/`.
- **POS-002**: The static export no longer emits duplicate festival content at `/lviv/`.
- **POS-003**: The homepage can consume one full, typed GROQ projection for locations, artists, partners, body content, and metadata.
- **POS-004**: Client-side city-selection and theme-preview JavaScript is no longer required.
- **POS-005**: Generic Sanity pages can still use root-level slugs without competing with `festivalCity` documents.

### Negative / trade-offs

- **NEG-001**: Existing `/lviv/` and `/kamianets/` links will no longer be generated and will resolve to the static 404 unless the host adds redirects.
- **NEG-002**: The homepage depends on the stable `lviv` slug contract; changing that slug requires a coordinated code or architecture update.
- **NEG-003**: Returning to multiple cities will require a new ADR and deliberate restoration of city route generation or another multi-event navigation model.
- **NEG-004**: The unchanged artist schema has no performance date or time field, so the frontend cannot group the lineup into accurate daily schedules without a future content-model decision.

## Alternatives considered

### Keep `/lviv/` and make it canonical

- **ALT-001**: Continue generating the Lviv detail route and keep `/` as a lightweight landing.
- **ALT-002**: Rejected because it retains a redundant navigation layer for a one-city event and conflicts with the approved route merge.

### Generate `/lviv/` with a canonical link to `/`

- **ALT-003**: Export duplicate Lviv content but point its canonical metadata to `/`.
- **ALT-004**: Rejected because static export would still ship duplicate content and links, while runtime redirects are unavailable.

### Replace `festivalCity` with a homepage singleton

- **ALT-005**: Introduce a new Sanity singleton tailored to the Lviv homepage.
- **ALT-006**: Rejected because the existing schema remains migration-friendly and already owns all required relationships.

## Implementation notes

- **IMP-001**: Reuse the full festival-city GROQ projection with the stable `lviv` slug rather than duplicating query fields.
- **IMP-002**: Keep the homepage resilient when Sanity is unavailable by rendering approved code-owned Hero copy and empty-state messages for missing referenced content.
- **IMP-003**: Refactor landing components to accept one `FESTIVAL_CITY_QUERY_RESULT` instead of flattening an array of cities.
- **IMP-004**: Verify that `frontend/out/index.html` contains Lviv content and that `frontend/out/lviv/` and `frontend/out/kamianets/` are absent.
- **IMP-005**: Run Sanity TypeGen after any GROQ query change; do not edit `frontend/sanity.types.ts` manually.

## References

- **REF-001**: `docs/adr/0001-static-export-to-adm-tools.md`
- **REF-002**: `docs/adr/0002-festival-content-model.md`
- **REF-003**: Former multi-city root slug contract (Superseded by ADR 0006)
- **REF-004**: `docs/adr/0004-root-festival-landing-route.md`
- **REF-005**: `docs/adr/0005-directory-style-static-export.md`
- **REF-006**: `artifacts/ARCHITECTURE.md`
- **REF-007**: `artifacts/CONTENT_LATEST.md`
