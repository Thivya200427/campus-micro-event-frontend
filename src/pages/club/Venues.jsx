import useVenues from "../../hooks/useVenues";
import { useNavigate } from "react-router-dom";

function Venues() {
  const { venues } = useVenues();
  const navigate = useNavigate();

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Venues</h2>
          <p>View campus venues and their availability.</p>
        </div>
      </div>

      {venues.length === 0 ? (
        <div className="dashboard-section text-center py-5">
          <i className="bi bi-building" style={{ fontSize: "44px", color: "#94a3b8" }}></i>
          <h5 className="mt-3">No Venues Available</h5>
          <p className="text-muted mb-0">Campus venues will appear here once added.</p>
        </div>
      ) : <div className="venue-grid">
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
              onClick={() => navigate("/events/create", {
                state: { preferredVenueId: venue.id },
              })}
            >
              {venue.status === "Available"
                ? "Select Venue"
                : "Currently Booked"}
            </button>
          </div>
        ))}
      </div>}
    </div>
  );
}

export default Venues;
