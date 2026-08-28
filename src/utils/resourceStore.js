const RESOURCES_KEY = "campus_resources";

const DEFAULT_RESOURCES = [
  {
    id: 1,
    name: "Chairs",
    category: "Furniture",
    total: 300,
    available: 220,
  },
  {
    id: 2,
    name: "Projectors",
    category: "Equipment",
    total: 8,
    available: 5,
  },
  {
    id: 3,
    name: "Microphones",
    category: "Audio",
    total: 12,
    available: 8,
  },
  {
    id: 4,
    name: "Speakers",
    category: "Audio",
    total: 10,
    available: 6,
  },
];

function initializeResources() {
  const storedResources = localStorage.getItem(RESOURCES_KEY);

  if (!storedResources) {
    localStorage.setItem(
      RESOURCES_KEY,
      JSON.stringify(DEFAULT_RESOURCES)
    );
  }
}

export function getResources() {
  initializeResources();

  const resources = localStorage.getItem(RESOURCES_KEY);

  if (!resources) {
    return [];
  }

  try {
    return JSON.parse(resources);
  } catch {
    return [];
  }
}

export function saveResources(resources) {
  localStorage.setItem(
    RESOURCES_KEY,
    JSON.stringify(resources)
  );
}

export function addResource(resource) {
  const resources = getResources();

  const newResource = {
    id: Date.now(),
    ...resource,
  };

  saveResources([...resources, newResource]);

  return newResource;
}

export function updateResource(id, updatedData) {
  const resources = getResources();

  const updatedResources = resources.map((resource) => {
    if (String(resource.id) === String(id)) {
      return {
        ...resource,
        ...updatedData,
      };
    }

    return resource;
  });

  saveResources(updatedResources);
}

export function deleteResource(id) {
  const resources = getResources();

  const updatedResources = resources.filter(
    (resource) => String(resource.id) !== String(id)
  );

  saveResources(updatedResources);
}