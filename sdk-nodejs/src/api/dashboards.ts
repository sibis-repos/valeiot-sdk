import { Dashboard, DashboardForm, DashboardsListFilters } from '../models/dashboards';
import { List } from '../models/list';
import { ID } from '../types';
import { API } from './api';
import { DashboardTags } from './dashboards_tags';

export class Dashboards {
  private api: API;

  public tags: DashboardTags;

  constructor(api: API) {
    this.api = api;
    this.tags = new DashboardTags(this.api);
  }

  /**
   * Retrieves a dashboard.
   * @param options Request options.
   * @default
   * dashboard: {
   *  id: 1,
   *  name: "My dashboard",
   *  description: "",
   *  version: "1.0.0",
   *  content: {...},
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { dashboarId: number }): Promise<Dashboard> {
    return this.api.fetch({
      method: 'GET',
      path: `dashboards/${options.dashboarId}`,
    });
  }

  /**
   * Retrieves a list of dashboards.
   * @param options Request options.
   * @default
   * dashboards: [
   *  {
   *   id: 1,
   *   name: "My dashboard",
   *   description: "",
   *   version: "1.0.0",
   *   content: {...},
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: DashboardsListFilters;
    } = {}
  ): Promise<List<Dashboard>> {
    return this.api.fetch({
      method: 'GET',
      path: 'dashboards',
      params: options.params,
    });
  }

  /**
   * Creates a new dashboard.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: DashboardForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'dashboards',
      body: options.body,
    });
  }

  /**
   * Updates an existing dashboard.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(options: { parserId: number; body: DashboardForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `dashboards/${options.parserId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a dashboard.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { parserId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `dashboards/${options.parserId}`,
    });
  }
}
