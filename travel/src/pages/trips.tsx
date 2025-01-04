import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

interface Trip {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
}

const Trips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
 

  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) {
        console.error("Error fetching trips:", error);
      } else {
        console.log("Trips fetched:", data);
        setTrips(data || []);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trips</h1>

      {/* Trip List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
        <ul className="space-y-2">
          {trips.map((trip) => (
            <li key={trip.id} className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <h3 className="font-semibold">{trip.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(trip.start_date).toLocaleDateString()} -{" "}
                {new Date(trip.end_date).toLocaleDateString()}
              </p>
              <p className="text-sm capitalize">Status: {trip.status}</p>
              <Link to={`/tripdetails/${trip.id}`}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
                  onClick={() => setSelectedTrip(trip)}
                >
                  View Trip Details
                </button>
              </Link>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Trips;