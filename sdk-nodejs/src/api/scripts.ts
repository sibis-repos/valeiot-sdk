import { List } from '../models/list';
import {
  Script,
  ScriptCode,
  ScriptForm,
  ScriptInvokeForm,
  ScriptInvokeResponse,
  ScriptLayer,
  ScriptsListFilters,
} from '../models/scripts';
import { ID } from '../types';
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

  public async getCode(options: { scriptId: number }): Promise<ScriptCode> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/${options.scriptId}/code`,
    });
  }

  public async getRuntimeLayers(options: { runtime: string }): Promise<List<ScriptLayer>> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/runtimes/${options.runtime}/layers`,
    });
  }

  public async create(options: { body: ScriptForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'scripts',
      body: options.body,
    });
  }

  public async update(options: { scriptId: number; body: ScriptForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `scripts/${options.scriptId}`,
      body: options.body,
    });
  }

  public async updateCode(options: { scriptId: number; body: ScriptCode }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `scripts/${options.scriptId}/code`,
      body: options.body,
    });
  }

  public async delete(options: { scriptId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `scripts/${options.scriptId}`,
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
