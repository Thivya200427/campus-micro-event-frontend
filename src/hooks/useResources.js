import { useEffect, useState } from "react";
import { getResources } from "../services/resourceService";

export default function useResources() {
  const [resources, setResources] = useState([]);
  const loadResources = async () => setResources(await getResources());

  useEffect(() => {
    let active = true;
    getResources().then((data) => active && setResources(data)).catch(() => active && setResources([]));
    return () => { active = false; };
  }, []);

  return { resources, loadResources };
}
