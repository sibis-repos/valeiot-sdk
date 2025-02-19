import { EventContext, Router } from "../router";
import { ScriptEvent } from "../types";

async function handle(event: ScriptEvent<any>) {
  const router = new Router();

  router.use(loggerMiddleware);

  router.on("greetings", greetingsHandler);
  router.on("warning", warningHandler);

  return await router.handle(event);
}

async function loggerMiddleware(ctx: EventContext, event: ScriptEvent) {
  console.log(`[LOGGER]: ${event.event}`);
}

async function greetingsHandler(ctx: EventContext, event: ScriptEvent) {
  console.log(`[GREETINGS]: ${event.content.message}`);
}

async function warningHandler(ctx: EventContext, event: ScriptEvent) {
  console.log(`[Warning]: ${event.content.message}`);
}

export function example() {
  const event1: ScriptEvent<any> = {
    event: "greetings",
    metadata: {
      workspaceId: 1,
      scriptId: 1,
      time: new Date().toISOString(),
      user: undefined,
    },
    content: {
      message: "Hello from somewhere",
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

  handle(event2);
}
