import {
  DatasourceObject,
  DatasourceObjectForm,
  DatasourceObjectsListFilters,
} from "../models/objects";
import { APIResponse, ID } from "../types";
import { API } from "./api";
import { DatasourceObjectTags } from "./objects_tags";

export class Objects {
  private api: API;
  public tags: DatasourceObjectTags;

  constructor(api: API) {
    this.api = api;
    this.tags = new DatasourceObjectTags(this.api);
  }

  public async get(options: {
    datasourceId: number;
    objectId: number | string;
  }): Promise<APIResponse<DatasourceObject>> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/objects/${options.datasourceId}`,
    });
  }

  public async getValue(options: {
    datasourceId: number;
    objectId: number | string;
  }): Promise<APIResponse<Record<string, any>>> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/objects/${options.datasourceId}/value`,
    });
  }

  public async getList(options: {
    datasourceId: number;
    params?: DatasourceObjectsListFilters;
  }): Promise<APIResponse<DatasourceObject>> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/objects`,
      params: options.params,
    });
  }

  public async create(options: {
    datasourceId: number;
    body: DatasourceObjectForm;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "POST",
      path: `datasources/${options.datasourceId}/objects`,
      body: options.body,
    });
  }

  public async update(options: {
    datasourceId: number;
    objectId: number | string;
    body: DatasourceObjectForm;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}`,
      body: options.body,
    });
  }

  public async updateValue(options: {
    datasourceId: number;
    objectId: number | string;
    body: Record<string, any>;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/value`,
      body: options.body,
    });
  }

  public async delete(options: {
    datasourceId: number;
    objectId: number | string;
  }): Promise<APIResponse<ID>> {
    return this.api.fetch({
      method: "DELETE",
      path: `datasources/${options.datasourceId}/objects/${options.objectId}`,
    });
  }
}
