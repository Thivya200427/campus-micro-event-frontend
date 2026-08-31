import api from "./api";

const mapAttendance = (attendance) => ({
  ...attendance,
  studentId: attendance.participantIdOrEmail,
  name: attendance.participantName,
  checkedInAt: attendance.checkInTime,
});

export async function getAllAttendance() {
  const response = await api.get("/attendance");
  return response.data.map(mapAttendance);
}

export async function getEventAttendance(eventId) {
  if (!eventId) return [];
  const response = await api.get(`/attendance/event/${eventId}`);
  return response.data.map(mapAttendance);
}

export async function checkIn(eventId, participant) {
  const response = await api.post("/attendance/check-in", {
    event: { id: eventId },
    participantName: participant.name,
    participantIdOrEmail: participant.studentId,
  });
  return mapAttendance(response.data);
}
