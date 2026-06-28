"use client";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

export default function ConfirmationModal({ isOpen, onClose, phoneNumber }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Received!</h2>

        <p className="text-gray-600 mb-2">
          We have received your order. We will contact you on{" "}
          <span className="font-semibold text-gray-800">{phoneNumber}</span> shortly to confirm your booking.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
}
