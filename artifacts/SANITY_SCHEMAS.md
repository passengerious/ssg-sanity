# Sanity CMS Content Model
The database is structured to decouple content entities for reusability across the festival.
## 1. Core Documents
* `festivalCity` **(Document):** Canonical source for the event. Fields: `title`, `cityName` (Lviv), `themeKey` ("heroic"), `dateRange` (Aug 15-16), `heroImage`, `description`, and arrays of references to `locations`, `artists`, and `partners`.
* `location` **(Document):** Physical stages or venues. Fields: `name`, `slug`, `description`, `stageType` (radio: main, acoustic, workshop, epic, other), `image`, `address`.
* `artist` **(Document):** Performers. Fields: `name`, `slug`, `photo` (optional at entry), `description`, `genre`, `externalUrl`.
* `partner` **(Document):** Sponsors/Media. Fields: `name`, `logo`, `url`, `level` (title, gold, silver, bronze, media, friend).
## 2. Singletons & Blocks
* `ticketInfo` **(Singleton):** Controls global ticket availability. Fields: `price`, `ticketsLeft`, `boxOfficeUrl`.
* **Links:** Expanded internal link union to support routing to `festivalCity`.
## 3. Content Workflow
Published Sanity changes require a manual GitHub Actions rebuild of the Next.js static output. Webhook-triggered rebuild automation is deferred to a future phase.
