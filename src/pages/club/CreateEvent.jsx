import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addEvent } from "../../utils/eventStore";

function CreateEvent() {
  const navigate = useNavigate();

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

  const saveEvent = (status) => {
    addEvent({
      ...formData,

      expectedParticipants:
        Number(formData.expectedParticipants),

      chairs:
        Number(formData.chairs || 0),

      microphones:
        Number(formData.microphones || 0),

      projectors:
        Number(formData.projectors || 0),

      status: status,

      createdAt:
        new Date().toISOString(),
    });

    navigate("/events");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    saveEvent("Pending");
  };

  const handleDraft = () => {
    if (!formData.title.trim()) {
      alert("Please enter an event title first.");
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

                <option value="Main Hall">
                  Main Hall
                </option>

                <option value="Conference Hall">
                  Conference Hall
                </option>

                <option value="Auditorium">
                  Auditorium
                </option>

                <option value="Room B12">
                  Room B12
                </option>
              </select>
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
                value={formData.expectedParticipants}
                onChange={handleChange}
                required
              />
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
                value={formData.chairs}
                onChange={handleChange}
              />
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
                value={formData.microphones}
                onChange={handleChange}
              />
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
                value={formData.projectors}
                onChange={handleChange}
              />
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