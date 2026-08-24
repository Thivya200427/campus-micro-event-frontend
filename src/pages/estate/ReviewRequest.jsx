import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getEvents,
  saveEvents,
} from "../../utils/eventStore";

function ReviewRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [remarks, setRemarks] = useState("");

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
            <p>
              The selected request could not be found.
            </p>
          </div>

          <Link
            to="/estate/pending"
            className="btn btn-outline-secondary"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  const updateStatus = (newStatus) => {
    const updatedEvents = events.map((item) => {
      if (String(item.id) === String(id)) {
        return {
          ...item,
          status: newStatus,
          managerRemarks: remarks,
          reviewedAt: new Date().toISOString(),
        };
      }

      return item;
    });

    saveEvents(updatedEvents);
  };

  const handleApprove = () => {
    updateStatus("Approved");

    alert("Event approved successfully");

    navigate("/estate/approved");
  };

  const handleReject = () => {
    if (!remarks.trim()) {
      alert("Please enter a rejection reason");
      return;
    }

    updateStatus("Rejected");

    alert("Event rejected successfully");

    navigate("/estate/rejected");
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Review Event Request</h2>
          <p>
            Review the submitted event before making a decision.
          </p>
        </div>

        <Link
          to="/estate/pending"
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
              {event.eventType || "-"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Date</span>
            <strong>{event.date}</strong>
          </div>

          <div className="detail-row">
            <span>Time</span>
            <strong>
              {event.startTime || "-"} -{" "}
              {event.endTime || "-"}
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

            <span className="status pending">
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
              <strong>
                {event.chairs || 0}
              </strong>
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

        <p className="text-muted mb-0">
          {event.description ||
            "No description provided."}
        </p>
      </div>

      <div className="event-detail-card mt-4">
        <h4>Manager Remarks</h4>

        <textarea
          className="form-control"
          rows="4"
          placeholder="Enter remarks or rejection reason"
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
        ></textarea>

        <div className="review-actions">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleReject}
          >
            <i className="bi bi-x-circle me-2"></i>
            Reject
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={handleApprove}
          >
            <i className="bi bi-check-circle me-2"></i>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewRequest;