# Project Log: Static export compatibility implementation

- **Date**: 2026-05-08
- **Task**: Static export compatibility implementation
- **Agent**: architect
- **Subagent**: nextjs-ssg-architect, debugger
- **Plan**: `docs/plans/implementation-plan.md`
- **ADR**: `docs/adr/0001-static-export-to-adm-tools.md`

## Summary

Enabled strict static export for the frontend. Removed frontend API routes, Draft Mode actions/UI, Sanity live preview wiring, and runtime redirects. Replaced Sanity live fetching with direct build-time client fetches and made metadata routes static. Disabled internal newsletter API submission because the frontend no longer has a Node.js runtime.

## Files changed

- `docs/adr/0001-static-export-to-adm-tools.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/2026-05.md`
- `frontend/next.config.mjs`
- `frontend/app/(main)/layout.tsx`
- `frontend/app/(main)/[slug]/page.tsx`
- `frontend/app/(main)/blog/[slug]/page.tsx`
- `frontend/app/robots.ts`
- `frontend/app/sitemap.ts`
- `frontend/app/api/**` removed
- `frontend/app/actions/disable-draft-mode.ts` removed
- `frontend/components/disable-draft-mode.tsx` removed
- `frontend/components/blocks/forms/newsletter.tsx`
- `frontend/sanity/lib/fetch.ts`
- `frontend/sanity/lib/live.ts` removed
- `frontend/sanity/lib/token.ts` removed
- `frontend/package.json`
- `pnpm-lock.yaml`

## Verification

- Cleared stale `.next` generated route types after deleting API routes.
- `pnpm typecheck` passed from `frontend/`.
- `pnpm lint` passed from `frontend/`.
- `pnpm --filter frontend build` passed with `output: 'export'`.
- `frontend/out/` was created.
- Build output contains no runtime dynamic (`ƒ`) routes; generated dynamic slug routes are SSG (`●`) static HTML.
- Exported routes include `/`, `/landing`, `/tickets`, `/robots.txt`, `/sitemap.xml`, `/kamianets`, and `/lviv`.

## Architectural impact

High. The frontend is now a static export target and no longer supports Node.js runtime features. Sanity content is fetched at build time and content changes require a rebuild.

## Risks

- `/kamianets` and `/lviv` are currently fallback static routes until Sanity city content is modeled and published.
- `/blog/placeholder` is generated only to satisfy static export while there are no published posts; remove this fallback when blog content strategy is settled.
- Newsletter signup is disabled until an external static-compatible provider is selected.
- Build still emits non-fatal `--localstorage-file` warnings.

## Follow-ups

- [ ] Decide whether to remove the temporary `/blog/placeholder` fallback or publish real post content.
- [ ] Configure `adm.tools` hosting/redirect behavior for `/index` if needed.
- [ ] Define Sanity publish-to-rebuild workflow.
- [ ] Select external newsletter provider if newsletter collection is required.
