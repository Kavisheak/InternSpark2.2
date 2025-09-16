import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function formatTime(timeStr) {
  if (!timeStr) return "";
  let [hour, minute] = timeStr.split(":");
  hour = parseInt(hour, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  let displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${ampm}`;
}

function padTime(t) {
  const [h, m] = t.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

const InterviewProcess = () => {
  const [interviews, setInterviews] = useState([]);
  const [uploadData, setUploadData] = useState({ cv: null, certificates: [], other_docs: [] });
  const [uploadingId, setUploadingId] = useState(null);

  // Fetch scheduled interviews
  const fetchInterviews = () => {
    fetch("http://localhost/InternBackend/students/api/get_student_scheduled_interviews.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
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
      setUploadData({ ...uploadData, certificates: Array.from(e.target.files) });
    } else if (type === "other_docs") {
      setUploadData({ ...uploadData, other_docs: Array.from(e.target.files) });
    }
  };

  const handleUpload = (ivId) => {
    toast(
      (t) => (
        <span>
          <b>Are you sure?</b>
          <br />
          Once you upload, you <b>cannot change</b> your documents and they will be sent to the company.
          <div className="flex gap-2 mt-3">
            <button
              className="px-3 py-1 text-white bg-blue-600 rounded"
              onClick={() => {
                toast.dismiss(t.id);
                setUploadingId(ivId);
                const formData = new FormData();
                formData.append("interview_id", ivId);
                if (uploadData.cv) formData.append("cv", uploadData.cv);
                uploadData.certificates.forEach((file, idx) => formData.append(`certificates[${idx}]`, file));
                uploadData.other_docs.forEach((file, idx) => formData.append(`other_docs[${idx}]`, file));

                toast.promise(
                  fetch("http://localhost/InternBackend/students/api/upload_student_interview_documents.php", {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                  })
                    .then(res => res.json())
                    .then(data => {
                      setUploadData({ cv: null, certificates: [], other_docs: [] });
                      setUploadingId(null);
                      fetchInterviews();
                      return data;
                    }),
                  {
                    loading: "Uploading documents...",
                    success: (data) => data.message || "Documents uploaded!",
                    error: (err) => err.message || "Upload failed"
                  }
                );
              }}
            >
              Yes, Upload
            </button>
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="max-w-3xl px-4 py-10 mx-auto">
      <h1 className="mb-10 text-4xl font-extrabold text-center text-[#01165A] tracking-tight">
        Interview Process
      </h1>
      {interviews.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          No interview process available.
        </div>
      ) : (
        <div className="space-y-10">
          {interviews.map((iv) => {
            const canUpload =
              (iv.interview_date > today ||
                (iv.interview_date === today && padTime(iv.interview_time) > nowTime)) &&
              (!iv.cv || iv.certificates.length === 0 || iv.other_docs.length === 0);

            const interviewDone =
              iv.interview_date < today ||
              (iv.interview_date === today && padTime(iv.interview_time) <= nowTime);

            return (
              <div
                key={iv.id}
                className="relative p-8 transition bg-white border border-gray-200 shadow-xl rounded-2xl hover:shadow-2xl"
              >
                {/* Header */}
                <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[#01165A]">
                      {iv.internship_title}
                    </div>
                    <div className="text-base text-gray-500">{iv.company_name}</div>
                  </div>
                  <div className="flex items-center gap-8 mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Date:</span>
                      <span>{iv.interview_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Time:</span>
                      <span>{formatTime(iv.interview_time)}</span>
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
                    {iv.status === "accepted"
                      ? "Accepted"
                      : iv.status === "rejected"
                      ? "Rejected"
                      : iv.status === "absent"
                      ? "Absent"
                      : iv.status === "pending"
                      ? "Pending"
                      : iv.status}
                  </span>
                </div>
                {/* Feedback */}
                {interviewDone && (
                  <div className="mb-6">
                    <div className="mb-1 font-semibold text-gray-700">Company Feedback</div>
                    <div className="p-4 italic text-gray-800 border border-gray-200 rounded bg-gray-50">
                      {iv.company_feedback
                        ? iv.company_feedback
                        : <span className="text-gray-400">No feedback yet.</span>}
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
                        className="text-blue-600 underline"
                      >
                        View CV
                      </a>
                    ) : (
                      <span className="text-gray-500">Not uploaded</span>
                    )}
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-gray-700">Certificates:</div>
                    {iv.certificates.length === 0 ? (
                      <span className="text-gray-500">None</span>
                    ) : (
                      iv.certificates.map((cert) => (
                        <a
                          key={cert.url}
                          href={`http://localhost/InternBackend/${cert.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 underline"
                        >
                          {cert.name}
                        </a>
                      ))
                    )}
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-gray-700">Other Documents:</div>
                    {iv.other_docs.length === 0 ? (
                      <span className="text-gray-500">None</span>
                    ) : (
                      iv.other_docs.map((doc) => (
                        <a
                          key={doc.url}
                          href={`http://localhost/InternBackend/${doc.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 underline"
                        >
                          {doc.name}
                        </a>
                      ))
                    )}
                  </div>
                </div>
                {/* Upload Section */}
                {canUpload && (
                  <div className="p-6 mt-6 border border-blue-100 rounded-xl bg-blue-50">
                    <div className="mb-3 text-lg font-semibold text-blue-900">
                      Upload Documents (Optional)
                    </div>
                    <div className="mb-2 text-sm text-blue-900">
                      Your <b>default CV</b> will be used for this interview. If you wish, you can upload a preferred CV for this interview below.<br />
                      <span className="text-xs text-gray-600">
                        Once you upload, your documents will be sent to the company and cannot be changed.
                      </span>
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold">Upload Preferred CV (PDF):</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange("cv", e)}
                        className="block"
                      />
                      {iv.cv && (
                        <div className="mt-2 text-sm text-gray-600">
                          Default CV:{" "}
                          <a
                            href={`http://localhost/InternBackend/${iv.cv}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Default CV
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold">Upload Certificates (PDF, optional):</label>
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => handleFileChange("certificates", e)}
                        className="block"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1 font-semibold">Upload Other Documents (PDF, optional):</label>
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => handleFileChange("other_docs", e)}
                        className="block"
                      />
                    </div>
                    <button
                      className="px-6 py-2 mt-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => {
                        toast(
                          (t) => (
                            <span>
                              <b>Confirm Upload</b>
                              <br />
                              Are you sure you want to upload these documents? Once submitted, they will be sent to the company and <b>cannot be changed</b>.
                              <div className="flex gap-2 mt-3">
                                <button
                                  className="px-3 py-1 text-white bg-blue-600 rounded"
                                  onClick={() => {
                                    toast.dismiss(t.id);
                                    setUploadingId(iv.id);
                                    const formData = new FormData();
                                    formData.append("interview_id", iv.id);
                                    if (uploadData.cv) formData.append("cv", uploadData.cv);
                                    uploadData.certificates.forEach((file, idx) => formData.append(`certificates[${idx}]`, file));
                                    uploadData.other_docs.forEach((file, idx) => formData.append(`other_docs[${idx}]`, file));

                                    toast.promise(
                                      fetch("http://localhost/InternBackend/students/api/upload_student_interview_documents.php", {
                                        method: "POST",
                                        body: formData,
                                        credentials: "include"
                                      })
                                        .then(res => res.json())
                                        .then(data => {
                                          setUploadData({ cv: null, certificates: [], other_docs: [] });
                                          setUploadingId(null);
                                          fetchInterviews();
                                          return data;
                                        }),
                                      {
                                        loading: "Uploading documents...",
                                        success: (data) => data.message || "Documents uploaded!",
                                        error: (err) => err.message || "Upload failed"
                                      }
                                    );
                                  }}
                                >
                                  Yes, Upload
                                </button>
                                <button
                                  className="px-3 py-1 bg-gray-300 rounded"
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
                      {uploadingId === iv.id ? "Uploading..." : "Upload Documents"}
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