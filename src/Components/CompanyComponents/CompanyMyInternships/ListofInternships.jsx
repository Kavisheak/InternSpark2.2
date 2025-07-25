import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiEdit,
  FiTrash,
  FiMapPin,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListofInternships = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");

  // Fetch internships from backend on component mount
  useEffect(() => {
    async function fetchInternships() {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost/InternBackend/api/get_internships.php",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          // Sort by created_at descending (newest first)
          const sortedInternships = res.data.internships.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setInternships(sortedInternships);
        } else {
          setError(res.data.message || "Failed to load internships.");
        }
      } catch (err) {
        setError("Server error while fetching internships.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchInternships();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        "http://localhost/InternBackend/api/delete_internship.php",
        {
          data: { id },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Internship deleted.");
        setInternships((prev) =>
          prev.filter((job) => job.Internship_Id !== id)
        );
      } else {
        alert("❌ Failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Error deleting internship:", error);
      alert("Server error. Try again later.");
    }
  };

  // Filter internships by searchTerm (case-insensitive)
  const filteredInternships = internships.filter((job) =>
    job.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Show only 6 initially, or all if showAll is true
  const displayedInternships = showAll
    ? filteredInternships
    : filteredInternships.slice(0, 6);

  if (loading)
    return <p className="mt-10 text-center">Loading internships...</p>;
  if (error) return <p className="mt-10 text-center text-red-600">{error}</p>;
  if (filteredInternships.length === 0)
    return <p className="mt-10 text-center">No internships found.</p>;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedInternships.map((job) => (
          <div
            key={job.Internship_Id}
            className="flex flex-col justify-between h-full p-6 text-gray-900 transition bg-white border border-blue-100 shadow-sm rounded-2xl hover:shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#01165A] border-2 border-orange-500 flex items-center justify-center">
                  <FiBriefcase className="text-lg text-white" />
                </div>
                <div className="text-sm font-semibold text-[#01165A] tracking-wide">
                  {job.company}
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">
                {job.internship_type.charAt(0).toUpperCase() +
                  job.internship_type.slice(1)}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#01165A] mb-3 leading-tight">
              {job.title}
            </h3>

            {/* Details */}
            <div className="flex flex-col mb-5 space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <FiMapPin className="mr-2 text-teal-700" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="mr-2 text-indigo-700" />
                <span>
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <FiUsers className="mr-2 text-emerald-700" />
                <span>{job.applicants ?? 0} Applicants</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-center gap-6 pt-4 mt-auto border-t border-blue-100">
              {/* View Applications */}
              <div className="relative group">
                <button
                  onClick={() =>
                    navigate(`/company/applications/${job.Internship_Id}`)
                  }
                  className="p-2 transition border rounded-full hover:bg-gray-100"
                >
                  <FiUsers
                    size={16}
                    className="text-emerald-800 drop-shadow-sm"
                  />
                </button>
                <span className="absolute hidden px-2 py-1 mb-2 text-xs text-gray-900 transform -translate-x-1/2 bg-white border rounded-md shadow-sm bottom-full left-1/2 group-hover:inline-block">
                  View Applications
                </span>
              </div>

              {/* Edit */}
              <div className="relative group">
                <button
                  onClick={() =>
                    navigate(`/company/postinternship/${job.Internship_Id}`, {
                      state: { internship: job },
                    })
                  }
                  className="p-2 transition border rounded-full hover:bg-gray-100"
                >
                  <FiEdit size={16} className="text-amber-600 drop-shadow-sm" />
                </button>
                <span className="absolute hidden px-2 py-1 mb-2 text-xs text-gray-900 transform -translate-x-1/2 bg-white border rounded-md shadow-sm bottom-full left-1/2 group-hover:inline-block">
                  Edit
                </span>
              </div>

              {/* Delete */}
              <div className="relative group">
                <button
                  onClick={() => handleDelete(job.Internship_Id)}
                  className="p-2 transition border rounded-full hover:bg-rose-100 text-rose-700"
                >
                  <FiTrash size={16} className="drop-shadow-sm" />
                </button>
                <span className="absolute hidden px-2 py-1 mb-2 text-xs text-gray-900 transform -translate-x-1/2 bg-white border rounded-md shadow-sm bottom-full left-1/2 group-hover:inline-block">
                  Delete
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More / Show Less */}
      {filteredInternships.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-5 py-2 mt-4 text-sm font-medium text-[#01165A] border border-[#01165A] rounded-md hover:bg-[#01165A] hover:text-white transition"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default ListofInternships;
