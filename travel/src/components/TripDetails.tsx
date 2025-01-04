// import React, { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import { useParams } from "react-router-dom";

// interface Trip {
//   id: string;
//   title: string;
//   start_date: string;
//   end_date: string;
//   status: string;
// }

// interface Itinerary {
//   id: string;
//   trip_id: string;
//   date: string;
//   activity: string;
// }

// interface PackingItem {
//   id: string;
//   trip_id: string;
//   item: string;
//   category: string;
//   is_packed: boolean;
// }

// interface Accommodation {
//   id: string;
//   trip_id: string;
//   name: string;
//   check_in: string;
//   check_out: string;
//   booking_ref: string;
// }

// interface Transport {
//   id: string;
//   trip_id: string;
//   departure_location: string;
//   arrival_location: string;
//   departure_time: string;
//   arrival_time: string;
//   booking_ref: string;
// }

// interface Expense {
//   id: string;
//   trip_id: string;
//   date: string;
//   description: string;
//   amount: number;
// }

// const TripDetails: React.FC = () => {
//   const { id } = useParams();
//   const [trip, setTrip] = useState<Trip | null>(null);
//   const [itineraries, setItineraries] = useState<Itinerary[]>([]);
//   const [packingItems, setPackingItems] = useState<PackingItem[]>([]);
//   const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
//   const [transports, setTransports] = useState<Transport[]>([]);
//   const [expenses, setExpenses] = useState<Expense[]>([]);

//   useEffect(() => {
//     const fetchTrip = async () => {
//       const { data, error } = await supabase
//         .from("trips")
//         .select("*")
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.error("Error fetching trip details:", error);
//       } else {
//         setTrip(data);
//       }
//     };

//     fetchTrip();
//   }, [id]);

//   useEffect(() => {
//     const fetchItineraries = async () => {
//       const { data, error } = await supabase
//         .from("itineraries")
//         .select("*")
//         .eq("trip_id", id);

//       if (error) {
//         console.error("Error fetching itineraries:", error);
//       } else {
//         setItineraries(data || []);
//       }
//     };

//     fetchItineraries();
//   }, [id]);

//   useEffect(() => {
//     const fetchPackingItems = async () => {
//       const { data, error } = await supabase
//         .from("packing_items")
//         .select("*")
//         .eq("trip_id", id);

//       if (error) {
//         console.error("Error fetching packing items:", error);
//       } else {
//         setPackingItems(data || []);
//       }
//     };

//     fetchPackingItems();
//   }, [id]);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       const { data, error } = await supabase
//         .from("expenses")
//         .select("*")
//         .eq("trip_id", id);

//       if (error) {
//         console.error("Error fetching Expenses items:", error);
//       } else {
//         setExpenses(data || []);
//       }
//     };

//     fetchExpenses();
//   }, [id]);

//   useEffect(() => {
//     const fetchAccommodations = async () => {
//       const { data, error } = await supabase
//         .from("accommodations")
//         .select("*")
//         .eq("trip_id", id);

//       if (error) {
//         console.error("Error fetching accommodations:", error);
//       } else {
//         setAccommodations(data || []);
//       }
//     };

//     fetchAccommodations();
//   }, [id]);

//   useEffect(() => {
//     const fetchTransports = async () => {
//       const { data, error } = await supabase
//         .from("transport")
//         .select("*")
//         .eq("trip_id", id);

//       if (error) {
//         console.error("Error fetching transports:", error);
//       } else {
//         setTransports(data || []);
//       }
//     };

//     fetchTransports();
//   }, [id]);

//   const handleDeleteTrip = async () => {
//     if (window.confirm("Are you sure you want to delete this trip?")) {
//       try {
//         // Delete trip
//         const { data, error } = await supabase
//           .from("trips")
//           .delete()
//           .eq("id", id);

//         if (error) {
//           console.error("Error deleting trip:", error);
//         } else {
//           console.log("Trip deleted:", data);
//         }

//         // Delete itineraries
//         const { data: itineraryData, error: itineraryError } = await supabase
//           .from("itineraries")
//           .delete()
//           .eq("trip_id", id);

//         if (itineraryError) {
//           console.error("Error deleting itineraries:", itineraryError);
//         } else {
//           console.log("Itineraries deleted:", itineraryData);
//         }

//         // Delete packing items
//         const { data: packingData, error: packingError } = await supabase
//           .from("packing_items")
//           .delete()
//           .eq("trip_id", id);

//         if (packingError) {
//           console.error("Error deleting packing items:", packingError);
//         } else {
//           console.log("Packing items deleted:", packingData);
//         }

