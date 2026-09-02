import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cancelEvent, getMyEvents, submitDraft } from "../../services/eventService";
import { getApiError } from "../../services/api";
import { getLoggedInUser } from "../../utils/authStore";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getMyEvents(loggedInUser.id)
      .then((events) => {
        const found = events.find((item) => String(item.id) === String(id));
        if (active) setEvent(found || null);
      })
      .catch(() => active && setEvent(null))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id, loggedInUser.id]);

  const handleCancel = async () => {
    if (event.status !== "Approved") {
      alert("Only approved events can be cancelled.");
      return;
    }
    if (!window.confirm(`Are you sure you want to cancel "${event.title}"?`)) return;

    try {
      await cancelEvent(event.id, loggedInUser.id);
      alert("Event cancelled successfully.");
      navigate("/events");
    } catch (error) {
      alert(getApiError(error, "Unable to cancel this event."));
    }
  };

  const handleSubmitDraft = async () => {
    try {
      await submitDraft(event.id, loggedInUser.id);
      alert("Event request submitted successfully.");
      navigate("/events");
    } catch (error) {
      alert(getApiError(error, "Unable to submit this draft."));
    }
  };

  if (loading) {
    return <div className="dashboard-section text-center py-5">Loading event...</div>;
  }

  if (!event) {
    return (
      <div>
        <div className="dashboard-title">
          <div><h2>Event Not Available</h2><p>This event could not be found or is not available to your account.</p></div>
          <Link to="/events" className="btn btn-outline-secondary">Back</Link>
        </div>
      </div>
    );
  }

  const statusClass = event.status === "Approved" ? "approved"
    : event.status === "Rejected" || event.status === "Cancelled" ? "rejected" : "pending";

  return (
    <div>
      <div className="dashboard-title">
        <div><h2>Event Details</h2><p>View complete information about your event request.</p></div>
        <div className="d-flex gap-2">
          {event.status === "Draft" && (
            <button type="button" className="btn primary-action" onClick={handleSubmitDraft}>
              <i className="bi bi-send me-2"></i>Submit Request
            </button>
          )}
          {event.status === "Approved" && (
            <button type="button" className="btn btn-danger" onClick={handleCancel}>
              <i className="bi bi-x-circle me-2"></i>Cancel Event
            </button>
          )}
          <Link to="/events" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>Back
          </Link>
        </div>
      </div>

      <div className="event-details-grid">
        <div className="event-detail-card">
          <h4>{event.title}</h4>
          <div className="detail-row"><span>Event Type</span><strong>{event.eventType || "Not specified"}</strong></div>
          <div className="detail-row"><span>Date</span><strong>{event.date || "-"}</strong></div>
          <div className="detail-row"><span>Time</span><strong>{event.startTime || "-"} - {event.endTime || "-"}</strong></div>
          <div className="detail-row"><span>Venue</span><strong>{event.venue || "-"}</strong></div>
          <div className="detail-row"><span>Expected Participants</span><strong>{event.expectedParticipants || 0}</strong></div>
          <div className="detail-row"><span>Status</span><span className={`status ${statusClass}`}>{event.status}</span></div>
        </div>
        <div className="event-detail-card">
          <h4>Description</h4>
          <p className="mb-0 text-muted">{event.description || "No description provided."}</p>
        </div>
      </div>

      {event.managerRemarks && (
        <div className="event-detail-card mt-4">
          <h4>Manager Remarks</h4><p className="mb-0 text-muted">{event.managerRemarks}</p>
        </div>
      )}
      {event.status === "Cancelled" && (
        <div className="alert alert-warning mt-4"><i className="bi bi-info-circle me-2"></i>This event has been cancelled.</div>
      )}
    </div>
  );
}

export default EventDetails;
