import { List } from '../models/list';
import { Tag } from '../models/tags';
import { ID, RawTag, TagForm } from '../types';
import { API } from './api';

export class DashboardTags {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of tags for a specific dashboard.
   * @param options Request options containing the dashboardId.
   * @default
   * tags: [
   *   {
   *     id: 1,
   *     key: "Environment",
   *     value: "Production"
   *   },
   *   {
   *     id: 2,
   *     key: "Region",
   *     value: "US-East"
   *   }
   * ]
   */
  public async getList(options: { dashboardId: number }): Promise<List<Tag>> {
    return this.api.fetch({
      method: 'GET',
      path: `dashboards/${options.dashboardId}/tags`,
    });
  }

  /**
   * Retrieves a single tag for a specific dashboard by tagId.
   * @param options Request options containing the dashboardId and tagId.
   * @default
   * tag: {
   *   id: 1,
   *   key: "Environment",
   *   value: "Production"
   * }
   */
  public async get(options: { dashboardId: number; tagId: number }): Promise<Tag> {
    return this.api.fetch({
      method: 'GET',
      path: `dashboards/${options.dashboardId}/tags/${options.tagId}`,
    });
  }

  /**
   * Creates a new tag for a specific dashboard.
   * @param options Request options containing the dashboardId and tag data.
   * @default
   * response: {
   *   id: 3
   * }
   */
  public async create(options: { dashboardId: number; body: RawTag }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: `dashboards/${options.dashboardId}/tags`,
      body: options.body,
    });
  }

  /**
   * Updates an existing tag for a specific dashboard.
   * @param options Request options containing the dashboardId, tagId, and updated tag data.
   * @default
   * response: null
   */
  public async update(options: {
    dashboardId: number;
    tagId: number;
    body: TagForm;
  }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `dashboards/${options.dashboardId}/tags/${options.tagId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a tag for a specific dashboard.
   * @param options Request options containing the dashboardId and tagId.
   * @default
   * response: null
   */
  public async delete(options: { dashboardId: number; tagId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `dashboards/${options.dashboardId}/tags/${options.tagId}`,
    });
  }

  /**
   * Sets multiple tags for a specific dashboard, replacing the existing tags.
   * @param options Request options containing the dashboardId and tags data.
   * @default
   * response: null
   */
  public async set(options: { dashboardId: number; body: { tags: RawTag[] } }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `dashboards/${options.dashboardId}/tags`,
      body: options.body,
    });
  }

  /**
   * Creates or replaces multiple tags for a specific dashboard.
   * @param options Request options containing the dashboardId and tags data.
   * @default
   * response: null
   */
  public async createOrReplace(options: {
    dashboardId: number;
    body: { tags: RawTag[] };
  }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `dashboards/${options.dashboardId}/tags/replace`,
      body: options.body,
    });
  }
}
