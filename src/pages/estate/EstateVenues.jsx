import useVenues from "../../hooks/useVenues";
import useEvents from "../../hooks/useEvents";

function EstateVenues() {
  const { venues } = useVenues();
  const { events } = useEvents({ status: "APPROVED" });

  const getBookedEvent = (venueName) => {
    const bookedEvent = events.find(
      (event) =>
        event.venue === venueName &&
        event.status === "Approved"
    );

    return bookedEvent ? bookedEvent.title : "-";
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Venue Availability</h2>
          <p>
            Check venue capacity, booking status, and current allocation.
          </p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h4>Campus Venues</h4>
            <p>
              Current venue availability for event planning.
            </p>
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
              {venues.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-muted py-4"
                  >
                    No venues available.
                  </td>
                </tr>
              ) : (
                venues.map((venue) => (
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
                      {venue.status === "Booked"
                        ? getBookedEvent(venue.name)
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EstateVenues;
