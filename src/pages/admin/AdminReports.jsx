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

function AdminReports() {
  const monthlyEvents = [
    { month: "Mar", events: 5 },
    { month: "Apr", events: 7 },
    { month: "May", events: 6 },
    { month: "Jun", events: 10 },
    { month: "Jul", events: 9 },
    { month: "Aug", events: 12 },
  ];

  const eventStatus = [
    { name: "Approved", value: 28 },
    { name: "Pending", value: 14 },
    { name: "Rejected", value: 7 },
  ];

  const pieColors = ["#0f766e", "#14b8a6", "#99f6e4"];

  return (
    <div>
      {/* Page Heading */}
      <div className="dashboard-title mb-4">
        <div>
          <h2>Admin Reports</h2>
          <p className="text-muted mb-0">
            View system statistics and event activity.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="fs-2 text-success">
                  <i className="bi bi-people"></i>
                </div>

                <div>
                  <p className="text-muted mb-1">Total Users</p>
                  <h3 className="mb-0">41</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="fs-2 text-success">
                  <i className="bi bi-calendar-event"></i>
                </div>

                <div>
                  <p className="text-muted mb-1">Total Events</p>
                  <h3 className="mb-0">49</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="fs-2 text-success">
                  <i className="bi bi-building"></i>
                </div>

                <div>
                  <p className="text-muted mb-1">Venues</p>
                  <h3 className="mb-0">8</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="fs-2 text-success">
                  <i className="bi bi-box-seam"></i>
                </div>

                <div>
                  <p className="text-muted mb-1">Resources</p>
                  <h3 className="mb-0">390</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4">
        {/* Bar Chart */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5>Monthly Events</h5>

              <p className="text-muted">
                Number of campus events created each month.
              </p>

              <div style={{ width: "100%", height: "300px" }}>
                <ResponsiveContainer>
                  <BarChart data={monthlyEvents}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="events"
                      fill="#13877d"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5>Event Status</h5>

              <p className="text-muted">
                Current event request status.
              </p>

              <div style={{ width: "100%", height: "300px" }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={eventStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      label
                    >
                      {eventStatus.map((item, index) => (
                        <Cell
                          key={item.name}
                          fill={pieColors[index]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h5 className="mb-3">Event Summary</h5>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Total Events</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <span className="badge bg-success">
                      Approved
                    </span>
                  </td>

                  <td>28</td>

                  <td>
                    Events approved by the Estate Manager.
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="badge bg-warning text-dark">
                      Pending
                    </span>
                  </td>

                  <td>14</td>

                  <td>
                    Events waiting for approval.
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="badge bg-danger">
                      Rejected
                    </span>
                  </td>

                  <td>7</td>

                  <td>
                    Event requests that were rejected.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;