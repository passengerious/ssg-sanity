# Plan: Festival history and facts as a homepage selling point

Date: 2026-07-29
Status: Implemented and published; external source-link verification remains a pre-deployment follow-up
Owner: Architect
Proposed implementing agents: `sanity-schema-architect`, `sanity-groq-specialist`, `content-blocks-architect`, `react-next-component-specialist`, `seo-metadata-auditor`, `accessibility-ui-tester`

## Goal

Turn the approved material in `artifacts/facts.md` into a trustworthy, Ukrainian-language history layer across the Lviv homepage. The result should make the festival’s folk roots, cultural continuity, Oleg Skrypka/VV legacy, and long-running history a central reason to attend—without fabricating facts, weakening the 2026 event CTA, or compromising static export.

## Non-goals

- Do not wire the Markdown artifact directly into the frontend build.
- Do not invent milestones, dates, crowd figures, fundraising figures, sources, photos, or endorsements.
- Do not create a standalone `/history` route in this phase.
- Do not change homepage title/description/OG copy away from the 2026 Lviv event focus.
- Do not add `Claim`, `FactCheck`, or unsupported monetary structured data.
- Do not model a performance schedule, a new city, or client-side timeline animation.

## Source facts to preserve

`artifacts/facts.md` provides twelve editorial milestones, published in chronological order:

1. 1987 — first performance at the «Молодість» film festival.
2. 1991–1996 — Oleg Skrypka/VV creative exile in France and performances at the Avignon Festival.
3. 1997 — triumphant return; the «Музіка» album travelled to space with Leonid Kadenyuk.
4. 2000 — performance at the reception ceremony for US President Bill Clinton.
5. 2004 — first «Країна Мрій» festival at Spivoche Pole in Kyiv.
6. 2006 — recognition at «Молодість» and «Пектораль».
7. 2007 — participation in «Танці з зірками — 2».
8. 2011 — foundation of the «Країна Мрій» holding company.
9. 2013 — «Рок Січ» drew more than 100,000 fans.
10. 2016 — «День Києва. Свято вільних людей» and the frontline VV tour.
11. 2022–2024 — more than €2.5m raised at charity events.
12. 2024 — the «Країна Мрій» charity foundation and the 20th-anniversary festival.

The markdown file remains a source brief. The published record must preserve the supplied meaning and only soften or qualify language when an approved citation does not support a strong/superlative/financial claim.

## Context

- The homepage is a static-exported, server-rendered Lviv `festivalCity` experience at `/` (ADR 0006).
- Current About and Founder content is code-owned; the city already owns structured relationships for locations, artists, and partners (ADR 0002).
- The generic page-builder timeline is not appropriate as the primary implementation: it is not part of the `festivalCity` contract and does not express a year-semantic, citation-aware history model.
- The current homepage has no structured data. That is a separate SEO initiative; this plan limits itself to semantic visible history and source links.
- The facts include strong claims. In particular, the 1997 space-album statement, 2013 “largest”/100,000 statement, and 2022–2024 €2.5m statement require an approved visible source or editorially approved qualification before they can be published as assertions.

## Relevant files

- `artifacts/facts.md`
- `docs/adr/0002-festival-content-model.md`
- `docs/adr/0006-single-city-lviv-root-route.md`
- `studio/schemas/documents/festival-city.ts`
- `studio/schemas/schema.ts` and object-type registration files (inspect exact paths before editing)
- `frontend/sanity/queries/festival-city.ts`
- `frontend/sanity/lib/fetch.ts`
- `frontend/sanity.types.ts` (generated only)
- `frontend/components/landing/LandingExperience.tsx`
- `frontend/components/landing/AboutFestival.tsx`
- `frontend/components/landing/Founder.tsx`
- `frontend/components/portable-text-renderer.tsx`
- `.stitch/DESIGN.md`

## ADR assessment

**ADR 0007 was accepted before implementation.** The resulting field, query contract, editor workflow, and reusable component boundary are now deployed.

Propose ADR 0007 before schema work with this decision:

- `festivalCity.history` is an ordered array of inline `festivalMilestone` objects.
- Each milestone has a display year/range, short title, short Ukrainian description, optional source URL, and optional source label/note.
- History remains city-owned and inline because it is a single Lviv narrative for this phase; shared milestone documents are deferred until reuse across multiple events is an actual need.
- Source/qualification requirements are editorial governance rules recorded in the field descriptions and plan; the UI exposes an approved citation when present.

## Proposed content and interaction model

### Sanity model

Create a `festivalMilestone` object type with:

| Field | Type | Rules |
| --- | --- | --- |
| `year` | string | Required; max 24; supports `1987`, `1991–1996`, and `2022–2024`. |
| `title` | string | Required; max 120; concise Ukrainian milestone label. |
| `description` | text/string | Required; max 300; approved Ukrainian wording only. |
| `sourceUrl` | URL | Optional in schema but required by editorial gate for high-risk claims; HTTPS-only when populated. |
| `sourceLabel` | string | Optional; max 160; identifies the source for visitors. |

Add `history` to `festivalCity` as an editor-ordered array of `festivalMilestone` objects. Add field guidance: avoid unsupported superlatives, add a source for numerical/financial and unusual claims, and do not add facts outside the approved editorial brief without review.

### Homepage placement

