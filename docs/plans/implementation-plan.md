# Plan: Festival static site implementation

Date: 2026-05-07  
Updated: 2026-05-11
Status: Draft  
Owner: Architect  
Implementing agents: `nextjs-ssg-architect`, `sanity-schema-architect`, `sanity-groq-specialist`, `tailwind-ui-implementer`, `accessibility-ui-tester`, `deployment-vercel-engineer`, `test-automator`

## Goal

Build a Sanity-driven, statically exported Next.js festival site for `adm.tools` hosting, with city-specific experiences for `/kamianets` and `/lviv`, cinematic Tailwind UI, and deployment automation for static assets.

## Non-goals

- Do not rely on Next.js server runtime features after static export is enabled.
- Do not expose private API keys in client-side code.
- Do not redesign the entire Schema UI starter beyond the festival-specific experience.
- Do not introduce ISR, server-side rendering, or runtime preview unless documented by a future ADR.

## Context

Relevant files:

- `README.md` — monorepo layout, workspace commands, deploy notes, environment variables.
- `frontend/next.config.mjs` — export, image, redirect, and static build configuration.
- `frontend/app/(main)/[slug]/page.tsx` — existing static page route.
- `frontend/app/page.tsx` — root route; owner of the festival landing experience before launch.
- `frontend/app/(main)/blog/[slug]/page.tsx` — existing static blog route.
- `frontend/app/api/**` — current API route handlers that are incompatible with static export.
- `frontend/app/actions/**` — current server actions that are incompatible with static export.
- `frontend/app/(main)/layout.tsx` — current draft mode/live preview integration point.
- `frontend/components/blocks/forms/newsletter.tsx` — current newsletter form that posts to `/api/newsletter`.
- `studio/schemas/**` — Sanity schemas for city, location, artist, partner, and content blocks.
- `frontend/sanity/queries/**` — GROQ query contracts consumed by static pages.
- `frontend/components/landing/ArtistsLineup.tsx` — currently hardcoded landing lineup component; must become Sanity-backed.
- `frontend/components/landing/LandingExperience.tsx` — root landing composition; currently has no visible landing partners section.
- `frontend/components/festival-city/festival-city-page.tsx` — already renders city-owned Sanity artists and partners for city routes.

Relevant ADRs:

- `docs/adr/0001-static-export-to-adm-tools.md` — static export to `adm.tools`, including the loss of runtime APIs, draft preview, ISR, and Next.js redirects.
- `docs/adr/0002-festival-content-model.md` — dedicated `festivalCity` documents with city-owned references.
- `docs/adr/0003-root-slug-route-contract.md` — one root `/:slug` route where `festivalCity` resolves before generic `page`.
- `docs/adr/0004-root-festival-landing-route.md` — root `/` renders the festival landing rather than requiring a generic Sanity `page` with slug `index`.

## Key finding: `output: 'export'` is not the first safe code change

### Step rationale

Setting `output: 'export'` is the foundation of the static hosting architecture because it changes Next.js from a server-capable app into a pre-rendered `out/` directory suitable for static hosts such as `adm.tools`.

### Current blockers

The current frontend still contains features that are incompatible with static export:

- `frontend/app/api/newsletter/route.ts` uses a Next.js API route and server-side Resend secret.
- `frontend/app/api/draft-mode/**` uses route handlers and `draftMode()`.
- `frontend/app/actions/disable-draft-mode.ts` uses a server action.
- `frontend/app/(main)/layout.tsx` uses draft mode/live preview behavior.
- `frontend/next.config.mjs` defines `async redirects()`, which static export does not apply.

### Required action

Add `output: 'export'` to `frontend/next.config.mjs` only after the blockers above are removed or replaced:

