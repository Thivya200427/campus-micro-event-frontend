function VenueManagement() {
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
      status: "Booked",
    },
    {
      id: 3,
      name: "Auditorium",
      location: "Main Building",
      capacity: 300,
      status: "Available",
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
          <h2>Venue Management</h2>
          <p>Manage campus venues and capacities.</p>
        </div>

        <button className="btn primary-action">
          <i className="bi bi-plus-circle me-2"></i>
          Add Venue
        </button>
      </div>

      <div className="dashboard-section">
        <div className="table-responsive">
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Venue</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Action</th>
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

                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-2">
                      Edit
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Delete
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

export default VenueManagement;