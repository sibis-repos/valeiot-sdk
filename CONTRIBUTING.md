# Contributing

Thank you for your interest in contributing to `@sibis/valeiot-sdk`.

This document explains how to:

- report bugs
- suggest improvements
- open issues
- prepare pull requests
- write commits in the expected format

The goal is to keep contributions easy to review and easy to merge.

## Before you start

Please check these first:

- [README.md](./README.md)
- open issues: <https://github.com/sibis-repos/valeiot-sdk/issues>

Before opening a new issue or PR:

- search for an existing issue or pull request
- avoid duplicate reports
- keep each contribution focused on one problem or one improvement

## Ways to contribute

You can contribute by:

- reporting a bug
- requesting a feature
- improving documentation
- fixing a bug
- adding support for a new API capability
- improving type safety or developer experience

## Reporting a bug

If you found a bug, open an issue and include enough detail for someone else to reproduce it.

Recommended structure:

```md
## Summary
Short description of the problem.

## Expected behavior
What should happen.

## Actual behavior
What actually happened.

## Steps to reproduce
1. ...
2. ...
3. ...

## Code sample
Minimal code example, if possible.

## Environment
- Package version:
- Node.js version:
- Package manager:
- OS:

## Additional context
Logs, screenshots, API responses, or anything else useful.
```

Good bug reports are:

- specific
- reproducible
- minimal
- scoped to one issue

## Requesting a feature

If you want to suggest a new feature or API improvement, open an issue with this structure:

```md
## Summary
Short description of the feature request.

## Problem
What problem does this solve?

## Proposed solution
What would you like to happen?

## Alternatives considered
Optional, but useful when relevant.

## Additional context
Links to Valeiot documentation, examples, or API references.
```

## Opening an issue

Use clear titles.

Good examples:

- `Bug: WorkspaceConn throws when API_BASE_URL is missing`
- `Feature: add support for script runtime nodejs24.x`
- `Docs: clarify datasource filters in README`

Avoid vague titles like:

- `Bug`
- `Help needed`
- `Something is wrong`

## Development setup

Clone the repository and install dependencies:

```bash
npm install
```

Useful commands:

```bash
npm run build
npm run typecheck
npm run test
```

## Releases

Releases are automated through GitHub Actions.

Expected flow:

1. update `package.json` with the target version
2. commit the change
3. create and push a git tag that matches the package version, such as `0.25.0` or `v0.25.0`
4. let the release workflow build the package, publish it to npm, and create or update the corresponding GitHub Release

Required repository secrets:

- `NPM_SIBIS_TOKEN`: npm token with permission to publish `@sibis/valeiot-sdk`

Notes:

- the workflow publishes to npm with public access
- the workflow can also publish to GitHub Packages only when the package scope matches the GitHub repository owner namespace
- with the current package name `@sibis/valeiot-sdk`, GitHub Packages publication is skipped unless the repository owner namespace also uses `@sibis`

Notes:

- the package publishes both ESM and CommonJS builds
- code lives mainly under `src/api`, `src/models`, `src/router`, and `src/tools`
- if your change affects public usage, update `README.md`

## Branch naming

Use short and descriptive branch names.

Recommended patterns:

- `fix/user-login-session`
- `feat/script-log-filters`
- `docs/readme-installation`
- `refactor/router-jsdocs`

## Commit message format

Use clear, small commits when possible.

This repository follows a Conventional Commit style in practice.

Recommended format:

```text
type: short description
```

Common types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation only
- `refactor`: code cleanup without behavior change
- `test`: test changes
- `chore`: maintenance changes

Examples:

```text
feat: add support for nodejs24.x scripts
fix: correct datasource tag replacement route docs
docs: add contribution guidelines
refactor: improve router jsdocs
```

Guidelines:

- use lowercase
- keep the subject short and direct
- describe what changed, not the whole story
- avoid mixing unrelated changes in one commit

## Pull request guidelines

Open a PR when:

- the change is ready for review
- the scope is clear
- the branch is up to date enough to review safely

### PR title

Use the same style as commit messages:

```text
feat: add support for network token expiration
fix: correct drive folder tag update path
docs: improve README quick start
```

### PR description

Use this structure:

```md
## Summary
What this PR changes.

## Why
Why this change is needed.

## Changes
- item 1
- item 2
- item 3

## Validation
- npm run build
- npm run typecheck
- manual verification

## Related issues
Closes #123
```

### Good PR practices

- keep the PR focused
- explain the reason for the change
- include examples when public API changes
- update docs when behavior changes
- mention any limitation or follow-up work

### Avoid in the same PR

- unrelated refactors
- formatting-only changes mixed with bug fixes
- broad API redesign without discussion
- undocumented breaking changes

## What reviewers will look for

Review usually focuses on:

- API consistency
- typing quality
- backward compatibility
- alignment with Valeiot terminology and API behavior
- documentation updates when needed
- change scope and clarity

## Documentation expectations

Please update documentation when relevant:

- `README.md` for human-facing usage
- JSDoc for exported code
- `CLAUDE.md` and `AGENTS.md` only when agent-oriented repository context changes

## Code guidelines

Please try to keep changes aligned with the current repository style:

- keep API wrappers thin
- use the existing model types in `src/models`
- avoid adding unnecessary dependencies
- prefer consistency over clever abstractions
- preserve public API shape unless the change explicitly requires otherwise

## Validation before opening a PR

Before opening a PR, run what is relevant for your change:

```bash
npm run build
npm run typecheck
```

If you could not run something, mention it in the PR.

If your change is documentation-only, say that clearly in the PR description.

## Breaking changes

If your contribution changes the public API:

- call it out clearly in the PR
- explain the migration impact
- update examples and docs
- avoid silent breaking changes

## Security reports

Please do not open a public issue for sensitive security vulnerabilities.

If the issue is security-sensitive, contact the maintainers privately through the company channels:

- <https://sibis.io/en/>

## Questions

If you are not sure how to structure a contribution:

- open an issue first
- describe the problem
- propose the direction you want to take

Small, clear, reviewable contributions are preferred.
