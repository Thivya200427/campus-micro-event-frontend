function CrowdStatus() {
  const expectedParticipants = 80;
  const checkedIn = 62;

  const percentage = Math.round(
    (checkedIn / expectedParticipants) * 100
  );

  let crowdStatus = "Low";

  if (percentage >= 80) {
    crowdStatus = "High";
  } else if (percentage >= 50) {
    crowdStatus = "Moderate";
  }

  const getCrowdClass = () => {
    if (crowdStatus === "High") {
      return "crowd-high";
    }

    if (crowdStatus === "Moderate") {
      return "crowd-moderate";
    }

    return "crowd-low";
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
          <div className={`crowd-status-icon ${getCrowdClass()}`}>
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
            <h4>Web Development Workshop</h4>

            <p>Main Hall - Live crowd overview</p>
          </div>

          <span className={`crowd-badge ${getCrowdClass()}`}>
            {crowdStatus}
          </span>
        </div>

        <div className="crowd-progress-container">
          <div className="crowd-progress-info">
            <span>Current Occupancy</span>
            <strong>{checkedIn} / {expectedParticipants}</strong>
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

            <p>
              {crowdStatus === "High"
                ? "The venue is approaching full capacity. Monitor entry carefully."
                : crowdStatus === "Moderate"
                ? "The event currently has a moderate crowd level."
                : "The venue currently has a low crowd level."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrowdStatus;