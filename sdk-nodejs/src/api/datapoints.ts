import {
  Datapoint,
  DatapointForm,
  DatapointsDeleteFilters,
  DatapointsListFilters,
} from "../models/datapoints";
import { APIResponse } from "../types";
import { API } from "./api";

export class Datapoints {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async getList(options: {
    datasourceId: number;
    params?: DatapointsListFilters;
  }): Promise<Datapoint[]> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/datapoints`,
      params: options.params,
    });
  }

  public async getLatest(options: {
    datasourceId: number;
    params: {
      variables: string[];
    };
  }): Promise<Datapoint[]> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/datapoints/latest`,
      params: options.params,
    });
  }

  public async create(options: {
    body: DatapointForm[];
    datasourceId: number;
  }): Promise<null> {
    return this.api.fetch({
      method: "POST",
      path: `datasources/${options.datasourceId}/datapoints`,
      body: options.body,
    });
  }

  public async delete(options: {
    datasourceId: number;
    params: DatapointsDeleteFilters;
  }): Promise<null> {
    return this.api.fetch({
      method: "DELETE",
      path: `datasources/${options.datasourceId}/datapoints`,
      params: options.params,
    });
  }
}
