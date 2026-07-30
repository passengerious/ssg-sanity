# Plan: Single-city Lviv frontend pivot

Date: 2026-07-28
Status: Completed
Owner: Architect
Implementing agents: `nextjs-ssg-architect`, `sanity-groq-specialist`, `react-next-component-specialist`, `tailwind-ui-implementer`, `code-reviewer`

## Goal

Consolidate the complete 2026 Lviv festival experience onto `/`, remove multi-city navigation and route generation, and render the Sanity-managed Lviv locations, lineup, and partners in the existing cinematic landing composition with the fixed Heroic theme.

## Non-goals

- Do not rewrite the `festivalCity`, `location`, `artist`, or `partner` schemas.
- Do not create or mutate production Sanity content; that work is assigned separately.
- Do not add ISR, Draft Mode, runtime redirects, API routes, or another server dependency.
- Do not model artist performance dates or times in this phase.
- Do not remove legacy theme tokens that may support a future product change.

## Context

The approved July 2026 brief narrows the event to Lviv, 15–16 August 2026, at Bohdan Khmelnytskyi Culture and Recreation Park. The existing root page fetches a lightweight array of cities, renders city-selection cards, uses an `epic` default theme, and relies on hardcoded locations. The dynamic root slug route can separately render `festivalCity` documents.

ADR 0006 replaces that split frontend contract: `/` owns the only festival experience and `/:slug` returns to generic Sanity pages only.

## Relevant files

- `artifacts/ARCHITECTURE.md`
- `artifacts/CONTENT_LATEST.md`
- `artifacts/DESIGN_SYSTEM.md`
- `.stitch/DESIGN.md`
- `frontend/app/page.tsx`
- `frontend/app/(main)/[slug]/page.tsx`
- `frontend/app/sitemap.ts`
- `frontend/components/landing/LandingExperience.tsx`
- `frontend/components/landing/Hero.tsx`
- `frontend/components/landing/Header.tsx`
- `frontend/components/landing/LocationsGrid.tsx`
- `frontend/components/landing/ArtistsLineup.tsx`
- `frontend/components/landing/PartnersSection.tsx`
- `frontend/components/portable-text-renderer.tsx`
- `frontend/lib/festival-themes.ts`
- `frontend/sanity/queries/festival-city.ts`
- `frontend/sanity/lib/fetch.ts`
- `frontend/sanity.types.ts`

## Relevant ADRs

- ADR 0001 — static export remains required.
- ADR 0002 — festival content model remains accepted.
- ADR 0003 — superseded by ADR 0006.
- ADR 0004 — root festival route remains accepted but its multi-city landing behavior is superseded by ADR 0006.
- ADR 0005 — directory-style static export remains required.
- ADR 0006 — single-city Lviv root route.

## Assumptions

- The canonical published `festivalCity` slug is `lviv`.
- Sanity editors will leave only the approved Lviv festival document active for this event.
- Ordered references define the display order for locations, artists, and partners.
- The artist schema does not provide a reliable day/time field, so the frontend will render one ordered lineup rather than inventing an August 15/16 schedule.
- Approved fallback copy may come from `artifacts/CONTENT_LATEST.md` when build-time Sanity content is temporarily unavailable.

## Implementation steps

1. **Route and query consolidation**
   - Add a centralized homepage fetch wrapper that reuses the full Lviv festival-city query.
   - Change `frontend/app/page.tsx` to fetch one rich Lviv document.
   - Remove festival-city params, resolution, ticket fetching, and rendering from `frontend/app/(main)/[slug]/page.tsx`.
   - Preserve the technical placeholder param only when no generic Sanity pages exist, as required by static export.

2. **Single-city landing data contract**
   - Change `LandingExperience` to accept a nullable `FESTIVAL_CITY_QUERY_RESULT`.
   - Keep it server-rendered; remove its unnecessary client boundary.
   - Apply the `heroic` theme explicitly.
   - Pass Sanity locations, artists, partners, body, and event fields to their sections.

