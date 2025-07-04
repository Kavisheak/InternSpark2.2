// ContactInfo.jsx
import React, { useState } from 'react';

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    primaryName: 'Alex Morgan',
    primaryEmail: 'alex.morgan@techcorpsolutions.example',
    primaryPhone: '555-123-4567',
    secondaryName: 'Jordan Taylor',
    secondaryEmail: 'jordan.taylor@techcorpsolutions.example',
    secondaryPhone: '555-987-6543',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    console.log('Saved Contact Info!', formData);
    alert('Contact information saved successfully!');
  };

  return (
    <div className="p-3 mx-6 bg-gray-100 mt-7 rounded-xl">
      <div className="flex p-4 mt-4 ml-2">
        <div className="grid w-full grid-cols-1 gap-6 max-w-10xl md:grid-cols-2">
          {/* Primary Contact Card */}
          <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Primary Contact</h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                name="primaryName"
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="primaryEmail"
                onChange={handleChange}
                placeholder="e.g. alex@company.com"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="primaryPhone"
                onChange={handleChange}
                placeholder="e.g. 555-123-4567"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Secondary Contact Card */}
          <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Secondary Contact (Optional)
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                name="secondaryName"
                onChange={handleChange}
                placeholder="e.g. Jordan Taylor"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="secondaryEmail"
                onChange={handleChange}
                placeholder="e.g. jordan@company.com"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="secondaryPhone"
                onChange={handleChange}
                placeholder="e.g. 555-987-6543"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end col-span-1 md:col-span-2">
            <button
              onClick={handleSave}
              className="px-6 py-1 mt-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
