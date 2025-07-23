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
    <div className="min-h-screen text-[#031B4E] bg-gray-50">
      {/* Top Bar */}
      <div
        className="flex items-center gap-2 p-4 text-white cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back to Internships</span>
      </div>

      <div className="max-w-5xl px-4 py-8 mx-auto">
        {/* Internship Header */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-lg">
              <FaBriefcase className="text-2xl text-blue-700" />
            </div>
            <div>
              <h1 className="mb-1 text-3xl font-bold text-blue-800">UX Design Intern</h1>
              <p className="text-gray-500">CreativeMinds Agency</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm text-blue-700 border border-blue-700 rounded hover:bg-blue-100">
              Save
            </button>
            <button className="px-4 py-1 text-sm text-blue-700 border border-blue-700 rounded hover:bg-blue-100">
              Share
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem icon={<FaMapMarkerAlt />} label="Location" value="New York, NY" />
          <DetailItem icon={<FaClock />} label="Duration" value="6 months" />
          <DetailItem icon={<FaCalendarAlt />} label="Deadline" value="May 15, 2025" />
          <DetailItem icon={<FaBriefcase />} label="Internship Type" value="On-site" />
          <DetailItem icon={<FaDollarSign />} label="Salary" value="$22/hour" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          <span className="px-3 py-1 text-sm text-blue-900 bg-blue-100 rounded-full">On-site</span>
          <span className="px-3 py-1 text-sm text-blue-900 bg-blue-100 rounded-full">$22/hour</span>
        </div>

        {/* Sections */}
        <Section title="About the Internship">
          Work with our design team to create user-friendly interfaces for web and mobile apps. Assist with user research, wireframing, and testing.
        </Section>

        <Section title="Requirements">
          <ul className="pl-6 space-y-1 text-gray-700 list-disc">
            <li>Figma or Sketch experience</li>
            <li>Basic understanding of UI/UX principles</li>
            <li>Portfolio showcasing previous designs</li>
            <li>Enrolled in a Design or HCI-related degree</li>
          </ul>
        </Section>

        {/* Call to Action */}
        <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
          <h2 className="mb-2 text-2xl font-semibold">Ready to Apply?</h2>
          <p className="mb-4">Submit your application before May 15, 2025</p>
          <button className="px-6 py-3 text-blue-700 bg-white rounded-md hover:bg-gray-100 font-medium">
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
      <div className="mt-1 text-blue-700">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-[#031B4E]">{value}</p>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mt-10">
      <h3 className="mb-3 text-xl font-semibold text-blue-800">{title}</h3>
      <div>{children}</div>
    </div>
  )
}
