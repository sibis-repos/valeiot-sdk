import {
  Datasource,
  DatasourceDetails,
  DatasourceForm,
  DatasourcesDetailsListFilters,
  DatasourcesListFilters,
} from '../models/datasources';
import { List } from '../models/list';
import { Network } from '../models/networks';
import { ID } from '../types';
import { API } from './api';
import { Datapoints } from './datapoints';
import { DatasourceTags } from './datasources_tags';
import { DatasourcesTokens } from './datasources_tokens';
import { Objects } from './objects';

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
  public async get(options: { datasourceId: number }): Promise<Datasource> {
    return this.api.fetch({
      method: 'GET',
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
  public async getDetails(options: { datasourceId: number }): Promise<DatasourceDetails> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/details`,
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
  public async getNetwork(options: { datasourceId: number }): Promise<Network> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/network`,
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
    } = {}
  ): Promise<List<Datasource>> {
    return this.api.fetch({
      method: 'GET',
      path: 'datasources',
      params: options.params,
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
    } = {}
  ): Promise<List<DatasourceDetails>> {
    return this.api.fetch({
      method: 'GET',
      path: 'datasources/details',
      params: options.params,
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
  public async create(options: { body: DatasourceForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'datasources',
      body: options.body,
    });
  }

  /**
   * Updates an existing datasource.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(options: { datasourceId: number; body: DatasourceForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a datasource.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { datasourceId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `datasources/${options.datasourceId}`,
    });
  }
}
