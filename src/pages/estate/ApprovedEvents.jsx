import { getEvents } from "../../utils/eventStore";

function ApprovedEvents() {
  const events = getEvents();

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  );

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Approved Events</h2>
          <p>View all approved event requests.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Approved Event List</h4>
            <p>Events approved by the Estate Manager.</p>
          </div>

          <span className="badge bg-success">
            {approvedEvents.length} Approved
          </span>
        </div>

        {approvedEvents.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-calendar-check"
              style={{
                fontSize: "44px",
                color: "#94a3b8",
              }}
            ></i>

            <h5 className="mt-3">No Approved Events</h5>

            <p className="text-muted">
              Approved event requests will appear here.
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
                  <th>Remarks</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {approvedEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>

                    <td>{event.eventType || "-"}</td>

                    <td>{event.date}</td>

                    <td>{event.venue}</td>

                    <td>{event.expectedParticipants}</td>

                    <td>
                      {event.managerRemarks || "Approved"}
                    </td>

                    <td>
                      <span className="status approved">
                        Approved
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

export default ApprovedEvents;