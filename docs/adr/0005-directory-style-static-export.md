# ADR 0005: Directory-style static export routes

Date: 2026-05-17  
Status: Accepted  
Owner: Architect

## Context

The staging site is deployed by GitHub Actions to a static host webroot at `/home/admin/<STAGING-DOMAIN>/www/`. The initial Next.js static export emitted route HTML as flat files such as `tickets.html`, `lviv.html`, and `kamianets.html`, while App Router also emitted same-named route payload directories such as `tickets/`, `lviv/`, and `kamianets/`.

On the staging host, clean URL requests such as `/tickets` and `/lviv` interacted poorly with the physical payload directories. Host-level directory slash behavior attempted to canonicalize routes to slash forms and produced `http://` redirects for HTTPS pages, causing browser mixed-content errors and broken client navigation. `.htaccess` rewrites could make simple status checks return `200`, but they conflicted with App Router client navigation and were too fragile for repeated deployment updates.

## Decision

Use directory-style static route output by setting `trailingSlash: true` in `frontend/next.config.mjs`.

Public route URLs should use trailing slashes where practical:

- `/tickets/`
- `/kamianets/`
- `/lviv/`
- `/blog/<slug>/`

The static export should emit route entry HTML at directory indexes:

- `frontend/out/tickets/index.html`
- `frontend/out/kamianets/index.html`
- `frontend/out/lviv/index.html`

The staging deployment workflow should verify these directory index files rather than flat `.html` route files. Host `.htaccess` should stay minimal and avoid route rewrites unless a future host-specific issue requires them.

## Consequences

### Positive

- Static route files align with common Apache/shared-host directory resolution.
- Clean public URLs can resolve without host rewrites from `/route` to `/route.html`.
- Mixed-content errors from host-generated `http://` directory redirects should be removed after redeployment.
- GitHub Actions can verify the route output shape before syncing to `www/`.

### Negative / trade-offs

- Canonical URLs, sitemap entries, and internal links should consistently include trailing slashes for route pages.
- Existing external links without trailing slashes may be redirected by the host or browser to slash URLs.
- The output contains more nested route directories, so deployment checks must use a deeper file listing.

## Alternatives considered

| Option | Why not |
|---|---|
| Keep flat route files and use `.htaccess` rewrites | Rewrites conflicted with same-named Next App Router payload directories and broke client navigation. |
| Force HTTPS redirects in `.htaccess` | The host/proxy can misreport HTTPS state to Apache, causing redirect loops. |
| Keep flat files and link directly to `.html` URLs | Exposes implementation details in public URLs and weakens the route contract established for the site. |
| Move routes under another namespace | Unnecessary; the route names are correct, only the export file shape needed adjustment. |

## Impacted areas

- Next.js config: `frontend/next.config.mjs` sets `trailingSlash: true`.
- Frontend links: internal route links should point to trailing-slash URLs for route pages.
- SEO: canonical URLs and sitemap entries should use trailing-slash route URLs.
- CI/CD: `.github/workflows/deploy-staging.yml` verifies `*/index.html` route outputs.
- Hosting: staging webroot should be served with simple directory index behavior and without custom flat-file route rewrites.

## Follow-ups

- [ ] Redeploy staging and confirm `/tickets/`, `/kamianets/`, and `/lviv/` work in browser navigation.
- [ ] Confirm Chrome mixed-content errors are gone after redeployment.
- [ ] Confirm non-slash URLs either resolve acceptably or are not used in public navigation.
- [ ] Update production deployment checks to mirror staging once production workflow is added.
