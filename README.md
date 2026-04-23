# @sibis/valeiot-sdk

Open-source TypeScript SDK for integrating applications with [Valeiot](https://www.valeiot.com/), a cloud IoT platform for collecting, storing, visualizing, and automating data from devices, entities, and users.

This package is designed for teams that want to consume the Valeiot API from Node.js and TypeScript projects, automate workflows with scripts, and build integrations with strong typing and less repetitive code.

## About Valeiot

Valeiot is a cloud IoT platform focused on building connected solutions with:

- device and entity data ingestion and storage
- built-in HTTPS and MQTT communication support
- dashboards for operational visualization
- a white-label portal for end users
- access control with users and roles
- scripts, alerts, reports, and third-party integrations

According to the official platform documentation, `Devices` represent physical or virtual components connected to the ecosystem, while `Entities` use the same data structure to represent broader non-device resources such as buildings, apartments, cities, APIs, or logical assets. The platform also organizes access permissions through `Roles`, especially for Portal access.

## When to use this SDK

Use `@sibis/valeiot-sdk` when you need to:

- integrate a backend application with a Valeiot workspace
- list, create, update, or delete platform resources
- read and write datapoints and objects
- manage scripts, users, roles, dashboards, themes, portals, and notifications
- build automations and integrations on top of the Valeiot API with TypeScript typing

## Installation

```bash
npm install @sibis/valeiot-sdk
pnpm add @sibis/valeiot-sdk
yarn add @sibis/valeiot-sdk
bun add @sibis/valeiot-sdk
```

## Requirements

- Node.js with `fetch` support
- access to a Valeiot API instance
- valid workspace or user session credentials

## Core platform concepts

For developers getting started with Valeiot:

- `Device`: physical or virtual component that sends and receives data
- `Entity`: resource with the same structure as a device, but with broader semantics
- `Datapoints`: time-series storage
- `Objects`: structured data storage
- `Network`: grouping that provides access to associated devices
- `Payload Parser`: optional layer used to decode incoming payloads
- `Role`: permission policy for Portal users
- `Portal`: white-label application delivered to end users

## What the SDK provides

The package has two main building blocks:

- a typed HTTP client for the Valeiot API
- an event router for scripts and automations

### Available connections

- `WorkspaceConn`: access to workspace routes using `token` or `session`
- `UserConn`: access to user routes using `session`
- `API`: base HTTP transport used internally

### Available resources

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

Some resources also expose specialized submodules such as:

- `datasources.datapoints`
- `datasources.objects`
- `datasources.tags`
- `datasources.tokens`

## Quick start

### 1. Connect to a workspace

```ts
import { WorkspaceConn } from '@sibis/valeiot-sdk';

const conn = new WorkspaceConn({
  baseUrl: 'https://api.your-domain.com',
  token: process.env.WORKSPACE_TOKEN,
});

const datasources = await conn.datasources.getList();
console.log(datasources.items);
```

If `baseUrl` and `token` are not provided explicitly, `WorkspaceConn` also tries to read:

- `API_BASE_URL`
- `WORKSPACE_TOKEN`

### 2. Query devices or entities

In the SDK API, both are handled under the `datasources` module.

```ts
const list = await conn.datasources.getList({
  params: {
    limit: 20,
  },
});

console.log(list.count);
console.log(list.items);
```

### 3. Read latest datapoints

```ts
const latest = await conn.datasources.datapoints.getLatest({
  datasourceId: 42,
  params: {
    variables: ['temperature', 'humidity'],
  },
});

console.log(latest);
```

### 4. Create datapoints

```ts
await conn.datasources.datapoints.create({
  datasourceId: 42,
  body: [
    {
      variable: 'temperature',
      value: 24.3,
      time: new Date().toISOString(),
    },
  ],
});
```

### 5. Work with scripts

```ts
const scripts = await conn.scripts.getList();

const result = await conn.scripts.invoke({
  scriptId: 10,
  body: {
    event: 'manual/run',
    content: { source: 'sdk' },
  },
});

console.log(scripts.items);
console.log(result);
```

### 6. Connect as a user

```ts
import { UserConn } from '@sibis/valeiot-sdk';

const userConn = new UserConn({
  baseUrl: 'https://api.your-domain.com',
  session: 'session-id',
});

const me = await userConn.me.get();
console.log(me);
```

## Event and script router

The SDK also provides a router to organize middlewares and event handlers used in scripts and automations.

```ts
import { Router } from '@sibis/valeiot-sdk';

const router = new Router();

router.use(async (ctx, event) => {
  ctx.set('workspaceId', event.metadata.workspaceId);
});

router.on('device/created', async (ctx, event) => {
  return {
    handled: true,
    workspaceId: ctx.get('workspaceId'),
    payload: event.content,
  };
});

const response = await router.handle({
  event: 'device/created',
  metadata: {
    workspaceId: 1,
    scriptId: 7,
    time: new Date().toISOString(),
  },
  content: {
    deviceId: 123,
  },
});
```

Router features:

- global middlewares with `use()`
- hierarchical groups with `group()`
- shared state through `EventContext`
- standardized results with `_meta`, execution duration, and upload attachments

## Error handling

Internally, `API.fetch()` throws the response when the HTTP request is unsuccessful. The recommended usage pattern is `try/catch`.

```ts
try {
  const user = await conn.users.get({ userId: 1 });
  console.log(user);
} catch (error) {
  console.error('Error while calling the Valeiot API:', error);
}
```

## Project structure

```text
src/
  api/       typed API wrappers
  models/    input, output, and filter types
  router/    event routing engine
  tools/     shared utilities
```

## Local development

```bash
npm install
npm run build
npm run typecheck
```

Available scripts:

- `npm run build`
- `npm run build:esm`
- `npm run build:cjs`
- `npm run typecheck`
- `npm run test`
- `npm run portal`

## Official references

- Platform website: [valeiot.com](https://www.valeiot.com/)
- Official documentation: [docs.valeiot.com](https://docs.valeiot.com/)
- Device docs: [docs.valeiot.com/pt/docs/datasources/device](https://docs.valeiot.com/pt/docs/datasources/device/)
- Entity docs: [docs.valeiot.com/pt/docs/datasources/entity](https://docs.valeiot.com/pt/docs/datasources/entity/)
- Role docs: [docs.valeiot.com/pt/docs/users-roles/role](https://docs.valeiot.com/pt/docs/users-roles/role/)

## Contributing

If you want to contribute, report a bug, or suggest an improvement, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Notes

- `baseUrl` must not end with `/`
- query parameters are automatically converted to `kebab-case`
- `WorkspaceConn` supports authentication with `token` or `session`
- `UserConn` works with `session-id`
- the package publishes both ESM and CommonJS builds

## License

Apache-2.0
