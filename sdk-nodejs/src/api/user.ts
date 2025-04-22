import { API, APIOptions } from './api';
import { Datasources } from './datasources';
import { Scripts } from './scripts';
import { Users } from './users';

export type UserOptions = {
  session: string;
  baseUrl: string;
};

export class User {
  private api: API;

  public datasources: Datasources;
  public users: Users;
  public scripts: Scripts;

  constructor(options: UserOptions) {
    const apiOptions: APIOptions = {
      baseUrl: options.baseUrl + '/api/v1/user',
      headers: {
        'session-id': options.session,
      },
    };

    this.api = new API(apiOptions);
    this.datasources = new Datasources(this.api);
    this.users = new Users(this.api);
    this.scripts = new Scripts(this.api);
  }
}
