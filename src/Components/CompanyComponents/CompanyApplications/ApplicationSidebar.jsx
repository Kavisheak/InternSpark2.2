import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function ApplicationSidebar({
  applications,
  selectedId,
  setSelectedId,
  searchTerm,
  setSearchTerm,
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

  const filtered = applications
    .filter((app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((app) => statusFilter === "All" || app.status === statusFilter);

  return (
    <div className="w-full h-full p-4 bg-white shadow-md md:w-1/3 rounded-xl">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Recent Applications</h2>

      {/* Search Box */}
      <div className="relative mb-3">
        <FiSearch className="absolute text-gray-400 top-3 left-3" />
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border rounded-md text-oxfordblue focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="mb-4">
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

      {/* Application List */}
      <ul className="space-y-2">
        {filtered.length > 0 ? (
          filtered.map((app) => (
            <li
              key={app.id}
              onClick={() => setSelectedId(app.id)}
              className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 border ${
                selectedId === app.id ? "border-orange-500 bg-orange-50" : "border-gray-200"
              }`}
            >
              <img
                src={app.image || "/default-avatar.png"}
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
  );
}
