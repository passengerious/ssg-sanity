Create a polished landing page for "Kraina Mriy" Festival 2026 using `.stitch/DESIGN.md` as the strict design source of truth.

This is the first and most important page of a future multi-page website, so build it as the visual and component foundation for the rest of the site.

Required workflow:

1. Read `.stitch/DESIGN.md` first and follow it exactly.
2. If `.stitch/SITE.md` exists, read it and align the landing page with the planned site structure.
3. Generate the landing page screen with Stitch.
4. Save the generated assets to:
   - `.stitch/designs/landing.html`
   - `.stitch/designs/landing.png`
5. Implement the landing page as modular React/Tailwind components in the app.
6. Extract reusable sections/components where useful, especially:
   - Header/navigation
   - Hero
   - CTA
   - Feature cards
   - Footer
   - Layout wrappers
   - Buttons
7. Keep styling consistent with `.stitch/DESIGN.md`; do not invent a new design direction.
8. Do not fabricate real metrics, testimonials, logos, or claims. Use clear placeholders where data is missing.
9. Validate with typecheck, lint, and build.
10. Fix all validation errors.
11. Update `.stitch/metadata.json` with the generated Stitch screen metadata if applicable.
12. Update or create `.stitch/SITE.md` with the landing page as the completed first page and outline the remaining pages.
13. Create or update `.stitch/next-prompt.md` with the next logical page to generate after the landing page.

Output a brief summary of:

- files created/modified
- Stitch assets saved
- reusable components created
- validation commands run
- the next page/task written to `.stitch/next-prompt.md`
