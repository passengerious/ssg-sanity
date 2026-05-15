# Plan: Festival static site implementation

Date: 2026-05-07
Updated: 2026-05-15
Status: Phase 7 workflow added; staging deployment pending
Owner: Architect
Implementing agents: `nextjs-ssg-architect`, `sanity-schema-architect`, `sanity-groq-specialist`, `tailwind-ui-implementer`, `accessibility-ui-tester`, `deployment-vercel-engineer`, `test-automator`

## Goal

Build a Sanity-driven, statically exported Next.js festival site for static hosting, with city-specific experiences for `/kamianets` and `/lviv`, cinematic Tailwind UI, and GitHub Actions deployment automation that publishes `frontend/out/` into the host webroot.

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

Phase 7 deployment target: GitHub Actions builds the static frontend and deploys the **contents** of `frontend/out/` to the host webroot, not the `out/` directory itself. For the staging host, files live under `/home/admin/<STAGING-DOMAIN>/www/`. The canonical build URL must be the actual public website/staging domain, not the hosting provider control-plane/domain label.

## Implementation phases

### Phase 6 — Integration and UX polish

Owner: `react-next-component-specialist`
Status: Completed 2026-05-15

1. Configure `next/link` usage for smooth client-side navigation between city pages.
2. Ensure city theme transitions are smooth and do not depend on page reloads.
3. Integrate the chosen static-safe newsletter or subscription flow.
4. Confirm Sanity image rendering and LCP image priorities.
5. Confirm SEO metadata for city pages, sitemap, robots, and canonical URLs.
6. Confirm root landing metadata does not depend on a missing generic `page` document.

Exit criteria:

- Navigation, theme transitions, forms, images, and metadata work in production-like static build output.

### Phase 7 — Testing, export validation, and deployment

Owner: `test-automator` with `deployment-vercel-engineer`
Status: Workflow added 2026-05-15; staging deployment pending

1. Run repository validation before every deployment:
   - `pnpm typegen`
   - `pnpm --filter frontend typecheck`
   - `pnpm --filter frontend lint`
   - `NEXT_PUBLIC_SITE_URL=https://<STAGING-DOMAIN> NEXT_PUBLIC_SITE_ENV=development pnpm --filter frontend build`
2. Inspect `frontend/out/` for expected static files:
   - `index.html`,
   - `kamianets.html` or host-compatible equivalent,
   - `lviv.html` or host-compatible equivalent,
   - `tickets.html`,
   - `404.html`,
   - `sitemap.xml`,
   - `robots.txt`,
   - `_next/` static assets.
3. Confirm there is no required `api/` runtime in the exported output.
4. Add GitHub Actions deployment workflow:
   - trigger on `workflow_dispatch` for staging verification;
   - later allow `push` to `main` after the host deploy path is proven;
   - use GitHub Environments for staging/production-specific secrets and variables;
   - build on GitHub-hosted `ubuntu-latest`, not on the web host;
   - deploy with SSH/`rsync` by copying `frontend/out/` contents into `/home/admin/<STAGING-DOMAIN>/www/`.
