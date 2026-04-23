# CLAUDE.md

This file gives AI agents the minimum working context to modify `@sibis/valeiot-sdk` safely.

## Repository purpose

`@sibis/valeiot-sdk` is an open-source TypeScript SDK for the [Valeiot](https://www.valeiot.com/) platform.

It has two responsibilities:

- typed HTTP clients for the ValeIoT API
- an event router for script-style event handling

The SDK is intended to help backend and integration code work with Valeiot resources such as datasources, datapoints, scripts, dashboards, roles, portals, notifications, and drive assets.

## Product context

Valeiot is a cloud IoT platform. Relevant concepts from the official docs:

- `Device` and `Entity` are both represented through `datasources` in this SDK
- `Datapoints` model time-series values
- `Objects` model structured resource state
- `Roles` define access policy, especially for Portal usage
- `Portal` is the white-label end-user surface
- `Payload Parsers` decode inbound payloads before data handling

Use the official docs as the product source of truth when behavior or naming is unclear:

- `https://docs.valeiot.com/`
- `https://docs.valeiot.com/pt/docs/datasources/device/`
- `https://docs.valeiot.com/pt/docs/datasources/entity/`
- `https://docs.valeiot.com/pt/docs/users-roles/role/`

## Primary entrypoints

- `src/index.ts`: public package surface
- `src/api/api.ts`: low-level HTTP wrapper
- `src/api/conn_workspace.ts`: workspace-scoped connection
- `src/api/conn_user.ts`: user-scoped connection
- `src/router/router.ts`: middleware and event routing
- `src/router/result.ts`: result metadata helpers

## Package shape

```text
src/
  api/
  models/
  router/
  tools/
```

## How the SDK is organized

### API layer

- `API` is the shared fetch wrapper.
- Resource classes in `src/api/*` are thin wrappers over REST endpoints.
- Most resource methods call `this.api.fetch(...)` directly with typed params and typed returns.
- Query params are converted to `kebab-case` by `kebabize()` from `src/tools/case-parser.ts`.
- Resource naming follows the Valeiot API domains rather than generic SDK abstractions.

### Connection layer

- `WorkspaceConn` builds an `API` instance with `/workspace` base path.
- `UserConn` builds an `API` instance with `/user` base path.
- `WorkspaceConn` supports auth via `token` or `session`.
- `UserConn` uses `session-id` and includes a login helper.

Current workspace resources wired into `WorkspaceConn`:

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

### Router layer

- `Router` stores root handlers, middlewares, and nested groups.
- `EventContext` carries state between middlewares and handlers.
- `EventHandlerResult` builds the final structured response, including `_meta.duration`.
- `Router` is intentionally small. Avoid turning it into a framework unless explicitly required.

## Working assumptions

- Keep resource classes thin. Avoid embedding business logic in endpoint wrappers.
- Preserve naming consistency with the existing codebase.
- Favor typed return values from `src/models/*`.
- Maintain both ESM and CJS compatibility.
- Public exports should be updated in `src/index.ts` if new surface area is introduced.
- Preserve the current split between human docs in `README.md` and agent docs in `CLAUDE.md` / `AGENTS.md`.

## Editing guidance

- If you add a new API resource, mirror the existing pattern:
  - add model types in `src/models`
  - add resource class in `src/api`
  - wire it into the appropriate connection class if needed
  - export from `src/index.ts` when it is part of the public API
- If you change request/response contracts, review all affected model types first.
- If you change the router contract, review both `src/router/router.ts` and `src/router/result.ts`.

## Error handling conventions

- `API.fetch()` retries only when a post-processor requests a remake.
- `API.fetch()` throws the API response object when `ok` is false.
- Caller-facing docs and examples should assume `try/catch`.

## Environment expectations

`WorkspaceConn` can read:

- `API_BASE_URL`
- `WORKSPACE_TOKEN`

Do not silently introduce additional required env vars without documenting them.

`UserConn` expects explicit constructor input today. If you change that, document it.

## Commands

Use these for verification:

```bash
npm run build
npm run typecheck
```

`npm run test` exists, but verify the local test harness before relying on it because this repository does not expose a conventional test tree in the root layout.

Known current issue: `npm run typecheck` may fail unless Node typings are available for `process` usage in `src/api/conn_workspace.ts`. Do not assume a failing typecheck is caused by your documentation-only change.

## Documentation intent

- `README.md`: human-facing overview, onboarding, examples
- `CLAUDE.md`: concise AI-agent implementation context
- `AGENTS.md`: broader operating rules for any coding agent working here

If changing product-facing examples or terminology, keep them aligned with the official Valeiot docs and the current public README.

## Safe defaults for agents

- Read `src/index.ts` before changing exports.
- Read the relevant connection class before adding a new resource.
- Match existing method naming: `get`, `getList`, `create`, `update`, `delete`, plus resource-specific methods.
- Avoid speculative refactors unrelated to the requested change.
- Prefer additive changes over broad reshaping of the SDK surface.
