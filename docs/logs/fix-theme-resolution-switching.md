# Fix theme resolution switching

## 2026-05-11

### Task

Restore dynamic festival theme color resolution after the font integration commit.

### Agent/Subagent

- Agent: architect
- Subagent: debugger

### Summary

Kept the CSS-native brand font implementation in `@font-face` and `@theme`, but moved dynamic Tailwind color token mappings back into `@theme inline`. This makes utilities such as `text-primary`, `bg-primary`, and `ring-primary` resolve directly to the current scoped CSS variables from `.festival-theme[data-theme="epic"]` and `.festival-theme[data-theme="heroic"]` instead of through root-level `--color-*` indirection.

### Files changed

- `frontend/app/globals.css`
- `docs/logs/fix-theme-resolution-switching.md`

### Verification

- Clean build: `rm -rf frontend/.next frontend/out && pnpm --filter frontend build` passed.
- Export verification confirmed `/` contains city links to `/kamianets` and `/lviv`.
- Export verification confirmed `/` and `/kamianets` use `data-theme="epic"`, while `/lviv` uses `data-theme="heroic"`.
- Compiled CSS verification confirmed `.text-primary` resolves to `var(--primary)` and both `.festival-theme[data-theme=epic]` and `.festival-theme[data-theme=heroic]` are present.
- `pnpm --filter frontend lint` passed.
- `pnpm --filter frontend typecheck` passed.
- `git diff --check` passed.

### Risks

- Browser-level hover/theme switching still needs a manual visual smoke test because no browser automation is configured in this repository.
- The known non-fatal `--localstorage-file` warning still appears during static generation.

### Follow-ups

- [ ] Manually verify landing hover switching between Kamianets/epic and Lviv/heroic in a browser.
- [ ] Keep dynamic color tokens in `@theme inline` if future typography or token cleanup occurs.
