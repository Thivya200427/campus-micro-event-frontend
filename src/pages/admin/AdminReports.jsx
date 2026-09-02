import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getEvents } from "../../services/eventService";
import { getUsers } from "../../services/userService";
import { getVenues } from "../../services/venueService";

export default function AdminReports() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        setError("");

        const [eventData, userData, venueData] = await Promise.all([
          getEvents(),
          getUsers(),
          getVenues(),
        ]);

        setEvents(Array.isArray(eventData) ? eventData : []);
        setUsers(Array.isArray(userData) ? userData : []);
        setVenues(Array.isArray(venueData) ? venueData : []);
      } catch (err) {
        console.error("Unable to load reports", err);
        setError("Unable to load report data.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const eventStatusData = useMemo(() => {
    const statusCounts = {};

    events.forEach((event) => {
      const status = event.status || "UNKNOWN";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));
  }, [events]);

  const clubUsers = users.filter(
    (user) => user.role?.toLowerCase() === "club"
  ).length;

  const estateUsers = users.filter(
    (user) => user.role?.toLowerCase() === "estate"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role?.toLowerCase() === "admin"
  ).length;

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <p className="text-muted mb-0">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Reports</h2>
          <p className="text-muted mb-0">
            Overview of campus event management data.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Total Events</p>
              <h3 className="fw-bold mb-0">{events.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Total Users</p>
              <h3 className="fw-bold mb-0">{users.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Total Venues</p>
              <h3 className="fw-bold mb-0">{venues.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Approved Events</p>
              <h3 className="fw-bold mb-0">
                {
                  events.filter(
                    (event) =>
                      event.status?.toUpperCase() === "APPROVED"
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Events by Status</h5>

              {eventStatusData.length === 0 ? (
                <p className="text-muted mb-0">No event data available.</p>
              ) : (
                <div style={{ width: "100%", height: 320 }}>
                  <ResponsiveContainer>
                    <BarChart data={eventStatusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#13877f" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Users by Role</h5>

              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Club Representatives</span>
                <strong>{clubUsers}</strong>
              </div>

              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Estate Managers</span>
                <strong>{estateUsers}</strong>
              </div>

              <div className="d-flex justify-content-between py-2">
                <span>System Admins</span>
                <strong>{adminUsers}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}