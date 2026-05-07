# Next Stitch Prompt

Design the Sanity-backed city page for **Kraina Mriy Epic — Кам'янець-Подільський** using `.stitch/DESIGN.md` as the strict source of truth.

**DESIGN SYSTEM REQUIRED**

- Language: Ukrainian.
- Palette:
  - Warm Beige background `#FFF0D9`.
  - Dark Grey text `#232323`.
  - Natural Green `#8C9B5C` as the active primary accent for Kamianets-Podilskyi / Epic.
  - Brand Red `#BF2A26` only as a secondary/cross-city reference.
- Typography:
  - Display/headlines: Kyiv Region fallback style.
  - Body: Mulish.
  - Accent emotional text: Kobzar KS fallback style.
- Use CSS-variable-ready component states so this page can share components with the Lviv / Heroic page.

**PAGE STRUCTURE**

1. Header with logo, city switcher, program, artists, partners, tickets.
2. Hero section for Kamianets-Podilskyi with concise headline, festival dates placeholder, and ticket CTA placeholder.
3. City mood / story section explaining the Epic concept.
4. Locations and stages section with accessible cards/accordion.
5. Artists lineup section using approved placeholders only.
6. Ticket CTA block using the active Natural Green theme.
7. Footer with placeholder social/partner links until final URLs are approved.

**CONSTRAINTS**

- Do not invent confirmed artists, dates, partner names, prices beyond approved copy.
- Keep interactions keyboard-accessible.
- Respect reduced motion.
- Produce a design that can be implemented as static Next.js output.
