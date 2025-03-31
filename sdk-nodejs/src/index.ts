import { Workspace } from "./api/workspace";
import {
  ActionScriptConfig,
  ActionTriggerScheduleConfig,
} from "./models/actions";

async function test() {
  const workspace = new Workspace();

  const res = await workspace.scripts.getList({ params: { name: "123" } });
  console.log(res);
}

(async () => {
  try {
    await test();
  } catch (e) {
    console.error(e);
  }
})();