5. Configure GitHub environment variables/secrets for staging:
   - Variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_ENV=development`, `DEPLOY_PATH=/home/<SSH_USER>/<STAGING-DOMAIN>/www`, `SSH_HOST`, `SSH_USER`, `SSH_PORT`.
   - Sanity variables required by the build/typegen: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `NEXT_PUBLIC_SANITY_API_VERSION`, optional `NEXT_PUBLIC_STUDIO_URL`.
   - Secrets: `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`.
   - Optional secrets/variables if needed: `NEXT_PUBLIC_NEWSLETTER_ACTION_URL`, Sanity read token if the dataset becomes private.
6. Validate host prerequisites from the web console before wiring GitHub Actions:
   - Ubuntu host version is currently unknown;
   - Node.js 24 LTS, Python 3.14, and Go 1.26 are available but are not required for deployment if GitHub Actions builds the site;
   - SSH and `rsync` must be available for automated deployment;
   - `/home/admin/<STAGING-DOMAIN>/www/` must exist and be writable by the SSH user used by GitHub Actions.
7. Deploy and verify staging:
   - deploy `frontend/out/` contents to `www/`;
   - confirm clean URLs resolve (`/`, `/kamianets`, `/lviv`, `/tickets`);
   - confirm direct file URLs resolve as a fallback (`/kamianets.html`, `/lviv.html`, `/tickets.html`);
   - confirm `sitemap.xml`, `robots.txt`, and `404.html` are served;
   - confirm staging uses staging-domain canonical URLs and `noindex` metadata when `NEXT_PUBLIC_SITE_ENV=development`.
8. Document deployment and rollback steps:
   - retain a timestamped backup of `www/` before each `rsync --delete` deployment;
   - rollback by restoring the latest backup into `www/`;
   - document how Sanity content updates trigger a rebuild: manual GitHub Actions dispatch first, webhook-triggered dispatch later if needed.

Exit criteria:

- GitHub Actions can build the frontend and deploy `frontend/out/` contents to `/home/admin/<STAGING-DOMAIN>/www/`.
- Staging deployment succeeds and serves expected routes/assets from the public staging domain.
- Content update workflow is documented, at minimum as manual workflow dispatch.
- Rollback procedure is known and tested with a copied backup.

#### Host preflight commands

Run these in the host web console over SSH before implementing the workflow. Replace `<STAGING-DOMAIN>` with the actual staging website directory name.

```bash
export STAGING_DOMAIN="<STAGING-DOMAIN>"
export WEBROOT="/home/admin/${STAGING_DOMAIN}/www"

whoami
hostname
pwd
uname -a
(lsb_release -a || cat /etc/os-release || true)

node -v || true
python3 --version || true
go version || true

command -v ssh || true
command -v rsync || true
command -v curl || true
command -v tar || true
command -v gzip || true

test -d "$WEBROOT" && echo "WEBROOT exists: $WEBROOT" || echo "WEBROOT missing: $WEBROOT"
test -w "$WEBROOT" && echo "WEBROOT writable" || echo "WEBROOT not writable by $(whoami)"
ls -la "$WEBROOT"

touch "$WEBROOT/.deploy_write_test" && rm "$WEBROOT/.deploy_write_test" && echo "write test ok"
du -sh "$WEBROOT" || true
```

Prepare SSH access for GitHub Actions by adding the public half of the deploy key to the SSH user's `authorized_keys`. Generate the key pair on a trusted machine or password manager, store the private key as the GitHub secret `SSH_PRIVATE_KEY`, then run this on the host and paste the public key:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

cat >> ~/.ssh/authorized_keys <<'EOF'
ssh-ed25519 AAAA_REPLACE_WITH_GITHUB_ACTIONS_DEPLOY_PUBLIC_KEY github-actions-kraina-mriy-staging
EOF
```

Generate `SSH_KNOWN_HOSTS` from a trusted terminal and store the output as the GitHub secret `SSH_KNOWN_HOSTS`:

```bash
ssh-keyscan -p "<SSH_PORT>" "<SSH_HOST>"
```

After the first deployment, verify public serving from the host or any external shell:

```bash
export SITE_URL="https://<STAGING-DOMAIN>"

curl -I "$SITE_URL/"
curl -I "$SITE_URL/kamianets"
curl -I "$SITE_URL/lviv"
curl -I "$SITE_URL/tickets"
curl -I "$SITE_URL/kamianets.html"
curl -I "$SITE_URL/lviv.html"
curl -I "$SITE_URL/tickets.html"
curl -I "$SITE_URL/sitemap.xml"
curl -I "$SITE_URL/robots.txt"
curl -I "$SITE_URL/not-a-real-page"

curl -s "$SITE_URL/sitemap.xml" | grep "$SITE_URL"
curl -s "$SITE_URL/robots.txt"
curl -s "$SITE_URL/" | grep -E 'canonical|robots|og:url' | head
```

## Verification checklist

- [x] ADR for static export is created and accepted/proposed for approval.
- [x] `frontend/next.config.mjs` uses `output: 'export'` only after runtime blockers are resolved.
- [x] `pnpm typecheck` passes.
- [x] `pnpm --filter frontend build` passes.
- [x] `frontend/out/` contains expected route files.
- [x] No exported route depends on Next.js API routes or server actions.
- [x] Sanity images render from `cdn.sanity.io` with unoptimized Next image output.
- [x] `/` renders the festival landing without requiring a generic Sanity `page` document with slug `index`.
- [x] `/landing` is removed, repurposed, or excluded from canonical discovery after the root route swap.
- [x] `/` renders artists from Sanity data instead of the hardcoded `ArtistsLineup` array.
- [x] `/` includes a visible Sanity-backed partners section.
- [x] `/kamianets` and `/lviv` render city-specific data and themes.
- [x] Newsletter/subscription flow works without exposing secrets.
- [x] Accessibility review passes for Phase 5 hero cards, buttons, links, lists, and heading hierarchy.
- [x] SEO metadata routes build statically (`robots.txt`, `sitemap.xml`).
- [ ] GitHub Actions deployment to the staging host webroot is tested.

