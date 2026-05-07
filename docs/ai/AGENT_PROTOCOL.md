# Agent Protocol

## Before work

For non-trivial tasks, agents must:

1. Read `AGENTS.md`, if present.
2. Read `docs/ai/PROJECT_CONTEXT.md`.
3. Read `docs/ai/PROJECT_LEDGER.md`.
4. Check relevant ADRs and plans.
5. State assumptions before editing files.

## During work

Agents should preserve architectural intent and avoid unrelated refactors.

### When changing Sanity

- Check whether schema changes affect GROQ queries.
- Check whether frontend types or components need updates.
- Document breaking content model changes.
- Avoid content model changes without an ADR when they affect long-term editorial structure.

### When changing Next.js SSG

- Check build behavior.
- Check route generation.
- Check metadata generation.
- Check image handling.
- Check whether revalidation or rebuild strategy changes.

### When changing Tailwind UI

- Keep components accessible.
- Preserve responsive behavior.
- Prefer reusable components over one-off styling.
- Avoid visual drift from established patterns.

## After work

Append to `docs/logs/YYYY-MM.md`:

- Date
- Agent/task
- Summary
- Files changed
- Verification performed
- Risks or follow-ups

Update `docs/ai/PROJECT_LEDGER.md` if the change affects:

- Architecture
- Active plans
- ADR status
- Known risks
- Open questions
