import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

const statusColors = {
  Shortlisted: "bg-yellow-100 text-yellow-800",
  Interviewing: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function AppliedInternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState(false);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    let active = true;

    axios
      .get("http://localhost/InternBackend/students/api/get_applications.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (!active) return;
        if (res.data.success && Array.isArray(res.data.applications)) {
          const app = res.data.applications.find(
            (a) => String(a.Application_Id) === String(id)
          );
          setApplication(app || null);
        }
      })
      .catch(() => {
        toast.error("Failed to load application.");
      })
      .finally(() => active && setLoading(false));

    return () => { active = false; };
  }, [id]);

  const handleCancelApplication = async () => {
    if (!application) return;
    setCanceling(true);
    try {
      const res = await axios.post(
        "http://localhost/InternBackend/students/api/delete_application.php",
        { application_id: application.Application_Id },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Your application has been cancelled!");
        navigate("/student/applications");
      } else {
        toast.error(res.data.message || "Failed to cancel application.");
      }
    } catch {
      toast.error("Failed to cancel application.");
    } finally {
      setCanceling(false);
      setCancelModal(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-600">Loading...</div>;
  if (!application) return <div className="p-8 text-center text-red-600">Internship not found.</div>;

  return (
    <div className="max-w-4xl p-8 mx-auto mt-8 space-y-6 bg-white rounded-lg shadow-md">
      <div>
        <h1 className="mb-1 text-3xl font-bold text-[#002147]">{application.title}</h1>
        <p className="text-lg font-medium text-gray-700">{application.company}</p>
        <p className="text-sm text-gray-500">{application.location}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <p>📅 <strong>Applied on:</strong> {application.appliedDate}</p>
        <p>⏳ <strong>Deadline:</strong> {application.deadline}</p>
        <p>💼 <strong>Job Type:</strong> {application.jobType}</p>
        <p>💰 <strong>Stipend:</strong> {application.stipend}</p>
        <p>📆 <strong>Duration:</strong> {application.duration}</p>
        <p>
          🏷️ <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 inline-block rounded-full text-sm font-medium ${statusColors[application.status]}`}
          >
            {application.status}
          </span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#002147] mb-2">Description</h3>
        <p className="text-sm text-gray-700">{application.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#002147] mb-2">Required Skills</h3>
        <ul className="flex flex-wrap gap-2">
          {application.skills?.map((skill, index) => (
            <li
              key={index}
              className="px-3 py-1 text-sm text-[#002147] bg-gray-100 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => setCancelModal(true)}
          className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Cancel Application
        </button>
        <button
          onClick={() => navigate("/student/applications")}
          className="px-5 py-2 text-sm font-medium text-[#002147] border border-[#002147] rounded-lg hover:bg-[#002147] hover:text-white"
        >
          Back to Applications
        </button>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModal && (
        <ConfirmModal
          title="Cancel Application"
          message={`Are you sure you want to cancel your application for "${application.title}"?`}
          confirmText={canceling ? "Cancelling..." : "Yes, Cancel"}
          confirmClass="bg-red-600 hover:bg-red-700"
          onCancel={() => setCancelModal(false)}
          onConfirm={handleCancelApplication}
          disabled={canceling}
        />
      )}
    </div>
  );
}

function ConfirmModal({ title, message, confirmText, confirmClass, onCancel, onConfirm, disabled }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative p-6 bg-white rounded-xl w-[90%] max-w-md shadow-lg text-center">
        <button className="absolute text-gray-400 top-4 right-4 hover:text-gray-600" onClick={onCancel}>
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-[#002147] mb-4">{title}</h2>
        <p className="mb-6 text-sm text-gray-600">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={disabled}
            className={`px-4 py-2 text-sm font-medium text-white rounded ${confirmClass} disabled:opacity-60`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
