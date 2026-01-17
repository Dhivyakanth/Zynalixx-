import { useState } from 'react';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaInstagram, FaLinkedin, FaUser } from 'react-icons/fa';
import API_BASE_URL from '../config/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/api/contacts`, formData)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Contact Zynalixx</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 shadow-2xl rounded-lg border-2 border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Get In Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaUser className="text-2xl text-white" />
                <div>
                  <p className="font-semibold text-white">Contact Person</p>
                  <p className="text-gray-400">Shanthosh , Sasthika, Sasmitha</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaPhone className="text-2xl text-white" />
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-gray-400">+919342084099, +91 9363084122</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-2xl text-white" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-gray-400">zynalixx@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaInstagram className="text-2xl text-white" />
                <div>
                  <p className="font-semibold text-white">Instagram</p>
                  <p className="text-gray-400">https://www.instagram.com/zynalixx?utm_source=qr</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaLinkedin className="text-2xl text-white" />
                <div>
                  <p className="font-semibold text-white">LinkedIn</p>
                  <p className="text-gray-400">www.linkedin.com/in/zynalixx-23aa203a4</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 shadow-2xl rounded-lg border-2 border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Send a Message</h2>
            {submitted && <p className="text-white mb-4 font-semibold">Message sent successfully!</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border-2 border-gray-700 rounded bg-black text-white placeholder-gray-500 focus:border-white focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border-2 border-gray-700 rounded bg-black text-white placeholder-gray-500 focus:border-white focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 border-2 border-gray-700 rounded bg-black text-white placeholder-gray-500 focus:border-white focus:outline-none"
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-3 border-2 border-gray-700 rounded bg-black text-white placeholder-gray-500 focus:border-white focus:outline-none h-24"
                required
              />
              <button type="submit" className="w-full bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
