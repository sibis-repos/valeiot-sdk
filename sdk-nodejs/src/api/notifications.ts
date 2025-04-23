import { API } from './api';
import { InboxNotifications } from './inbox_notificationts';

export class Notifications {
  private api: API;

  public inbox: InboxNotifications;

  constructor(api: API) {
    this.api = api;
    this.inbox = new InboxNotifications(this.api);
  }
}
