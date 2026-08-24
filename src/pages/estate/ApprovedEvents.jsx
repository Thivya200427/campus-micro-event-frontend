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
        {approvedEvents.length === 0 ? (
          <div className="text-center py-5">
            <h5>No Approved Events</h5>

            <p className="text-muted">
              Approved requests will appear here.
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
                {approvedEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>{event.venue}</td>

                    <td>
                      {event.expectedParticipants}
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