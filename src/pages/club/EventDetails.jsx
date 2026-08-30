import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getEvents,
  saveEvents,
} from "../../utils/eventStore";

import { getLoggedInUser } from "../../utils/authStore";

import {
  getResources,
  saveResources,
} from "../../utils/resourceStore";

import {
  getVenues,
  saveVenues,
} from "../../utils/venueStore";

import {
  addEventNotification,
} from "../../utils/notificationStore";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const loggedInUser = getLoggedInUser();
  const events = getEvents();

  const foundEvent = events.find(
    (item) => String(item.id) === String(id)
  );

  const isLegacyEvent =
    foundEvent &&
    (foundEvent.createdBy === undefined ||
      foundEvent.createdBy === null) &&
    !foundEvent.createdByEmail;

  const isOwnerById =
    foundEvent &&
    foundEvent.createdBy !== undefined &&
    foundEvent.createdBy !== null &&
    loggedInUser?.id !== undefined &&
    loggedInUser?.id !== null &&
    String(foundEvent.createdBy) ===
      String(loggedInUser.id);

  const isOwnerByEmail =
    foundEvent?.createdByEmail &&
    loggedInUser?.email &&
    foundEvent.createdByEmail.toLowerCase() ===
      loggedInUser.email.toLowerCase();

  const canViewEvent =
    Boolean(foundEvent) &&
    (isLegacyEvent ||
      isOwnerById ||
      isOwnerByEmail);

  const event = canViewEvent
    ? foundEvent
    : null;

  if (!event) {
    return (
      <div>
        <div className="dashboard-title">
          <div>
            <h2>Event Not Available</h2>

            <p>
              This event could not be found or you do not
              have permission to view it.
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

        <div className="event-detail-card">
          <div className="text-center py-4">
            <i
              className="bi bi-shield-lock"
              style={{ fontSize: "40px" }}
            ></i>

            <h4 className="mt-3">
              Event Access Restricted
            </h4>

            <p className="text-muted mb-0">
              Club Representatives can only view their own
              event requests.
            </p>
          </div>
        </div>
      </div>
    );
  }

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

    if (name === "speakers") {
      return Number(
        event.speakers || 0
      );
    }

    return 0;
  };

  const releaseResources = () => {
    if (!event.resourcesAllocated) {
      return;
    }

    const resources = getResources();

    const updatedResources =
      resources.map((resource) => {
        const quantity =
          getRequestedResourceQuantity(
            resource.name
          );

        if (quantity <= 0) {
          return resource;
        }

        const total =
          Number(resource.total || 0);

        const currentAvailable =
          Number(resource.available || 0);

        return {
          ...resource,

          available: Math.min(
            currentAvailable + quantity,
            total
          ),
        };
      });

    saveResources(updatedResources);
  };

  const releaseVenue = () => {
    if (!event.venueAllocated) {
      return;
    }

    const venues = getVenues();

    const updatedVenues =
      venues.map((venue) => {
        if (
          venue.name === event.venue
        ) {
          return {
            ...venue,

            status: "Available",

            bookedFor: "",
          };
        }

        return venue;
      });

    saveVenues(updatedVenues);
  };

  const cancelEvent = () => {
    const updatedEvents =
      events.map((item) => {
        if (
          String(item.id) ===
          String(event.id)
        ) {
          return {
            ...item,

            status: "Cancelled",

            resourcesAllocated: false,

            venueAllocated: false,

            cancelledAt:
              new Date().toISOString(),
          };
        }

        return item;
      });

    saveEvents(updatedEvents);
  };

  const createCancellationNotification =
    () => {
      addEventNotification({
        event,

        title: "Event Cancelled",

        message:
          `${event.title} has been cancelled. ` +
          "Allocated venue and resources have been released.",

        type: "warning",

        status: "Cancelled",
      });
    };

  const handleCancel = () => {
    if (
      event.status !== "Approved"
    ) {
      alert(
        "Only approved events can be cancelled."
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to cancel "${event.title}"?`
      );

    if (!confirmed) {
      return;
    }

    releaseResources();

    releaseVenue();

    cancelEvent();

    createCancellationNotification();

    alert(
      "Event cancelled successfully. Venue and resources have been released."
    );

    navigate("/events");
  };

  const getStatusClass = () => {
    if (
      event.status === "Approved"
    ) {
      return "approved";
    }

    if (
      event.status === "Rejected" ||
      event.status === "Cancelled"
    ) {
      return "rejected";
    }

    return "pending";
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Event Details</h2>

          <p>
            View complete information about your event
            request.
          </p>
        </div>

        <div className="d-flex gap-2">
          {event.status ===
            "Approved" && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel Event
            </button>
          )}

          <Link
            to="/events"
            className="btn btn-outline-secondary"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Link>
        </div>
      </div>

      <div className="event-details-grid">
        <div className="event-detail-card">
          <h4>{event.title}</h4>

          <div className="detail-row">
            <span>Event Type</span>

            <strong>
              {event.eventType ||
                "Not specified"}
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
              {event.status}
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

          {Number(event.speakers || 0) >
            0 && (
            <div className="resource-detail">
              <i className="bi bi-speaker"></i>

              <div>
                <span>Speakers</span>

                <strong>
                  {event.speakers || 0}
                </strong>
              </div>
            </div>
          )}
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

      {event.managerRemarks && (
        <div className="event-detail-card mt-4">
          <h4>
            Manager Remarks
          </h4>

          <p className="mb-0 text-muted">
            {event.managerRemarks}
          </p>
        </div>
      )}

      {event.status ===
        "Cancelled" && (
        <div className="alert alert-warning mt-4">
          <i className="bi bi-info-circle me-2"></i>

          This event has been cancelled. Allocated venue
          and resources have been released.
        </div>
      )}
    </div>
  );
}

export default EventDetails;