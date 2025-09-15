export type InboxNotification = {
  content: Record<any, any>;
  isRead: boolean;
  createdAt: Date;
};

export type UsersInboxNotificationForm = {
  userIds: number[];
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



export type InboxNotificationReadFilters = {
  startCreatedAt: Date;
  stopCreatedAt?: Date;
};
