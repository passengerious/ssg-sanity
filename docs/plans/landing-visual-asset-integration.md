# Plan: Curated 30 July visual asset integration

Date: 2026-07-30
Status: Implemented locally — manual browser and staging smoke tests pending
Owner: Architect
Proposed implementing agents: `tailwind-ui-implementer`, `react-next-component-specialist`, `accessibility-ui-tester`, `performance-build-auditor`

## Goal

Replace the current generated/unconfirmed Hero fallback and evolve the Lviv landing into a curated visual journey using the supplied `artifacts/img/30.07` campaign artwork and graphical elements. The page should feel intentionally art-directed across Hero, About, History, Programme, and Line-up while retaining a fast, accessible, static export.

This plan treats the new campaign work as **editorial art**, not a set of interchangeable backgrounds: use a small, purposeful subset at readable aspect ratios, keep all meaningful text in HTML, and use motifs as decoration only after they are sliced from the supplied illustration sheet.

## Non-goals

- Do not reintroduce theme switching, multi-city routes, client-side carousels, or scroll animation.
- Do not publish every supplied asset just because it exists.
- Do not make campaign-poster text the only expression of a message, date, or CTA.
- Do not add images to Sanity or change schemas in this phase; source images remain local static assets.
- Do not use campaign portraits with conflicting event details. The refreshed Oleg Skrypka source was re-reviewed, contains no conflicting `09.09` detail, and is approved for this wave.
- Do not use the large `illustrations.png` contact sheet directly in the browser.

## Source inventory and decision matrix

### 29 July archive — retain as source/reference, retire from primary landing use

| Asset | Assessment | Decision |
| --- | --- | --- |
| `29.07/reference 1080х1080.jpg` | First visual reference poster. | Retain as design reference only; do not ship. |
| `29.07/stage1.jpg` | Current Hero fallback, generated/unconfirmed per product direction. | Replace; remove its public derivative once the new Hero art is shipped. |
| `29.07/stage2.jpg` | Earlier festival-stage fallback. | Supersede in About with a confirmed 30 July narrative image. |
| `29.07/visual1.jpg` | Red bird mark. | Superseded by the richer 30 July illustration sheet; retain only if a compact bird crop is needed before new motif crops exist. |
| `29.07/visual2.jpg` | Folk border. | Superseded by a crop from `30.07/illustrations.png` only after the crop is prepared. |

### 30 July campaign artwork — planned use

| Asset | Visual content | Landing role | Decision |
| --- | --- | --- | --- |
| `post 1080_1350-2.png` | Beige bird, mountains, “Традиції, що звучать сьогодні”. | **Primary Hero art** on desktop. | Use in a split Hero art panel, not as a full-bleed background. |
| `mobile/visuals_1080'1920.png` | Narrow/mobile variation of the bird campaign. | **Mobile Hero art direction**. | Use only as the mobile source for the same Hero concept. |
| `post 1080_1350-5.png` | Multigenerational family in traditional dress. | **About** image. | Use to make the “for every generation” promise concrete. |
| `post 1080_1350-6.png` | Bird/mountain campaign, “Живий у ритмі традицій”. | **History** supporting art. | Use as one capped visual interlude after the timeline, not repeated as a card background. |
| `post 1080_1350-3.png` | Folk dance/community, red campaign. | **Line-up / live-culture** supporting art. | Use as a section-side editorial image or a compact callout after artists; do not portray it as a named artist. |
| `post 1080_1350-1.png` | Green “Смак рідної землі”. | Former Programme food accent. | Do not render: the separate static food visual/callout remains removed; the CMS food-court card remains in the programme. |
| `post 1080_1350-4.png` | Green “Знайдемо світ разом”. | Community/partner narrative. | Do not render: five approved partner logos now supply the empty-CMS fallback without adding a generic campaign card. |
| `mobile/visuals(2)_1080'1920.png` | Narrow version of the folk-dance red campaign. | Mobile art direction for `post …-3`. | Use only if the Line-up image is approved for deployment. |
| `mobile/visuals(3)_1080'1920.png` | Narrow version of the green food campaign. | Former mobile food accent. | Do not render: the separate static food visual/callout remains removed. |
| `mobile/Oleg Skrypka_1080'1920.png` | Refreshed Oleg Skrypka portrait campaign without the earlier conflicting event detail. | **Founder portrait**. | Approved and integrated as an optimized local derivative. |
| `illustrations.png` | 2.1 MB contact sheet: wreath, birds, flowers, geometric motifs, bird, folk border. | Decorative system source. | Slice selected motifs into optimized files; do not ship the contact sheet. |

