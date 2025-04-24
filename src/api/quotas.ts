import { RequestOptions } from '../models/common';
import { WorkspaceQuotas, WorkspaceQuotasConsumption } from '../models/quotas';
import { API } from './api';

export class Quotas {
  private api: API;

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
