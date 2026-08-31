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

import useDashboardSummary from "../../hooks/useDashboardSummary";

function EstateReports() {
  const summary = useDashboardSummary();
  const totalApproved = summary.approvedEvents;
  const totalRejected = summary.rejectedEvents;
  const venueBookings = summary.venueUsage.reduce((total, venue) => total + venue.value, 0);
  const resourceAllocations = summary.totalResourceRequests;
  const monthlyData = summary.monthlyApprovals;
  const venueData = summary.venueUsage;
  const totalResources = summary.totalResourceQuantity;
  const availableResources = summary.availableResourceQuantity;
  const currentlyAllocatedResources = summary.allocatedResourceQuantity;
  const pendingCount = summary.pendingEvents;
  const approvedCount = summary.approvedEvents;
  const rejectedCount = summary.rejectedEvents;
  const cancelledCount = summary.cancelledEvents;

  const pieColors = [
    "#0f766e",
    "#14b8a6",
    "#2dd4bf",
    "#5eead4",
    "#99f6e4",
    "#115e59",
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Estate Reports</h2>

          <p>
            View approval, venue usage, and
            resource management statistics.
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
            <h3>{totalApproved}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>Total Rejected</span>
            <h3>{totalRejected}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-building"></i>
          </div>

          <div>
            <span>Venue Bookings</span>
            <h3>{venueBookings}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <span>
              Currently Allocated Resources
            </span>

            <h3>
              {currentlyAllocatedResources}
            </h3>
          </div>
        </div>
      </div>

      <div className="report-grid">
        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Approval Activity</h4>

              <p>
                Approved and rejected events by month.
              </p>
            </div>
          </div>

          {monthlyData.length === 0 ? (
            <div className="text-center text-muted py-5">
              No approval activity available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="approved"
                  fill="#0f766e"
                />

                <Bar
                  dataKey="rejected"
                  fill="#b91c1c"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="report-card">
          <div className="section-header">
            <div>
              <h4>Venue Usage</h4>

              <p>
                Most frequently used venues.
              </p>
            </div>
          </div>

          {venueData.length === 0 ? (
            <div className="text-center text-muted py-5">
              No approved venue bookings available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={320}
            >
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
                  {venueData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          pieColors[
                            index %
                              pieColors.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="dashboard-section mt-4">
        <div className="section-header">
          <div>
            <h4>
              Management Summary
            </h4>

            <p>
              Current system status overview.
            </p>
          </div>
        </div>

        <div className="report-summary-list">
          <div className="report-summary-item">
            <span>Pending Requests</span>

            <strong>
              {pendingCount}
            </strong>
          </div>

          <div className="report-summary-item">
            <span>Approved Events</span>

            <strong>
              {approvedCount}
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
              Total Resource Quantity
            </span>

            <strong>
              {totalResources}
            </strong>
          </div>

          <div className="report-summary-item">
            <span>
              Available Resources
            </span>

            <strong>
              {availableResources}
            </strong>
          </div>

          <div className="report-summary-item">
            <span>
              Currently Allocated
            </span>

            <strong>
              {currentlyAllocatedResources}
            </strong>
          </div>

          <div className="report-summary-item">
            <span>
              Total Resource Requests
            </span>

            <strong>
              {resourceAllocations}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstateReports;
