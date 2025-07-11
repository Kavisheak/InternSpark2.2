import { useEffect } from "react";

function getStatusClass(status) {
  return (
    {
      New: "bg-purple-100 text-purple-800",
      Reviewing: "bg-gray-100 text-gray-800",
      Interviewing: "bg-blue-100 text-blue-800",
      Shortlisted: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    }[status] || "bg-gray-100 text-gray-800"
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
  fullApplications = applications,
}) {
  const filteredApps =
    activeFilter === "All"
      ? applications
      : applications.filter((app) => app.status === activeFilter);

  const searchedApps = filteredApps.filter((app) =>
    app.role.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const stillExists = fullApplications.some((app) => app.id === selectedId);
    if (!stillExists) setSelectedId(null);
  }, [fullApplications, selectedId, setSelectedId]);

  return (
    <div className="w-full md:w-1/4 flex flex-col max-h-[calc(100vh-5rem)]">
      {/* Filter & Search */}
      <div className="sticky top-0 z-10 pb-4 ">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-3">
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
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                activeFilter === status
                  ? "bg-[#2128BD] text-white shadow"
                  : "bg-transparent text-[#2128BD] border border-[#2128BD]/30 hover:bg-[#2128BD]/10"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search applications by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm text-gray-800 bg-transparent border border-[#2128BD]/50 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2128BD] focus:border-[#2128BD]"
        />
      </div>

      {/* Applications List */}
      <div className="flex-1 pr-1 mt-3 overflow-y-auto">
        {searchedApps.length === 0 && (
          <p className="mt-4 text-center text-gray-500">
            No applications found.
          </p>
        )}
        {searchedApps.map((app) => (
          <div
            key={app.id}
            onClick={() => setSelectedId(app.id)}
            className={`p-4 mb-3 rounded-md border cursor-pointer transition-all duration-200 ${
              selectedId === app.id
                ? "bg-sky-50 border-[#2128BD] shadow"
                : "bg-white border-gray-200 hover:bg-sky-50 hover:border-[#2128BD]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">{app.name}</span>
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusClass(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
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
