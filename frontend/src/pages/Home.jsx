import { FaCode, FaDatabase, FaPaintBrush, FaLayerGroup, FaRobot, FaMobile, FaServer, FaReact } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      {/* Floating Elements - Visible on all screens */}
      <div className="absolute top-20 left-10 animate-bounce">
        <FaCode className="text-white text-3xl lg:text-5xl opacity-70" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce" style={{animationDelay: '0.3s'}}>
        <FaDatabase className="text-gray-300 text-3xl lg:text-5xl opacity-60" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-bounce" style={{animationDelay: '1s'}}>
        <FaPaintBrush className="text-white text-3xl lg:text-5xl opacity-50" />
      </div>
      <div className="absolute top-1/3 right-10 animate-bounce" style={{animationDelay: '2s'}}>
        <FaLayerGroup className="text-gray-200 text-2xl lg:text-4xl opacity-70" />
      </div>
      <div className="absolute top-60 left-1/3 animate-bounce" style={{animationDelay: '0.5s'}}>
        <FaRobot className="text-white text-3xl lg:text-5xl opacity-60" />
      </div>
      <div className="absolute bottom-20 right-1/4 animate-bounce" style={{animationDelay: '1.5s'}}>
        <FaMobile className="text-gray-400 text-2xl lg:text-4xl opacity-70" />
      </div>
      <div className="absolute top-1/2 left-20 animate-bounce" style={{animationDelay: '2.5s'}}>
        <FaServer className="text-white text-2xl lg:text-4xl opacity-50" />
      </div>
      <div className="absolute bottom-40 right-32 animate-bounce" style={{animationDelay: '3s'}}>
        <FaReact className="text-gray-300 text-3xl lg:text-5xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center relative z-10">
        <img src="/logo.png" alt="Zynalixx Logo" className="w-[500px] h-[500px] mx-auto animate-pulse" />
      </div>
    </div>
  );
}
