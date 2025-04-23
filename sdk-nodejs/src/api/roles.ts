import { Role, RoleForm, RolesListFilters } from '../models/roles';
import { List } from '../models/list';
import { ID } from '../types';
import { API } from './api';

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
   *  name: "My role",
   *  description: "",
   *  permissions: {...},
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { dashboarId: number }): Promise<Role> {
    return this.api.fetch({
      method: 'GET',
      path: `roles/${options.dashboarId}`,
    });
  }

  /**
   * Retrieves a list of roles.
   * @param options Request options.
   * @default
   * roles: [
   *  {
   *   id: 1,
   *   name: "My role",
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
    } = {}
  ): Promise<List<Role>> {
    return this.api.fetch({
      method: 'GET',
      path: 'roles',
      params: options.params,
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
  public async create(options: { body: RoleForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'roles',
      body: options.body,
    });
  }

  /**
   * Updates an existing role.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(options: { parserId: number; body: RoleForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `roles/${options.parserId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a role.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { parserId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `roles/${options.parserId}`,
    });
  }
}
