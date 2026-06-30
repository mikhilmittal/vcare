"use client";

import { useState, useEffect } from "react";

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  onConfirm: (serviceName: string, subCategory: string, notes: string) => void;
}

const serviceSubCategories: Record<string, string[]> = {
  "Elder Care": [
    "24x7 Elder Care Attendant",
    "Day Care Attendant (12 Hours)",
    "Night Care Attendant",
    "Personal Hygiene Assistance",
    "Mobility Assistance",
    "Physiotherapy at Home",
    "Doctor Home Visit",
    "Nurse Home Visit",
  ],
  "Doctor Consultation": [
    "General Physician Visit",
    "Pulmonologist",
    "Online Consultation",
    "Home Visit Consultation",
  ],
  "Lab Tests": [
    "Complete Blood Count (CBC)",
    "Blood Sugar Test",
    "HbA1c",
    "Lipid Profile",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT)",
    "Thyroid Profile",
    "Vitamin D Test",
    "Vitamin B12 Test",
    "Urine Test",
    "ECG at Home",
    "Portable X-Ray",
    "Sample Collection",
  ],
  "Critical Care": [
    "ICU Setup at Home",
    "Ventilator Support",
    "Oxygen Therapy",
    "BiPAP/CPAP Support",
    "Post ICU Recovery",
    "24x7 Critical Care Nurse",
    "Cardiac Monitoring",
    "IV Fluid Administration",
    "Catheter Care",
    "Wound Dressing",
    "Tracheostomy Care",
    "Nebulization",
  ],
};

export default function SubCategoryModal({
  isOpen,
  onClose,
  serviceName,
  onConfirm,
}: SubCategoryModalProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedService, setSelectedService] = useState(serviceName);

  useEffect(() => {
    setSelectedService(serviceName);
    setSelectedSubCategory("");
  }, [serviceName]);

  if (!isOpen) return null;

  const subCategories = serviceSubCategories[selectedService] || [];

  const handleConfirm = () => {
    if (!selectedService) {
      alert("Please select a service");
      return;
    }
    if (!selectedSubCategory) {
      alert("Please select a service type");
      return;
    }
    onConfirm(selectedService, selectedSubCategory, notes);
    setSelectedSubCategory("");
    setNotes("");
    setSelectedService("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Select Service</h2>
            <p className="text-sm text-gray-600 mt-1">{serviceName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {!serviceName && (
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                id="service"
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  setSelectedSubCategory("");
                }}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a service</option>
                {Object.keys(serviceSubCategories).map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <select
              id="subCategory"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              required
              disabled={!selectedService}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">Select a service type</option>
              {subCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Any specific requirements or notes..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
