import { EventContext, Router } from "../router";
import { ScriptEvent } from "../types";

export async function handler(event: ScriptEvent) {
  const router = new Router();
  router.use(loggerMiddleware);

  const admin = router.group("system/admin", adminAuthMiddleware);
  {
    admin.on("create-user", createUserHandler);
  }

  return await router.handle(event);
}

async function loggerMiddleware(ctx: EventContext, event: ScriptEvent) {
  console.log("[LOGGER]: The event is: " + event.event);
}

async function adminAuthMiddleware(ctx: EventContext, event: ScriptEvent) {
  const user = event.metadata.user;
  if (user && user.roleName != "admin") {
    console.log("[AUTH]: Access denied");
    ctx.abortWith("access denied");
    return;
  }

  console.log("[AUTH]: Authorized");
  ctx.set("name", "Lucas");
}

async function createUserHandler(ctx: EventContext, event: ScriptEvent) {
  console.log("[HANDLER]: Criando usuario... Nome: " + ctx.get("name"));

  ctx.setData("criado com sucesso");
}

//////
// Nao existe
/////

export async function example() {
  const event: ScriptEvent<any> = {
    event: "system/admin/create-user",
    content: {
      name: "Sense5",
      addr: {
        rua: "blablablabla",
      },
      url: "https://google.com",
    },
    metadata: {
      workspaceId: 1,
      scriptId: 1,
      time: "",
      user: {
        id: 1,
        permission: "full",
        roleId: 1,
        roleName: "admin",
        tags: [],
      },
    },
  };

  const res = await handler(event);
  console.log("[SCRIPT RESULT]: ", res);
}
