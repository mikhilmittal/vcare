"use client";

import { useState } from "react";
import BookNowModal from "./BookNowModal";
import SubCategoryModal from "./SubCategoryModal";
import PharmacyModal from "./PharmacyModal";
import ServiceSelectionModal from "./ServiceSelectionModal";

export default function Footer() {
  const [isServiceSelectionModalOpen, setIsServiceSelectionModalOpen] = useState(false);
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [isPharmacyModalOpen, setIsPharmacyModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  const handleBookNowClick = () => {
    setIsServiceSelectionModalOpen(true);
  };

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsServiceSelectionModalOpen(false);
    
    if (serviceName === "Pharmacy") {
      setIsPharmacyModalOpen(true);
    }
    else if (serviceName === "Ambulance Service") {
      setIsBookNowModalOpen(true);
    }
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
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Swasthghar</h3>
              <p className="text-gray-400">
                Quality medical care delivered at the comfort of your home.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Elder Care</li>
                <li>Doctor Consultations</li>
                <li>Lab Tests</li>
                <li>Critical Care</li>
                <li>Pharmacy</li>
                <li>Ambulance Service</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">Phone: +1 800 121 2323</p>
              <p className="text-gray-400 mb-4">Email: bookings@vcare.com</p>
              <button
                onClick={handleBookNowClick}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Swasthghar. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <ServiceSelectionModal
        isOpen={isServiceSelectionModalOpen}
        onClose={() => setIsServiceSelectionModalOpen(false)}
        onServiceSelect={handleServiceSelect}
      />
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

