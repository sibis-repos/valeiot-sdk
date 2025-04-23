import {
  InboxNotification,
  InboxNotificationDeleteFilters,
  InboxNotificationsListFilters,
  UsersInboxNotificationForm,
} from '../models/inbox_notifications';
import { List } from '../models/list';
import { API } from './api';

export class InboxNotifications {
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
  public async getList(options: {
    userId: number;
    params?: InboxNotificationsListFilters;
  }): Promise<List<InboxNotification>> {
    return this.api.fetch({
      method: 'GET',
      path: `notifications/inbox/users/${options.userId}`,
      params: options.params,
    });
  }

  /**
   * Creates a new inbox notification.
   * @param options Request options.
   * @default
   * response: null
   */
  public async create(options: { body: UsersInboxNotificationForm }): Promise<null> {
    return this.api.fetch({
      method: 'POST',
      path: 'notifications/inbox',
      body: options.body,
    });
  }

  /**
   * Deletes inbox notifications.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: {
    userId: number;
    params: InboxNotificationDeleteFilters;
  }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `notifications/inbox/users/${options.userId}`,
      params: options.params,
    });
  }
}
