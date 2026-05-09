# ADR 0004: Root festival landing route

Date: 2026-05-09  
Status: Accepted  
Owner: Architect

## Context

The festival landing experience currently exists on `/landing` for MVP verification. The root route `/` still depends on a generic Sanity `page` document with slug `index`, but the current dataset has no generic `page` documents. This makes the public homepage dependent on placeholder CMS content even though the festival landing is the intended launch experience.

ADR 0003 defines the dynamic root `/:slug` contract for `festivalCity` and generic `page` documents. That contract intentionally excludes `/`, which is implemented by `frontend/app/page.tsx`.

Static export also requires a deterministic homepage at build time. Requiring editors to create a generic `page` document solely to unlock `/` adds unnecessary launch risk and duplicates the festival-specific landing model.

## Decision

Render the festival landing experience at `/` before launch.

The root route must not require a generic Sanity `page` document with slug `index`. Instead, `frontend/app/page.tsx` owns the festival homepage and may fetch festival-specific Sanity data at build time, such as `festivalCity` city cards and `ticketInfo` CTA content.

If a generic `page` document with slug `index` is created later, it must not override `/` unless a future ADR changes the homepage strategy.

`/landing` is temporary. Once `/` renders the festival landing, `/landing` should be removed, repurposed as a non-canonical preview route, or handled by a host-level redirect outside Next.js runtime redirects.

`FestivalThemeShell` remains a visual boundary only. It applies `.festival-theme` and the selected `data-theme`; it must not fetch content, select routes, or become responsible for city content swapping.

## Consequences

### Positive

- The public homepage works in static export without a placeholder generic Sanity `page` document.
- The launch URL contract is simpler: `/` is the festival landing, while `/:slug` remains governed by ADR 0003.
- Homepage rendering can use build-time Sanity data without reintroducing server runtime features.
- The festival-specific UI can keep its code-owned structure while still consuming structured Sanity content.

### Negative / trade-offs

- Editors do not get full page-builder control over the homepage in the MVP.
- Homepage metadata may be code-owned until a Sanity settings model is added or extended.
- `/landing` can create duplicate content if it remains exported after `/` becomes canonical.
- A future generic CMS homepage would require a new ADR or a deliberate reversal of this decision.

## Alternatives considered

| Option | Why not |
|---|---|
| Keep `/` backed by generic Sanity `page` slug `index` | Requires content that does not exist and makes the launch homepage depend on an unrelated generic page-builder contract. |
| Keep `/landing` as the public launch URL | Produces a weaker public URL and leaves `/` in a missing-content state. |
| Add a runtime redirect from `/` to `/landing` | Runtime redirects are incompatible with the accepted static export architecture. |
| Make `FestivalThemeShell` responsible for selecting city content | Couples visual theming to content routing and violates the intended shell boundary. |

## Impacted areas

- Sanity schemas: no immediate schema change; future homepage SEO/settings fields may be added.
- GROQ queries: root landing may reuse `festivalCity` city-card queries and `ticketInfo` singleton queries at build time.
- Next.js routes: `frontend/app/page.tsx` should render the landing; `frontend/app/landing/page.tsx` should be removed or repurposed after the swap.
- SSG/build: `frontend/out/index.html` must contain the festival landing and must not depend on a generic `page` slug `index`.
- Tailwind/components: `FestivalThemeShell` stays scoped to theme variables and layout.
- SEO: `/` becomes the canonical landing URL; `/landing` must not remain a competing canonical page.
- Deployment: no server runtime or Next.js redirect dependency is introduced.

## Follow-ups

- [x] Move the festival landing implementation from `/landing` to `/`.
- [x] Remove or repurpose `/landing` after the route swap.
- [x] Confirm sitemap and canonical metadata expose `/` as the festival landing URL.
- [ ] Decide whether homepage SEO copy remains code-owned or moves into a Sanity singleton before launch.
- [x] Verify `frontend/out/index.html` contains the landing experience after static export.
