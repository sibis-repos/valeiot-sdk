# AGENTS.md

Guidance for coding agents working in this repository.

## Mission

Keep `@sibis/valeiot-sdk` predictable, typed, and thin. This package is an SDK, not an application layer.

It exists to expose Valeiot platform capabilities in a way that is easy to integrate from TypeScript backends and script tooling.

## What matters most

- Preserve the public API unless the task explicitly requires a breaking change.
- Keep endpoint wrappers straightforward and close to the HTTP contract.
- Reuse existing type models whenever possible.
- Document outward-facing changes in `README.md` when they affect humans using the package.
- Keep Valeiot product terminology accurate: devices and entities map into `datasources` in this SDK.

## Product grounding

When product semantics are relevant, prefer official Valeiot documentation over guesswork:

- `https://docs.valeiot.com/`
- `https://docs.valeiot.com/pt/docs/datasources/device/`
- `https://docs.valeiot.com/pt/docs/datasources/entity/`
- `https://docs.valeiot.com/pt/docs/users-roles/role/`

Important current concepts:

- `datasources` cover both devices and entities
- `datapoints` are time-series values
- `objects` are structured values attached to datasources
- `scripts` are automations/integration logic
- `roles`, `themes`, and `portals` reflect user-facing product configuration

## Mandatory orientation

Before editing, inspect these files when relevant:

- `src/index.ts`
- `src/api/api.ts`
- `src/api/conn_workspace.ts`
- `src/api/conn_user.ts`
- the target resource file under `src/api`
- the related models under `src/models`

If the work touches event handling, also inspect:

- `src/router/router.ts`
- `src/router/result.ts`

## Architecture summary

### Public surface

The package exports:

- API and connection classes
- router utilities
- selected runtime helpers
- model types

Primary public entrypoint:

- `src/index.ts`

`src/index.ts` is the source of truth for package exports.

### Resource pattern

Each API resource class usually:

- receives an `API` instance in the constructor
- exposes typed methods for REST actions
- forwards request options through `modifier`
- delegates transport behavior to `API.fetch()`

### Transport behavior

`API.fetch()`:

- builds URLs from `baseUrl` and `path`
- serializes body as JSON
- converts query params to `kebab-case`
- applies connection-level modifiers first
- applies per-request modifier after that
- optionally runs a post-processor
- throws on unsuccessful responses

## Resource inventory

Current top-level workspace resources:

- `actions`
- `buckets`
- `dashboards`
- `datasources`
- `drive`
- `mqtt`
- `networks`
- `notifications`
- `payloadParsers`
- `portals`
- `publicPayloadParsers`
- `quotas`
- `roles`
- `scripts`
- `themes`
- `users`

Common nested resources:

- `datasources.datapoints`
- `datasources.objects`
- `datasources.tags`
- `datasources.tokens`

## Change rules

### When adding endpoints

Follow the existing house style:

1. Add or extend the corresponding model types.
2. Add methods to the resource class with typed params and return values.
3. Keep path construction explicit.
4. Wire new resource instances into connection classes only when the resource belongs there.
5. Export new public surface from `src/index.ts`.

### When changing types

- Prefer additive changes over breaking renames.
- Keep names aligned with the existing resource vocabulary.
- Avoid introducing ambiguous unions unless the API truly requires them.

### When changing router behavior

- Preserve middleware ordering semantics.
- Preserve result shape compatibility unless a breaking change is requested.
- Be careful with abort and resolver flow in `EventContext.next()`.
- Keep the router lightweight and implementation-focused.

## Documentation rules

- `README.md` is for humans. Keep it practical.
- `CLAUDE.md` and `AGENTS.md` are for AI agents. Keep them operational.
- If you add a new top-level capability, update all relevant docs in the same change.
- `README.md` should describe the SDK in the context of Valeiot as a platform, not just as a generic HTTP client.

## Verification

Preferred checks:

```bash
npm run typecheck
npm run build
```

Run the smallest meaningful validation for the change. For documentation-only changes, a build is optional but still useful if package metadata or code snippets changed alongside source files.

Known current caveat:

- `npm run typecheck` may currently fail because `src/api/conn_workspace.ts` uses `process` without Node typings being available in the current TypeScript setup.

## Known repository traits

- The repo is small and intentionally flat.
- API resources are split by domain under `src/api`.
- Models are mostly colocated by domain under `src/models`.
- The package publishes both ESM and CJS outputs.
- The current root layout does not show a standard `tests/` directory.

## Agent behavior

- Do not rewrite unrelated files for style only.
- Do not collapse typed APIs into generic helpers unless duplication is a real maintenance problem.
- Do not add dependencies casually.
- Prefer local consistency over clever abstractions.
- Avoid inventing product behavior that is not evident in the code or official Valeiot docs.

## Done criteria

A change is complete when:

- the requested behavior or docs are updated
- exports remain correct
- affected documentation is aligned with the code
- verification was run when feasible, or the lack of verification is stated clearly
