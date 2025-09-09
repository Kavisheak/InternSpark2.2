"use client";
import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { FiChevronDown, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import Footer from "../CompanyComponents/Footer";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function StudentProfile() {
  const [savedData, setSavedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    education: "",
    experience: "",
    phone: "",
    github: "",
    linkedin: "",
    profile_img: "",
    cv_file: "",
  });

  const [formData, setFormData] = useState({ ...savedData });
  const [skillsList, setSkillsList] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch existing student profile
  useEffect(() => {
    axios
      .get("http://localhost/InternBackend/students/api/get_student_profile.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success && res.data.student) {
          const st = res.data.student;
          const profile = {
            firstName: st.fname || "",
            lastName: st.lname || "",
            email: st.email || "",
            gender: st.gender || "",
            education: st.education || "",
            experience: st.experience || "",
            phone: st.phone || "",
            github: st.github || "",
            linkedin: st.linkedin || "",
            profile_img: st.profile_img || "",
            cv_file: st.cv_file || "",
          };
          setSavedData(profile);
          setFormData(profile);
          setSkillsList(st.skills ?? []);
        } else if (res.data.success && !res.data.student) {
          setSavedData((prev) => ({ ...prev, email: res.data.email }));
          setFormData((prev) => ({ ...prev, email: res.data.email }));
        } else {
          toast.error(res.data.message || "Failed to fetch profile");
        }
      })
      .catch(() => toast.error("Server error fetching profile"));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((f) => ({ ...f, [id]: value }));
  };

  const handleAddSkill = () => {
    const s = newSkill.trim();
    if (s && !skillsList.includes(s)) {
      setSkillsList((list) => [...list, s]);
      toast.success(`✅ "${s}" added`);
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skill) => {
    setSkillsList((list) => list.filter((x) => x !== skill));
    toast(`❌ Removed "${skill}"`, { icon: "🗑️" });
  };

  const isValidSriLankanPhone = (phone) => {
    const localPattern = /^07\d{8}$/;
    const intlPattern = /^\+947\d{8}$/;
    return localPattern.test(phone) || intlPattern.test(phone);
  };

  const handleSave = async () => {
    if (!isValidSriLankanPhone(formData.phone)) {
      toast.error("❌ Invalid phone number");
      return;
    }

    const data = new FormData();
    data.append("fname", formData.firstName);
    data.append("lname", formData.lastName);
    data.append("gender", formData.gender);
    data.append("education", formData.education);
    data.append("experience", formData.experience);
    data.append("phone", formData.phone);
    data.append("github", formData.github);
    data.append("linkedin", formData.linkedin);
    data.append("skills", JSON.stringify(skillsList));
    if (profileImage) data.append("profileImage", profileImage);
    if (cvFile) data.append("cvFile", cvFile);

    try {
      const res = await axios.post(
        "http://localhost/InternBackend/students/api/save_student_profile.php",
        data,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        toast.dismiss("main-toast");
        toast.success("Profile saved successfully!",{ id: "main-toast" });
        setSavedData({ ...formData });
      } else {
        toast.dismiss("main-toast");
        toast.error(res.data.message || "Save failed",{ id: "main-toast" });
      }
    } catch {
      toast.error("Server error saving profile");
    }
  };

  // Handle profile image click
  const handleProfileImageClick = () => {
    setPreviewImage(profileImage
      ? URL.createObjectURL(profileImage)
      : savedData.profile_img
        ? `http://localhost/InternBackend/${savedData.profile_img}`
        : null
    );
    setShowImageModal(true);
  };

  // Handle new image upload in modal
  const handleModalImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      toast.success("New profile image selected. Save to apply.");
    }
  };

  // Handle delete profile image
  const handleDeleteProfileImage = async () => {
    setIsDeleting(true);
    try {
      const res = await axios.post(
        "http://localhost/InternBackend/students/api/delete_profile_image.php",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setProfileImage(null);
        setSavedData((prev) => ({ ...prev, profile_img: "" }));
        setPreviewImage(null);
        toast.success("Profile image deleted.");
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch {
      toast.error("Server error deleting image");
    }
    setIsDeleting(false);
    setShowImageModal(false);
  };

  const handleCVDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setCvFile(file);
        toast.success("CV selected!");
      } else {
        toast.error("Only PDF files are allowed.");
      }
    }
  };

  const handleCVDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen text-[#14213D] bg-white fade-in-up">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">My Profile</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="p-6 border border-[#D1D5DB] shadow-md bg-[#F8FAFC] rounded-2xl overflow-hidden">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-4 group">
                {profileImage || savedData.profile_img ? (
                  <img
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : `http://localhost/InternBackend/${savedData.profile_img}`
                    }
                    alt="Profile"
                    className="object-cover w-24 h-24 transition duration-200 rounded-full cursor-pointer hover:scale-105"
                    onClick={handleProfileImageClick}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-24 h-24 text-3xl text-gray-700 bg-gray-300 rounded-full cursor-pointer"
                    onClick={handleProfileImageClick}
                  >
                    <User className="w-10 h-10" />
                  </div>
                )}
                <label htmlFor="profile-upload">
                  <div className="absolute bottom-0 right-0 flex items-center justify-center text-lg font-bold text-white bg-gray-500 rounded-full cursor-pointer w-7 h-7 hover:bg-gray-700">
                    <FiEdit2 />
                  </div>
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="hidden"
                />
              </div>
              <h2 className="max-w-full text-xl font-semibold text-center break-words">
                {savedData.firstName} {savedData.lastName}
              </h2>
              <p className="max-w-full text-sm text-center text-gray-600 break-all">
                {savedData.email}
              </p>
            </div>

            <div className="mb-6 space-y-4">
              <Info label="Email" value={savedData.email} />
              <Info label="Phone" value={savedData.phone} />
              <Info label="Gender" value={savedData.gender} />
              <Info label="Education" value={savedData.education} />
              <Info label="Experience" value={savedData.experience} />
              <Info label="GitHub" value={savedData.github} />
              <Info label="LinkedIn" value={savedData.linkedin} />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((s, i) => (
                  <span
                    key={i}
                    className="flex items-center max-w-full gap-1 px-3 py-1 text-xs text-white break-words rounded-full bg-oxfordblue"
                  >
                    {s}
                    <button
                      onClick={() => handleRemoveSkill(s)}
                      className="ml-1 text-xs hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {savedData.cv_file && (
              <div className="mt-4">
                <a
                  href={`http://localhost/InternBackend/${savedData.cv_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline break-all"
                >
                  View/Download CV
                </a>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="p-6 bg-white border border-gray-200 shadow-md lg:col-span-2 rounded-2xl">
            <SectionHeader title="Personal Information" subtitle="Update your personal details" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField label="First Name" id="firstName" value={formData.firstName} onChange={handleChange} />
              <InputField label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange} />
              <InputField label="Email" id="email" value={formData.email} onChange={handleChange} disabled />

              <div>
                <label htmlFor="gender" className="block mb-1 text-sm font-medium">
                  Gender
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="block w-full appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <FiChevronDown className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-2 top-1/2" size={20} />
                </div>
              </div>

              <InputField label="Phone" id="phone" value={formData.phone} onChange={handleChange} />
              <InputField label="GitHub URL" id="github" value={formData.github} onChange={handleChange} />
              <InputField label="LinkedIn URL" id="linkedin" value={formData.linkedin} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
              <InputField label="Education" id="education" value={formData.education} onChange={handleChange} />
              <InputField label="Experience" id="experience" value={formData.experience} onChange={handleChange} />
            </div>

            <div className="mt-6">
              <label className="block mb-1 text-sm font-medium">Add Skill</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="E.g. HTML, Python"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 text-white bg-[#FCA311] rounded-lg hover:bg-[#e6960f]"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-1 text-sm font-medium">Upload CV (PDF)</label>
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition ${
                  cvFile ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50"
                }`}
                onClick={() => document.getElementById("cv-upload").click()}
                onDrop={handleCVDrop}
                onDragOver={handleCVDragOver}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf"
                  onChange={(e) => setCvFile(e.target.files[0])}
                  className="hidden"
                />
                <span className="text-2xl text-[#FCA311] mb-2">
                  <FiEdit2 />
                </span>
                <span className="font-medium text-gray-700">
                  {cvFile ? "CV Selected" : "Drag & drop or click to upload your CV"}
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  Only PDF files. Max size: 2MB.
                </span>
                {cvFile && (
                  <div className="flex flex-col items-center mt-4">
                    <span className="text-sm font-semibold text-green-700">{cvFile.name}</span>
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = URL.createObjectURL(cvFile);
                          window.open(url, "_blank");
                        }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCvFile(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                {!cvFile && savedData.cv_file && (
                  <div className="flex flex-col items-center mt-4">
                    <button
                      type="button"
                      className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => {
                        window.open(`http://localhost/InternBackend/${savedData.cv_file}`, "_blank");
                      }}
                    >
                      View Existing CV
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2 mt-6 text-white bg-[#FCA311] rounded-lg hover:bg-[#e6960f]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <Footer />

      {/* Profile Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-60">
          <div className="relative flex flex-col items-center w-full max-w-sm p-8 mt-32 bg-white shadow-2xl rounded-xl">
            <button
              className="absolute text-2xl text-gray-500 top-4 right-4 hover:text-gray-700"
              onClick={() => setShowImageModal(false)}
              aria-label="Close"
            >
              <FiX />
            </button>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
               className="object-cover w-24 h-24 mb-4 border-4 border-blue-200 rounded-full md:w-48 md:h-48"
              />
            ) : (
              <div className="flex items-center justify-center w-48 h-48 mb-4 bg-gray-200 rounded-full">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="flex gap-4 mt-2">
              <label
                htmlFor="modal-profile-upload"
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
              >
                <FiEdit2 />
                Edit
                <input
                  id="modal-profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleModalImageUpload}
                  className="hidden"
                />
              </label>
              {(profileImage || savedData.profile_img) && (
                <button
                  className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                  onClick={handleDeleteProfileImage}
                  disabled={isDeleting}
                >
                  <FiTrash2 />
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
            <p className="mt-4 text-sm text-center text-gray-500">
              Click "Edit" to upload a new profile picture.<br />
              Click "Delete" to remove your profile picture.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="max-w-full">
      <p className="mb-1 text-sm font-medium">{label}</p>
      <p className="max-w-full text-sm text-gray-600 break-words break-all">{value || "-"}</p>
    </div>
  );
}

function InputField({ label, id, value, onChange, disabled }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium">{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA311] ${
          disabled ? "bg-gray-100" : ""
        }`}
      />
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}