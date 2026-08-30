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

import {
  getResources,
  saveResources,
} from "../../utils/resourceStore";

import {
  getVenues,
  saveVenues,
} from "../../utils/venueStore";

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
              The selected event request could not be found.
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
      </div>
    );
  }

  // =====================================================
  // NOTIFICATION
  // =====================================================

  const createNotification = (status) => {
    let notifications = [];

    try {
      notifications =
        JSON.parse(
          localStorage.getItem(
            "campus_notifications"
          )
        ) || [];
    } catch {
      notifications = [];
    }

    const newNotification = {
      id: Date.now(),

      eventId: event.id,

      // Notification belongs only to
      // the Club Representative who
      // created this event.
      userId: event.createdBy || null,

      userEmail:
        event.createdByEmail || "",

      userName:
        event.createdByName ||
        "Club Representative",

      title:
        status === "Approved"
          ? "Event Approved"
          : "Event Rejected",

      message:
        status === "Approved"
          ? `${event.title} has been approved by the Estate Manager.${
              remarks.trim()
                ? ` Remark: ${remarks.trim()}`
                : ""
            }`
          : `${event.title} has been rejected by the Estate Manager.${
              remarks.trim()
                ? ` Reason: ${remarks.trim()}`
                : ""
            }`,

      type:
        status === "Approved"
          ? "success"
          : "danger",

      status,

      read: false,

      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "campus_notifications",
      JSON.stringify([
        newNotification,
        ...notifications,
      ])
    );
  };

  // =====================================================
  // UPDATE EVENT STATUS
  // =====================================================

  const updateEventStatus = (
    status,
    extraData = {}
  ) => {
    const reviewedAt =
      new Date().toISOString();

    const updatedEvents = events.map(
      (item) => {
        if (
          String(item.id) === String(id)
        ) {
          return {
            ...item,

            status,

            managerRemarks:
              remarks.trim(),

            reviewedAt,

            ...extraData,
          };
        }

        return item;
      }
    );

    saveEvents(updatedEvents);

    createNotification(status);
  };

  // =====================================================
  // RESOURCE QUANTITY
  // =====================================================

  const getRequestedResourceQuantity = (
    resourceName
  ) => {
    const name =
      resourceName.toLowerCase();

    if (name === "chairs") {
      return Number(
        event.chairs || 0
      );
    }

    if (name === "microphones") {
      return Number(
        event.microphones || 0
      );
    }

    if (name === "projectors") {
      return Number(
        event.projectors || 0
      );
    }

    return 0;
  };

  // =====================================================
  // RESOURCE AVAILABILITY
  // =====================================================

  const checkResourceAvailability = () => {
    const resources = getResources();

    for (const resource of resources) {
      const requested =
        getRequestedResourceQuantity(
          resource.name
        );

      if (requested <= 0) {
        continue;
      }

      const available = Number(
        resource.available || 0
      );

      if (requested > available) {
        alert(
          `Cannot approve this event. Only ${available} ${resource.name} are available, but ${requested} were requested.`
        );

        return false;
      }
    }

    return true;
  };

  // =====================================================
  // TIME OVERLAP CHECK
  // =====================================================

  const hasTimeOverlap = (
    start1,
    end1,
    start2,
    end2
  ) => {
    if (
      !start1 ||
      !end1 ||
      !start2 ||
      !end2
    ) {
      return false;
    }

    return (
      start1 < end2 &&
      end1 > start2
    );
  };

  // =====================================================
  // VENUE AVAILABILITY
  //
  // IMPORTANT:
  // We DO NOT block only because
  // venue.status === "Booked".
  //
  // Conflict happens only when:
  // 1. Same venue
  // 2. Same date
  // 3. Time overlaps
  // 4. Other event is Approved
  // =====================================================

  const checkVenueAvailability = () => {
    const venues = getVenues();

    const selectedVenue = venues.find(
      (venue) =>
        venue.name === event.venue
    );

    if (!selectedVenue) {
      alert(
        "The selected venue could not be found."
      );

      return false;
    }

    const conflictingEvent =
      events.find((otherEvent) => {
        // Do not compare event with itself.
        if (
          String(otherEvent.id) ===
          String(event.id)
        ) {
          return false;
        }

        // Only approved events reserve
        // a venue.
        if (
          otherEvent.status !==
          "Approved"
        ) {
          return false;
        }

        // Must be same venue.
        if (
          otherEvent.venue !==
          event.venue
        ) {
          return false;
        }

        // Must be same date.
        if (
          otherEvent.date !==
          event.date
        ) {
          return false;
        }

        // Check overlapping time.
        return hasTimeOverlap(
          event.startTime,
          event.endTime,
          otherEvent.startTime,
          otherEvent.endTime
        );
      });

    if (conflictingEvent) {
      alert(
        `Cannot approve this event. ${event.venue} is already booked for "${conflictingEvent.title}" on ${event.date} from ${conflictingEvent.startTime} to ${conflictingEvent.endTime}.`
      );

      return false;
    }

    return true;
  };

  // =====================================================
  // ALLOCATE RESOURCES
  // =====================================================

  const allocateResources = () => {
    const resources = getResources();

    const updatedResources =
      resources.map((resource) => {
        const requested =
          getRequestedResourceQuantity(
            resource.name
          );

        if (requested <= 0) {
          return resource;
        }

        return {
          ...resource,

          available: Math.max(
            Number(
              resource.available || 0
            ) - requested,
            0
          ),
        };
      });

    saveResources(updatedResources);
  };

  // =====================================================
  // BOOK VENUE
  //
  // venue.status is kept for the Estate
  // Manager display, but scheduling
  // decisions are now based on events.
  // =====================================================

  const bookVenue = () => {
    const venues = getVenues();

    const updatedVenues =
      venues.map((venue) => {
        if (
          venue.name === event.venue
        ) {
          return {
            ...venue,

            status: "Booked",

            bookedFor:
              event.title,

            bookedEventId:
              event.id,
          };
        }

        return venue;
      });

    saveVenues(updatedVenues);
  };

  // =====================================================
  // APPROVE EVENT
  // =====================================================

  const handleApprove = () => {
    if (
      event.status === "Approved" &&
      event.resourcesAllocated &&
      event.venueAllocated
    ) {
      alert(
        "This event has already been approved and allocated."
      );

      navigate(
        "/estate/approved"
      );

      return;
    }

    // First check date/time venue conflict.
    if (
      !checkVenueAvailability()
    ) {
      return;
    }

    // Then check resource quantities.
    if (
      !checkResourceAvailability()
    ) {
      return;
    }

    // Allocate resources.
    allocateResources();

    // Record venue booking.
    bookVenue();

    // Approve event.
    updateEventStatus(
      "Approved",
      {
        resourcesAllocated: true,

        resourcesAllocatedAt:
          new Date().toISOString(),

        venueAllocated: true,

        venueAllocatedAt:
          new Date().toISOString(),
      }
    );

    alert(
      "Event approved. Venue and resources allocated successfully."
    );

    navigate(
      "/estate/approved"
    );
  };

  // =====================================================
  // REJECT EVENT
  // =====================================================

  const handleReject = () => {
    if (!remarks.trim()) {
      alert(
        "Please enter a rejection reason before rejecting the event."
      );

      return;
    }

    updateEventStatus(
      "Rejected"
    );

    alert(
      "Event rejected successfully."
    );

    navigate(
      "/estate/rejected"
    );
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusClass = () => {
    if (
      event.status === "Approved"
    ) {
      return "approved";
    }

    if (
      event.status === "Rejected"
    ) {
      return "rejected";
    }

    return "pending";
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>
            Review Event Request
          </h2>

          <p>
            Review the event details before
            making a decision.
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
          <h4>
            {event.title}
          </h4>

          <div className="detail-row">
            <span>
              Submitted By
            </span>

            <strong>
              {event.createdByName ||
                "Club Representative"}
            </strong>
          </div>

          {event.createdByEmail && (
            <div className="detail-row">
              <span>
                Contact Email
              </span>

              <strong>
                {event.createdByEmail}
              </strong>
            </div>
          )}

          <div className="detail-row">
            <span>
              Event Type
            </span>

            <strong>
              {event.eventType || "-"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Date</span>

            <strong>
              {event.date || "-"}
            </strong>
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

            <strong>
              {event.venue || "-"}
            </strong>
          </div>

          <div className="detail-row">
            <span>
              Expected Participants
            </span>

            <strong>
              {event.expectedParticipants ||
                0}
            </strong>
          </div>

          <div className="detail-row">
            <span>Status</span>

            <span
              className={`status ${getStatusClass()}`}
            >
              {event.status ||
                "Pending"}
            </span>
          </div>
        </div>

        <div className="event-detail-card">
          <h4>
            Requested Resources
          </h4>

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
              <span>
                Microphones
              </span>

              <strong>
                {event.microphones ||
                  0}
              </strong>
            </div>
          </div>

          <div className="resource-detail">
            <i className="bi bi-projector"></i>

            <div>
              <span>
                Projectors
              </span>

              <strong>
                {event.projectors ||
                  0}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="event-detail-card mt-4">
        <h4>
          Description
        </h4>

        <p className="text-muted mb-0">
          {event.description ||
            "No description provided."}
        </p>
      </div>

      <div className="event-detail-card mt-4">
        <h4>
          Manager Remarks
        </h4>

        <p className="text-muted">
          Add an optional remark when
          approving. A reason is required
          when rejecting.
        </p>

        <textarea
          className="form-control"
          rows="4"
          placeholder="Enter manager remarks or rejection reason"
          value={remarks}
          onChange={(e) =>
            setRemarks(
              e.target.value
            )
          }
        />

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