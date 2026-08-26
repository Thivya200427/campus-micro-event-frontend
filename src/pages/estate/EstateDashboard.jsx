import { Link } from "react-router-dom";
import { getEvents } from "../../utils/eventStore";

function EstateDashboard() {
  const events = getEvents();

  const pendingEvents = events.filter(
    (event) => event.status === "Pending"
  );

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  );

  const rejectedEvents = events.filter(
    (event) => event.status === "Rejected"
  );

  const totalParticipants = events.reduce(
    (total, event) =>
      total + Number(event.expectedParticipants || 0),
    0
  );

  const recentPending = pendingEvents.slice(0, 5);

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Estate Manager Dashboard</h2>

          <p>
            Review event requests and manage campus venues and resources.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending Requests</span>
            <h3>{pendingEvents.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Approved Events</span>
            <h3>{approvedEvents.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>Rejected Events</span>
            <h3>{rejectedEvents.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>Total Participants</span>
            <h3>{totalParticipants}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Pending Event Requests</h4>

            <p>
              Event requests waiting for your review.
            </p>
          </div>

          <Link
            to="/estate/pending"
            className="view-all-btn"
          >
            View All
          </Link>
        </div>

        {recentPending.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-check-circle"
              style={{
                fontSize: "44px",
                color: "#94a3b8",
              }}
            ></i>

            <h5 className="mt-3">
              No Pending Requests
            </h5>

            <p className="text-muted">
              All submitted event requests have been reviewed.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table dashboard-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Participants</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {recentPending.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>

                    <td>
                      {event.eventType || "-"}
                    </td>

                    <td>{event.date}</td>

                    <td>{event.venue}</td>

                    <td>
                      {event.expectedParticipants}
                    </td>

                    <td>
                      <Link
                        to={`/estate/pending/${event.id}`}
                        className="btn btn-sm primary-action"
                      >
                        Review
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

export default EstateDashboard;