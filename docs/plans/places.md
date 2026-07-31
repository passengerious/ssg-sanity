# Plan: Lviv festival places and programme content

Date: 2026-07-28
Status: Content population and export verification complete; browser/staging smoke test pending
Owner: Architect
Implementing agents: `sanity-schema-architect`, `react-next-component-specialist`

## Goal

Publish and display the approved nine Lviv festival locations in the CMS-driven `LocationsGrid`, preserving their editorial order, descriptions, responsive presentation, and the fixed Heroic homepage architecture. The ninth `Український етно-фудкорт` Programme card remains CMS-owned; only its separate static food-court callout and `program-food.webp` are removed.

Record the approved two-day lineup as source content for the separate artist-population workflow without inventing schedule capabilities that the current schema cannot represent.

## Non-goals

- Do not hardcode a second location catalog in `LocationsGrid`; `festivalCity.locations[]` remains the source of truth.
- Do not rewrite the `location`, `festivalCity`, or `artist` schemas unless validation proves the existing model insufficient.
- Do not display a false per-day artist schedule: the current artist model has no date, time, or stage assignment field.
- Do not reintroduce the canceled Epic Stage or multi-city navigation.
- Do not add runtime data fetching, API routes, or dependencies.

## Context

The 20th anniversary festival takes place in Lviv on 15–16 August 2026 at Bohdan Khmelnytskyi Culture and Recreation Park. ADR 0006 makes the Lviv `festivalCity` document, with stable slug `lviv`, the content source for `/`.

`LocationsGrid` already accepts the projected `city.locations` array and renders every referenced document. The `location` schema already supports the required name, description, stage type, optional image, address, and map URL. The implementation work is therefore an editorial content population and reference-ordering task, complemented by visual support for the expanded catalog.

### Approved location order and content

| # | Name | Recommended stage type | Approved description |
|---:|---|---|---|
| 1 | Головна сцена Мрій | `main` | Головна музична артерія події. Протягом 20 років тут виступали автентичні артисти з понад 30 країн світу. Жива музика формує культурне ДНК нашого народу. |
| 2 | Алея Майстрів | `workshop` | Простір локальних виробників, крафтових брендів і дизайнерів: вишиванок, посуду, прикрас, декору та майстер-класів від народних майстрів. |
| 3 | Книжкова Країна Мрій | `other` | Нова контентна локація з поетичними читаннями сучасних авторів і затишною книжковою ярмаркою. |
| 4 | Простори Ремесел | `workshop` | Інтерактиви та майстер-класи з кераміки, ковальства, ткацтва, різьбярства й витинанки, де кожен може створити автентичний виріб. |
| 5 | Весільна Локація | `other` | Живе відтворення українських весіль з традиційними обрядами, символікою, строями та музичним супроводом, що єднає покоління. |
| 6 | Країна Містична | `other` | Територія духовного балансу й гармонії: йога, медитації та інші духовні практики. |
| 7 | Зона народних гулянь | `other` | Інтерактивний майданчик українських танців, співів і обрядових дійств у сучасному ритмі. |
| 8 | Дитяча галявина | `other` | Безпечний простір для наймолодших гостей з творчими заняттями, традиційними іграми, розвагами та піклуванням. |
| 9 | Український етно-фудкорт | `other` | Гастрономічна подорож регіонами України: сучасна національна кухня, фермерські продукти, напої та страви локальних виробників. |

### Approved lineup source content

| Day | Artists |
|---|---|
| 15 August (Saturday) | КОМУ ВНИЗ; БРАТИ ГАДЮКІНИ; МИРОСЛАВ КУВАЛДІН (екс-THE ВЙО) та ІБАШ |
| 16 August (Sunday) | БУРДОН; ГАЙДАМАКИ; ОЛЕГ СКРИПКА та гурт «ВВ» |

Site note: this is the first programme announcement; additional artists and guests will be announced later.

## Relevant files

- `docs/adr/0002-festival-content-model.md`
- `docs/adr/0006-single-city-lviv-root-route.md`
- `docs/plans/single-city-lviv-pivot.md`
- `artifacts/CONTENT_LATEST.md`
- `studio/schemas/documents/location.ts`
- `studio/schemas/documents/festival-city.ts`
- `frontend/sanity/queries/festival-city.ts`
- `frontend/components/landing/LocationsGrid.tsx`
- `frontend/components/landing/LandingExperience.tsx`
- `.stitch/DESIGN.md`