## Hero decision

The Hero must stop using `stage-1.webp`, which derives from the unconfirmed 29 July material.

Implement a responsive split Hero with a fixed local two-poster composition:

- **Foreground/LCP:** `lineup-community.webp` starts as the 4:5 foreground poster and is the only initial eager/high-priority image.
- **Rear preview:** a compact `post-poster-2-preview.webp` provides the layered bird-poster treatment without transferring the full poster during initial load.
- **Interaction:** one keyboard-operable button swaps the posters. The full `post-poster-2.webp` is requested only when promoted to the foreground; there is no autoplay or duplicate overlapping control.
- **Semantic content:** the festival title, Lviv, date, venue, ticket CTA, and meaningful poster descriptions remain available as HTML. Nested poster images are presentational inside the labelled swap control.
- **CMS status:** the Sanity `heroImage` schema field remains available, but the root query and Hero do not consume it during this fixed campaign-art phase.

## Section composition

1. **Hero — Community / tradition**
   - Beige base, red community photography, bird poster, and green contextual accents preserve the fixed Heroic balance.
   - The artwork is one labelled, user-triggered two-poster control beside the semantic event text, never a background behind interactive copy.

2. **About — Family / belonging**
   - Replace the stage photograph with the family image from `post …-5`.
   - Keep the existing HTML “Територія мрій” copy and list. The photo provides visual proof of generational inclusion without relying on image text.

3. **History — Heritage / continuity**
   - Keep the CMS timeline as the information source.
   - Add one `post …-6` image below the ordered list as a visual pause; it must not split chronology or repeat every milestone.

4. **Programme — Taste / craft**
    - Preserve the CMS-only active location grid of nine ordered references, including `Український етно-фудкорт` as the final card.
    - Keep the separate static food-culture visual/callout and `program-food.webp` removed; do not hardcode a second location catalog.
    - The existing keyword resolver provides the food card’s ChefHat treatment; static poster wording must not replace the CMS location name or description.

5. **Line-up — People / shared rhythm**
   - Keep named artists and day grouping wholly CMS-driven.
   - Add `post …-3` as an editorial festival-culture image after the artist grid/announcement, with an accurate generic alt such as “Учасники фестивальних народних танців”. It must not imply that pictured people are the listed performers.

6. **Partners / community**
    - Keep `post …-4` unused. When CMS partners are empty, render the approved five-logo static fallback; complete published CMS references replace that fallback automatically.

7. **Decorative system**
   - Export a minimal set of individual decorative derivatives from `illustrations.png`: one bird, one small floral/geometric motif, and one horizontal folk border.
   - Use them in no more than two places each: section separators, Hero/History corners, and/or Footer. They are `aria-hidden` with empty alt text.
   - Avoid stacking the same bird motif next to campaign art that already contains a large bird.

## Image processing and performance contract

1. Preserve `artifacts/img/**` as source material; never edit or move it during implementation.
2. Write deployment derivatives to `frontend/public/images/festival/30-07/`.
3. Convert only approved assets to WebP or AVIF/WebP with appropriate quality and dimensions:
   - Hero desktop: target rendered width around 720–900px; budget approximately 180–250 KB.
   - Hero mobile: target 540–720px wide; budget approximately 120–180 KB.
   - Below-fold editorial images: target 480–720px wide; budget approximately 100–180 KB each.
   - Motif/border crops: target under 50 KB each.
4. Preserve source aspect ratio for full campaign compositions. Use `object-contain` where composition text/art must not be cropped; use crop only for approved photographic regions that contain no misleading campaign date/text. A reduced-resolution preview may be used for a partially obscured rear poster when the full source is deferred until interaction.
5. Use one high-priority Hero image only. All below-fold images use lazy loading and explicit layout/aspect-ratio containers to prevent CLS.
6. Prefer static imports or explicit `width`/`height` with accurate `sizes`; do not rely on CSS background images for the LCP asset.
7. Delete superseded public 29 July derivatives only after the replacement build confirms no references remain.

## Relevant files for implementation

