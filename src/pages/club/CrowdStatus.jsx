import { useEffect, useState } from "react";

import useEvents from "../../hooks/useEvents";
import { getLoggedInUser } from "../../utils/authStore";

import { getCrowdStatus } from "../../services/dashboardService";

function CrowdStatus() {
  const loggedInUser = getLoggedInUser();
  const { events } = useEvents({ userId: loggedInUser?.id });

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  );

  const [selectedEventId, setSelectedEventId] =
    useState(
      approvedEvents.length > 0
        ? String(approvedEvents[0].id)
        : ""
    );

  const activeEventId = selectedEventId || (approvedEvents[0] ? String(approvedEvents[0].id) : "");

  const selectedEvent = approvedEvents.find(
    (event) =>
      String(event.id) === String(activeEventId)
  );

  const [crowdData, setCrowdData] = useState({
    attendance: 0,
    venueCapacity: 0,
    occupancyPercentage: 0,
    status: "Safe",
    recommendation: "Crowd data will appear after check-in.",
  });

  useEffect(() => {
    if (!activeEventId) return;
    getCrowdStatus(activeEventId).then(setCrowdData).catch(() => {
      setCrowdData({ attendance: 0, venueCapacity: 0, occupancyPercentage: 0, status: "Safe", recommendation: "Unable to load crowd information right now." });
    });
  }, [activeEventId]);

  const checkedIn = crowdData.attendance;
  const venueCapacity = crowdData.venueCapacity;
  const percentage = crowdData.occupancyPercentage;
  const crowdStatus = crowdData.status;

  const getCrowdClass = () => {
    if (
      crowdStatus === "High" ||
      crowdStatus === "Critical"
    ) {
      return "crowd-high";
    }

    if (crowdStatus === "Moderate") {
      return "crowd-moderate";
    }

    return "crowd-low";
  };

  const getCrowdMessage = () => {
    return crowdData.recommendation;
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Crowd Status</h2>

          <p>
            Monitor attendance and crowd levels for your approved events.
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
            Crowd status will be available after one of your
            events is approved.
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
              value={activeEventId}
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
                <span>Venue Capacity</span>
                <h3>{venueCapacity}</h3>
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
                  {selectedEvent?.venue || "-"} - Live crowd overview
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
                  {checkedIn} / {venueCapacity}
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
