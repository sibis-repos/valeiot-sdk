import { RequestOptions } from '../models/common.js';
import {
  InboxNotification,
  InboxNotificationDeleteFilters,
  InboxNotificationsListFilters,
  UsersInboxNotificationForm,
} from '../models/inbox_notifications.js';
import { List } from '../models/list.js';
import { API } from './api.js';

/**
 * Workspace API wrapper for inbox notification management.
 */
export class InboxNotifications {
  private api: API;

  /**
   * Creates an inbox notifications client.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of inbox notifications.
   * @param options Request options.
   * @default
   * inbox notifications: [
   *  {
   *   id: 1,
   *   appName: "my-app"
   *   name: "My application",
   *   description: "",
   *   version: "1.0.0",
   *   content: {...}
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getList(
    options: {
      userId: number;
      params?: InboxNotificationsListFilters;
    } & RequestOptions
  ): Promise<List<InboxNotification>> {
    return this.api.fetch({
      method: 'GET',
      path: `notifications/inbox/users/${options.userId}`,
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new inbox notification.
   * @param options Request options.
   * @default
   * response: null
   */
  public async create(
    options: { body: UsersInboxNotificationForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'POST',
      path: 'notifications/inbox',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes inbox notifications.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(
    options: {
      userId: number;
      params: InboxNotificationDeleteFilters;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `notifications/inbox/users/${options.userId}`,
      params: options.params,
      modifier: options.modifier,
    });
  }
}
