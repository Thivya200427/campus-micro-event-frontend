import api from "./api";

export async function getDashboardSummary(userId) {
  const response = await api.get("/dashboard/summary", {
    params: userId ? { userId } : {},
  });
  return response.data;
}

export async function getCrowdStatus(eventId) {
  const response = await api.get(`/dashboard/crowd/${eventId}`);
  return response.data;
}
