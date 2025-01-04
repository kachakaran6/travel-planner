// pages/transport.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Bus } from "lucide-react";
import DatePicker from "react-datepicker";

interface Transport {
  id: string;
  trip_id: string;
  // trip_name: string;
  departure_location: string;
  arrival_location: string;
  departure_time: string;
  arrival_time: string;
  booking_ref: string;
  notes: string;
  created_at: string;
}

interface Trip {
  id: string;
  title: string;
  // name:string;
}

const Transport: React.FC = () => {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [newDepartureLocation, setNewDepartureLocation] = useState("");
  const [newArrivalLocation, setNewArrivalLocation] = useState("");
  const [newDepartureTime, setNewDepartureTime] = useState("");
  const [newArrivalTime, setNewArrivalTime] = useState("");
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
      }
    };

    fetchTrips();
  }, []);

  // Fetch all transports
  useEffect(() => {
    const fetchTransports = async () => {
      const { data, error } = await supabase
        .from("transport")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching transports:", error);
      } else {
        console.log("Transports fetched:", data);
        setTransports(data || []);
      }
    };

    fetchTransports();
  }, []);

  // Add a new transport
  const handleAddTransport = async () => {
    if (
      !newDepartureLocation ||
      !newArrivalLocation ||
      !newDepartureTime ||
      !newArrivalTime ||
      !newBookingRef ||
      !selectedTrip
    ) {
      alert("Please fill in all fields and select a trip.");
      return;
    }

    const transports = [
      {
        trip_id: selectedTrip,
        // trip_name: selectedTrip,
        departure_location: newDepartureLocation,
        arrival_location: newArrivalLocation,
        departure_time: newDepartureTime,
        arrival_time: newArrivalTime,
        booking_ref: newBookingRef,
        notes: newNotes || "",
      },
    ];

    const { data, error } = await supabase.from("transport").insert(transports);

    if (error) {
      console.error("Error adding transport:", error);
    } else {
      console.log("Transport added:", data);
      setTransports([...transports, data[0]]); // Add new transport to the list
      setNewDepartureLocation(""); // Clear input
      setNewArrivalLocation(""); // Clear input
      setNewDepartureTime(""); // Clear input
      setNewArrivalTime(""); // Clear input
      setNewBookingRef(""); // Clear input
      setNewNotes(""); // Clear input
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transport</h1>

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

      {/* Add Transport */}
      {selectedTrip && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Add Transport</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newDepartureLocation}
              onChange={(e) => setNewDepartureLocation(e.target.value)}
              placeholder="Departure Location"
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={newArrivalLocation}
              onChange={(e) => setNewArrivalLocation(e.target.value)}
              placeholder="Arrival Location"
              className="p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <div className="flex space-x-4 mt-4">
              <div>
                <label>Departure Date and Time:</label>
                <input
                  type="datetime-local"
                  value={newDepartureTime}
                  onChange={(e) => setNewDepartureTime(e.target.value)}
                  className="p-2 border rounded"
                />
              </div>
              <div>
                <label>Arrival Date and Time:</label>
                <input
                  type="datetime-local"
                  value={newArrivalTime}
                  onChange={(e) => setNewArrivalTime(e.target.value)}
                  className="p-2 border rounded"
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <input
              type="text"
              value={newBookingRef}
              onChange={(e) => setNewBookingRef(e.target.value)}
              placeholder="Booking Reference"
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Notes"
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddTransport}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Add Transport
          </button>
        </div>
      )}

      {/* Transport List */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Transport List</h2>
        <ul>
          {transports.map((transport) => (
            <li key={transport.id} className="border-b py-2">
              {/* <div>
                <strong>Trip Name:</strong> {transport.trip_name}
              </div> */}


              <div>
                <strong>Departure:</strong> {transport.departure_location} at{" "}
                <span>
                   {new Date (transport.departure_time).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  </span> <br />
              </div>


              <div>
                <strong>Arrival:</strong> {transport.arrival_location} at{" "}
                <span>
                   {new Date (transport.arrival_time).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  </span> <br />
              </div>


              <div>
                <strong>Booking Ref:</strong> {transport.booking_ref}
              </div>
              <div>
                <strong>Notes:</strong> {transport.notes}
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {new Date(transport.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transport;
