import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

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
    New: "bg-[#ED6A2C] text-white",
    Reviewing: "bg-yellow-300 text-black",
    Interviewing: "bg-green-300 text-black",
  };

  return (
    <div className="p-6 mb-12 bg-white border border-[#01165A]/10 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#01165A]">Recent Applications</h2>
        <button
          onClick={() => navigate("/company/applications")}
          className="px-4 py-1 text-sm font-medium border border-[#01165A] text-[#01165A] rounded-md hover:bg-[#01165A] hover:text-white transition"
        >
          View All
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {recentApplications.map((app, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-5 bg-gray-100 border border-gray-300 rounded-xl shadow hover:shadow-md transition text-[#01165A]"
          >
            <div className="p-3 bg-[#01165A] text-white rounded-full">
              <FiUser size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">{app.name}</h3>
              <p className="mt-1 text-sm text-gray-600">
                Applied for <span className="font-semibold text-[#01165A]">{app.role}</span> · {app.time}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[app.status] ?? "bg-gray-300 text-black"}`}
                >
                  {app.status}
                </span>
                <button
                  onClick={() =>
                    navigate(`/company/applications?applicantName=${encodeURIComponent(app.name)}`)
                  }
                  className="text-sm font-medium text-[#ED6A2C] underline hover:text-[#01165A]"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRecentApplications;
