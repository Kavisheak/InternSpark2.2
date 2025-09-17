import { useState, useRef, useEffect } from "react";
import {
  FiDownload,
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiUser,
} from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE = "http://localhost/InternBackend/students/api";

export default function ApplicationDetailPanel({
  selected,
  handleStatusUpdate,
  primaryColor,
}) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const imageRef = useRef(null);

  const statusOptions = [
    "Pending",
    "Reviewing",
    "Shortlisted",
    "Accepted",
    "Rejected",
  ];

  // Reporting states
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reporting, setReporting] = useState(false);
  const [alreadyReported, setAlreadyReported] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageRef.current && !imageRef.current.contains(event.target)) {
        setIsImageOpen(false);
      }
    };

    if (isImageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isImageOpen]);

  // Check if already reported
  useEffect(() => {
    if (!selected?.id || !selected?.student_id) return;
    axios
      .get(
        `http://localhost/InternBackend/company/api/get_application_report_status.php?application_id=${selected.id}&student_id=${selected.student_id}`,
        { withCredentials: true }
      )
      .then((res) => {
        setAlreadyReported(!!res.data?.alreadyReported);
      })
      .catch(() => {});
  }, [selected?.id, selected?.student_id]);

  const submitReport = async () => {
    if (!reportReason) {
      toast.error("Please select a reason.");
      return;
    }
    setReporting(true);
    try {
      const res = await axios.post(
        "http://localhost/InternBackend/company/api/report_application.php",
        {
          application_id: selected.id,
          reason:
            reportReason === "other"
              ? reportDetails || "Other"
              : `${reportReason}${
                  reportDetails ? ` — ${reportDetails}` : ""
                }`,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        setAlreadyReported(true);
        toast.success("Thanks! Your report has been submitted.", {
          style: { background: "#002147", color: "white" },
          iconTheme: { primary: "#FCA311", secondary: "white" },
        });
        setShowReportModal(false);
        setReportReason("");
        setReportDetails("");
      } else {
        toast.error(res.data.message || "Could not submit report.");
      }
    } catch {
      toast.error("Could not submit report.");
    } finally {
      setReporting(false);
    }
  };

  return (
    <div className="relative w-full p-6 text-gray-800 bg-white shadow-md md:w-full rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={
                selected.image
                  ? `http://localhost/InternBackend/${selected.image}`
                  : "/default-avatar.png"
              }
              alt={selected.name}
              className="object-cover w-16 h-16 rounded-full cursor-pointer"
              onClick={() => setIsImageOpen(!isImageOpen)}
              title="Click to enlarge"
            />
            {isImageOpen && (
              <div
                ref={imageRef}
                className="absolute top-0 z-50 w-40 h-40 p-1 bg-white border shadow-xl rounded-xl left-20"
              >
                <img
                  src={
                    selected.image
                      ? `http://localhost/InternBackend/${selected.image}`
                      : "/default-avatar.png"
                  }
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{selected.name}</h2>
            <p className="text-sm font-semibold text-orange-600">
              Applied for : {selected.internship_title}
            </p>
            {/* Gender */}
            <p className="flex items-center gap-2 mt-1 text-sm text-gray-700">
              <FiUser className="text-gray-500" />
              {selected.gender
                ? selected.gender === "M"
                  ? "Male"
                  : selected.gender === "F"
                  ? "Female"
                  : selected.gender
                : "Not provided"}
            </p>
          </div>
        </div>

        {/* Status + Menu */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            {selected.status}
          </span>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="p-2 text-gray-600 transition border border-gray-300 rounded-full hover:bg-gray-100"
              title="More"
            >
              <HiOutlineDotsVertical className="w-5 h-5" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-44">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (alreadyReported) {
                      toast("You have already reported this application.", {
                        icon: "⚠️",
                        style: { background: "#002147", color: "white" },
                      });
                    } else {
                      setShowReportModal(true);
                    }
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  title={
                    alreadyReported
                      ? "You already reported this application."
                      : "Report this application"
                  }
                >
                  <span className="inline-block w-2 h-2 mr-2 bg-red-600 rounded-full" />
                  {alreadyReported ? "Reported" : "Report"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CV + Contact Buttons */}
      <div className="flex items-center gap-4 mb-6">
        <a
          href={
            selected.cv
              ? (selected.cv.startsWith("http")
                  ? selected.cv
                  : selected.cv.startsWith("/")
                  ? `http://localhost${selected.cv}`
                  : `http://localhost/InternBackend/${selected.cv}`)
              : "/sample-cv.pdf"
          }
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: primaryColor }}
        >
          <FiDownload /> Download CV
        </a>
        <a
          href={`mailto:${selected.email}`}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          <FiMail /> Contact
        </a>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Contact Information</h3>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <FiMail className="text-gray-500" /> {selected.email}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <FiPhone className="text-gray-500" /> {selected.phone}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <FiGithub className="text-gray-500" />
          {selected.github && selected.github.trim() ? (
            <a
              href={
                selected.github.startsWith("http")
                  ? selected.github
                  : `https://github.com/${selected.github}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {selected.github}
            </a>
          ) : (
            <span className="text-gray-400">Not provided</span>
          )}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <FiLinkedin className="text-gray-500" />
          {selected.linkedin && selected.linkedin.trim() ? (
            <a
              href={
                selected.linkedin.startsWith("http")
                  ? selected.linkedin
                  : `https://linkedin.com/in/${selected.linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {selected.linkedin}
            </a>
          ) : (
            <span className="text-gray-400">Not provided</span>
          )}
        </p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Education</h3>
        <p>{selected.education}</p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Experience</h3>
        <p>{selected.experience}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Skills </h3>
        <p>{selected.skills}</p>
      </div>

      {/* Status Update */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">Update Application Status</h3>
        <select
          value={selected.status}
          onChange={(e) => handleStatusUpdate(selected.id, e.target.value)}
          className="p-2 text-sm border rounded-md"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onSubmit={submitReport}
          disabled={reporting || alreadyReported}
          reportReason={reportReason}
          setReportReason={setReportReason}
          reportDetails={reportDetails}
          setReportDetails={setReportDetails}
          alreadyReported={alreadyReported}
        />
      )}
    </div>
  );
}

