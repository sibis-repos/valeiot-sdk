import { RequestModifier, RequestPosProcessor } from '../models/common.js';
import { Actions } from './actions.js';
import { API, APIOptions } from './api.js';
import { Buckets } from './buckets.js';
import { Dashboards } from './dashboards.js';
import { Datasources } from './datasources.js';
import { Drive } from './drive.js';
import { Networks } from './networks.js';
import { Notifications } from './notifications.js';
import { PayloadParsers } from './payload_parsers.js';
import { Portals } from './portals.js';
import { PublicPayloadParsers } from './public_payload_parsers.js';
import { Quotas } from './quotas.js';
import { Roles } from './roles.js';
import { Scripts } from './scripts.js';
import { Themes } from './themes.js';
import { Users } from './users.js';

export type WorkspaceConnOptions = {
  session?: string;
  token?: string;
  baseUrl?: string;
  modifiers?: RequestModifier[];
  postProcessor?: RequestPosProcessor;
};

export class WorkspaceConn {
  private api: API;
  private options: WorkspaceConnOptions;

  public buckets: Buckets;
  public datasources: Datasources;
  public users: Users;
  public actions: Actions;
  public scripts: Scripts;
  public quotas: Quotas;
  public networks: Networks;
  public payloadParsers: PayloadParsers;
  public publicPayloadParsers: PublicPayloadParsers;
  public portals: Portals;
  public dashboards: Dashboards;
  public notifications: Notifications;
  public drive: Drive;
  public roles: Roles;
  public themes: Themes;

  constructor(options: WorkspaceConnOptions = {}) {
    this.options = options;

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

    const modifiers = options.modifiers ?? [];
    const apiOptions: APIOptions = {
      baseUrl: options.baseUrl + '/workspace',
      posProcessor: options.postProcessor,
      modifiers: [
        (request) => {
          const authHeaders: HeadersInit = {};
          if (this.options.session) {
            authHeaders['session-id'] = this.options.session;
          } else {
            authHeaders['Authorization'] = `Bearer ${this.options.token}`;
          }

          request.headers = {
            ...request.headers,
            ...authHeaders,
          };
          return request;
        },
        ...modifiers,
      ],
    };

    this.api = new API(apiOptions);
    this.buckets = new Buckets(this.api);
    this.datasources = new Datasources(this.api);
    this.users = new Users(this.api);
    this.actions = new Actions(this.api);
    this.scripts = new Scripts(this.api);
    this.quotas = new Quotas(this.api);
    this.networks = new Networks(this.api);
    this.payloadParsers = new PayloadParsers(this.api);
    this.publicPayloadParsers = new PublicPayloadParsers(this.api);
    this.portals = new Portals(this.api);
    this.dashboards = new Dashboards(this.api);
    this.notifications = new Notifications(this.api);
    this.drive = new Drive(this.api);
    this.roles = new Roles(this.api);
    this.themes = new Themes(this.api);
  }

  public setSession(session: string) {
    this.options.session = session;
  }

  public setToken(token: string) {
    this.options.token = token;
  }
}
