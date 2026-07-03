"use client";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <img src="/swasthghar.jpeg" alt="Swasthghar" className="h-20 w-auto" />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-primary-600 transition">
              Our Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 transition">
              About Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

