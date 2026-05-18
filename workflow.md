# Update workflow

This project is a Sanity-powered, statically exported Next.js site. Content is edited in hosted Sanity Studio, but the public site is generated at build time and deployed as static files. That means Sanity publishes are **not visible on the public site until a new static build is deployed**.

## Current decision

- **Code updates:** commit and push changes, then run the staging GitHub Actions deployment manually.
- **Content updates:** publish a coherent batch of content in Sanity Studio, then run the staging GitHub Actions deployment manually.
- **Current rebuild trigger:** manual GitHub Actions `workflow_dispatch`.
- **Future enhancement:** Sanity webhook → GitHub `repository_dispatch` or equivalent workflow trigger once editorial frequency increases.

Manual rebuild is the preferred MVP workflow because it is predictable, avoids webhook/token complexity, and lets editors publish content in batches instead of rebuilding after every small Sanity change.

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
| Staging | `main` branch + published Sanity content at build time | manual GitHub Actions dispatch | Staging should remain `noindex`. |
| Production | future production workflow | manual first, automation later | Mirror staging only after staging workflow is stable. |

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
   frontend/out/sitemap.xml
   frontend/out/robots.txt
   frontend/out/kamianets/index.html
   frontend/out/lviv/index.html
   frontend/out/tickets/index.html
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
   curl -I "$SITE_URL/tickets"
   curl -I "$SITE_URL/tickets/"
   curl -I "$SITE_URL/lviv"
   curl -I "$SITE_URL/lviv/"
   curl -I "$SITE_URL/kamianets"
   curl -I "$SITE_URL/kamianets/"
   curl -I "$SITE_URL/sitemap.xml"
   curl -I "$SITE_URL/robots.txt"
   curl -I "$SITE_URL/not-a-real-page"
   ```

   Expected behavior:

   - `/`, `/tickets/`, `/lviv/`, `/kamianets/`, `/sitemap.xml`, and `/robots.txt` return `200`.
   - non-slash route URLs redirect to `https://.../route/`, not `http://.../route/`.
   - `/not-a-real-page` returns `404` and shows the exported app 404 body in the browser.
   - staging pages include `noindex, nofollow` metadata.

7. **Browser smoke-test.**

   Confirm:

   - homepage loads;
   - city cards open `/kamianets/` and `/lviv/`;
   - `/tickets/` opens;
   - city-to-city links work;
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

   - city documents have stable slugs such as `kamianets` and `lviv`;
   - referenced artists, locations, and partners are published;
   - required images have usable assets and alt text where applicable;
   - external links use `https://` unless there is a deliberate exception;
   - SEO/title/description fields are filled when available.

3. **Publish the content batch in Sanity Studio.**

   Use Sanity's normal publish action. The content is now live in Sanity, but not yet visible on the static public site.

4. **Request or run a manual rebuild.**

   Run the staging deployment workflow:

   ```bash
   gh workflow run "Deploy staging static site" --ref main -f confirm_deploy=deploy
   ```

   This rebuilds the frontend against the latest published Sanity content, generates `frontend/out/`, and deploys it to the staging webroot.

5. **Verify the content on staging.**

   Check the changed pages in a browser and confirm the expected content appears. For common content updates:

   | Content changed | Pages to verify |
   | --- | --- |
   | City title, description, date, hero image | `/kamianets/` or `/lviv/`, plus homepage city card |
   | Artists | homepage artist section, city page artist card/list |
   | Partners | homepage partner section, city page partner card/list |
   | Ticket info | `/tickets/`, homepage ticket CTA, city ticket CTA behavior |
   | Slugs | direct route, homepage links, sitemap |
   | SEO metadata | page source for `title`, `description`, `canonical`, `og:url` |

6. **Promote to production later.**

   Until a production workflow exists, staging is the authoritative verification environment. When production deployment is added, it should follow the same manual rebuild pattern first.

### Expected freshness

With the current workflow, content is visible after:

```text
Sanity publish → manual GitHub Actions dispatch → build → rsync deploy → public verification
```

This is not instant CMS publishing. Treat it as a controlled static rebuild. For urgent content changes, keep the batch small and run the workflow immediately after publishing.

## Rollback workflow

The staging workflow creates timestamped backups beside the webroot before each `rsync --delete` deployment.

If a deployment is bad:

1. Identify the latest good backup directory beside `/www/`.
2. Restore that backup into `/www/` from the host shell or hosting file manager.
3. If the problem came from Sanity content, fix or revert the content in Studio and run the staging workflow again.
4. If the problem came from code, revert or fix the commit, push, and run the staging workflow again.

Rollback restore commands are host-specific and should be tested before launch.

## Future automation option

Manual rebuild remains the preferred MVP path. If editorial frequency increases, add automation:

```text
Sanity publish webhook → GitHub repository_dispatch → staging build/deploy workflow
```

Recommended constraints for future webhook automation:

- trigger only on published content changes, not every draft edit;
- debounce or batch rapid publish events if possible;
- keep a manual workflow dispatch fallback;
- use a dedicated GitHub token with minimum required permissions;
- verify the webhook cannot expose Sanity or GitHub secrets client-side;
- start with staging-only automation before production automation;
- record the decision in an ADR if webhook-triggered production rebuild becomes part of the deployment architecture.

## Current policy summary

- Editors publish content in hosted Sanity Studio.
- Maintainers manually run GitHub Actions to rebuild the static site after a content batch is published.
- The static site should be verified on staging after every rebuild.
- Webhook-triggered rebuilds are a future enhancement, not part of the current MVP workflow.
