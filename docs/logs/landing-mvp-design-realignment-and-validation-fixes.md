# Project Log: Landing MVP design realignment and validation fixes

- **Date**: 2026-05-08
- **Task**: Landing MVP design realignment and validation fixes
- **Agent**: architect
- **Subagents**: code-reviewer, accessibility-ui-tester
- **Plan**: `docs/plans/stitch-task.md`
- **ADR**: N/A

## Summary

Realigned the landing MVP with the updated `.stitch/DESIGN.md` brand guidance. Replaced the wrong Manrope/Noto Serif + old green/red token implementation with Mulish plus Kyiv Region/Kobzar fallback token mapping and the approved Brand Red, Natural Green, Warm Beige, and Dark Grey colors. Completed missing Stitch workflow artifacts and addressed review findings around temporary generated image URLs, keyboard accessibility, placeholder links, no-op controls, route metadata, and lint tooling.

## Files changed

- `.stitch/DESIGN.md`
- `.stitch/SITE.md`
- `.stitch/metadata.json`
- `.stitch/next-prompt.md`
- `.stitch/designs/landing.html`
- `.stitch/designs/landing.png`
- `frontend/app/landing/page.tsx`
- `frontend/components/landing/*`
- `frontend/app/layout.tsx`
- `frontend/app/globals.css`
- `frontend/components/blocks/forms/newsletter.tsx`
- `frontend/eslint.config.mjs`
- `frontend/package.json`
- `pnpm-lock.yaml`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/2026-05.md`
- `LICENSE` removed intentionally per project direction

## Verification

- `pnpm typecheck` passed.
- `pnpm --filter frontend lint` passed.
- `pnpm --filter frontend build` passed.
- Build still reports existing dynamic API routes because `output: 'export'` has not yet been enabled.

## Architectural impact

Medium. The landing route remains an MVP/static preview route, but frontend design tokens now follow `.stitch/DESIGN.md`, and lint tooling was updated from the removed `next lint` command to ESLint flat config.

## Risks

- Static export blockers remain in existing API routes, draft mode routes/actions, and `next.config.mjs` redirects.
- Landing images use a persistent placeholder until approved Sanity or public production assets are available.
- Kyiv Region and Kobzar KS are currently CSS fallback font names; approved font files still need to be licensed and self-hosted if required.

## Follow-ups

- [ ] Add approved production image assets via Sanity or `frontend/public/`.
- [ ] Integrate landing and city pages with Sanity content instead of placeholders.
- [ ] Create ADR for static export to `adm.tools` before enabling `output: 'export'`.
- [ ] Decide final font sourcing for Kyiv Region and Kobzar KS.