## Relevant ADRs

- ADR 0001 — static export remains required.
- ADR 0002 — `festivalCity` owns ordered references to locations, artists, and partners.
- ADR 0006 — the canonical Lviv `festivalCity` document supplies the root homepage.

## Implementation steps

1. **Validate the content contract**
   - Confirm the existing schema and festival-city query project all fields required for the active location cards.
   - Confirm no schema ADR is necessary; record `stageType` recommendations only as editorial guidance.

2. **Prepare and publish Sanity content**
   - Create or update the approved `location` documents using the content above.
   - Remove the canceled Epic Stage from the canonical Lviv document.
   - Add the approved location references to `festivalCity(slug=lviv).locations` in the documented order.
   - Create/update artist documents and add them in approved CMS order. Keep day grouping in editorial documentation until a schema decision supports it.

3. **Enhance the grid presentation**
   - Retain direct CMS rendering and its empty state.
   - Add clear, deterministic visual icons and tones for book, craft, wedding, mystical, folk, children, and food locations without matching on brittle free-text where a structured `stageType` applies.
   - Preserve semantic list markup, responsive 1/2/3-column layout, focus styles, and reduced-motion behavior.

4. **Verify content and export**
    - Confirm the published Lviv document resolves exactly nine active locations in the expected order, including the restored food-court reference as the final card.
   - Run TypeGen only if queries or schemas change.
   - Run frontend typecheck, lint, and production-like static build.
   - Inspect exported homepage content and test the Program anchor in a browser.

## Verification

- [x] Sanity schema/query review confirms no schema change is required.
- [x] Canonical Lviv document references the approved nine active locations in order.
- [x] Canceled Epic Stage is not referenced by the Lviv document.
- [x] `LocationsGrid` renders all approved active locations from CMS content without a hardcoded catalog.
- [x] TypeGen is not required because schemas and GROQ queries are unchanged.
- [x] `pnpm --filter frontend typecheck` passes.
- [x] `pnpm --filter frontend lint` passes.
- [x] Production-like `pnpm --filter frontend build` passes.
- [x] `frontend/out/index.html` contains the nine approved location titles and the food-court description after content publication; it does not contain `program-food.webp`.
- [ ] Manual desktop/mobile/keyboard check confirms Program navigation, responsive cards, and visible focus states.

## Risks

| Risk | Mitigation |
|---|---|
| A location is created but omitted from the Lviv reference list | Verify ordered references on the canonical `festivalCity` document before deployment. |
| Hardcoded frontend fallback diverges from CMS | Do not add a second catalog; render only `city.locations`. |
| Location names vary and defeat visual icon matching | Use stage type first and keep name matching as a bounded presentation fallback. |
| Editors need an exact daily artist schedule | Create a follow-up schema ADR for performance day/time/stage rather than encoding dates in prose or UI logic. |
| Published content is not rebuilt into the static host | Dispatch the documented GitHub Actions rebuild and complete staging smoke tests. |

## Completion notes

The plan was refactored from approved Ukrainian editorial source material on 2026-07-28. The existing content model and query project all required location fields, so no ADR, schema, query, or TypeGen change was required. `LocationsGrid` now has deterministic, accessible visual treatment for each approved category while retaining CMS ownership, the semantic list, and the empty state.

On 2026-07-29, four missing `location` documents were created and nine approved records were published. At that point, the canonical Lviv document referenced all nine locations in the documented order; the canceled Epic Stage remained unreferenced. Sanity MCP verification, live dev-response verification, and a fresh production-like static export confirmed that catalog.

On 2026-07-30, the food-court reference was mistakenly removed from the active programme. Its standalone location document was retained for rollback/history. On 2026-07-31, product clarified that only the separate food-court-specific static section/callout and `program-food.webp` were to be removed. The published location `a1e96ff0-f399-46ad-8c4f-1b5849c28c3b` was restored as the ninth/final reference on canonical Lviv document `e1841ff3-3179-44f8-b4cf-69508aa4fa3b` with key `locfoodcourt1`. Sanity and clean static-export verification confirm nine ordered locations, the food-court card and approved description, continued inclusion of `Книжкова Країна Мрій`, and no `program-food.webp` callout.
