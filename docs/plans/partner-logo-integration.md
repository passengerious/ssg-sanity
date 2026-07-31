# Plan: Partner logo integration

Date: 2026-07-31
Status: Completed
Owner: Architect
Implementing agents: `performance-build-auditor`, `react-next-component-specialist`, `accessibility-ui-tester`, `code-reviewer`

## Goal

Convert the approved local partner logo sources to compact WebP assets and show them in the homepage Partners section while preserving Sanity partners as the authoritative source whenever the canonical Lviv document provides them.

## Non-goals

- Do not invent partner URLs or partnership levels.
- Do not change the `partner` or `festivalCity` schemas.
- Do not publish or mutate Sanity content in this task.
- Do not add a client component, image dependency, or runtime image service.

## Context

Five approved logo sources were supplied under `artifacts/img/30.07/partners/`. The homepage already passes ordered Sanity partner references to `PartnersSection`, but the canonical Lviv result currently has no partner references and therefore showed an empty state. A static fallback catalog can display the approved logos immediately while yielding completely to CMS records when editors publish them later.

## Relevant files

- `frontend/components/landing/PartnersSection.tsx`
- `frontend/components/sanity-image.tsx`
- `frontend/public/images/festival/30-07/partners/*.webp`
- `studio/schemas/documents/partner.ts`
- `docs/adr/0002-festival-content-model.md`
- `docs/adr/0006-single-city-lviv-root-route.md`

## Implementation steps

1. Inventory and visually inspect every supplied partner logo.
2. Trim excess raster whitespace and generate bounded WebP derivatives without upscaling.
3. Preserve the already-transparent Novosad WebP rather than enlarging it through recompression.
4. Add a normalized server-rendered card model to `PartnersSection`.
5. Render five local cards only when the Sanity partner array is empty; otherwise retain CMS names, logos, levels, URLs, and order.
6. Keep logos decorative because visible card headings provide the accessible partner names.
7. Verify static output, accessibility, and image payload.

## Verification checklist

- [x] Five WebP files exist in the public and exported partner directories.
- [x] Combined public derivative size is approximately 27.2 KB.
- [x] Static `/` HTML contains all five partner names and image paths.
- [x] Fallback cards do not contain invented links or partnership labels.
- [x] CMS partners remain authoritative when the query returns any records.
- [x] Logos have intrinsic dimensions and remain constrained within their cards.
- [x] The collection preserves explicit list semantics.
- [x] `pnpm --filter frontend typecheck` passes.
- [x] `pnpm --filter frontend lint` passes.
- [x] Production-like static build passes with eight routes.
- [x] `git diff --check` passes.

## Risks

- Static fallback cards intentionally omit URLs and partnership levels because those facts were not supplied.
- The white-backed raster logos may look different from future official transparent brand assets.
- Once CMS partners are published, the entire local fallback is replaced rather than merged; editors must publish the complete intended set and order.

## Completion notes

Completed on 2026-07-31. The homepage now renders Concert.ua, Радіо Львівська хвиля, So Good Company, Work.ua, and Новосад і Компанія from optimized local WebP files whenever Sanity has no partner references. No ADR was required because the accepted CMS model remains unchanged and authoritative.
