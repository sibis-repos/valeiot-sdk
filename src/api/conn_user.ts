import { RequestModifier, RequestPosProcessor } from '../models/common.js';
import { TokenID } from '../models/tokens.js';
import { User } from '../models/users.js';
import { API, APIOptions } from './api.js';
import { Datasources } from './datasources.js';
import { UserInboxNotifications } from './inbox_notificationts_user.js';
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
  public notifications: UserInboxNotifications;

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
    this.notifications = new UserInboxNotifications(this.api);
  }

  public setSession(session: string) {
    this.options.session = session;
  }

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

  public async me(): Promise<User> {
    return await this.api.fetch({
      method: 'GET',
      path: ''
    })
  }
}
