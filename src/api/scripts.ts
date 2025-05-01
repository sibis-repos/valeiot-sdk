import { ID, RequestOptions } from '../models/common.js';
import { List } from '../models/list.js';
import {
  Script,
  ScriptCode,
  ScriptDetails,
  ScriptForm,
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

  /**
   * Retrieves a script.
   * @param options Request options.
   * @default
   * script: {
   *  id: 1,
   *  name: "device123",
   *  description: "",
   *  executionMode: "cloud",
   *  cloudConfig: {...},
   *  webhookConfig: null,
   *  createdAt: Date,
   *  updatedAt: Date
   * }
   */
  public async get(options: { scriptId: number } & RequestOptions): Promise<Script> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/${options.scriptId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a script with details.
   * @param options Request options.
   * @default
   * script: {
   *  id: 1,
   *  name: "device123",
   *  description: "",
   *  executionMode: "cloud",
   *  cloudConfig: {...},
   *  webhookConfig: null,
   *  createdAt: Date,
   *  updatedAt: Date,
   *  lastTrigger: Date
   * }
   */
  public async getDetails(options: { scriptId: number } & RequestOptions): Promise<ScriptDetails> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/${options.scriptId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a script list.
   * @param options Request options.
   * @default
   * scripts: [{
   *  id: 1,
   *  name: "device123",
   *  description: "",
   *  executionMode: "cloud",
   *  cloudConfig: {...},
   *  webhookConfig: null,
   *  createdAt: Date,
   *  updatedAt: Date
   * }]
   */
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

  /**
   * Retrieves a script list with details.
   * @param options Request options.
   * @default
   * scripts: [{
   *  id: 1,
   *  name: "device123",
   *  description: "",
   *  executionMode: "cloud",
   *  cloudConfig: {...},
   *  webhookConfig: null,
   *  createdAt: Date,
   *  updatedAt: Date,
   *  lastTrigger: Date
   * }]
   */
  public async getDetailsList(
    options: { params?: ScriptsListFilters } & RequestOptions = {}
  ): Promise<List<ScriptDetails>> {
    return this.api.fetch({
      method: 'GET',
      path: 'scripts/details',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a script code.
   * @param options Request options.
   * @default
   * code: {
   *  code: "export function handler(..."
   * }
   */
  public async getCode(options: { scriptId: number } & RequestOptions): Promise<ScriptCode> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/${options.scriptId}/code`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a script runtime layers list.
   * @param options Request options.
   * @default
   * layers: [{
   *  version: 1,
   *  description: "Valeiot sdk with axios."
   * }]
   */
  public async getRuntimeLayers(
    options: { runtime: string } & RequestOptions
  ): Promise<List<ScriptLayer>> {
    return this.api.fetch({
      method: 'GET',
      path: `scripts/runtimes/${options.runtime}/layers`,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new script.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: ScriptForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'scripts',
      modifier: options.modifier,
      body: options.body,
    });
  }

  /**
   * Updates an existing script.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { scriptId: number; body: ScriptForm } & RequestOptions
  ): Promise<ID> {
    return this.api.fetch({
      method: 'PUT',
      path: `scripts/${options.scriptId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing script code.
   * @param options Request options.
   * @default
   * response: null
   */
  public async updateCode(
    options: { scriptId: number; body: ScriptCode } & RequestOptions
  ): Promise<ID> {
    return this.api.fetch({
      method: 'PUT',
      path: `scripts/${options.scriptId}/code`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a script.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { scriptID: number } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'DELETE',
      path: `scripts/${options.scriptID}`,
      modifier: options.modifier,
    });
  }

  /**
   * Invokes a script.
   * @param options Request options.
   * @default
   * response: {
   *  result: "Message from script.",
   *  logs: "Debug: 123456 ..."
   * }
   */
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
