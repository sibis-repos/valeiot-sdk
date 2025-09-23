import { List } from '../models/list.js';
import { Portal, PortalDetails, PortalForm, PortalsListFilters } from '../models/portals.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';

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
   *  themeId: 1,
   *  description: "",
   *  version: "1.0.0",
   *  content: {...}
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { portalId: number } & RequestOptions): Promise<Portal> {
    return this.api.fetch({
      method: 'GET',
      path: `portals/${options.portalId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a portal.
   * @param options Request options.
   * @default
   * portal: {
   *  id: 1,
   *  appName: "my-app"
   *  name: "My application",
   *  themeId: 1,
   *  description: "",
   *  version: "1.0.0",
   *  content: {...}
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async getDetails(options: { portalId: number } & RequestOptions): Promise<PortalDetails> {
    return this.api.fetch({
      method: 'GET',
      path: `portals/${options.portalId}/details`,
      modifier: options.modifier,
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
   *   themeId: 1,
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
    } & RequestOptions = {}
  ): Promise<List<Portal>> {
    return this.api.fetch({
      method: 'GET',
      path: 'portals',
      params: options.params,
      modifier: options.modifier,
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
   *   theme: {...},
   *   description: "",
   *   version: "1.0.0",
   *   content: {...}
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getDetailsList(
    options: {
      params?: PortalsListFilters;
    } & RequestOptions = {}
  ): Promise<List<PortalDetails>> {
    return this.api.fetch({
      method: 'GET',
      path: 'portals/details',
      params: options.params,
      modifier: options.modifier,
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
  public async create(options: { body: PortalForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'portals',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing portal.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { portalId: number; body: PortalForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `portals/${options.portalId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a portal.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { portalId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `portals/${options.portalId}`,
      modifier: options.modifier,
    });
  }
}
