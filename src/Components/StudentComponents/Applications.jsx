import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../CompanyComponents/Footer";

const statusColors = {
  Shortlisted: "bg-yellow-100 text-yellow-800",
  Interviewing: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost/InternBackend/students/api/get_applications.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.applications)) {
          setApplications(res.data.applications);
        }
      });
  }, []);

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const filteredApplications = applications
    .filter((app) =>
      activeFilter === "All" ? true : app.status === activeFilter
    )
    .filter((app) =>
      app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filters = [
    { name: "All", count: applications.length },
    { name: "Shortlisted", count: statusCounts.Shortlisted || 0 },
    { name: "Reviewing", count: statusCounts.Reviewing || 0 },
    { name: "Accepted", count: statusCounts.Accepted || 0 },
    { name: "Rejected", count: statusCounts.Rejected || 0 },
  ];

  return (
    <div>
      <div className="max-w-5xl p-6 mx-auto fade-in-up">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">My Applications</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by internship title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 text-sm">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`px-4 py-1.5 rounded-full font-medium transition ${
                activeFilter === filter.name
                  ? "bg-[#002147] text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {filter.name} ({filter.count})
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No applications found for "{activeFilter}" status
              {searchTerm ? ` and search term "${searchTerm}"` : ""}.
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.Application_Id}
                className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {app.title}
                    </h2>
                    <p className="text-sm text-gray-600">{app.company}</p>
                    <p className="text-sm text-gray-500">{app.location}</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>📅 Applied on: {app.appliedDate}</p>
                      <p>⏳ Deadline: {app.deadline}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        statusColors[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                    <button
                      onClick={() =>
                        navigate(`/student/applications/${app.Application_Id}`)
                      }
                      className="px-4 py-1.5 text-sm font-medium rounded-lg bg-[#002147] text-white hover:bg-[#00152f] transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-28">
        <Footer />
      </div>
    </div>
  );
}
