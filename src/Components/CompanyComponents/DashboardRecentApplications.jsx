import { useNavigate } from "react-router-dom";

const DashboardRecentApplications = () => {
  const navigate = useNavigate();

  const recentApplications = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer Intern",
      status: "New",
      time: "2h ago",
    },
    {
      name: "Michael Chen",
      role: "UX Design Intern",
      status: "Reviewing",
      time: "1 day ago",
    },
    {
      name: "Alex Washington",
      role: "Data Science Intern",
      status: "Interviewing",
      time: "3 days ago",
    },
    {
      name: "John Mac",
      role: "Cyber Intern",
      status: "Reviewing",
      time: "2 days ago",
    },
  ];

  const statusColors = {
    New: "bg-purple-600 text-white",
    Reviewing: "bg-yellow-400 text-black",
    Interviewing: "bg-green-400 text-black",
  };

  return (
    <div className="p-6 mb-12 text-gray-900 bg-white shadow-md md:p-8 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Recent Applications</h2>
        <button
          onClick={() => navigate("/company/applications")}
          className="px-4 py-1 text-sm font-medium transition border border-gray-300 rounded-lg hover:bg-gray-800 hover:text-white"
        >
          View All
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {recentApplications.slice(0, 4).map((app, idx) => (
          <div
            key={idx}
            className="flex flex-col p-4 transition border border-blue-100 shadow sm:flex-row sm:items-center sm:justify-between rounded-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:shadow-md"
          >
            {/* Info Section */}
            <div className="mb-2 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-900">
                {app.name}
              </h3>
              <p className="text-sm text-gray-600">
                Applied for{" "}
                <span className="font-medium text-gray-800">{app.role}</span> ·{" "}
                {app.time}
              </p>
            </div>

            {/* Status + Action */}
            <div className="flex items-center space-x-3">
              <span
                className={`text-sm px-3 py-1 rounded-full font-semibold ${statusColors[app.status]}`}
              >
                {app.status}
              </span>
              <button
                onClick={() =>
                  navigate(
                    `/company/applications?applicantName=${encodeURIComponent(
                      app.name
                    )}`
                  )
                }
                className="text-sm font-medium text-blue-600 underline hover:text-blue-800"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRecentApplications;
