import { useState } from "react"
import { Search, Eye, Trash2, MapPin, Calendar, Building2 } from "lucide-react"

const internships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    duration: "3 months",
    posted: "6/1/2024",
    applications: 25,
    status: "active",
    workType: "Hybrid",
    description: "Join our frontend team to work on cutting-edge web applications...",
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "AnalyticsPro",
    location: "New York, NY",
    duration: "6 months",
    posted: "5/20/2024",
    applications: 18,
    status: "active",
    workType: "Remote",
    description: "Work with our data science team on machine learning projects...",
  },
  {
    id: "3",
    title: "Marketing Intern",
    company: "BrandCorp",
    location: "Los Angeles, CA",
    duration: "4 months",
    posted: "4/15/2024",
    applications: 12,
    status: "expired",
    workType: "On-site",
    description: "Support our marketing team with campaign development...",
  },
]

export default function InternshipManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filtered = internships.filter((item) => {
    const search = searchQuery.toLowerCase()
    const match =
      item.title.toLowerCase().includes(search) ||
      item.company.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search)
    if (activeTab === "active") return item.status === "active" && match
    if (activeTab === "expired") return item.status === "expired" && match
    return match
  })

  const stats = {
    all: internships.length,
    active: internships.filter((i) => i.status === "active").length,
    expired: internships.filter((i) => i.status === "expired").length,
  }

  const handleView = (id) => alert(`View details of: ${id}`)
  const handleRemove = (id) => alert(`Remove internship: ${id}`)
  const handleExport = () => alert("Exporting listings...")

  const getWorkTypeBadgeColor = (workType) => {
    switch (workType) {
      case "Remote":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "Hybrid":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30"
      case "On-site":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30"
    }
  }

  return (
    <div className="bg-white">
      <div className="absolute inset-0" />
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Internship Management</h1>
        </div>

        <div className="mb-4 text-orange-600 font-bold">
          View and manage all internship postings (read-only with removal option)
        </div>

        <div className="flex justify-end mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-orange-500" />
            <input
              className="pl-10 pr-3 py-2 w-full rounded bg-orange-100 text-gray-800 border border-orange-600 placeholder-orange-500"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          {["all", "active", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded border ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-orange-500 text-black"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({stats[tab]})
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border border-orange-500 bg-white rounded p-6 shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <div className="flex gap-4">
                  <div className="p-2 bg-orange-500 rounded">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-black flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {item.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`text-sm px-2 py-1 rounded border ${
                      item.status === "active"
                        ? "bg-orange-500 text-white"
                        : "bg-red-400 text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded border ${getWorkTypeBadgeColor(item.workType)}`}
                  >
                    {item.workType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm text-gray-800 mb-4">
                <div>
                  <span className="flex items-center mb-1">
                    <MapPin className="text-gray-800 h-4 w-4 mr-1" /> Location:
                  </span>
                  <p className="text-orange-600">{item.location}</p>
                </div>
                <div>
                  <span className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-1" /> Duration:
                  </span>
                  <p className="text-orange-600">{item.duration}</p>
                </div>
                <div>
                  <span className="block mb-1">Posted:</span>
                  <p className="text-orange-600">{item.posted}</p>
                </div>
                <div>
                  <span className="block mb-1">Applications:</span>
                  <p className="text-orange-600">{item.applications}</p>
                </div>
              </div>

              <p className="text-gray-800 mb-4">{item.description}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleView(item.id)}
                  className="flex items-center px-4 py-2 rounded border bg-orange-500 hover:bg-gray-400 text-white"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center px-4 py-2 rounded bg-red-600 hover:bg-purple-400 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
