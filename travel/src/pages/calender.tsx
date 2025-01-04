import React from 'react';
import { Calendar } from 'lucide-react';

const calender: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <div className="flex items-center space-x-2">
        <Calendar className="w-6 h-6" />
        <p>View and manage your trip calendar here.</p>
      </div>
      {/* Add a calendar component here */}
    </div>
  );
};

export default calender;