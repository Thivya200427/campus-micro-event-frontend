const VENUES_KEY = "campus_venues";

const DEFAULT_VENUES = [
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

function initializeVenues() {
  const storedVenues = localStorage.getItem(VENUES_KEY);

  if (!storedVenues) {
    localStorage.setItem(
      VENUES_KEY,
      JSON.stringify(DEFAULT_VENUES)
    );
  }
}

export function getVenues() {
  initializeVenues();

  const venues = localStorage.getItem(VENUES_KEY);

  if (!venues) {
    return [];
  }

  try {
    return JSON.parse(venues);
  } catch {
    return [];
  }
}

export function saveVenues(venues) {
  localStorage.setItem(
    VENUES_KEY,
    JSON.stringify(venues)
  );
}

export function addVenue(venue) {
  const venues = getVenues();

  const newVenue = {
    id: Date.now(),
    ...venue,
  };

  saveVenues([...venues, newVenue]);

  return newVenue;
}

export function updateVenue(id, updatedData) {
  const venues = getVenues();

  const updatedVenues = venues.map((venue) => {
    if (String(venue.id) === String(id)) {
      return {
        ...venue,
        ...updatedData,
      };
    }

    return venue;
  });

  saveVenues(updatedVenues);
}

export function deleteVenue(id) {
  const venues = getVenues();

  const updatedVenues = venues.filter(
    (venue) => String(venue.id) !== String(id)
  );

  saveVenues(updatedVenues);
}