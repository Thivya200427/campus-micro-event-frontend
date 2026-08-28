const ATTENDANCE_KEY = "campus_attendance";

export function getAttendanceRecords() {
  const storedAttendance =
    localStorage.getItem(ATTENDANCE_KEY);

  if (!storedAttendance) {
    return {};
  }

  try {
    return JSON.parse(storedAttendance);
  } catch {
    return {};
  }
}

export function saveAttendanceRecords(records) {
  localStorage.setItem(
    ATTENDANCE_KEY,
    JSON.stringify(records)
  );
}

export function getEventAttendance(eventId) {
  const records = getAttendanceRecords();

  return records[String(eventId)] || [];
}

export function addParticipantToEvent(
  eventId,
  participant
) {
  const records = getAttendanceRecords();

  const eventKey = String(eventId);

  const currentParticipants =
    records[eventKey] || [];

  const existingParticipant =
    currentParticipants.find(
      (item) =>
        item.studentId
          ?.trim()
          .toLowerCase() ===
        participant.studentId
          ?.trim()
          .toLowerCase()
    );

  if (existingParticipant) {
    return {
      success: false,
      message:
        "This participant has already checked in.",
    };
  }

  const newParticipant = {
    id: Date.now(),

    ...participant,

    checkedInAt:
      new Date().toISOString(),
  };

  const updatedRecords = {
    ...records,

    [eventKey]: [
      ...currentParticipants,
      newParticipant,
    ],
  };

  saveAttendanceRecords(updatedRecords);

  return {
    success: true,
    participant: newParticipant,
  };
}