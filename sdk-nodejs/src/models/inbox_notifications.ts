export type InboxNotification = {
  content: Record<any, any>;
  isRead: boolean;
  createdAt: Date;
};

export type UsersInboxNotificationForm = {
  usersIds: number[];
  content: Record<any, any>;
};

export type InboxNotificationsListFilters = {
  isRead?: boolean;
  startCreatedAt?: Date;
  stopCreatedAt?: Date;
  limit?: number;
  offset?: number;
};

export type InboxNotificationDeleteFilters = {
  startCreatedAt: Date;
  stopCreatedAt?: Date;
};
