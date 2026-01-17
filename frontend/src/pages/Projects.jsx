import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/projects`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          setProjects([]);
        }
      })
      .catch(err => {
        console.error(err);
        setProjects([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-white">Our Projects</h1>
        </div>
        <p className="text-center text-lg text-gray-300 mb-8">
          Total Projects Completed: <span className="font-medium text-white">{projects.length}</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map(p => (
            <div key={p.id} className="bg-gray-900 p-3 shadow-xl rounded-lg hover:shadow-white/50 transition-all duration-300 border border-gray-700 hover:border-white transform hover:scale-105">
              <h3 className="text-base font-medium text-center text-white">{p.project_name}</h3>
            </div>
          ))}
        </div>
        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No projects available yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
