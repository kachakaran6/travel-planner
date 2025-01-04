import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { MapPin } from "lucide-react";

interface Place {
  id: string;
  trip_id: string;
  category: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  notes: string;
  created_at: string;
}

interface Trip {
  id: string;
  title: string;
}

const Places: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
//   const [newCategory, setNewCategory] = useState("");
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
//   const [newLatitude, setNewLatitude] = useState("");
//   const [newLongitude, setNewLongitude] = useState("");
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
      }
    };

    fetchTrips();
  }, []);

  // Fetch all places
  useEffect(() => {
    const fetchPlaces = async () => {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching places:", error);
      } else {
        console.log("Places fetched:", data);
        setPlaces(data || []);
      }
    };

    fetchPlaces();
  }, []);

  // Add a new place
  const handleAddPlace = async () => {
    if (
    //   !newCategory ||
      !newName ||
      !newAddress ||
    //   !newLatitude ||
    //   !newLongitude ||
    //   !newNotes ||
      !selectedTrip
    ) {
      alert("Please fill in all fields and select a trip.");
      return;
    }

    const places = [
      {
        trip_id: selectedTrip,
        // category: newCategory,
        name: newName,
        address: newAddress,
        // latitude: newLatitude,
        // longitude: newLongitude,
        notes: newNotes,
      },
    ];

    const { data, error } = await supabase.from("places").insert(places);

    if (error) {
      console.error("Error adding place:", error);
    } else {
      console.log("Place added:", data);
      setPlaces([...places, data[0]]); // Add new place to the list
    //   setNewCategory(""); // Clear input
      setNewName(""); // Clear input
      setNewAddress(""); // Clear input
    //   setNewLatitude(""); // Clear input
    //   setNewLongitude(""); // Clear input
      setNewNotes("*"); // Clear input
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Places</h1>

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

      {/* Add Place */}
      {selectedTrip && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Add Place</h2>
          <div className="flex space-x-4">
            {/* <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category"
              className="p-2 border rounded flex-grow"
            /> */}
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter name"
              className="p-2 border rounded flex-grow"
            />
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter address"
              className="p-2 border rounded flex-grow"
            />
            {/* <input
              type="text"
              value={newLatitude}
              onChange={(e) => setNewLatitude(e.target.value)}
              placeholder="Enter latitude"
              className="p-2 border rounded flex-grow"
            />
            <input
              type="text"
              value={newLongitude}
              onChange={(e) => setNewLongitude(e.target.value)}
              placeholder="Enter longitude"
              className="p-2 border rounded flex-grow"
            /> */}
            <input
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Enter notes"
              className="p-2 border rounded flex-grow"
            />
            <button
              onClick={handleAddPlace}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add Place
            </button>
          </div>
        </div>
      )}

      {/* Places List */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Places List</h2>
        <ul>
          {places.map((place) => (
            <li key={place.id} className="mb-2">
              <MapPin className="inline-block mr-2" />
              <span>
                {place.name} - {place.address}  {place.notes}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Places;
