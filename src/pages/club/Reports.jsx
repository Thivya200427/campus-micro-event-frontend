import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const chartData = [
    { month: "Mar", events: 3 },
    { month: "Apr", events: 5 },
    { month: "May", events: 4 },
    { month: "Jun", events: 7 },
    { month: "Jul", events: 6 },
    { month: "Aug", events: 8 },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Reports</h2>
          <p>View event statistics and activity summary.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>Total Events</span>
            <h3>33</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Approved</span>
            <h3>22</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending</span>
            <h3>7</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>Rejected</span>
            <h3>4</h3>
          </div>
        </div>
      </div>

      <div className="report-grid">
        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Monthly Events</h4>
              <p>Number of events created each month.</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="events" fill="#0f766e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Event Summary</h4>
              <p>Current event request status.</p>
            </div>
          </div>

          <div className="report-summary-list">
            <div className="report-summary-item">
              <span>Approved Events</span>
              <strong>22</strong>
            </div>

            <div className="report-summary-item">
              <span>Pending Events</span>
              <strong>7</strong>
            </div>

            <div className="report-summary-item">
              <span>Rejected Events</span>
              <strong>4</strong>
            </div>

            <div className="report-summary-item">
              <span>Total Participants</span>
              <strong>1,240</strong>
            </div>

            <div className="report-summary-item">
              <span>Venues Used</span>
              <strong>4</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;