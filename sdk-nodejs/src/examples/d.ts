import { EventContext, Router } from "../router";
import { ScriptEvent } from "../types";
import { Workspace } from "../workspace";

export async function handler(event: ScriptEvent<any>) {
  const router = new Router();

  router.on("create-org", createOrgHandler);

  return await router.handle(event);
}

async function createOrgHandler(ctx: EventContext, event: ScriptEvent) {
  const workspace = new Workspace();

  const res = await workspace.createDatasource({
    name: event.content.name,
    blocked : false,
    bucketId: 1,
    networkId: 1,
    payloadParserId: null,
    dnid: event.content.name,
    type: "entity",
  });

  workspace.createDatasourceObject(res.data.id, {
    key: "meta",
    value: {},
  });

  workspace.setDatasourceTags(res.data.id, [
    {
      key: "",
      value: "",
    },
  ]);
}

//////////////
/// nao existe
/////////////
/////////////
/////////////
/////////////

export async function example() {
  const event: ScriptEvent<any> = {
    event: "create-org",
    content: {
      name: "Petrobras",
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
        roleName: "viewer",
        tags: [],
      },
    },
  };

  const res = await handler(event);
  console.log("[SCRIPT RESULT]: ", res);
}
