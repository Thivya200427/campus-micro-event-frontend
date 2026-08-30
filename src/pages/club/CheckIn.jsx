import { useState } from "react";

import {
  getEvents,
  getMyEvents,
} from "../../utils/eventStore";

import {
  getEventAttendance,
  addParticipantToEvent,
} from "../../utils/attendanceStore";

function CheckIn() {
  const allEvents = getEvents();
  const myEvents = getMyEvents();

  // Temporary support for old events created before ownership was added.
  const legacyEvents = allEvents.filter(
    (event) =>
      event.createdBy === undefined ||
      event.createdBy === null
  );

  const events = [
    ...myEvents,
    ...legacyEvents.filter(
      (legacyEvent) =>
        !myEvents.some(
          (myEvent) =>
            String(myEvent.id) ===
            String(legacyEvent.id)
        )
    ),
  ];

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  );

  const [selectedEventId, setSelectedEventId] =
    useState(
      approvedEvents.length > 0
        ? String(approvedEvents[0].id)
        : ""
    );

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");

  const selectedEvent = approvedEvents.find(
    (event) =>
      String(event.id) === String(selectedEventId)
  );

  const [participants, setParticipants] = useState(
    selectedEventId
      ? getEventAttendance(selectedEventId)
      : []
  );

  const loadAttendance = (eventId) => {
    setParticipants(
      eventId
        ? getEventAttendance(eventId)
        : []
    );
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;

    setSelectedEventId(eventId);
    loadAttendance(eventId);

    setStudentId("");
    setStudentName("");
  };

  const handleCheckIn = (e) => {
    e.preventDefault();

    if (!selectedEventId) {
      alert("Please select an approved event.");
      return;
    }

    if (!studentId.trim()) {
      alert(
        "Please enter a Student / Participant ID."
      );
      return;
    }

    if (!studentName.trim()) {
      alert(
        "Please enter the participant name."
      );
      return;
    }

    const expectedParticipants = Number(
      selectedEvent?.expectedParticipants || 0
    );

    if (
      expectedParticipants > 0 &&
      participants.length >= expectedParticipants
    ) {
      alert(
        "Expected participant limit has already been reached."
      );
      return;
    }

    const duplicateParticipant =
      participants.some(
        (participant) =>
          String(participant.studentId)
            .trim()
            .toLowerCase() ===
          studentId.trim().toLowerCase()
      );

    if (duplicateParticipant) {
      alert(
        "This Participant ID has already been checked in."
      );
      return;
    }

    const result = addParticipantToEvent(
      selectedEventId,
      {
        studentId: studentId.trim(),
        name: studentName.trim(),
      }
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    loadAttendance(selectedEventId);

    setStudentId("");
    setStudentName("");

    alert("Participant checked in successfully.");
  };

  const expectedParticipants = Number(
    selectedEvent?.expectedParticipants || 0
  );

  const checkedInCount = participants.length;

  const remainingParticipants = Math.max(
    expectedParticipants - checkedInCount,
    0
  );

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Participant Check-In</h2>

          <p>
            Record participant attendance for your approved
            events.
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
            Your event must be approved before participant
            check-in can begin.
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
              onChange={handleEventChange}
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

          <div className="checkin-grid">
            <div className="event-detail-card">
              <h4>
                {selectedEvent?.title ||
                  "Selected Event"}
              </h4>

              <div className="detail-row">
                <span>Date</span>

                <strong>
                  {selectedEvent?.date || "-"}
                </strong>
              </div>

              <div className="detail-row">
                <span>Venue</span>

                <strong>
                  {selectedEvent?.venue || "-"}
                </strong>
              </div>

              <div className="detail-row">
                <span>
                  Expected Participants
                </span>

                <strong>
                  {expectedParticipants}
                </strong>
              </div>

              <div className="detail-row">
                <span>Checked In</span>

                <strong>
                  {checkedInCount}
                </strong>
              </div>

              <div className="detail-row">
                <span>Remaining</span>

                <strong>
                  {remainingParticipants}
                </strong>
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
                  onChange={(e) =>
                    setStudentId(e.target.value)
                  }
                />

                <label className="form-label mt-3">
                  Participant Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter participant name"
                  value={studentName}
                  onChange={(e) =>
                    setStudentName(e.target.value)
                  }
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

                <p>
                  Participants checked into this event.
                </p>
              </div>

              <span className="badge bg-success">
                {checkedInCount} Present
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
                  {participants.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center text-muted py-4"
                      >
                        No participants checked in yet.
                      </td>
                    </tr>
                  ) : (
                    participants.map(
                      (participant, index) => (
                        <tr key={participant.id}>
                          <td>{index + 1}</td>

                          <td>
                            {participant.studentId}
                          </td>

                          <td>
                            {participant.name}
                          </td>

                          <td>
                            {participant.checkedInAt
                              ? new Date(
                                  participant.checkedInAt
                                ).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : "-"}
                          </td>

                          <td>
                            <span className="status approved">
                              Present
                            </span>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckIn;