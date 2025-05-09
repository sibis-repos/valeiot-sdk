import { List } from '../models/list.js';
import { Role, RoleForm, RolesListFilters } from '../models/roles.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';

export class Roles {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a role.
   * @param options Request options.
   * @default
   * role: {
   *  id: 1,
   *  name: "My application",
   *  description: "",
   *  permissions: {...},
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { roleId: number } & RequestOptions): Promise<Role> {
    return this.api.fetch({
      method: 'GET',
      path: `roles/${options.roleId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of roles.
   * @param options Request options.
   * @default
   * roles: [
   *  {
   *   id: 1,
   *   name: "My application",
   *   description: "",
   *   permissions: {...},
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: RolesListFilters;
    } & RequestOptions = {}
  ): Promise<List<Role>> {
    return this.api.fetch({
      method: 'GET',
      path: 'roles',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new role.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: RoleForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'roles',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing role.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { roleId: number; body: RoleForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `roles/${options.roleId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a role.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { roleId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `roles/${options.roleId}`,
      modifier: options.modifier,
    });
  }
}
