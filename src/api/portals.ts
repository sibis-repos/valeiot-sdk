import { List } from '../models/list';
import { Portal, PortalForm, PortalsListFilters } from '../models/portals';
import { ID } from '../models/common';
import { API } from './api';

export class Portals {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a portal.
   * @param options Request options.
   * @default
   * portal: {
   *  id: 1,
   *  appName: "my-app"
   *  name: "My application",
   *  description: "",
   *  version: "1.0.0",
   *  content: {...}
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { portalId: number }): Promise<Portal> {
    return this.api.fetch({
      method: 'GET',
      path: `portals/${options.portalId}`,
    });
  }

  /**
   * Retrieves a list of portals.
   * @param options Request options.
   * @default
   * portals: [
   *  {
   *   id: 1,
   *   appName: "my-app"
   *   name: "My application",
   *   description: "",
   *   version: "1.0.0",
   *   content: {...}
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: PortalsListFilters;
    } = {}
  ): Promise<List<Portal>> {
    return this.api.fetch({
      method: 'GET',
      path: 'portals',
      params: options.params,
    });
  }

  /**
   * Creates a new portal.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: PortalForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'portals',
      body: options.body,
    });
  }

  /**
   * Updates an existing portal.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(options: { parserId: number; body: PortalForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `portals/${options.parserId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a portal.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { parserId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `portals/${options.parserId}`,
    });
  }
}
