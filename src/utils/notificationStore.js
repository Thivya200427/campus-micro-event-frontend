import { getLoggedInUser } from "./authStore";

const STORAGE_KEY = "campus_notifications";

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

export function saveNotifications(notifications) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notifications)
  );
}

export function addNotification(notification) {
  const notifications = getNotifications();

  const newNotification = {
    id: notification.id || Date.now(),

    eventId:
      notification.eventId || null,

    userId:
      notification.userId || null,

    userEmail:
      notification.userEmail || "",

    userName:
      notification.userName ||
      "Club Representative",

    title:
      notification.title ||
      "Notification",

    message:
      notification.message || "",

    type:
      notification.type || "info",

    status:
      notification.status || "",

    read:
      notification.read ?? false,

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

export function isMyNotification(notification) {
  const loggedInUser = getLoggedInUser();

  if (!loggedInUser) {
    return false;
  }

  /*
   * STRICT OWNERSHIP
   *
   * Old notifications without an owner
   * must not be shown to every Club user.
   */
  const hasNoOwner =
    (notification.userId === undefined ||
      notification.userId === null) &&
    !notification.userEmail;

  if (hasNoOwner) {
    return false;
  }

  const matchesUserId =
    notification.userId !== undefined &&
    notification.userId !== null &&
    loggedInUser.id !== undefined &&
    loggedInUser.id !== null &&
    String(notification.userId) ===
      String(loggedInUser.id);

  const matchesEmail =
    Boolean(notification.userEmail) &&
    Boolean(loggedInUser.email) &&
    notification.userEmail
      .toLowerCase() ===
      loggedInUser.email.toLowerCase();

  return Boolean(
    matchesUserId || matchesEmail
  );
}

export function getMyNotifications() {
  const notifications =
    getNotifications();

  return notifications.filter(
    isMyNotification
  );
}

export function getUnreadNotificationCount() {
  return getMyNotifications().filter(
    (notification) =>
      !notification.read
  ).length;
}

export function markMyNotificationsAsRead() {
  const notifications =
    getNotifications();

  const updatedNotifications =
    notifications.map(
      (notification) => {
        if (
          isMyNotification(notification)
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

  /*
   * Every new event notification is saved
   * with the owner of that event.
   */
  return addNotification({
    eventId: event.id,

    userId:
      event.createdBy || null,

    userEmail:
      event.createdByEmail || "",

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