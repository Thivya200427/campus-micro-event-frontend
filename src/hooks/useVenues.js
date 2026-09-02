import { useEffect, useState } from "react";
import { getVenues } from "../services/venueService";

export default function useVenues() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  const loadVenues = async () => {
    try {
      const data = await getVenues();
      setVenues(data);
      setError(null);
    } catch (requestError) {
      console.error("Unable to load venues", requestError);
      setError(requestError);
      throw requestError;
    }
  };

  useEffect(() => {
    let active = true;
    getVenues()
      .then((data) => {
        if (active) {
          setVenues(data);
          setError(null);
        }
      })
      .catch((requestError) => {
        console.error("Unable to load venues", requestError);
        if (active) {
          setError(requestError);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { venues, setVenues, loadVenues, error };
}
