# Log: Global Spacing Optimization

Date: 2026-05-09
Task: Standardize vertical spacing and fix hero visibility across landing and city pages

## Changes
- **Landing Page Polish:**
    - Modified `Hero.tsx`: Reduced vertical padding to `py-10`/`md:py-16` and adjusted `min-h` for the sticky header.
    - Modified `AboutFestival.tsx`, `BuyTickets.tsx`, `ArtistsLineup.tsx`, `LocationsGrid.tsx`: Reduced padding from `py-16`/`md:py-24` to `py-10`/`md:py-16`.
    - Modified `Founder.tsx`: Reduced padding and vertical margins to improve section density.
- **Festival City Page Polish:**
    - Modified `festival-city-page.tsx`: Reduced Hero and secondary section padding to match the `py-10`/`md:py-16` standard.

## Rationale
The initial cinematic design used very generous vertical padding (`py-24`), which led to excessive "dead space" when sections were stacked (up to 192px between content blocks). Additionally, the sticky header was not accounted for in full-screen hero calculations. Reducing the padding project-wide improves content density, accessibility, and ensures key information is visible without excessive scrolling while maintaining a premium feel.

## Affected Files
- `frontend/components/landing/Hero.tsx`
- `frontend/components/landing/AboutFestival.tsx`
- `frontend/components/landing/BuyTickets.tsx`
- `frontend/components/landing/ArtistsLineup.tsx`
- `frontend/components/landing/LocationsGrid.tsx`
- `frontend/components/landing/Founder.tsx`
- `frontend/components/festival-city/festival-city-page.tsx`

## Verification
- Verified by code inspection across all major page containers.
- Layout rhythm now consistent across landing and city-specific pages.
