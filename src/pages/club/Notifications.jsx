function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Event Approved",
      message: "Your Web Development Workshop has been approved.",
      time: "10 minutes ago",
      type: "success",
      icon: "bi bi-check-circle",
    },
    {
      id: 2,
      title: "Event Pending",
      message:
        "AI Awareness Seminar is waiting for Estate Manager review.",
      time: "1 hour ago",
      type: "warning",
      icon: "bi bi-hourglass-split",
    },
    {
      id: 3,
      title: "Venue Update",
      message:
        "Main Hall is available for your requested event date.",
      time: "Yesterday",
      type: "info",
      icon: "bi bi-building",
    },
    {
      id: 4,
      title: "Event Rejected",
      message:
        "Photography Club Meeting was rejected. Please review the request.",
      time: "2 days ago",
      type: "danger",
      icon: "bi bi-x-circle",
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Notifications</h2>
          <p>View updates about your events and requests.</p>
        </div>

        <button className="btn btn-outline-secondary">
          <i className="bi bi-check2-all me-2"></i>
          Mark All as Read
        </button>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            className="notification-card"
            key={notification.id}
          >
            <div
              className={`notification-type-icon ${notification.type}`}
            >
              <i className={notification.icon}></i>
            </div>

            <div className="notification-content">
              <div className="notification-heading">
                <h4>{notification.title}</h4>

                <span>{notification.time}</span>
              </div>

              <p>{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;