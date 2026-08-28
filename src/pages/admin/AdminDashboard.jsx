import { Link } from "react-router-dom";

import { getEvents } from "../../utils/eventStore";
import { getUsers } from "../../utils/userStore";
import { getVenues } from "../../utils/venueStore";
import { getResources } from "../../utils/resourceStore";
import { getEventAttendance } from "../../utils/attendanceStore";

function AdminDashboard() {
  const events = getEvents();
  const users = getUsers();
  const venues = getVenues();
  const resources = getResources();

  const totalEvents = events.length;

  const pendingEvents = events.filter(
    (event) => event.status === "Pending"
  ).length;

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  ).length;

  const rejectedEvents = events.filter(
    (event) => event.status === "Rejected"
  ).length;

  const cancelledEvents = events.filter(
    (event) => event.status === "Cancelled"
  ).length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const totalParticipants = events.reduce(
    (total, event) =>
      total + Number(event.expectedParticipants || 0),
    0
  );

  const totalCheckIns = events.reduce(
    (total, event) =>
      total + getEventAttendance(event.id).length,
    0
  );

  const totalVenues = venues.length;

  const bookedVenues = venues.filter(
    (venue) => venue.status === "Booked"
  ).length;

  const availableVenues = venues.filter(
    (venue) => venue.status === "Available"
  ).length;

  const totalResourceQuantity = resources.reduce(
    (total, resource) =>
      total + Number(resource.total || 0),
    0
  );

  const availableResourceQuantity =
    resources.reduce(
      (total, resource) =>
        total + Number(resource.available || 0),
      0
    );

  const allocatedResources = Math.max(
    totalResourceQuantity -
      availableResourceQuantity,
    0
  );

  const recentEvents = [...events]
    .sort((a, b) => {
      const aTime = new Date(
        a.createdAt || a.date || 0
      ).getTime();

      const bTime = new Date(
        b.createdAt || b.date || 0
      ).getTime();

      return bTime - aTime;
    })
    .slice(0, 5);

  const getStatusClass = (status) => {
    if (status === "Approved") {
      return "approved";
    }

    if (
      status === "Rejected" ||
      status === "Cancelled"
    ) {
      return "rejected";
    }

    return "pending";
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Admin Dashboard</h2>

          <p>
            Monitor overall system users, events,
            attendance, venues, and resources.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>Total Users</span>
            <h3>{users.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-person-check"></i>
          </div>

          <div>
            <span>Active Users</span>
            <h3>{activeUsers}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>Total Events</span>
            <h3>{totalEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Approved</span>
            <h3>{approvedEvents}</h3>
          </div>
        </div>
      </div>

      <div className="stats-grid mt-4">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending</span>
            <h3>{pendingEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>Rejected</span>
            <h3>{rejectedEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-calendar-x"></i>
          </div>

          <div>
            <span>Cancelled</span>
            <h3>{cancelledEvents}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-person-check-fill"></i>
          </div>

          <div>
            <span>Actual Check-Ins</span>
            <h3>{totalCheckIns}</h3>
          </div>
        </div>
      </div>

      <div className="stats-grid mt-4">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-building"></i>
          </div>

          <div>
            <span>Total Venues</span>
            <h3>{totalVenues}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-building-check"></i>
          </div>

          <div>
            <span>Booked Venues</span>
            <h3>{bookedVenues}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-building"></i>
          </div>

          <div>
            <span>Available Venues</span>
            <h3>{availableVenues}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <span>Allocated Resources</span>
            <h3>{allocatedResources}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-section mt-4">
        <div className="section-header">
          <div>
            <h4>Recent Events</h4>

            <p>
              Latest event activity in the system.
            </p>
          </div>

          <Link
            to="/admin/events"
            className="view-all-btn"
          >
            View All
          </Link>
        </div>

        {recentEvents.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-calendar-x"
              style={{
                fontSize: "44px",
                color: "#94a3b8",
              }}
            ></i>

            <h5 className="mt-3">
              No Events Found
            </h5>

            <p className="text-muted">
              Event activity will appear here.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table dashboard-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Participants</th>
                  <th>Checked In</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>

                    <td>{event.date || "-"}</td>

                    <td>{event.venue || "-"}</td>

                    <td>
                      {event.expectedParticipants || 0}
                    </td>

                    <td>
                      {
                        getEventAttendance(
                          event.id
                        ).length
                      }
                    </td>

                    <td>
                      <span
                        className={`status ${getStatusClass(
                          event.status
                        )}`}
                      >
                        {event.status || "Draft"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="dashboard-section mt-4">
        <div className="section-header">
          <div>
            <h4>System Summary</h4>

            <p>
              Overall users, event participation,
              venues, and resource status.
            </p>
          </div>
        </div>

        <div className="detail-row">
          <span>Total Registered Users</span>
          <strong>{users.length}</strong>
        </div>

        <div className="detail-row">
          <span>Active Users</span>
          <strong>{activeUsers}</strong>
        </div>

        <div className="detail-row">
          <span>Total Expected Participants</span>
          <strong>{totalParticipants}</strong>
        </div>

        <div className="detail-row">
          <span>Actual Participant Check-Ins</span>
          <strong>{totalCheckIns}</strong>
        </div>

        <div className="detail-row">
          <span>Total Event Requests</span>
          <strong>{totalEvents}</strong>
        </div>

        <div className="detail-row">
          <span>Approved Requests</span>
          <strong>{approvedEvents}</strong>
        </div>

        <div className="detail-row">
          <span>Rejected Requests</span>
          <strong>{rejectedEvents}</strong>
        </div>

        <div className="detail-row">
          <span>Cancelled Events</span>
          <strong>{cancelledEvents}</strong>
        </div>

        <div className="detail-row">
          <span>Total Venues</span>
          <strong>{totalVenues}</strong>
        </div>

        <div className="detail-row">
          <span>Booked Venues</span>
          <strong>{bookedVenues}</strong>
        </div>

        <div className="detail-row">
          <span>Total Resource Quantity</span>
          <strong>{totalResourceQuantity}</strong>
        </div>

        <div className="detail-row">
          <span>Available Resources</span>
          <strong>{availableResourceQuantity}</strong>
        </div>

        <div className="detail-row">
          <span>Allocated Resources</span>
          <strong>{allocatedResources}</strong>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;