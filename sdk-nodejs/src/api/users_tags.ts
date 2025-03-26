import { Tag } from "../models/tags";
import { APIResponse, ID, RawTag, TagForm } from "../types";
import { API } from "./api";

export class UserTags {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async getList(options: {
    userId: number;
  }): Promise<APIResponse<Tag[]>> {
    return this.api.fetch({
      method: "GET",
      path: `users/${options.userId}/tags`,
    });
  }

  public async get(options: {
    userId: number;
    tagId: number;
  }): Promise<APIResponse<Tag[]>> {
    return this.api.fetch({
      method: "GET",
      path: `users/${options.userId}/tags/${options.tagId}`,
    });
  }

  public async create(options: {
    userId: number;
    body: RawTag;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "POST",
      path: `users/${options.userId}/tags`,
      body: options.body,
    });
  }

  public async update(options: {
    userId: number;
    tagId: number;
    body: TagForm;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "PUT",
      path: `users/${options.userId}/tags/${options.tagId}`,
      body: options.body,
    });
  }

  public async delete(options: {
    userId: number;
    tagId: number;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "DELETE",
      path: `users/${options.userId}/tags/${options.tagId}`,
    });
  }

  public async set(options: {
    userId: number;
    body: { tags: RawTag[] };
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "PUT",
      path: `users/${options.userId}/tags`,
      body: options.body,
    });
  }

  public async createOrReplace(options: {
    userId: number;
    body: { tags: RawTag[] };
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "PUT",
      path: `users/${options.userId}/tags/replace`,
      body: options.body,
    });
  }
}
