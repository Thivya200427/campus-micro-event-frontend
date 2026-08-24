import { Link } from "react-router-dom";
import { getEvents } from "../../utils/eventStore";

function PendingRequests() {
  const events = getEvents();

  const pendingEvents = events.filter(
    (event) => event.status === "Pending"
  );

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Pending Requests</h2>
          <p>Review event requests waiting for approval.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Pending Event Requests</h4>
            <p>
              Check event details before approving or rejecting.
            </p>
          </div>

          <span className="badge bg-warning text-dark">
            {pendingEvents.length} Pending
          </span>
        </div>

        {pendingEvents.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-check-circle"
              style={{
                fontSize: "45px",
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
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {pendingEvents.map((event) => (
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
                      <span className="status pending">
                        Pending
                      </span>
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

export default PendingRequests;