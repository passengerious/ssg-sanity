# Staging automatic rebuild and manual production promotion

## Status

Implemented for staging workflow code on 2026-08-06. Sanity webhook configuration and production workflow are operational follow-ups.

## Goal

Automatically rebuild and deploy **staging** when published Sanity content changes, while retaining a deliberate, manual **production** deployment after staging review.

## Non-goals

- Automatically deploy published Sanity changes to production.
- Add a runtime server, preview mode, or frontend API route.
- Add a webhook relay, GitHub App, content-release snapshotting, or atomic release-directory hosting in this phase.
- Trigger rebuilds for Sanity drafts.

## Decision and context

The frontend uses Next.js static export, so the live site only reflects published Sanity data after a new build is deployed. The staging site is safe for rapid editorial feedback; production requires a human release decision.

ADR 0008 establishes this split:

```text
Sanity published change → repository_dispatch → staging build/deploy
Staging review → manual production workflow dispatch → production build/deploy
```

## Relevant files

- `.github/workflows/deploy-staging.yml`
- `workflow.md`
- `docs/adr/0008-automatic-staging-rebuild-manual-production-promotion.md`
- `docs/ai/PROJECT_LEDGER.md`

## Staging workflow contract

`deploy-staging.yml` supports two triggers:

| Trigger | Purpose | Confirmation |
| --- | --- | --- |
| `workflow_dispatch` | Operator manually reruns staging | Must enter `deploy` |
| `repository_dispatch` type `sanity_content_published` | Sanity published-content webhook | No manual input; deploys staging only |

The workflow queues deployments with `cancel-in-progress: false`. Do not change this to `true`: a cancellation during `rsync --delete` could leave the staging webroot partially synchronized.

The webhook payload is intentionally not used to select a Git ref, environment, path, or command. GitHub Actions runs the workflow definition from the default branch and staging deployment settings remain fixed in the `staging` GitHub Environment.

## GitHub PAT configuration

Create a **fine-grained personal access token** with:

1. **Resource owner:** the account or organization that owns this repository.
2. **Repository access:** `Only select repositories` → select only this repository.
3. **Repository permissions:** `Contents: Read and write`.
4. **No other repository, organization, Actions, or Workflows permissions.**
5. Set a short practical expiration date and record its owner/rotation date in the operational password manager, not this repository.

The token authorizes Sanity to call GitHub's repository-dispatch endpoint. It is **not** a GitHub Actions secret, a `NEXT_PUBLIC_*` variable, a Sanity document field, or source-controlled text.

## Sanity webhook configuration

Create one outgoing webhook in Sanity Manage → project → API → Webhooks.

| Setting | Value |
| --- | --- |
| Name | `Deploy staging after published content` |
| URL | `https://api.github.com/repos/passengerious/ssg-sanity/dispatches` |
| Dataset | `production` |
| Method | `POST` |
| Trigger on | Create, Update, Delete |
| Drafts / versions | Disabled |
| Header | `Authorization: Bearer <fine-grained-PAT>` |
| Header | `Accept: application/vnd.github+json` |
| Header | `X-GitHub-Api-Version: 2022-11-28` |

Use this filter to rebuild only when content consumed by the static site changes:

```groq
_type in [
  "festivalCity",
  "artist",
  "partner",
  "location",
  "page",
  "post",
  "category",
  "author",
  "faq",
  "testimonial",
  "navigation",
  "settings"
]
```

Sanity ignores draft and version documents by default; do not enable either option. Configure this minimal projection/payload:

```json
{
  "event_type": "sanity_content_published",
  "client_payload": {
    "source": "sanity",
    "dataset": "production"
  }
}
```

Do not include document body, editor identity, deployment environment, shell commands, or Git ref values in the payload. GitHub retains event payload data in workflow records.

## Editorial release workflow

### Routine content change

1. Editor prepares and publishes the completed content change in Sanity.
2. Sanity triggers the staging deployment.
3. Wait for the GitHub Actions staging run to succeed.
4. Review the staging site for factual content, image crop/alt text, links, mobile layout, and relevant metadata.
5. Stop publishing further changes until the reviewed content has been promoted.
6. Owner manually dispatches the production workflow and completes production smoke checks.

### Content batch

1. Complete related edits as drafts first.
2. Publish the batch deliberately.
3. Review the automatically rebuilt staging site.
4. Manually deploy production after sign-off.

### Emergency correction

1. Publish the correction.
2. Confirm the automatic staging rebuild.
3. Manually deploy production.
4. Record the production run URL and backup path for rollback.

## Production workflow requirements

The future production workflow must:

- use `workflow_dispatch` only; do not add `repository_dispatch`;
- bind to the separate `production` GitHub Environment;
- require the manual `deploy` confirmation input and, where available, GitHub Environment protection/reviewer approval;
- use production-specific `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_ENV=production`, and `DEPLOY_PATH`;
- preserve the backup, static-output, and remote-webroot checks used by staging;
- build from the default branch and current published Sanity data.

Because production builds current published content, editors must avoid further publishes between staging sign-off and the production deployment. A future Sanity Releases-based workflow can solve this if frequent editorial changes make that discipline impractical.

## Verification checklist

- [ ] Create the repository-scoped fine-grained PAT with only `Contents: Read and write`.
- [ ] Configure the Sanity webhook exactly as documented above.
- [ ] Trigger a test `repository_dispatch` and confirm it runs staging from `main`.
- [ ] Confirm a manually dispatched staging run with an invalid confirmation is skipped before staging environment secrets are accessed.
- [ ] Publish, update, and delete a representative consumed Sanity document; confirm each produces a staging rebuild.
- [ ] Publish several quick changes; confirm staging runs queue without overlapping `rsync` operations and the last output reflects current published data.
- [ ] Confirm no Sanity publish starts a production deployment.
- [ ] Add and protect a production-only manual workflow before the first production release.

## Risks

| Risk | Mitigation |
| --- | --- |
| PAT is over-privileged or leaked | Limit it to this repository and `Contents: Read and write`; store only in Sanity webhook headers; rotate and revoke promptly if exposed. |
| Several publishes create several builds | Keep serialized staging concurrency; editorially batch related changes; add controlled debouncing only if rebuild volume becomes problematic. |
| Production differs from reviewed staging | Do not publish between sign-off and manual production deployment; use content releases later if necessary. |
| `rsync --delete` is interrupted | Keep serialized runs, backups, and remote verification; future atomic release directories are a separate hosting change. |
| Webhook delivery is retried | Sanity's at-least-once delivery can queue duplicate staging rebuilds; the final build still reflects published data. |

## References

- ADR 0001: static export restriction.
- ADR 0008: automatic staging rebuild and manual production promotion.
- GitHub Actions `repository_dispatch`: <https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#repository_dispatch>
- Sanity outgoing webhooks: <https://www.sanity.io/docs/content-lake/webhooks>
