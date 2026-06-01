# Project Logs

This directory contains project logs organized by task or feature implementation.

## Naming

Use kebab-case filenames derived from the task header appended with the date in `_DD.MM` format (e.g., `### Task: {short-name}`).

```text
task-short-name_DD.MM.md
```

Example: `static-export-compatibility-implementation_08.05.md`

## Entry rules

Each non-trivial task or feature implementation should have its own log file. For multi-step features, append all related task entries to the same file to maintain context.

Entries must be factual and should include:

- **Date**: YYYY-MM-DD
- **Task**: Title matching the filename
- **Agent/Subagent**: Name of the agent(s)
- **Plan/ADR**: Links to relevant plans or ADRs
- **Summary**: Factual summary of changes
- **Files changed**: Primary files affected
- **Verification**: How the change was validated
- **Architectural impact**: Impact level and rationale
- **Follow-ups**: Next steps or remaining risks

## Security

Do not store secrets, API keys, tokens, credentials, or private client data in project logs.
