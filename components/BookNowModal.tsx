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
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format phone number (remove any non-digit characters except +)
    const formattedPhone = phoneNumber.replace(/[^\d+]/g, "");
    
    // Create WhatsApp message with service name if provided
    let message = `Hello! I would like to book a service.\n\nName: ${name}\nPhone: ${phoneNumber}`;
    if (serviceName) {
      message = `Hello! I would like to book ${serviceName}.\n\nName: ${name}\nPhone: ${phoneNumber}`;
    }
    
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