```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

Decision needed: whether to add `trailingSlash: true` based on `adm.tools` URL behavior.

## Current architecture target

Static export readiness for `frontend/next.config.mjs` is implemented. `output: 'export'` is enabled after removing runtime-only features, replacing API-backed newsletter submission with a static-safe disabled state, removing runtime redirects, and validating `frontend/out/` generation.

The landing and ticket MVP routes are static-safe. Before launch, the festival landing should move from the temporary `/landing` verification route to `/` per ADR 0004. Sanity-backed city routes are generated from published `festivalCity` slugs only; `/kamianets` and `/lviv` require corresponding published documents before they appear in `frontend/out/`.

## Implementation phases

### Phase 0 — Architecture decision and export readiness audit

Owner: `nextjs-ssg-architect` with `deployment-vercel-engineer`

1. Create ADR: static export to `adm.tools`.
2. Confirm whether `adm.tools` supports:
   - custom 404 page,
   - redirect rules for `/index` → `/`,
   - clean URLs and/or trailing slashes,
   - GitHub Actions upload credentials and deployment command.
3. Audit all Next.js server runtime usage:
   - route handlers,
   - server actions,
   - `draftMode()`, `cookies()`, `headers()`,
   - runtime redirects,
   - any non-static metadata/image generation.
4. Decide editorial workflow after removing draft preview:
   - publish in Sanity,
   - trigger rebuild via webhook or scheduled CI,
   - deploy static `out/` assets.

Exit criteria:

- ADR is accepted or explicitly marked proposed with implementation approval.
- Static-export blockers are listed with owners.
- Deployment behavior of `adm.tools` is known.

### Phase 1 — Static export compatibility foundation

Owner: `nextjs-ssg-architect`

Status: Implemented for current MVP routes. Deployment workflow and content rebuild automation remain follow-up work.

1. Replace live/draft data-fetching paths with build-time Sanity fetches.
2. Remove or isolate draft mode routes, actions, and UI from the static production build.
3. Replace `/api/newsletter` with a static-host-compatible option:
   - external form provider,
   - separate serverless endpoint outside this Next.js export,
   - or disabled newsletter block until a safe backend exists.
4. Remove `async redirects()` from `frontend/next.config.mjs`.
5. Move `/index` → `/` handling to `adm.tools` redirect rules, or create a static fallback page if host redirects are unavailable.
6. Add `output: 'export'` to `frontend/next.config.mjs`.
7. Keep `images.unoptimized: true` for Sanity CDN images.
8. Decide and configure `trailingSlash` if required by `adm.tools`.

Exit criteria:

- `pnpm --filter frontend build` completes and creates `frontend/out/`.
- `frontend/out/` has no `api/` runtime dependency.
- Home, city pages, blog pages, sitemap, robots, and 404 are exported.

### Phase 2 — Sanity festival content model

Owner: `sanity-schema-architect` with `content-blocks-architect`

Status: Schema implementation complete. `ticketInfo` was completed in Phase 1 and is intentionally skipped here. GROQ/static route integration remains Phase 3 work.

1. Model festival city content for Kamianets and Lviv.
2. Use a dedicated `festivalCity` document type for city pages, per ADR 0002.
3. Add or adapt schemas:
   - `Location`: name, description, stage type.
   - `Artist`: name, photo, description, city/date/stage references if needed, ticket link.
   - `Partner`: logo, partnership level, URL, display order.
4. Add validation rules for required editorial fields and stable slugs.
5. Run Sanity TypeGen after schema and query changes.
6. MVP ticket content:
   - completed in Phase 1 via the `ticketInfo` singleton,
   - no additional ticket schema changes required in Phase 2.

Exit criteria:

- Editors can create the required festival content without hard-coded frontend data.
- Generated frontend types reflect schema/query changes.

### Phase 3 — GROQ and static route contracts

Owner: `sanity-groq-specialist`

Status: MVP implemented. Root `/:slug` route contract is documented in ADR 0003: `festivalCity` resolves before generic `page`, and static params are generated from Sanity slugs only. `/` is outside this dynamic route contract and is owned by the festival landing route per ADR 0004. Phase 4/5 remain responsible for theme polish and cinematic city UI.

1. Centralize city-specific GROQ queries under `frontend/sanity/queries/**`.
2. Ensure page generation resolves `festivalCity` content before generic `page` content for shared root slugs.
3. Ensure `generateStaticParams()` includes all required Sanity city/page slugs at build time and excludes hardcoded city fallbacks.
4. Define query projections for:
   - city theme/mood,
   - hero content,
   - locations/stages,
   - artists,
   - partners,
   - ticket CTA links,
   - SEO metadata.
5. Avoid duplicated query fragments where possible.
6. Keep `/` out of generic slug static params; do not require a generic `page` document with slug `index` for the homepage.

Exit criteria:

- Static build can produce both city routes from Sanity content.
- Missing content has safe fallbacks or clear build-time errors.

### Phase 4 — Theme system and layout logic

Owner: `tailwind-ui-implementer` with `react-next-component-specialist`

Status: MVP implemented. Festival theme keys are centralized, theme application is scoped to `.festival-theme`, city pages use Sanity `themeKey`, and landing city cards link to city routes while preserving hover/focus theme preview. Header/footer remain neutral by decision.

1. Implement city themes via CSS variables and Tailwind tokens.
2. Define supported themes, for example:
   - `data-theme="epic"` / Natural Green palette,
   - `data-theme="heroic"` / Brand Red palette.
3. Create or update the festival theme shell so the active landing selection or city data sets `data-theme`.
4. Keep the theme logic compatible with static export and client-side navigation.
5. Avoid coupling visual state to server runtime APIs.

Exit criteria:

- `/kamianets` and `/lviv` render with distinct theme variables.
- Theme switching works during client-side navigation.
- No hydration mismatch from route/theme detection.

### Phase 5 — Cinematic UI development

Owner: `tailwind-ui-implementer` with `accessibility-ui-tester`

Status: MVP implemented. Landing and festival city pages now use larger cinematic type, image-backed cards, theme-colored CTAs, decorative section rhythm, stronger location/artist/partner treatments, and reduced-motion-safe transitions. Accessibility review found no remaining blockers after semantic list, heading, contrast, and keyboard-focus fixes.

1. Hero section:
   - interactive city selection cards,
   - hover/focus preview of the festival mood,
   - accessible keyboard states matching hover behavior.
2. Cinematic sections:
   - deep dark backgrounds,
   - large readable typography,
   - responsive spacing and composition.
3. Motion:
   - use existing `motion` dependency where appropriate,
   - respect reduced-motion preferences.
4. Location map/block:
   - accordion or grid for stages/locations,
   - unique visual treatment for `isEpicStage`.
5. CTA buttons:
   - city-themed color variants,
   - clear ticket link behavior,
   - safe external link attributes where needed.

Exit criteria:

- UI is responsive, keyboard usable, and visually consistent.
- Interactive elements have accessible names and focus indicators.

### Phase 5.5 — Root festival landing route

Owner: `nextjs-ssg-architect` with `react-next-component-specialist` and `seo-metadata-auditor`

Status: Implemented. ADR 0004 accepts `/` as the canonical festival landing before launch; the temporary `/landing` route has been removed to avoid duplicate canonical content.

1. Replace the generic Sanity `page` slug `index` dependency in `frontend/app/page.tsx` with the festival landing experience.
2. Fetch landing dependencies at build time only, such as city cards from `festivalCity` documents and ticket CTA content from `ticketInfo`.
3. Keep `FestivalThemeShell` scoped to styling/layout only; content selection remains in `LandingExperience` props/state or route-level Sanity data.
4. Remove or repurpose `frontend/app/landing/page.tsx` after `/` serves the landing to avoid duplicate canonical content in static export.
5. Add or confirm static metadata for `/`, including title, description, canonical URL, and Open Graph defaults.
6. Confirm sitemap output emits `/` as the landing URL and does not emit `/landing` unless there is an intentional non-canonical preview route.

Exit criteria:

- `frontend/out/index.html` contains the festival landing experience.
- `/` no longer depends on a generic Sanity `page` document with slug `index`.
- `/landing` is removed, repurposed, or excluded from canonical discovery.
- Static build, typecheck, and lint pass.

### Phase 5.6 — Landing Sanity artists and partners fix

Owner: `sanity-groq-specialist` with `react-next-component-specialist`, `tailwind-ui-implementer`, and `accessibility-ui-tester`

Status: Implemented. The root landing now sources artist and partner cards from existing `festivalCity.artists[]` and `festivalCity.partners[]` references, de-duplicates cards by `_id`, and renders accessible empty states when referenced content is unavailable.

1. Update the landing GROQ contract to fetch Sanity-backed artist and partner data from the existing `festivalCity` documents:
   - keep `festivalCity` as the source of city-owned artists and partners per ADR 0002,
   - preserve city context (`cityName`, slug, theme key) for grouped or labeled landing cards,
   - de-duplicate shared artists/partners by `_id` if the same reference appears in multiple cities,
   - keep the projection small enough for static export and landing performance.
2. Replace the hardcoded `artists` array in `frontend/components/landing/ArtistsLineup.tsx` with props derived from the landing query.
3. Add a visible landing partners section, preferably as a reusable `PartnersSection` component under `frontend/components/landing/`, using Sanity `partner` references and accessible list/card markup.
4. Update `LandingExperience` and `frontend/app/page.tsx` data flow so the root landing passes artists and partners to their sections without client-side fetching.
5. Update generated Sanity query types after GROQ changes and keep component props typed from `sanity.types.ts`.
6. Keep empty states editorially safe:
   - artists: “Артистів буде оголошено.”
   - partners: “Партнерів буде оголошено.”
7. Keep header navigation accurate: `#artists` should target the Sanity-backed artist section, and `#partners` should target the visible partner section rather than only the footer.

Exit criteria:

- Root landing artist cards render from Sanity data, not a hardcoded local constant.
- Root landing has a visible partners section using Sanity partner references.
- City pages continue to render their existing artist and partner sections from `festivalCity` data.
- `pnpm typegen`, `pnpm --filter frontend typecheck`, `pnpm --filter frontend lint`, and `pnpm --filter frontend build` pass.
- Exported `/` includes artist/partner content or accessible empty states without requiring runtime APIs.

### Phase 5.7 — Code consistency and pattern standardization

Owner: `react-next-component-specialist` with `code-reviewer`

Status: Implemented. All six pattern standardization tasks completed on 2026-05-12.

1. **Component Export Patterns — Standardize on named exports**
   - Landing components currently use `export const` while block components use `export default`.
   - Standardize all components on named exports for better tree-shaking and explicit APIs.
   - Optionally re-export a default alias for backward compatibility during migration.
   - Affected areas: `frontend/components/blocks/**/*.tsx`, `frontend/components/ui/**/*.tsx`.

2. **GROQ Query Patterns — Barrel exports and naming convention**
   - 2.1 Add `frontend/sanity/queries/index.ts` as a barrel file to centralize query imports.
   - 2.2 Standardize query export names to `SCREAMING_SNAKE_CASE` (e.g., `PAGE_QUERY`, `LANDING_CITIES_QUERY`) and deprecate mixed `camelCase` names.
   - Update all consumers (fetch functions, route files) to import from the barrel.

3. **Data Fetching Patterns — Consistent error handling**
   - Currently only `fetchSanityTicketInfo` wraps its call in `try/catch`.
   - Add graceful `try/catch` wrappers to all `fetchSanity*` functions in `frontend/sanity/lib/fetch.ts`.
   - Return `null` on failure and log a contextual warning; avoid throwing unhandled errors during static generation.

4. **Error Handling Patterns — Unified error boundary strategy**
   - Block rendering (`components/blocks/index.tsx`) currently falls back to a silent empty `<div>` with `console.warn`.
   - Replace silent fallback with an `ErrorBoundary` wrapper around each block render.
   - Provide a visible fallback UI (e.g., `<BlockError type={block._type} />`) in production so missing blocks do not silently disappear.

5. **Tailwind CSS Patterns — Extract recurring combinations**
   - Recurring token combinations were identified across landing sections:
     - Section padding: `px-4 py-10 md:px-12 md:py-16`
     - Decorative divider: three-part rule with `bg-secondary`
     - Card hover: `transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none`
     - Focus ring: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
   - Extract these into `frontend/lib/tailwind-patterns.ts` (or similar) as shared constants or small helper functions.
   - Keep Tailwind class strings in source for JIT discovery; constants can be string variables, not utility classes.

6. **Image Handling Patterns — Create `SanityImage` wrapper**
   - Image rendering logic is duplicated across `ArtistsLineup`, `Hero`, `FestivalCityPage`, and other components.
   - Create a reusable `SanityImage` component that handles:
     - Sanity CDN `src` with unoptimized Next.js Image
     - Placeholder fallback (`/images/placeholder.svg`)
     - Proper `alt` handling (CMS alt when real image, empty string when placeholder)
     - Standard `sizes` and `fill` behavior
   - Replace ad-hoc `Image` usages with the wrapper where Sanity asset data is passed.

**What was not included (intentionally lower priority):**
- Schema shared-fields registry — the Studio already extracts shared fields into `blocks/shared/*.ts`; editorial-facing, not frontend-blocking.
- No global state — this is a strength for a static site; no action needed.

Exit criteria:

- All components use named exports consistently.
- All GROQ queries are importable from a single barrel file with standardized naming.
- All `fetchSanity*` functions handle failures gracefully without unhandled errors.
- Block rendering uses error boundaries instead of silent empty `<div>` fallbacks.
- Recurring Tailwind combinations are extracted into shared constants.
- A reusable `SanityImage` component exists and replaces duplicated image logic.
- `pnpm --filter frontend typecheck`, `pnpm --filter frontend lint`, and `pnpm --filter frontend build` pass.

### Phase 6 — Integration and UX polish

Owner: `react-next-component-specialist`

1. Configure `next/link` usage for smooth client-side navigation between city pages.
2. Ensure city theme transitions are smooth and do not depend on page reloads.
3. Integrate the chosen static-safe newsletter or subscription flow.
4. Confirm Sanity image rendering and LCP image priorities.
5. Confirm SEO metadata for city pages, sitemap, robots, and canonical URLs.
6. Confirm root landing metadata does not depend on a missing generic `page` document.

Exit criteria:

- Navigation, theme transitions, forms, images, and metadata work in local static build output.

### Phase 7 — Testing, export validation, and deployment

Owner: `test-automator` with `deployment-vercel-engineer`

1. Run verification commands from the repository root:
   - `pnpm typecheck`
   - `pnpm --filter frontend build`
2. Inspect `frontend/out/` for expected static files:
   - `index.html`,
   - `kamianets/index.html` or host-compatible equivalent,
   - `lviv/index.html` or host-compatible equivalent,
   - `404.html`,
   - `sitemap.xml`,
   - `robots.txt`.
3. Confirm there is no required `api/` runtime in the exported output.
4. Add GitHub Actions workflow to build and upload static files to `adm.tools`.
5. Add Sanity publish webhook or manual rebuild workflow if content freshness requires it.
6. Document deployment and rollback steps.

Exit criteria:

- Static deployment succeeds.
- Content update workflow is documented.
- Rollback procedure is known.

## Verification checklist

- [x] ADR for static export is created and accepted/proposed for approval.
- [x] `frontend/next.config.mjs` uses `output: 'export'` only after runtime blockers are resolved.
- [x] `pnpm typecheck` passes.
- [x] `pnpm --filter frontend build` passes.
- [x] `frontend/out/` contains expected route files.
- [x] No exported route depends on Next.js API routes or server actions.
- [ ] Sanity images render from `cdn.sanity.io` with unoptimized Next image output.
- [x] `/` renders the festival landing without requiring a generic Sanity `page` document with slug `index`.
- [x] `/landing` is removed, repurposed, or excluded from canonical discovery after the root route swap.
- [x] `/` renders artists from Sanity data instead of the hardcoded `ArtistsLineup` array.
- [x] `/` includes a visible Sanity-backed partners section.
- [ ] `/kamianets` and `/lviv` render city-specific data and themes.
- [ ] Newsletter/subscription flow works without exposing secrets.
- [x] Accessibility review passes for Phase 5 hero cards, buttons, links, lists, and heading hierarchy.
- [x] SEO metadata routes build statically (`robots.txt`, `sitemap.xml`).
- [ ] GitHub Actions deployment to `adm.tools` is tested.

## Risks

| Risk | Impact | Mitigation |
|---|---:|---|
| Reintroducing runtime features after static export breaks static hosting | High | Keep API routes, Draft Mode, runtime redirects, and server actions out of the frontend |
| Draft preview/live editing is unavailable on a pure static export | High | Document editorial workflow and use publish-triggered rebuilds |
| Newsletter currently depends on a server-side API route and secrets | High | Move to external backend/form service before static export |
| `/index` redirect currently depends on Next.js runtime redirect config | Medium | Configure host-level redirect or static fallback |
| New Sanity slugs 404 until rebuild | Medium | Add Sanity webhook or documented rebuild process |
| Build fails when Sanity is unavailable | Medium | Keep build-time data fetching simple, typed, and observable in CI |
| `adm.tools` URL/trailing-slash behavior is unknown | Medium | Confirm host behavior before final `next.config.mjs` settings |
| Theme changes cause hydration mismatch | Medium | Derive initial theme deterministically from route/static data |
| Legacy inbound links to `/landing` may 404 after route removal | Low | Add a host-level redirect to `/` if `/landing` was externally shared |
| Root SEO metadata drifts because the homepage is code-owned | Medium | Add a Sanity-editable landing/site settings model or document code-owned metadata before launch |
| Landing artist and partner cards lose multi-city context when the same reference appears in multiple cities | Low | Current MVP de-duplicates by `_id` and keeps first city context; aggregate city labels in a future enhancement if editorial needs require it |

## Open questions

1. Does `adm.tools` support host-level redirects, custom 404 pages, and trailing-slash clean URLs?
2. Which subscription/newsletter backend is approved for static hosting if newsletter signup is reintroduced?
3. Should a separate preview deployment remain server-capable for editorial previews?
4. What is the expected rebuild trigger after Sanity content changes?
5. Should homepage SEO metadata remain code-owned for MVP or move into a Sanity singleton before launch?

## Completion notes

In progress. Landing MVP, `ticketInfo`/`/tickets` MVP, root landing route, Phase 5 cinematic UI MVP, Phase 5.6 Sanity-backed landing artists/partners, and Phase 5.7 code consistency patterns are implemented as static-safe work. Static export compatibility is implemented for the current MVP and `frontend/out/` is generated. Frontend validation (`typecheck`, `lint`, `build`) passes after clearing stale `.next` route types. Phase 2 content modeling uses dedicated `festivalCity` documents with city-owned references to locations, artists, and partners. ADR 0004 is implemented: `/` renders the festival landing without requiring a generic Sanity `page` slug `index`, `/landing` is removed, and sitemap output includes `/` as the code-owned landing URL. Current build generates `/kamianets` and `/lviv` from Sanity slugs. Phase 5.7 added: queries barrel file (`sanity/queries/index.ts`), consistent fetch error handling, `SanityImage` wrapper, shared Tailwind pattern constants, `ErrorBoundary` for block rendering, and named export standardization for `Blocks`. Deployment automation, content rebuild workflow, homepage SEO ownership, real asset replacement, and final city content validation remain open.
