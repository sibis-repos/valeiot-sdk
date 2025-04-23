import { List } from '../models/list';
import { Network, NetworkForm, NetworkListFilters } from '../models/networks';
import { ID } from '../types';
import { API } from './api';
import { NetworksTokens } from './networks_tokens';

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
  public async get(options: { networkId: number }): Promise<Network> {
    return this.api.fetch({
      method: 'GET',
      path: `networks/${options.networkId}`,
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
    } = {}
  ): Promise<List<Network>> {
    return this.api.fetch({
      method: 'GET',
      path: 'networks',
      params: options.params,
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
  public async create(options: { body: NetworkForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'networks',
      body: options.body,
    });
  }

  /**
   * Updates an existing network.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(options: { networkId: number; body: NetworkForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `networks/${options.networkId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a network.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { networkId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `networks/${options.networkId}`,
    });
  }
}
