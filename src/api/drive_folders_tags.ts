import { List } from '../models/list';
import { Tag } from '../models/tags';
import { ID, RawTag, TagForm } from '../models/common';
import { API } from './api';

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
  public async getList(options: { folderId: number }): Promise<List<Tag>> {
    return this.api.fetch({
      method: 'GET',
      path: `drive/folders/${options.folderId}/tags`,
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
  public async get(options: { folderId: number; tagId: number }): Promise<Tag> {
    return this.api.fetch({
      method: 'GET',
      path: `drive/folders/${options.folderId}/tags/${options.tagId}`,
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
  public async create(options: { folderId: number; body: RawTag }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: `drive/folders/${options.folderId}/tags`,
      body: options.body,
    });
  }

  /**
   * Updates an existing tag for a specific drive folder.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(options: {
    dashboardId: number;
    tagId: number;
    body: TagForm;
  }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/folders/${options.dashboardId}/tags/${options.tagId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a tag for a specific drive folder.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { folderId: number; tagId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `drive/folders/${options.folderId}/tags/${options.tagId}`,
    });
  }

  /**
   * Sets multiple tags for a specific drive folder, replacing the existing tags.
   * @param options Request options.
   * @default
   * response: null
   */
  public async set(options: { folderId: number; body: { tags: RawTag[] } }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/folders/${options.folderId}/tags`,
      body: options.body,
    });
  }

  /**
   * Creates or replaces multiple tags for a specific dashboard.
   * @param options Request options.
   * @default
   * response: null
   */
  public async createOrReplace(options: {
    folderId: number;
    body: { tags: RawTag[] };
  }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/folders/${options.folderId}/tags/replace`,
      body: options.body,
    });
  }
}