//         // Delete accommodations
//         const { data: accommodationData, error: accommodationError } =
//           await supabase.from("accommodations").delete().eq("trip_id", id);

//         if (accommodationError) {
//           console.error("Error deleting accommodations:", accommodationError);
//         } else {
//           console.log("Accommodations deleted:", accommodationData);
//         }

//         // Delete transports
//         const { data: transportData, error: transportError } = await supabase
//           .from("transport")
//           .delete()
//           .eq("trip_id", id);

//         if (transportError) {
//           console.error("Error deleting transports:", transportError);
//         } else {
//           console.log("Transports deleted:", transportData);
//         }

//         // Redirect to trips page
//         window.location.href = "/trips";
//       } catch (err) {
//         console.error("Unexpected error:", err);
//       }
//     }
//   };

//   if (!trip) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h3 className="font-bold mb-2">Trip: {trip.title}</h3>
//       <p className="text-gray-600">
//         Start Date: {new Date(trip.start_date).toLocaleDateString()}
//       </p>
//       <p className="text-gray-600">
//         End Date: {new Date(trip.end_date).toLocaleDateString()}
//       </p>
//       <p className="text-gray-600">Status: {trip.status}</p>

//       <h4 className="font-bold mb-2">Itinerary</h4>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">Date</th>
//             <th className="border border-gray-300 p-2">Activity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {itineraries.map((itinerary) => (
//             <tr key={itinerary.id}>
//               <td className="border border-gray-300 p-2">
//                 {new Date(itinerary.date).toLocaleDateString()}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {itinerary.activity}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h4 className="font-bold mb-2">Packing List</h4>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">Item</th>
//             <th className="border border-gray-300 p-2">Status</th>
//             <th className="border border-gray-300 p-2">Category</th>
//           </tr>
//         </thead>
//         <tbody>
//           {packingItems.map((item) => (
//             <tr key={item.id}>
//               <td className="border border-gray-300 p-2">{item.item}</td>
//               <td className="border border-gray-300 p-2">
//                 {item.is_packed ? "Packed" : "Not Packed"}
//               </td>
//               <td className="border border-gray-300 p-2">{item.category}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h4 className="font-bold mb-2">Expenses</h4>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">Category</th>
//             <th className="border border-gray-300 p-2">Amount</th>
//             <th className="border border-gray-300 p-2">Description</th>
//             <th className="border border-gray-300 p-2">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map((expense) => (
//             <tr key={expense.id}>
//               <td className="border border-gray-300 p-2">{expense.category}</td>
//               <td className="border border-gray-300 p-2">{expense.amount}</td>
//               <td className="border border-gray-300 p-2">
//                 {expense.description}
//               </td>
//               <td className="border border-gray-300 p-2">{expense.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h4 className="font-bold mb-2">Accommodations</h4>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">Name</th>
//             <th className="border border-gray-300 p-2">Check-in</th>
//             <th className="border border-gray-300 p-2">Check-out</th>
//             <th className="border border-gray-300 p-2">Booking Ref</th>
//           </tr>
//         </thead>
//         <tbody>
//           {accommodations.map((accommodation) => (
//             <tr key={accommodation.id}>
//               <td className="border border-gray-300 p-2">
//                 {accommodation.name}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {new Date(accommodation.check_in).toLocaleDateString()}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {new Date(accommodation.check_out).toLocaleDateString()}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {accommodation.booking_ref}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h4 className="font-bold mb-2">Transport</h4>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">From</th>
//             <th className="border border-gray-300 p-2">To</th>
//             <th className="border border-gray-300 p-2">Departure</th>
//             <th className="border border-gray-300 p-2">Arrival</th>
//             <th className="border border-gray-300 p-2">Booking Ref</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transports.map((transport) => (
//             <tr key={transport.id}>
//               <td className="border border-gray-300 p-2">
//                 {transport.departure_location}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {transport.arrival_location}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {new Date(transport.departure_time).toLocaleString()}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {new Date(transport.arrival_time).toLocaleString()}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {transport.booking_ref}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
//         onClick={handleDeleteTrip}
//       >
//         Delete Trip
//       </button>
//     </div>
//   );
// };

// export default TripDetails;


import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "react-router-dom";

interface Trip {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface Itinerary {
  id: string;
  trip_id: string;
  date: string;
  activity: string;
}

interface PackingItem {
  id: string;
  trip_id: string;
  item: string;
  category: string;
  is_packed: boolean;
}

interface Accommodation {
  id: string;
  trip_id: string;
  name: string;
  check_in: string;
  check_out: string;
  booking_ref: string;
}

interface Transport {
  id: string;
  trip_id: string;
  departure_location: string;
  arrival_location: string;
  departure_time: string;
  arrival_time: string;
  booking_ref: string;
}

const TripDetails: React.FC = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [packingItems, setPackingItems] = useState<PackingItem[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);

