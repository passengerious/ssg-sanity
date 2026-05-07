# Kraina Mriy Site Map

Last updated: 2026-05-07

## Design source of truth

- `.stitch/DESIGN.md` is the authoritative visual and technical design guidance.
- The current palette is:
  - Brand Red: `#BF2A26`
  - Natural Green: `#8C9B5C`
  - Warm Beige: `#FFF0D9`
  - Dark Grey: `#232323`
- The frontend should use CSS variables so city selection can switch the primary accent between:
  - Kamianets-Podilskyi / Epic: Natural Green
  - Lviv / Heroic: Brand Red

## Completed pages

### Landing page MVP

- Route: `/landing`
- Implementation:
  - `frontend/app/landing/page.tsx`
  - `frontend/components/landing/*`
- Stitch assets:
  - `.stitch/designs/landing.html`
  - `.stitch/designs/landing.png`
- Purpose: establish the visual/component foundation before integrating Sanity-backed city pages.

### Tickets MVP

- Route: `/tickets`
- Implementation:
  - `frontend/app/tickets/page.tsx`
  - Sanity singleton: `ticketInfo`
- Purpose: provide a static-safe ticket information page with a single external box-office CTA once the service partner URL is approved.

## Planned pages

1. `/kamianets`
   - Sanity-backed city page for Kraina Mriy Epic.
   - Uses Natural Green as the active primary accent.
2. `/lviv`
   - Sanity-backed city page for Kraina Mriy Heroic.
   - Uses Brand Red as the active primary accent.
3. Program / locations detail pages, if editorial scope requires them.
4. Artist detail pages, if the Sanity content model includes artist profiles.

## Content notes

- MVP landing content may use clearly marked placeholders while final artist, image, partner, and ticket data is pending.
- Real artist lineups, partner logos, ticket URLs, and production claims should come from approved content or Sanity.
- Images should be moved to Sanity or persistent public assets before production launch.
