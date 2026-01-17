export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-10 border-t-2 border-white">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <img src="/logo.png" alt="Zynalixx Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-white"></span>
        </div>
        <p> 2026 Zynalixx. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">Turn visions into scalable solutions.</p>
      </div>
    </footer>
  );
}
