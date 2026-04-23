import { API } from './api.js';
import { UserInboxNotifications } from './inbox_notificationts_user.js';

/**
 * Aggregated user-scoped API wrapper for notification resources.
 */
export class UserNotifications {
  private api: API;

  public inbox: UserInboxNotifications;

  /**
   * Creates a user notifications client and wires inbox notifications.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
    this.inbox = new UserInboxNotifications(this.api);
  }
}
