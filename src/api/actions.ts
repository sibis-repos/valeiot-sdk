import { Action, ActionDetails, ActionForm, ActionsListFilters } from '../models/actions.js';
import { List } from '../models/list.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';

/**
 * Workspace API wrapper for Valeiot actions.
 */
export class Actions {
  private api: API;

  /**
   * Creates an actions client.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a single action by id.
   * @param options Request options.
   */
  public async get(options: { actionId: number } & RequestOptions): Promise<Action> {
    return this.api.fetch({
      method: 'GET',
      path: `actions/${options.actionId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of actions.
   * @param options Request options.
   */
  public async getList(
    options: { params?: ActionsListFilters } & RequestOptions = {}
  ): Promise<List<Action>> {
    return this.api.fetch({
      method: 'GET',
      path: 'actions',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves an expanded list of actions including operational fields.
   * @param options Request options.
   */
  public async getDetailsList(
    options: { params?: ActionsListFilters } & RequestOptions = {}
  ): Promise<List<ActionDetails>> {
    return this.api.fetch({
      method: 'GET',
      path: 'actions/details',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new action.
   * @param options Request options.
   */
  public async create(options: { body: ActionForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'actions',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing action.
   * @param options Request options.
   */
  public async update(
    options: { actionId: number; body: ActionForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `actions/${options.actionId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes an action.
   * @param options Request options.
   */
  public async delete(options: { actionId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `actions/${options.actionId}`,
      modifier: options.modifier,
    });
  }
}
