import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RequestRescheduleModal from "./RequestRescheduleModal";

const StudentInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    fetch("http://localhost/InternBackend/students/api/get_interviews.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setInterviews(data.interviews);
        else toast.error(data.message || "Failed to load interviews");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load interviews");
        setLoading(false);
      });
  }, []);

  const handleRequestReschedule = (formData) => {
    // Example: send to backend
    fetch("http://localhost/InternBackend/students/api/request_reschedule.php", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Reschedule request submitted!", {
            style: {
              background: "#002147",
              color: "#fff",
              borderLeft: "6px solid #FFA500",
              fontSize: "1rem",
              borderRadius: "0.75rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
            },
            iconTheme: {
              primary: "#FFA500",
              secondary: "#fff",
            },
          });
        } else {
          toast.error(data.message || "Failed to submit request.");
        }
      })
      .catch(() => {
        toast.error("Failed to submit request.");
      });
  };

  return (
    <div className="max-w-3xl px-4 py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-[#01165A]">My Interviews</h1>
      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading...</div>
      ) : interviews.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          No interviews scheduled yet.
        </div>
      ) : (
        <div className="space-y-6">
          {interviews.map((iv) => (
            <div
              key={iv.id}
              className="p-6 bg-white border border-gray-100 shadow rounded-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="font-semibold text-[#01165A] text-lg">
                  {iv.internship_title}
                </div>
                <span className="px-2 py-1 text-xs font-semibold text-orange-600 rounded bg-orange-50">
                  {iv.company_name}
                </span>
              </div>
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Date:</span> {iv.interview_date}{" "}
                <span className="ml-4 font-semibold">Time:</span> {iv.interview_time}
              </div>
              <div className="mb-2 text-sm">
                <span className="font-semibold">Type:</span> {iv.interview_type}
              </div>
              {iv.interview_type === "online" && iv.meeting_link && (
                <div className="mb-2 text-sm">
                  <span className="font-semibold">Meeting Link:</span>{" "}
                  <a
                    href={iv.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {iv.meeting_link}
                  </a>
                </div>
              )}
              {iv.interview_type === "onsite" && iv.location && (
                <div className="mb-2 text-sm">
                  <span className="font-semibold">Location:</span> {iv.location}
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  className={`px-4 py-2 text-sm font-semibold text-white rounded ${
                    iv.reschedule_id ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => {
                    setSelectedInterview(iv);
                    setModalOpen(true);
                  }}
                >
                  {iv.reschedule_id ? "Edit Request" : "Request Reschedule"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <RequestRescheduleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        interview={selectedInterview}
        onSubmit={handleRequestReschedule}
      />
    </div>
  );
};

export default StudentInterviews;