# Project Agent Instructions

This project uses Sanity + Next.js SSG + Tailwind.

Before making architectural or implementation changes, read:

1. `docs/ai/PROJECT_CONTEXT.md`
2. `docs/ai/PROJECT_LEDGER.md`
3. Relevant ADRs from `docs/adr/`
4. Relevant plans from `docs/plans/`

## Operating rules

- Do not introduce architectural changes without either referencing an existing ADR or proposing a new ADR.
- For any non-trivial task, create or update a plan in `docs/plans/`.
- After completing work, append a concise entry to `docs/logs/YYYY-MM.md`.
- If the task changes project direction, update `docs/ai/PROJECT_LEDGER.md`.
- Keep logs factual: what changed, why, affected files, verification, risks, next steps.
- Do not store secrets, API keys, tokens, credentials, or private client data in project logs.

## Stack conventions

- Next.js is used for static generation unless explicitly documented otherwise.
- Sanity is the source of structured content.
- Tailwind is the default styling system.
- Prefer typed content contracts between Sanity schemas, GROQ queries, and frontend components.
