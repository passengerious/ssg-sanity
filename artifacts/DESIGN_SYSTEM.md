# Design System & UI/UX Guidelines: Kraina Mriy 2026
## 1. Brand Identity & Colors
The project relies on a warm, authentic palette based on the official brandbook:
* **Background (Base):** Beige `#FFF0D9` (adds softness and balance).
* **Text & Contrast:** Dark Grey `#232323` (used instead of pure black for readability).
* **Primary Accent (Heroic Theme - Lviv):** Brand Red `#BF2A26` (symbolizes energy and emotion). Used globally since the festival pivoted to Lviv only.
* **Secondary/Legacy Accent:** Natural Green `#8C9B5C` (formerly used for the Kamianets Epic theme, kept in tokens for future use).
## 2. Typography
* **Headers (H1, H2):** `Kyiv Region` — expressive character with ethnic decorative elements.
* **Body Text:** `Mulish` — clean, modern, and highly readable.
* **Accents:** `Kobzar KS` — handwritten style for emotional highlights and quotes.
* *Implementation:* Fonts are self-hosted (`.woff2`) in `frontend/public/fonts/` via `next/font/local`.
## 3. UI/UX Principles
* **Cinematic Vibe:** Premium layout relying on deep contrasts, ample whitespace, and interactive CSS-variable driven styling (Netflix/Marvel layout style adapted to ethnic themes).
* **Accessibility (WCAG 3.2.2 compliance):** Global theme mutations must NEVER trigger on keyboard `onFocus` events to avoid disorienting users. Interactive previews or animations must be restricted to `onMouseEnter` or explicit click actions.
* **Theming Boundaries:** Festival theming is strictly scoped to `.festival-theme` classes. Global `[data-theme]` on `<body>` or `<html>` is avoided to prevent hydration mismatches and conflicts with `next-themes`.
