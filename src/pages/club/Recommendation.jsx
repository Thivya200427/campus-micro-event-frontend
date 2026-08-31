import { useState } from "react";

import useEvents from "../../hooks/useEvents";
import useVenues from "../../hooks/useVenues";
import { getLoggedInUser } from "../../utils/authStore";
import useResources from "../../hooks/useResources";
import useAttendance from "../../hooks/useAttendance";

function Recommendation() {
  const loggedInUser = getLoggedInUser();
  const { events } = useEvents({ userId: loggedInUser?.id });

  // Only this Club Representative's approved events.
  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  );

  const { venues } = useVenues();
  const { resources } = useResources();
  const { getEventAttendance } = useAttendance();

  const [selectedEventId, setSelectedEventId] =
    useState("");

  const [result, setResult] = useState(null);

  const getAvailableResource = (name) => {
    const resource = resources.find(
      (item) =>
        item.name?.toLowerCase() ===
        name.toLowerCase()
    );

    return Number(resource?.available || 0);
  };

  const generateRecommendation = (e) => {
    e.preventDefault();

    if (!selectedEventId) {
      alert("Please select an approved event.");
      return;
    }

    const event = approvedEvents.find(
      (item) =>
        String(item.id) ===
        String(selectedEventId)
    );

    if (!event) {
      alert("Selected event could not be found.");
      return;
    }

    const expectedParticipants = Number(
      event.expectedParticipants || 0
    );

    const attendance =
      getEventAttendance(event.id);

    const checkedIn = attendance.length;

    const attendancePercentage =
      expectedParticipants > 0
        ? Math.round(
            (checkedIn /
              expectedParticipants) *
              100
          )
        : 0;

    let predictedAttendance =
      expectedParticipants;

    if (checkedIn > 0) {
      predictedAttendance = Math.max(
        checkedIn,
        Math.round(
          expectedParticipants *
            Math.max(
              attendancePercentage / 100,
              0.75
            )
        )
      );
    }

    const recommendedChairs =
      Math.ceil(
        predictedAttendance * 1.05
      );

    let recommendedMicrophones = 1;
    let recommendedProjectors = 1;
    let recommendedVolunteers = 2;

    if (predictedAttendance > 50) {
      recommendedMicrophones = 2;
      recommendedVolunteers = 4;
    }

    if (predictedAttendance > 100) {
      recommendedMicrophones = 3;
      recommendedProjectors = 2;
      recommendedVolunteers = 6;
    }

    if (predictedAttendance > 200) {
      recommendedMicrophones = 4;
      recommendedProjectors = 2;
      recommendedVolunteers = 8;
    }

    let risk = "Low";

    if (attendancePercentage >= 80) {
      risk = "High";
    } else if (
      attendancePercentage >= 50
    ) {
      risk = "Moderate";
    }

    const suitableVenues = venues
      .filter(
        (venue) =>
          Number(venue.capacity) >=
          predictedAttendance
      )
      .sort(
        (a, b) =>
          Number(a.capacity) -
          Number(b.capacity)
      );

    const recommendedVenue =
      suitableVenues.length > 0
        ? suitableVenues[0]
        : null;

    const chairsAvailable =
      getAvailableResource("Chairs");

    const microphonesAvailable =
      getAvailableResource(
        "Microphones"
      );

    const projectorsAvailable =
      getAvailableResource(
        "Projectors"
      );

    const resourceWarnings = [];

    if (
      recommendedChairs >
      chairsAvailable
    ) {
      resourceWarnings.push(
        `Only ${chairsAvailable} chairs are currently available.`
      );
    }

    if (
      recommendedMicrophones >
      microphonesAvailable
    ) {
      resourceWarnings.push(
        `Only ${microphonesAvailable} microphones are currently available.`
      );
    }

    if (
      recommendedProjectors >
      projectorsAvailable
    ) {
      resourceWarnings.push(
        `Only ${projectorsAvailable} projectors are currently available.`
      );
    }

    setResult({
      eventTitle: event.title,
      eventType: event.eventType,
      expectedParticipants,
      checkedIn,
      attendancePercentage,
      predictedAttendance,
      chairs: recommendedChairs,
      microphones: recommendedMicrophones,
      projectors: recommendedProjectors,
      volunteers: recommendedVolunteers,
      risk,
      recommendedVenue,
      resourceWarnings,
    });
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>
            Attendance Recommendation
          </h2>

          <p>
            Generate attendance, venue,
            resource, and crowd recommendations
            for your approved events.
          </p>
        </div>
      </div>

      <div className="event-details-grid">
        <div className="event-detail-card">
          <h4>Select Event</h4>

          <form
            onSubmit={
              generateRecommendation
            }
          >
            <div className="mb-3">
              <label className="form-label">
                Approved Event
              </label>

              <select
                className="form-select"
                value={
                  selectedEventId
                }
                onChange={(e) => {
                  setSelectedEventId(
                    e.target.value
                  );

                  setResult(null);
                }}
                required
              >
                <option value="">
                  Select approved event
                </option>

                {approvedEvents.map(
                  (event) => (
                    <option
                      key={event.id}
                      value={event.id}
                    >
                      {event.title}
                      {" - "}
                      {event.date}
                      {" - "}
                      {event.venue}
                    </option>
                  )
                )}
              </select>
            </div>

            {approvedEvents.length ===
              0 && (
              <div className="alert alert-warning">
                You do not have any approved
                events available.
              </div>
            )}

            <button
              type="submit"
              className="btn primary-action w-100"
              disabled={
                approvedEvents.length ===
                0
              }
            >
              <i className="bi bi-stars me-2"></i>
              Generate Recommendation
            </button>
          </form>
        </div>

        <div className="event-detail-card">
          <h4>
            Recommendation Result
          </h4>

          {!result ? (
            <p className="text-muted">
              Select one of your approved
              events to generate a recommendation.
            </p>
          ) : (
            <>
              <div className="detail-row">
                <span>Event</span>

                <strong>
                  {result.eventTitle}
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Expected Participants
                </span>

                <strong>
                  {
                    result.expectedParticipants
                  }
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Current Check-In
                </span>

                <strong>
                  {result.checkedIn}
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Attendance Rate
                </span>

                <strong>
                  {
                    result.attendancePercentage
                  }
                  %
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Predicted Attendance
                </span>

                <strong>
                  {
                    result.predictedAttendance
                  }
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Recommended Venue
                </span>

                <strong>
                  {result.recommendedVenue
                    ? `${result.recommendedVenue.name} (${result.recommendedVenue.capacity})`
                    : "No suitable venue"}
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Recommended Chairs
                </span>

                <strong>
                  {result.chairs}
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Microphones
                </span>

                <strong>
                  {
                    result.microphones
                  }
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Projectors
                </span>

                <strong>
                  {
                    result.projectors
                  }
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Volunteers
                </span>

                <strong>
                  {
                    result.volunteers
                  }
                </strong>
              </div>

              <div className="detail-row">
                <span>Crowd Risk</span>

                <span
                  className={`status ${
                    result.risk === "High"
                      ? "rejected"
                      : result.risk ===
                        "Moderate"
                      ? "pending"
                      : "approved"
                  }`}
                >
                  {result.risk}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {result &&
        result.resourceWarnings
          .length > 0 && (
          <div className="alert alert-warning mt-4">
            <strong>
              Resource Availability Warning
            </strong>

            <ul className="mb-0 mt-2">
              {result.resourceWarnings.map(
                (warning, index) => (
                  <li key={index}>
                    {warning}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

    </div>
  );
}

export default Recommendation;
