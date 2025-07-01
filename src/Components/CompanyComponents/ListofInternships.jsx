import { FiCalendar, FiEdit, FiTrash, FiMapPin, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    location: "San Francisco, CA",
    deadline: "2025-05-15",
    mode: "Hybrid",
    status: "Active",
  },
  {
    id: 2,
    title: "UX Design Intern",
    location: "New York, NY",
    deadline: "2025-05-15",
    mode: "Onsite",
    status: "Active",
  },
  {
    id: 3,
    title: "Data Scientist Intern",
    location: "Remote",
    deadline: "2025-05-15",
    mode: "Remote",
    status: "Active",
  },
    {
    id: 4,
    title: "Frontend Developer Intern",
    location: "San Francisco, CA",
    deadline: "2025-05-15",
    mode: "Hybrid",
    status: "Active",
  },
  {
    id: 5,
    title: "UX Design Intern",
    location: "New York, NY",
    deadline: "2025-05-15",
    mode: "Onsite",
    status: "Active",
  },
  {
    id: 6,
    title: "Data Scientist Intern",
    location: "Remote",
    deadline: "2025-05-15",
    mode: "Remote",
    status: "Active",
  },
    {
    id: 7,
    title: "Frontend Developer Intern",
    location: "San Francisco, CA",
    deadline: "2025-05-15",
    mode: "Hybrid",
    status: "Active",
  },
  {
    id: 8,
    title: "UX Design Intern",
    location: "New York, NY",
    deadline: "2025-05-15",
    mode: "Onsite",
    status: "Active",
  },
  {
    id: 9,
    title: "Data Scientist Intern",
    location: "Remote",
    deadline: "2025-05-15",
    mode: "Remote",
    status: "Active",
  },
];

const ListofInternships = ({ searchTerm }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4">
      {internships
        .filter((job) =>
          job.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        
        .map((job) => (
          <div
            key={job.id}
            className="w-full p-6 text-gray-900 transition-shadow border border-blue-100 shadow-md rounded-2xl bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:shadow-lg"
          >
            {/* Title and Mode row */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="mb-1 text-lg font-semibold">{job.title}</h2>
              <span className="px-3 py-1 text-xs font-semibold text-black bg-gray-100 rounded-full">
                {job.mode}
              </span>
            </div>

            {/* Location, Deadline and Actions row */}
            <div className="flex items-center justify-between">
              {/* Location and deadline with icons */}
              <div className="flex items-center space-x-4 text-gray-500">
                <span className="flex items-center">
                  <FiMapPin className="mr-1" /> {job.location}
                </span>
                <span className="flex items-center">
                  <FiCalendar className="mr-1" /> {job.deadline}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {/* View Applications */}
                <div className="relative group">
                  <button
                    onClick={() =>
                      navigate(
                        `/company/applications/${job.title
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`
                      )
                    }
                    aria-label="View Applications"
                    className="p-2 transition border rounded-full hover:bg-gray-100 hover:text-black"
                  >
                    <FiUsers size={13} />
                  </button>
                  <span className="absolute hidden px-2 py-1 mb-2 text-sm text-center text-gray-900 transform -translate-x-1/2 bg-white rounded-md bottom-full left-1/2 group-hover:inline-block">
                    View Applications
                  </span>
                </div>

                {/* Edit */}
                <div className="relative group">
                  <button
                    onClick={() =>
                      navigate(`/company/postinternship/${job.id}`, {
                        state: { internship: job },
                      })
                    }
                    aria-label="Edit"
                    className="p-2 transition border rounded-full hover:bg-gray-100 hover:text-black"
                  >
                    <FiEdit size={13} />
                  </button>

                  <span className="absolute hidden px-2 py-1 mb-2 text-sm text-center text-gray-900 transform -translate-x-1/2 bg-white rounded-md bottom-full left-1/2 group-hover:inline-block">
                    Edit
                  </span>
                </div>

                {/* Delete */}
                <div className="relative group">
                  <button
                    onClick={() => console.log("Delete", job.id)}
                    aria-label="Delete"
                    className="p-2 text-red-500 transition border rounded-full hover:bg-red-100"
                  >
                    <FiTrash size={13} />
                  </button>
                  <span className="absolute hidden px-2 py-1 mb-2 text-sm text-center text-gray-900 transform -translate-x-1/2 bg-white rounded-md bottom-full left-1/2 group-hover:inline-block">
                    Delete
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* If no internships match search */}
      {internships.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      ).length === 0 && (
        <p className="mt-4 text-xl text-center text-gray-400">
          No internships match your search.
        </p>
      )}
    </div>
  );
};

export default ListofInternships;
