import { FaArrowLeft, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaBriefcase, FaDollarSign } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function InternshipDetails() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Header */}
      <div
        className="flex items-center gap-2 p-6 border-b border-blue-800 cursor-pointer hover:underline"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-5 h-5 text-blue-200" />
        <span className="text-blue-200">Back to internships</span>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Main Card */}
        <div className="bg-white text-black border border-blue-200 rounded-xl p-6 mb-8 shadow-md">
          {/* Top Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaBriefcase className="w-6 h-6 text-blue-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">UX Design Intern</h1>
                <p className="text-gray-600">CreativeMinds Agency</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="border border-gray-300 text-black px-4 py-1 rounded hover:bg-blue-50 transition">
                Save
              </button>
              <button className="border border-gray-300 text-black px-4 py-1 rounded hover:bg-blue-50 transition">
                Share
              </button>
            </div>
          </div>

          {/* Internship Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <DetailItem icon={<FaMapMarkerAlt />} label="Location" value="New York, NY" />
            <DetailItem icon={<FaClock />} label="Duration" value="6 months" />
            <DetailItem icon={<FaCalendarAlt />} label="Application Deadline" value="5/15/2025" />
            <DetailItem icon={<FaBriefcase />} label="Internship Type" value="On-site" />
            <DetailItem icon={<FaDollarSign />} label="Salary" value="$22/hour" />
          </div>

          {/* Inline Tags */}
          <div className="flex gap-2 mb-8">
            <span className="inline-block bg-blue-100 text-blue-900 text-sm px-3 py-1 rounded">On-site</span>
            <span className="inline-block bg-blue-100 text-blue-900 text-sm px-3 py-1 rounded">$22/hour</span>
          </div>

          {/* About Section */}
          <Section title="About the Internship">
            Work with our design team to create user-friendly interfaces for web and mobile applications. Help conduct user research and testing.
          </Section>

          {/* Requirements Section */}
          <Section title="Requirements">
            <ul className="space-y-2 text-gray-800 list-disc pl-6">
              <li>Figma or Sketch proficiency</li>
              <li>Understanding of UI/UX principles</li>
              <li>Portfolio of design work</li>
              <li>Currently pursuing Design or HCI degree</li>
            </ul>
          </Section>
        </div>

        {/* Apply Card */}
        <div className="bg-white text-center border border-blue-200 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-blue-900">Ready to Apply?</h2>
          <p className="text-gray-700 mb-6">Submit your application before 5/15/2025</p>
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg rounded transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

// Reusable Component for Label + Icon
function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-blue-700">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-black font-medium">{value}</p>
      </div>
    </div>
  )
}

// Reusable Section
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">{title}</h2>
      <div className="text-gray-800 leading-relaxed">{children}</div>
    </div>
  )
}
