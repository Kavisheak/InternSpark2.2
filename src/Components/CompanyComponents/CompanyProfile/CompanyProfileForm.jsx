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
import toast from "react-hot-toast";

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

  const [savedData, setSavedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isProfileExists, setIsProfileExists] = useState(false);

  // ICT industries list in srilanka
  const industries = [
 "Software Development & Services",
  "IT Consulting & Business Process Management (BPM/BPO)",
  "Telecommunications",
  "Networking & Infrastructure Services",
  "Computer Hardware & Electronics Distribution",
  "Cybersecurity Services",
  "Cloud Computing & Hosting Services",
  "Big Data & Analytics",
  "Artificial Intelligence (AI) & Machine Learning (ML)",
  "Internet of Things (IoT)",
  "FinTech & Digital Payments",
  "E-Government & Digital Transformation Projects",
  "E-Commerce & Digital Marketing",
  "Educational Technology (EdTech)",
  "HealthTech & Telemedicine Solutions",
  "Robotics & Automation",
  "Digital Media, Animation & Game Development"
  ];

  useEffect(() => {
    let isMounted = true;
    async function fetchProfile() {
      try {
        const res = await axios.post(
          "http://localhost/InternBackend/company/api/get_company_profile.php",
          {},
          { withCredentials: true }
        );
        if (isMounted) {
          if (res.data.success && res.data.company) {
            const companyData = {
              companyName: res.data.company.company_name || "",
              industry: res.data.company.industry || "",
              companySize: res.data.company.company_size || "",
              location: res.data.company.location || "",
              website: res.data.company.website || "",
              email: res.data.company.email || "",
              about: res.data.company.about || "",
            };
            setFormData(companyData);
            setSavedData(companyData);
            setIsProfileExists(true);
          } else {
            setIsProfileExists(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          toast.error("Failed to load company profile.", { id: "load-fail" });
        }
        console.error(err);
      }
    }
    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost/InternBackend/company/api/save_company_profile.php",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(
          isProfileExists
            ? "Company profile updated successfully!"
            : "Company profile saved successfully!",
          { id: "save-success" }
        );
        setSavedData(formData);
        setIsProfileExists(true);
      } else {
        toast.error("Error: " + response.data.message, { id: "save-error" });
      }
    } catch (error) {
      toast.error("Server error: " + error.message, { id: "server-error" });
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
    // industry field will be handled separately as dropdown
    {
      label: "Company Size",
      name: "companySize",
      type: "text",
      placeholder: "e.g. 50-200",
    },
    {
      label: "Address",
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
      disabled: true,
    },
  ];

  return (
    <div className="max-w-5xl p-6 mx-auto mt-1 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="flex flex-col justify-between p-6 bg-white border border-gray-200 shadow-md rounded-xl">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-24 h-24 mb-4 border-2 rounded-full shadow-lg border-oxfordblue text-oxfordblue">
              <BsBuildingsFill className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-center text-oxfordblue">
              {savedData.companyName || "Company Name"}
            </h2>
            <p className="text-center text-gray-600">
              {savedData.industry || "Industry"}
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaUsers className="text-oxfordblue" />
              <span>
                <strong>Size:</strong> {savedData.companySize || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-oxfordblue" />
              <span>
                <strong>Address:</strong> {savedData.location || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 break-all">
              <FaGlobe className="text-oxfordblue" />
              <span>
                <strong>Website:</strong>{" "}
                {savedData.website ? (
                  <a
                    href={savedData.website}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-oxfordblue hover:text-orange-500"
                  >
                    {savedData.website}
                  </a>
                ) : (
                  "N/A"
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 break-all">
              <FaEnvelope className="text-oxfordblue" />
              <span>
                <strong>Email:</strong> {savedData.email || "N/A"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <FaInfoCircle className="mt-1 text-oxfordblue" />
              <div>
                <p className="font-semibold">About:</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {savedData.about || "No description provided."}
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
                  className="w-full px-3 py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oxfordblue"
                />
              </div>
            ))}

            {/* Industry Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Industry
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oxfordblue"
              >
                <option value="">Select an industry</option>
                {industries.map((ind, idx) => (
                  <option key={idx} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
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
              className="w-full px-3 py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oxfordblue"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 rounded-md shadow hover:bg-orange-600 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : isProfileExists
                ? "Update Profile"
                : "Save Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
