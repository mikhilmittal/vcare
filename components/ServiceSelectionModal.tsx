"use client";

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect: (serviceName: string) => void;
}

const services = [
  { name: "Elder Care", icon: "👴", description: "Attendant & Nursing Care" },
  { name: "Doctor Consultation", icon: "👨‍⚕️", description: "Home & Online Visits" },
  { name: "Lab Tests", icon: "🧪", description: "Blood Tests & X-Rays" },
  { name: "Critical Care", icon: "🚑", description: "ICU & Ventilator Support" },
  { name: "Pharmacy", icon: "💊", description: "Medicine Delivery" },
  { name: "Ambulance Service", icon: "🚨", description: "Emergency Transport" },
];

export default function ServiceSelectionModal({ isOpen, onClose, onServiceSelect }: ServiceSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Select a Service</h2>
            <p className="text-sm text-gray-600 mt-1">Choose the service you need</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => onServiceSelect(service.name)}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-blue-300 text-left group"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">{service.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{service.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
