import { API } from './api.js';
import { InboxNotifications } from './inbox_notificationts.js';

/**
 * Aggregated workspace API wrapper for notification resources.
 */
export class Notifications {
  private api: API;

  public inbox: InboxNotifications;

  /**
   * Creates a notifications client and wires inbox notifications.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
    this.inbox = new InboxNotifications(this.api);
  }
}
