"use client"

import { useState } from "react"
import { User } from "lucide-react"
import StudentNavbar from "./StudentNavbar"
// import profileBg from "../../assets/profile-banner.jpg" 

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@university.edu",
    gender: "Male",
    education: "BSc in Computer Science",
    experience: "Intern at TechCorp (2024)",
    skills: "JavaScript, React, UI/UX Design",
    references: "Prof. Smith – smith@university.edu",
    phone: "(555) 123-4567",
    bio: "Senior Computer Science student passionate about UI/UX design and front-end development.",
  })

  const skillsList = ["JavaScript", "React", "UI/UX Design", "HTML/CSS", "Figma"]

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSave = () => {
    console.log("Saved Data:", formData)
    alert("Changes saved successfully!")
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#031B4E]">
      <StudentNavbar />

      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-48 flex items-center justify-center text-white rounded-b-2xl shadow"
        // style={{ backgroundImage: `url(${profileBg})` }}
      >
        <div className="bg-[#031B4E]/70 w-full h-full flex items-center justify-center backdrop-blur-sm rounded-b-2xl">
          <h1 className="text-4xl font-bold">My Profile</h1>
        </div>
      </div>

      <div className="max-w-6xl px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="p-6 border border-[#D1E0F3] shadow-md bg-[#EFF6FF] rounded-2xl">
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center justify-center w-24 h-24 mb-4 bg-[#D6E4FF] rounded-full">
                <User className="w-10 h-10 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl font-semibold">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-sm text-[#3B82F6]">State University</p>
            </div>

            <div className="mb-6 space-y-4">
              <Info label="Email" value={formData.email} />
              <Info label="Phone" value={formData.phone} />
              <Info label="Gender" value={formData.gender} />
              <Info label="Education" value={formData.education} />
              <Info label="Experience" value={formData.experience} />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[#031B4E]">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs text-[#3B82F6] bg-blue-100 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Editable Info Section */}
          <div className="p-6 bg-white border border-[#D1E0F3] shadow-md lg:col-span-2 rounded-2xl">
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
              />
              <InputField
                label="Gender"
                id="gender"
                value={formData.gender}
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

            <div className="mt-6">
              <label htmlFor="skills" className="block mb-1 text-sm font-medium">
                Skills
              </label>
              <textarea
                id="skills"
                rows={2}
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="E.g. JavaScript, React, Figma"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="references" className="block mb-1 text-sm font-medium">
                References
              </label>
              <textarea
                id="references"
                rows={2}
                value={formData.references}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                placeholder="E.g. Prof. John Doe - johndoe@email.com"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="bio" className="block mb-1 text-sm font-medium">
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              />
              <p className="mt-1 text-xs text-gray-500">
                Brief description about yourself for employers
              </p>
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2 mt-6 font-medium text-white transition bg-[#3B82F6] rounded-lg hover:bg-[#2563EB]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable Info block
function Info({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-[#031B4E]">{label}</p>
      <p className="text-sm text-[#3B82F6]">{value}</p>
    </div>
  )
}

// Reusable input field
function InputField({ label, id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
      />
    </div>
  )
}

// Section Header
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-[#031B4E]">{title}</h3>
      <p className="text-sm text-[#3B82F6]">{subtitle}</p>
    </div>
  )
}
