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

function EstateReports() {
  const monthlyData = [
    { month: "Mar", approved: 4, rejected: 1 },
    { month: "Apr", approved: 6, rejected: 2 },
    { month: "May", approved: 5, rejected: 1 },
    { month: "Jun", approved: 8, rejected: 2 },
    { month: "Jul", approved: 7, rejected: 1 },
    { month: "Aug", approved: 10, rejected: 3 },
  ];

  const venueData = [
    { name: "Main Hall", value: 10 },
    { name: "Conference Hall", value: 8 },
    { name: "Auditorium", value: 6 },
    { name: "Room B12", value: 5 },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Estate Reports</h2>
          <p>
            View approval, venue usage, and resource management statistics.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Total Approved</span>
            <h3>40</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>Total Rejected</span>
            <h3>10</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-building"></i>
          </div>

          <div>
            <span>Venue Bookings</span>
            <h3>29</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <span>Resource Allocations</span>
            <h3>74</h3>
          </div>
        </div>
      </div>

      <div className="report-grid">
        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Approval Activity</h4>
              <p>Approved and rejected events by month.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="approved" fill="#0f766e" />
              <Bar dataKey="rejected" fill="#b91c1c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Venue Usage</h4>
              <p>Most frequently used venues.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={venueData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {venueData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ["#0f766e", "#14b8a6", "#2dd4bf", "#5eead4"][
                        index % 4
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default EstateReports;
