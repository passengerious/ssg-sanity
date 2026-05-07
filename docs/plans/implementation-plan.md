# Plan: Festival static site implementation

Date: 2026-05-07  
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
- `frontend/app/(main)/blog/[slug]/page.tsx` — existing static blog route.
- `frontend/app/api/**` — current API route handlers that are incompatible with static export.
- `frontend/app/actions/**` — current server actions that are incompatible with static export.
- `frontend/app/(main)/layout.tsx` — current draft mode/live preview integration point.
- `frontend/components/blocks/forms/newsletter.tsx` — current newsletter form that posts to `/api/newsletter`.
- `studio/schemas/**` — Sanity schemas for city, location, artist, partner, and content blocks.
- `frontend/sanity/queries/**` — GROQ query contracts consumed by static pages.

Relevant ADRs:

- Required before implementation: ADR for static export to `adm.tools`, including the loss of runtime APIs, draft preview, ISR, and Next.js redirects.
- Required before schema implementation: ADR or schema decision note for the festival content model if it establishes long-term editorial structure.

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

## Current next target

The next architecture target is static export readiness for `frontend/next.config.mjs`. Do **not** add `output: 'export'` until Phase 1 blockers are resolved, but use it as the next implementation milestone: remove runtime-only features, replace or isolate API-backed flows, remove runtime redirects, then enable and validate static export.

The landing and ticket MVP routes are allowed to exist before static export is enabled as static-safe preview routes, but they do not by themselves satisfy the final `adm.tools` deployment requirements.

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

1. Model festival city content for Kamianets and Lviv.
2. Confirm whether city pages reuse existing `Page` documents with slugs `kamianets` and `lviv`, or require a dedicated `festivalCity` document type.
3. Add or adapt schemas:
   - `Location`: name, description, city/performance city, stage type, `isEpicStage` checkbox.
   - `Artist`: name, photo, description, city/date/stage references if needed, ticket link.
   - `Partner`: logo, partnership level, URL, display order.
4. Add validation rules for required editorial fields and stable slugs.
5. Run Sanity TypeGen after schema and query changes.
6. MVP ticket content:
   - add singleton `ticketInfo` document,
   - fields: price, number of tickets left, external box office link,
   - render `/tickets` with safe placeholders when the Sanity document or URL is missing.

Exit criteria:

- Editors can create the required festival content without hard-coded frontend data.
- Generated frontend types reflect schema/query changes.

### Phase 3 — GROQ and static route contracts

Owner: `sanity-groq-specialist`

1. Centralize city-specific GROQ queries under `frontend/sanity/queries/**`.
2. Ensure page generation fetches city data separately for `/kamianets` and `/lviv`.
3. Ensure `generateStaticParams()` includes all required slugs at build time.
4. Define query projections for:
   - city theme/mood,
   - hero content,
   - locations/stages,
   - artists,
   - partners,
   - ticket CTA links,
   - SEO metadata.
5. Avoid duplicated query fragments where possible.

Exit criteria:

- Static build can produce both city routes from Sanity content.
- Missing content has safe fallbacks or clear build-time errors.

### Phase 4 — Theme system and layout logic

Owner: `tailwind-ui-implementer` with `react-next-component-specialist`

1. Implement city themes via CSS variables and Tailwind tokens.
2. Define supported themes, for example:
   - `data-theme="kamianets"` / epic-heroic palette,
   - `data-theme="lviv"` / alternate festival palette.
3. Create or update the main layout/theme provider so the active route or city data sets `data-theme`.
4. Keep the theme logic compatible with static export and client-side navigation.
5. Avoid coupling visual state to server runtime APIs.

Exit criteria:

- `/kamianets` and `/lviv` render with distinct theme variables.
- Theme switching works during client-side navigation.
- No hydration mismatch from route/theme detection.

### Phase 5 — Cinematic UI development

Owner: `tailwind-ui-implementer` with `accessibility-ui-tester`

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

### Phase 6 — Integration and UX polish

Owner: `react-next-component-specialist`

1. Configure `next/link` usage for smooth client-side navigation between city pages.
2. Ensure city theme transitions are smooth and do not depend on page reloads.
3. Integrate the chosen static-safe newsletter or subscription flow.
4. Confirm Sanity image rendering and LCP image priorities.
5. Confirm SEO metadata for city pages, sitemap, robots, and canonical URLs.

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

- [ ] ADR for static export is created and accepted/proposed for approval.
- [ ] `frontend/next.config.mjs` uses `output: 'export'` only after runtime blockers are resolved.
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm --filter frontend build` passes.
- [ ] `frontend/out/` contains expected route files.
- [ ] No exported route depends on Next.js API routes or server actions.
- [ ] Sanity images render from `cdn.sanity.io` with unoptimized Next image output.
- [ ] `/kamianets` and `/lviv` render city-specific data and themes.
- [ ] Newsletter/subscription flow works without exposing secrets.
- [ ] Accessibility review passes for hero cards, accordions, buttons, and links.
- [ ] SEO metadata, sitemap, robots, and canonical URLs are checked.
- [ ] GitHub Actions deployment to `adm.tools` is tested.

## Risks

| Risk | Impact | Mitigation |
|---|---:|---|
| Adding `output: 'export'` before removing runtime features breaks the build | High | Complete Phase 1 compatibility work before changing export config |
| Draft preview/live editing is unavailable on a pure static export | High | Document editorial workflow and use publish-triggered rebuilds |
| Newsletter currently depends on a server-side API route and secrets | High | Move to external backend/form service before static export |
| `/index` redirect currently depends on Next.js runtime redirect config | Medium | Configure host-level redirect or static fallback |
| New Sanity slugs 404 until rebuild | Medium | Add Sanity webhook or documented rebuild process |
| Build fails when Sanity is unavailable | Medium | Keep build-time data fetching simple, typed, and observable in CI |
| `adm.tools` URL/trailing-slash behavior is unknown | Medium | Confirm host behavior before final `next.config.mjs` settings |
| Theme changes cause hydration mismatch | Medium | Derive initial theme deterministically from route/static data |

## Open questions

1. Does `adm.tools` support host-level redirects, custom 404 pages, and trailing-slash clean URLs?
2. Should `/kamianets` and `/lviv` be ordinary Sanity `Page` documents or a dedicated festival city document type?
3. Which subscription/newsletter backend is approved for static hosting?
4. Is draft preview intentionally removed, or should a separate preview deployment remain server-capable?
5. What is the expected rebuild trigger after Sanity content changes?

## Completion notes

In progress. Landing MVP and `ticketInfo`/`/tickets` MVP are implemented as static-safe preview work. Static export configuration remains the next architecture target and still requires resolving Phase 1 blockers before setting `output: 'export'`.
