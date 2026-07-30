# Technical Architecture & ADRs: Kraina Mriy 2026
## 1. Core Stack
* **Frontend:** Next.js (App Router) in strict Static Site Generation (SSG) mode.
* **CMS (Backend):** Sanity (Headless CMS) decoupled from frontend.
* **Styling:** Tailwind CSS + Shadcn UI (using CSS variables for theming).
* **Hosting:** adm.tools (Classic shared hosting without Node.js support).
## 2. Key Architectural Decisions (ADRs)
* **ADR 0001 (Static Export to adm.tools):** The frontend must deploy to a strictly static host. `output: 'export'` is enforced in `next.config.mjs`. Next.js API routes, Draft Mode, Sanity live visual editing, runtime redirects, and server-side form handlers are strictly prohibited. Data fetching uses `client.fetch()` directly at build time.
* **ADR 0002 (Festival Content Model):** The CMS relies on dedicated `festivalCity` documents instead of generic pages. The schema uses "City-owned references", where the city document references its `locations`, `artists`, and `partners` to control ordering.
* **Single-City Pivot (July 2026 Update):** The festival scaled down to a single city — Lviv. The frontend routing has been simplified: complex dynamic city swapping on the landing page is removed, and all content (lineup, schedule, locations) is rendered directly on the root `/` page via a GROQ query to the single Lviv `festivalCity` document.
## 3. Tickets & Forms
* **Tickets (MVP):** Handled via a Sanity Singleton (`ticketInfo`) that holds `price`, `ticketsLeft`, and an external `boxOfficeUrl`. The SSG architecture safely redirects buyers to third-party operators (like Concert.ua).
* **Forms:** No internal API routes are allowed for newsletters. Third-party client-side solutions (e.g., Mailchimp, Formspree) must be used.
