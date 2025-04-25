import { List } from '../models/list.js';
import {
  DatasourceObject,
  DatasourceObjectForm,
  DatasourceObjectsListFilters,
} from '../models/objects.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';
import { DatasourceObjectTags } from './objects_tags.js';

export class Objects {
  private api: API;
  public tags: DatasourceObjectTags;

  constructor(api: API) {
    this.api = api;
    this.tags = new DatasourceObjectTags(this.api);
  }

  /**
   * Retrieves a single datasource object.
   * @param options Request options.
   * @default
   * object: {
   *  id: 1,
   *  key: "device123",
   *  createdAt: Date,
   *  updatedAt: Date,
   *  value: { status: "active", temperature: 22.5 }
   * }
   */
  public async get(
    options: {
      datasourceId: number;
      objectId: number | string;
    } & RequestOptions
  ): Promise<DatasourceObject> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves the value of a datasource object.
   * @param options Request options.
   * @default
   * value: {
   *  status: "active",
   *  temperature: 22.5
   * }
   */
  public async getValue(
    options: {
      datasourceId: number;
      objectId: number | string;
    } & RequestOptions
  ): Promise<Record<string, any>> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/value`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of datasource objects.
   * @param options Request options.
   * @default
   * objects: [
   *  {
   *    id: 1,
   *    key: "device123",
   *    createdAt: Date,
   *    updatedAt: Date,
   *    value: null
   *  },
   *  {
   *    id: 2,
   *    key: "sensor456",
   *    createdAt: Date,
   *    updatedAt: Date,
   *    value: null
   *  }
   * ]
   */
  public async getList(
    options: {
      datasourceId: number;
      params?: DatasourceObjectsListFilters;
    } & RequestOptions
  ): Promise<List<DatasourceObject>> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/objects`,
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new datasource object.
   * @param options Request options.
   * @default
   * response: { id: 1 }
   */
  public async create(
    options: { datasourceId: number; body: DatasourceObjectForm } & RequestOptions
  ): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: `datasources/${options.datasourceId}/objects`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing datasource object.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: {
      datasourceId: number;
      objectId: number | string;
      body: DatasourceObjectForm;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates only the value of a datasource object.
   * @param options Request options.
   * @default
   * response: null
   */
  public async updateValue(
    options: {
      datasourceId: number;
      objectId: number | string;
      body: Record<string, any>;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/value`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a datasource object.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(
    options: { datasourceId: number; objectId: number | string } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}`,
      modifier: options.modifier,
    });
  }
}
