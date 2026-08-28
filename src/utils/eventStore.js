import { getLoggedInUser } from "./authStore";

const STORAGE_KEY = "campus_events";

export function getEvents() {
  const events = localStorage.getItem(
    STORAGE_KEY
  );

  if (!events) {
    return [];
  }

  try {
    return JSON.parse(events);
  } catch {
    return [];
  }
}

export function saveEvents(events) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(events)
  );
}

export function addEvent(event) {
  const events = getEvents();

  const loggedInUser =
    getLoggedInUser();

  const newEvent = {
    ...event,

    id: Date.now(),

    createdBy:
      loggedInUser?.id || null,

    createdByName:
      loggedInUser?.name ||
      "Club Representative",

    createdByEmail:
      loggedInUser?.email || "",

    createdAt:
      event.createdAt ||
      new Date().toISOString(),
  };

  const updatedEvents = [
    ...events,
    newEvent,
  ];

  saveEvents(updatedEvents);

  return newEvent;
}

export function getMyEvents() {
  const loggedInUser =
    getLoggedInUser();

  if (!loggedInUser) {
    return [];
  }

  const events = getEvents();

  return events.filter((event) => {
    return (
      String(event.createdBy) ===
      String(loggedInUser.id)
    );
  });
}

export function getEventById(id) {
  const events = getEvents();

  return events.find(
    (event) =>
      String(event.id) === String(id)
  );
}