# Project Context

## Stack

- CMS: Sanity
- Frontend: Next.js with SSG
- Styling: Tailwind
- Content query layer: GROQ
- Deployment target: TODO

## Product summary

TODO: describe the product, audience, business goal, and core user journeys.

## Architecture summary

TODO: describe the main architecture:

- Sanity schemas
- GROQ query layer
- Next.js routes
- Static generation strategy
- Preview/draft mode, if used
- SEO metadata strategy
- Image handling strategy
- Deployment and rebuild strategy

## Important directories

```text
sanity/
src/
app/ or pages/
components/
lib/
docs/
```

## Current constraints

- Use static generation by default unless an ADR documents otherwise.
- Keep Sanity content models stable and migration-friendly.
- Avoid over-engineering schemas before editorial needs are clear.
- Prefer reusable content blocks where editorial flexibility is required.
- Keep Tailwind components composable, responsive, and accessible.
- Keep GROQ queries centralized where practical.

## Known risks

| Risk                          | Impact | Mitigation                                 |
| ----------------------------- | -----: | ------------------------------------------ |
| Weak Sanity schema governance |   High | Record schema decisions in ADRs            |
| GROQ query duplication        | Medium | Centralize queries in a Sanity query layer |
| SSG freshness issues          | Medium | Document revalidation or rebuild strategy  |
| SEO metadata drift            | Medium | Keep metadata strategy documented          |
| UI inconsistency              | Medium | Prefer reusable Tailwind components        |

## Glossary

| Term | Meaning                      |
| ---- | ---------------------------- |
| ADR  | Architecture Decision Record |
| SSG  | Static Site Generation       |
| GROQ | Sanity query language        |
