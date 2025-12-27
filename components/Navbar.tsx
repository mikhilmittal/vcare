"use client";

import { useState } from "react";
import BookNowModal from "./BookNowModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">VCare</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary-600 transition">
                Our Services
              </a>
              <a href="#about" className="text-gray-700 hover:text-primary-600 transition">
                About Us
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Book Now
              </button>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <BookNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

