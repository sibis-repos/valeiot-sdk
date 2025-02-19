import { EventContext, Router } from "../router";
import { ScriptEvent } from "../types";

async function handle(event: ScriptEvent<any>) {
  const router = new Router();

  router.use(loggerMiddleware);

  const system = router.group("system", systemAuthMiddleware);
  {
    system.on("users/create", userCreateHandler);
  }

  return await router.handle(event);
}

async function loggerMiddleware(ctx: EventContext, event: ScriptEvent) {
  console.log(`[LOGGER]: the event is "${event.event}"`);
}

async function systemAuthMiddleware(ctx: EventContext, event: ScriptEvent) {
  const user = event.metadata.user;
  if (user && user.roleName != "admin") {
    ctx.abortWith("access denied");
    // ctx.abort()
    return;
  }

  console.log("[SYSTEM-AUTH]: Authenticated with success");
}

async function userCreateHandler(ctx: EventContext, event: ScriptEvent) {
  ctx.setData("[HANDLER]: creating user...");
}

export async function example() {
  const event1: ScriptEvent<any> = {
    event: "system/users/create",
    metadata: {
      workspaceId: 1,
      scriptId: 1,
      time: new Date().toISOString(),
      user: {
        id: 1,
        permission: "full",
        roleId: 1,
        roleName: "admin",
        tags: [
          {
            key: "role",
            value: "admin",
          },
        ],
      },
    },
    content: {
      name: "Lucas",
    },
  };

  const event2: ScriptEvent<any> = {
    event: "warning",
    metadata: {
      workspaceId: 1,
      scriptId: 1,
      time: new Date().toISOString(),
      user: undefined,
    },
    content: {
      message: "Something is wrong",
    },
  };

  const res = await handle(event1);
  console.log(res);
}
