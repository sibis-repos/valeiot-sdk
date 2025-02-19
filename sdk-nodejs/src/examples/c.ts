import { EventContext, Router } from "../router";
import { ScriptEvent } from "../types";

export async function handler(event: ScriptEvent<any>) {
  const router = new Router();

  router.use(loggerMiddleware);

  const system = router.group("system", systemAuthMiddleware);
  {
    system.on("create-user", createUserHandler);
  }

  return await router.handle(event);
}

async function loggerMiddleware(ctx: EventContext, event: ScriptEvent) {
  console.log("[LOGGER]: the event is: " + event.event);
}

async function systemAuthMiddleware(ctx: EventContext, event: ScriptEvent) {
  ctx.set("my-surname", "magalhaes");
  ctx.set("my-name", "lucas");
  await ctx.next();
  console.log("[AUTH]: POS-PROCESSING");

  //   const user = event.metadata.user;
  //   if (user && user.roleName != "admin") {
  //     ctx.abortWith("not authorized");
  //     console.log("[AUTH]: Denied");
  //     return;
  //   }

  //   console.log("[AUTH]: Authorized");
}

async function createUserHandler(ctx: EventContext, event: ScriptEvent) {
  console.log(
    "[HANDLER]: Creating user .... and name is: " + ctx.get("my-name")
  );

  ctx.setData("user created with success");
}

//////////////
/// nao existe
/////////////
/////////////
/////////////
/////////////

export async function example() {
  const event: ScriptEvent<any> = {
    event: "system/create-user",
    content: {
      name: "Lucas",
    },
    metadata: {
      workspaceId: 1,
      scriptId: 1,
      time: "",
      user: {
        id: 1,
        permission: "full",
        roleId: 1,
        roleName: "viewer",
        tags: [],
      },
    },
  };

  const res = await handler(event);
  console.log("[SCRIPT RESULT]: ", res);
}
