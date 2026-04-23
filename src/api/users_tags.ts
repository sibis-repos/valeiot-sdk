import { List } from '../models/list.js';
import { Tag } from '../models/tags.js';
import { ID, RawTag, RequestOptions, TagForm } from '../models/common.js';
import { API } from './api.js';

/**
 * API wrapper for user tag operations.
 */
export class UserTags {
  private api: API;

  /**
   * Creates a user tags client.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of tags for a specific user.
   * @param options Request options containing the userId.
   * @default
   * tags: [
   *   {
   *     id: 1,
   *     key: "Group",
   *     value: "VIP"
   *   },
   *   {
   *     id: 2,
   *     key: "Status",
   *     value: "Active"
   *   }
   * ]
   */
  public async getList(options: { userId: number } & RequestOptions): Promise<List<Tag>> {
    return this.api.fetch({
      method: 'GET',
      path: `users/${options.userId}/tags`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a single tag for a specific user by tagId.
   * @param options Request options containing the userId and tagId.
   * @default
   * tag: {
   *   id: 1,
   *   key: "Group",
   *   value: "VIP"
   * }
   */
  public async get(options: { userId: number; tagId: number } & RequestOptions): Promise<Tag> {
    return this.api.fetch({
      method: 'GET',
      path: `users/${options.userId}/tags/${options.tagId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new tag for a specific user.
   * @param options Request options containing the userId and tag data.
   * @default
   * response: {
   *   id: 3
   * }
   */
  public async create(options: { userId: number; body: RawTag } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: `users/${options.userId}/tags`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing tag for a specific user.
   * @param options Request options containing the userId, tagId, and updated tag data.
   * @default
   * response: null
   */
  public async update(
    options: { userId: number; tagId: number; body: TagForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `users/${options.userId}/tags/${options.tagId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a tag for a specific user.
   * @param options Request options containing the userId and tagId.
   * @default
   * response: null
   */
  public async delete(options: { userId: number; tagId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `users/${options.userId}/tags/${options.tagId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Sets multiple tags for a specific user, replacing the existing tags.
   * @param options Request options containing the userId and tags data.
   * @default
   * response: null
   */
  public async set(
    options: { userId: number; body: { tags: RawTag[] } } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `users/${options.userId}/tags`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Creates or replaces multiple tags for a specific user.
   * @param options Request options containing the userId and tags data.
   * @default
   * response: null
   */
  public async createOrReplace(
    options: {
      userId: number;
      body: { tags: RawTag[] };
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `users/${options.userId}/tags/replace`,
      body: options.body,
      modifier: options.modifier,
    });
  }
}
