function Dashboard() {
  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of your campus events and activities.</p>
        </div>

        <button className="btn primary-action">
          <i className="bi bi-plus-circle me-2"></i>
          Create Event
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>Total Events</span>
            <h3>12</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending Events</span>
            <h3>4</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Approved Events</span>
            <h3>6</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <span>Total Participants</span>
            <h3>420</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Recent Events</h4>
            <p>Your latest event requests</p>
          </div>

          <button className="view-all-btn">
            View All
          </button>
        </div>

        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Participants</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Web Development Workshop</td>
                <td>25 Aug 2026</td>
                <td>Main Hall</td>
                <td>80</td>
                <td>
                  <span className="status approved">
                    Approved
                  </span>
                </td>
              </tr>

              <tr>
                <td>AI Awareness Seminar</td>
                <td>29 Aug 2026</td>
                <td>Conference Hall</td>
                <td>120</td>
                <td>
                  <span className="status pending">
                    Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td>Photography Club Meeting</td>
                <td>02 Sep 2026</td>
                <td>Room B12</td>
                <td>35</td>
                <td>
                  <span className="status approved">
                    Approved
                  </span>
                </td>
              </tr>

              <tr>
                <td>Career Guidance Session</td>
                <td>05 Sep 2026</td>
                <td>Auditorium</td>
                <td>150</td>
                <td>
                  <span className="status draft">
                    Draft
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;