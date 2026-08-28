import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addEvent } from "../../utils/eventStore";
import { getVenues } from "../../utils/venueStore";
import { getResources } from "../../utils/resourceStore";

function CreateEvent() {
  const navigate = useNavigate();

  const venues = getVenues();
  const resources = getResources();

  const availableVenues = venues.filter(
    (venue) => venue.status === "Available"
  );

  const getResourceByName = (name) => {
    return resources.find(
      (resource) =>
        resource.name?.toLowerCase() === name.toLowerCase()
    );
  };

  const chairsResource = getResourceByName("Chairs");
  const microphonesResource = getResourceByName("Microphones");
  const projectorsResource = getResourceByName("Projectors");

  const chairsAvailable = Number(
    chairsResource?.available || 0
  );

  const microphonesAvailable = Number(
    microphonesResource?.available || 0
  );

  const projectorsAvailable = Number(
    projectorsResource?.available || 0
  );

  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    expectedParticipants: "",
    description: "",
    chairs: "",
    microphones: "",
    projectors: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEvent = () => {
    const expectedParticipants = Number(
      formData.expectedParticipants || 0
    );

    const requestedChairs = Number(
      formData.chairs || 0
    );

    const requestedMicrophones = Number(
      formData.microphones || 0
    );

    const requestedProjectors = Number(
      formData.projectors || 0
    );

    if (formData.endTime <= formData.startTime) {
      alert("End time must be later than start time.");
      return false;
    }

    const selectedVenue = venues.find(
      (venue) => venue.name === formData.venue
    );

    if (!selectedVenue) {
      alert("Please select a valid venue.");
      return false;
    }

    if (selectedVenue.status !== "Available") {
      alert(
        `${selectedVenue.name} is currently not available.`
      );
      return false;
    }

    if (
      expectedParticipants >
      Number(selectedVenue.capacity)
    ) {
      alert(
        `The selected venue capacity is ${selectedVenue.capacity}. Please reduce participants or choose a larger venue.`
      );
      return false;
    }

    if (requestedChairs > chairsAvailable) {
      alert(
        `Only ${chairsAvailable} chairs are currently available.`
      );
      return false;
    }

    if (
      requestedMicrophones >
      microphonesAvailable
    ) {
      alert(
        `Only ${microphonesAvailable} microphones are currently available.`
      );
      return false;
    }

    if (
      requestedProjectors >
      projectorsAvailable
    ) {
      alert(
        `Only ${projectorsAvailable} projectors are currently available.`
      );
      return false;
    }

    return true;
  };

  const saveEvent = (status) => {
    addEvent({
      ...formData,

      expectedParticipants: Number(
        formData.expectedParticipants || 0
      ),

      chairs: Number(
        formData.chairs || 0
      ),

      microphones: Number(
        formData.microphones || 0
      ),

      projectors: Number(
        formData.projectors || 0
      ),

      status,

      createdAt: new Date().toISOString(),
    });

    navigate("/events");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEvent()) {
      return;
    }

    saveEvent("Pending");

    alert(
      "Event request submitted successfully."
    );
  };

  const handleDraft = () => {
    if (!formData.title.trim()) {
      alert(
        "Please enter an event title first."
      );
      return;
    }

    saveEvent("Draft");
  };

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Create Event Request</h2>

          <p>
            Enter event details and request required resources.
          </p>
        </div>
      </div>

      <div className="event-form-card">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">

            <div className="col-md-6">
              <label className="form-label">
                Event Title
              </label>

              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Event Type
              </label>

              <select
                name="eventType"
                className="form-select"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select event type
                </option>

                <option value="Workshop">
                  Workshop
                </option>

                <option value="Seminar">
                  Seminar
                </option>

                <option value="Club Meeting">
                  Club Meeting
                </option>

                <option value="Competition">
                  Competition
                </option>

                <option value="Awareness Program">
                  Awareness Program
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Event Date
              </label>

              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                className="form-control"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                className="form-control"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Venue
              </label>

              <select
                name="venue"
                className="form-select"
                value={formData.venue}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select venue
                </option>

                {availableVenues.map(
                  (venue) => (
                    <option
                      key={venue.id}
                      value={venue.name}
                    >
                      {venue.name}
                      {" - "}
                      Capacity {venue.capacity}
                    </option>
                  )
                )}
              </select>

              {availableVenues.length === 0 && (
                <small className="text-danger">
                  No available venues at the moment.
                </small>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Expected Participants
              </label>

              <input
                type="number"
                name="expectedParticipants"
                className="form-control"
                placeholder="Enter expected participants"
                min="1"
                value={
                  formData.expectedParticipants
                }
                onChange={handleChange}
                required
              />

              {formData.venue && (
                <small className="text-muted">
                  Venue capacity:{" "}
                  {
                    venues.find(
                      (venue) =>
                        venue.name ===
                        formData.venue
                    )?.capacity
                  }
                </small>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">
                Event Description
              </label>

              <textarea
                name="description"
                className="form-control"
                rows="4"
                placeholder="Enter event description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="mb-3">
            Resource Request
          </h5>

          <div className="row g-4">

            <div className="col-md-4">
              <label className="form-label">
                Chairs
              </label>

              <input
                type="number"
                name="chairs"
                className="form-control"
                placeholder="0"
                min="0"
                max={chairsAvailable}
                value={formData.chairs}
                onChange={handleChange}
              />

              <small className="text-muted">
                Available: {chairsAvailable}
              </small>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Microphones
              </label>

              <input
                type="number"
                name="microphones"
                className="form-control"
                placeholder="0"
                min="0"
                max={microphonesAvailable}
                value={
                  formData.microphones
                }
                onChange={handleChange}
              />

              <small className="text-muted">
                Available:{" "}
                {microphonesAvailable}
              </small>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Projectors
              </label>

              <input
                type="number"
                name="projectors"
                className="form-control"
                placeholder="0"
                min="0"
                max={projectorsAvailable}
                value={formData.projectors}
                onChange={handleChange}
              />

              <small className="text-muted">
                Available:{" "}
                {projectorsAvailable}
              </small>
            </div>
          </div>

          <div className="event-form-actions">

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleDraft}
            >
              <i className="bi bi-file-earmark me-2"></i>
              Save as Draft
            </button>

            <button
              type="submit"
              className="btn primary-action"
            >
              <i className="bi bi-send me-2"></i>
              Submit Request
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;