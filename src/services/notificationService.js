import api from "./api";

const mapNotification = (notification) => ({
  ...notification,
  type: notification.type?.toLowerCase() || "info",
  read: Boolean(notification.readStatus),
});

export async function getUserNotifications(userId) {
  const response = await api.get(`/notifications/user/${userId}`);
  return response.data.map(mapNotification);
}

export async function markNotificationRead(id) {
  const response = await api.put(`/notifications/${id}/read`);
  return mapNotification(response.data);
}

export async function markAllNotificationsRead(notifications) {
  await Promise.all(
    notifications.filter((item) => !item.read).map((item) => markNotificationRead(item.id))
  );
}
