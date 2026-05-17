# Project Ledger

Last updated: 2026-05-17

## Current phase

Phase 7 staging route-output fix and update-loop validation

## Active priorities

1. Redeploy staging with directory-style route output (`trailingSlash: true`) and verify `/kamianets/`, `/lviv/`, and `/tickets/` browser navigation.
2. Resolve staging mixed-content browser errors by removing host redirects from HTTPS pages to `http://` slash routes.
3. Verify the staging deployment/update loop: push or safe change → workflow build → `frontend/out/` sync to `/home/admin/<STAGING-DOMAIN>/www/` → public staging verification.
4. Keep staging non-indexable with `NEXT_PUBLIC_SITE_ENV=development` unless explicitly changed.
5. Define the rebuild workflow for Sanity content updates and decide whether it remains manual workflow dispatch or becomes webhook-triggered.
6. Decide whether `/landing` needs a host-level redirect to `/`.
7. Replace placeholder imagery with approved festival assets where available.
8. Treat `.stitch/DESIGN.md` as the source of truth for festival UI design tokens and page styling.

## Active plans

| Plan                                | Status          | Owner     | Updated    |
| ----------------------------------- | --------------- | --------- | ---------- |
| `docs/plans/implementation-plan.md` | Deploy-managed host rules pending verification | Architect | 2026-05-17 |
| `docs/plans/stitch-task.md`         | MVP implemented | UI agent  | 2026-05-08 |
| `docs/logs/fix-hero-visibility.md`  | Completed       | Architect | 2026-05-09 |

## Architecture decisions

| ADR                                            | Status   | Decision                                                                                                               | Date       |
| ---------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | ---------- |
| `docs/adr/0001-static-export-to-adm-tools.md`  | Accepted | Use `output: 'export'`; remove frontend API routes, Draft Mode, live editing, and runtime redirects                    | 2026-05-08 |
| `docs/adr/0002-festival-content-model.md`      | Accepted | Use dedicated `festivalCity` documents with city-owned references to locations, artists, and partners                  | 2026-05-08 |
| `docs/adr/0003-root-slug-route-contract.md`    | Accepted | Use one root `[slug]` route; `festivalCity` takes precedence over generic `page`; static params come from Sanity slugs | 2026-05-08 |
| `docs/adr/0004-root-festival-landing-route.md` | Accepted | Render the festival landing at `/` before launch instead of requiring generic Sanity `page` slug `index`               | 2026-05-09 |
| `docs/adr/0005-directory-style-static-export.md` | Accepted | Use `trailingSlash: true` so static route pages export as directory indexes for host compatibility                    | 2026-05-17 |

## Open architecture questions

| Question                                                                  | Impact | Needed decision                                                                              |
| ------------------------------------------------------------------------- | -----: | -------------------------------------------------------------------------------------------- |
| How should newsletter submissions work on static hosting if reintroduced? | Medium | External provider or separate backend that does not expose secrets                           |
| How are Sanity content updates deployed?                                  | Medium | Webhook-triggered rebuild, scheduled rebuild, or manual deployment workflow                  |
| How should Kyiv Region and Kobzar KS fonts be licensed and served?        | Medium | Use approved self-hosted font files or documented fallbacks before launch                    |
| Should homepage SEO metadata remain code-owned for MVP?                   | Medium | Keep code-owned metadata documented or move SEO fields into a Sanity singleton before launch |

## Current risks

