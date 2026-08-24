import { useState } from "react";

function Recommendation() {
  const [participants, setParticipants] = useState("");
  const [eventType, setEventType] = useState("");
  const [result, setResult] = useState(null);

  const generateRecommendation = (e) => {
    e.preventDefault();

    const count = Number(participants);

    if (!count || count <= 0) {
      return;
    }

    let microphones = 1;
    let projectors = 1;
    let volunteers = 2;
    let risk = "Low";

    if (count > 50) {
      microphones = 2;
      volunteers = 4;
      risk = "Moderate";
    }

    if (count > 100) {
      microphones = 3;
      projectors = 2;
      volunteers = 6;
      risk = "High";
    }

    const chairs = Math.ceil(count * 1.05);

    setResult({
      predictedAttendance: count,
      chairs,
      microphones,
      projectors,
      volunteers,
      risk,
    });
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Attendance Recommendation</h2>
          <p>
            Generate a simple attendance and resource recommendation.
          </p>
        </div>
      </div>

      <div className="event-details-grid">
        <div className="event-detail-card">
          <h4>Enter Event Information</h4>

          <form onSubmit={generateRecommendation}>
            <div className="mb-3">
              <label className="form-label">
                Event Type
              </label>

              <select
                className="form-select"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
              >
                <option value="">
                  Select event type
                </option>

                <option value="Workshop">
                  Workshop
                </option>

                <option value="Seminar">
                  Seminar
                </option>

                <option value="Club Meeting">
                  Club Meeting
                </option>

                <option value="Competition">
                  Competition
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Expected Participants
              </label>

              <input
                type="number"
                className="form-control"
                placeholder="Example: 80"
                min="1"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn primary-action w-100"
            >
              <i className="bi bi-stars me-2"></i>
              Generate Recommendation
            </button>
          </form>
        </div>

        <div className="event-detail-card">
          <h4>Recommendation Result</h4>

          {!result ? (
            <p className="text-muted">
              Enter the event information to generate a recommendation.
            </p>
          ) : (
            <>
              <div className="detail-row">
                <span>Predicted Attendance</span>
                <strong>{result.predictedAttendance}</strong>
              </div>

              <div className="detail-row">
                <span>Recommended Chairs</span>
                <strong>{result.chairs}</strong>
              </div>

              <div className="detail-row">
                <span>Microphones</span>
                <strong>{result.microphones}</strong>
              </div>

              <div className="detail-row">
                <span>Projectors</span>
                <strong>{result.projectors}</strong>
              </div>

              <div className="detail-row">
                <span>Volunteers</span>
                <strong>{result.volunteers}</strong>
              </div>

              <div className="detail-row">
                <span>Crowd Risk</span>

                <span
                  className={`status ${
                    result.risk === "High"
                      ? "rejected"
                      : result.risk === "Moderate"
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

      <div className="event-detail-card mt-4">
        <h4>Prototype Notice</h4>

        <p className="text-muted mb-0">
          This is currently a rule-based recommendation prototype.
          It does not use a trained machine-learning model or external AI API.
        </p>
      </div>
    </div>
  );
}

export default Recommendation;