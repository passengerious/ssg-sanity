# Plan: Festival photo rewind gallery and landing editorial cleanup

Date: 2026-07-30
Status: Implemented locally — manual browser and staging smoke tests pending
Owner: Architect
Proposed implementing agents: `react-next-component-specialist`, `tailwind-ui-implementer`, `sanity-groq-specialist`, `accessibility-ui-tester`, `performance-build-auditor`

## Goal

Add a curated, accessible photo-rewind section to the Lviv landing using selected source photographs from `artifacts/img/30.07/rewind-2024/`, remove only the separate static food-court callout and `program-food.webp` while preserving the CMS-driven `Український етно-фудкорт` Programme card, and consolidate the existing `history-rhythm.webp` and `lineup-community.webp` campaign visuals into the bottom CMS-backed `Про фестиваль` section.

The gallery should show the breadth of festival life—music, shared ritual, crafts, reading, dance, and audience participation—without shipping all 30 source files or introducing a heavy carousel dependency.

## Confirmed provenance and rights

Product confirmed that the photographs document the 2024 event, held from 21 to 23 June at the M. M. Hryshko National Botanical Garden in Kyiv. The event brought together Crimean Tatar artist performances, poetry readings, and charitable fundraising. The archive includes `книжкова.jpeg` with the `Військо читає` and `Книжкова стежка` displays, but product later replaced that gallery selection with the `Світ без русні` charity-art image.

Product also confirmed:

1. the project has a licence to publish these photographs; and
2. visible photographer credits are not required for this use.

The source directory has been renamed to `rewind-2024`. Per product instruction, deployment derivatives use `frontend/public/images/festival/rewind-2014/`; this legacy public path is an implementation path only and must not be exposed as visitor-facing 2014 copy.

## Decision: do not add all 30 images

Do **not** add all images from the directory.

- The 30 originals total approximately 112 MB and individual files reach about 7.4 MB.
- Several files repeat the same circle dance, stage performance, portrait, or audience moment.
- Sponsor-heavy, repetitive, weakly framed, or context-sensitive images are outside the curated sequence.
- A focused ten-image sequence gives the gallery a clearer story while retaining a bounded responsive-image budget.

Preserve every original under `artifacts/img/30.07/rewind-2024/`; publish optimized derivatives for approved selections only.

## Final ten-image selection

The order moves from a broad festival view into participation, culture, and a human closing moment.

| Order | Source file | Role | Draft accessible/editorial direction |
| ---: | --- | --- | --- |
| 1 | `9R4A8010.jpeg` | Establishing view | Wide festival grounds with a shared circle, traditional clothing, tents, and stage. |
| 2 | `DSC_3324.jpg` | Community dance | Shared dance around a decorated ritual tree, with traditional clothing in the foreground. Replaces the handpan image. |
| 3 | `9R4A0343.jpeg` | Folk ensemble | Violin, accordion, and drum ensemble on stage. |
| 4 | `Країна мрій - @rybka.in.ua-5892.jpg` | Contemporary performance | Singer in a colourful stage costume performing with a band. Added by product. |
| 5 | `DSC04639.jpg` | Bandura ensemble | Musicians, including a service member, performing with banduras and violin. Added by product. |
| 6 | `DSC_3457.jpg` | Shared dance | Adults and children hold hands in a shared outdoor dance, with traditional clothing among the participants. Replaces the makers portrait by product direction. |
| 7 | `Країна мрій - @rybka.in.ua-5756.jpg` | Workshop | Visitor taking part in a plant or floral craft workshop. |
| 8 | `DSC04387.jpg` | Charity art | Man in an embroidered shirt beside a yellow world-map artwork titled `Світ без русні`. Replaces the book-programme image. |
| 9 | `9R4A8116.jpeg` | Festival circle | Large shared circle beside the stage in the botanical garden. Replaces the portrait dance image. |
| 10 | `Країна мрій - @rybka.in.ua-5969.jpg` | Audience close | Festival visitor in an embroidered blouse applauding outdoors. |

### Hold or exclude from this wave

- Remaining near-duplicate circle coverage: `DSC_3327.jpg`, `DSC_3350.jpg`, `DSC_3412.jpg`, and `DSC_3418.jpg`.
- Remaining redundant stage/performance frames: `DSC03662.jpg`, `DSC_3542.jpg`, `Країна мрій - @rybka.in.ua-5899.jpg`.
- Superseded selections retained as source only: `9R4A0249.jpeg`, `DSC_3127.jpg`, `DSC_3130.jpg`, `книжкова.jpeg`, and `DSC_3581.jpg`.
- Sponsor-specific image: `агросем.jpeg`; use only in an approved partner context.
- Other unused frames: `DSC03868.jpg`, `DSC04633.jpg`, `DSC_3086.jpg`, `DSC_3140.jpg`, `DSC_3199.jpg`, `DSC_3262 2.jpg`, and `Країна мрій - @rybka.in.ua-5847.jpg`.

The final product-directed selection contains ten images. Further additions require another deliberate performance and editorial review.

## Gallery interaction and accessibility contract

Implement the first version as a server-rendered native horizontal gallery, not an autoplay or dependency-backed carousel.

- Semantic structure: `<section>` with an `h2`, explanatory paragraph, and `<ul>` of `<li><figure><picture><img>` thumbnail items. Preview captions are intentionally not rendered visually; each thumbnail retains detailed Ukrainian alternative text and an explicit Ukrainian accessible action name, while its caption remains visible in the lightbox.
- The intro/header follows the History section’s centered, narrow `max-w-4xl` rhythm.
- Mobile/tablet/desktop: horizontally scrollable rail with a visually hidden scrollbar and `scroll-snap-type: x proximity`; do not use mandatory snapping that traps trackpad scrolling. Touch, trackpad, and native scrolling remain available.
- Keep all figures in normal DOM order and available to assistive technology.
- No autoplay, infinite looping, cloned slides, hidden offscreen slides, dot-tab semantics, or global arrow-key interception.
- Use touch/trackpad/native scrolling. The scrollport may be keyboard-focusable only if browser testing confirms that this improves keyboard scrolling and it has a visible focus treatment and accessible name.
- Include visible Ukrainian guidance such as `Гортайте фото`, a partial-next-card/mobile native-scroll affordance, and minimal desktop-only Previous/Next controls. Controls scroll about one card, never loop, maintain disabled endpoint states, update on scroll and resize, and switch from smooth to instant scrolling for reduced-motion users.
- Respect `prefers-reduced-motion`; do not add slide transforms or smooth scrolling for reduced-motion users.
- Do not add `aria-roledescription="carousel"`; this is a semantic scrollable photo list.

Add the product-requested lightbox as a narrowly scoped Client Component using native `<dialog>` opened with `showModal()`. Each gallery image is a native button with an explicit Ukrainian accessible name. The near-full-viewport dialog uses a transparent shell/image area, dark translucent backdrop, and individually high-contrast control and caption surfaces. It contains vertical overflow and overscroll for short viewports and 200% zoom, while preserving a visible Close button, Escape dismissal, backdrop/light-dismiss fallback for Safari, Previous/Next buttons with disabled endpoint states, a visible `n з 10` counter, descriptive image alt/caption, and focus return to the triggering thumbnail. Do not add a carousel or lightbox package.

## Image-processing and performance contract

1. Preserve source originals unchanged under `artifacts/`.
2. Publish derivatives under the product-requested `frontend/public/images/festival/rewind-2014/` namespace while keeping all visitor-facing copy explicitly tied to 2024.
3. Generate two WebP widths per selected image: approximately 600w and 1200w. The 1200w derivative also serves the on-demand lightbox. Add AVIF only if it uses existing tooling and does not introduce a new dependency solely for this task.
4. Target budgets:
   - 600w WebP: target no more than about 80 KB;
   - 1200w WebP: target no more than about 180 KB;
   - full ten-image slider browsing path: target no more than about 1.6 MB;
   - generated deployment derivatives: target no more than about 2.4 MB total.
5. Use width-based `srcset` and an explicit `sizes` contract such as `(min-width: 1024px) 31vw, (min-width: 640px) 52vw, 82vw`.
6. All gallery images are below the fold: `loading="lazy"`, `decoding="async"`, explicit intrinsic dimensions, and no preload or high fetch priority.
7. Prefer source aspect ratios or editorially approved crops. Do not crop meaningful signs, faces, dance movement, or the book-programme context merely to make every card identical.
8. `CampaignArtwork` may continue serving the two campaign visuals, but the rewind gallery needs a width-responsive local image component or explicit `<picture>` markup because `CampaignArtwork` currently provides art direction rather than width variants.

## Section placement and copy

Place the gallery after `HistoryTimeline` and before `LocationsGrid`:

`History → photo rewind → current Programme → Line-up → Partners → bottom Про фестиваль`

Use the confirmed event copy:

