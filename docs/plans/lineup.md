# Plan: Lviv lineup content and homepage presentation

Date: 2026-07-29
Status: Content and static-export verification complete; manual browser and staging smoke tests pending
Owner: Architect
Implementing agents: `sanity-schema-architect`, `react-next-component-specialist`

## Goal

Publish the verified six-artist Lviv lineup in Sanity, preserve its approved two-day editorial order, and render it on `/` as an accessible Heroic-theme programme with day groups, intentional no-photo states, a 20th-anniversary Oleg/VV highlight, and an announcement banner.

## Non-goals

- Do not add performance day, time, or stage fields to the `artist` schema in this MVP.
- Do not represent the day groups as accurate schedule data; no performance times or stage allocation will be displayed.
- Do not create a duplicate Oleg Skrypka/VV artist document or slug.
- Do not block content publication on artist photos or external links.
- Do not add a carousel, client-side state, runtime data fetching, or dependencies.

## Context

The single-city Lviv festival takes place on 15–16 August 2026. The existing `festivalCity.artists[]` field is an ordered array of artist references and the root homepage query already projects all fields required by the UI: `name`, `slug`, `genre`, `description`, `externalUrl`, and resolved `photo` image data.

The schema does not contain a performance-day field. For this pre-launch six-artist MVP, the reference order is the explicit editorial convention:

- references 1–3 render under **15 серпня, Субота**;
- references 4–6 render under **16 серпня, Неділя**.

`DAY_1_ARTIST_COUNT = 3` is the single code-owned boundary. Editors must keep the Day 1 block contiguous and first. Reordering the array changes the displayed day. A future schema ADR is required if day/time/stage data must become durable or independently editable.

## Approved artist order and content

| # | Day | Name | Manual slug | Genre | Description direction |
|---:|---|---|---|---|---|
| 1 | 15 August | КОМУ ВНИЗ | `komu-vnyz` | Фолк-готика / етно-рок | Підкреслити готично-фольклорне звучання та впізнавану українську сценічну мову. |
| 2 | 15 August | БРАТИ ГАДЮКІНИ | `braty-gadyukiny` | Етно-панк / рок-н-рол | Підкреслити культовий український рок-н-рол і живу фестивальну енергію. |
| 3 | 15 August | МИРОСЛАВ КУВАЛДІН та ІБАШ | `myroslav-kuvaldin-ta-ibash` | Військовий шансон / фолк-рок | Представити інструментально-бліндажний ансамбль і поєднання авторської енергії з фольк-роком. |
| 4 | 16 August | БУРДОН | `burdon` | Акустичний фолк | Підкреслити глибоке акустичне звучання та традиційні мотиви. |
| 5 | 16 August | ГАЙДАМАКИ | `haydamaky` | Козак-рок | Підкреслити поєднання українського фольклору з потужною рок-енергією. |
| 6 | 16 August | Олег Скрипка та гурт «ВВ» | `oleg-skrypka-ta-vv` | Етно-рок | Оновити наявний документ; наголосити на засновнику фестивалю, спадщині ВВ і 20-річчі «Країни Мрій». |

Artist photos are optional for this release. When an approved photo is later attached, it must include Ukrainian alternative text. `externalUrl` remains empty until an approved official Spotify, YouTube, or artist URL is provided.

### Announcement copy

> І це лише перша частина програми! Незабаром ми оголосимо нових артистів, музичні гурти та спеціальних гостей фестивалю.

## Relevant files

- `docs/adr/0002-festival-content-model.md`
- `docs/adr/0006-single-city-lviv-root-route.md`
- `docs/plans/places.md`
- `studio/schemas/documents/artist.ts`
- `studio/schemas/documents/festival-city.ts`
- `frontend/sanity/queries/festival-city.ts`
- `frontend/components/landing/LandingExperience.tsx`
- `frontend/components/landing/ArtistsLineup.tsx`
- `frontend/components/sanity-image.tsx`
- `.stitch/DESIGN.md`

## Relevant ADRs

- ADR 0001 — static export remains required.
- ADR 0002 — `festivalCity` owns ordered artist references; detailed schedule modeling is deferred.
- ADR 0006 — the root homepage renders the canonical Lviv festival; artist day grouping is not accurate schedule data without a future content-model decision.

## Implementation steps

1. **Validate and preserve the content contract**
   - Reuse the existing full artist projection; do not add a redundant GROQ query or TypeGen change.
   - Reuse the existing `oleg-skrypka-ta-vv` document and update its display name/biography instead of creating a duplicate.

2. **Populate Sanity content**
   - Create and publish the five missing artists with the names, manual Latin slugs, genres, and approved Ukrainian descriptions above.
   - Update and publish the existing Oleg/VV record.
   - Replace `festivalCity(slug=lviv).artists[]` with the approved six references in exact order.

3. **Render the ordered MVP groups**
   - Derive explicit Day 1 and Day 2 groups in `LandingExperience` from `DAY_1_ARTIST_COUNT = 3`.
   - Keep the grouping convention out of the generic artist card and document its editorial ordering constraint.
   - Render headings as `h2` lineup section → `h3` day → `h4` artist.

4. **Implement card and announcement presentation**
   - Use a separate 60/40 visual/text card layout.
   - Render genre and word-safe short biography excerpts.
   - Use an intentional Music-icon no-photo placeholder.
   - Highlight `oleg-skrypka-ta-vv` by slug with visible `20 років Країні Мрій` text and Heroic brand-red styling.
   - Render the approved announcement banner after the day groups.

5. **Verify content and static output**
   - Confirm six published Lviv references in exact order and no duplicates.
   - Confirm both day groups contain three artists.
   - Run frontend typecheck, lint, and a production-like static build.
   - Inspect `frontend/out/index.html` and perform desktop/mobile/keyboard checks after photos are optionally added later.

## Verification

- [x] Published Lviv document references exactly six approved artist records in order.
- [x] Existing Oleg/VV artist is reused, not duplicated.
- [x] Day 1 and Day 2 each render three artists from the named order convention.
- [x] No query/schema/TypeGen change is introduced for the MVP convention.
- [x] `pnpm --filter frontend typecheck` passes.
- [x] `pnpm --filter frontend lint` passes.
- [x] Production-like `pnpm --filter frontend build` passes.
- [x] `frontend/out/index.html` contains all six names, both day labels, the anniversary badge, and the announcement copy.
- [ ] Manual desktop/mobile/keyboard check passes; absent photos render intentional icon placeholders.

## Risks

| Risk | Mitigation |
|---|---|
| Studio reordering silently changes day assignment | Keep Day 1 references first and contiguous; document `DAY_1_ARTIST_COUNT = 3` in code and this plan. |
| A seventh artist is announced | Update the reference-order convention and UI boundary deliberately, or create a schedule-model ADR when editorial control is required. |
| Oleg/VV duplicate or slug collision | Reuse the current `oleg-skrypka-ta-vv` document. |
| Photos arrive late | Publish records without images; the UI uses an intentional Music-icon placeholder. |
| Unapproved external links are added | Leave `externalUrl` unset until an official URL is approved. |
| Static host does not update after content publication | Dispatch the documented rebuild/deployment workflow after the verified static export. |

## Completion notes

The six approved artists and their ordered references are published. The homepage renders the two explicit day groups, visible anniversary highlight, announcement banner, named nested day sections, and accessible no-photo states. Static output and local dev response were verified on 2026-07-29. The reference-order day grouping remains a temporary convention, not a durable performance schedule. Manual desktop/mobile/keyboard and staging smoke tests remain before deployment sign-off.
