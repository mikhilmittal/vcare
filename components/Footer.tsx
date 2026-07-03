"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Swasthghar</h3>
            <p className="text-gray-400">
              Jamshedpur&apos;s trusted home healthcare platform &mdash; quality medical care delivered right to your doorstep.
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
            <p className="text-gray-400 mb-2">Phone: +91 83404 20129</p>
            <p className="text-gray-400 mb-4">Email: swasthghar@protonmail.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Swasthghar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