  useEffect(() => {
    const fetchTrip = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching trip details:", error);
      } else {
        setTrip(data);
      }
    };

    fetchTrip();
  }, [id]);

  useEffect(() => {
    const fetchItineraries = async () => {
      const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("trip_id", id);

      if (error) {
        console.error("Error fetching itineraries:", error);
      } else {
        setItineraries(data || []);
      }
    };

    fetchItineraries();
  }, [id]);

  useEffect(() => {
    const fetchPackingItems = async () => {
      const { data, error } = await supabase
        .from("packing_items")
        .select("*")
        .eq("trip_id", id);

      if (error) {
        console.error("Error fetching packing items:", error);
      } else {
        setPackingItems(data || []);
      }
    };

    fetchPackingItems();
  }, [id]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .eq("trip_id", id);

      if (error) {
        console.error("Error fetching accommodations:", error);
      } else {
        setAccommodations(data || []);
      }
    };

    fetchAccommodations();
  }, [id]);

  useEffect(() => {
    const fetchTransports = async () => {
      const { data, error } = await supabase
        .from("transport")
        .select("*")
        .eq("trip_id", id);

      if (error) {
        console.error("Error fetching transports:", error);
      } else {
        setTransports(data || []);
      }
    };

    fetchTransports();
  }, [id]);

  const handleDeleteTrip = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        // Delete trip
        const { data, error } = await supabase
          .from("trips")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Error deleting trip:", error);
        } else {
          console.log("Trip deleted:", data);
        }

        // Delete itineraries
        const { data: itineraryData, error: itineraryError } = await supabase
          .from("itineraries")
          .delete()
          .eq("trip_id", id);

        if (itineraryError) {
          console.error("Error deleting itineraries:", itineraryError);
        } else {
          console.log("Itineraries deleted:", itineraryData);
        }

        // Delete packing items
        const { data: packingData, error: packingError } = await supabase
          .from("packing_items")
          .delete()
          .eq("trip_id", id);

        if (packingError) {
          console.error("Error deleting packing items:", packingError);
        } else {
          console.log("Packing items deleted:", packingData);
        }

        // Delete accommodations
        const { data: accommodationData, error: accommodationError } = await supabase
          .from("accommodations")
          .delete()
          .eq("trip_id", id);

        if (accommodationError) {
          console.error("Error deleting accommodations:", accommodationError);
        } else {
          console.log("Accommodations deleted:", accommodationData);
        }

        // Delete transports
        const { data: transportData, error: transportError } = await supabase
          .from("transport")
          .delete()
          .eq("trip_id", id);

        if (transportError) {
          console.error("Error deleting transports:", transportError);
        } else {
          console.log("Transports deleted:", transportData);
        }

        // Redirect or update state after deletion
        // e.g., navigate to another page or update the UI
      } catch (error) {
        console.error("Error during deletion process:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {trip && (
        <div className="card mb-4 ">
          <h2 className="text-xl font-bold">{trip.title}</h2>
          <p>Start Date: {trip.start_date}</p>
          <p>End Date: {trip.end_date}</p>
          <p>Status: {trip.status}</p>
        </div>
      )}

      <h3 className="text-lg font-semibold">Itineraries</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="card">
            <h4 className="font-bold">{itinerary.date}</h4>
            <p>{itinerary.activity}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-4">Packing Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packingItems.map((item) => (
          <div key={item.id} className="card">
            <p>{item.item} - {item.category}</p>
            <p>{item.is_packed ? "Packed" : "Not Packed"}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-4">Accommodations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="card">
            <h4 className="font-bold">{accommodation.name}</h4>
            <p>Check-in: {accommodation.check_in}</p>
            <p>Check-out: {accommodation.check_out}</p>
            <p>Booking Ref: {accommodation.booking_ref}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-4">Transports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transports.map((transport) => (
          <div key={transport.id} className="card">
            <p>From: {transport.departure_location}</p>
            <p>To: {transport.arrival_location}</p>
            <p>Departure: {transport.departure_time}</p>
            <p>Arrival: {transport.arrival_time}</p>
            <p>Booking Ref: {transport.booking_ref}</p>
          </div>
        ))}
      </div>

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded delete-button mt-4"
        onClick={handleDeleteTrip}
      >
        Delete Trip
      </button>
    </div>
  );
};

export default TripDetails;
