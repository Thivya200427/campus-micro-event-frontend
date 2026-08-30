import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getEvents,
  getMyEvents,
} from "../../utils/eventStore";

import { getEventAttendance } from "../../utils/attendanceStore";

function Reports() {
  const allEvents = getEvents();
  const myEvents = getMyEvents();

  // Temporary support for old events created before ownership was added.
  const legacyEvents = allEvents.filter(
    (event) =>
      event.createdBy === undefined ||
      event.createdBy === null
  );

  const events = [
    ...myEvents,
    ...legacyEvents.filter(
      (legacyEvent) =>
        !myEvents.some(
          (myEvent) =>
            String(myEvent.id) ===
            String(legacyEvent.id)
        )
    ),
  ];

  const totalEvents = events.length;

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  );

  const pendingEvents = events.filter(
    (event) => event.status === "Pending"
  );

  const rejectedEvents = events.filter(
    (event) => event.status === "Rejected"
  );

  const cancelledEvents = events.filter(
    (event) => event.status === "Cancelled"
  );

  const totalExpectedParticipants = events.reduce(
    (total, event) =>
      total + Number(event.expectedParticipants || 0),
    0
  );

  const approvedExpectedParticipants =
    approvedEvents.reduce(
      (total, event) =>
        total +
        Number(event.expectedParticipants || 0),
      0
    );

  const totalCheckedIn = approvedEvents.reduce(
    (total, event) =>
      total + getEventAttendance(event.id).length,
    0
  );

  const attendanceRate =
    approvedExpectedParticipants > 0
      ? Math.round(
          (totalCheckedIn /
            approvedExpectedParticipants) *
            100
        )
      : 0;

  const venuesUsed = new Set(
    approvedEvents
      .filter((event) => event.venue)
      .map((event) => event.venue)
  ).size;

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

  const monthlyEventMap = {};

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

    const month = monthNames[date.getMonth()];

    monthlyEventMap[month] =
      (monthlyEventMap[month] || 0) + 1;
  });

  const chartData = monthNames
    .map((month) => ({
      month,
      events: monthlyEventMap[month] || 0,
    }))
    .filter((item) => item.events > 0);

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
            <h3>{approvedEvents.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending</span>
            <h3>{pendingEvents.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <div>
            <span>Rejected</span>
            <h3>{rejectedEvents.length}</h3>
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
                {approvedEvents.length}
              </strong>
            </div>

            <div className="report-summary-item">
              <span>Pending Events</span>

              <strong>
                {pendingEvents.length}
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