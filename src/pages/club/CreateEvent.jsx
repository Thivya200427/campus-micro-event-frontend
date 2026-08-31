import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createEvent } from "../../services/eventService";
import { getApiError } from "../../services/api";
import useEvents from "../../hooks/useEvents";
import useVenues from "../../hooks/useVenues";
import { getLoggedInUser } from "../../utils/authStore";
import useResources from "../../hooks/useResources";
import { createResourceRequest } from "../../services/resourceAllocationService";

function CreateEvent() {
  const navigate = useNavigate();

  const { venues } = useVenues();
  const { events } = useEvents();
  const loggedInUser = getLoggedInUser();
  const { resources } = useResources();
  const [saving, setSaving] = useState(false);

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

  const getResourceByName = (name) => {
    return resources.find(
      (resource) =>
        resource.name?.toLowerCase() ===
        name.toLowerCase()
    );
  };

  const chairsResource =
    getResourceByName("Chairs");

  const microphonesResource =
    getResourceByName("Microphones");

  const projectorsResource =
    getResourceByName("Projectors");

  const chairsAvailable = Number(
    chairsResource?.available || 0
  );

  const microphonesAvailable = Number(
    microphonesResource?.available || 0
  );

  const projectorsAvailable = Number(
    projectorsResource?.available || 0
  );

  /*
   * Check whether two time ranges overlap.
   *
   * Example:
   * Existing: 10:00 - 12:00
   * New:      11:00 - 13:00
   *
   * Result: conflict
   */
  const hasTimeOverlap = (
    start1,
    end1,
    start2,
    end2
  ) => {
    if (
      !start1 ||
      !end1 ||
      !start2 ||
      !end2
    ) {
      return false;
    }

    return (
      start1 < end2 &&
      end1 > start2
    );
  };

  /*
   * Check whether a venue is already
   * occupied by another approved event
   * on the SAME DATE and overlapping time.
   */
  const isVenueBookedForSelectedTime = (
    venueName
  ) => {
    if (
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      return false;
    }

    return events.some((event) => {
      if (event.status !== "Approved") {
        return false;
      }

      if (event.venue !== venueName) {
        return false;
      }

      if (event.date !== formData.date) {
        return false;
      }

      return hasTimeOverlap(
        formData.startTime,
        formData.endTime,
        event.startTime,
        event.endTime
      );
    });
  };

  /*
   * Venues shown in Create Event:
   *
   * - Different date = available
   * - Same date but different time = available
   * - Same date + overlapping time = unavailable
   *
   * We no longer block a venue only because
   * venue.status says "Booked".
   */
  const availableVenues = venues.filter(
    (venue) =>
      !isVenueBookedForSelectedTime(
        venue.name
      )
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => {
      const updatedData = {
        ...previousData,
        [name]: value,
      };

      /*
       * When date/time changes, reset venue.
       * This prevents keeping a venue that may
       * become unavailable for the new schedule.
       */
      if (
        name === "date" ||
        name === "startTime" ||
        name === "endTime"
      ) {
        updatedData.venue = "";
      }

      return updatedData;
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

    if (!formData.title.trim()) {
      alert("Please enter an event title.");
      return false;
    }

    if (!formData.eventType) {
      alert("Please select an event type.");
      return false;
    }

    if (!formData.date) {
      alert("Please select an event date.");
      return false;
    }

    if (!formData.startTime) {
      alert("Please select a start time.");
      return false;
    }

    if (!formData.endTime) {
      alert("Please select an end time.");
      return false;
    }

    if (
      formData.endTime <=
      formData.startTime
    ) {
      alert(
        "End time must be later than start time."
      );

      return false;
    }

    if (!formData.venue) {
      alert("Please select a venue.");
      return false;
    }

    const selectedVenue = venues.find(
      (venue) =>
        venue.name === formData.venue
    );

    if (!selectedVenue) {
      alert(
        "Please select a valid venue."
      );

      return false;
    }

    /*
     * Final conflict check before submit.
     */
    if (
      isVenueBookedForSelectedTime(
        selectedVenue.name
      )
    ) {
      alert(
        `${selectedVenue.name} is already booked for another approved event during the selected date and time. Please choose another venue or time.`
      );

      return false;
    }

    if (expectedParticipants <= 0) {
      alert(
        "Expected participants must be greater than 0."
      );

      return false;
    }

    if (
      expectedParticipants >
      Number(selectedVenue.capacity || 0)
    ) {
      alert(
        `The selected venue capacity is ${selectedVenue.capacity}. Please reduce participants or choose a larger venue.`
      );

      return false;
    }

    if (requestedChairs < 0) {
      alert(
        "Chair quantity cannot be negative."
      );

      return false;
    }

    if (requestedMicrophones < 0) {
      alert(
        "Microphone quantity cannot be negative."
      );

      return false;
    }

    if (requestedProjectors < 0) {
      alert(
        "Projector quantity cannot be negative."
      );

      return false;
    }

    if (
      requestedChairs >
      chairsAvailable
    ) {
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

  const saveEvent = async (status) => {
    const selectedVenue = venues.find(
      (venue) => venue.name === formData.venue
    );
    const savedEvent = await createEvent(
      { ...formData, status },
      loggedInUser.id,
      selectedVenue?.id
    );

    const requests = [
      [chairsResource, formData.chairs],
      [microphonesResource, formData.microphones],
      [projectorsResource, formData.projectors],
    ].filter(([resource, quantity]) => resource && Number(quantity) > 0);

    await Promise.all(
      requests.map(([resource, quantity]) =>
        createResourceRequest(savedEvent.id, resource.id, quantity)
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEvent()) {
      return;
    }

    setSaving(true);
    try {
      await saveEvent("Pending");
      alert("Event request submitted successfully.");
      navigate("/events");
    } catch (error) {
      alert(getApiError(error, "Unable to submit the event request."));
    } finally {
      setSaving(false);
    }
  };

  const handleDraft = async () => {
    if (!formData.title.trim()) {
      alert(
        "Please enter an event title first."
      );

      return;
    }

    if (!validateEvent()) {
      return;
    }

    setSaving(true);
    try {
      await saveEvent("Draft");
      navigate("/events");
    } catch (error) {
      alert(getApiError(error, "Unable to save the draft."));
    } finally {
      setSaving(false);
    }
  };

  const selectedVenue = venues.find(
    (venue) =>
      venue.name === formData.venue
  );

  const scheduleSelected =
    formData.date &&
    formData.startTime &&
    formData.endTime &&
    formData.endTime >
      formData.startTime;

  return (
    <div>
      <div className="dashboard-title">
        <div>
          <h2>Create Event Request</h2>

          <p>
            Enter event details and request
            required resources.
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
                disabled={!scheduleSelected}
              >
                <option value="">
                  {scheduleSelected
                    ? "Select venue"
                    : "Select date and time first"}
                </option>

                {availableVenues.map(
                  (venue) => (
                    <option
                      key={venue.id}
                      value={venue.name}
                    >
                      {venue.name}
                      {" - "}
                      Capacity{" "}
                      {venue.capacity}
                    </option>
                  )
                )}
              </select>

              {!scheduleSelected && (
                <small className="text-muted">
                  Select event date, start
                  time and end time to check
                  venue availability.
                </small>
              )}

              {scheduleSelected &&
                availableVenues.length ===
                  0 && (
                  <small className="text-danger">
                    No venues are available
                    for the selected date and
                    time.
                  </small>
                )}

              {scheduleSelected &&
                availableVenues.length > 0 && (
                  <small className="text-success">
                    {
                      availableVenues.length
                    }{" "}
                    venue
                    {availableVenues.length ===
                    1
                      ? ""
                      : "s"}{" "}
                    available for this
                    schedule.
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
                min="1"
                max={
                  selectedVenue?.capacity ||
                  undefined
                }
                value={
                  formData.expectedParticipants
                }
                onChange={handleChange}
                required
              />

              {formData.venue && (
                <small className="text-muted">
                  Venue capacity:{" "}
                  {selectedVenue?.capacity}
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
                min="0"
                max={chairsAvailable}
                value={formData.chairs}
                onChange={handleChange}
              />

              <small className="text-muted">
                Available:{" "}
                {chairsAvailable}
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
                min="0"
                max={
                  microphonesAvailable
                }
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
                min="0"
                max={
                  projectorsAvailable
                }
                value={
                  formData.projectors
                }
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
              disabled={saving}
            >
              <i className="bi bi-file-earmark me-2"></i>
              Save as Draft
            </button>

            <button
              type="submit"
              className="btn primary-action"
              disabled={saving}
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
