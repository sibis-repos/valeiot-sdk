import { Tag } from "../models/tags";
import { APIResponse, ID, RawTag, TagForm } from "../types";
import { API } from "./api";

export class DatasourceObjectTags {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async getList(options: {
    datasourceId: number;
    objectId: number | string;
  }): Promise<Tag[]> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
    });
  }

  public async get(options: {
    datasourceId: number;
    objectId: number | string;
    tagId: number;
  }): Promise<Tag[]> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
    });
  }

  public async create(options: {
    datasourceId: number;
    objectId: number | string;
    body: RawTag;
  }): Promise<ID> {
    return this.api.fetch({
      method: "POST",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
      body: options.body,
    });
  }

  public async update(options: {
    datasourceId: number;
    objectId: number | string;
    tagId: number;
    body: TagForm;
  }): Promise<ID> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
      body: options.body,
    });
  }

  public async delete(options: {
    datasourceId: number;
    objectId: number | string;
    tagId: number;
  }): Promise<ID> {
    return this.api.fetch({
      method: "DELETE",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
    });
  }

  public async set(options: {
    datasourceId: number;
    objectId: number | string;
    body: { tags: RawTag[] };
  }): Promise<ID> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
      body: options.body,
    });
  }

  public async createOrReplace(options: {
    datasourceId: number;
    objectId: number | string;
    body: { tags: RawTag[] };
  }): Promise<ID> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/replace`,
      body: options.body,
    });
  }
}
