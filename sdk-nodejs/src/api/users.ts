import { User, UserDetails, UserForm, UsersListFilters } from "../models/users";
import { ID } from "../types";
import { API } from "./api";
import { UserTags } from "./users_tags";

export class Users {
  private api: API;

  public tags: UserTags;

  constructor(api: API) {
    this.api = api;
    this.tags = new UserTags(api);
  }

  public async get(options: { userId: number }): Promise<User> {
    return this.api.fetch({
      method: "GET",
      path: `users/${options.userId}`,
    });
  }

  public async getDetails(options: { userId: number }): Promise<UserDetails> {
    return this.api.fetch({
      method: "GET",
      path: `users/${options.userId}/details`,
    });
  }

  public async getList(
    options: {
      params?: UsersListFilters;
    } = {}
  ): Promise<User[]> {
    return this.api.fetch({
      method: "GET",
      path: "users",
      params: options.params,
    });
  }

  public async getDetailsList(
    options: {
      params?: UsersListFilters;
    } = {}
  ): Promise<UserDetails[]> {
    return this.api.fetch({
      method: "GET",
      path: "users/details",
      params: options.params,
    });
  }

  public async create(options: { body: UserForm }): Promise<ID> {
    return this.api.fetch({
      method: "POST",
      path: "users",
      body: options.body,
    });
  }

  public async update(options: {
    userId: number;
    body: UserForm;
  }): Promise<null> {
    return this.api.fetch({
      method: "PUT",
      path: `users/${options.userId}`,
      body: options.body,
    });
  }

  public async delete(options: { userId: number }): Promise<null> {
    return this.api.fetch({
      method: "DELETE",
      path: `users/${options.userId}`,
    });
  }
}
