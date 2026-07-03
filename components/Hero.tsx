"use client";

import { useState } from "react";
import BookNowModal from "./BookNowModal";
import SubCategoryModal from "./SubCategoryModal";
import PharmacyModal from "./PharmacyModal";
import ServiceSelectionModal from "./ServiceSelectionModal";

export default function Hero() {
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
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge/Pill */}
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                </svg>
                <span className="text-blue-600 font-bold text-sm">Same-Day Appointments Available</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
                  Healthcare at Home
                </h1>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 leading-tight">
                  Delivered with Care
                </h2>
              </div>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Professional doctors, trained nurses, lab tests, physiotherapy, elder care, medicine delivery, and more—all from the comfort of your home.
              </p>

              {/* Checklist */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-900">Verified Professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-900">Same-Day Visits</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-900">Affordable Pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-900">24×7 Support</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleBookNowClick}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Book Now
              </button>
            </div>

            {/* Right Column - Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 h-full min-h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👨‍⚕️</div>
                    <p className="text-blue-800 font-semibold text-xl">Trusted Healthcare Professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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

