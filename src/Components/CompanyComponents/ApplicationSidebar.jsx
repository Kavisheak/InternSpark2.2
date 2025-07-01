import { useEffect } from "react";

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

export default function ApplicationSidebar({
  applications,
  selectedId,
  setSelectedId,
  activeFilter,
  setActiveFilter,
  searchTerm,
  setSearchTerm,
  fullApplications = applications, // 👈 fallback to filtered if full list not passed
}) {
  const filteredApps =
    activeFilter === "All"
      ? applications
      : applications.filter((app) => app.status === activeFilter);

  const searchedApps = filteredApps.filter((app) =>
    app.role.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // ✅ Use fullApplications to avoid deselecting due to filter
  useEffect(() => {
    const stillExists = fullApplications.some((app) => app.id === selectedId);
    if (!stillExists) {
      setSelectedId(null);
    }
  }, [fullApplications, selectedId, setSelectedId]);

  return (
    <div className="w-1/4 mr-6 flex flex-col max-h-[calc(100vh-3rem)]">
      {/* Filter and Search */}
      <div className="sticky top-0 z-10 pt-1 pb-4 bg-transparent">
        <div className="flex flex-wrap gap-2 mb-3">
          {["All", "New", "Reviewing", "Shortlisted", "Interviewing", "Rejected"].map(
            (status) => (
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
            )
          )}
        </div>

        <input
          type="text"
          placeholder="Search applications by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm text-white placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Applications List */}
      <div className="flex-1 pr-1 mt-3 overflow-y-auto">
        {searchedApps.length === 0 && (
          <p className="mt-4 text-center text-gray-400">
            No applications found.
          </p>
        )}
        {searchedApps.map((app) => (
          <div
            key={app.id}
            onClick={() => setSelectedId(app.id)}
            className={`p-4 mb-3 rounded-md border ${
              selectedId === app.id ? "border-gray-500 bg-gray-800" : "border-gray-300"
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
              Applied for {app.role}
              <br />
              {app.applied}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
