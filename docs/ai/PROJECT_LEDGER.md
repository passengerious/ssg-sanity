# Project Ledger

Last updated: 2026-08-03

## Current phase

Phase 7 staging route-output fix and update-loop validation; Phase 8 single-city Lviv pivot — architecture, interactive fixed two-poster Hero, published nine-location catalog, six-artist lineup, twelve-milestone history, 2024 Kyiv photo rewind, five-logo static partner fallback, and comprehensive SEO audit & legal policy pages (/privacy, /terms, /public-offer) completed locally

## Active priorities

1. Decide whether to replace the approved five-logo static partner fallback with complete published Lviv `partner` references, including verified URLs, levels, and order. The fallback currently renders whenever Sanity returns no partners.
2. Finish Phase 7 staging validation: root-page browser smoke tests, custom 404 body, and repeat deployment/update loop.
3. Prepare Phase 8 production deployment using the same manual GitHub Actions workflow with a different GitHub Environment and production domain.
4. Keep staging non-indexable with `NEXT_PUBLIC_SITE_ENV=development`; production must use `NEXT_PUBLIC_SITE_ENV=production`.
5. Test the documented manual Sanity content update loop once; webhook rebuild automation remains deferred.
6. Treat `.stitch/DESIGN.md` as the source of truth for fixed-Heroic festival UI design tokens and page styling.
7. Complete manual desktop/mobile/keyboard/reduced-motion smoke tests for the campaign Hero, About, Founder, History, Program, and Line-up before the staging deployment check.
8. Complete manual keyboard/touch/screen-reader/reduced-motion testing for the implemented 2024 Kyiv photo rail and native-dialog lightbox.

## Active plans

| Plan                                | Status          | Owner     | Updated    |
| ----------------------------------- | --------------- | --------- | ---------- |
| `docs/plans/implementation-plan.md` | Single-city Lviv festival MVP implemented & verified | Architect | 2026-08-05 |

## Architecture decisions

| ADR                                            | Status   | Decision                                                                                                               | Date       |
| ---------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | ---------- |
| `docs/adr/0001-static-export-to-adm-tools.md`  | Accepted | Use `output: 'export'`; remove frontend API routes, Draft Mode, live editing, and runtime redirects                    | 2026-05-08 |
| `docs/adr/0002-festival-content-model.md`      | Accepted | Use dedicated `festivalCity` documents with city-owned references to locations, artists, and partners                  | 2026-05-08 |
| `docs/adr/0004-root-festival-landing-route.md` | Accepted | Render the festival landing at `/` before launch instead of requiring generic Sanity `page` slug `index`               | 2026-05-09 |
| `docs/adr/0005-directory-style-static-export.md` | Accepted | Use `trailingSlash: true` so static route pages export as directory indexes for host compatibility                    | 2026-05-17 |
| `docs/adr/0006-single-city-lviv-root-route.md` | Accepted | Render the single Lviv festival at `/`; reserve city slugs and keep `/:slug` for generic pages only                  | 2026-07-28 |
| `docs/adr/0007-festival-history-milestones.md` | Accepted | Use ordered inline `festivalMilestone` objects on the canonical Lviv `festivalCity` document | 2026-07-29 |

## Open architecture questions

| Question                                                                  | Impact | Needed decision                                                                              |
| ------------------------------------------------------------------------- | -----: | -------------------------------------------------------------------------------------------- |
| How should newsletter submissions work on static hosting if reintroduced? | Medium | External provider or separate backend that does not expose secrets                           |
| When should Sanity rebuilds become automated?                             | Low | Skipped for now; current MVP uses manual GitHub Actions dispatch after content batches        |
| Should homepage SEO metadata remain code-owned for MVP?                   | Medium | Keep code-owned metadata documented or move SEO fields into a Sanity singleton before launch |

## Current risks

