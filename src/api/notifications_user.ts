import { API } from './api.js';
import { UserInboxNotifications } from './inbox_notificationts_user.js';

export class UserNotifications {
  private api: API;

  public inbox: UserInboxNotifications;

  constructor(api: API) {
    this.api = api;
    this.inbox = new UserInboxNotifications(this.api);
  }
}
