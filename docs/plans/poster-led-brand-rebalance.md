# Plan: Poster-led red and green brand rebalance

Date: 2026-07-29
Status: Implemented locally; manual visual and staging smoke tests pending
Owner: Architect
Proposed implementing agents: `tailwind-ui-implementer`, `accessibility-ui-tester`, `react-next-component-specialist`

## Goal

Use `artifacts/КРАЇНА МРІЙ 1080х1080.jpg` as the canonical visual reference for the 2026 Lviv landing page. Restore a deliberate, approximately equal perceived presence of Brand Red and Natural Green throughout the experience while preserving one fixed, static Heroic Lviv experience at `/`.

The poster is a single integrated identity: its red folk ornament, festival title, and energetic calls to action are balanced by green date, city, venue, and artist typography. Natural Green must therefore be a first-class active brand accent, not a residual or deleted-theme token.

## Non-goals

- Do not restore city selection, Kamianets content, the former Epic UI, or a visitor-facing theme toggle.
- Do not change the root-route, static-export, or Sanity content contracts.
- Do not introduce client-side colour-state logic, animation libraries, or dependencies.
- Do not recolour body copy, compact metadata, or focus indicators into combinations that fail WCAG AA.
- Do not add unapproved imagery or reinterpret the poster as a reusable production image asset.

## Context

- ADR 0006 requires the homepage to remain a deterministic Heroic Lviv experience. Its preservation of legacy `epic` tokens does not require the live site to look red-only.
- The active source of design truth currently describes Natural Green as “Secondary/Legacy Accent”; that wording conflicts with this brief.
- The poster uses warm beige as a field, bold red for high-energy brand/CTA moments, and green for cultural, place, programme, and artist information. It should guide hierarchy and colour allocation rather than pixel-for-pixel layout replication.
- Current UI audit: the Header, Hero, Buy Tickets block, Artists section, and Footer collectively make red dominate. Existing green usage is concentrated below the fold or appears as minor decoration.

## Relevant files

- `artifacts/КРАЇНА МРІЙ 1080х1080.jpg`
- `.stitch/DESIGN.md`
- `frontend/app/globals.css`
- `frontend/lib/festival-themes.ts`
- `frontend/components/landing/Header.tsx`
- `frontend/components/landing/Hero.tsx`
- `frontend/components/landing/BuyTickets.tsx`
- `frontend/components/landing/AboutFestival.tsx`
- `frontend/components/landing/Founder.tsx`
- `frontend/components/landing/LocationsGrid.tsx`
- `frontend/components/landing/ArtistsLineup.tsx`
- `frontend/components/landing/PartnersSection.tsx`
- `frontend/components/landing/Footer.tsx`
- `frontend/components/tailwind-patterns.ts` (if present; verify before changing)

## Relevant ADRs and constraints

- ADR 0001 — rendering remains compatible with static export.
- ADR 0005 — retain directory-style static output.
- ADR 0006 — fixed Heroic Lviv homepage; no city/theme selector.

**ADR assessment:** No new ADR is required. This is an approved visual-language correction within the existing fixed-theme route decision. If implementation proposes changing `themeKey`, restoring runtime switching, or adding a new palette/asset pipeline, stop and propose an ADR.

## Design direction and token rules

### Active palette roles

| Token | Colour | Active role |
| --- | --- | --- |
| Brand Red / `primary` | `#BF2A26` | Festival name, conversion actions, selected/highlighted moments, folk ornament accents. |
| Natural Green / `secondary` | `#5A6B38` | Date/place/programme/artist culture, section overlines, dividers, informative secondary actions, natural ornament accents. |
| Warm Beige / `background` | `#FFF0D9` | Poster-like field and main surface. |
| Dark Grey / `foreground` | `#232323` | Headings and all long-form/body copy. |

Update `.stitch/DESIGN.md` so Natural Green is no longer called legacy. Retain existing token names to avoid unnecessary code churn.

### Balance rule

Aim for approximately **50/50 perceived red/green brand-accent weight**, not a literal equal number of Tailwind utility classes or equal painted pixels. Warm Beige and Dark Grey remain the neutral base. Assess the complete scroll, not an isolated section.

### Contrast rule

- Use Dark Grey or approved muted foreground for normal copy on Beige.
- Do not use green for paragraph text, small metadata, or white-on-green text unless a measured WCAG AA combination is established.
- Red remains the default visible keyboard-focus colour unless a tested alternative is equally discoverable.
- Red/green must never be the only way users distinguish a location category, selected state, or action.

## Proposed section allocation

