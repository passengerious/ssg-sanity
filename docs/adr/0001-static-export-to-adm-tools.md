# ADR 0001: Static export to adm.tools

Date: 2026-05-08  
Status: Accepted  
Owner: Architect

## Context

The frontend must deploy to a strictly static host without a Node.js runtime. The previous Next.js baseline could build successfully, but it still included runtime-only features: API routes, draft mode routes/actions, Sanity live preview wiring, runtime redirects, and a newsletter API endpoint.

`adm.tools` requires a pre-rendered static artifact, so the frontend needs `output: 'export'` and must produce `frontend/out/` during `next build`.

## Decision

Use Next.js static export for the frontend by setting `output: 'export'` in `frontend/next.config.mjs`.

The static frontend will not use:

- Next.js API routes,
- Draft Mode,
- Sanity live visual editing in the deployed frontend,
- Next.js runtime redirects or rewrites,
- server-side newsletter submission handlers.

Sanity remains the CMS and is queried at build time. Content updates require rebuilding and redeploying the static output.

## Consequences

### Positive

- `frontend/out/` can be deployed to static hosting without Node.js.
- Runtime API and secret-handling risks are removed from the frontend deployment.
- Build output clearly identifies all generated static routes.
- Sanity Studio remains separate and can continue managing content.

### Negative / trade-offs

- Draft preview and live visual editing are unavailable in the static frontend.
- API-backed newsletter submission is disabled until an external static-compatible backend is chosen.
- Runtime redirects such as `/index` → `/` must be handled by the host or with static files.
- New or updated Sanity content is not visible until the next static rebuild.
- Dynamic Sanity-driven routes require generated static params at build time.

## Alternatives considered

| Option | Why not |
|---|---|
| Keep server-capable Next.js deployment | Does not satisfy strict static hosting without Node.js. |
| Use ISR/revalidation | Requires a server/runtime platform. |
| Keep API routes for newsletter and draft mode | API routes are not emitted by static export and would fail on `adm.tools`. |
| Delay `output: 'export'` until all Sanity content exists | Blocks deployment architecture validation; placeholder static routes can keep builds verifiable while content modeling continues. |

## Impacted areas

- Sanity schemas: no schema changes required for export itself.
- GROQ queries: static route generation depends on build-time query results.
- Next.js routes: API routes and draft mode actions removed; route handlers must stay absent.
- SSG/build: `next build` now exports to `frontend/out/`.
- Tailwind/components: newsletter form must not submit to an internal API.
- SEO: `robots.ts` and `sitemap.ts` are forced static.
- Deployment: deploy `frontend/out/` and rebuild after Sanity content changes.

## Follow-ups

- [ ] Confirm `adm.tools` redirect support for `/index` → `/`.
- [ ] Choose an external newsletter/form backend if newsletter signup is reintroduced.
- [ ] Add Sanity publish webhook or documented manual rebuild process.
- [ ] Replace temporary fallback static params once `/kamianets`, `/lviv`, and blog content are modeled and published.
