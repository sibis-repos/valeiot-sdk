import { API } from './api.js';
import { InboxNotifications } from './inbox_notificationts.js';

export class Notifications {
  private api: API;

  public inbox: InboxNotifications;

  constructor(api: API) {
    this.api = api;
    this.inbox = new InboxNotifications(this.api);
  }
}
