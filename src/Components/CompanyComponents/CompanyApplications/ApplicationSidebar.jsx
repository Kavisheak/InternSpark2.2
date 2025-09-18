import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function ApplicationSidebar({
  applications,
  selectedId,
  setSelectedId,
  searchTerm,
  setSearchTerm,
  detailHeight,
}) {
  const [statusFilter, setStatusFilter] = useState("All");

  const statusColor = {
    New: "bg-blue-500",
    Reviewing: "bg-yellow-500",
    Shortlisted: "bg-purple-500",
    Interviewing: "bg-sky-500",
    Accepted: "bg-green-600",
    Rejected: "bg-red-500",
    Hired: "bg-green-500",
  };

  // --- SMART SKILL FILTERING ---
  // Split searchTerm by spaces, filter by all skills (case-insensitive)
  const skillTerms = searchTerm
    .split(" ")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const filtered = applications
    .filter((app) => {
      // If no search, show all
      if (skillTerms.length === 0) return true;
      // Combine all skills into a single string (case-insensitive)
      const skills =
        Array.isArray(app.skills)
          ? app.skills.join(" ").toLowerCase()
          : (app.skills || "").toLowerCase();
      // Every search term must be present in skills
      return skillTerms.every((term) => skills.includes(term));
    })
    .filter((app) => statusFilter === "All" || app.status === statusFilter);

  return (
    <div
      className="flex flex-col w-full bg-white shadow-md md:w-1/3 rounded-xl"
      style={{ height: detailHeight === "auto" ? "auto" : `${detailHeight}px` }}
    >
      <div className="p-4 border-b">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Recent Applications
        </h2>

        {/* Search Box */}
        <div className="relative mb-3">
          <FiSearch className="absolute text-gray-400 top-3 left-3" />
          <input
            type="text"
            placeholder="Search by skill (e.g. python react)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border rounded-md text-oxfordblue focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md text-oxfordblue focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="All">All</option>
            <option value="Reviewing">Reviewing</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {filtered.length > 0 ? (
            filtered.map((app) => (
              <li
                key={app.id}
                onClick={() => setSelectedId(app.id)}
                className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 border ${
                  selectedId === app.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={
                    app.image
                      ? `http://localhost/InternBackend/${app.image}`
                      : "/default-avatar.png"
                  }
                  alt={app.name}
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{app.name}</p>
                  <p className="text-sm text-gray-500">{app.role}</p>
                  <p className="text-xs text-gray-400">Applied {app.applied}</p>
                </div>
                <span
                  className={`text-white text-xs px-2 py-1 rounded-full ${
                    statusColor[app.status] || "bg-gray-400"
                  }`}
                >
                  {app.status}
                </span>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No applications found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
