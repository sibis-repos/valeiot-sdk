import { List } from '../models/list';
import {
  Script,
  ScriptInvokeForm,
  ScriptInvokeResponse,
  ScriptLayer,
  ScriptsListFilters,
} from '../models/scripts';
import { API } from './api';

export class Scripts {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async get(options: { scriptId: number }): Promise<Script> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/${options.scriptId}`,
    });
  }

  public async getList(options: { params?: ScriptsListFilters } = {}): Promise<List<Script>> {
    return this.api.fetch({
      method: 'GET',
      path: 'scripts',
      params: options.params,
    });
  }

  public async getRuntimeLayers(options: { runtime: string }): Promise<List<ScriptLayer>> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/runtimes/${options.runtime}/layers`,
    });
  }

  public async invoke(options: {
    scriptId: number;
    body: ScriptInvokeForm;
  }): Promise<ScriptInvokeResponse> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/${options.scriptId}/invoke`,
      body: options.body,
    });
  }
}
