import { Link, useParams } from "react-router-dom";
import { getEvents } from "../../utils/eventStore";

function EventDetails() {
  const { id } = useParams();

  const events = getEvents();

  const event = events.find(
    (item) => String(item.id) === String(id)
  );

  if (!event) {
    return (
      <div>
        <div className="dashboard-title">
          <div>
            <h2>Event Not Found</h2>
            <p>The selected event could not be found.</p>
          </div>

          <Link
            to="/events"
            className="btn btn-outline-secondary"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Link>
        </div>

        <div className="event-detail-card">
          <p className="text-muted mb-0">
            This event may have been removed or is no longer available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Event Details</h2>
          <p>
            View complete information about this event request.
          </p>
        </div>

        <Link
          to="/events"
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      <div className="event-details-grid">
        <div className="event-detail-card">
          <h4>{event.title}</h4>

          <div className="detail-row">
            <span>Event Type</span>
            <strong>
              {event.eventType || "Not specified"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Date</span>
            <strong>{event.date}</strong>
          </div>

          <div className="detail-row">
            <span>Time</span>
            <strong>
              {event.startTime || "-"} - {event.endTime || "-"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Venue</span>
            <strong>{event.venue}</strong>
          </div>

          <div className="detail-row">
            <span>Expected Participants</span>
            <strong>
              {event.expectedParticipants}
            </strong>
          </div>

          <div className="detail-row">
            <span>Status</span>

            <span
              className={`status ${event.status.toLowerCase()}`}
            >
              {event.status}
            </span>
          </div>
        </div>

        <div className="event-detail-card">
          <h4>Requested Resources</h4>

          <div className="resource-detail">
            <i className="bi bi-person-workspace"></i>

            <div>
              <span>Chairs</span>
              <strong>{event.chairs || 0}</strong>
            </div>
          </div>

          <div className="resource-detail">
            <i className="bi bi-mic"></i>

            <div>
              <span>Microphones</span>
              <strong>
                {event.microphones || 0}
              </strong>
            </div>
          </div>

          <div className="resource-detail">
            <i className="bi bi-projector"></i>

            <div>
              <span>Projectors</span>
              <strong>
                {event.projectors || 0}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="event-detail-card mt-4">
        <h4>Description</h4>

        <p className="mb-0 text-muted">
          {event.description
            ? event.description
            : "No description provided."}
        </p>
      </div>
    </div>
  );
}

export default EventDetails;