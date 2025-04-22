import { Action, ActionForm, ActionsListFilters } from '../models/actions';
import { List } from '../models/list';
import { ID } from '../types';
import { API } from './api';

export class Actions {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async get(options: { actionId: number }): Promise<Action> {
    return this.api.fetch({
      method: 'GET',
      path: `actions/${options.actionId}`,
    });
  }

  public async getList(options: { params?: ActionsListFilters } = {}): Promise<List<Action>> {
    return this.api.fetch({
      method: 'GET',
      path: 'actions',
      params: options.params,
    });
  }

  public async create(options: { body: ActionForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'actions',
      body: options.body,
    });
  }

  public async update(options: { actionId: number; body: ActionForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `actions/${options.actionId}`,
      body: options.body,
    });
  }

  public async delete(options: { actionId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `actions/${options.actionId}`,
    });
  }
}
