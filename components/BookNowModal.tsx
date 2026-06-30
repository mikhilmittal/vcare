"use client";

import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  subCategory?: string;
  notes?: string;
}

export default function BookNowModal({ isOpen, onClose, serviceName, subCategory, notes }: BookNowModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only letters, spaces, and max 50 characters
    if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 50) {
      setName(value);
      setNameError("");
    } else if (value.length > 50) {
      setNameError("Name must be 50 characters or less");
    } else {
      setNameError("Name can only contain letters and spaces");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits and max 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
      if (value.length === 10) {
        setPhoneError("");
      } else if (value.length > 0) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("Phone number can only contain digits");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submit
    let hasError = false;
    
    if (!name || name.length === 0) {
      setNameError("Name is required");
      hasError = true;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError("Name can only contain letters and spaces");
      hasError = true;
    } else if (name.length > 50) {
      setNameError("Name must be 50 characters or less");
      hasError = true;
    }
    
    if (!phoneNumber || phoneNumber.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    setIsSubmitting(true);

    // Combine address parts
    const addressParts = [
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
    ].filter(Boolean).join(", ");

    try {
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceName: serviceName || 'Service Booking',
          subCategory: subCategory || '',
          notes: notes || '',
          name,
          phone: phoneNumber,
          gender,
          date,
          address: addressParts,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error sending WhatsApp message:', errorData);
        setSubmitError('Failed to send booking. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setShowConfirmation(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to send booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Reset form
    setName("");
    setPhoneNumber("");
    setGender("");
    setDate("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPincode("");
    setSubmitError("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <>
      {!showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Book Now</h2>
              {(serviceName || subCategory) && (
                <p className="text-sm text-gray-600 mt-1">
                  Service: {serviceName}{serviceName && subCategory ? ' - ' : ''}{subCategory}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
                maxLength={50}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                  nameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
                }`}
                placeholder="Enter your name"
              />
              {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                required
                maxLength={10}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                  phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
                }`}
                placeholder="Enter your phone number"
              />
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="space-y-3">
                <div>
                  <label htmlFor="addressLine1" className="block text-xs text-gray-600 mb-1">
                    House/Flat No, Building, Street *
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 123, Main Street"
                  />
                </div>
                <div>
                  <label htmlFor="addressLine2" className="block text-xs text-gray-600 mb-1">
                    Area/Locality
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Near Central Park"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="city" className="block text-xs text-gray-600 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-xs text-gray-600 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-xs text-gray-600 mb-1">
                    Pincode/ZIP *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 110001"
                  />
                </div>
              </div>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {submitError}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Book Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
      )}

    <ConfirmationModal
      isOpen={showConfirmation}
      onClose={handleConfirmationClose}
      phoneNumber={phoneNumber}
    />
    </>
  );
}

