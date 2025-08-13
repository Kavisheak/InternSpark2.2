"use client";
import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import Footer from "../CompanyComponents/Footer";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // non-editable
    gender: "",
    education: "",
    experience: "",
    phone: "",
    github: "",
    linkedin: "",
  });
  const [skillsList, setSkillsList] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  // On load: fetch existing student profile or default email
  useEffect(() => {
    axios
      .get(
        "http://localhost/InternBackend/students/api/get_student_profile.php",
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success && res.data.student) {
          const st = res.data.student;
          setFormData({
            firstName: st.fname || "",
            lastName: st.lname || "",
            email: st.email, // from user table
            gender: st.gender || "",
            education: st.education || "",
            experience: st.experience || "",
            phone: st.phone || "",
            github: st.github || "",
            linkedin: st.linkedin || "",
            profile_img: st.profile_img || "", // ✅ add this
            cv_file: st.cv_file || "",
          });
          setSkillsList(st.skills ?? []);
        } else if (res.data.success && !res.data.student) {
          // no student row yet but still get email
          setFormData((prev) => ({ ...prev, email: res.data.email }));
        } else {
          toast.error(res.data.message || "Failed to fetch profile");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server error fetching profile");
      });
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

  const handleSave = async () => {
    console.log("Saving profile...");

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
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Server response:", res.data); // ✅ Show what backend says

      if (res.data.success) {
        toast.success("Profile saved successfully!");
      } else {
        toast.error(res.data.message || "Save failed");
      }
    } catch (err) {
      console.error("Error saving profile:", err); // ✅ show any error
      toast.error("Server error saving profile");
    }
  };

  return (
    <div className="min-h-screen text-[#14213D] bg-white fade-in-up">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-[#14213D]">My Profile</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="p-6 border border-[#D1D5DB] shadow-md bg-[#F8FAFC] rounded-2xl">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-4">
                {profileImage || formData.profile_img ? (
                  <img
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : formData.profile_img
                        ? `http://localhost/InternBackend/${formData.profile_img}`
                        : ""
                    }
                    alt="Profile"
                    className="object-cover w-24 h-24 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 text-3xl text-gray-700 bg-gray-300 rounded-full">
                    <User className="w-10 h-10" />
                  </div>
                )}

                <label htmlFor="profile-upload">
                  <div className="absolute bottom-0 right-0 flex items-center justify-center text-lg font-bold text-white bg-gray-500 rounded-full cursor-pointer w-7 h-7 hover:bg-gray-700">
                    +
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
              <h2 className="text-xl font-semibold">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-sm text-gray-600">{formData.email}</p>
            </div>
            <div className="mb-6 space-y-4">
              <Info label="Email" value={formData.email} />
              <Info label="Phone" value={formData.phone} />
              <Info label="Gender" value={formData.gender} />
              <Info label="Education" value={formData.education} />
              <Info label="Experience" value={formData.experience} />
              <Info label="GitHub" value={formData.github} />
              <Info label="LinkedIn" value={formData.linkedin} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#14213D]">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((s, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-3 py-1 text-xs text-white rounded-full bg-oxfordblue"
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

            {formData.cv_file && (
              <div className="mt-4">
                <a
                  href={`http://localhost/InternBackend/${formData.cv_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  View/Download CV
                </a>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-md lg:col-span-2 rounded-2xl">
            <SectionHeader
              title="Personal Information"
              subtitle="Update your personal details"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                label="First Name"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <InputField
                label="Gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              />
              <InputField
                label="Phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <InputField
                label="GitHub URL"
                id="github"
                value={formData.github}
                onChange={handleChange}
              />
              <InputField
                label="LinkedIn URL"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
              <InputField
                label="Education"
                id="education"
                value={formData.education}
                onChange={handleChange}
              />
              <InputField
                label="Experience"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            {/* Add skill */}
            <div className="mt-6">
              <label className="block mb-1 text-sm font-medium text-[#14213D]">
                Add Skill
              </label>
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

            {/* Upload CV */}
            <div className="mt-6">
              <label
                htmlFor="cv"
                className="block mb-1 text-sm font-medium text-[#14213D]"
              >
                Upload CV (PDF)
              </label>
              <input
                type="file"
                id="cv"
                accept=".pdf"
                onChange={(e) => {
                  setCvFile(e.target.files[0]);
                }}
                className="block w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCA311]"
              />
              {cvFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {cvFile.name}
                </p>
              )}
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
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-[#14213D]">{label}</p>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  );
}

function InputField({ label, id, value, onChange, disabled }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-[#14213D]"
      >
        {label}
      </label>
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
      <h3 className="text-xl font-semibold text-[#14213D]">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}
