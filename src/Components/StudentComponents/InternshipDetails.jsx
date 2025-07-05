import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function InternshipDetails() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top Bar */}
      <div
        className="bg-primary text-white p-4 flex items-center gap-2 cursor-pointer hover:underline"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back to Internships</span>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {/* Internship Header */}
        <div className="bg-white border border-blue-200 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start flex-wrap gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-primary text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary mb-1">UX Design Intern</h1>
                <p className="text-gray-500">CreativeMinds Agency</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="border border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100 transition">
                Save
              </button>
              <button className="border border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100 transition">
                Share
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-6">
            <DetailItem icon={<FaMapMarkerAlt />} label="Location" value="New York, NY" />
            <DetailItem icon={<FaClock />} label="Duration" value="6 months" />
            <DetailItem icon={<FaCalendarAlt />} label="Deadline" value="May 15, 2025" />
            <DetailItem icon={<FaBriefcase />} label="Internship Type" value="On-site" />
            <DetailItem icon={<FaDollarSign />} label="Salary" value="$22/hour" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-blue-100 text-blue-900 px-3 py-1 text-sm rounded-full">On-site</span>
            <span className="bg-blue-100 text-blue-900 px-3 py-1 text-sm rounded-full">$22/hour</span>
          </div>

          <Section title="About the Internship">
            Work with our design team to create user-friendly interfaces for web and mobile apps. Assist with user research, wireframing, and testing.
          </Section>

          <Section title="Requirements">
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Figma or Sketch experience</li>
              <li>Basic understanding of UI/UX principles</li>
              <li>Portfolio showcasing previous designs</li>
              <li>Enrolled in a Design or HCI-related degree</li>
            </ul>
          </Section>
        </div>

        {/* Call-to-Action Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl p-8 text-center shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Ready to Apply?</h2>
          <p className="mb-6">Submit your application before May 15, 2025</p>
          <button className="bg-white text-blue-700 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-blue-700 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
      <div>{children}</div>
    </div>
  )
}
