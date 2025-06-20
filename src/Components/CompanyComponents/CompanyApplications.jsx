import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const initialApplications = [
  {
    id: 1,
    name: "Sarah Johnson",
    gender: "Female",
    role: "Frontend Developer Intern",
    applied: "5/16/2025",
    education: "Computer Science, Stanford University",
    experience: "1 year part-time web development",
    skills: "I am excited to apply for this position because…",
    email: "sarah.j@example.com",
    status: "New",
    references: [
      {
        name: "John Peterson",
        role: "Senior Manager",
        company: "Tech Solutions Ltd.",
        email: "john.peterson@techsolutions.com",
        phone: "+94 71 123 0456",
      },
      {
        name: "Alice Brown",
        role: "Team Lead",
        company: "WebTech Solutions",
        email: "alice.brown@webtech.com",
        phone: "+94 77 654 7890",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    gender: "Male",
    role: "UX Design Intern",
    applied: "5/15/2025",
    education: "Design, University of Berkeley",
    experience: "Intern at TechDesign",
    skills: "Design is my passion…",
    email: "m.chen@example.com",
    status: "Reviewing",
  },
  {
    id: 3,
    name: "Alex Washington",
    gender: "Male",
    role: "Data Science Intern",
    applied: "5/14/2025",
    education: "Data Analytics, MIT",
    experience: "Intern at AnalyticsPro",
    skills: "I am eager to learn…",
    email: "alex.w@example.com",
    status: "Interviewing",
  },
  {
    id: 4,
    name: "Jamie Garcia",
    gender: "Female",
    role: "Frontend Developer Intern",
    applied: "5/13/2025",
    education: "Web Development, Harvard University",
    experience: "Intern at WebTech Solutions",
    skills: "I am passionate about coding…",
    email: "jamie.g@example.com",
    status: "Rejected",
  },
];

function getStatusClass(status) {
  return (
    {
      New: "bg-purple-900 text-purple-400",
      Reviewing: "bg-gray-900 text-gray-400",
      Interviewing: "bg-blue-900 text-blue-400",
      Shortlisted: "bg-green-900 text-green-400",
      Rejected: "bg-red-900 text-red-400",
    }[status] || "bg-gray-900 text-gray-400"
  );
}

export default function CompanyApplications() {
  const { applicantId } = useParams();
  const [applications, setApplications] = useState(initialApplications);
  const [selectedId, setSelectedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Parse role from URL param (convert dashes back to spaces)
  const roleFromUrl = applicantId ? applicantId.replace(/-/g, " ") : null;

  useEffect(() => {
    if (applicantId) {
      // Select first application with matching role
      const filteredApps = applications.filter(
        (app) => app.role.toLowerCase() === roleFromUrl.toLowerCase()
      );
      if (filteredApps.length > 0) {
        setSelectedId(filteredApps[0].id);
      } else {
        setSelectedId(null);
      }
    } else {
      // Default: select first application overall
      setSelectedId(applications.length > 0 ? applications[0].id : null);
    }
  }, [applicantId, applications, roleFromUrl]);

  const handleStatusUpdate = (id, newStatus) => {
    setApplications((apps) =>
      apps.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  // Filter applications by role param
  const roleFilteredApps = roleFromUrl
    ? applications.filter(
        (app) => app.role.toLowerCase() === roleFromUrl.toLowerCase()
      )
    : applications;

  // Further filter by activeFilter (status)
  const filteredApps =
    activeFilter === "All"
      ? roleFilteredApps
      : roleFilteredApps.filter((app) => app.status === activeFilter);

  const selected = applications.find((app) => app.id === selectedId);

  return (
    <div className="flex items-start min-h-screen gap-6 p-6 mt-0 text-gray-200 bg-transparent">
      {/* Side panel */}
      <div className="w-1/4 mr-6 flex flex-col max-h-[calc(100vh-3rem)]">
        {/* Filter Buttons */}
        <div className="sticky top-0 z-10 pt-1 pb-2 bg-transparent">
          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "New",
              "Reviewing",
              "Shortlisted",
              "Interviewing",
              "Rejected",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-3 py-1 rounded-md ${
                  activeFilter === status
                    ? "bg-gray-700 text-gray-100"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Card List */}
        <div className="flex-1 pr-1 mt-3 overflow-y-auto">
          {filteredApps.length === 0 && (
            <p className="mt-4 text-center text-gray-400">No applications found.</p>
          )}
          {filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedId(app.id)}
              className={`p-4 mb-3 rounded-md border ${
                selectedId === app.id ? "border-gray-500" : "border-gray-300"
              } cursor-pointer hover:shadow-md hover:bg-gray-800`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-100">{app.name}</span>
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusClass(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>
              <div className="mt-1 text-gray-400">
                Applied for {app.role} <br />
                {app.applied}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main panel */}
      {selected && (
        <div className="flex-1 mt-1">
          {/* Title */}
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-100">
            Application Details
          </h2>

          {/* Main Card */}
          <div className="max-h-screen p-6 overflow-y-auto border border-gray-100 rounded-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-100">
                  {selected.name}
                </h2>
                <p className="text-gray-400">{selected.email}</p>
                {selected.gender && (
                  <p className="text-gray-400">Gender: {selected.gender}</p>
                )}
              </div>
              <span
                className={`px-3 py-1 font-semibold rounded-full ${getStatusClass(
                  selected.status
                )}`}
              >
                {selected.status}
              </span>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-200">Application for</p>
              <p>{selected.role}</p>
              <p className="text-gray-400">Applied on {selected.applied}</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-200">Education</p>
              <p>{selected.education}</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-200">Experience</p>
              <p>{selected.experience || " - "}</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-200">Skills</p>
              <p>{selected.skills}</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-200">References</p>
              {selected.references && selected.references.length > 0 ? (
                <ul className="list-disc list-inside">
                  {selected.references.map((ref, index) => (
                    <li key={index}>
                      <span className="font-semibold">{ref.name}</span>, {ref.role} at{" "}
                      {ref.company} — {ref.email}, {ref.phone}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Not provided</p>
              )}
            </div>

            <div>
              <p className="mb-2 font-semibold text-gray-200">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {["Reviewing", "Shortlisted", "Interviewing", "Rejected"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selected.id, status)}
                      className="px-3 py-1 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700"
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
