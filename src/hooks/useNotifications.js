import { useEffect, useState } from "react";
import { getUserNotifications } from "../services/notificationService";

export default function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    setNotifications(userId ? await getUserNotifications(userId) : []);
  };

  useEffect(() => {
    let active = true;
    if (!userId) return undefined;
    getUserNotifications(userId)
      .then((data) => active && setNotifications(data))
      .catch(() => active && setNotifications([]));
    return () => { active = false; };
  }, [userId]);

  return { notifications, setNotifications, loadNotifications };
}
