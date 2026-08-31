import useNotifications from "../../hooks/useNotifications";
import { markAllNotificationsRead } from "../../services/notificationService";
import { getLoggedInUser } from "../../utils/authStore";
import { getApiError } from "../../services/api";

function Notifications() {
  const loggedInUser = getLoggedInUser();
  const { notifications, loadNotifications } = useNotifications(loggedInUser?.id);

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsRead(notifications);
      await loadNotifications();
    } catch (error) {
      alert(getApiError(error, "Unable to update notifications."));
    }
  };

  const getIcon = (type) => {
    if (type === "success") {
      return "bi bi-check-circle";
    }

    if (type === "danger") {
      return "bi bi-x-circle";
    }

    if (type === "warning") {
      return "bi bi-hourglass-split";
    }

    return "bi bi-bell";
  };

  const formatTime = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    const createdDate = new Date(dateValue);

    if (Number.isNaN(createdDate.getTime())) {
      return "";
    }

    const now = new Date();

    const difference =
      now.getTime() -
      createdDate.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference /
        (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} minute${
        minutes === 1 ? "" : "s"
      } ago`;
    }

    if (hours < 24) {
      return `${hours} hour${
        hours === 1 ? "" : "s"
      } ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    return `${days} days ago`;
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Notifications</h2>

          <p>
            View updates about your events and requests.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={markAllAsRead}
          disabled={notifications.length === 0}
        >
          <i className="bi bi-check2-all me-2"></i>
          Mark All as Read
        </button>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="event-detail-card text-center py-5">
            <i
              className="bi bi-bell"
              style={{
                fontSize: "40px",
              }}
            ></i>

            <h4 className="mt-3">
              No Notifications
            </h4>

            <p className="text-muted mb-0">
              New event updates will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              className={`notification-card ${
                notification.read ? "read" : ""
              }`}
              key={notification.id}
            >
              <div
                className={`notification-type-icon ${
                  notification.type || "info"
                }`}
              >
                <i
                  className={getIcon(
                    notification.type
                  )}
                ></i>
              </div>

              <div className="notification-content">
                <div className="notification-heading">
                  <h4>
                    {notification.title ||
                      "Notification"}
                  </h4>

                  <span>
                    {formatTime(
                      notification.createdAt
                    )}
                  </span>
                </div>

                <p>
                  {notification.message ||
                    "No notification message."}
                </p>

                {!notification.read && (
                  <span className="badge bg-primary">
                    New
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
