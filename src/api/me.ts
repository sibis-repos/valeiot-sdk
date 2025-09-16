import { User, UserDetails, UserSelfUpdateForm, UserSelfUpdatePasswordForm } from '../models/users.js';
import { API } from './api.js';

export class UserMe {
    private api: API;

    constructor(api: API) {
        this.api = api;
    }

    /**
      * Retrieves information of the current user.
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
    public async get(): Promise<User> {
        return await this.api.fetch({
            method: 'GET',
            path: ''
        })
    }


    /**
      * Retrieves information of the current user with details.
      * @default
      * Response: {
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
    public async getDetails(): Promise<UserDetails> {
        return await this.api.fetch({
            method: "GET",
            path: "details"
        })
    }

    public async update(options: { body: UserSelfUpdateForm }): Promise<null> {
        return await this.api.fetch({
            method: "PUT",
            path: "",
            body: options.body
        })
    }

    public async updatePassword(options: { body: UserSelfUpdatePasswordForm }): Promise<null> {
        return await this.api.fetch({
            method: "PUT",
            path: "password",
            body: options.body
        })
    }

    public async delete(): Promise<null> {
        return this.api.fetch({
            method: "DELETE",
            path: ""
        })
    }
}
