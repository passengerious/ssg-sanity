# ADR 0008: Automatic staging rebuild and manual production promotion

Date: 2026-08-06  
Status: Accepted  
Owner: Architect

## Context

The site is a Next.js static export. Published Sanity changes are invisible until a build reads the published dataset and deploys `frontend/out/` to the static host. The existing manual staging workflow works but creates editorial delay. Automatically deploying every published Sanity change directly to production would remove release review and could expose incomplete or incorrect content.

The project already separates staging and production through GitHub Environments and requires production-specific public URL, environment, and host-path settings.

## Decision

Use a Sanity outgoing webhook to send a `repository_dispatch` event named `sanity_content_published` to GitHub. Only `.github/workflows/deploy-staging.yml` responds to that event and deploys the staging environment.

Keep staging manual dispatch available, but require its `confirm_deploy=deploy` input only for `workflow_dispatch` runs. Webhook-triggered staging runs bypass that manual input.

Keep production deployment in a separate workflow that accepts `workflow_dispatch` only. Production promotion remains an owner-approved manual action after staging review.

Retain serialized staging deployment concurrency with `cancel-in-progress: false` to avoid interrupting `rsync --delete` deployment operations.

## Consequences

### Positive

- **POS-001**: Published content reaches staging without an operator manually dispatching the build.
- **POS-002**: Production retains an explicit review and release checkpoint.
- **POS-003**: The webhook cannot select a deployment environment, host path, Git ref, or arbitrary command.
- **POS-004**: Serialized staging runs prevent overlapping SSH and `rsync --delete` operations.

### Negative / trade-offs

- **NEG-001**: Multiple content publishes can queue multiple staging rebuilds.
- **NEG-002**: A fine-grained GitHub PAT is stored in Sanity webhook configuration and requires rotation/revocation discipline.
- **NEG-003**: Production builds current published content, so editors must not publish after staging sign-off and before production deployment.
- **NEG-004**: `rsync --delete` is not an atomic release mechanism; backup and verification remain necessary.

## Alternatives considered

| Option | Why not |
| --- | --- |
| Automatically deploy production from the Sanity webhook | Removes the required staging review and release approval boundary. |
| Keep all staging content rebuilds manual | Safe but adds avoidable editorial latency. |
| Use `cancel-in-progress: true` to keep only the newest staging build | Could interrupt `rsync --delete` and leave a partially synchronized webroot. |
| Add a webhook relay or GitHub App now | Better credential isolation, but requires additional hosting/operations that are disproportionate for the current MVP. |
| Add Sanity Releases/content snapshot promotion now | Gives stronger staging-to-production consistency but is more editorial process than the current team needs. |

## Impacted areas

- GitHub Actions: staging workflow accepts `repository_dispatch`; future production workflow remains manual-only.
- Sanity: one outgoing webhook filters published documents used by the frontend and sends a minimal dispatch payload.
- Operations: editorial publishing automatically refreshes staging; production promotion stays manual.
- Security: a repository-scoped fine-grained PAT with `Contents: Read and write` is stored only in the Sanity webhook header.

## Follow-ups

- [ ] Create the repository-scoped fine-grained PAT and configure the Sanity webhook.
- [ ] Test create, update, and delete event handling on staging.
- [ ] Add a protected manual production workflow before production launch.
- [ ] Review rebuild volume after real editorial use; add batching/debouncing only if needed.
- [ ] Consider a relay/GitHub App or Sanity Releases if credential isolation or content snapshotting becomes necessary.
