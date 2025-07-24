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
    <div className="p-6 mx-6 mt-6 bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Primary Contact */}
        <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold text-oxfordblue">
            Primary Contact
          </h2>

          {["primaryName", "primaryEmail", "primaryPhone"].map((field, i) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-semibold text-gray-700">
                {["Contact Name", "Email", "Phone Number"][i]}
              </label>
              <input
                type={field.includes("Email") ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oxfordblue"
              />
            </div>
          ))}
        </div>

        {/* Secondary Contact */}
        <div className="p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold text-oxfordblue">
            Secondary Contact (Optional)
          </h2>

          {["secondaryName", "secondaryEmail", "secondaryPhone"].map(
            (field, i) => (
              <div className="mb-4" key={field}>
                <label className="block text-sm font-semibold text-gray-700">
                  {["Contact Name", "Email", "Phone Number"][i]}
                </label>
                <input
                  type={field.includes("Email") ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oxfordblue"
                />
              </div>
            )
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end col-span-1 mt-4 md:col-span-2">
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 rounded-md shadow hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
