import { List } from '../models/list.js';
import { TokenID } from '../models/tokens.js';
import { User, UserDetails, UserForm, UserUpdatePasswordForm, UsersListFilters } from '../models/users.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';
import { UserTags } from './users_tags.js';

export class Users {
  private api: API;

  public tags: UserTags;

  constructor(api: API) {
    this.api = api;
    this.tags = new UserTags(api);
  }

  /**
   * Retrieves a specific user by userId.
   * @param options Request options containing the userId.
   * @default
   * user: {
   *   id: 1,
   *   roleId: 2,
   *   name: "John Doe",
   *   email: "john.doe@example.com",
   *   createdAt: "2021-01-01T00:00:00Z",
   *   updatedAt: "2021-01-01T00:00:00Z"
   * }
   */
  public async get(options: { userId: number } & RequestOptions): Promise<User> {
    return this.api.fetch({
      method: 'GET',
      path: `users/${options.userId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves detailed information of a specific user by userId.
   * @param options Request options containing the userId.
   * @default
   * userDetails: {
   *   id: 1,
   *   role: { id: 2, name: "Admin" },
   *   tags: [
   *     { id: 1, key: "Location", value: "NYC" },
   *     { id: 2, key: "Status", value: "Active" }
   *   ],
   *   name: "John Doe",
   *   email: "john.doe@example.com",
   *   createdAt: "2021-01-01T00:00:00Z",
   *   updatedAt: "2021-01-01T00:00:00Z"
   * }
   */
  public async getDetails(options: { userId: number } & RequestOptions): Promise<UserDetails> {
    return this.api.fetch({
      method: 'GET',
      path: `users/${options.userId}/details`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of users based on filtering options.
   * @param options Request options with optional filters, including pagination and ordering.
   * @default
   * users: [
   *   {
   *     id: 1,
   *     roleId: 2,
   *     name: "John Doe",
   *     email: "john.doe@example.com",
   *     createdAt: "2021-01-01T00:00:00Z",
   *     updatedAt: "2021-01-01T00:00:00Z"
   *   },
   *   {
   *     id: 2,
   *     roleId: 3,
   *     name: "Jane Smith",
   *     email: "jane.smith@example.com",
   *     createdAt: "2021-02-01T00:00:00Z",
   *     updatedAt: "2021-02-01T00:00:00Z"
   *   }
   * ]
   */
  public async getList(
    options: {
      params?: UsersListFilters;
    } & RequestOptions = {}
  ): Promise<List<User>> {
    return this.api.fetch({
      method: 'GET',
      path: 'users',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of user details based on filtering options.
   * @param options Request options with optional filters, including pagination and ordering.
   * @default
   * userDetails: [
   *   {
   *     id: 1,
   *     role: { id: 2, name: "Admin" },
   *     tags: [
   *       { id: 1, key: "Location", value: "NYC" },
   *       { id: 2, key: "Status", value: "Active" }
   *     ],
   *     name: "John Doe",
   *     email: "john.doe@example.com",
   *     createdAt: "2021-01-01T00:00:00Z",
   *     updatedAt: "2021-01-01T00:00:00Z"
   *   },
   *   {
   *     id: 2,
   *     role: { id: 3, name: "User" },
   *     tags: [{ id: 3, key: "Status", value: "Inactive" }],
   *     name: "Jane Smith",
   *     email: "jane.smith@example.com",
   *     createdAt: "2021-02-01T00:00:00Z",
   *     updatedAt: "2021-02-01T00:00:00Z"
   *   }
   * ]
   */
  public async getDetailsList(
    options: {
      params?: UsersListFilters;
    } & RequestOptions = {}
  ): Promise<List<UserDetails>> {
    return this.api.fetch({
      method: 'GET',
      path: 'users/details',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new user.
   * @param options Request options containing user data.
   * @default
   * response: {
   *   id: 1
   * }
   */
  public async create(options: { body: UserForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'users',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing user by userId.
   * @param options Request options containing userId and updated user data.
   * @default
   * response: null
   */
  public async update(options: { userId: number; body: UserForm } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `users/${options.userId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a user by userId.
   * @param options Request options containing userId.
   * @default
   * response: null
   */
  public async delete(options: { userId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `users/${options.userId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Updates a user's password (workspace admin). Route: PUT /workspace/users/:userId/password.
   * @param options Request options with userId and body { password }.
   * @default response: null
   */
  public async updatePassword(
    options: { userId: number; body: UserUpdatePasswordForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `users/${options.userId}/password`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a new user session.
   * @param options Request options containing userId.
   * @default
   * id: {
   *  id: 1,
   *  token: "abcdef123456"
   * }
   */
  public async login(options: { userId: number } & RequestOptions): Promise<TokenID> {
    return this.api.fetch({
      method: 'POST',
      path: `users/${options.userId}/login`,
      modifier: options.modifier,
    });
  }
}
