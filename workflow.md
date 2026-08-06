# Update workflow

This project is a Sanity-powered, statically exported Next.js site. Content is edited in hosted Sanity Studio, but the public site is generated at build time and deployed as static files. That means Sanity publishes are **not visible on the public site until a new static build is deployed**.

## Current decision

- **Code updates:** commit and push changes, then run the staging GitHub Actions deployment manually.
- **Content updates:** publish a coherent batch in Sanity Studio; the configured Sanity webhook automatically dispatches the staging workflow.
- **Staging rebuild triggers:** Sanity `repository_dispatch` for published content and manual GitHub Actions `workflow_dispatch` as a fallback.
- **Production rebuild trigger:** manual GitHub Actions `workflow_dispatch` only, after staging review.

The staging webhook is limited to published site content and deploys only staging. Production remains a deliberate manual promotion to preserve the review boundary. See `docs/plans/auto-rebuild.md` and ADR 0008 for the token, webhook, batching, and release rules.

## Roles

| Role | Responsibility |
| --- | --- |
| Editor | Updates and publishes content in hosted Sanity Studio. |
| Maintainer | Runs GitHub Actions deployment, verifies staging, and coordinates production release. |
| Developer | Changes code, validates locally, commits, and pushes. |

## Environments

| Environment | Source | Deployment trigger | Notes |
| --- | --- | --- | --- |
| Local development | local files + Sanity dataset | developer commands | Used for code validation before commit. |
| Staging | `main` branch + published Sanity content at build time | automatic Sanity webhook; manual GitHub Actions fallback | Staging should remain `noindex`. |
| Production | `main` branch + published Sanity content at build time | manual GitHub Actions dispatch with production GitHub Environment | Same host/directory pattern as staging, but different production domain webroot. |

Production should use a separate production workflow with the production GitHub Environment. It remains manual-only: do not add automatic push deploys or Sanity webhook deploys to production.

Production values that should differ from staging:

- `NEXT_PUBLIC_SITE_URL`: production public URL, with `https://`.
- `NEXT_PUBLIC_SITE_ENV`: `production` instead of `development`.
- `DEPLOY_PATH`: production domain webroot, for example `/home/<SSH_USER>/<PRODUCTION-DOMAIN>/www/`.

Values that may be the same as staging when the same host/account/dataset is used:

- `SSH_HOST`, `SSH_USER`, `SSH_PORT`.
- `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_STUDIO_URL`.

Keep `NEXT_PUBLIC_NEWSLETTER_ACTION_URL` unset unless newsletter collection is intentionally enabled with an approved static-safe backend.

## Codebase update workflow

Use this when changing Next.js, Tailwind, GROQ, Sanity schemas, GitHub Actions, documentation, or other repository files.

1. **Make the code change locally.**
   - Keep changes scoped to one logical task.
   - Avoid unrelated refactors.
   - Preserve static export compatibility.

2. **Run local validation.**

   ```bash
   pnpm typegen
   pnpm --filter frontend typecheck
   pnpm --filter frontend lint
   git diff --check
   NEXT_PUBLIC_SITE_ENV=development pnpm --filter frontend build
   ```

   If the change is frontend-only and does not affect Sanity queries or schemas, `pnpm typegen` may be skipped, but run it whenever GROQ, schema, or generated type contracts change.

3. **Review the static export shape when routes or deployment behavior change.**

   Expected staging-relevant files include:

   ```text
   frontend/out/.htaccess
   frontend/out/index.html
   frontend/out/404.html
   frontend/out/privacy/index.html
   frontend/out/terms/index.html
   frontend/out/public-offer/index.html
   frontend/out/sitemap.xml
   frontend/out/robots.txt
   frontend/out/_next/
   ```

4. **Commit and push.**

   ```bash
   git status
   git add <changed-files>
   git commit -m "<type>(<scope>): <summary>"
   git push
   ```

5. **Run staging deployment manually.**

   In GitHub Actions, run:

   ```text
   Deploy staging static site
   ```

   Use the required input:

   ```text
   confirm_deploy=deploy
   ```

   Equivalent CLI command:

   ```bash
   gh workflow run "Deploy staging static site" --ref main -f confirm_deploy=deploy
   ```

