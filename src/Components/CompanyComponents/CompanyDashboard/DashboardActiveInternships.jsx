import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import axios from "axios";

const DashboardActiveInternships = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch internships from backend
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost/InternBackend/company/api/dashboard_get_active_internships.php", {
          withCredentials: true, // important for session handling
        });

        if (response.data.success) {
          setInternships(response.data.internships);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch internships", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div className="p-6 mb-12 bg-white border border-[#01165A]/10 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#01165A]">Your Active Internships</h2>
        <button
          onClick={() => navigate("/company/internships")}
          className="px-4 py-1 text-sm font-medium border border-[#01165A] text-[#01165A] rounded-md hover:bg-[#01165A] hover:text-white transition"
        >
          Manage All
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : internships.length === 0 ? (
        <p className="text-gray-500">No active internships found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {internships.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-gray-100 border border-gray-300 rounded-xl shadow hover:shadow-md transition text-[#01165A]"
            >
              <h3 className="mb-2 text-xl font-bold">{job.title}</h3>

              <div className="flex items-center mb-3 text-sm text-gray-600">
                <FiCalendar className="mr-2" />
                <span>Deadline: {job.deadline}</span>
              </div>

              <div className="mb-4">
                <div className="w-full h-2 overflow-hidden bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-[#ED6A2C]"
                    style={{ width: `40%` }} // dummy progress (optional)
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-600">40% filled</p> {/* dummy text */}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-sm font-medium bg-[#ED6A2C] text-white rounded-full">
                  20 Applications {/* dummy */}
                </span>

                <button
                  onClick={() =>
                    navigate(`/company/postinternship/${job.id}`, {
                      state: { internship: job, viewOnly: false },
                    })
                  }
                  className="px-3 py-1 text-sm font-medium border border-[#01165A] text-[#01165A] rounded-md hover:bg-[#01165A] hover:text-white transition"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    navigate(`/company/postinternship/${job.id}`, {
                      state: { internship: job, viewOnly: true },
                    })
                  }
                  className="px-3 py-1 text-sm font-medium text-orange-400 transition border border-orange-400 rounded-md hover:bg-orange-400 hover:text-white"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardActiveInternships;
