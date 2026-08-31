import { useEffect, useState } from "react";
import { getAllAttendance } from "../services/attendanceService";

export default function useAttendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    let active = true;
    getAllAttendance().then((data) => active && setAttendance(data)).catch(() => active && setAttendance([]));
    return () => { active = false; };
  }, []);

  const getEventAttendance = (eventId) => attendance.filter(
    (record) => String(record.event?.id) === String(eventId)
  );

  return { attendance, getEventAttendance };
}
