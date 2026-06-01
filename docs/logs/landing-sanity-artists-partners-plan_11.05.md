# Landing Sanity artists and partners plan

## 2026-05-11

### Task

Plan the fix for root landing content gaps: hardcoded artists and missing visible partners section.

### Agent/Subagent

- Agent: architect

### Summary

Verified that the current landing `ArtistsLineup` component still renders a hardcoded local `artists` array, while city pages already render artists from Sanity-backed `festivalCity.artists[]`. Also verified that the root landing composition has no dedicated visible partners section; the current `#partners` anchor points to the footer placeholder rather than Sanity partner content. Updated the implementation plan with Phase 5.6 to source landing artists and partners from existing `festivalCity` references, add typed GROQ projections, pass data through the static root landing route, and keep accessible empty states.

### Files changed

- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/landing-sanity-artists-partners-plan.md`

### Verification

- Read `frontend/components/landing/ArtistsLineup.tsx` and confirmed the hardcoded `artists` array.
- Read `frontend/components/landing/LandingExperience.tsx` and confirmed there is no partners section component.
- Read `frontend/components/festival-city/festival-city-page.tsx` and confirmed city pages already render Sanity-backed artists and partners.
- Read `frontend/sanity/queries/festival-city.ts` and confirmed the landing query currently returns city card data only.

### Risks

- Landing content can appear inconsistent with city pages until artists and partners are sourced from Sanity.
- GROQ expansion needs to preserve static export performance and avoid over-fetching full city documents.
- TypeGen must be run after query changes so component props stay aligned with Sanity projections.

### Follow-ups

- [x] Expand the landing GROQ contract to include artists and partners from `festivalCity` references.
- [x] Replace the hardcoded `ArtistsLineup` data with typed props.
- [x] Add a visible Sanity-backed `PartnersSection` to the landing.
- [x] Update header/footer anchor behavior so `#partners` targets the visible partner section.

## 2026-05-11 implementation

### Task

Implement the root landing artists/partners integration from Sanity.

### Agent/Subagent

- Agent: architect
- Subagents: `accessibility-ui-tester`, `code-reviewer`

### Summary

Expanded `LANDING_CITIES_QUERY` with a small projection for city-owned artists and partners, replaced the hardcoded landing artist cards with typed Sanity-derived cards, and added a visible `PartnersSection` before the footer. The landing now de-duplicates shared artist/partner references by `_id`, preserves first city context for labels, and renders accessible empty states if no referenced content is available. Anchor targets were cleaned up so `#artists` and `#partners` land on visible content sections.

### Files changed

- `frontend/sanity/queries/festival-city.ts`
- `frontend/sanity.types.ts`
- `frontend/components/landing/ArtistsLineup.tsx`
- `frontend/components/landing/PartnersSection.tsx`
- `frontend/components/landing/LandingExperience.tsx`
- `frontend/components/landing/Footer.tsx`
- `frontend/components/landing/Hero.tsx`
- `frontend/components/landing/LocationsGrid.tsx`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/landing-sanity-artists-partners-plan.md`

### Verification

- `pnpm typegen`
- `pnpm --filter frontend typecheck`
- `pnpm --filter frontend lint`
- `pnpm --filter frontend build`
- `git diff --check`
- Export inspection confirmed `frontend/out/index.html` includes `id="artists"`, `id="partners"`, the visible partners heading, Sanity artist content, and no old `Артист буде оголошений` placeholder text.

### Risks

- Shared artists or partners referenced by multiple cities currently keep only the first city/date context after de-duplication.
- Expanded landing Sanity data is serialized through the client landing component; acceptable for MVP, but static-only sections can be split into server components later if payload size becomes a concern.
- Build still emits the known non-fatal `--localstorage-file was provided without a valid path` warning.

### Follow-ups

- [ ] Manually smoke-test `/` in a browser for hover theme switching, anchor navigation, and focus rings.
- [ ] Aggregate multi-city labels for shared artists/partners if editorial needs require that context.
- [ ] Continue final city route content validation for `/kamianets` and `/lviv` before deployment.
