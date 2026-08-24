function Venues() {
  const venues = [
    {
      id: 1,
      name: "Main Hall",
      location: "Ground Floor",
      capacity: 200,
      status: "Available",
    },
    {
      id: 2,
      name: "Conference Hall",
      location: "First Floor",
      capacity: 120,
      status: "Available",
    },
    {
      id: 3,
      name: "Auditorium",
      location: "Main Building",
      capacity: 300,
      status: "Booked",
    },
    {
      id: 4,
      name: "Room B12",
      location: "Block B",
      capacity: 50,
      status: "Available",
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Venues</h2>
          <p>View campus venues and their availability.</p>
        </div>
      </div>

      <div className="venue-grid">
        {venues.map((venue) => (
          <div className="venue-card" key={venue.id}>
            <div className="venue-card-header">
              <div className="venue-icon">
                <i className="bi bi-building"></i>
              </div>

              <span
                className={`venue-status ${
                  venue.status === "Available" ? "available" : "booked"
                }`}
              >
                {venue.status}
              </span>
            </div>

            <h4>{venue.name}</h4>

            <div className="venue-info">
              <div>
                <i className="bi bi-geo-alt"></i>
                <span>{venue.location}</span>
              </div>

              <div>
                <i className="bi bi-people"></i>
                <span>Capacity: {venue.capacity}</span>
              </div>
            </div>

            <button
              className="btn venue-button w-100"
              disabled={venue.status === "Booked"}
            >
              {venue.status === "Available"
                ? "Select Venue"
                : "Currently Booked"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Venues;