import { RequestModifier } from '../models/common';
import { Actions } from './actions';
import { API, APIOptions } from './api';
import { Buckets } from './buckets';
import { Dashboards } from './dashboards';
import { Datasources } from './datasources';
import { Drive } from './drive';
import { Networks } from './networks';
import { Notifications } from './notifications';
import { PayloadParsers } from './payload_parsers';
import { Portals } from './portals';
import { PublicPayloadParsers } from './public_payload_parsers';
import { Quotas } from './quotas';
import { Scripts } from './scripts';
import { Users } from './users';

export type WorkspaceConnOptions = {
  session?: string;
  token?: string;
  baseUrl?: string;
  modifiers?: RequestModifier[];
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
      baseUrl: options.baseUrl + '/api/v1/workspace',
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
  }

  public setSession(session: string) {
    this.options.session = session;
  }

  public setToken(token: string) {
    this.options.token = token;
  }
}
