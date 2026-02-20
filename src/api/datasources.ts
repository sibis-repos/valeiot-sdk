import {
  Datasource,
  DatasourceDetails,
  DatasourceForm,
  DatasourcesDetailsListFilters,
  DatasourcesListFilters,
  ListWithTagKeys,
} from '../models/datasources.js';
import { Network } from '../models/networks.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';
import { Datapoints } from './datapoints.js';
import { DatasourceTags } from './datasources_tags.js';
import { DatasourcesTokens } from './datasources_tokens.js';
import { Objects } from './objects.js';

export class Datasources {
  private api: API;

  public datapoints: Datapoints;
  public objects: Objects;
  public tags: DatasourceTags;
  public tokens: DatasourcesTokens;

  constructor(api: API) {
    this.api = api;
    this.tags = new DatasourceTags(this.api);
    this.tokens = new DatasourcesTokens(this.api);
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
   *  createdAt: Date,
   *  updatedAt: Date,
   *  name: "My device",
   *  blocked: false
   * }
   */
  public async get(options: { datasourceId: number } & RequestOptions): Promise<Datasource> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}`,
      modifier: options.modifier,
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
   *  createdAt: Date,
   *  updatedAt: Date,
   *  lastInput: Date,
   *  name: "My device",
   *  blocked: false,
   *  networkId: 1,
   *  bucket: { id: 1, name: "My bucket" },
   *  network: { id: 1, name: "My network" },
   *  payloadParser: null,
   *  tags: [{ id: 1, key: "a", "value": "b" }],
   *  objects: [],
   *  datapoints: []
   * }
   */
  public async getDetails(
    options: { datasourceId: number } & RequestOptions
  ): Promise<DatasourceDetails> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/details`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves the network associated with a datasource.
   * @param options Request options.
   * @default
   * network: {
   *  id: 1,
   *  name: "My network",
   *  type: "custom",
   *  description: "Network for my devices",
   *  createdAt: Date,
   *  updatedAt: Date
   * }
   */
  public async getNetwork(options: { datasourceId: number } & RequestOptions): Promise<Network> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/network`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of datasources.
   * @param options Request options.
   * @default
   * datasources: [
   *  {
   *    id: 1,
   *    bucketId: 1,
   *    networkId: 1,
   *    type: "device",
   *    dnid: "01a",
   *    payloadParserId: null,
   *    createdAt: Date,
   *    updatedAt: Date,
   *    name: "My device",
   *    blocked: false
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: DatasourcesListFilters;
    } & RequestOptions = {}
  ): Promise<ListWithTagKeys<Datasource>> {
    return this.api.fetch({
      method: 'GET',
      path: 'datasources',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of datasource details.
   * @param options Request options.
   * @default
   * datasources: [
   *  {
   *    id: 1,
   *    type: "device",
   *    dnid: "01a",
   *    createdAt: Date,
   *    updatedAt: Date,
   *    lastInput: Date,
   *    name: "My device",
   *    blocked: false,
   *    networkId: 1,
   *    bucket: { id: 1, name: "My bucket" },
   *    network: { id: 1, name: "My network" },
   *    payloadParser: null,
   *    tags: [{ id: 1, key: "a", "value": "b" }],
   *    objects: [],
   *    datapoints: []
   *  }
   * ]
   */
  public async getDetailsList(
    options: {
      params?: DatasourcesDetailsListFilters;
    } & RequestOptions = {}
  ): Promise<ListWithTagKeys<DatasourceDetails>> {
    return this.api.fetch({
      method: 'GET',
      path: 'datasources/details',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new datasource.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: DatasourceForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'datasources',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing datasource.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { datasourceId: number; body: DatasourceForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a datasource.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { datasourceId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `datasources/${options.datasourceId}`,
      modifier: options.modifier,
    });
  }
}
