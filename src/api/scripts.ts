import { RequestOptions } from '../models/common.js';
import { List } from '../models/list.js';
import {
  Script,
  ScriptInvokeForm,
  ScriptInvokeResponse,
  ScriptLayer,
  ScriptsListFilters,
} from '../models/scripts.js';
import { API } from './api.js';

export class Scripts {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async get(options: { scriptId: number } & RequestOptions): Promise<Script> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/${options.scriptId}`,
      modifier: options.modifier,
    });
  }

  public async getList(
    options: { params?: ScriptsListFilters } & RequestOptions = {}
  ): Promise<List<Script>> {
    return this.api.fetch({
      method: 'GET',
      path: 'scripts',
      params: options.params,
      modifier: options.modifier,
    });
  }

  public async getRuntimeLayers(
    options: { runtime: string } & RequestOptions
  ): Promise<List<ScriptLayer>> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/runtimes/${options.runtime}/layers`,
      modifier: options.modifier,
    });
  }

  public async invoke(
    options: {
      scriptId: number;
      body: ScriptInvokeForm;
    } & RequestOptions
  ): Promise<ScriptInvokeResponse> {
    return this.api.fetch({
      method: 'POST',
      path: `scripts/${options.scriptId}/invoke`,
      body: options.body,
      modifier: options.modifier,
    });
  }
}
