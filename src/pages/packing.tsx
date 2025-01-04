import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PackageSearch } from 'lucide-react';

interface PackingItem {
  id: string;
  trip_id: string;
  item: string;
  category: string;
  is_packed: boolean;
  created_at: string;
}

interface Trip {
  id: string;
  title: string;
}

const Packing: React.FC = () => {
  const [packingItems, setPackingItems] = useState<PackingItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);

  // Fetch all trips
  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase
        .from('trips')
        .select('id, title')
        .order('title', { ascending: true });

      if (error) {
        console.error('Error fetching trips:', error);
      } else {
        console.log('Trips fetched:', data);
        setTrips(data || []);
      }
    };

    fetchTrips();
  }, []);

  // Fetch all packing items
  useEffect(() => {
    const fetchPackingItems = async () => {
      const { data, error } = await supabase
        .from('packing_items')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching packing items:', error);
      } else {
        console.log('Packing items fetched:', data);
        setPackingItems(data || []);
      }
    };

    fetchPackingItems();
  }, []);

  // Add a new packing item
  const handleAddPackingItem = async () => {
    if (!newItem || !newCategory || !selectedTrip) {
      alert('Please fill in all fields and select a trip.');
      return;
    }

    const packingItems = [
      {
        trip_id: selectedTrip,
        item: newItem,
        category: newCategory,
        is_packed: false,
      },
    ];

    const { data, error } = await supabase
      .from('packing_items')
      .insert(packingItems);

    if (error) {
      console.error('Error adding packing item:', error);
    } else {
      console.log('Packing item added:', data);
      setPackingItems([...packingItems, data[0]]); // Add new packing item to the list
      setNewItem(''); // Clear input
      setNewCategory(''); // Clear input
    }
  };

    // Toggle the packed status of an item
    const handleTogglePacked = async (itemId: string, isPacked: boolean) => {
      const { data, error } = await supabase
        .from('packing_items')
        .update({ is_packed: !isPacked })
        .eq('id', itemId);
  
      if (error) {
        console.error('Error updating packing item:', error);
      } else {
        // Update the local state to reflect the change
        setPackingItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, is_packed: !isPacked } : item
          )
        );
      }
    };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Packing List</h1>

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

      {/* Add Packing Item */}
      {selectedTrip && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Add Packing Item</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item"
              className="p-2 border rounded flex-grow"
            />
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category"
              className="p-2 border rounded flex-grow"
            />
            <button
              onClick={handleAddPackingItem}
              className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Packing Item
            </button>
          </div>
        </div>
      )}

      {/* Packing Item List */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Packing Item List</h2>
        <ul className="space-y-2">
          {packingItems.map((item) => (
            <li key={item.id} className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <strong>Item:</strong> {item.item}
                <div>
                  <strong>Category:</strong> {item.category}
                </div>
                <div>
                  <strong>Is Packed:</strong> {item.is_packed ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={item.is_packed}
                  onChange={() => handleTogglePacked(item.id, item.is_packed)}
                  className="ml-4"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Packing;