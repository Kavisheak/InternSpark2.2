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
    <div className="p-6 mb-12 bg-white border border-gray-200 shadow-md rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#01165A]">
          Recent Applications
        </h2>
        <button
          onClick={() => navigate("/company/applications")}
          className="px-4 py-2 text-sm font-medium border border-[#01165A] text-[#01165A] rounded-lg hover:bg-[#01165A] hover:text-white transition-colors"
        >
          View All
        </button>
      </div>

      {/* Applications Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {recentApplications.length === 0 ? (
          <div className="col-span-2 py-10 text-center text-gray-400">
            No recent applications.
          </div>
        ) : (
          recentApplications.slice(0, 6).map((app) => (
            <div
              key={app.id}
              className="flex items-start gap-4 p-5 transition-shadow border border-gray-200 shadow-sm bg-gray-50 rounded-xl hover:shadow-lg"
            >
              {/* Profile Image / Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#01165A] text-white overflow-hidden">
                {app.image ? (
                  <img
                    src={`http://localhost/InternBackend/${app.image}`}
                    alt={app.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FiUser size={22} />
                )}
              </div>

              {/* Application Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#01165A]">
                  {app.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Applied for{" "}
                  <span className="font-medium text-[#ED6A2C]">{app.role}</span>{" "}
                  · {app.applied}
                </p>

                <div className="flex items-center justify-between mt-4">
                  {/* Status Badge */}
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${statusColors[app.status] ?? "bg-gray-300 text-black"}`}
                  >
                    {app.status}
                  </span>

                  {/* View Button */}
                  <button
                    onClick={() =>
                      navigate(`/company/applications?selectedId=${app.id}`)
                    }
                    className="text-sm font-medium text-[#ED6A2C] hover:text-[#01165A] transition-colors underline"
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
