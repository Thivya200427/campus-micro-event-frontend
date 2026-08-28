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
import { getResources } from "../../utils/resourceStore";

function EstateReports() {
  const events = getEvents();
  const resources = getResources();

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  );

  const rejectedEvents = events.filter(
    (event) => event.status === "Rejected"
  );

  const cancelledEvents = events.filter(
    (event) => event.status === "Cancelled"
  );

  const pendingEvents = events.filter(
    (event) => event.status === "Pending"
  );

  const totalApproved = approvedEvents.length;
  const totalRejected = rejectedEvents.length;

  const venueBookings = approvedEvents.filter(
    (event) => event.venue
  ).length;

  const resourceAllocations =
    approvedEvents.reduce((total, event) => {
      return (
        total +
        Number(event.chairs || 0) +
        Number(event.microphones || 0) +
        Number(event.projectors || 0)
      );
    }, 0);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyMap = {};

  events.forEach((event) => {
    if (!event.date) {
      return;
    }

    const date = new Date(
      `${event.date}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const month =
      monthNames[date.getMonth()];

    if (!monthlyMap[month]) {
      monthlyMap[month] = {
        month,
        approved: 0,
        rejected: 0,
      };
    }

    if (event.status === "Approved") {
      monthlyMap[month].approved += 1;
    }

    if (event.status === "Rejected") {
      monthlyMap[month].rejected += 1;
    }
  });

  const monthlyData = monthNames
    .map((month) => {
      return (
        monthlyMap[month] || {
          month,
          approved: 0,
          rejected: 0,
        }
      );
    })
    .filter(
      (item) =>
        item.approved > 0 ||
        item.rejected > 0
    );

  const venueUsageMap = {};

  approvedEvents.forEach((event) => {
    if (!event.venue) {
      return;
    }

    venueUsageMap[event.venue] =
      (venueUsageMap[event.venue] || 0) + 1;
  });

  const venueData = Object.entries(
    venueUsageMap
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const totalResources = resources.reduce(
    (total, resource) =>
      total + Number(resource.total || 0),
    0
  );

  const availableResources =
    resources.reduce(
      (total, resource) =>
        total +
        Number(resource.available || 0),
      0
    );

  const currentlyAllocatedResources =
    Math.max(
      totalResources - availableResources,
      0
    );

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
              {pendingEvents.length}
            </strong>
          </div>

          <div className="report-summary-item">
            <span>Approved Events</span>

            <strong>
              {approvedEvents.length}
            </strong>
          </div>

          <div className="report-summary-item">
            <span>Rejected Events</span>

            <strong>
              {rejectedEvents.length}
            </strong>
          </div>

          <div className="report-summary-item">
            <span>Cancelled Events</span>

            <strong>
              {cancelledEvents.length}
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