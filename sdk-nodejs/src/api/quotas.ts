import { WorkspaceQuotas, WorkspaceQuotasConsumption } from '../models/quotas';
import { API } from './api';

export class Quotas {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async get(): Promise<WorkspaceQuotas> {
    return this.api.fetch({
      method: 'GET',
      path: 'quotas',
    });
  }

  public async getConsumption(): Promise<WorkspaceQuotasConsumption> {
    return this.api.fetch({
      method: 'GET',
      path: 'quotas/consumption',
    });
  }
}
