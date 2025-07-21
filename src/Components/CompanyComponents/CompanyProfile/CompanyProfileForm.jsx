import React, { useState, useEffect } from "react";
import axios from "axios";
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
    companyName: "",
    industry: "",
    companySize: "",
    location: "",
    website: "",
    email: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch company profile when component mounts
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.post(
          "http://localhost/InternBackend/api/get_company_profile.php",
          {},
          { withCredentials: true }
        );
        if (res.data.success && res.data.company) {
          setFormData({
            companyName: res.data.company.company_name || "",
            industry: res.data.company.industry || "",
            companySize: res.data.company.company_size || "",
            location: res.data.company.location || "",
            website: res.data.company.website || "",
            email: res.data.company.email || "",
            about: res.data.company.about || "",
          });
        } else {
          setMessage("No company profile found.");
        }
      } catch (err) {
        setMessage("Failed to load company profile.");
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost/InternBackend/api/save_company_profile.php",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        setMessage("Company profile saved successfully!");
      } else {
        setMessage("Error: " + response.data.message);
      }
    } catch (error) {
      setMessage("Server error: " + error.message);
    }
    setLoading(false);
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
      placeholder: "e.g. https://techcorp.example",
    },
    {
      label: "Company Email",
      name: "email",
      type: "email",
      placeholder: "e.g. contact@techcorp.example",
      disabled: true, // Email is read-only
    },
  ];

  return (
    <div className="max-w-5xl p-6 mx-auto mt-1 bg-white rounded-lg shadow-sm">
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
                <strong>Size:</strong> {formData.companySize || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#2128BD]" />
              <span>
                <strong>Location:</strong> {formData.location || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 break-all">
              <FaGlobe className="text-[#2128BD]" />
              <span>
                <strong>Website:</strong>{" "}
                {formData.website ? (
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {formData.website}
                  </a>
                ) : (
                  "N/A"
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 break-all">
              <FaEnvelope className="text-[#2128BD]" />
              <span>
                <strong>Email:</strong> {formData.email || "N/A"}
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
            {fields.map(({ label, name, type, placeholder, disabled }) => (
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
                  disabled={disabled}
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
              disabled={loading}
              className="px-6 py-2 text-sm font-semibold text-white bg-[#2128BD] rounded-md shadow hover:bg-[#1a209a] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          {message && (
            <p
              className={`mt-4 text-center font-semibold ${
                message.startsWith("Error") || message.startsWith("Failed")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
