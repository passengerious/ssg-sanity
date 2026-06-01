# Root festival landing route architecture

## 2026-05-09

### Task

Document the architecture decision and plan updates for rendering the festival landing experience at canonical `/` before launch.

### Agent/Subagent

- Agent: architect
- Subagent: nextjs-ssg-architect

### Summary

Added ADR 0004 to make `/` the festival landing route instead of requiring a generic Sanity `page` document with slug `index`. Updated the implementation plan with a root landing route phase and preserved `FestivalThemeShell` as a styling/layout-only boundary. Updated ADR 0003 to clarify that it governs dynamic `/:slug` routes only, while `/` is owned by ADR 0004. Implemented the route swap by moving the landing to `frontend/app/page.tsx`, removing the temporary `/landing` route, updating internal links, and adding `/` as a code-owned sitemap entry.

### Files changed

- `docs/adr/0004-root-festival-landing-route.md`
- `docs/adr/0003-root-slug-route-contract.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/root-festival-landing-route-architecture.md`
- `frontend/app/page.tsx`
- `frontend/app/(main)/page.tsx`
- `frontend/app/landing/page.tsx`
- `frontend/app/sitemap.ts`
- `frontend/components/landing/Header.tsx`
- `frontend/app/tickets/page.tsx`

### Verification

- Documentation consistency reviewed by the architect.
- `git diff --check` passed.
- `pnpm --filter frontend lint` passed.
- `pnpm --filter frontend build` passed and exported `/` without `/landing`.
- `pnpm --filter frontend typecheck` passed after build regenerated stale `.next` route types.
- Verified `frontend/out/index.html` exists, `frontend/out/landing` is absent, `frontend/out/api` is absent, and `frontend/out/sitemap.xml` includes `/`.

### Risks

- Legacy inbound links to `/landing` may 404 unless a host-level redirect is added.
- Homepage SEO metadata is code-owned unless a Sanity settings model is added or extended.
- Build still emits the known non-fatal `--localstorage-file` warning during static generation.
- Target public Kamianets URL is `/kamianets`; current build still exports the existing Sanity slug `/kamianets-podilskyi` until the content slug is updated.

### Follow-ups

- [x] Move the festival landing implementation from `/landing` to `/`.
- [x] Remove or repurpose `/landing` after the route swap.
- [x] Confirm `frontend/out/index.html` contains the festival landing after static export.
- [ ] Decide whether `/landing` needs a host-level redirect to `/`.
- [ ] Decide whether homepage SEO metadata remains code-owned or moves into Sanity before launch.
- [ ] Update the published Kamianets `festivalCity` slug to `/kamianets` before external sharing.