1. **Founder section:** retain the existing emotionally-led mission, but review its “понад 35 років” phrasing against the 1987 anchor. Do not add unsupported exact duration.
2. **New principal section:** insert a server-rendered **Історія та спадщина** section after Founder and before Programme. This is the home for the seven milestones and the main proof of legacy.
3. **About section:** optionally add one short, grounded bridge such as “Фестиваль з 2004 року” only after the 2004 record is published. It must link/anchor to the timeline rather than duplicate the full fact.
4. **Hero:** keep LCP/CTA content focused on Lviv 2026; no carousel, dense dates, or extra data-fetching.

### Component shape and semantics

Create a server component such as `frontend/components/landing/HistoryTimeline.tsx`:

- Input: the generated festival-city `history` projection; no separate fetch or client state.
- Section uses `id="history"` and `aria-labelledby="history-heading"`; add a Header anchor only if product approves a visible navigation item.
- Render `<h2>` → chronological `<ol>` → `<li>` items with `<time dateTime="YYYY">` using a parsed/validated first year for ranges, a `<h3>`, description, and optional visible source link.
- Keep a static vertical timeline/folk ornament treatment in the poster-led red/green system; no scroll-triggered JS.
- Render nothing when history is not published, rather than presenting unverified placeholder claims.
- External source links must retain `target="_blank"`, `rel="noopener noreferrer"`, and Ukrainian new-tab screen-reader context.

## Implementation steps

1. **Source verification and editorial approval gate**
   - Obtain approved source URLs or source notes for every milestone before publishing.
   - Require citation/qualification review for 1997, 2013, and 2022–2024; review the strong 1987 and 2000 assertions as well.
   - Agree final Ukrainian titles/descriptions. Do not silently change the source brief in code.

2. **Record ADR 0007**
   - Draft, review, and accept ADR 0007 before schema changes.
   - Document inline city-owned milestones, citation handling, static renderer, no standalone history route, and future migration path if cross-event reuse becomes necessary.

3. **Extend the content model**
   - Add/register `festivalMilestone` and `festivalCity.history` with validation, preview, and editorial guidance.
   - Deploy the schema through the documented Studio workflow.

4. **Extend the homepage data contract**
   - Add the ordered `history[]` projection to `FESTIVAL_CITY_QUERY`.
   - Run `pnpm typegen`; never hand-edit `frontend/sanity.types.ts`.
   - Keep the existing homepage fetch helper and static-generation flow.

5. **Publish verified history**
   - Create the seven canonical Lviv milestone items in order and publish the updated Lviv document.
   - Check exact wording against `artifacts/facts.md`, applying only approved qualification/source labels.

6. **Implement the narrative experience**
   - Build the accessible server-rendered timeline and wire it into `LandingExperience` between Founder and LocationsGrid.
   - Add the optional grounded About bridge only if approved and supported by the published 2004 milestone.
   - Update `.stitch/DESIGN.md` so visual designers retain the history section’s poster-led colour and folk/heritage purpose.

7. **Validate and document**
   - Verify semantics, citations, source links, no duplicate timeline content, and export output.
   - Keep homepage metadata event-focused; do not add a history route or sitemap item.
   - Update plan, monthly log, ledger, and ADR status.

## Verification checklist

- [x] ADR 0007 was accepted before schema changes.
- [x] The twelve approved facts were published from the user-supplied editorial brief; strong 1997, 2013, and 2022–2024 statements are visibly qualified as festival editorial material.
- [ ] Add approved public source URLs for high-risk claims before public deployment if available.
- [x] `festivalCity.history` preserves twelve items in editorial order.
- [x] Schema deployment and `pnpm typegen` pass.
- [x] Homepage query result includes typed history; no second fetch is introduced.
- [x] The root page renders one history section with one `h2`, an ordered list, `h3` milestones, and machine-readable `<time>` elements.
- [x] Exactly one `<h1>` remains in the static root output.
- [x] Source links are safe and announce new-tab behaviour when `sourceUrl` is supplied; qualified editorial labels are visible for currently source-less high-risk statements.
- [x] Homepage title, description, canonical, and sitemap remain focused on the 2026 event and unchanged.
- [x] `pnpm --filter frontend typecheck` passes.
- [x] `pnpm --filter studio typecheck` passes.
- [x] `pnpm --filter frontend lint` passes.
- [x] Production-like static build passes and `frontend/out/index.html` contains the published timeline.
- [ ] Desktop/mobile/keyboard and reduced-motion checks pass.

## Risks

| Risk | Mitigation |
| --- | --- |
| Strong historical or financial claim is not sourceable | Do not publish it unchanged; use approved qualified wording or omit it pending evidence. |
| Facts are duplicated across the homepage, future page, and artist bio | Make the homepage timeline the canonical MVP home; do not create `/history` now. |
| Free-form Portable Text weakens chronology/citation semantics | Use the dedicated typed city-owned array and server component. |
| Timeline pushes Programme/Line-up too far down | Keep descriptions concise, preserve header anchors, and test mobile scroll/navigation. |
| Future multi-city reuse needs shared history records | ADR 0007 records an explicit migration path; avoid premature references now. |
| Schema addition drifts from static export | Reuse the existing build-time city query and run the full export verification. |

## Completion notes

Implemented after product approval. ADR 0007, the schema, deployment, TypeGen output, published Lviv history, and static server-rendered timeline are complete. The user-provided editorial brief is the current approved source; public source URLs for the qualified 1997, 2013, and 2022–2024 claims remain a follow-up before deployment. Manual desktop/mobile/keyboard and staging smoke tests remain.
