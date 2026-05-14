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
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

Decision needed: whether to add `trailingSlash: true` based on `adm.tools` URL behavior.

## Current architecture target

Static export readiness for `frontend/next.config.mjs` is implemented. `output: 'export'` is enabled after removing runtime-only features, replacing API-backed newsletter submission with a static-safe disabled state, removing runtime redirects, and validating `frontend/out/` generation.

The landing and ticket MVP routes are static-safe. Before launch, the festival landing should move from the temporary `/landing` verification route to `/` per ADR 0004. Sanity-backed city routes are generated from published `festivalCity` slugs only; `/kamianets` and `/lviv` require corresponding published documents before they appear in `frontend/out/`.

## Implementation phases

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

| Risk                                                                                                        | Impact | Mitigation                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- | -----: | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Reintroducing runtime features after static export breaks static hosting                                    |   High | Keep API routes, Draft Mode, runtime redirects, and server actions out of the frontend                                                       |
| Draft preview/live editing is unavailable on a pure static export                                           |   High | Document editorial workflow and use publish-triggered rebuilds                                                                               |
| Newsletter currently depends on a server-side API route and secrets                                         |   High | Move to external backend/form service before static export                                                                                   |
| `/index` redirect currently depends on Next.js runtime redirect config                                      | Medium | Configure host-level redirect or static fallback                                                                                             |
| New Sanity slugs 404 until rebuild                                                                          | Medium | Add Sanity webhook or documented rebuild process                                                                                             |
| Build fails when Sanity is unavailable                                                                      | Medium | Keep build-time data fetching simple, typed, and observable in CI                                                                            |
| `adm.tools` URL/trailing-slash behavior is unknown                                                          | Medium | Confirm host behavior before final `next.config.mjs` settings                                                                                |
| Theme changes cause hydration mismatch                                                                      | Medium | Derive initial theme deterministically from route/static data                                                                                |
| Legacy inbound links to `/landing` may 404 after route removal                                              |    Low | Add a host-level redirect to `/` if `/landing` was externally shared                                                                         |
| Root SEO metadata drifts because the homepage is code-owned                                                 | Medium | Add a Sanity-editable landing/site settings model or document code-owned metadata before launch                                              |
| Landing artist and partner cards lose multi-city context when the same reference appears in multiple cities |    Low | Current MVP de-duplicates by `_id` and keeps first city context; aggregate city labels in a future enhancement if editorial needs require it |

## Open questions

1. Does `adm.tools` support host-level redirects, custom 404 pages, and trailing-slash clean URLs?
2. Which subscription/newsletter backend is approved for static hosting if newsletter signup is reintroduced?
3. Should a separate preview deployment remain server-capable for editorial previews?
4. What is the expected rebuild trigger after Sanity content changes?
5. Should homepage SEO metadata remain code-owned for MVP or move into a Sanity singleton before launch?

## Completion notes

In progress. Landing MVP, `ticketInfo`/`/tickets` MVP, root landing route, Phase 5 cinematic UI MVP, Phase 5.6 Sanity-backed landing artists/partners, and Phase 5.7 code consistency patterns are implemented as static-safe work. Static export compatibility is implemented for the current MVP and `frontend/out/` is generated. Frontend validation (`typecheck`, `lint`, `build`) passes after clearing stale `.next` route types. Phase 2 content modeling uses dedicated `festivalCity` documents with city-owned references to locations, artists, and partners. ADR 0004 is implemented: `/` renders the festival landing without requiring a generic Sanity `page` slug `index`, `/landing` is removed, and sitemap output includes `/` as the code-owned landing URL. Current build generates `/kamianets` and `/lviv` from Sanity slugs. Phase 5.7 added: queries barrel file (`sanity/queries/index.ts`), consistent fetch error handling, `SanityImage` wrapper, shared Tailwind pattern constants, `ErrorBoundary` for block rendering, and named export standardization for `Blocks`. Deployment automation, content rebuild workflow, homepage SEO ownership, real asset replacement, and final city content validation remain open.
