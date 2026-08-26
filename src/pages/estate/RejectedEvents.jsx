import { getEvents } from "../../utils/eventStore";

function RejectedEvents() {
  const events = getEvents();

  const rejectedEvents = events.filter(
    (event) => event.status === "Rejected"
  );

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Rejected Events</h2>
          <p>View rejected event requests and rejection reasons.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Rejected Event List</h4>
            <p>Requests rejected by the Estate Manager.</p>
          </div>

          <span className="badge bg-danger">
            {rejectedEvents.length} Rejected
          </span>
        </div>

        {rejectedEvents.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-calendar-x"
              style={{
                fontSize: "44px",
                color: "#94a3b8",
              }}
            ></i>

            <h5 className="mt-3">No Rejected Events</h5>

            <p className="text-muted">
              Rejected event requests will appear here.
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
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {rejectedEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>

                    <td>{event.eventType || "-"}</td>

                    <td>{event.date}</td>

                    <td>{event.venue}</td>

                    <td>{event.expectedParticipants}</td>

                    <td>
                      {event.managerRemarks ||
                        "No rejection reason provided"}
                    </td>

                    <td>
                      <span className="status rejected">
                        Rejected
                      </span>
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

export default RejectedEvents;