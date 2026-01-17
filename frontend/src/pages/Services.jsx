import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCode, FaRobot, FaPaintBrush, FaPalette, FaLayerGroup } from 'react-icons/fa';
import API_BASE_URL from '../config/api';

const iconMap = {
  'FaCode': <FaCode />,
  'FaRobot': <FaRobot />,
  'FaPaintBrush': <FaPaintBrush />,
  'FaPalette': <FaPalette />,
  'FaLayerGroup': <FaLayerGroup />
};

const defaultServices = [
  { id: 1, title: 'Full Stack Development', description: 'End-to-end web solutions using MERN Stack', icon: 'FaCode' },
  { id: 2, title: 'MERN Stack Projects', description: 'MongoDB, Express, React, Node.js applications', icon: 'FaLayerGroup' },
  { id: 3, title: 'UI/UX Designing', description: 'User-friendly and modern interface designs', icon: 'FaPaintBrush' },
  { id: 4, title: 'Graphic Designing', description: 'Creative visual content and branding', icon: 'FaPalette' },
  { id: 5, title: 'AI / ML Solutions', description: 'Smart AI-powered applications', icon: 'FaRobot' }
];

export default function Services() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/services`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      })
      .catch(() => setServices(defaultServices));
  }, []);

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-white">Our Services</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map(s => (
            <div key={s.id} className="bg-gray-900 p-3 shadow-xl rounded-lg hover:shadow-white/50 transition-all duration-300 border border-gray-700 hover:border-white transform hover:scale-105">
              <h2 className="text-base font-medium text-center text-white">{s.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
