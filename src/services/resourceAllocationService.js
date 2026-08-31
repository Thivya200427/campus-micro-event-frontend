import api from "./api";

const mapAllocation = (allocation) => ({
  ...allocation,
  status: allocation.status
    ? allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1).toLowerCase()
    : "Pending",
});

export async function getEventAllocations(eventId) {
  const response = await api.get(`/resource-allocations/event/${eventId}`);
  return response.data.map(mapAllocation);
}

export async function createResourceRequest(eventId, resourceId, quantity) {
  const response = await api.post("/resource-allocations", {
    event: { id: eventId },
    resource: { id: resourceId },
    requestedQuantity: Number(quantity),
    allocatedQuantity: 0,
    status: "PENDING",
  });
  return mapAllocation(response.data);
}
