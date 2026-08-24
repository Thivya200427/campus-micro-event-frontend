import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getEvents } from "../../utils/eventStore";

function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>My Events</h2>

          <p>
            View and manage your submitted event requests.
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

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Event Requests</h4>

            <p>
              All your event requests are listed below.
            </p>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-calendar-x"
              style={{
                fontSize: "45px",
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
                {events.map((event) => (
                  <tr key={event.id}>

                    <td>
                      {event.title}
                    </td>

                    <td>
                      {event.date}
                    </td>

                    <td>
                      {event.venue}
                    </td>

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

export default MyEvents;