- Overline: `Київ · 2024`
- Heading: `Країна Мрій у Києві: 21–23 червня 2024`
- Intro: `Фестиваль проходив у Національному ботанічному саду імені М. М. Гришка. Подія об’єднала виступи кримськотатарських артистів, поетичні читання та благодійні збори.`

Do not use `Назад у 2014` or other copy that conflicts with the confirmed 2024 event.

Media context appears directly beneath the event paragraph:

- Publisher: `Суспільне Крим`
- Article: `На міжнародному етнофестивалі “Країна Мрій” відкрилася Кримська сцена`
- URL: `https://suspilne.media/crimea/774365-na-miznarodnomu-etnofestivali-kraina-mrij-vidkrilasa-krimska-scena/`
- The accessible external link identifies the publisher/title and announces that it opens in a new tab.

## Remove the separate food-court callout, retain the CMS card

Product clarified on 2026-07-31 that the completed cleanup must remove only the separate static food-court callout and `program-food.webp`. The published canonical Lviv `festivalCity` must retain the ninth/final reference to:

- location ID: `a1e96ff0-f399-46ad-8c4f-1b5849c28c3b`
- slug: `ukrainskyi-etno-foodcourt`
- name: `Український етно-фудкорт`

Content workflow:

1. Preserve or restore the matching reference on canonical Lviv document `e1841ff3-3179-44f8-b4cf-69508aa4fa3b` as the ninth/final `locations` item with key `locfoodcourt1`, then publish the Lviv document.
2. Keep the standalone `location` document published; do not unpublish or delete it as part of this task.
3. Verify the published Lviv location order contains nine items, ends with `Український етно-фудкорт`, and still includes `Книжкова Країна Мрій`.
4. Remove the now-unneeded static `program-food.webp` callout and its conditional UI from `LocationsGrid`; retain the generic food category resolver, which displays the ChefHat food treatment for this CMS entry.
5. Update `docs/plans/places.md`, the project ledger, and the task log to reflect nine active locations and the static-callout-only removal.

No schema, GROQ, TypeGen, or frontend code change is required for this content correction.

## Move the existing campaign visuals

Move, do not duplicate:

- `history-rhythm.webp` out of `HistoryTimeline`;
- `lineup-community.webp` out of `ArtistsLineup`.

Create a named server-rendered bottom section, for example `FestivalAboutContent`, to replace the anonymous `#about-content` wrapper in `LandingExperience`.

- Render the existing CMS `festivalCity.body` content, whose published heading is `Про фестиваль`.
- Place the two campaign visuals beneath the Portable Text in a responsive two-image `<ul>`/`figure` composition.
- Keep both lazy-loaded with intrinsic dimensions and existing accurate alt text; add concise visible captions only if product wants to distinguish current campaign artwork from documentary photography.
- Do not mix these two illustrations into the photo-rewind rail or present them as historical evidence.
- Render the images only with the bottom body section so they do not appear without narrative context.

## Relevant files and content

- `artifacts/img/30.07/rewind-2024/**`
- `frontend/components/landing/LandingExperience.tsx`
- `frontend/components/landing/HistoryTimeline.tsx`
- `frontend/components/landing/ArtistsLineup.tsx`
- `frontend/components/landing/LocationsGrid.tsx`
- `frontend/components/landing/CampaignArtwork.tsx`
- proposed `frontend/components/landing/FestivalPhotoGallery.tsx`
- proposed `frontend/components/landing/FestivalAboutContent.tsx`
- `frontend/public/images/festival/**`
- `.stitch/DESIGN.md`
- `docs/plans/places.md`
- canonical published `festivalCity(slug.current == "lviv")`

## ADR assessment

No ADR is needed for the proposed implementation because the gallery remains a local-static, code-curated, server-rendered presentation feature under ADR 0006, and the programme correction preserves the existing CMS reference contract.

Create an ADR before implementation if the gallery becomes Sanity-managed, adds a persistent archival media content model, introduces a shared scripted carousel architecture, or changes the project-wide image pipeline.

## Implementation steps

1. [x] Resolve photo year, event context, usage rights, and credit requirements; approve the final ten-image manifest and copy.
2. [x] Generate optimized width-responsive derivatives in the approved public namespace and record byte sizes.
3. [x] Implement and refine the semantic scroll-snap gallery, caption-free previews, desktop rail controls, native-dialog lightbox, and verified media link after History.
4. [x] Restore and publish `Український етно-фудкорт` as the ninth/final canonical Lviv location reference after the mistaken 30 July removal.
5. [x] Remove the separate food-specific programme callout and unused derivative while preserving the nine-card CMS-driven location grid.
6. [x] Create the bottom `FestivalAboutContent` composition and move both campaign visuals from History and Line-up into it.
7. [x] Update `.stitch/DESIGN.md`, `docs/plans/places.md`, the project ledger, and monthly log.
8. [x] Run automated checks, specialist reviews, and static-output assertions.
9. [ ] Complete manual accessibility/responsive and staging testing.

