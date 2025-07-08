"use client"

import { useState } from "react"
import { User, Download } from "lucide-react"
import StudentNavbar from "./StudentNavbar"

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@university.edu",
    phone: "(555) 123-4567",
    bio: "Senior Computer Science student passionate about UI/UX design and front-end development."
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
    <div className="min-h-screen text-blue-900 bg-white">
      <StudentNavbar/>
      <div className="p-6 mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Sidebar */}
            <div className="p-6 border border-blue-200 shadow-sm bg-blue-50 rounded-xl">
            <div className="flex flex-col items-center mb-6">
                <div className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-200 rounded-full">
                <User className="w-10 h-10 text-blue-800" />
                </div>
                <h2 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h2>
                <p className="text-blue-600">State University</p>
            </div>

            <div className="mb-6 space-y-4">
                <Info label="Email" value={formData.email} />
                <Info label="Phone" value={formData.phone} />
                <Info label="Major" value="Computer Science" />
                <Info label="Graduation Year" value="2026" />
            </div>

            <div className="mb-6">
                <p className="mb-2 text-sm font-medium text-blue-700">Skills</p>
                <p className="text-sm text-blue-800">{skills.join(" · ")}</p>
            </div>
            </div>



          {/* Right Panel - Only Personal Info */}
          <div className="p-6 bg-white border border-blue-200 shadow-sm lg:col-span-2 rounded-xl">
            <SectionHeader title="Personal Information" subtitle="Update your personal details" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block mb-1 text-sm font-medium">First Name</label>
                <input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1 text-sm font-medium">Last Name</label>
                <input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
                <input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 text-sm font-medium">Phone</label>
                <input
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="bio" className="block mb-1 text-sm font-medium">Bio</label>
              <textarea
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded resize-none"
              />
              <p className="mt-1 text-xs text-gray-500">Brief description about yourself for employers</p>
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2 mt-6 font-medium text-white transition bg-blue-700 rounded hover:bg-blue-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Info block component
function Info({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-blue-700">{label}</p>
      <p className="text-sm text-blue-600">{value}</p>
    </div>
  )
}

// Header for form sections
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-blue-600">{subtitle}</p>
    </div>
  )
}
