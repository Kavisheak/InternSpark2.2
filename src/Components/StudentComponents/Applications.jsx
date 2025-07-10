import React, { useState } from "react";

const applications = [
  {
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    appliedDate: "5/20/2024",
    deadline: "6/15/2024",
    status: "Reviewing",
  },
  {
    title: "UI/UX Design Intern",
    company: "DesignStudio",
    location: "Remote",
    appliedDate: "5/18/2024",
    deadline: "6/10/2024",
    status: "Interview",
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
  Reviewing: "bg-yellow-100 text-yellow-800",
  Interview: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Pending: "bg-gray-100 text-gray-800",
};

export default function MyApplications() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Count applications by status
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  // Filter applications based on active filter
  const filteredApplications = activeFilter === "All" 
    ? applications 
    : applications.filter(app => app.status === activeFilter);

  const filters = [
    { name: "All", count: applications.length },
    { name: "Pending", count: statusCounts.Pending || 0 },
    { name: "Reviewing", count: statusCounts.Reviewing || 0 },
    { name: "Interview", count: statusCounts.Interview || 0 },
    { name: "Accepted", count: statusCounts.Accepted || 0 },
    { name: "Rejected", count: statusCounts.Rejected || 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      
      {/* Filter buttons */}
      <div className="flex gap-3 mb-4 text-sm flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => setActiveFilter(filter.name)}
            className={`px-4 py-1 rounded transition ${
              activeFilter === filter.name
                ? "bg-blue-700 text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {filter.name} ({filter.count})
          </button>
        ))}
      </div>

      {/* Applications list */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No applications found for "{activeFilter}" status.
          </div>
        ) : (
          filteredApplications.map((app, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{app.title}</h2>
                <p className="text-sm text-gray-600">{app.company}</p>
                <p className="text-sm text-gray-600">{app.location}</p>
                <p className="text-sm mt-2">Applied: {app.appliedDate}</p>
                <p className="text-sm">Deadline: {app.deadline}</p>
              </div>
              <div className="flex flex-col gap-2 items-start sm:items-end">
                <div
                  className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[app.status]}`}
                >
                  {app.status}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                    View Details
                  </button>
                  {app.status === "Interview" && (
                    <button className="px-3 py-1 text-sm bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                      Schedule Interview
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}