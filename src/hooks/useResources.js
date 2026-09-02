import { useEffect, useState } from "react";
import { getResources } from "../services/resourceService";

export default function useResources() {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  const loadResources = async () => {
    try {
      const data = await getResources();
      setResources(data);
      setError(null);
    } catch (requestError) {
      console.error("Unable to load resources", requestError);
      setError(requestError);
      throw requestError;
    }
  };

  useEffect(() => {
    let active = true;
    getResources()
      .then((data) => {
        if (active) {
          setResources(data);
          setError(null);
        }
      })
      .catch((requestError) => {
        console.error("Unable to load resources", requestError);
        if (active) {
          setError(requestError);
        }
      });
    return () => { active = false; };
  }, []);

  return { resources, loadResources, error };
}
