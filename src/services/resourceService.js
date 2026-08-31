import api from "./api";

const mapResource = (resource) => ({
  ...resource,
  total: resource.totalQuantity,
  available: resource.availableQuantity,
});

export async function getResources() {
  const response = await api.get("/resources");
  return response.data.map(mapResource);
}

export async function createResource(resource) {
  const response = await api.post("/resources", {
    name: resource.name,
    category: resource.category,
    totalQuantity: Number(resource.total),
    availableQuantity: Number(resource.available),
    status: "AVAILABLE",
  });
  return mapResource(response.data);
}

export async function updateResource(id, resource) {
  const response = await api.put(`/resources/${id}`, {
    name: resource.name,
    category: resource.category,
    totalQuantity: Number(resource.total),
    availableQuantity: Number(resource.available),
    status: resource.status || "AVAILABLE",
  });
  return mapResource(response.data);
}

export async function deleteResource(id) {
  await api.delete(`/resources/${id}`);
}
