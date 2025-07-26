import { FiSearch } from "react-icons/fi";

export default function ApplicationSidebar({
  applications,
  selectedId,
  setSelectedId,
  searchTerm,
  setSearchTerm,
}) {
  const filtered = applications.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColor = {
    New: "bg-blue-500",
    Reviewing: "bg-yellow-500",
    Interviewing: "bg-sky-500",
    Rejected: "bg-red-500",
    Hired: "bg-green-500",
  };

  return (
    <div className="w-full h-full p-4 bg-white shadow-md md:w-1/3 rounded-xl">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Recent Applications</h2>
      <div className="relative mb-4">
        <FiSearch className="absolute text-gray-400 top-3 left-3" />
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <ul className="space-y-2">
        {filtered.map((app) => (
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
              className={`text-white text-xs px-2 py-1 rounded-full ${statusColor[app.status] || "bg-gray-400"}`}
            >
              {app.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
