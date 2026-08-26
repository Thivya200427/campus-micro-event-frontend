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
} from "recharts";

import { getEvents } from "../../utils/eventStore";
import { getUsers } from "../../utils/userStore";

function AdminReports() {
  const events = getEvents();
  const users = getUsers();

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

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

  const totalParticipants = events.reduce(
    (total, event) =>
      total + Number(event.expectedParticipants || 0),
    0
  );

  const monthlyMap = {};

  events.forEach((event) => {
    if (!event.date) {
      return;
    }

    const date = new Date(event.date);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const month = date.toLocaleString("en-US", {
      month: "short",
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = 0;
    }

    monthlyMap[month] += 1;
  });

  const monthlyEvents = Object.entries(monthlyMap).map(
    ([month, count]) => ({
      month,
      events: count,
    })
  );

  const statusData = [
    {
      name: "Approved",
      value: approvedEvents,
    },
    {
      name: "Pending",
      value: pendingEvents,
    },
    {
      name: "Rejected",
      value: rejectedEvents,
    },
  ];

  const pieColors = [
    "#0f766e",
    "#f59e0b",
    "#dc2626",
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Admin Reports</h2>

          <p>
            View overall system users, events and activity statistics.
          </p>
        </div>
      </div>

      {/* Statistics */}
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
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending</span>
            <h3>{pendingEvents}</h3>
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

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>Total Participants</span>
            <h3>{totalParticipants}</h3>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="report-grid">
        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Monthly Events</h4>

              <p>
                Number of events created for each month.
              </p>
            </div>
          </div>

          {monthlyEvents.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                No event data available for the chart.
              </p>
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart data={monthlyEvents}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="events"
                  fill="#0f766e"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Event Status</h4>

              <p>
                Current event approval distribution.
              </p>
            </div>
          </div>

          {totalEvents === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                No event status data available.
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
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {statusData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={pieColors[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="dashboard-section mt-4">
        <div className="section-header">
          <div>
            <h4>System Summary</h4>

            <p>
              User and event statistics.
            </p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Registered Users</td>
                <td>{totalUsers}</td>
                <td>
                  Total accounts registered in the system.
                </td>
              </tr>

              <tr>
                <td>Active Users</td>
                <td>{activeUsers}</td>
                <td>
                  Users currently allowed to sign in.
                </td>
              </tr>

              <tr>
                <td>
                  <span className="status approved">
                    Approved
                  </span>
                </td>

                <td>{approvedEvents}</td>

                <td>
                  Event requests approved by the Estate Manager.
                </td>
              </tr>

              <tr>
                <td>
                  <span className="status pending">
                    Pending
                  </span>
                </td>

                <td>{pendingEvents}</td>

                <td>
                  Event requests waiting for Estate Manager review.
                </td>
              </tr>

              <tr>
                <td>
                  <span className="status rejected">
                    Rejected
                  </span>
                </td>

                <td>{rejectedEvents}</td>

                <td>
                  Event requests rejected by the Estate Manager.
                </td>
              </tr>

              <tr>
                <td>Total Participants</td>
                <td>{totalParticipants}</td>
                <td>
                  Total expected participants across all events.
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