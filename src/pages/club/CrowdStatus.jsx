import { useState } from "react";

import { getEvents } from "../../utils/eventStore";
import { getEventAttendance } from "../../utils/attendanceStore";

function CrowdStatus() {
  const approvedEvents = getEvents().filter(
    (event) => event.status === "Approved"
  );

  const [selectedEventId, setSelectedEventId] =
    useState(
      approvedEvents.length > 0
        ? String(approvedEvents[0].id)
        : ""
    );

  const selectedEvent = approvedEvents.find(
    (event) =>
      String(event.id) === String(selectedEventId)
  );

  const participants = selectedEventId
    ? getEventAttendance(selectedEventId)
    : [];

  const expectedParticipants = Number(
    selectedEvent?.expectedParticipants || 0
  );

  const checkedIn = participants.length;

  const percentage =
    expectedParticipants > 0
      ? Math.min(
          Math.round(
            (checkedIn / expectedParticipants) * 100
          ),
          100
        )
      : 0;

  let crowdStatus = "Low";

  if (percentage >= 100) {
    crowdStatus = "Full";
  } else if (percentage >= 80) {
    crowdStatus = "High";
  } else if (percentage >= 50) {
    crowdStatus = "Moderate";
  }

  const getCrowdClass = () => {
    if (
      crowdStatus === "High" ||
      crowdStatus === "Full"
    ) {
      return "crowd-high";
    }

    if (crowdStatus === "Moderate") {
      return "crowd-moderate";
    }

    return "crowd-low";
  };

  const getCrowdMessage = () => {
    if (crowdStatus === "Full") {
      return "The venue has reached the expected participant capacity. Control further entry carefully.";
    }

    if (crowdStatus === "High") {
      return "The venue is approaching full capacity. Monitor entry carefully.";
    }

    if (crowdStatus === "Moderate") {
      return "The event currently has a moderate crowd level.";
    }

    return "The venue currently has a low crowd level.";
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Crowd Status</h2>

          <p>
            Monitor event attendance and crowd level.
          </p>
        </div>
      </div>

      {approvedEvents.length === 0 ? (
        <div className="event-detail-card text-center py-5">
          <i
            className="bi bi-calendar-x"
            style={{ fontSize: "40px" }}
          ></i>

          <h4 className="mt-3">
            No Approved Events
          </h4>

          <p className="text-muted mb-0">
            Crowd status will be available after an
            event is approved.
          </p>
        </div>
      ) : (
        <>
          <div className="event-detail-card mb-4">
            <label className="form-label">
              Select Approved Event
            </label>

            <select
              className="form-select"
              value={selectedEventId}
              onChange={(e) =>
                setSelectedEventId(e.target.value)
              }
            >
              {approvedEvents.map((event) => (
                <option
                  key={event.id}
                  value={event.id}
                >
                  {event.title} - {event.date} -{" "}
                  {event.venue}
                </option>
              ))}
            </select>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-people"></i>
              </div>

              <div>
                <span>Expected</span>
                <h3>{expectedParticipants}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-person-check"></i>
              </div>

              <div>
                <span>Checked In</span>
                <h3>{checkedIn}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-percent"></i>
              </div>

              <div>
                <span>Occupancy</span>
                <h3>{percentage}%</h3>
              </div>
            </div>

            <div className="stat-card">
              <div
                className={`crowd-status-icon ${getCrowdClass()}`}
              >
                <i className="bi bi-activity"></i>
              </div>

              <div>
                <span>Crowd Level</span>
                <h3>{crowdStatus}</h3>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <div>
                <h4>
                  {selectedEvent?.title || "Event"}
                </h4>

                <p>
                  {selectedEvent?.venue || "-"} - Live
                  crowd overview
                </p>
              </div>

              <span
                className={`crowd-badge ${getCrowdClass()}`}
              >
                {crowdStatus}
              </span>
            </div>

            <div className="crowd-progress-container">
              <div className="crowd-progress-info">
                <span>Current Occupancy</span>

                <strong>
                  {checkedIn} / {expectedParticipants}
                </strong>
              </div>

              <div className="crowd-progress-bar">
                <div
                  className={`crowd-progress-fill ${getCrowdClass()}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="crowd-message mt-4">
              <i className="bi bi-info-circle"></i>

              <div>
                <strong>Current Status</strong>

                <p>{getCrowdMessage()}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CrowdStatus;