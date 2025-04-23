import { List } from '../models/list';
import { Tag } from '../models/tags';
import { ID, RawTag, TagForm } from '../types';
import { API } from './api';

export class DatasourceTags {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of tags for a specific datasource.
   * @param options Request options containing the datasourceId.
   * @default
   * tags: [
   *   {
   *     id: 1,
   *     key: "Environment",
   *     value: "Production"
   *   },
   *   {
   *     id: 2,
   *     key: "Region",
   *     value: "US-East"
   *   }
   * ]
   */
  public async getList(options: { datasourceId: number }): Promise<List<Tag>> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/tags`,
    });
  }

  /**
   * Retrieves a single tag for a specific datasource by tagId.
   * @param options Request options containing the datasourceId and tagId.
   * @default
   * tag: {
   *   id: 1,
   *   key: "Environment",
   *   value: "Production"
   * }
   */
  public async get(options: { datasourceId: number; tagId: number }): Promise<Tag> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/tags/${options.tagId}`,
    });
  }

  /**
   * Creates a new tag for a specific datasource.
   * @param options Request options containing the datasourceId and tag data.
   * @default
   * response: {
   *   id: 3
   * }
   */
  public async create(options: { datasourceId: number; body: RawTag }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: `datasources/${options.datasourceId}/tags`,
      body: options.body,
    });
  }

  /**
   * Updates an existing tag for a specific datasource.
   * @param options Request options containing the datasourceId, tagId, and updated tag data.
   * @default
   * response: null
   */
  public async update(options: {
    datasourceId: number;
    tagId: number;
    body: TagForm;
  }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/tags/${options.tagId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a tag for a specific datasource.
   * @param options Request options containing the datasourceId and tagId.
   * @default
   * response: null
   */
  public async delete(options: { datasourceId: number; tagId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `datasources/${options.datasourceId}/tags/${options.tagId}`,
    });
  }

  /**
   * Sets multiple tags for a specific datasource, replacing the existing tags.
   * @param options Request options containing the datasourceId and tags data.
   * @default
   * response: null
   */
  public async set(options: { datasourceId: number; body: { tags: RawTag[] } }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/tags`,
      body: options.body,
    });
  }

  /**
   * Creates or replaces multiple tags for a specific datasource.
   * @param options Request options containing the datasourceId and tags data.
   * @default
   * response: null
   */
  public async createOrReplace(options: {
    datasourceId: number;
    body: { tags: RawTag[] };
  }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/tags/replace`,
      body: options.body,
    });
  }
}
