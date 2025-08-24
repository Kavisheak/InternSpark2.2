import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import axios from "axios";

const statusColors = {
  New: "bg-[#ED6A2C] text-white",
  Reviewing: "bg-yellow-300 text-black",
  Interviewing: "bg-green-300 text-black",
  Shortlisted: "bg-purple-300 text-black",
  Accepted: "bg-green-600 text-white",
  Rejected: "bg-red-500 text-white",
};

const DashboardRecentApplications = () => {
  const navigate = useNavigate();
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/InternBackend/company/api/recent_applications.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.applications)) {
          setRecentApplications(res.data.applications);
        }
      });
  }, []);

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
        {recentApplications.length === 0 ? (
          <div className="col-span-2 py-8 text-center text-gray-400">
            No recent applications.
          </div>
        ) : (
          recentApplications.slice(0, 4).map((app) => (
            <div
              key={app.id}
              className="flex items-start gap-4 p-5 bg-gray-100 border border-gray-300 rounded-xl shadow hover:shadow-md transition text-[#01165A]"
            >
              <div className="p-3 bg-[#01165A] text-white rounded-full">
                {app.image ? (
                  <img
                    src={`http://localhost/InternBackend/${app.image}`}
                    alt={app.name}
                    className="object-cover w-8 h-8 rounded-full"
                  />
                ) : (
                  <FiUser size={24} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{app.name}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Applied for{" "}
                  <span className="font-semibold text-[#01165A]">{app.role}</span> ·{" "}
                  {app.applied}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[app.status] ?? "bg-gray-300 text-black"}`}
                  >
                    {app.status}
                  </span>
                  <button
                    onClick={() =>
                      navigate(`/company/applications?selectedId=${app.id}`)
                    }
                    className="text-sm font-medium text-[#ED6A2C] underline hover:text-[#01165A]"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardRecentApplications;
