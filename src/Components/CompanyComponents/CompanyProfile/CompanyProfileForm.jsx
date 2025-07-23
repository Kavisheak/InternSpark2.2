import React, { useState } from "react";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaGlobe,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";

const CompanyProfileForm = () => {
  const [formData, setFormData] = useState({
    companyName: "TechCorp Solutions",
    industry: "Information Technology",
    companySize: "50-200",
    location: "San Francisco, CA",
    website: "https://techcorpsolutions.example",
    email: "careers@techcorpsolutions.example",
    about: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log("Saved Company Profile!", formData);
    alert("Company profile saved successfully!");
  };

  const fields = [
    {
      label: "Company Name",
      name: "companyName",
      type: "text",
      placeholder: "e.g. TechCorp Solutions",
    },
    {
      label: "Industry",
      name: "industry",
      type: "text",
      placeholder: "e.g. Information Technology",
    },
    {
      label: "Company Size",
      name: "companySize",
      type: "text",
      placeholder: "e.g. 50-200",
    },
    {
      label: "Location",
      name: "location",
      type: "text",
      placeholder: "e.g. San Francisco, CA",
    },
    {
      label: "Website",
      name: "website",
      type: "text",
      placeholder: "e.g. https://techcorpsolutions.example",
    },
    {
      label: "Company Email",
      name: "email",
      type: "email",
      placeholder: "e.g. careers@techcorpsolutions.example",
    },
  ];

  return (
    <div className="p-6 mt-1 rounded-lg shadow-sm bg-sky-50">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="flex flex-col justify-between p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-24 h-24 mb-4 border-2 border-[#2128BD] rounded-full shadow-lg text-[#2128BD]">
              <BsBuildingsFill className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-center text-[#2128BD]">
              {formData.companyName || "Company Name"}
            </h2>
            <p className="text-center text-gray-600">
              {formData.industry || "Industry"}
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaUsers className="text-[#2128BD]" />
              <span>
                <strong>Size:</strong> {formData.companySize}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#2128BD]" />
              <span>
                <strong>Location:</strong> {formData.location}
              </span>
            </div>
            <div className="flex items-center gap-2 break-all">
              <FaGlobe className="text-[#2128BD]" />
              <span>
                <strong>Website:</strong>{" "}
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {formData.website}
                </a>
              </span>
            </div>
            <div className="flex items-center gap-2 break-all">
              <FaEnvelope className="text-[#2128BD]" />
              <span>
                <strong>Email:</strong> {formData.email}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <FaInfoCircle className="mt-1 text-[#2128BD]" />
              <div>
                <p className="font-semibold">About:</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {formData.about || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="flex flex-col justify-between p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2128BD]"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write about your company here..."
              rows="4"
              className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-300 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2128BD]"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-semibold text-white bg-[#2128BD] rounded-md shadow hover:bg-[#1a209a]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
