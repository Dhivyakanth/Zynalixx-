export default function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const navHeight = 60;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-black text-white shadow-[0_4px_20px_rgba(147,51,234,0.5)] border-b border-purple-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <button onClick={() => scrollToSection('home')} className="flex items-center space-x-2">
          <img src="/logo.png" alt="Zynalixx Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="text-xl sm:text-2xl font-medium text-white"></span>
        </button>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm lg:text-base font-normal">
          <button onClick={() => scrollToSection('home')} className="hover:text-gray-400 transition-all duration-300">Home</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-gray-400 transition-all duration-300">Services</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-gray-400 transition-all duration-300">Projects</button>
          <button onClick={() => scrollToSection('events')} className="hover:text-gray-400 transition-all duration-300">Events</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-gray-400 transition-all duration-300">About</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-gray-400 transition-all duration-300">Contact</button>
        </div>
      </div>
    </nav>
  );
}
