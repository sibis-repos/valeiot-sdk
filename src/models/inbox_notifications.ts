/**
 * Notification item delivered to a user inbox.
 */
export type InboxNotification = {
  content: Record<any, any>;
  isRead: boolean;
  createdAt: string;
};

/**
 * Payload used to send the same inbox notification to multiple users.
 */
export type UsersInboxNotificationForm = {
  userIds: number[];
  content: Record<any, any>;
};

/**
 * Filters used when listing inbox notifications.
 */
export type InboxNotificationsListFilters = {
  isRead?: boolean;
  startCreatedAt?: Date;
  stopCreatedAt?: Date;
  limit?: number;
  offset?: number;
};

/**
 * Filters used when deleting inbox notifications by creation date window.
 */
export type InboxNotificationDeleteFilters = {
  startCreatedAt: Date;
  stopCreatedAt?: Date;
};

/**
 * Filters used when marking inbox notifications as read or unread by date window.
 */
export type InboxNotificationReadFilters = {
  startCreatedAt: Date;
  stopCreatedAt?: Date;
};
