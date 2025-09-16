import React, { useState, useEffect } from "react";

function CompanyRescheduleModal({ open, onClose, candidate, onAction }) {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && candidate) {
      setLoading(true);
      fetch(
        `http://localhost/InternBackend/company/api/get_reschedule_requests.php?interview_id=${candidate.interview_id}`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then((data) => {
          setRequest(data.request);
          setLoading(false);
        });
    }
  }, [open, candidate]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative w-full max-w-md p-8 bg-white shadow-xl rounded-xl">
        <button
          className="absolute text-xl text-gray-400 top-3 right-3 hover:text-orange-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="mb-4 text-2xl font-bold text-[#01165A]">Reschedule Request</h2>
        {loading ? (
          <div>Loading...</div>
        ) : request ? (
          <>
            <div className="mb-2">
              <span className="font-semibold">Reason Type:</span> {request.reason_type}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Reason:</span> {request.reason_text}
            </div>
            {request.reason_type === "medical" && request.medical_proof && (
              <div className="mb-2">
                <span className="font-semibold">Medical Proof:</span>{" "}
                <a
                  href={`http://localhost/InternBackend/${request.medical_proof}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View PDF
                </a>
              </div>
            )}
            <div className="flex gap-2 mt-6">
              <button
                className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                onClick={() => onAction(request.id, "accepted")}
              >
                Accept & Reschedule
              </button>
              <button
                className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => onAction(request.id, "rejected")}
              >
                Reject
              </button>
            </div>
          </>
        ) : (
          <div>No request found.</div>
        )}
      </div>
    </div>
  );
}

export default CompanyRescheduleModal;