## Risks

| Risk                                                                                                        | Impact | Mitigation                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- | -----: | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Reintroducing runtime features after static export breaks static hosting                                    |   High | Keep API routes, Draft Mode, runtime redirects, and server actions out of the frontend                                                       |
| Draft preview/live editing is unavailable on a pure static export                                           |   High | Document editorial workflow and use publish-triggered rebuilds                                                                               |
| Newsletter currently depends on a server-side API route and secrets                                         |   High | Move to external backend/form service before static export                                                                                   |
| `/index` redirect currently depends on Next.js runtime redirect config                                      | Medium | Configure host-level redirect or static fallback                                                                                             |
| New Sanity slugs 404 until rebuild                                                                          | Medium | Add Sanity webhook or documented rebuild process                                                                                             |
| Build fails when Sanity is unavailable                                                                      | Medium | Keep build-time data fetching simple, typed, and observable in CI                                                                            |
| Static host clean URL behavior for flat export files is unknown                                             | Medium | Confirm staging host maps `/kamianets`, `/lviv`, and `/tickets` to flat `.html` files before final `next.config.mjs` settings                |
| Theme changes cause hydration mismatch                                                                      | Medium | Derive initial theme deterministically from route/static data                                                                                |
| Legacy inbound links to `/landing` may 404 after route removal                                              |    Low | Add a host-level redirect to `/` if `/landing` was externally shared                                                                         |
| Root SEO metadata drifts because the homepage is code-owned                                                 | Medium | Add a Sanity-editable landing/site settings model or document code-owned metadata before launch                                              |
| Landing artist and partner cards lose multi-city context when the same reference appears in multiple cities |    Low | Current MVP de-duplicates by `_id` and keeps first city context; aggregate city labels in a future enhancement if editorial needs require it |

## Open questions

1. Does the staging/production static host support host-level redirects, custom 404 pages, and clean URLs for flat `.html` route files?
2. Which subscription/newsletter backend is approved for static hosting if newsletter signup is reintroduced?
3. Should a separate preview deployment remain server-capable for editorial previews?
4. What is the expected rebuild trigger after Sanity content changes?
5. Should homepage SEO metadata remain code-owned for MVP or move into a Sanity singleton before launch?

## Completion notes

In progress. Landing MVP, `ticketInfo`/`/tickets` MVP, root landing route, Phase 5 cinematic UI MVP, Phase 5.6 Sanity-backed landing artists/partners, Phase 5.7 code consistency patterns, and Phase 6 integration/UX polish are implemented as static-safe work. Static export compatibility is implemented for the current MVP and `frontend/out/` is generated. Frontend validation (`typegen`, `typecheck`, `lint`, `build`) passes. Phase 2 content modeling uses dedicated `festivalCity` documents with city-owned references to locations, artists, and partners. ADR 0004 is implemented: `/` renders the festival landing without requiring a generic Sanity `page` slug `index`, `/landing` is removed, and sitemap output includes `/` as the code-owned landing URL. Current production-like build generates `/`, `/kamianets`, `/lviv`, `/tickets`, `404.html`, `sitemap.xml`, and `robots.txt`; canonical, Open Graph, Twitter, sitemap, and robots URLs resolve against the build-time `NEXT_PUBLIC_SITE_URL`. Phase 6 added static-safe site URL helpers, city-to-city navigation, smooth theme transitions, production metadata hardening, static-safe newsletter configuration, accessible newsletter/city-nav fixes, and query/type updates for page titles and post excerpts. Phase 7 is now scoped around GitHub Actions building on GitHub-hosted runners and deploying `frontend/out/` contents to `/home/admin/<STAGING-DOMAIN>/www/` over SSH/rsync. Deployment automation, content rebuild workflow, homepage SEO ownership, real asset replacement, and final staging host behavior validation remain open.
