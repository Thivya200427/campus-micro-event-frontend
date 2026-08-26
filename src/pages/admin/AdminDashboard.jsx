import { Link } from "react-router-dom";

import { getEvents } from "../../utils/eventStore";
import { getUsers } from "../../utils/userStore";

function AdminDashboard() {
  const events = getEvents();
  const users = getUsers();

  const totalEvents = events.length;

  const pendingEvents = events.filter(
    (event) => event.status === "Pending"
  ).length;

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  ).length;

  const rejectedEvents = events.filter(
    (event) => event.status === "Rejected"
  ).length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const totalParticipants = events.reduce(
    (total, event) =>
      total + Number(event.expectedParticipants || 0),
    0
  );

  const recentEvents = [...events]
    .reverse()
    .slice(0, 5);

  const getStatusClass = (status) => {
    if (!status) {
      return "draft";
    }

    return status.toLowerCase();
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="dashboard-title">
        <div>
          <h2>Admin Dashboard</h2>

          <p>
            Monitor overall system events, users and activity.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>Total Users</span>
            <h3>{users.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-person-check"></i>
          </div>

          <div>
            <span>Active Users</span>
            <h3>{activeUsers}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>Total Events</span>
            <h3>{totalEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending</span>
            <h3>{pendingEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Approved</span>
            <h3>{approvedEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>Rejected</span>
            <h3>{rejectedEvents}</h3>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Recent Events</h4>

            <p>
              Latest event activity in the system.
            </p>
          </div>

          <Link
            to="/admin/events"
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
              No Events Found
            </h5>

            <p className="text-muted">
              Event activity will appear here.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table dashboard-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Participants</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>

                    <td>{event.date}</td>

                    <td>{event.venue}</td>

                    <td>
                      {event.expectedParticipants}
                    </td>

                    <td>
                      <span
                        className={`status ${getStatusClass(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* System Summary */}
      <div className="dashboard-section mt-4">
        <div className="section-header">
          <div>
            <h4>System Summary</h4>

            <p>
              Overall registered users and event participation.
            </p>
          </div>
        </div>

        <div className="detail-row">
          <span>Total Registered Users</span>
          <strong>{users.length}</strong>
        </div>

        <div className="detail-row">
          <span>Active Users</span>
          <strong>{activeUsers}</strong>
        </div>

        <div className="detail-row">
          <span>Total Expected Participants</span>
          <strong>{totalParticipants}</strong>
        </div>

        <div className="detail-row">
          <span>Total Event Requests</span>
          <strong>{totalEvents}</strong>
        </div>

        <div className="detail-row">
          <span>Approved Requests</span>
          <strong>{approvedEvents}</strong>
        </div>

        <div className="detail-row">
          <span>Rejected Requests</span>
          <strong>{rejectedEvents}</strong>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;