function EstateVenues() {
  const venues = [
    {
      id: 1,
      name: "Main Hall",
      capacity: 200,
      location: "Ground Floor",
      status: "Available",
      bookedFor: "-",
    },
    {
      id: 2,
      name: "Conference Hall",
      capacity: 120,
      location: "First Floor",
      status: "Booked",
      bookedFor: "AI Awareness Seminar",
    },
    {
      id: 3,
      name: "Auditorium",
      capacity: 300,
      location: "Main Building",
      status: "Available",
      bookedFor: "-",
    },
    {
      id: 4,
      name: "Room B12",
      capacity: 50,
      location: "Block B",
      status: "Booked",
      bookedFor: "Photography Workshop",
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Venue Availability</h2>
          <p>Check venue capacity, booking status, and current allocation.</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Campus Venues</h4>
            <p>Current venue availability for event planning.</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Venue</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Booked For</th>
              </tr>
            </thead>

            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.name}</td>
                  <td>{venue.location}</td>
                  <td>{venue.capacity}</td>

                  <td>
                    <span
                      className={`venue-status ${
                        venue.status === "Available"
                          ? "available"
                          : "booked"
                      }`}
                    >
                      {venue.status}
                    </span>
                  </td>

                  <td>{venue.bookedFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EstateVenues;