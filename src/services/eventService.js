import api from "./api";

const displayStatus = (status = "") =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

export function mapEvent(event) {
  return {
    ...event,
    date: event.eventDate,
    status: displayStatus(event.status),
    createdBy: event.createdBy?.id,
    createdByName: event.createdBy?.name,
    createdByEmail: event.createdBy?.email,
    venueId: event.venue?.id,
    venue: event.venue?.name || "",
    managerRemarks: event.rejectionReason || "",
  };
}

export async function getEvents(status) {
  const response = await api.get("/events", {
    params: status ? { status: status.toUpperCase() } : {},
  });
  return Array.isArray(response.data) ? response.data.map(mapEvent) : [];
}

export async function getMyEvents(userId) {
  const response = await api.get(`/events/user/${userId}`);
  return Array.isArray(response.data) ? response.data.map(mapEvent) : [];
}

export async function getEvent(id) {
  const response = await api.get(`/events/${id}`);
  return mapEvent(response.data);
}

export async function createEvent(event, userId, venueId) {
  const response = await api.post("/events", {
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    eventDate: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    expectedParticipants: Number(event.expectedParticipants),
    status: event.status.toUpperCase(),
    createdBy: { id: userId },
    venue: venueId ? { id: venueId } : null,
  });
  return mapEvent(response.data);
}

export async function updateEvent(id, event) {
  const response = await api.put(`/events/${id}`, {
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    eventDate: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    expectedParticipants: Number(event.expectedParticipants),
    venue: event.venueId ? { id: event.venueId } : null,
  });
  return mapEvent(response.data);
}

export async function submitDraft(id, userId) {
  const response = await api.put(`/events/${id}/submit`, null, {
    params: { userId },
  });
  return mapEvent(response.data);
}

export async function approveEvent(id) {
  const response = await api.put(`/events/${id}/approve`);
  return mapEvent(response.data);
}

export async function rejectEvent(id, reason) {
  const response = await api.put(`/events/${id}/reject`, { reason });
  return mapEvent(response.data);
}

export async function cancelEvent(id, userId) {
  const response = await api.put(`/events/${id}/cancel`, null, {
    params: { userId },
  });
  return mapEvent(response.data);
}
