import {
  Datasource,
  DatasourceDetails,
  DatasourceForm,
  DatasourcesDetailsListFilters,
  DatasourcesListFilters,
} from "../models/datasources";
import { Network } from "../models/network";
import { ID } from "../types";
import { API } from "./api";
import { Datapoints } from "./datapoints";
import { DatasourceTags } from "./tags";
import { Objects } from "./objects";

export class Datasources {
  private api: API;

  public datapoints: Datapoints;
  public objects: Objects;
  public tags: DatasourceTags;

  constructor(api: API) {
    this.api = api;
    this.tags = new DatasourceTags(this.api);
    this.datapoints = new Datapoints(this.api);
    this.objects = new Objects(this.api);
  }

  /**
   * Retrieves a datasource.
   * @param options Request options.
   * @default
   * datasource: {
   *  id: 1,
   *  bucketId: 1,
   *  networkId: 1,
   *  type: "device",
   *  dnid: "01a",
   *  payloadParserId: null,
   *  createdAt: [Object]
   *  updatedAt: [Object]
   *  name: "My device",
   *  blocked: false
   * }
   */
  public async get(options: { datasourceId: number }): Promise<Datasource> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}`,
    });
  }

  /**
   * Retrieves a datasource with details.
   * @param options Request options.
   * @default
   * datasource: {
   *  id: 1,
   *  type: "device",
   *  dnid: "01a",
   *  createdAt: [Object]
   *  updatedAt: [Object]
   *  lastInput: [Object]
   *  name: "My device",
   *  networkId: 1,
   *  blocked: false
   *  payloadParserId: null,
   * }
   */
  public async getDetails(options: {
    datasourceId: number;
  }): Promise<DatasourceDetails> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/details`,
    });
  }

  public async getNetwork(options: { datasourceId: number }): Promise<Network> {
    return this.api.fetch({
      method: "GET",
      path: `datasources/${options.datasourceId}/network`,
    });
  }

  public async getList(
    options: {
      params?: DatasourcesListFilters;
    } = {}
  ): Promise<Datasource> {
    return this.api.fetch({
      method: "GET",
      path: "datasources",
      params: options.params,
    });
  }

  public async getDetailsList(
    options: {
      params?: DatasourcesDetailsListFilters;
    } = {}
  ): Promise<DatasourceDetails> {
    return this.api.fetch({
      method: "GET",
      path: "datasources/details",
      params: options.params,
    });
  }

  public async create(options: { body: DatasourceForm }): Promise<ID> {
    return this.api.fetch({
      method: "POST",
      path: "datasources",
      body: options.body,
    });
  }

  public async update(options: {
    datasourceId: number;
    body: DatasourceForm;
  }): Promise<null> {
    return this.api.fetch({
      method: "PUT",
      path: `datasources/${options.datasourceId}`,
      body: options.body,
    });
  }

  public async delete(options: { datasourceId: number }): Promise<null> {
    return this.api.fetch({
      method: "DELETE",
      path: `datasources/${options.datasourceId}`,
    });
  }
}
