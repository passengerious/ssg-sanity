# Project Log: Local city-card theme accents

- **Date**: 2026-05-17
- **Task**: Replace fragile landing-wide hover theme mutation with local city-card accent styling.
- **Agent**: architect; Tailwind design-system guidance.

## Summary

Stabilized the landing theme at the default festival theme and removed unused landing theme state from `LandingExperience`. Updated hero city cards to express Epic/Kamianets and Heroic/Lviv locally with branded borders, glows, badges, gradients, and explicit “Відкрити місто” affordances while preserving plain anchor navigation.

## Files changed

- `frontend/components/landing/Hero.tsx`
- `frontend/components/landing/LandingExperience.tsx`
- `docs/logs/2026-05.md`
- `docs/plans/implementation-plan.md`
- `docs/ai/PROJECT_LEDGER.md`

## Verification

`pnpm --filter frontend typecheck`; `pnpm --filter frontend lint`; `git diff --check`; `NEXT_PUBLIC_SITE_ENV=development pnpm --filter frontend build`.

## Risks

Visual polish still needs browser review against final imagery; card accent colors use explicit brand hex utilities to avoid reintroducing route-level theme mutation.

## Follow-ups

Browser-check card focus states, hover states, city navigation, and responsive layout after deploy.
