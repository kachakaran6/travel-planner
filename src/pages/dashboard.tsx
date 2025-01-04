import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import NewTripForm from '../components/NewTripForm';
// import TripDetails from '../components/TripDetails';

interface Trip {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const Dashboard: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching trips:', error);
      } else {
        console.log('Trips fetched:', data);
        setTrips(data);
      }
    };

    fetchTrips();
  }, []);


  const TripDetails: React.FC<TripDetails> = ({ trip }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold mb-2">Trip: {trip.title}</h3>
        <p className="text-gray-600">Description:{trip.description}</p>
        <p className="text-gray-600">Start Date: {trip.start_date}</p>
        <p className="text-gray-600">End Date: {trip.end_date}</p>
        <p className="text-gray-600">Budget: {trip.budget}</p>
        <p className="text-gray-600">Status: {trip.status}</p>
      </div>
    );
  };

  const handleCreateTrip = async (tripData: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    budget: number;
  }) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([
          {
            title: tripData.title,
            description: tripData.description,
            start_date: tripData.start_date,
            end_date: tripData.end_date,
            budget: tripData.budget,
            status: 'planning',
          },
        ]);

      if (error) {
        console.error('Error creating trip:', error);
      } else {
        console.log('Trip created:', data);
        setTrips([...trips, data[0]]);
        setIsFormOpen(false);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          New Trip
        </button>
      </div>

      {isFormOpen && (
        <NewTripForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateTrip}
        />
      )}

      {trips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl font-bold mb-2">No trips planned yet</p>
          <p className="text-gray-600">Start planning your next adventure!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripDetails key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;