6. **Verify staging.**

   ```bash
   export SITE_URL="https://<STAGING-DOMAIN>"

   curl -I "$SITE_URL/"
   curl -I "$SITE_URL/privacy/"
   curl -I "$SITE_URL/terms/"
   curl -I "$SITE_URL/public-offer/"
   curl -I "$SITE_URL/sitemap.xml"
   curl -I "$SITE_URL/robots.txt"
   curl -I "$SITE_URL/not-a-real-page"
   ```

   Expected behavior:

   - `/`, `/privacy/`, `/terms/`, `/public-offer/`, `/sitemap.xml`, and `/robots.txt` return `200`.
   - non-slash route URLs redirect to `https://.../route/`, not `http://.../route/`.
   - `/not-a-real-page` returns `404` and shows the exported app 404 body in the browser.
   - staging pages include `noindex, nofollow` metadata.

7. **Browser smoke-test.**

   Confirm:
   - homepage loads with current festival content;
   - legal links (`/privacy/`, `/terms/`, `/public-offer/`) load;
   - external ticket button links to official ticketing platform;
   - 404 page displays for unknown routes;
   - Chrome Console has no mixed-content errors;
   - keyboard navigation works for primary links and cards.

## Content update workflow

Use this when editors change festival data, city pages, artists, partners, ticket information, images, or other Sanity-managed content.

### Why a rebuild is required

The public site is static. During the GitHub Actions build, Next.js fetches published Sanity content and writes HTML into `frontend/out/`. After deployment, the static host serves those files. If an editor publishes content in Sanity Studio after the build, the static files do not change until another build runs.

### Editorial publishing process

1. **Prepare related content in Sanity Studio.**

   Group related edits into a coherent batch, for example:

   - all updates for the Lviv city page;
   - a new artist plus the city reference that displays that artist;
   - ticket copy and ticket URL updates;
   - partner updates for a launch announcement.

2. **Check references before publishing.**

   Before requesting a rebuild, confirm referenced documents are published and complete:

   - the canonical Lviv festival document and generic-page slugs are stable;
   - referenced artists, locations, and partners are published;
   - required images have usable assets and alt text where applicable;
   - external links use `https://` unless there is a deliberate exception;
   - SEO/title/description fields are filled when available.

3. **Publish the content batch in Sanity Studio.**

   Use Sanity's normal publish action. The configured webhook queues a staging rebuild; the content is not visible on the static site until that deployment completes.

4. **Wait for the staging rebuild.**

   The Sanity webhook triggers `sanity_content_published`, which rebuilds the frontend against the latest published content and deploys it to staging. If the webhook is unavailable or a manual rerun is needed, run:

   ```bash
   gh workflow run "Deploy staging static site" --ref main -f confirm_deploy=deploy
   ```

5. **Verify the content on staging.**

   Check the changed pages in a browser and confirm the expected content appears. For common content updates:

   | Content changed | Pages to verify |
   | --- | --- |
   | Festival title, description, date, hero image | `/` landing page |
   | Artists | homepage artist section |
   | Partners | homepage partner section |
   | Ticket destination | homepage external ticket CTA |
   | Slugs | direct route, homepage links, sitemap |
   | SEO metadata | page source for `title`, `description`, `canonical`, `og:url` |

6. **Promote to production manually.**

   After staging sign-off, stop further publishes until the production build completes. Run the separate production workflow with its manual confirmation and production GitHub Environment settings.

### Expected freshness

With the staging workflow, content is visible after:

```text
Sanity publish → webhook dispatch → staging build → rsync deploy → staging verification → manual production deploy
```

This is not instant CMS publishing. Treat it as a controlled static rebuild. For urgent content changes, keep the batch small and manually promote production immediately after staging verification.

## Rollback workflow

The staging workflow creates timestamped backups beside the webroot before each `rsync --delete` deployment.

If a deployment is bad:

1. Identify the latest good backup directory beside `/www/`.
2. Restore that backup into `/www/` from the host shell or hosting file manager.
3. If the problem came from Sanity content, fix or revert the content in Studio and run the staging workflow again.
4. If the problem came from code, revert or fix the commit, push, and run the staging workflow again.

Rollback restore commands are host-specific and should be tested before launch.

## Current policy summary

- Editors publish content in hosted Sanity Studio.
- Published site-content changes automatically rebuild staging through the Sanity webhook.
- Maintainers verify staging after every rebuild and manually promote approved content to production.
- The Sanity webhook never deploys production.
