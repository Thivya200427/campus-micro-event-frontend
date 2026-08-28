import { getLoggedInUser } from "./authStore";

const STORAGE_KEY = "campus_notifications";

/*
 * Get all notifications
 * Used by the system internally.
 */
export function getNotifications() {
  try {
    const notifications =
      localStorage.getItem(STORAGE_KEY);

    if (!notifications) {
      return [];
    }

    return JSON.parse(notifications);
  } catch {
    return [];
  }
}

/*
 * Save all notifications
 */
export function saveNotifications(
  notifications
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notifications)
  );
}

/*
 * Add a new notification
 */
export function addNotification(
  notification
) {
  const notifications =
    getNotifications();

  const newNotification = {
    id:
      notification.id ||
      Date.now(),

    eventId:
      notification.eventId ||
      null,

    userId:
      notification.userId ||
      null,

    userEmail:
      notification.userEmail ||
      "",

    userName:
      notification.userName ||
      "Club Representative",

    title:
      notification.title ||
      "Notification",

    message:
      notification.message ||
      "",

    type:
      notification.type ||
      "info",

    status:
      notification.status ||
      "",

    read:
      notification.read ??
      false,

    createdAt:
      notification.createdAt ||
      new Date().toISOString(),
  };

  saveNotifications([
    newNotification,
    ...notifications,
  ]);

  return newNotification;
}

/*
 * Check whether notification belongs
 * to logged-in Club Representative.
 */
export function isMyNotification(
  notification
) {
  const loggedInUser =
    getLoggedInUser();

  if (!loggedInUser) {
    return false;
  }

  /*
   * Legacy notifications:
   * Old notifications created before
   * ownership support are still shown.
   */
  const hasNoOwner =
    (notification.userId === undefined ||
      notification.userId === null) &&
    !notification.userEmail;

  if (hasNoOwner) {
    return true;
  }

  const matchesUserId =
    notification.userId !== undefined &&
    notification.userId !== null &&
    String(notification.userId) ===
      String(loggedInUser.id);

  const matchesEmail =
    notification.userEmail &&
    loggedInUser.email &&
    notification.userEmail.toLowerCase() ===
      loggedInUser.email.toLowerCase();

  return Boolean(
    matchesUserId ||
      matchesEmail
  );
}

/*
 * Get notifications belonging
 * to current logged-in user.
 */
export function getMyNotifications() {
  return getNotifications().filter(
    isMyNotification
  );
}

/*
 * Get unread notification count
 * for current user.
 */
export function getUnreadNotificationCount() {
  return getMyNotifications().filter(
    (notification) =>
      !notification.read
  ).length;
}

/*
 * Mark only current user's
 * notifications as read.
 */
export function markMyNotificationsAsRead() {
  const notifications =
    getNotifications();

  const updatedNotifications =
    notifications.map(
      (notification) => {
        if (
          isMyNotification(
            notification
          )
        ) {
          return {
            ...notification,
            read: true,
          };
        }

        return notification;
      }
    );

  saveNotifications(
    updatedNotifications
  );

  return updatedNotifications.filter(
    isMyNotification
  );
}

/*
 * Create notification directly
 * from an event.
 */
export function addEventNotification({
  event,
  title,
  message,
  type = "info",
  status = "",
}) {
  if (!event) {
    return null;
  }

  return addNotification({
    eventId: event.id,

    userId:
      event.createdBy ||
      null,

    userEmail:
      event.createdByEmail ||
      "",

    userName:
      event.createdByName ||
      "Club Representative",

    title,

    message,

    type,

    status,

    read: false,
  });
}