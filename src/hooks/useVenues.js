import { useEffect, useState } from "react";
import { getVenues } from "../services/venueService";

export default function useVenues() {
  const [venues, setVenues] = useState([]);

  const loadVenues = async () => setVenues(await getVenues());

  useEffect(() => {
    let active = true;
    getVenues().then((data) => active && setVenues(data)).catch(() => active && setVenues([]));
    return () => {
      active = false;
    };
  }, []);

  return { venues, setVenues, loadVenues };
}