| Risk                                                           | Severity | Owner      | Mitigation                                                                                               |
| -------------------------------------------------------------- | -------: | ---------- | -------------------------------------------------------------------------------------------------------- |
| Static export removes draft preview/live editing               |     High | Architect  | Use Studio-only editing and document rebuild workflow; consider separate preview deployment later        |
| Newsletter signup is disabled on static hosting                |   Medium | Architect  | Choose external form backend or separate endpoint before enabling newsletter collection                  |
| Sanity content updates require rebuilds                        |   Medium | Architect  | Add webhook-triggered or manual rebuild workflow                                                         |
| Festival UI can drift from updated `.stitch/DESIGN.md` tokens  |   Medium | UI agents  | Keep landing/city styling aligned to Brand Red, Natural Green, Warm Beige, Dark Grey tokens              |
| Legacy inbound links to `/landing` may 404 after route removal |      Low | Architect  | Add a host-level redirect to `/` if `/landing` was externally shared                                     |
| Placeholder imagery limits cinematic polish                    |   Medium | UI/content | Replace `/images/placeholder.svg` with approved city, artist, founder, and festival assets before launch |
| Landing artist and partner cards lose multi-city context when the same reference appears in multiple cities | Low | UI/GROQ | Current MVP de-duplicates by `_id` and keeps first city context; aggregate city labels later if editorial needs require it |
| Static host conflicts with flat export files and same-named route payload directories | High | Deployment | Use `trailingSlash: true` directory output; verify slash routes after redeploy |
| Staging reports mixed-content browser console errors | High | Testing | Redeploy directory-style output; verify host no longer redirects slash routes to `http://` |

## Recent significant changes

| Date       | Change                                                                       | Log                                                                |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 2026-05-17 | Added deploy-managed `.htaccess` generation to preserve HTTPS route redirects and custom 404 handling across `rsync --delete` | `docs/logs/2026-05.md` |
| 2026-05-17 | Locally validated directory-style static export route output before staging redeploy | `docs/logs/2026-05.md` |
| 2026-05-17 | Accepted directory-style static export after staging host mixed-content and navigation failures with flat route files | `docs/logs/2026-05.md` |
| 2026-05-17 | Staging deployment went live via GitHub Actions; Phase 7 moved into browser/host testing with mixed-content triage first | `docs/logs/2026-05.md` |
| 2026-05-15 | Scoped Phase 7 GitHub Actions deployment plan for syncing `frontend/out/` to host `www/` webroot | `docs/logs/2026-05.md` |
| 2026-05-15 | Completed Phase 6 integration/UX polish for static-safe metadata, city navigation, newsletter behavior, and production-like export validation | `docs/logs/2026-05.md` |
| 2026-05-12 | Implemented Phase 5.7 code consistency patterns (barrel exports, error handling, SanityImage, Tailwind patterns, ErrorBoundary) | `docs/plans/implementation-plan.md` |
| 2026-05-09 | Standardized section spacing and fixed hero visibility project-wide  | `docs/logs/fix-hero-visibility.md`                                |
| 2026-05-11 | Implemented Sanity-backed landing artists and visible partners section | `docs/logs/landing-sanity-artists-partners-plan.md`                |
| 2026-05-08 | Static export enabled and runtime frontend features removed                  | `docs/logs/static-export-compatibility-implementation.md`          |
| 2026-05-09 | Root festival landing route documented and implemented                       | `docs/logs/root-festival-landing-route-architecture.md`            |
| 2026-05-09 | Phase 5 cinematic landing and city UI MVP implemented                        | `docs/logs/phase-5-cinematic-ui-mvp.md`                            |
| 2026-05-08 | Festival content model ADR and schemas added                                 | `docs/logs/phase-2-festival-content-model-schemas.md`              |
| 2026-05-08 | Root slug route contract and `festivalCity` GROQ integration added           | `docs/logs/phase-3-groq-and-root-static-route-contracts.md`        |
| 2026-05-08 | Festival theme system and city-linking logic centralized                     | `docs/logs/phase-4-theme-system-and-layout-logic.md`               |
| 2026-05-08 | Landing MVP realigned to updated Stitch design guidance and validation fixed | `docs/logs/landing-mvp-design-realignment-and-validation-fixes.md` |
| 2026-05-08 | TicketInfo singleton and `/tickets` MVP route added                          | `docs/logs/ticket-info-schema-and-tickets-mvp-route.md`            |
| 2026-05-07 | Static export implementation plan improved                                   | `docs/logs/static-export-implementation-plan-improved.md`          |
| 2026-05-07 | Project ledger initialized                                                   | `docs/logs/project-ledger-initialized.md`                          |

## Agent handoff notes

- Read this ledger before starting non-trivial work.
- Use ADRs for architecture decisions.
- Use plans for multi-step implementation work.
- Use task-specific logs in `docs/logs/` (e.g., `task-name.md`) for factual task history.
