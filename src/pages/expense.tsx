import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
// import { Wallet } from 'lucide-react';

interface Expense {
  id: string;
  trip_id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

interface Trip {
  id: string;
  title: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
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

  // Fetch all expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching expenses:', error);
      } else {
        console.log('Expenses fetched:', data);
        setExpenses(data || []);
      }
    };

    fetchExpenses();
  }, []);

  // Add a new expense
  const handleAddExpense = async () => {
    if (!newCategory || !newAmount || !newDescription || !newDate || !selectedTrip) {
      alert('Please fill in all fields and select a trip.');
      return;
    }

    const expenses = [
      {
        trip_id: selectedTrip,
        category: newCategory,
        amount: newAmount,
        description: newDescription,
        date: newDate,
      },
    ];

    const { data, error } = await supabase
      .from('expenses')
      .insert(expenses);

    if (error) {
      console.error('Error adding expense:', error);
    } else {
      console.log('Expense added:', data);
      setExpenses([...expenses, data[0]]); // Add new expense to the list
      setNewCategory(''); // Clear input
      setNewAmount(''); // Clear input
      setNewDescription(''); // Clear input
      setNewDate(''); // Clear date
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

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

      {/* Add Expense */}
      {selectedTrip && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Add Expense</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category"
              className="p-2 border rounded flex-grow"
            />
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Enter amount"
              className="p-2 border rounded flex-grow"
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter description"
              className="p-2 border rounded flex-grow"
            />
            <input
              type="date"
              value={newDate }
              onChange={(e) => setNewDate(e.target.value)}
              className="p-2 border rounded"
            />
            <button
              onClick={handleAddExpense}
              className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Expense
            </button>
          </div>
        </div>
      )}

      {/* Expense List */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Expense List</h2>
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li key={expense.id} className="p-4 border rounded-lg">
              <div>
                <strong>Category:</strong> {expense.category}
              </div>
              <div>
                <strong>Amount:</strong> ₹{expense.amount}
              </div>
              <div>
                <strong>Description:</strong> {expense.description}
              </div>
              <div>
                <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
              </div>
              <div>
                <strong>Created At:</strong> {new Date(expense.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
