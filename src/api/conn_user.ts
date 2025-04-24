import { RequestModifier } from '../models/common';
import { API, APIOptions } from './api';
import { Datasources } from './datasources';
import { Scripts } from './scripts';
import { Users } from './users';

export type UserConnOptions = {
  session: string;
  baseUrl: string;
  modifiers?: RequestModifier[];
};

export class UserConn {
  private api: API;
  private options: UserConnOptions;

  public datasources: Datasources;
  public users: Users;
  public scripts: Scripts;

  constructor(options: UserConnOptions) {
    this.options = options;

    const modifiers = options.modifiers ?? [];
    const apiOptions: APIOptions = {
      baseUrl: options.baseUrl + '/api/v1/user',
      modifiers: [
        (request) => {
          request.headers = {
            ...request.headers,
            'session-id': this.options.session,
          };
          return request;
        },
        ...modifiers,
      ],
    };

    this.api = new API(apiOptions);
    this.datasources = new Datasources(this.api);
    this.users = new Users(this.api);
    this.scripts = new Scripts(this.api);
  }

  public setSession(session: string) {
    this.options.session = session;
  }
}
