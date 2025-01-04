import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Home } from "lucide-react";

interface Accommodation {
  id: string;
  trip_id: string;
  name: string;
  check_in: string;
  check_out: string;
  booking_ref: string;
  notes: string;
  created_at: string;
}

interface Trip {
  id: string;
  title: string;
}

const Accommodations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [newName, setNewName] = useState("");
  const [newCheckIn, setNewCheckIn] = useState("");
  const [newCheckOut, setNewCheckOut] = useState("");
  const [newBookingRef, setNewBookingRef] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);

  // Fetch all trips
  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("id, title")
        .order("title", { ascending: true });

      if (error) {
        console.error("Error fetching trips:", error);
      } else {
        console.log("Trips fetched:", data);
        setTrips(data || []);
        if (data && data.length > 0) {
          setSelectedTrip(data[0].id); // Set the first trip as the selected trip
        }
      }
    };

    fetchTrips();
  }, []);

  // Fetch all accommodations
  useEffect(() => {
    const fetchAccommodations = async () => {
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching accommodations:", error);
      } else {
        console.log("Accommodations fetched:", data);
        setAccommodations(data || []);
      }
    };

    fetchAccommodations();
  }, []);

  // Add a new accommodation
  const handleAddAccommodation = async () => {
    if (
      !newName ||
      !newCheckIn ||
      !newCheckOut ||
      !newBookingRef ||
      !selectedTrip
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const accommodations = [
      {
        trip_id: selectedTrip,
        name: newName,
        check_in: newCheckIn,
        check_out: newCheckOut,
        booking_ref: newBookingRef,
        notes: newNotes || "",
      },
    ];

    const { data, error } = await supabase
      .from("accommodations")
      .insert(accommodations);

    if (error) {
      console.error("Error adding accommodation:", error);
    } else {
      console.log("Accommodation added:", data);
      setAccommodations([...accommodations, data[0]]); // Add new accommodation to the list
      setNewName(""); // Clear input
      setNewCheckIn(""); // Clear input
      setNewCheckOut(""); // Clear input
      setNewBookingRef(""); // Clear input
      setNewNotes(""); // Clear input
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Accommodations</h1>

      {/* Trip List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a Trip</h2>
        <select
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a trip</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add Accommodation */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Add Accommodation</h2>
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label htmlFor="">Booking Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter name"
              className="p-2 border rounded flex-grow"
            />
          </div>
          <div className="flex flex-col">
            <label>Check-in Date:</label>
            <input
              type="date"
              value={newCheckIn}
              onChange={(e) => setNewCheckIn(e.target.value)}
              placeholder="Enter check-in date"
              className="p-2 border rounded flex-grow"
            />
          </div>
          <div className="flex flex-col">
            <label>Check-out Date:</label>
            <input
              type="date"
              value={newCheckOut}
              onChange={(e) => setNewCheckOut(e.target.value)}
              placeholder="Enter check-out date"
              className="p-2 border rounded flex-grow"
            />
          </div>
          <div className="flex flex-col">
            <label>Booking Reference:</label>
            <input
              type="text"
              value={newBookingRef}
              onChange={(e) => setNewBookingRef(e.target.value)}
              placeholder="Enter booking reference"
              className="p-2 border rounded flex-grow"
            />
          </div>
          <div className="flex flex-col">
            <label>Notes</label>
            <input
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Enter notes (optional)"
              className="p-2 border rounded flex-grow"
            />
          </div>
          <button
            onClick={handleAddAccommodation}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Accommodation
          </button>
        </div>
      </div>

      {/* Accommodations List */}

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Accommodations List</h2>
        <ul>
          {accommodations.map((accommodation) => (
            <li key={accommodation.id} className="mb-2">
              <Home className="inline-block mr-2" />
              <span>
                {accommodation.name}  <br />
                <span>
                  Check-in:{" "}
                  {new Date(accommodation.check_in).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}{" "} <br />
                   Check-out:{" "}
                  {new Date(accommodation.check_out).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>{" "}
                <br />
                Booking Reference: {accommodation.booking_ref} <br />
                Notes: {accommodation.notes} <br />
                Created At:{" "}
                {new Date(accommodation.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accommodations;
