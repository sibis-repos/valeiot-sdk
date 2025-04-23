import { List } from '../models/list';
import { Token, TokenForm, TokenID } from '../models/token';
import { API } from './api';

export class DatasourcesTokens {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of tokens for a specific datasource.
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
  public async getList(options: { datasourceId: number }): Promise<List<Token>> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/tokens`,
    });
  }

  /**
   * Retrieves a single token for a specific datasource by tokenId.
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
  public async get(options: { datasourceId: number; tokenId: number }): Promise<Token> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/tokens/${options.tokenId}`,
    });
  }

  /**
   * Creates a new token for a specific datasource.
   * @param options Request options.
   * @default
   * response: {
   *   id: 1
   * }
   */
  public async create(options: { datasourceId: number; body: TokenForm }): Promise<TokenID> {
    return this.api.fetch({
      method: 'POST',
      path: `datasources/${options.datasourceId}/tokens`,
      body: options.body,
    });
  }

  /**
   * Deletes a token for a specific datasource.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { datasourceId: number; tokenId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `datasources/${options.datasourceId}/tokens/${options.tokenId}`,
    });
  }
}
