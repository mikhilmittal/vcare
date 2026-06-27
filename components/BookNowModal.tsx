"use client";

import { useState } from "react";

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function BookNowModal({ isOpen, onClose, serviceName }: BookNowModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [geolocation, setGeolocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeolocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please enter it manually.");
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format phone number (remove any non-digit characters except +)
    const formattedPhone = phoneNumber.replace(/[^\d+]/g, "");
    
    // Create WhatsApp message including additional details
    const details = [
      `Name: ${name}`,
      `Phone: ${phoneNumber}`,
      gender ? `Gender: ${gender}` : undefined,
      date ? `Preferred Date: ${date}` : undefined,
      address ? `Address: ${address}` : undefined,
      geolocation ? `Geolocation: ${geolocation}` : undefined,
    ]
      .filter(Boolean)
      .join("\n");

    let message = serviceName
      ? `Hello! I would like to book ${serviceName}.\n\n${details}`
      : `Hello! I would like to book a service.\n\n${details}`;
    
    // WhatsApp API link - Your WhatsApp Business number with country code
    // Format: https://wa.me/[country code][phone number]?text=[message]
    // Number: 9206912547 (India: +91)
    const whatsappNumber = "919206912547"; // Your WhatsApp Business number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp directly
    window.open(whatsappUrl, "_blank");
    
    // Reset form
    setName("");
    setPhoneNumber("");
    setGender("");
    setDate("");
    setAddress("");
    setGeolocation("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Book Now</h2>
            {serviceName && (
              <p className="text-sm text-gray-600 mt-1">Service: {serviceName}</p>
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
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
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
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label htmlFor="geolocation" className="block text-sm font-medium text-gray-700 mb-1">
              Geolocation
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="geolocation"
                value={geolocation}
                onChange={(e) => setGeolocation(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter coordinates or use current location"
              />
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition border border-gray-300"
                title="Get current location"
              >
                📍
              </button>
            </div>
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
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Opening WhatsApp..." : "OK"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

