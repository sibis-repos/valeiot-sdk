import { List } from '../models/list.js';
import { Network, NetworkForm, NetworkListFilters } from '../models/networks.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';
import { NetworksTokens } from './networks_tokens.js';

export class Networks {
  private api: API;

  public tokens: NetworksTokens;

  constructor(api: API) {
    this.api = api;
    this.tokens = new NetworksTokens(this.api);
  }

  /**
   * Retrieves a network.
   * @param options Request options.
   * @default
   * network: {
   *  id: 1,
   *  createdAt: Date,
   *  updatedAt: Date,
   *  name: "My network",
   *  type: "custom",
   *  description: ""
   * }
   */
  public async get(options: { networkId: number } & RequestOptions): Promise<Network> {
    return this.api.fetch({
      method: 'GET',
      path: `networks/${options.networkId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of networks.
   * @param options Request options.
   * @default
   * networks: [
   *  {
   *    id: 1,
   *    createdAt: Date,
   *    updatedAt: Date,
   *    name: "My network",
   *    type: "custom",
   *    description: ""
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: NetworkListFilters;
    } & RequestOptions = {}
  ): Promise<List<Network>> {
    return this.api.fetch({
      method: 'GET',
      path: 'networks',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new network.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: NetworkForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'networks',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing network.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { networkId: number; body: NetworkForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `networks/${options.networkId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a network.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { networkId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `networks/${options.networkId}`,
      modifier: options.modifier,
    });
  }
}
