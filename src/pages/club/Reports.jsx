import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getLoggedInUser } from "../../utils/authStore";
import useDashboardSummary from "../../hooks/useDashboardSummary";

function Reports() {
  const loggedInUser = getLoggedInUser();
  const summary = useDashboardSummary(loggedInUser?.id);
  const totalEvents = summary.totalEvents;
  const approvedCount = summary.approvedEvents;
  const pendingCount = summary.pendingEvents;
  const rejectedCount = summary.rejectedEvents;
  const cancelledCount = summary.cancelledEvents;
  const totalExpectedParticipants = summary.expectedParticipants;
  const approvedExpectedParticipants = summary.approvedExpectedParticipants;
  const totalCheckedIn = summary.totalAttendance;

  const attendanceRate =
    approvedExpectedParticipants > 0
      ? Math.round(
          (totalCheckedIn /
            approvedExpectedParticipants) *
            100
        )
      : 0;

  const venuesUsed = summary.venueUsage.length;
  const chartData = summary.monthlyEvents;

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Reports</h2>

          <p>
            View statistics for your events and
            attendance activity.
          </p>
        </div>
      </div>

      <div className="stats-grid">
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
      </div>

      <div className="report-grid">
        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Monthly Events</h4>

              <p>
                Number of your events scheduled for each
                month.
              </p>
            </div>
          </div>

          <div className="chart-container">
            {chartData.length === 0 ? (
              <div className="text-center text-muted py-5">
                No event data available for the chart.
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="month" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar
                    dataKey="events"
                    fill="#0f766e"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Event Summary</h4>

              <p>
                Current statistics for your events and
                attendance.
              </p>
            </div>
          </div>

          <div className="report-summary-list">
            <div className="report-summary-item">
              <span>Approved Events</span>

              <strong>
                {approvedCount}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Pending Events</span>

              <strong>
                {pendingCount}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Rejected Events</span>

              <strong>
                {rejectedCount}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Cancelled Events</span>

              <strong>
                {cancelledCount}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>
                Expected Participants
              </span>

              <strong>
                {totalExpectedParticipants}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Actual Check-Ins</span>

              <strong>
                {totalCheckedIn}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Attendance Rate</span>

              <strong>
                {attendanceRate}%
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Venues Used</span>

              <strong>
                {venuesUsed}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
