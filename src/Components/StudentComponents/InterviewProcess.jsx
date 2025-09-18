import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Format time to AM/PM
function formatTime(timeStr) {
  if (!timeStr) return "";
  let [hour, minute] = timeStr.split(":");
  hour = parseInt(hour, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  let displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${ampm}`;
}

// Ensure time has leading zeros
function padTime(t) {
  const [h, m] = t.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

const InterviewProcess = () => {
  const [interviews, setInterviews] = useState([]);
  const [uploadData, setUploadData] = useState({
    cv: null,
    certificates: [],
    other_docs: [],
  });
  const [uploadingId, setUploadingId] = useState(null);

  // Fetch scheduled interviews
  const fetchInterviews = () => {
    fetch(
      "http://localhost/InternBackend/students/api/get_student_scheduled_interviews.php",
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setInterviews(data.interviews);
      });
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleFileChange = (type, e) => {
    if (type === "cv") {
      setUploadData({ ...uploadData, cv: e.target.files[0] });
    } else if (type === "certificates") {
      setUploadData({
        ...uploadData,
        certificates: Array.from(e.target.files),
      });
    } else if (type === "other_docs") {
      setUploadData({
        ...uploadData,
        other_docs: Array.from(e.target.files),
      });
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="max-w-4xl px-6 py-12 mx-auto bg-white">
      {/* Page Title */}
      <h1 className="mb-12 text-4xl font-extrabold text-center text-[#01165A] tracking-tight">
        Interview Process
      </h1>

      {interviews.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No interview process available.
        </div>
      ) : (
        <div className="space-y-10">
          {interviews.map((iv) => {
            const canUpload =
              (iv.interview_date > today ||
                (iv.interview_date === today &&
                  padTime(iv.interview_time) > nowTime)) &&
              (!iv.cv || iv.certificates.length === 0 || iv.other_docs.length === 0);

            const interviewDone =
              iv.interview_date < today ||
              (iv.interview_date === today &&
                padTime(iv.interview_time) <= nowTime);

            return (
              <div
                key={iv.id}
                className="relative p-8 transition bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-2xl"
              >
                {/* Header */}
                <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[#01165A]">
                      {iv.internship_title}
                    </div>
                    <div className="text-base text-gray-500">
                      {iv.company_name}
                    </div>
                  </div>
                  <div className="flex items-center gap-8 mt-4 md:mt-0">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="font-semibold">📅 Date:</span>
                      <span className="text-[#FF7A00]">{iv.interview_date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="font-semibold">⏰ Time:</span>
                      <span className="text-[#FF7A00]">
                        {formatTime(iv.interview_time)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <div className="mb-1 font-semibold text-gray-700">Status</div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${
                      iv.status === "accepted"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : iv.status === "rejected"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : iv.status === "absent"
                        ? "bg-gray-300 text-gray-700 border border-gray-400"
                        : iv.status === "pending"
                        ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {iv.status.charAt(0).toUpperCase() + iv.status.slice(1)}
                  </span>
                </div>

                {/* Feedback */}
                {interviewDone && (
                  <div className="mb-6">
                    <div className="mb-1 font-semibold text-gray-700">
                      Company Feedback
                    </div>
                    <div className="p-4 italic text-gray-800 border border-gray-200 rounded bg-gray-50">
                      {iv.company_feedback ? (
                        iv.company_feedback
                      ) : (
                        <span className="text-gray-400">No feedback yet.</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Documents */}
                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <div className="mb-1 font-semibold text-gray-700">CV:</div>
                    {iv.cv ? (
                      <a
                        href={`http://localhost/InternBackend/${iv.cv}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF7A00] underline hover:text-[#01165A]"
                      >
                        View CV
                      </a>
                    ) : (
                      <span className="text-gray-500">Not uploaded</span>
                    )
                    }
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-gray-700">
                      Certificates:
                    </div>
                    {iv.certificates.length === 0 ? (
                      <span className="text-gray-500">None</span>
                    ) : (
                      iv.certificates.map((cert) => (
                        <a
                          key={cert.url}
                          href={`http://localhost/InternBackend/${cert.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[#FF7A00] underline hover:text-[#01165A]"
                        >
                          {cert.name}
                        </a>
                      ))
                    )}
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-gray-700">
                      Other Documents:
                    </div>
                    {iv.other_docs.length === 0 ? (
                      <span className="text-gray-500">None</span>
                    ) : (
                      iv.other_docs.map((doc) => (
                        <a
                          key={doc.url}
                          href={`http://localhost/InternBackend/${doc.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[#FF7A00] underline hover:text-[#01165A]"
                        >
                          {doc.name}
                        </a>
                      ))
                    )}
                  </div>
                </div>

                {/* Upload Section */}
                {canUpload && (
                  <div className="p-6 mt-6 border border-[#FF7A00]/30 rounded-xl bg-[#FF7A00]/5">
                    <div className="mb-3 text-lg font-semibold text-[#01165A]">
                      Upload Documents (Optional)
                    </div>
                    <div className="mb-2 text-sm text-[#01165A]">
                      Your <b>default CV</b> will be used for this interview.
                      You may upload a preferred CV or additional documents.
                      <br />
                      <span className="text-xs text-gray-600">
                        Once uploaded, documents will be sent to the company and
                        cannot be changed.
                      </span>
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold">
                        Upload Preferred CV (PDF):
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange("cv", e)}
                        className="block w-full"
                      />
                      {iv.cv && (
                        <div className="mt-2 text-sm text-gray-600">
                          Default CV:{" "}
                          <a
                            href={`http://localhost/InternBackend/${iv.cv}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF7A00] underline hover:text-[#01165A]"
                          >
                            View Default CV
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold">
                        Upload Certificates (PDF):
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => handleFileChange("certificates", e)}
                        className="block w-full"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold">
                        Upload Other Documents (PDF):
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => handleFileChange("other_docs", e)}
                        className="block w-full"
                      />
                    </div>
                    <button
                      className="px-6 py-2 mt-2 font-semibold text-white transition rounded bg-[#FF7A00] hover:bg-[#01165A]"
                      onClick={() => {
                        toast(
                          (t) => (
                            <span>
                              <b>Confirm Upload</b>
                              <br />
                              Are you sure you want to upload these documents?
                              Once submitted, they will be sent to the company
                              and <b>cannot be changed</b>.
                              <div className="flex gap-2 mt-3">
                                <button
                                  className="px-3 py-1 text-white rounded bg-[#FF7A00] hover:bg-[#01165A]"
                                  onClick={() => {
                                    toast.dismiss(t.id);
                                    setUploadingId(iv.id);
                                    const formData = new FormData();
                                    formData.append("interview_id", iv.id);
                                    if (uploadData.cv)
                                      formData.append("cv", uploadData.cv);
                                    uploadData.certificates.forEach((file, idx) =>
                                      formData.append(`certificates[${idx}]`, file)
                                    );
                                    uploadData.other_docs.forEach((file, idx) =>
                                      formData.append(`other_docs[${idx}]`, file)
                                    );

                                    toast.promise(
                                      fetch(
                                        "http://localhost/InternBackend/students/api/upload_student_interview_documents.php",
                                        {
                                          method: "POST",
                                          body: formData,
                                          credentials: "include",
                                        }
                                      )
                                        .then((res) => res.json())
                                        .then((data) => {
                                          setUploadData({
                                            cv: null,
                                            certificates: [],
                                            other_docs: [],
                                          });
                                          setUploadingId(null);
                                          fetchInterviews();
                                          return data;
                                        }),
                                      {
                                        loading: "Uploading documents...",
                                        success: (data) =>
                                          data.message || "Documents uploaded!",
                                        error: (err) =>
                                          err.message || "Upload failed",
                                      }
                                    );
                                  }}
                                >
                                  Yes, Upload
                                </button>
                                <button
                                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                  onClick={() => toast.dismiss(t.id)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </span>
                          ),
                          { duration: 10000 }
                        );
                      }}
                      disabled={uploadingId === iv.id}
                    >
                      {uploadingId === iv.id
                        ? "Uploading..."
                        : "Upload Documents"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InterviewProcess;
