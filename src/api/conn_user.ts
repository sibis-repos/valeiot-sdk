import { RequestModifier, RequestPosProcessor } from '../models/common.js';
import { API, APIOptions } from './api.js';
import { Datasources } from './datasources.js';
import { Scripts } from './scripts.js';
import { Users } from './users.js';

export type UserConnOptions = {
  session: string;
  baseUrl: string;
  modifiers?: RequestModifier[];
  postProcessor?: RequestPosProcessor;
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
      posProcessor: options.postProcessor,
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
