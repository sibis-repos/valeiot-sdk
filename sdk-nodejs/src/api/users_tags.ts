import { Tag } from "../models/tags";
import { ID, RawTag, TagForm } from "../types";
import { API } from "./api";

export class UserTags {
  private api: API;

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
  public async getList(options: { userId: number }): Promise<Tag[]> {
    return this.api.fetch({
      method: "GET",
      path: `users/${options.userId}/tags`,
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
  public async get(options: { userId: number; tagId: number }): Promise<Tag> {
    return this.api.fetch({
      method: "GET",
      path: `users/${options.userId}/tags/${options.tagId}`,
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
  public async create(options: { userId: number; body: RawTag }): Promise<ID> {
    return this.api.fetch({
      method: "POST",
      path: `users/${options.userId}/tags`,
      body: options.body,
    });
  }

  /**
   * Updates an existing tag for a specific user.
   * @param options Request options containing the userId, tagId, and updated tag data.
   * @default
   * response: {
   *   id: 2
   * }
   */
  public async update(options: {
    userId: number;
    tagId: number;
    body: TagForm;
  }): Promise<ID> {
    return this.api.fetch({
      method: "PUT",
      path: `users/${options.userId}/tags/${options.tagId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a tag for a specific user.
   * @param options Request options containing the userId and tagId.
   * @default
   * response: {
   *   id: 2
   * }
   */
  public async delete(options: { userId: number; tagId: number }): Promise<ID> {
    return this.api.fetch({
      method: "DELETE",
      path: `users/${options.userId}/tags/${options.tagId}`,
    });
  }

  /**
   * Sets multiple tags for a specific user, replacing the existing tags.
   * @param options Request options containing the userId and tags data.
   * @default
   * response: {
   *   id: 4
   * }
   */
  public async set(options: {
    userId: number;
    body: { tags: RawTag[] };
  }): Promise<ID> {
    return this.api.fetch({
      method: "PUT",
      path: `users/${options.userId}/tags`,
      body: options.body,
    });
  }

  /**
   * Creates or replaces multiple tags for a specific user.
   * @param options Request options containing the userId and tags data.
   * @default
   * response: {
   *   id: 5
   * }
   */
  public async createOrReplace(options: {
    userId: number;
    body: { tags: RawTag[] };
  }): Promise<ID> {
    return this.api.fetch({
      method: "PUT",
      path: `users/${options.userId}/tags/replace`,
      body: options.body,
    });
  }
}
