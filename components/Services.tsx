"use client";

import { useState } from "react";
import BookNowModal from "./BookNowModal";
import SubCategoryModal from "./SubCategoryModal";
import PharmacyModal from "./PharmacyModal";

const services = [
  { name: "Elder Care", icon: "👴" },
  { name: "Doctor Consultation", icon: "👨‍⚕️" },
  { name: "Lab Tests", icon: "🧪" },
  { name: "Critical Care", icon: "🚑" },
  { name: "Pharmacy", icon: "💊" },
  { name: "Ambulance Service", icon: "🚨" },
];

export default function Services() {
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [isPharmacyModalOpen, setIsPharmacyModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    
    // Pharmacy: Show prescription upload modal
    if (serviceName === "Pharmacy") {
      setIsPharmacyModalOpen(true);
    }
    // Ambulance: Go directly to booking form (no sub-category)
    else if (serviceName === "Ambulance Service") {
      setIsBookNowModalOpen(true);
    }
    // Other services: Show sub-category modal
    else {
      setIsSubCategoryModalOpen(true);
    }
  };

  const handlePharmacyConfirm = (file: File) => {
    setPrescriptionFile(file);
    setIsPharmacyModalOpen(false);
    setIsBookNowModalOpen(true);
  };

  const handleSubCategoryConfirm = (serviceName: string, subCategory: string, userNotes: string) => {
    setSelectedService(serviceName);
    setSelectedSubCategory(subCategory);
    setNotes(userNotes);
    setIsSubCategoryModalOpen(false);
    setIsBookNowModalOpen(true);
  };

  const handleBookNowModalClose = () => {
    setIsBookNowModalOpen(false);
    setSelectedService("");
    setSelectedSubCategory("");
    setNotes("");
    setPrescriptionFile(null);
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        </div>
      </section>
      
      <PharmacyModal
        isOpen={isPharmacyModalOpen}
        onClose={() => {
          setIsPharmacyModalOpen(false);
          setSelectedService("");
        }}
        onConfirm={handlePharmacyConfirm}
      />
      <SubCategoryModal
        isOpen={isSubCategoryModalOpen}
        onClose={() => {
          setIsSubCategoryModalOpen(false);
          setSelectedService("");
        }}
        serviceName={selectedService}
        onConfirm={handleSubCategoryConfirm}
      />
      <BookNowModal 
        isOpen={isBookNowModalOpen} 
        onClose={handleBookNowModalClose}
        serviceName={selectedService}
        subCategory={selectedSubCategory}
        notes={notes}
        prescriptionFile={prescriptionFile}
      />
    </>
  );
}

