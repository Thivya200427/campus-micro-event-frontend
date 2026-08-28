import { Link } from "react-router-dom";

import {
  getEvents,
  getMyEvents,
} from "../../utils/eventStore";

import { getEventAttendance } from "../../utils/attendanceStore";

import { getUnreadNotificationCount } from "../../utils/notificationStore";

function Dashboard() {
  /*
   * Get events owned by the currently
   * logged-in Club Representative.
   */
  const myEvents = getMyEvents();

  /*
   * Legacy support:
   * Events created before ownership support
   * do not have createdBy.
   */
  const legacyEvents = getEvents().filter(
    (event) =>
      event.createdBy === undefined ||
      event.createdBy === null
  );

  const events = [
    ...myEvents,

    ...legacyEvents.filter(
      (legacyEvent) =>
        !myEvents.some(
          (myEvent) =>
            String(myEvent.id) ===
            String(legacyEvent.id)
        )
    ),
  ];

  /*
   * Event statistics
   */
  const totalEvents = events.length;

  const pendingEvents = events.filter(
    (event) =>
      event.status === "Pending"
  ).length;

  const approvedEvents = events.filter(
    (event) =>
      event.status === "Approved"
  ).length;

  const rejectedEvents = events.filter(
    (event) =>
      event.status === "Rejected"
  ).length;

  const cancelledEvents = events.filter(
    (event) =>
      event.status === "Cancelled"
  ).length;

  /*
   * Expected participants
   */
  const totalParticipants = events.reduce(
    (total, event) =>
      total +
      Number(
        event.expectedParticipants || 0
      ),
    0
  );

  /*
   * Actual attendance
   */
  const totalCheckedIn = events.reduce(
    (total, event) =>
      total +
      getEventAttendance(
        event.id
      ).length,
    0
  );

  /*
   * Current logged-in user's
   * unread notifications only
   */
  const unreadNotifications =
    getUnreadNotificationCount();

  /*
   * Latest five events
   */
  const recentEvents = [...events]
    .sort((a, b) => {
      const aTime = new Date(
        a.createdAt ||
          a.date ||
          0
      ).getTime();

      const bTime = new Date(
        b.createdAt ||
          b.date ||
          0
      ).getTime();

      return bTime - aTime;
    })
    .slice(0, 5);

  const getStatusClass = (
    status
  ) => {
    if (
      status === "Approved"
    ) {
      return "approved";
    }

    if (
      status === "Rejected" ||
      status === "Cancelled"
    ) {
      return "rejected";
    }

    if (
      status === "Draft"
    ) {
      return "draft";
    }

    return "pending";
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="dashboard-title">
        <div>
          <h2>Dashboard</h2>

          <p>
            Overview of your campus events and
            activities.
          </p>
        </div>

        <Link
          to="/events/create"
          className="btn primary-action"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Create Event
        </Link>
      </div>

      {/* Statistics Row 1 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>
              Total Events
            </span>

            <h3>
              {totalEvents}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>
              Pending Events
            </span>

            <h3>
              {pendingEvents}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>
              Approved Events
            </span>

            <h3>
              {approvedEvents}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-person-check"></i>
          </div>

          <div>
            <span>
              Actual Check-Ins
            </span>

            <h3>
              {totalCheckedIn}
            </h3>
          </div>
        </div>
      </div>

      {/* Statistics Row 2 */}
      <div className="stats-grid mt-4">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>
              Expected Participants
            </span>

            <h3>
              {totalParticipants}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>
              Rejected Events
            </span>

            <h3>
              {rejectedEvents}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-calendar-x"></i>
          </div>

          <div>
            <span>
              Cancelled Events
            </span>

            <h3>
              {cancelledEvents}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-bell"></i>
          </div>

          <div>
            <span>
              Unread Notifications
            </span>

            <h3>
              {unreadNotifications}
            </h3>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="dashboard-section mt-4">
        <div className="section-header">
          <div>
            <h4>
              Recent Events
            </h4>

            <p>
              Your latest event requests.
            </p>
          </div>

          <Link
            to="/events"
            className="view-all-btn"
          >
            View All
          </Link>
        </div>

        {recentEvents.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-calendar-x"
              style={{
                fontSize: "44px",
                color: "#94a3b8",
              }}
            ></i>

            <h5 className="mt-3">
              No Events Yet
            </h5>

            <p className="text-muted">
              Create your first campus event
              request.
            </p>

            <Link
              to="/events/create"
              className="btn primary-action"
            >
              Create Event
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table dashboard-table">
              <thead>
                <tr>
                  <th>
                    Event
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Venue
                  </th>

                  <th>
                    Participants
                  </th>

                  <th>
                    Checked In
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentEvents.map(
                  (event) => (
                    <tr
                      key={event.id}
                    >
                      <td>
                        {event.title}
                      </td>

                      <td>
                        {event.date ||
                          "-"}
                      </td>

                      <td>
                        {event.venue ||
                          "-"}
                      </td>

                      <td>
                        {event.expectedParticipants ||
                          0}
                      </td>

                      <td>
                        {
                          getEventAttendance(
                            event.id
                          ).length
                        }
                      </td>

                      <td>
                        <span
                          className={`status ${getStatusClass(
                            event.status
                          )}`}
                        >
                          {event.status ||
                            "Pending"}
                        </span>
                      </td>

                      <td>
                        <Link
                          to={`/events/${event.id}`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;