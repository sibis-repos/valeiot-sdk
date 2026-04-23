import { Dashboard, DashboardForm, DashboardsListFilters } from '../models/dashboards.js';
import { List } from '../models/list.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';
import { DashboardTags } from './dashboards_tags.js';

/**
 * Workspace API wrapper for Valeiot dashboards.
 */
export class Dashboards {
  private api: API;

  public tags: DashboardTags;

  /**
   * Creates a dashboards client and wires the nested tags resource.
   *
   * @param api Shared API transport.
   */
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
  public async get(options: { dashboardId: number } & RequestOptions): Promise<Dashboard> {
    return this.api.fetch({
      method: 'GET',
      path: `dashboards/${options.dashboardId}`,
      modifier: options.modifier,
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
    } & RequestOptions = {}
  ): Promise<List<Dashboard>> {
    return this.api.fetch({
      method: 'GET',
      path: 'dashboards',
      params: options.params,
      modifier: options.modifier,
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
  public async create(options: { body: DashboardForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'dashboards',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing dashboard.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { dashboardId: number; body: DashboardForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `dashboards/${options.dashboardId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a dashboard.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { dashboardId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `dashboards/${options.dashboardId}`,
      modifier: options.modifier,
    });
  }
}