| Section | Red role | Green role | Intended implementation |
| --- | --- | --- | --- |
| Header | Logo symbol and ticket CTA | Navigation hover/active treatment where contrast allows | Neutral navigation prevents a red-saturated header. |
| Hero | Founder/signature moment and folk ornament detail | Ethno-festival overline, contextual dot/pattern accents | Keep title readable in Dark Grey; do not dilute the primary CTA. |
| Buy Tickets | Dominant conversion block | Restrained decorative/tone accent only | Preserve clear CTA hierarchy. |
| About + Founder | Minor brand punctuation | Main legacy/nature/story accents, quote treatment, decorative frame | Form the first major green counterweight after CTA. |
| Programme | Selected high-energy categories such as Main Stage and folk celebrations | Cultural, craft, book, mystical, children, and food contexts | Preserve existing CMS-only content and redundant icon/title cues. |
| Line-up | Oleg/VV anniversary highlight | Section label and ordinary informational links | Red remains reserved for the one celebratory artist emphasis. |
| Partners + Footer | Brand mark and any primary CTA | Section/divider accents and descriptive labels | Finish balanced rather than red-heavy. |

## Implementation steps

1. **Establish visual baseline**
   - Capture current desktop (1440px) and mobile (375px) landing screenshots before edits.
   - Record a brief section-by-section red/green audit and verify the poster remains the reference asset, not an image to embed.

2. **Correct design-source language**
   - Update `.stitch/DESIGN.md` with the unified poster-led identity, active Natural Green role, 50/50 perceived-balance rule, contrast constraints, and section rhythm.
   - Do not modify CMS fields, routes, or theme selection.

3. **Apply server-rendered Tailwind refinements**
   - Reassign existing `primary`, `secondary`, `foreground`, and surface utilities in the listed landing components according to the allocation table.
   - Keep Red for the ticket CTA, brand anchor, and anniversary highlight; use Green for culture/contextual/secondary design layers.
   - Preserve the existing semantic structure, focus treatment, responsive layouts, and reduced-motion behaviour.

4. **Review the Programme category tones**
   - Verify CMS `stageType`/name presentation mapping does not depend on colour alone.
   - Shift at most the presentational tone mapping needed to avoid green-only clustering; do not hardcode locations or modify Sanity references.

5. **Validate visual, accessibility, and export behaviour**
   - Test colour contrast for each text/surface pair actually rendered.
   - Perform desktop/mobile screenshot comparison against the poster’s red/green hierarchy.
   - Run keyboard and reduced-motion smoke tests.
   - Run typecheck, lint, and production-like static export.

6. **Document outcome**
   - Update the design source, plan completion notes, monthly log, and ledger with the result and any deviations from the intended balance.

## Verification checklist

- [x] `artifacts/КРАЇНА МРІЙ 1080х1080.jpg` is recorded as the primary visual reference in `.stitch/DESIGN.md`.
- [x] Natural Green is documented as active, not legacy/deleted-theme-only.
- [x] Homepage remains fixed Heroic Lviv with no theme switcher or city selection.
- [ ] Full-page desktop and mobile captures show comparable perceived Red and Green presence.
- [x] CTA hierarchy remains clear: primary ticket action remains Red.
- [x] All rendered normal-text combinations meet WCAG AA; no meaning is conveyed by colour alone.
- [x] `prefers-reduced-motion` and visible keyboard focus were reviewed in code; manual browser verification remains pending.
- [x] `pnpm --filter frontend typecheck` passes.
- [x] `pnpm --filter frontend lint` passes.
- [x] `NEXT_PUBLIC_SITE_URL=https://example.com NEXT_PUBLIC_SITE_ENV=production pnpm --filter frontend build` passes.
- [x] Static output retains `/` and does not emit city routes or client-side theme logic.

## Risks

| Risk | Mitigation |
| --- | --- |
| “50/50” becomes mechanical colour counting | Review screenshots for perceived hierarchy and visual area, with Beige/Dark Grey treated as neutral base. |
| Green used as small body text fails contrast | Limit green to large/bold labels, icons, borders, decoration, and tested controls. |
| Changes accidentally revive the removed theme system | Keep the fixed Heroic shell and make no `themeKey` or runtime-state changes. |
| Poster-inspired ornament becomes visual clutter | Use existing restrained decorative patterns; do not add a competing new illustration system. |
| New artwork/photo content shifts visual balance | Reassess after approved hero/artist assets are attached; the colour rhythm is a system rule, not a one-time screenshot adjustment. |

## Completion notes

Implemented after product approval. The local JPG source files were recompressed to direct WebP public assets (196 KB hero, 304 KB About, 72 KB bird mark, 44 KB border); their original artifact files remain untouched. Accessibility review found no blocker/high issue after the Natural Green token was darkened to `#5A6B38`. Manual full-page desktop/mobile balance comparison and staging smoke tests remain.
