import { Theme, ThemeForm, ThemesListFilters } from '../models/themes.js';
import { List } from '../models/list.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';

/**
 * Workspace API wrapper for Valeiot themes.
 */
export class Themes {
  private api: API;

  /**
   * Creates a themes client.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a theme.
   * @param options Request options.
   * @default
   * theme: {
   *  id: 1,
   *  name: "My theme",
   *  description: "",
   *  version: "1.0.0",
   *  content: {...},
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { themeId: number } & RequestOptions): Promise<Theme> {
    return this.api.fetch({
      method: 'GET',
      path: `themes/${options.themeId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of themes.
   * @param options Request options.
   * @default
   * themes: [
   *  {
   *   id: 1,
   *   name: "My theme",
   *   description: "",
   *   version: "1.0.0",
   *   content: null,
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: ThemesListFilters;
    } & RequestOptions = {}
  ): Promise<List<Theme>> {
    return this.api.fetch({
      method: 'GET',
      path: 'themes',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new theme.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: ThemeForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'themes',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing theme.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { themeId: number; body: ThemeForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `themes/${options.themeId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a theme.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { themeId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `themes/${options.themeId}`,
      modifier: options.modifier,
    });
  }
}
