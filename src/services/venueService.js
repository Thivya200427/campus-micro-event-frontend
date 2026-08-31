import api from "./api";

const mapVenue = (venue) => ({
  ...venue,
  status: venue.status
    ? venue.status.charAt(0).toUpperCase() + venue.status.slice(1).toLowerCase()
    : "Available",
});

export async function getVenues() {
  const response = await api.get("/venues");
  return response.data.map(mapVenue);
}

export async function createVenue(venue) {
  const response = await api.post("/venues", {
    ...venue,
    capacity: Number(venue.capacity),
    status: venue.status?.toUpperCase() || "AVAILABLE",
  });
  return mapVenue(response.data);
}

export async function updateVenue(id, venue) {
  const response = await api.put(`/venues/${id}`, {
    ...venue,
    capacity: Number(venue.capacity),
    status: venue.status?.toUpperCase(),
  });
  return mapVenue(response.data);
}

export async function deleteVenue(id) {
  await api.delete(`/venues/${id}`);
}
