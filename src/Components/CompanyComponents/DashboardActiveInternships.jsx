import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

const DashboardActiveInternships = () => {
  const navigate = useNavigate();

  const activeInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      deadline: "May 20, 2025",
      applications: 9,
      filled: 60,
    },
    {
      id: 2,
      title: "UI/UX Intern",
      deadline: "May 30, 2025",
      applications: 3,
      filled: 25,
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      deadline: "June 10, 2025",
      applications: 6,
      filled: 40,
    },
  ];

  return (
    <div className="p-6 mb-12 text-gray-900 bg-white shadow-md md:p-8 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Active Internships</h2>
        <button
          onClick={() => navigate("/company/internships")}
          className="px-4 py-1 text-sm font-medium transition border border-gray-300 rounded-lg hover:bg-gray-800 hover:text-white"
        >
          Manage All
        </button>
      </div>

      {/* Internships */}
      <div className="grid gap-6 md:grid-cols-2">
        {activeInternships.slice(0, 6).map((job, idx) => (
          <div
            key={idx}
            className="p-6 transition border border-blue-100 shadow rounded-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:shadow-md"
          >
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              {job.title}
            </h3>

            <div className="flex items-center mb-4 text-sm text-gray-600">
              <FiCalendar className="mr-2 text-base text-blue-600" />
              <span>Deadline: {job.deadline}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Applications badge */}
              <span className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full">
                {job.applications} Applications
              </span>

              {/* Edit button */}
              <button
                onClick={() =>
                  navigate(`/company/postinternship/${job.id}`, {
                    state: { internship: job, viewOnly: false },
                  })
                }
                className="px-3 py-1 text-sm font-medium text-blue-700 transition border border-blue-300 rounded-md hover:bg-blue-600 hover:text-white"
              >
                Edit
              </button>

              {/* View button */}
              <button
                onClick={() =>
                  navigate(`/company/postinternship/${job.id}`, {
                    state: { internship: job, viewOnly: true },
                  })
                }
                className="px-3 py-1 text-sm font-medium text-blue-700 transition border border-blue-300 rounded-md hover:bg-blue-600 hover:text-white"
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

export default DashboardActiveInternships;
