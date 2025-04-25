import { List } from '../models/list.js';
import { Tag } from '../models/tags.js';
import { ID, RawTag, RequestOptions, TagForm } from '../models/common.js';
import { API } from './api.js';

export class DriveFoldersTags {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of tags for a specific drive folder.
   * @param options Request options.
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
  public async getList(options: { folderId: number } & RequestOptions): Promise<List<Tag>> {
    return this.api.fetch({
      method: 'GET',
      path: `drive/folders/${options.folderId}/tags`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a single tag for a specific drive folder by tagId.
   * @param options Request options.
   * @default
   * tag: {
   *   id: 1,
   *   key: "Environment",
   *   value: "Production"
   * }
   */
  public async get(options: { folderId: number; tagId: number } & RequestOptions): Promise<Tag> {
    return this.api.fetch({
      method: 'GET',
      path: `drive/folders/${options.folderId}/tags/${options.tagId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new tag for a specific drive folder.
   * @param options Request options.
   * @default
   * response: {
   *   id: 3
   * }
   */
  public async create(options: { folderId: number; body: RawTag } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: `drive/folders/${options.folderId}/tags`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing tag for a specific drive folder.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: {
      dashboardId: number;
      tagId: number;
      body: TagForm;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/folders/${options.dashboardId}/tags/${options.tagId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a tag for a specific drive folder.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(
    options: { folderId: number; tagId: number } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `drive/folders/${options.folderId}/tags/${options.tagId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Sets multiple tags for a specific drive folder, replacing the existing tags.
   * @param options Request options.
   * @default
   * response: null
   */
  public async set(
    options: { folderId: number; body: { tags: RawTag[] } } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/folders/${options.folderId}/tags`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Creates or replaces multiple tags for a specific dashboard.
   * @param options Request options.
   * @default
   * response: null
   */
  public async createOrReplace(
    options: {
      folderId: number;
      body: { tags: RawTag[] };
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/folders/${options.folderId}/tags/replace`,
      body: options.body,
      modifier: options.modifier,
    });
  }
}
