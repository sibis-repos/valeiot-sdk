import { Actions } from './actions';
import { API, APIOptions } from './api';
import { Buckets } from './buckets';
import { Datasources } from './datasources';
import { Networks } from './networks';
import { Quotas } from './quotas';
import { Scripts } from './scripts';
import { Users } from './users';

export type WorkspaceOptions = {
  session?: string;
  token?: string;
  baseUrl?: string;
};

export class Workspace {
  private api: API;

  public buckets: Buckets;
  public datasources: Datasources;
  public users: Users;
  public actions: Actions;
  public scripts: Scripts;
  public quotas: Quotas;
  public networks: Networks;

  constructor(options: WorkspaceOptions = {}) {
    if (!options.baseUrl) {
      options.baseUrl = process.env.API_BASE_URL;
      if (!options.baseUrl) {
        throw new Error('Missing API_BASE_URL in environment.');
      }
    }

    if (!options.token && !options.session) {
      options.token = process.env.WORKSPACE_TOKEN;
      if (!options.token) {
        throw new Error('Missing WORKSPACE_TOKEN in environment.');
      }
    }

    const apiOptions: APIOptions = {
      baseUrl: options.baseUrl + '/api/v1/workspace',
      headers: {},
    };

    if (options.session) {
      apiOptions.headers['session-id'] = options.session;
    } else {
      apiOptions.headers['Authorization'] = `Bearer ${options.token}`;
    }

    this.api = new API(apiOptions);
    this.buckets = new Buckets(this.api);
    this.datasources = new Datasources(this.api);
    this.users = new Users(this.api);
    this.actions = new Actions(this.api);
    this.scripts = new Scripts(this.api);
    this.quotas = new Quotas(this.api);
    this.networks = new Networks(this.api);
  }
}
