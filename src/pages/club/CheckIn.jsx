import { useState } from "react";

function CheckIn() {
  const [studentId, setStudentId] = useState("");

  const [participants, setParticipants] = useState([
    {
      id: 1,
      studentId: "DBI001",
      name: "Student One",
      time: "9:05 AM",
    },
    {
      id: 2,
      studentId: "DBI002",
      name: "Student Two",
      time: "9:12 AM",
    },
  ]);

  const handleCheckIn = (e) => {
    e.preventDefault();

    if (!studentId.trim()) {
      return;
    }

    const newParticipant = {
      id: participants.length + 1,
      studentId: studentId,
      name: "Participant",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setParticipants([...participants, newParticipant]);

    setStudentId("");
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Participant Check-In</h2>

          <p>
            Record participant attendance for approved events.
          </p>
        </div>
      </div>

      <div className="checkin-grid">
        <div className="event-detail-card">
          <h4>Web Development Workshop</h4>

          <div className="detail-row">
            <span>Venue</span>
            <strong>Main Hall</strong>
          </div>

          <div className="detail-row">
            <span>Expected Participants</span>
            <strong>80</strong>
          </div>

          <div className="detail-row">
            <span>Checked In</span>
            <strong>{participants.length}</strong>
          </div>

          <div className="detail-row">
            <span>Remaining</span>
            <strong>{80 - participants.length}</strong>
          </div>
        </div>

        <div className="event-detail-card">
          <h4>Check In Participant</h4>

          <form onSubmit={handleCheckIn}>
            <label className="form-label">
              Student / Participant ID
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Example: DBI003"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

            <button
              type="submit"
              className="btn primary-action w-100 mt-3"
            >
              <i className="bi bi-person-check me-2"></i>
              Check In
            </button>
          </form>
        </div>
      </div>

      <div className="dashboard-section mt-4">
        <div className="section-header">
          <div>
            <h4>Attendance List</h4>
            <p>Participants checked into this event.</p>
          </div>

          <span className="badge bg-success">
            {participants.length} Present
          </span>
        </div>

        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Participant ID</th>
                <th>Name</th>
                <th>Check-In Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((participant, index) => (
                <tr key={participant.id}>
                  <td>{index + 1}</td>

                  <td>{participant.studentId}</td>

                  <td>{participant.name}</td>

                  <td>{participant.time}</td>

                  <td>
                    <span className="status approved">
                      Present
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;