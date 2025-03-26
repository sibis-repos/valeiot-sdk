import { Tag } from "../models/tags";
import { APIResponse, ID, RawTag, TagForm } from "../types";
import { API } from "./api";

export class DatasourceTags {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async getList(options: {
    datasourceId: number;
  }): Promise<APIResponse<Tag[]>> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/tags`,
    });
  }

  public async get(options: {
    datasourceId: number;
    tagId: number;
  }): Promise<APIResponse<Tag[]>> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/tags/${options.tagId}`,
    });
  }

  public async create(options: {
    datasourceId: number;
    body: RawTag;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "POST",
      path: `datasources/${options.datasourceId}/tags`,
      body: options.body,
    });
  }

  public async update(options: {
    datasourceId: number;
    tagId: number;
    body: TagForm;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}/tags/${options.tagId}`,
      body: options.body,
    });
  }

  public async delete(options: {
    datasourceId: number;
    tagId: number;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "DELETE",
      path: `datasources/${options.datasourceId}/tags/${options.tagId}`,
    });
  }

  public async set(options: {
    datasourceId: number;
    body: { tags: RawTag[] };
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}/tags`,
      body: options.body,
    });
  }

  public async createOrReplace(options: {
    datasourceId: number;
    body: { tags: RawTag[] };
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}/tags/replace`,
      body: options.body,
    });
  }
}
