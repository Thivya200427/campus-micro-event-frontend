function AllEvents() {
  const events = [
    {
      id: 1,
      title: "Web Development Workshop",
      club: "IT Club",
      date: "25 Aug 2026",
      venue: "Main Hall",
      participants: 80,
      status: "Approved",
    },
    {
      id: 2,
      title: "AI Awareness Seminar",
      club: "IT Club",
      date: "29 Aug 2026",
      venue: "Conference Hall",
      participants: 120,
      status: "Pending",
    },
    {
      id: 3,
      title: "Photography Workshop",
      club: "Photography Club",
      date: "09 Sep 2026",
      venue: "Room B12",
      participants: 45,
      status: "Rejected",
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>All Events</h2>
          <p>View all event requests in the system.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Club</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Participants</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.club}</td>
                  <td>{event.date}</td>
                  <td>{event.venue}</td>
                  <td>{event.participants}</td>

                  <td>
                    <span
                      className={`status ${event.status.toLowerCase()}`}
                    >
                      {event.status}
                    </span>
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

export default AllEvents;