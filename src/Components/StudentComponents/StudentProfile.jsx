"use client"

import { useState } from "react"
import { User } from "lucide-react"

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@university.edu",
    phone: "(555) 123-4567",
    bio: "Senior Computer Science student passionate about UI/UX design and front-end development.",
  })

  const skills = ["JavaScript", "React", "UI/UX Design", "HTML/CSS", "Figma"]

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSave = () => {
    console.log("Saved Data:", formData)
    alert("Changes saved successfully!")
  }

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-blue-900">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-md">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-blue-800" />
              </div>
              <h2 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h2>
              <p className="text-sm text-blue-600">State University</p>
            </div>

            <div className="space-y-4 mb-6">
              <Info label="Email" value={formData.email} />
              <Info label="Phone" value={formData.phone} />
              <Info label="Major" value="Computer Science" />
              <Info label="Graduation Year" value="2026" />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-700 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Editable Info */}
          <div className="lg:col-span-2 bg-white border border-blue-200 rounded-2xl p-6 shadow-md">
            <SectionHeader
              title="Personal Information"
              subtitle="Update your personal details"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField
                label="Email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                label="Phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Brief description about yourself for employers</p>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Info display block
function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-blue-700 mb-1">{label}</p>
      <p className="text-sm text-blue-600">{value}</p>
    </div>
  )
}

// Input field component
function InputField({ label, id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

// Section header
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
      <p className="text-sm text-blue-600">{subtitle}</p>
    </div>
  )
}