// Reusable ReportModal
function ReportModal({
  onClose,
  onSubmit,
  disabled,
  reportReason,
  setReportReason,
  reportDetails,
  setReportDetails,
  alreadyReported,
}) {
  const reasons = [
    { id: "plagiarism", label: "Plagiarism or fake documents" },
    { id: "unprofessional", label: "Unprofessional behavior" },
    { id: "fraud", label: "Fraudulent activity" },
    { id: "harassment", label: "Harassment or abuse" },
    { id: "other", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg rounded-xl shadow-lg p-6 animate-fadeIn">
        <div className="relative w-[92%] max-w-lg bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
          <button
            className="absolute text-gray-400 top-4 right-4 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold text-[#002147] mb-2">
            Report Student
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Help us keep the community safe. Select a reason below. Your report
            is confidential and may be reviewed by admins.
          </p>

          <div className="mb-4 space-y-2">
            {reasons.map((r) => (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-2 rounded-lg border ${
                  reportReason === r.id ? "border-[#002147]" : "border-gray-200"
                } cursor-pointer`}
              >
                <input
                  type="radio"
                  name="report_reason"
                  className="cursor-pointer"
                  value={r.id}
                  checked={reportReason === r.id}
                  onChange={(e) => setReportReason(e.target.value)}
                  disabled={disabled}
                />
                <span className="text-sm">{r.label}</span>
              </label>
            ))}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-[#002147]">
              Additional details (optional)
            </label>
            <textarea
              className="w-full p-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-[#002147]/30"
              rows={4}
              placeholder="Provide any context that would help admins investigate…"
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              disabled={disabled}
              maxLength={1000}
            />
            <div className="mt-1 text-xs text-gray-400">
              {reportDetails.length}/1000
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-60"
              disabled={disabled || alreadyReported}
              title={alreadyReported ? "You already reported this student." : ""}
            >
              {disabled && !alreadyReported
                ? "Submitting..."
                : alreadyReported
                ? "Already Reported"
                : "Submit Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}