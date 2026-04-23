import { RequestOptions } from '../models/common.js';
import { WorkspaceQuotas, WorkspaceQuotasConsumption } from '../models/quotas.js';
import { API } from './api.js';

/**
 * Workspace API wrapper for quota and consumption information.
 */
export class Quotas {
  private api: API;

  /**
   * Creates a quotas client.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves the workspace quotas configuration.
   * @default
   * object: {
   *  plan: "free",
   *  planQuotas: { users: 10 },
   *  addonsQuotas: { users: 5 },
   * }
   */
  public async get(options: RequestOptions = {}): Promise<WorkspaceQuotas> {
    return this.api.fetch({
      method: 'GET',
      path: 'quotas',
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves the workspace quotas consumption.
   * @default
   * object: {
   *  static: { users: 7 },
   *  monthly: { datasources-datapoints-input: 20000 },
   * }
   */
  public async getConsumption(options: RequestOptions = {}): Promise<WorkspaceQuotasConsumption> {
    return this.api.fetch({
      method: 'GET',
      path: 'quotas/consumption',
      modifier: options.modifier,
    });
  }
}
