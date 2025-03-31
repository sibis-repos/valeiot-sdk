import {
  Script,
  ScriptInvokeForm,
  ScriptInvokeResponse,
  ScriptsListFilters,
} from "../models/scripts";
import { API } from "./api";

export class Scripts {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async get(options: { scriptId: number }): Promise<Script> {
    return this.api.fetch({
      method: "GET",
      path: `scripts/${options.scriptId}`,
    });
  }

  public async getList(
    options: { params?: ScriptsListFilters } = {}
  ): Promise<Script[]> {
    return this.api.fetch({
      method: "GET",
      path: "scripts",
      params: options.params,
    });
  }

  public async invoke(options: {
    scriptId: number;
    body: ScriptInvokeForm;
  }): Promise<ScriptInvokeResponse> {
    return this.api.fetch({
      method: "GET",
      path: `scripts/${options.scriptId}/invoke`,
      body: options.body,
    });
  }

  
}
