import { RequestOptions } from '../models/common.js';
import {
  InboxNotification,
  InboxNotificationDeleteFilters,
  InboxNotificationReadFilters,
  InboxNotificationsListFilters,
} from '../models/inbox_notifications.js';
import { List } from '../models/list.js';
import { API } from './api.js';

export class UserInboxNotifications {
  private api: API;

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
    options: ({
      params?: InboxNotificationsListFilters;
    } & RequestOptions) = {}
  ): Promise<List<InboxNotification>> {
    return this.api.fetch({
      method: 'GET',
      path: `notifications/inbox`,
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Marks a notification as read.
   * @param options Request options.
   * @default
   * response: null
   */
  public async read(
    options: { params: InboxNotificationReadFilters } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'POST',
      path: 'notifications/inbox/read',
      params: options.params,
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
      params: InboxNotificationDeleteFilters;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `notifications/inbox`,
      params: options.params,
      modifier: options.modifier,
    });
  }
}
