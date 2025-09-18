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
              background: "#002147", // Oxford Blue
              color: "#fff",
              borderLeft: "6px solid #FFA500", // Orange highlight
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
    <div className="max-w-5xl px-6 py-10 mx-auto">
      {/* Heading */}
      <h1 className="mb-8 text-4xl font-bold text-center text-[#01165A]">
        My Interviews
      </h1>

      {/* Loading / Empty State */}
      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading...</div>
      ) : interviews.length === 0 ? (
        <div className="py-16 text-center text-gray-500 bg-white shadow rounded-xl">
          No interviews scheduled yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {interviews.map((iv) => (
            <div
              key={iv.id}
              className="p-6 transition-shadow duration-200 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg"
            >
              {/* Title + Company */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="text-lg font-semibold text-[#01165A]">
                  {iv.internship_title}
                </div>
                <span className="px-2 py-1 text-xs font-semibold text-[#FFA500] rounded bg-orange-50 border border-orange-200">
                  {iv.company_name}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-[#01165A]">Date:</span>{" "}
                  {iv.interview_date}
                  <span className="ml-4 font-semibold text-[#01165A]">
                    Time:
                  </span>{" "}
                  {iv.interview_time}
                </div>
                <div>
                  <span className="font-semibold text-[#01165A]">Type:</span>{" "}
                  {iv.interview_type}
                </div>

                {iv.interview_type === "online" && iv.meeting_link && (
                  <div>
                    <span className="font-semibold text-[#01165A]">
                      Meeting Link:
                    </span>{" "}
                    <a
                      href={iv.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {iv.meeting_link}
                    </a>
                  </div>
                )}

                {iv.interview_type === "onsite" && iv.location && (
                  <div>
                    <span className="font-semibold text-[#01165A]">
                      Location:
                    </span>{" "}
                    {iv.location}
                  </div>
                )}
              </div>

              {/* Button */}
              <div className="flex justify-end mt-6">
                <button
                  className={`px-5 py-2 text-sm font-semibold rounded-lg shadow transition-colors duration-200 ${
                    iv.reschedule_id
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-[#FFA500] hover:bg-[#e69500] text-white"
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

      {/* Modal */}
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
