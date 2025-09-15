import { RequestModifier, RequestPosProcessor } from '../models/common.js';
import { TokenID } from '../models/tokens.js';
import { User } from '../models/users.js';
import { API, APIOptions } from './api.js';
import { Datasources } from './datasources.js';
import { UserNotifications } from './notifications_user.js';
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
  public notifications: UserNotifications;

  constructor(options: UserConnOptions) {
    this.options = options;

    const modifiers = options.modifiers ?? [];
    const apiOptions: APIOptions = {
      baseUrl: options.baseUrl + '/user',
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
    this.notifications = new UserNotifications(this.api);
  }

  public setSession(session: string) {
    this.options.session = session;
  }


  /**
   * Make login into an user account.
   * If succeeded, user session is automatically
   * setted in connection.
   * @param options Request options.
   * @default
   * Response: {
   *  token: "us1:398127493bfdsbfsda",
   *  id: 1
   * }
   */
  public async login(options: { workspaceId: number, email: string, password: string }): Promise<TokenID> {
    const res = await this.api.fetch<TokenID>({
      method: 'POST',
      path: 'login',
      body: options,
      ignorePostProcessor: true
    });
    this.setSession(res.token)

    return res;
  }

  /**
   * Retrieves information of the current user.
   * @default
   * Response: {
   *  id: 1;
   *  roleId: 1;
   *  createdAt: Date;
   *  updatedAt: Date;
   *  name: "Michael";
   *  email: "user@company.com";
   * }
   */
  public async me(): Promise<User> {
    return await this.api.fetch({
      method: 'GET',
      path: ''
    })
  }
}
