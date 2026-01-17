import { FaBullseye, FaEye, FaStar } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-white">About Zynalixx</h1>
        </div>
        
        <div className="bg-gray-900 p-4 shadow-xl rounded-lg mb-4 border border-gray-700">
          <h2 className="text-lg font-medium mb-2 text-white">Who We Are</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Zynalixx is a premium full-stack development company specializing in cutting-edge solutions. 
            We transform innovative ideas into powerful digital products that drive business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 p-4 shadow-xl rounded-lg border border-gray-700 hover:border-white transition-all">
            <FaEye className="text-2xl text-white mb-2" />
            <h2 className="text-lg font-medium mb-2 text-white">Our Vision</h2>
            <p className="text-xs text-gray-400">
              To become a leading technology partner for startups and enterprises, delivering world-class digital solutions.
            </p>
          </div>

          <div className="bg-gray-900 p-4 shadow-xl rounded-lg border border-gray-700 hover:border-white transition-all">
            <FaBullseye className="text-2xl text-white mb-2" />
            <h2 className="text-lg font-medium mb-2 text-white">Our Mission</h2>
            <p className="text-xs text-gray-400">
              Empowering businesses with innovative technology solutions that are scalable, efficient, and user-centric.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-4 shadow-xl rounded-lg border border-gray-700">
          <FaStar className="text-2xl text-white mb-2" />
          <h2 className="text-lg font-medium mb-2 text-white">Why Choose Zynalixx?</h2>
          <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
            <li>Expert team with industry experience</li>
            <li>Modern tech stack (MERN, AI/ML)</li>
            <li>Client-focused approach</li>
            <li>On-time delivery and support</li>
            <li>Competitive pricing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
