import { Link } from "react-router-dom";
import { getEvents } from "../../utils/eventStore";

function Dashboard() {
  const events = getEvents();

  const totalEvents = events.length;

  const pendingEvents = events.filter(
    (event) => event.status === "Pending"
  ).length;

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
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
      <div className="dashboard-title">
        <div>
          <h2>Dashboard</h2>
          <p>
            Overview of your campus events and activities.
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

      <div className="stats-grid">
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
            <span>Pending Events</span>
            <h3>{pendingEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Approved Events</span>
            <h3>{approvedEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>Expected Participants</span>
            <h3>{totalParticipants}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Recent Events</h4>
            <p>Your latest event requests.</p>
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
              Create your first campus event request.
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
                  <th>Event</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Participants</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>{event.venue}</td>
                    <td>{event.expectedParticipants}</td>

                    <td>
                      <span
                        className={`status ${getStatusClass(
                          event.status
                        )}`}
                      >
                        {event.status}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;