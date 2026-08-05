# Project Context

## Stack

- **CMS:** Sanity Studio (v5) hosted under `studio/`
- **Frontend:** Next.js (v16) with Static Site Generation (`output: 'export'`)
- **Styling:** Tailwind CSS (v4) with CSS custom properties
- **Content Query Layer:** GROQ via `next-sanity` / `@sanity/client`
- **Deployment Target:** Static host webroot via GitHub Actions syncing `frontend/out/`
- **Production Environment Flag:** `NEXT_PUBLIC_SITE_ENV=production`

## Product Summary

**Країна Мрій (Kraina Mriy Fest)** is Ukraine's premier international ethno-cultural festival founded by Oleg Skrypka. The 2026 jubilee edition takes place on 15–16 August 2026 at Culture Park in Lviv. The website serves as the primary digital hub for festival-goers, offering artist lineup listings, stage schedules, festival grounds maps, historical milestones, and external ticket purchasing integration.

## Architecture Summary

- **Sanity Schemas (`studio/schemas/`):** Document models for `artist`, `partner`, `location`, `festivalCity`, `page`, `post`, `category`, `author`, `faq`, `testimonial`, `navigation`, and `settings`.
- **GROQ Query Layer (`frontend/sanity/`):** Centralized GROQ queries projecting content fields into typed React view models.
- **Next.js Routes (`frontend/app/`):**
  - `/` — Canonical festival homepage (Lviv 2026 edition) per ADR 0004 & ADR 0006.
  - `/privacy` — Legal Privacy Policy page.
  - `/terms` — Legal Terms of Use page.
  - `/public-offer` — Legal Public Offer page.
  - `/:slug` — Dynamic Sanity page rendering.
- **Static Export Strategy (`output: 'export'`):** Uses `trailingSlash: true` (ADR 0005) so routes export as directory index files (`frontend/out/index.html`, `frontend/out/privacy/index.html`, etc.) compatible with static hosting environments (`adm.tools`).
- **SEO & Metadata:** Includes 100% descriptive image alt coverage, OpenGraph & Twitter social cards, `MusicEvent` & `Organization` JSON-LD schemas, Web App Manifest (`site.webmanifest`), favicons, sitemap, and robots.txt.
- **Deployment & Rebuild Strategy:** Manual GitHub Actions dispatch builds static frontend and syncs `frontend/out/` into public webroot.

## Important Directories

```text
frontend/             # Next.js 16 SSG web application
  ├── app/            # App Router routes (/ , /privacy, /terms, /public-offer, /:slug)
  ├── components/     # Modular React components & landing sections
  ├── public/         # Static images, fonts, site.webmanifest, favicons
  └── sanity/         # GROQ query definitions & Sanity client helpers
studio/               # Sanity Studio CMS project (standalone workspace)
  ├── schemas/        # Document & block schemas
  └── structure.ts    # Studio navigation & desk structure
docs/                 # Architecture decision records, plans, logs, and AI context
  ├── adr/            # Architecture Decision Records (0001 - 0007)
  ├── plans/          # Active & completed technical implementation plans
  ├── logs/           # Monthly log ledgers (2026-07.md, 2026-08.md)
  └── ai/             # Project context, ledger, and agent protocol
```

## Current Constraints

- Use static generation (`output: 'export'`) by default.
- GitHub Actions deploys the contents of `frontend/out/` to the webroot.
- `NEXT_PUBLIC_SITE_URL` must be the actual public website URL (`https://...`).
- `NEXT_PUBLIC_SITE_ENV=production` must be set during production static export compilation.
- Use directory-style static export routes (`trailingSlash: true`).
- Keep Sanity content models stable and migration-friendly.
- Keep GROQ queries centralized under `frontend/sanity/`.

## Known Risks

| Risk                          | Impact | Mitigation                                 |
| ----------------------------- | -----: | ------------------------------------------ |
| Weak Sanity schema governance |   High | Record schema decisions in ADRs            |
| GROQ query duplication        | Medium | Centralize queries in `frontend/sanity/`   |
| SSG freshness issues          | Medium | Document manual build & redeploy workflow  |
| SEO metadata drift            | Medium | Keep metadata strategy documented          |

## Glossary

| Term | Meaning                      |
| ---- | ---------------------------- |
| ADR  | Architecture Decision Record |
| SSG  | Static Site Generation       |
| GROQ | Sanity Query Language        |
