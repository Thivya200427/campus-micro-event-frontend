const STORAGE_KEY = "campus_events";

export function getEvents() {
  const events = localStorage.getItem(STORAGE_KEY);

  if (!events) {
    return [];
  }

  return JSON.parse(events);
}

export function saveEvents(events) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(events)
  );
}

export function addEvent(event) {
  const events = getEvents();

  const newEvent = {
    ...event,
    id: Date.now(),
  };

  const updatedEvents = [
    ...events,
    newEvent,
  ];

  saveEvents(updatedEvents);

  return newEvent;
}