# ADR 0007: Festival history milestones content model

Date: 2026-07-29
Status: Accepted
Owner: Architect

## Context

The 2026 Lviv homepage needs a trustworthy, Ukrainian-language history layer that makes the festival's folk roots, cultural continuity, Oleg Skrypka/VV legacy, and long-running history a central reason to attend. The approved source brief in `artifacts/facts.md` supplies twelve editorial milestones spanning 1987 to 2024, several of which are strong, numerical, or financial claims that require visible citation or editorial qualification before publication.

The homepage is a static-exported, server-rendered Lviv `festivalCity` experience at `/` (ADR 0006). The city already owns structured relationships for locations, artists, and partners (ADR 0002). The generic page-builder timeline is not appropriate as the primary implementation: it is not part of the `festivalCity` contract and does not express a year-semantic, citation-aware history model.

This ADR scopes the content model: the reusable `festivalMilestone` object and the city-owned `history` array. The approved implementation projects and renders the field through the existing build-time Lviv query; high-risk statements are qualified as editorial festival material until public primary sources are supplied.

## Decision

- **DEC-001**: Add a reusable `festivalMilestone` object type with required `year`, `title`, and `description` fields, plus optional HTTPS-only `sourceUrl` and optional `sourceLabel` fields.
- **DEC-002**: Model `year` as a short string (max 24) so it can represent a single year (`1987`) or a range (`1991–1996`, `2022–2024`) without a brittle numeric field.
- **DEC-003**: Keep milestones inline on the city. Add `festivalCity.history` as an editor-ordered array of `festivalMilestone` objects under the existing `content` field group.
- **DEC-004**: History remains city-owned and inline because this phase has a single Lviv narrative. Shared milestone documents and references are deferred until reuse across multiple events is an actual need.
- **DEC-005**: Citation and qualification requirements are editorial governance rules recorded in field descriptions, not hard schema constraints. The schema exposes an optional approved citation; editorial review decides when a source is mandatory for a high-risk claim.
- **DEC-006**: Do not create a standalone `/history` route in this phase. History is rendered as a section of the homepage `festivalCity` experience.
- **DEC-007**: Preserve backward compatibility. `history` is an additive, optional array; existing `festivalCity` documents and GROQ projections continue to work unchanged until the frontend opts in to the new projection.

## Consequences

### Positive

- **POS-001**: The festival legacy becomes a structured, year-semantic, citation-aware content model instead of free-form Portable Text.
- **POS-002**: Ordered inline milestones give editors direct control of the chronological narrative and display order.
- **POS-003**: Optional source fields let the UI expose an approved citation for high-risk claims without forcing a source on low-risk milestones.
- **POS-004**: The additive `history` array is non-breaking for existing documents, queries, and static export.
- **POS-005**: A future migration to shared milestone documents is possible without rethinking the field contract, because `year`, `title`, `description`, `sourceUrl`, and `sourceLabel` transfer cleanly to a document type.

### Negative / trade-offs

- **NEG-001**: Inline milestones are not reusable across cities; the same fact entered on a second city would be duplicated. This is acceptable while only Lviv owns history.
- **NEG-002**: The schema cannot enforce "source required for superlatives"; that gate is editorial, recorded in descriptions and the plan, not in validation.
- **NEG-003**: `year` as a string cannot be sorted numerically by the database without parsing; the frontend must parse the first year for `<time dateTime>` semantics and ordering is editorial.
- **NEG-004**: History content requires a static-site rebuild after publication; the field is not live until the exported frontend is redeployed.

## Alternatives considered

### Reuse the generic page-builder timeline

- **ALT-001**: Model history as a `timelinesOne` block on a generic `page`.
- **ALT-002**: Rejected because the page-builder timeline is not part of the `festivalCity` contract, is not citation-aware, and would detach the narrative from the canonical Lviv homepage document.

### Shared milestone documents with references

- **ALT-003**: Create a `milestone` document type and store `festivalCity.history[]` as ordered references.
- **ALT-004**: Rejected for this phase because only one Lviv narrative exists; references add editing overhead and a separate query surface without a reuse benefit. The inline model records an explicit migration path if cross-event reuse becomes necessary.

### Portable Text body for history

- **ALT-005**: Author history inside the existing `festivalCity.body` block content.
- **ALT-006**: Rejected because free-form Portable Text weakens chronology and citation semantics and cannot guarantee the ordered, year-labelled structure the homepage needs.

## Implementation notes

- **IMP-001**: Register `festivalMilestone` in `studio/schema-types.ts` and add `festivalCity.history` as an array of `festivalMilestone` members under the `content` group.
- **IMP-002**: Field validations: `year` required max 24, `title` required max 120, `description` required max 300, `sourceUrl` optional HTTPS-only, `sourceLabel` optional max 160.
- **IMP-003**: Add a `preview` to `festivalMilestone` selecting `year`, `title`, and `description` so array items are legible in Studio.
- **IMP-004**: Deploy the schema through the documented Studio workflow; run `pnpm --filter studio typecheck` after schema changes.
- **IMP-005**: Project `history[]` through `FESTIVAL_CITY_QUERY`, render it in a server-side `HistoryTimeline`, run `pnpm typegen`, and never hand-edit `frontend/sanity.types.ts`.
- **IMP-006**: Editorial governance: obtain approved source URLs or source notes for every milestone before publishing; require citation or qualification review for the 1997, 2013, and 2022–2024 claims.

## References

- **REF-001**: `docs/adr/0002-festival-content-model.md`
- **REF-002**: `docs/adr/0006-single-city-lviv-root-route.md`
- **REF-003**: `docs/plans/festival-history-facts.md`
- **REF-004**: `artifacts/facts.md`
