"use client";

import { useState } from "react";
import BookNowModal from "./BookNowModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Quality Medical Care Delivered At The Comfort of Your Home
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            We bring quality medical care into our patients&#39; homes and aim to make primary healthcare 
            not only more accessible but also more affordable and accountable to our patient&#39;s needs.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg hover:shadow-xl"
          >
            Book Now
          </button>
        </div>
      </section>
      
      <BookNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

