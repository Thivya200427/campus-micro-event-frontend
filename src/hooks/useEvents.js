import { useEffect, useState } from "react";
import { getEvents, getMyEvents } from "../services/eventService";

export default function useEvents({ userId, status } = {}) {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const data = userId ? await getMyEvents(userId) : await getEvents(status);
    setEvents(data);
  };

  useEffect(() => {
    let active = true;
    const request = userId ? getMyEvents(userId) : getEvents(status);
    request.then((data) => active && setEvents(data)).catch(() => active && setEvents([]));
    return () => {
      active = false;
    };
  }, [userId, status]);

  return { events, setEvents, loadEvents };
}
