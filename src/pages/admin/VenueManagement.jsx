import { useState } from "react";

import {
  getVenues,
  addVenue,
  updateVenue,
  deleteVenue,
} from "../../utils/venueStore";

function VenueManagement() {
  const [venues, setVenues] = useState(getVenues());

  const [showForm, setShowForm] = useState(false);

  const [editingVenue, setEditingVenue] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    status: "Available",
  });

  const refreshVenues = () => {
    setVenues(getVenues());
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      capacity: "",
      status: "Available",
    });

    setEditingVenue(null);
    setShowForm(false);
  };

  const handleAddClick = () => {
    setEditingVenue(null);

    setFormData({
      name: "",
      location: "",
      capacity: "",
      status: "Available",
    });

    setShowForm(true);
  };

  const handleEdit = (venue) => {
    setEditingVenue(venue);

    setFormData({
      name: venue.name,
      location: venue.location,
      capacity: venue.capacity,
      status: venue.status,
    });

    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.capacity
    ) {
      alert("Please fill all venue details.");
      return;
    }

    const venueData = {
      name: formData.name.trim(),
      location: formData.location.trim(),
      capacity: Number(formData.capacity),
      status: formData.status,
    };

    if (editingVenue) {
      updateVenue(editingVenue.id, venueData);

      alert("Venue updated successfully.");
    } else {
      addVenue(venueData);

      alert("Venue added successfully.");
    }

    refreshVenues();
    resetForm();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (!confirmed) {
      return;
    }

    deleteVenue(id);

    refreshVenues();

    alert("Venue deleted successfully.");
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Venue Management</h2>
          <p>Manage campus venues and capacities.</p>
        </div>

        <button
          type="button"
          className="btn primary-action"
          onClick={handleAddClick}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Venue
        </button>
      </div>

      {showForm && (
        <div className="dashboard-section mb-4">
          <h4>
            {editingVenue ? "Edit Venue" : "Add New Venue"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  Venue Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter venue name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Capacity
                </label>

                <input
                  type="number"
                  name="capacity"
                  className="form-control"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  placeholder="Enter capacity"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Booked">
                    Booked
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button
                type="submit"
                className="btn btn-success"
              >
                {editingVenue
                  ? "Update Venue"
                  : "Save Venue"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() =>
                          handleEdit(venue)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleDelete(venue.id)
                        }
                      >
                        Delete
                      </button>
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

export default VenueManagement;