import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { approveEvent, getEvent, rejectEvent } from "../../services/eventService";
import { getApiError } from "../../services/api";
import { getEventAllocations } from "../../services/resourceAllocationService";

function ReviewRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    let active = true;
    getEvent(id)
      .then((data) => active && setEvent(data))
      .catch(() => active && setEvent(null))
      .finally(() => active && setLoading(false));
    getEventAllocations(id)
      .then((data) => active && setAllocations(data))
      .catch(() => active && setAllocations([]));
    return () => { active = false; };
  }, [id]);

  const handleApprove = async () => {
    setSaving(true);
    try {
      await approveEvent(id);
      alert("Event approved successfully.");
      navigate("/estate/approved");
    } catch (error) {
      alert(getApiError(error, "Unable to approve this event."));
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!remarks.trim()) {
      alert("Please enter a rejection reason before rejecting the event.");
      return;
    }
    setSaving(true);
    try {
      await rejectEvent(id, remarks.trim());
      alert("Event rejected successfully.");
      navigate("/estate/rejected");
    } catch (error) {
      alert(getApiError(error, "Unable to reject this event."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="dashboard-section text-center py-5">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="dashboard-title">
        <div><h2>Event Not Found</h2><p>The selected event request is not available.</p></div>
        <Link to="/estate/pending" className="btn btn-outline-secondary">Back</Link>
      </div>
    );
  }

  const statusClass = event.status === "Approved"
    ? "approved" : event.status === "Rejected" ? "rejected" : "pending";

  return (
    <div>
      <div className="dashboard-title">
        <div><h2>Review Event Request</h2><p>Review the event details before making a decision.</p></div>
        <Link to="/estate/pending" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>Back
        </Link>
      </div>

      <div className="event-details-grid">
        <div className="event-detail-card">
          <h4>{event.title}</h4>
          <div className="detail-row"><span>Submitted By</span><strong>{event.createdByName || "Club Representative"}</strong></div>
          {event.createdByEmail && <div className="detail-row"><span>Contact Email</span><strong>{event.createdByEmail}</strong></div>}
          <div className="detail-row"><span>Event Type</span><strong>{event.eventType || "-"}</strong></div>
          <div className="detail-row"><span>Date</span><strong>{event.date || "-"}</strong></div>
          <div className="detail-row"><span>Time</span><strong>{event.startTime || "-"} - {event.endTime || "-"}</strong></div>
          <div className="detail-row"><span>Venue</span><strong>{event.venue || "-"}</strong></div>
          <div className="detail-row"><span>Expected Participants</span><strong>{event.expectedParticipants || 0}</strong></div>
          <div className="detail-row"><span>Status</span><span className={`status ${statusClass}`}>{event.status}</span></div>
        </div>

        <div className="event-detail-card">
          <h4>Requested Resources</h4>
          {allocations.length === 0 ? (
            <p className="text-muted mb-0">No resources requested.</p>
          ) : allocations.map((allocation) => (
            <div className="detail-row" key={allocation.id}>
              <span>{allocation.resource?.name}</span>
              <strong>{allocation.requestedQuantity}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="event-detail-card mt-4">
        <h4>Description</h4>
        <p className="text-muted mb-0">{event.description || "No description provided."}</p>
      </div>

      <div className="event-detail-card mt-4">
        <h4>Manager Remarks</h4>
        <p className="text-muted">A reason is required when rejecting an event.</p>
        <textarea className="form-control" rows="4"
          value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        <div className="review-actions">
          <button type="button" className="btn btn-danger" onClick={handleReject} disabled={saving}>
            <i className="bi bi-x-circle me-2"></i>Reject
          </button>
          <button type="button" className="btn btn-success" onClick={handleApprove} disabled={saving}>
            <i className="bi bi-check-circle me-2"></i>Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewRequest;