- `artifacts/img/29.07/**`
- `artifacts/img/30.07/**`
- `frontend/public/images/festival/**`
- `frontend/components/landing/Hero.tsx`
- `frontend/components/landing/AboutFestival.tsx`
- `frontend/components/landing/HistoryTimeline.tsx`
- `frontend/components/landing/LocationsGrid.tsx`
- `frontend/components/landing/ArtistsLineup.tsx`
- `frontend/components/landing/PartnersSection.tsx`
- `frontend/components/landing/Founder.tsx`
- `frontend/components/landing/LandingExperience.tsx`
- `.stitch/DESIGN.md`
- `docs/ai/PROJECT_LEDGER.md`

## ADR assessment

No new ADR is needed while this remains a local-static-asset, presentation-only enhancement within ADR 0006’s static-root contract. Create or propose an ADR if implementation changes the image ownership model—for example, moving the campaign library into Sanity, adding responsive-image build tooling/dependencies, or introducing a reusable CMS media-gallery model.

## Implementation steps

1. [x] Confirm the Hero campaign-art selection and resolve the refreshed Oleg portrait approval gate.
2. [x] Define derivative names, section roles, alt strategy, crop policy, and byte budgets.
3. [x] Generate optimized public derivatives and remove superseded public copies after reference checks.
4. [x] Implement the fixed split Hero with one initial LCP image, semantic event facts/CTA, a lightweight rear preview, and a single accessible poster-swap control; retain the Sanity schema field but remove homepage image precedence.
5. [x] Integrate approved secondary visuals in About, Founder, History, Programme, and Line-up with the semantic constraints above.
6. [x] Add the optimized decorative border only; remove unused motif derivatives and hide decoration from assistive technology.
7. [x] Update `.stitch/DESIGN.md` and validate type checks, lint, static export, static output, accessibility, and image budgets.
8. [ ] Complete manual desktop/mobile/keyboard/reduced-motion and staging smoke tests.

## Verification checklist

- [x] Unconfirmed `29.07/stage1.jpg` is no longer referenced by the deployed Hero.
- [x] Hero event facts and CTA remain real HTML, independent of embedded poster text.
- [x] Exactly one Hero image receives priority; the active static output contains one image preload and mutually exclusive Hero branches.
- [x] Initial static output contains `lineup-community.webp` and the compact rear preview, omits the full bird poster and retired Hero files, and requests the full poster only after interaction.
- [x] All below-fold editorial images are lazy-loaded, have stable dimensions, and accurate alt text.
- [x] The decorative border is 49,514 bytes, `aria-hidden`, and the 2.1 MB contact sheet is not deployed.
- [x] Programme and Line-up retain CMS-owned locations/artists; static art does not misidentify people or duplicate content models.
- [x] The refreshed Oleg portrait was approved after confirming the conflicting detail is absent.
- [x] Red/green balance remains within the fixed Heroic design system and uses the AA-safe Green token.
- [x] Frontend/studio type checks, frontend lint, production-like static build, and `git diff --check` pass.
- [x] Static output contains only approved `30-07` public derivatives and no retired public image references.
- [ ] Manual desktop/mobile/keyboard/reduced-motion and staging smoke tests pass.

## Risks

| Risk | Mitigation |
| --- | --- |
| Campaign graphics contain event copy that conflicts with the 2026 Lviv event | Treat poster wording as visual support; keep current event facts in HTML and gate the dated Oleg artwork. |
| Too many vertical posters make the page slow or visually repetitive | Select only Hero + 3–4 secondary compositions; impose byte budgets and alternate red/green sections. |
| Full poster text is inaccessible or duplicated | Provide semantic HTML equivalent where a visual is meaningful; do not use image text as sole content. |
| Contact-sheet asset inflates page weight | Crop individual motifs and never serve `illustrations.png` directly. |
| Static artwork bypasses the CMS’s normal image editing workflow | Document local-source ownership and retain the Sanity schema field as a future option even though the root query currently omits it. |
| Cropping makes a photo falsely imply artist/founder identity | Use accurate generic alt text; use portrait artwork only after provenance is approved. |

## Completion notes

Implemented locally on 2026-07-30 and revised on 2026-07-31 to use a fixed local two-poster Hero. The initial export emits one 68 KB eager/high-priority community poster plus a 29.8 KB lazy/low-priority rear preview; the 141 KB full bird poster is absent from initial HTML and loads only after the single accessible swap control is activated. The Sanity image schema field remains, but the homepage query no longer projects it. Automated static-export, performance, code, and accessibility checks pass; manual browser, network, reduced-motion, and staging smoke tests remain pending.
