import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE = "http://localhost/InternBackend/students/api";

export default function InternshipDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [internship, setInternship] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applied, setApplied] = useState(false);

  // reporting
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reporting, setReporting] = useState(false);
  const [alreadyReported, setAlreadyReported] = useState(false);

  const [cancelModal, setCancelModal] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    // Load internship
    axios
      .get(`${API_BASE}/get_internship_by_id.php?id=${id}`)
      .then((res) => {
        if (!active) return;
        if (res.data.success && res.data.internship) {
          setInternship(res.data.internship);
        } else {
          setError("Internship not found.");
        }
      })
      .catch(() => active && setError("Failed to fetch internship."))
      .finally(() => active && setLoading(false));

    // Check if already applied
    axios
      .get(`${API_BASE}/get_applications.php`, { withCredentials: true })
      .then((res) => {
        if (!active) return;
        if (
          res.data.success &&
          Array.isArray(res.data.applications) &&
          res.data.applications.some(
            (app) => String(app.Internship_Id) === String(id)
          )
        ) {
          setApplied(true);
        } else {
          setApplied(false);
        }
      })
      .catch(() => {});

    // Check if already reported
    axios
      .get(`${API_BASE}/get_report_status.php?internship_id=${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!active) return;
        setAlreadyReported(!!res.data?.alreadyReported);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [id]);

  const proceedApplication = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/applications.php`,
        { internship_id: internship.id ?? internship.Internship_Id ?? id },
        { withCredentials: true }
      );
      if (res.data.success) {
        setApplied(true);
        toast.success(res.data.message || "Application submitted!", {
          style: { background: "#002147", color: "white" },
          iconTheme: { primary: "#FCA311", secondary: "white" },
        });
      } else {
        toast.error(res.data.message || "Failed to apply.");
      }
    } catch {
      toast.error("Failed to apply.");
    }
    setShowApplyModal(false);
  };

  const handleCancelApplication = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get_applications.php`, {
        withCredentials: true,
      });
      const app = res.data.applications?.find(
        (a) => String(a.Internship_Id) === String(id)
      );
      if (!app) {
        toast.error("Application not found.");
        setCancelModal(false);
        return;
      }
      const delRes = await axios.post(
        `${API_BASE}/delete_application.php`,
        { application_id: app.Application_Id },
        { withCredentials: true }
      );
      if (delRes.data.success) {
        setApplied(false);
        toast.success("Application cancelled successfully!", {
          style: { background: "#002147", color: "white" },
          iconTheme: { primary: "#FCA311", secondary: "white" },
        });
      } else {
        toast.error(delRes.data.message || "Failed to cancel.");
      }
    } catch {
      toast.error("Failed to cancel application.");
    }
    setCancelModal(false);
  };

  const submitReport = async () => {
    if (!reportReason) {
      toast.error("Please select a reason.");
      return;
    }
    setReporting(true);
    try {
      const res = await axios.post(
        `${API_BASE}/report_internship.php`,
        {
          internship_id: id,
          reason:
            reportReason === "other"
              ? (reportDetails || "Other")
              : `${reportReason}${reportDetails ? ` — ${reportDetails}` : ""}`,
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

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading internship details...
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="p-6 text-center text-red-600">
        {error || "Internship not found."}
        <button
          onClick={() => navigate(-1)}
          className="block mt-4 text-orange-500 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const title = internship.title;
  const workType = internship.workType || internship.internship_type;
  const pay = internship.pay || internship.salary;

  return (
    <>
      <div className="min-h-screen text-gray-800 bg-gray-50 fade-in-up">
        {/* Top Bar */}
        <div
          className="flex items-center gap-2 p-4 text-[#002147] bg-white border-b border-gray-200 cursor-pointer hover:underline"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Back to Internships</span>
        </div>

        <div className="max-w-5xl p-6 mx-auto">
          {/* Header */}
          <div className="p-6 mb-2 bg-white border border-gray-200 shadow-md rounded-xl">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                
                <div>
                  <h1 className="mb-1 text-3xl font-bold text-[#002147]">
                    {title}
                  </h1>
                  <p className="text-gray-500">
                    {internship.company || `Company ID: ${internship.Company_Id}`}
                  </p>
                  {/* --- Add Company Profile & Contact Buttons --- */}
                  <div className="flex gap-3 mt-2">
                    <Link
                      to={`/student/companyprofile/${internship.Company_Id}`}
                      className="px-4 py-2 text-sm font-semibold rounded bg-[#002147] text-white hover:bg-orange-500 hover:text-[#002147] transition"
                    >
                      View Company Profile
                    </Link>
                    <Link
                      to={`/student/companycontact/${internship.Company_Id}`}
                      className="px-4 py-2 text-sm font-semibold rounded bg-orange-500 text-[#002147] hover:bg-[#002147] hover:text-white transition"
                    >
                      View Contact
                    </Link>
                  </div>
                  {/* --- End Buttons --- */}
                </div>
              </div>

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
                          toast("You have already reported this internship.", {
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
                          ? "You already reported this post."
                          : "Report this internship"
                      }
                    >
                      <span className="inline-block w-2 h-2 mr-2 bg-red-600 rounded-full" />
                      {alreadyReported ? "Reported" : "Report"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-6 mt-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={internship.location}
              />
              <DetailItem
                icon={<FaClock />}
                label="Duration"
                value={internship.duration}
              />
              <DetailItem
                icon={<FaCalendarAlt />}
                label="Deadline"
                value={internship.deadline}
              />
              <DetailItem
                icon={<FaBriefcase />}
                label="Internship Type"
                value={workType}
              />
              <DetailItem icon={<FaDollarSign />} label="Salary" value={pay} />
              <DetailItem
                icon={<FaBriefcase />}
                label="Application Limit"
                value={internship.application_limit}
              />
              <DetailItem
                icon={<FaBriefcase />}
                label="Posted On"
                value={internship.created_at}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 text-sm text-white bg-orange-500 rounded-full">
                {workType}
              </span>
              <span className="px-3 py-1 text-sm text-white rounded-full bg-oxfordblue">
                {pay}
              </span>
              
            </div>

            <Section title="About the Internship">{internship.description}</Section>

            <Section title="Requirements">
              <ul className="pl-6 space-y-1 text-gray-700 list-disc">
                {(Array.isArray(internship.requirements)
                  ? internship.requirements
                  : internship.requirements?.split("\n") || []
                ).map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </Section>
          </div>

          {/* CTA Card */}
          <div className="p-8 text-center bg-white border border-gray-200 shadow-md text-oxfordblue rounded-xl">
            <h2 className="mb-2 text-2xl font-semibold">
              {applied ? "Already Applied" : "Ready to Apply?"}
            </h2>
            <p className="mb-6">
              {applied ? (
                "You have already applied for this internship."
              ) : (
                <>
                  Apply before <strong>{internship.deadline}</strong>
                </>
              )}
            </p>
            {applied ? (
              <button
                className="px-6 py-3 font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={() => setCancelModal(true)}
              >
                Cancel Application
              </button>
            ) : (
              <button
                className="px-6 py-3 font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
                onClick={() => setShowApplyModal(true)}
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Apply Confirmation Modal */}
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

      {/* Apply Confirmation Modal */}
      {showApplyModal && (
        <ConfirmModal
          title="Confirm Application"
          message={
            <>
              Are you sure you want to apply for{" "}
              <span className="font-semibold text-[#FCA311]">"{title}"</span>?
            </>
          }
          confirmText="Yes, Apply"
          onCancel={() => setShowApplyModal(false)}
          onConfirm={proceedApplication}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModal && (
        <ConfirmModal
          title="Cancel Application"
          message={
            <>
              Are you sure you want to cancel your application for{" "}
              <span className="font-semibold text-[#FCA311]">"{title}"</span>?
            </>
          }
          confirmText="Yes, Cancel"
          confirmClass="bg-red-600 hover:bg-red-700"
          onCancel={() => setCancelModal(false)}
          onConfirm={handleCancelApplication}
        />
      )}
    </>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-[#002147]">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-xl font-semibold text-[#002147]">{title}</h3>
      <div>{children}</div>
    </div>
  );}



function ConfirmModal({
  title,
  message,
  confirmText,
  onCancel,
  onConfirm,
  confirmClass = "bg-oxfordblue hover:bg-oxfordblue/80",
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative p-6 bg-white rounded-xl w-[90%] max-w-md shadow-lg text-center">
        <button
          className="absolute text-gray-400 top-4 right-4 hover:text-gray-600"
          onClick={onCancel}
        >
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
            className={`px-4 py-2 text-sm font-medium text-white rounded ${confirmClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

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
    { id: "spam", label: "Spam or misleading" },
    { id: "scam", label: "Scam / Payment request" },
    { id: "discrimination", label: "Discrimination / Hate / Harassment" },
    { id: "inaccurate", label: "Inaccurate or fake information" },
    { id: "expired", label: "Expired / Not available" },
    { id: "other", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[92%] max-w-lg bg-white rounded-xl shadow-lg p-6">
        <button
          className="absolute text-gray-400 top-4 right-4 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-[#002147] mb-2">
          Report Internship
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Help us keep the community safe. Select a reason below. Your report is
          confidential and may be reviewed by admins.
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
            title={alreadyReported ? "You already reported this post." : ""}
          >
            {alreadyReported ? "Already Reported" : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

