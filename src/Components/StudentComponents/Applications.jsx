import React from "react";

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
];

const statusColors = {
  Reviewing: "bg-yellow-100 text-yellow-800",
  Interview: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function MyApplications() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <div className="flex gap-3 mb-4 text-sm">
        <button className="px-4 py-1 rounded bg-blue-700 text-white">All (4)</button>
        <button className="px-4 py-1 rounded border">Pending (0)</button>
        <button className="px-4 py-1 rounded border">Reviewing (1)</button>
        <button className="px-4 py-1 rounded border">Interview (1)</button>
        <button className="px-4 py-1 rounded border">Accepted (1)</button>
        <button className="px-4 py-1 rounded border">Rejected (1)</button>
      </div>
      <div className="space-y-4">
        {applications.map((app, index) => (
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
        ))}
      </div>
    </div>
  );
}