3. **Cinematic Hero refactor**
   - Remove city-card arrays, theme maps, city links, and the client directive.
   - Render one semantic Hero with one `h1`, event tagline, Lviv, dates, venue, and optional Sanity image.
   - Mark the Hero image as the sole high-priority above-the-fold image with responsive `sizes`.
   - Keep animation decorative and compatible with reduced-motion preferences.

4. **Program, lineup, and partner sections**
   - Replace hardcoded location cards, including the canceled Epic Stage, with `city.locations`.
   - Refactor lineup and partners from multi-city flatten/deduplication to direct single-city arrays.
   - Remove links and labels that route users to city detail pages.
   - Preserve accessible empty states for missing/unpublished references.
   - Render optional city Portable Text content on `/` without introducing a second `h1`.

5. **Navigation, theme, and discovery cleanup**
   - Remove the Cities navigation item and target valid homepage anchors.
   - Change the default festival theme to `heroic` while retaining both CSS token sets.
   - Remove `festivalCity` documents from sitemap URL generation so `/lviv/` is not advertised.
   - Update root metadata copy from two cities to the approved Lviv event.

6. **Design and architecture documentation alignment**
   - Update `.stitch/DESIGN.md` to replace the interactive city-toggle requirement with the fixed Heroic single-city experience.
   - Mark ADR 0003 superseded and annotate ADRs 0002/0004 where ADR 0006 narrows their frontend consequences.

7. **Generated types and verification**
   - Run TypeGen only if the GROQ query string changes.
   - Run frontend typecheck, lint, and static build.
   - Inspect static output for root Lviv content, retained generic/ticket routes, absent city route directories, and a sitemap without city detail URLs.

## Verification checklist

- [x] `pnpm typegen` passes after GROQ cleanup and link projection changes.
- [x] `pnpm --filter frontend typecheck` passes.
- [x] `pnpm --filter frontend lint` passes.
- [x] Production-like `pnpm --filter frontend build` passes with required public environment values.
- [x] `frontend/out/index.html` includes `Львів` and the approved 15–16 August event copy.
- [x] `frontend/out/lviv/` is absent.
- [x] `frontend/out/kamianets/` is absent.
- [x] `frontend/out/tickets/index.html` remains present.
- [x] `frontend/out/sitemap.xml` includes `/` and `/tickets/` but no festival-city detail URL.
- [x] No visible city-selection cards or `МІСТА` navigation item remain.
- [x] The homepage theme resolves to Heroic red `#BF2A26`, beige `#FFF0D9`, and dark gray `#232323`.
- [x] The homepage remains export-safe when the Lviv query returns `null`, using fallback Hero copy and section empty states.
- [x] Hero heading hierarchy, image alternative text, keyboard focus, and reduced-motion behavior passed code review; Portable Text `h1` blocks are defensively demoted on `/`.

## Risks

| Risk | Impact | Mitigation |
|---|---:|---|
| Lviv content is not published before build | High | Keep the root export resilient and visibly report empty sections; verify CMS publication before deployment |
| Artist dates cannot be represented by the unchanged schema | Medium | Render ordered lineup only; create a future schema ADR if daily schedule grouping becomes mandatory |
| Existing `/lviv/` links break | Low | Treat `/` as canonical; add a host redirect only if analytics or launch links show a real need |
| Generic page accidentally uses slug `lviv` | Low | Document the reserved slug and add editorial validation in a separate schema task if needed |
| `.stitch/DESIGN.md` remains multi-city | Medium | Update the source-of-truth design document in the same change |
| Static build fetches stale or unavailable Sanity content | Medium | Keep existing fetch error handling and run a build after content publication |

## Completion notes

Completed on 2026-07-28. `/` now fetches the full `lviv` festival document and renders a fixed-Heroic, server-rendered experience. Generic `/:slug` routes no longer resolve or export `festivalCity` documents, reserved legacy city slugs are excluded defensively, obsolete multi-city GROQ helpers and the duplicate city-detail component were removed, and sitemap/internal-link behavior now points festival discovery to `/`. TypeGen, frontend and Studio typechecks, frontend lint, production-like static build, output assertions, and final code review pass. Sanity content population remains an external editorial task.
