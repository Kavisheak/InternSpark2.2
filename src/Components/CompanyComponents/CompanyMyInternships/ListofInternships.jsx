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
import { toast } from "react-hot-toast";

const ListofInternships = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    async function fetchInternships() {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost/InternBackend/company/api/get_internships.php",
          { withCredentials: true }
        );
        if (res.data.success) {
          const sorted = res.data.internships.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setInternships(sorted);
        } else {
          setError(res.data.message || "Failed to load internships.");
          toast.error(res.data.message || "Failed to load internships.");
        }
      } catch (err) {
        setError("Server error while fetching internships.");
        toast.error("Server error while fetching internships.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchInternships();
  }, []);

  const handleDelete = (internship) => {
    setShowDeleteConfirm(true);

    const isMobile = window.innerWidth <= 768;

    toast(
      (t) => (
        <div
          style={{
            position: "fixed",
            top: "50vh",
            left: "50vw",
            transform: isMobile
              ? "translate(-120%, -100%)"
              : "translate(-280%, -100%)",
            zIndex: 99999,
            background: "#002147",
            color: "white",
            padding: 20,
            borderRadius: 12,
            minWidth: 320,
            maxWidth: "90vw",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <p style={{ marginBottom: 16, textAlign: "center" }}>
            Are you sure you want to delete <br />
            <strong style={{ color: "#FCA311" }}>"{internship.title}"</strong>?
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setShowDeleteConfirm(false);
              }}
              style={{
                padding: "8px 16px",
                background: "#555",
                color: "white",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  const res = await axios.delete(
                    "http://localhost/InternBackend/company/api/delete_internship.php",
                    {
                      data: { id: internship.Internship_Id },
                      headers: {
                        "Content-Type": "application/json",
                      },
                      withCredentials: true,
                    }
                  );

                  if (res.data.success) {
                    setInternships((prev) =>
                      prev.filter(
                        (job) => job.Internship_Id !== internship.Internship_Id
                      )
                    );
                    toast.dismiss(t.id);
                    setShowDeleteConfirm(false);
                    toast.success("Internship deleted.", {
                      style: {
                        background: "#002147",
                        color: "white",
                      },
                      iconTheme: {
                        primary: "#FCA311",
                        secondary: "white",
                      },
                    });
                  } else {
                    toast.dismiss(t.id);
                    setShowDeleteConfirm(false);
                    toast.error(res.data.message || "Deletion failed.");
                  }
                } catch (err) {
                  toast.dismiss(t.id);
                  setShowDeleteConfirm(false);
                  console.error(err);
                  toast.error("Server error while deleting internship.");
                }
              }}
              style={{
                padding: "8px 16px",
                background: "#FCA311",
                color: "white",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: 9999999,
        position: "top-center",
        style: { background: "transparent", boxShadow: "none" },
      }
    );
  };

  const filteredInternships = internships.filter((job) =>
    job.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const displayedInternships = showAll
    ? filteredInternships
    : filteredInternships.slice(0, 6);

  if (loading)
    return <p className="mt-10 text-center">Loading internships...</p>;
  if (error) return <p className="mt-10 text-center text-red-600">{error}</p>;
  if (filteredInternships.length === 0)
    return <p className="mt-10 text-center">No internships found.</p>;

  return (
    <>
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[9990] backdrop-blur-sm bg-black/10"></div>
      )}

      <div
        className={`flex flex-col items-center space-y-6 ${
          showDeleteConfirm ? "pointer-events-none select-none" : ""
        }`}
      >
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedInternships.map((job) => (
            <div
              key={job.Internship_Id}
              className="flex flex-col justify-between h-full p-6 text-gray-900 transition bg-white border border-blue-100 shadow-sm rounded-2xl hover:shadow-md"
            >
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

              <h3 className="text-xl font-bold text-[#01165A] mb-3 leading-tight">
                {job.title}
              </h3>

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

              <div className="flex justify-center gap-6 pt-4 mt-auto border-t border-blue-100">
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

                <div className="relative group">
                  <button
                    onClick={() =>
                      navigate(`/company/postinternship/${job.Internship_Id}`, {
                        state: { internship: job },
                      })
                    }
                    className="p-2 transition border rounded-full hover:bg-gray-100"
                  >
                    <FiEdit
                      size={16}
                      className="text-amber-600 drop-shadow-sm"
                    />
                  </button>
                  <span className="absolute hidden px-2 py-1 mb-2 text-xs text-gray-900 transform -translate-x-1/2 bg-white border rounded-md shadow-sm bottom-full left-1/2 group-hover:inline-block">
                    Edit
                  </span>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => handleDelete(job)}
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

        {filteredInternships.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 mt-4 text-sm font-medium text-[#01165A] border border-[#01165A] rounded-md hover:bg-[#01165A] hover:text-white transition"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        )}
      </div>
    </>
  );
};

export default ListofInternships;
