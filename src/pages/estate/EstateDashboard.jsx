function EstateDashboard() {
  const pendingEvents = [
    {
      id: 1,
      title: "AI Awareness Seminar",
      club: "IT Club",
      date: "29 Aug 2026",
      venue: "Conference Hall",
      participants: 120,
    },
    {
      id: 2,
      title: "Career Guidance Session",
      club: "Student Union",
      date: "05 Sep 2026",
      venue: "Auditorium",
      participants: 150,
    },
    {
      id: 3,
      title: "Photography Workshop",
      club: "Photography Club",
      date: "09 Sep 2026",
      venue: "Room B12",
      participants: 45,
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Estate Manager Dashboard</h2>
          <p>
            Review event requests and manage campus venues and resources.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>

          <div>
            <span>Pending Requests</span>
            <h3>8</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Approved Events</span>
            <h3>18</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-building"></i>
          </div>

          <div>
            <span>Available Venues</span>
            <h3>6</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <span>Resource Requests</span>
            <h3>14</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Pending Event Requests</h4>
            <p>Event requests waiting for your review.</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Club</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Participants</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {pendingEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.club}</td>
                  <td>{event.date}</td>
                  <td>{event.venue}</td>
                  <td>{event.participants}</td>

                  <td>
                    <button className="btn btn-sm primary-action">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EstateDashboard;