# Phase 4 theme system and layout logic

## 2026-05-08

### Task

Phase 4 — Theme system and layout logic

### Agent/Subagent

- Agent: architect
- Subagents: tailwind-ui-implementer, react-next-component-specialist

### Plan/ADR

- Plan: `docs/plans/implementation-plan.md`
- ADR: `docs/adr/0002-festival-content-model.md`
- ADR: `docs/adr/0003-root-slug-route-contract.md`

### Summary

Centralized the festival theme contract for `epic` and `heroic`, scoped festival color variables to `.festival-theme`, and introduced a reusable theme shell for both landing and city pages. City pages now normalize Sanity `festivalCity.themeKey` through shared utilities, while landing city cards became accessible Next.js links that preserve hover/focus theme preview, reset after leaving the card grid, and navigate to the Sanity-backed city routes. Header and footer remain neutral per Phase 4 decision.

### Files changed

- `frontend/lib/festival-themes.ts`
- `frontend/components/festival-theme-shell.tsx`
- `frontend/components/festival-city/festival-city-page.tsx`
- `frontend/components/landing/LandingExperience.tsx`
- `frontend/components/landing/Hero.tsx`
- `frontend/app/globals.css`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`
- `docs/logs/phase-4-theme-system-and-layout-logic.md`

### Verification

- `pnpm --filter frontend typecheck` passed.
- `pnpm --filter frontend lint` passed.
- `pnpm --filter frontend build` passed with static export output.
- `git diff --check` passed.

### Architectural impact

Medium. Festival theme state is now explicitly scoped and centralized without changing ADR 0003 routing. Static-export safety is preserved because city page themes are determined from build-time Sanity data and landing theme switching remains client-local.

### Risks

- Header and footer intentionally remain outside the festival theme boundary.
- `/kamianets` and `/lviv` still require published `festivalCity` documents before static export generates those routes.
- Full cinematic city UI remains Phase 5 work.

### Follow-ups

- [ ] Publish city documents and verify `epic`/`heroic` route theming in exported output.
- [ ] Continue Phase 5 cinematic city UI and accessibility polish.
- [ ] Consider a screen-reader announcement pattern if theme preview becomes a persistent user preference.

## 2026-05-08 accessibility correction

### Task

Remove focus-triggered theme preview from landing city cards

### Agent/Subagent

- Agent: architect

### Summary

Removed the `onFocus` theme preview handler from landing city card links so keyboard tab focus does not mutate the page theme. Mouse hover preview remains available through `onMouseEnter`.

### Files changed

- `frontend/components/landing/Hero.tsx`
- `docs/logs/phase-4-theme-system-and-layout-logic.md`

### Verification

- `pnpm --filter frontend typecheck` passed.
- `pnpm --filter frontend lint` passed.
- `pnpm --filter frontend build` passed.
- `git diff --check` passed.

### Architectural impact

Low. Preserves Phase 4 scoped theme architecture while aligning keyboard focus behavior with WCAG 3.2.2 expectations.

### Follow-ups

- [ ] Manually verify keyboard tabbing through landing city links does not change the theme.
