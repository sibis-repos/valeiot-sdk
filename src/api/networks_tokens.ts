import { List } from '../models/list';
import { Token, TokenForm, TokenID } from '../models/tokens';
import { API } from './api';

export class NetworksTokens {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of tokens for a specific network.
   * @param options Request options.
   * @default
   * tokens: [
   *   {
   *     id: 1,
   *     name: "Default",
   *     token: "1234567890abcdef",
   *     permission: "full",
   *     createdAt: Date,
   *     expiresAt: Date | null
   *   }
   * ]
   */
  public async getList(options: { networkId: number }): Promise<List<Token>> {
    return this.api.fetch({
      method: 'GET',
      path: `networks/${options.networkId}/tokens`,
    });
  }

  /**
   * Retrieves a single token for a specific network by tokenId.
   * @param options Request options.
   * @default
   * token: {
   *     id: 1,
   *     name: "Default",
   *     token: "1234567890abcdef",
   *     permission: "full",
   *     createdAt: Date,
   *     expiresAt: Date | null
   *   }
   */
  public async get(options: { networkId: number; tokenId: number }): Promise<Token> {
    return this.api.fetch({
      method: 'GET',
      path: `networks/${options.networkId}/tokens/${options.tokenId}`,
    });
  }

  /**
   * Creates a new token for a specific network.
   * @param options Request options.
   * @default
   * response: {
   *   id: 1
   * }
   */
  public async create(options: { networkId: number; body: TokenForm }): Promise<TokenID> {
    return this.api.fetch({
      method: 'POST',
      path: `networks/${options.networkId}/tokens`,
      body: options.body,
    });
  }

  /**
   * Deletes a token for a specific network.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { networkId: number; tokenId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `networks/${options.networkId}/tokens/${options.tokenId}`,
    });
  }
}