| Risk                                                           | Severity | Owner      | Mitigation                                                                                               |
| -------------------------------------------------------------- | -------: | ---------- | -------------------------------------------------------------------------------------------------------- |
| Static export removes draft preview/live editing               |     High | Architect  | Use Studio-only editing and document rebuild workflow; consider separate preview deployment later        |
| Newsletter signup is disabled on static hosting                |   Medium | Architect  | Choose external form backend or separate endpoint before enabling newsletter collection                  |
| Sanity content updates require rebuilds                        |   Medium | Architect  | Use documented manual GitHub Actions rebuild workflow in `workflow.md`; consider webhook automation later |
| Festival UI can drift from updated `.stitch/DESIGN.md` tokens  |   Medium | UI agents  | Keep landing/city styling aligned to Brand Red, Natural Green, Warm Beige, Dark Grey tokens              |
| Newsletter signup is not connected yet                         |      Low | Product    | Keep disabled for MVP; implement an external form/backend later if needed                                |
| Artist-photo coverage is partial (3 of 6 cards) sm              |   Medium | Content    | Retain intentional placeholders for Braty Hadyukiny, Myroslav Kuvaldin + IBASH, and Burdon until exact approved Ukrainian-described assets are available; do not repurpose `Медовий полин.JPG` |
| Static host conflicts with flat export files and same-named route payload directories | High | Deployment | Use `trailingSlash: true` directory output; verify slash routes after redeploy |
| Staging reports mixed-content browser console errors | High | Testing | Redeploy directory-style output; verify host no longer redirects slash routes to `http://` |
| Static partner fallback has no verified links or partnership levels | Medium | Content | Publish a complete ordered CMS partner set when approved metadata is available; CMS partners replace the fallback automatically |
| Artist schema cannot represent daily performance schedule | Medium | Product/Architecture | Render CMS order only; create a future schema ADR if per-day grouping becomes mandatory |
| Historical source brief contains strong or quantified claims | Medium | Product/Content | High-risk claims are qualified as editorial festival material; attach approved public source URLs before deployment when available |
| Native-dialog gallery lightbox still needs manual assistive-technology testing | Medium | Accessibility/UI | Test keyboard, Escape/backdrop close, focus return, touch, screen readers, 200% zoom, and reduced motion before staging sign-off |
| Interactive Hero poster swap still needs manual browser/assistive-technology validation | Medium | Accessibility/UI | Test keyboard activation, focus ring, dynamic screen-reader description, reduced motion, 320px/400% reflow, and cold-cache network behavior before staging sign-off |

## Recent significant changes

| Date       | Change                                                                       | Log                                                                |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 2026-08-03 | Implemented SEO audit optimizations, purged legacy /tickets entity/schema, updated Footer to direct ticketing URL, added JSON-LD schemas & legal policy pages (/privacy, /terms, /public-offer) | `docs/logs/2026-08.md` |
| 2026-07-28 | Single-city Lviv route consolidation, typed homepage data contract, fixed-Heroic UI, query cleanup, and static-export verification | `docs/logs/2026-07.md` |
| 2026-07-28 | Refactored Lviv places plan and enhanced the CMS-driven Program grid for nine location categories; content population remains pending | `docs/logs/2026-07.md` |
| 2026-07-29 | Published nine Lviv locations, updated the canonical ordered references, and verified live/static output excludes Epic Stage | `docs/logs/2026-07.md` |
| 2026-07-29 | Published the six-artist Lviv lineup and rendered accessible ordered day groups in static/local output | `docs/logs/2026-07.md` |
| 2026-07-29 | Drafted poster-led brand-rebalance and festival-history plans for product review | `docs/logs/2026-07.md` |
| 2026-07-29 | Implemented poster-led red/green rebalance, integrated optimized local image fallbacks, deployed ADR 0007 schema, and published twelve Lviv history milestones | `docs/logs/2026-07.md` |
| 2026-07-30 | Audited refactored 29/30 July visual assets and drafted a curated Hero-first integration plan | `docs/logs/2026-07.md` |
| 2026-07-30 | Integrated approved 30 July campaign art, retired superseded assets, and passed automated static-export/accessibility checks | `docs/logs/2026-07.md` |
| 2026-07-30 | Audited the proposed rewind photo set and planned a curated static gallery, programme cleanup, and bottom About visual consolidation | `docs/logs/2026-07.md` |
| 2026-07-30 | Implemented the licensed 2024 Kyiv photo rail/lightbox, linked Suspilne coverage, published the eight-location programme, and consolidated campaign art | `docs/logs/2026-07.md` |
| 2026-07-31 | Refined the 2024 Kyiv gallery’s caption-free previews, hidden-scrollbar native rail controls, and resilient near-full-viewport lightbox; manual testing remains pending | `docs/logs/2026-07.md` |
| 2026-07-31 | Restored the CMS-owned Ukrainian ethno-foodcourt as the ninth Lviv Programme card after correcting the mistaken removal; the separate static food callout/image remains removed | `docs/logs/2026-07.md` |
| 2026-07-31 | Published exact-match photos for КОМУ ВНИЗ and ГАЙДАМАКИ; with the existing Oleg/VV image, lineup photo coverage is three of six cards | `docs/logs/2026-07.md` |
| 2026-07-31 | Narrowed the Hero presentation contract and removed unused `slug`/`themeKey` fields from the generated homepage query result | `docs/logs/2026-07.md` |
| 2026-07-31 | Converted five approved partner marks to compact WebP files and added a CMS-deferential static Partners fallback | `docs/logs/2026-07.md` |
| 2026-07-31 | Replaced the Sanity Hero image path with an accessible two-poster local composition and deferred the full rear poster until interaction | `docs/logs/2026-07.md` |
| 2026-06-01 | Scoped next phase: production uses same manual workflow with a separate GitHub Environment; content refresh and newsletter remain future waves | `docs/logs/2026-06.md` |
| 2026-05-17 | Documented manual code and Sanity content update workflows in `workflow.md`, with webhook automation deferred | `docs/logs/2026-05.md` |
| 2026-05-17 | Replaced landing-wide hover theme mutation with local Epic/Heroic city-card accents while keeping plain-anchor city navigation | `docs/logs/2026-05.md` |
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