## Verification checklist

- [x] Product confirmed the 21–23 June 2024 Kyiv event, publication licence, and no visible-credit requirement.
- [x] Exactly ten approved gallery figures render in the intended order.
- [x] The book-programme image is removed from the gallery and replaced with the approved charity-art image.
- [x] No original source JPEG from `artifacts/` is copied or referenced by frontend output.
- [x] Every gallery image has meaningful Ukrainian alt text, an explicit thumbnail action name, lightbox-visible caption, intrinsic dimensions, `srcset`, `sizes`, lazy loading, and no priority/preload; preview captions are intentionally absent.
- [x] Updated ten-image derivatives total approximately 1.5 MB and remain within the revised deployment/transfer budgets.
- [ ] Gallery remains usable with touch, trackpad, mouse, keyboard, 200% zoom, screen reader, and reduced motion.
- [x] There is no autoplay, infinite loop, carousel dependency, or client code outside the focused native-dialog lightbox island.
- [x] Published Lviv content contains nine ordered location references, ends with `Український етно-фудкорт`, and retains `Книжкова Країна Мрій`.
- [x] `program-food.webp` and the food-specific callout are absent from static output.
- [x] `history-rhythm.webp` and `lineup-community.webp` appear only in the bottom `Про фестиваль` section.
- [x] History chronology and CMS-owned Line-up remain semantically and editorially intact after removing their former supporting images.
- [x] Frontend typecheck/lint, clean production-like static build, and `git diff --check` pass; the build emits eight static routes.
- [x] `frontend/out/index.html` contains one Hero image preload, no gallery preload, ten lazy responsive gallery images, the native dialog, and the `Суспільне Крим` link.
- [ ] Manual desktop/mobile/keyboard/reduced-motion and staging smoke tests pass.

## Risks

| Risk | Mitigation |
| --- | --- |
| Legacy public path contains `rewind-2014` while content is from 2024 | Keep all visitor-facing copy and metadata explicitly tied to 2024; treat the path as an internal compatibility name only. |
| All 30 originals inflate deployment and transfer size | Ship only ten selected responsive derivatives; never publish originals. |
| Horizontal content is undiscoverable when its scrollbar is hidden | Keep visible guidance, a partial-next-card/mobile native-scroll affordance, and minimal desktop Previous/Next controls while preserving touch, trackpad, and native scrolling. |
| Lightbox harms keyboard, focus, or bundle performance | Use a focused native `<dialog>` client island with no package, native focus containment, Escape/Close behavior, and manual accessibility testing. |
| Campaign art is mistaken for documentary archive material | Keep the two existing campaign visuals in a separate bottom About composition with clear narrative context. |
| Removing the food reference accidentally deletes reusable content | Remove only the Lviv array reference; retain the standalone location document unless deletion is separately approved. |

## Completion notes

Implemented locally on 2026-07-30 and refined on 2026-07-31. The sixth gallery selection now uses `DSC_3457.jpg` with responsive 600w/1200w WebP derivatives and updated Ukrainian alternative text/caption, replacing the earlier makers portrait while preserving the existing public filenames. The gallery intro now matches the History section’s narrow centered rhythm; preview captions are intentionally hidden while detailed Ukrainian alternative text, explicit thumbnail action names, and lightbox captions remain. The rail retains semantic list/proximity-snap native scrolling with a hidden scrollbar, visible guidance, partial-card/mobile affordance, and desktop-only one-card Previous/Next controls that respect endpoints and reduced motion. The native dialog is near-full-viewport with contained vertical overflow and high-contrast controls/caption surfaces. On 2026-07-31, product corrected the earlier food-court removal: the CMS card was restored as the ninth/final Lviv location while only the separate static callout and `program-food.webp` remain absent. No dependency, schema, GROQ, TypeGen, frontend code, image manifest/path, or architecture changed, so no ADR is required. Published-query verification confirms nine ordered references; frontend typecheck, lint, the production-like eight-route build, static output assertions for the food-court card/description and absent `program-food.webp`, and `git diff --check` passed. Manual desktop/mobile/touch/keyboard/screen-reader/200%-zoom/reduced-motion/staging checks remain pending.
