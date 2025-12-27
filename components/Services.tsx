"use client";

import { useState } from "react";
import BookNowModal from "./BookNowModal";

const services = [
  { name: "Physiotherapy", icon: "🏃" },
  { name: "Nursing Care", icon: "👩‍⚕️" },
  { name: "Medical Equipment", icon: "🩺" },
  { name: "Trained Attendants", icon: "👨‍⚕️" },
  { name: "Lab Tests", icon: "🧪" },
  { name: "Elder Care", icon: "👴" },
  { name: "Doctor Consultation", icon: "👨‍⚕️" },
  { name: "Mother & Baby Care", icon: "👶" },
  { name: "Diabetes Care", icon: "💉" },
  { name: "Critical Care", icon: "🚑" },
  { name: "Covid Care", icon: "🦠" },
  { name: "Vaccination", icon: "💊" },
];

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Medical Services Offered At Home
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We offer a variety of healthcare services in the comfort of our patients&#39; homes:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service.name)}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-primary-300"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-semibold text-gray-800">{service.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => {
                setSelectedService("");
                setIsModalOpen(true);
              }}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
      
      <BookNowModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService("");
        }}
        serviceName={selectedService}
      />
    </>
  );
}

