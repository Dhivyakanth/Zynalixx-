import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/events`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          setEvents([]);
        }
      })
      .catch(err => {
        console.error(err);
        setEvents([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-white">Events</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {events.map(e => (
            <div key={e.id} className="bg-gray-900 p-3 shadow-xl rounded-lg hover:shadow-white/50 transition-all duration-300 border border-gray-700 hover:border-white transform hover:scale-105">
              <h3 className="text-base font-medium text-center text-white">{e.event_name}</h3>
            </div>
          ))}
        </div>
        {events.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No events scheduled. Stay tuned!</p>
        )}
      </div>
    </div>
  );
}
