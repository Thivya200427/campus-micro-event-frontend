import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export function getApiError(error, fallbackMessage) {
  const data = error.response?.data;
  return data?.message || (typeof data === "string" ? data : fallbackMessage);
}

export default api;
