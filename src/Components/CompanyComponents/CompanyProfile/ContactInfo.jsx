import React, { useState } from "react";

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    primaryName: "Alex Morgan",
    primaryEmail: "alex.morgan@techcorpsolutions.example",
    primaryPhone: "555-123-4567",
    secondaryName: "Jordan Taylor",
    secondaryEmail: "jordan.taylor@techcorpsolutions.example",
    secondaryPhone: "555-987-6543",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    console.log("Saved Contact Info!", formData);
    alert("Contact information saved successfully!");
  };

  return (
    <div className="p-6 mx-6 mt-6 shadow-sm bg-sky-50 rounded-xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Primary Contact */}
        <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold text-[#2128BD]">
            Primary Contact
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              name="primaryName"
              value={formData.primaryName}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2128BD]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="primaryEmail"
              value={formData.primaryEmail}
              onChange={handleChange}
              placeholder="e.g. alex@company.com"
              className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2128BD]"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleChange}
              placeholder="e.g. 555-123-4567"
              className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2128BD]"
            />
          </div>
        </div>

        {/* Secondary Contact */}
        <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold text-[#2128BD]">
            Secondary Contact (Optional)
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              name="secondaryName"
              value={formData.secondaryName}
              onChange={handleChange}
              placeholder="e.g. Jordan Taylor"
              className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2128BD]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="secondaryEmail"
              value={formData.secondaryEmail}
              onChange={handleChange}
              placeholder="e.g. jordan@company.com"
              className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2128BD]"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleChange}
              placeholder="e.g. 555-987-6543"
              className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2128BD]"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end col-span-1 mt-4 md:col-span-2">
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-semibold text-white bg-[#2128BD] rounded-md shadow hover:bg-[#1a209a]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
