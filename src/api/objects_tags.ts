import { List } from '../models/list.js';
import { Tag } from '../models/tags.js';
import { ID, RawTag, RequestOptions, TagForm } from '../models/common.js';
import { API } from './api.js';

/**
 * API wrapper for datasource object tag operations.
 */
export class DatasourceObjectTags {
  private api: API;

  /**
   * Creates a datasource object tags client.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of tags for a datasource object.
   * @param options Request options.
   */
  public async getList(
    options: {
      datasourceId: number;
      objectId: number | string;
    } & RequestOptions
  ): Promise<List<Tag>> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a single tag from a datasource object.
   * @param options Request options.
   */
  public async get(
    options: {
      datasourceId: number;
      objectId: number | string;
      tagId: number;
    } & RequestOptions
  ): Promise<Tag> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new tag for a datasource object.
   * @param options Request options.
   */
  public async create(
    options: {
      datasourceId: number;
      objectId: number | string;
      body: RawTag;
    } & RequestOptions
  ): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing tag for a datasource object.
   * @param options Request options.
   */
  public async update(
    options: {
      datasourceId: number;
      objectId: number | string;
      tagId: number;
      body: TagForm;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a tag from a datasource object.
   * @param options Request options.
   */
  public async delete(
    options: {
      datasourceId: number;
      objectId: number | string;
      tagId: number;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Replaces the full tag set of a datasource object.
   * @param options Request options.
   */
  public async set(
    options: {
      datasourceId: number;
      objectId: number | string;
      body: { tags: RawTag[] };
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Creates or replaces tags for a datasource object.
   * @param options Request options.
   */
  public async createOrReplace(
    options: {
      datasourceId: number;
      objectId: number | string;
      body: { tags: RawTag[] };
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/replace`,
      body: options.body,
      modifier: options.modifier,
    });
  }
}
