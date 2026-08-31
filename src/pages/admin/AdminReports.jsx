import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";

import { getUsers } from "../../services/userService";
import useDashboardSummary from "../../hooks/useDashboardSummary";

function AdminReports() {
  const [users, setUsers] = useState([]);
  const summary = useDashboardSummary();

  useEffect(() => {
    getUsers().then(setUsers).catch(() => setUsers([]));
  }, []);

  // =====================================================
  // USER STATISTICS
  // =====================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status?.toUpperCase() === "ACTIVE"
  ).length;

  const inactiveUsers =
    totalUsers - activeUsers;

  // =====================================================
  // EVENT STATISTICS
  // =====================================================

  const totalEvents = summary.totalEvents;
  const approvedCount = summary.approvedEvents;
  const pendingCount = summary.pendingEvents;
  const rejectedCount = summary.rejectedEvents;
  const cancelledCount = summary.cancelledEvents;

  // =====================================================
  // PARTICIPANT / ATTENDANCE STATISTICS
  // =====================================================

  const totalParticipants = summary.expectedParticipants;
  const approvedExpectedParticipants = summary.approvedExpectedParticipants;
  const totalCheckIns = summary.totalAttendance;

  const attendanceRate =
    approvedExpectedParticipants > 0
      ? Math.round(
          (totalCheckIns /
            approvedExpectedParticipants) *
            100
        )
      : 0;

  // =====================================================
  // VENUE STATISTICS
  // =====================================================

  const totalVenues = summary.totalVenues;
  const bookedVenues = summary.venueUsage.reduce((total, venue) => total + venue.value, 0);
  const availableVenues = Math.max(totalVenues - summary.venueUsage.length, 0);

  // =====================================================
  // RESOURCE STATISTICS
  // =====================================================

  const totalResourceQuantity = summary.totalResourceQuantity;
  const availableResources = summary.availableResourceQuantity;
  const allocatedResources = summary.allocatedResourceQuantity;

  // =====================================================
  // MONTHLY EVENT CHART
  // =====================================================

  const monthlyEvents = summary.monthlyEvents;

  // =====================================================
  // EVENT STATUS CHART
  // =====================================================

  const statusData = [
    {
      name: "Approved",
      value: approvedCount,
    },
    {
      name: "Pending",
      value: pendingCount,
    },
    {
      name: "Rejected",
      value: rejectedCount,
    },
    {
      name: "Cancelled",
      value: cancelledCount,
    },
  ];

  const pieColors = [
    "#0f766e",
    "#f59e0b",
    "#dc2626",
    "#64748b",
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>
            Admin Reports
          </h2>

          <p>
            View complete system users,
            events, attendance, venues and
            resource statistics.
          </p>
        </div>
      </div>

      {/* =================================================
          MAIN STATISTICS
      ================================================= */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>Total Users</span>
            <h3>{totalUsers}</h3>
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
            <h3>{approvedCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending</span>
            <h3>{pendingCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>Rejected</span>
            <h3>{rejectedCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-calendar-x"></i>
          </div>

          <div>
            <span>Cancelled</span>
            <h3>{cancelledCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-person-check-fill"></i>
          </div>

          <div>
            <span>
              Actual Check-Ins
            </span>

            <h3>
              {totalCheckIns}
            </h3>
          </div>
        </div>
      </div>

      {/* =================================================
          CHARTS
      ================================================= */}

      <div className="report-grid">
        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>
                Monthly Events
              </h4>

              <p>
                Number of system events
                scheduled for each month.
              </p>
            </div>
          </div>

          {monthlyEvents.length ===
          0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                No event data available
                for the chart.
              </p>
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart
                data={
                  monthlyEvents
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                />

                <YAxis
                  allowDecimals={
                    false
                  }
                />

                <Tooltip />

                <Bar
                  dataKey="events"
                  name="Events"
                  fill="#0f766e"
                  radius={[
                    5,
                    5,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>
                Event Status
              </h4>

              <p>
                Current system event
                status distribution.
              </p>
            </div>
          </div>

          {totalEvents === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                No event status data
                available.
              </p>
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                  label={({
                    name,
                    value,
                  }) =>
                    value > 0
                      ? `${name}: ${value}`
                      : ""
                  }
                >
                  {statusData.map(
                    (
                      item,
                      index
                    ) => (
                      <Cell
                        key={
                          item.name
                        }
                        fill={
                          pieColors[
                            index
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* =================================================
          SYSTEM SUMMARY
      ================================================= */}

      <div className="dashboard-section mt-4">
        <div className="section-header">
          <div>
            <h4>
              System Summary
            </h4>

            <p>
              Complete system activity
              and resource overview.
            </p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>
                  Category
                </th>

                <th>
                  Total
                </th>

                <th>
                  Description
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  Registered Users
                </td>

                <td>
                  {totalUsers}
                </td>

                <td>
                  Total user accounts
                  registered in the
                  system.
                </td>
              </tr>

              <tr>
                <td>
                  Active Users
                </td>

                <td>
                  {activeUsers}
                </td>

                <td>
                  Users currently
                  allowed to sign in.
                </td>
              </tr>

              <tr>
                <td>
                  Inactive Users
                </td>

                <td>
                  {inactiveUsers}
                </td>

                <td>
                  User accounts
                  currently disabled.
                </td>
              </tr>

              <tr>
                <td>
                  Total Event Requests
                </td>

                <td>
                  {totalEvents}
                </td>

                <td>
                  All event requests
                  submitted by Club
                  Representatives.
                </td>
              </tr>

              <tr>
                <td>
                  <span className="status approved">
                    Approved
                  </span>
                </td>

                <td>
                  {approvedCount}
                </td>

                <td>
                  Events approved by
                  the Estate Manager.
                </td>
              </tr>

              <tr>
                <td>
                  <span className="status pending">
                    Pending
                  </span>
                </td>

                <td>
                  {pendingCount}
                </td>

                <td>
                  Events awaiting
                  Estate Manager
                  review.
                </td>
              </tr>

              <tr>
                <td>
                  <span className="status rejected">
                    Rejected
                  </span>
                </td>

                <td>
                  {rejectedCount}
                </td>

                <td>
                  Events rejected by
                  the Estate Manager.
                </td>
              </tr>

              <tr>
                <td>
                  Cancelled Events
                </td>

                <td>
                  {cancelledCount}
                </td>

                <td>
                  Approved events
                  cancelled by Club
                  Representatives.
                </td>
              </tr>

              <tr>
                <td>
                  Expected Participants
                </td>

                <td>
                  {totalParticipants}
                </td>

                <td>
                  Total expected
                  participants across
                  all event requests.
                </td>
              </tr>

              <tr>
                <td>
                  Actual Check-Ins
                </td>

                <td>
                  {totalCheckIns}
                </td>

                <td>
                  Participants actually
                  checked into approved
                  events.
                </td>
              </tr>

              <tr>
                <td>
                  Attendance Rate
                </td>

                <td>
                  {attendanceRate}%
                </td>

                <td>
                  Actual check-ins
                  compared with expected
                  participants for
                  currently approved
                  events.
                </td>
              </tr>

              <tr>
                <td>
                  Total Venues
                </td>

                <td>
                  {totalVenues}
                </td>

                <td>
                  Total campus venues
                  managed by the
                  system.
                </td>
              </tr>

              <tr>
                <td>
                  Booked Venues
                </td>

                <td>
                  {bookedVenues}
                </td>

                <td>
                  Venues with active
                  booking records.
                </td>
              </tr>

              <tr>
                <td>
                  Available Venues
                </td>

                <td>
                  {availableVenues}
                </td>

                <td>
                  Venues currently
                  marked available.
                </td>
              </tr>

              <tr>
                <td>
                  Total Resource
                  Quantity
                </td>

                <td>
                  {
                    totalResourceQuantity
                  }
                </td>

                <td>
                  Total quantity of all
                  campus resources.
                </td>
              </tr>

              <tr>
                <td>
                  Allocated Resources
                </td>

                <td>
                  {allocatedResources}
                </td>

                <td>
                  Resource quantities
                  allocated to approved
                  events.
                </td>
              </tr>

              <tr>
                <td>
                  Available Resources
                </td>

                <td>
                  {availableResources}
                </td>

                <td>
                  Resource quantities
                  currently available
                  for future events.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;
