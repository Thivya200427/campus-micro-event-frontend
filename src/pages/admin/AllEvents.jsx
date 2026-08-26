import { getEvents } from "../../utils/eventStore";

function AllEvents() {
  const events = getEvents();

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
          <h2>All Events</h2>
          <p>View all event requests in the system.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>System Event List</h4>
            <p>
              All event requests created by club representatives.
            </p>
          </div>

          <span className="badge bg-secondary">
            {events.length} Events
          </span>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-calendar-x"
              style={{
                fontSize: "44px",
                color: "#94a3b8",
              }}
            ></i>

            <h5 className="mt-3">No Events Found</h5>

            <p className="text-muted">
              Event requests will appear here after they are created.
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
                  <th>Manager Remarks</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>

                    <td>{event.eventType || "-"}</td>

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
                      {event.managerRemarks || "-"}
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

export default AllEvents;