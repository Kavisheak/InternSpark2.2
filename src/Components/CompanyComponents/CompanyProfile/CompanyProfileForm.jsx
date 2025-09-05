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
import { FiEdit2, FiTrash2 } from "react-icons/fi";
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

  // Logo state
  const [logoImage, setLogoImage] = useState(null); // File object for new upload
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [isDeletingLogo, setIsDeletingLogo] = useState(false);

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
    "Digital Media, Animation & Game Development",
  ];

  // Fetch company profile (including logo_img)
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
              logo_img: res.data.company.logo_img || "",
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

  // Save profile (does NOT send logo image)
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost/InternBackend/company/api/save_company_profile.php",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        toast.success(
          isProfileExists
            ? "Company profile updated successfully!"
            : "Company profile saved successfully!",
          { id: "save-success" }
        );
        setSavedData((prev) => ({ ...prev, ...formData }));
        setIsProfileExists(true);
      } else {
        toast.error("Error: " + response.data.message, { id: "save-error" });
      }
    } catch (error) {
      toast.error("Server error: " + error.message, { id: "server-error" });
    }
    setLoading(false);
  };

  // Logo preview modal
  const handleLogoClick = () => {
    setPreviewLogo(
      logoImage
        ? URL.createObjectURL(logoImage)
        : savedData.logo_img
        ? `http://localhost/InternBackend/${savedData.logo_img}`
        : null
    );
    setShowLogoModal(true);
  };

  // Upload new logo (calls dedicated API)
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoImage(file);
    setPreviewLogo(URL.createObjectURL(file));
    toast.loading("Uploading logo...");
    try {
      const data = new FormData();
      data.append("logo_img", file);
      const res = await axios.post(
        "http://localhost/InternBackend/company/api/save_company_logo.php",
        data,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.dismiss();
      if (res.data.success && res.data.logo_img) {
        setSavedData((prev) => ({ ...prev, logo_img: res.data.logo_img }));
        setLogoImage(null);
        setPreviewLogo(null);
        setShowLogoModal(false);
        toast.success("Logo uploaded successfully!");
      } else {
        toast.error(res.data.message || "Logo upload failed");
      }
    } catch {
      toast.dismiss();
      toast.error("Server error uploading logo");
    }
  };

  // Delete logo
  const handleDeleteLogo = async () => {
    setIsDeletingLogo(true);
    try {
      const res = await axios.post(
        "http://localhost/InternBackend/company/api/delete_logo.php",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setLogoImage(null);
        setSavedData((prev) => ({ ...prev, logo_img: "" }));
        setPreviewLogo(null);
        toast.success("Logo deleted.");
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch {
      toast.error("Server error deleting logo");
    }
    setIsDeletingLogo(false);
    setShowLogoModal(false);
  };

  const fields = [
    {
      label: "Company Name",
      name: "companyName",
      type: "text",
      placeholder: "e.g. TechCorp Solutions",
    },
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
            <div className="relative w-24 h-24 mb-4 group">
              {savedData.logo_img ? (
                <img
                  src={`http://localhost/InternBackend/${savedData.logo_img}`}
                  alt="Company Logo"
                  className="object-cover w-24 h-24 border-4 border-orange-400 rounded-full shadow cursor-pointer hover:scale-105"
                  onClick={handleLogoClick}
                />
              ) : (
                <div
                  className="flex items-center justify-center w-24 h-24 text-4xl text-gray-700 bg-gray-200 border-4 border-orange-400 rounded-full cursor-pointer"
                  onClick={handleLogoClick}
                >
                  <BsBuildingsFill className="w-10 h-10" />
                </div>
              )}
              <label htmlFor="logo-upload">
                <div className="absolute bottom-0 right-0 flex items-center justify-center text-lg font-bold text-white bg-orange-500 rounded-full cursor-pointer w-7 h-7 hover:bg-orange-600">
                  <FiEdit2 />
                </div>
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
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

      {/* Logo Modal */}
      {showLogoModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-60">
          <div className="relative flex flex-col items-center w-full max-w-sm p-8 mt-48 bg-white shadow-2xl rounded-xl">
            <button
              className="absolute text-2xl text-gray-500 top-4 right-4 hover:text-gray-700"
              onClick={() => setShowLogoModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            {previewLogo ? (
              <img
                src={previewLogo}
                alt="Logo Preview"
                className="object-cover w-48 h-48 mb-4 border-4 border-orange-200 rounded-full"
              />
            ) : savedData.logo_img ? (
              <img
                src={`http://localhost/InternBackend/${savedData.logo_img}`}
                alt="Logo Preview"
                className="object-cover w-48 h-48 mb-4 border-4 border-orange-200 rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-48 h-48 mb-4 bg-gray-200 rounded-full">
                <BsBuildingsFill className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="flex gap-4 mt-2">
              <label
                htmlFor="modal-logo-upload"
                className="flex items-center gap-2 px-4 py-2 text-white bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600"
              >
                <FiEdit2 />
                Edit
                <input
                  id="modal-logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              {(savedData.logo_img) && (
                <button
                  className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                  onClick={handleDeleteLogo}
                  disabled={isDeletingLogo}
                >
                  <FiTrash2 />
                  {isDeletingLogo ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
            <p className="mt-4 text-sm text-center text-gray-500">
              Click "Edit" to upload a new logo.<br />
              Click "Delete" to remove your logo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfileForm;
