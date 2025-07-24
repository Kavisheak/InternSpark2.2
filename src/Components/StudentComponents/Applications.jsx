import React, { useState } from "react";

const applications = [
  {
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    appliedDate: "5/20/2024",
    deadline: "6/15/2024",
    status: "Shortlisted",
  },
  {
    title: "UI/UX Design Intern",
    company: "DesignStudio",
    location: "Remote",
    appliedDate: "5/18/2024",
    deadline: "6/10/2024",
    status: "Interviewing",
  },
  {
    title: "Data Science Intern",
    company: "DataFlow Systems",
    location: "New York, NY",
    appliedDate: "5/15/2024",
    deadline: "6/20/2024",
    status: "Accepted",
  },
  {
    title: "Marketing Intern",
    company: "Growth Co.",
    location: "Austin, TX",
    appliedDate: "5/10/2024",
    deadline: "6/5/2024",
    status: "Rejected",
  },
];

const statusColors = {
  Shortlisted: "bg-yellow-100 text-yellow-800",
  Interviewing: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function MyApplications() {
  const [activeFilter, setActiveFilter] = useState("All");

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const filteredApplications =
    activeFilter === "All"
      ? applications
      : applications.filter((app) => app.status === activeFilter);

  const filters = [
    { name: "All", count: applications.length },
    { name: "Shortlisted", count: statusCounts.Shortlisted || 0 },
    { name: "Interviewing", count: statusCounts.Interviewing || 0 },
    { name: "Accepted", count: statusCounts.Accepted || 0 },
    { name: "Rejected", count: statusCounts.Rejected || 0 },
  ];

  return (
    <div className="max-w-5xl p-6 mx-auto fade-in-up">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">My Applications</h1>

      {/* Filter Buttons */}
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
            No applications found for "{activeFilter}" status.
          </div>
        ) : (
          filteredApplications.map((app, index) => (
            <div
              key={index}
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
                    className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[app.status]}`}
                  >
                    {app.status}
                  </span>
                  <button className="px-4 py-1.5 text-sm font-medium rounded-lg bg-[#002147] text-white hover:bg-[#00152f] transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
