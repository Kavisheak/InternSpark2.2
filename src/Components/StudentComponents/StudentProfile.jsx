"use client"

import { useState } from "react"
import { User } from "lucide-react"
import Footer from "../CompanyComponents/Footer"

export default function StudentProfile() {
  // Permanent saved data
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@university.edu",
    gender: "Male",
    education: "BSc in Computer Science",
    experience: "Intern at TechCorp (2024)",
    phone: "(555) 123-4567",
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
  })

  // Temporary form edits
  const [tempData, setTempData] = useState(formData)

  const [skillsList, setSkillsList] = useState(["JavaScript", "React", "UI/UX Design"])
  const [newSkill, setNewSkill] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [cvFile, setCvFile] = useState(null)

  const handleTempChange = (e) => {
    const { id, value } = e.target
    setTempData({ ...tempData, [id]: value })
  }

  const handleAddSkill = () => {
    const skill = newSkill.trim()
    if (skill && !skillsList.includes(skill)) {
      setSkillsList([...skillsList, skill])
    }
    setNewSkill("")
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter(skill => skill !== skillToRemove))
  }

  const handleSave = () => {
    setFormData(tempData) // Save changes
    console.log("Saved Data:", { ...tempData, skills: skillsList })
    if (profileImage) console.log("Uploaded Profile Image:", profileImage.name)
    if (cvFile) console.log("Uploaded CV File:", cvFile.name)
    alert("Changes saved successfully!")
  }

  return (
    <div className="min-h-screen text-[#14213D] bg-white fade-in-up">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-[#14213D]">My Profile</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="p-6 border border-[#D1D5DB] shadow-md bg-[#F8FAFC] rounded-2xl">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-4">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
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
              <p className="text-sm text-gray-600">State University</p>
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
                {skillsList.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-3 py-1 text-xs text-white rounded-full bg-oxfordblue"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-xs hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Editable Info */}
          <div className="p-6 bg-white border border-gray-200 shadow-md lg:col-span-2 rounded-2xl">
            <SectionHeader
              title="Personal Information"
              subtitle="Update your personal details"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField label="First Name" id="firstName" value={tempData.firstName} onChange={handleTempChange} />
              <InputField label="Last Name" id="lastName" value={tempData.lastName} onChange={handleTempChange} />
              <InputField label="Email" id="email" value={tempData.email} onChange={handleTempChange} />
              <InputField label="Gender" id="gender" value={tempData.gender} onChange={handleTempChange} />
              <InputField label="Phone" id="phone" value={tempData.phone} onChange={handleTempChange} />
              <InputField label="GitHub URL" id="github" value={tempData.github} onChange={handleTempChange} />
              <InputField label="LinkedIn URL" id="linkedin" value={tempData.linkedin} onChange={handleTempChange} />
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
              <InputField label="Education" id="education" value={tempData.education} onChange={handleTempChange} />
              <InputField label="Experience" id="experience" value={tempData.experience} onChange={handleTempChange} />
            </div>

            {/* Add Skill */}
            <div className="mt-6">
              <label className="block mb-1 text-sm font-medium text-[#14213D]">Add Skill</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
                  placeholder="E.g. HTML, Python"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 font-medium text-white bg-[#FCA311] rounded-lg hover:bg-[#e6960f]"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Upload CV */}
            <div className="mt-6">
              <label htmlFor="cv" className="block mb-1 text-sm font-medium text-[#14213D]">Upload CV (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setCvFile(e.target.files[0])}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FCA311] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FCA311] file:text-white hover:file:bg-[#e6960f]"
              />
              {cvFile && (
                <p className="mt-2 text-sm text-gray-600">Selected: {cvFile.name}</p>
              )}
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2 mt-6 font-medium text-white transition bg-[#FCA311] rounded-lg hover:bg-[#e6960f]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Info block
function Info({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-[#14213D]">{label}</p>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  )
}

// Input field
function InputField({ label, id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-[#14213D]">{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
      />
    </div>
  )
}

// Section header
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-[#14213D]">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  )
}
