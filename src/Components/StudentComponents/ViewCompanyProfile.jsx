import React, { useState, useEffect } from "react";
import { Building2, Globe, MapPin, Users, Info, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const ViewCompanyProfile = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reporting, setReporting] = useState(false);
  const [alreadyReported, setAlreadyReported] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost/InternBackend/students/api/get_company_profile.php?company_id=${companyId}`
      )
      .then((res) => {
        if (res.data.success)
          setCompany({ ...res.data.profile, company_id: companyId });
      });

    axios
      .get(
        `http://localhost/InternBackend/students/api/get_company_report_status.php?company_id=${companyId}`,
        { withCredentials: true }
      )
      .then((res) => {
        setAlreadyReported(res.data.alreadyReported);
      });
  }, [companyId]);

  const submitReport = async () => {
    if (!reportReason) {
      toast.error("Please select a reason.");
      return;
    }
    setReporting(true);
    try {
      const res = await axios.post(
        `http://localhost/InternBackend/students/api/report_company.php`,
        {
          company_id: company.company_id,
          reason:
            reportReason === "other"
              ? reportDetails || "Other"
              : `${reportReason}${reportDetails ? ` — ${reportDetails}` : ""}`,
        },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.success) {
        setAlreadyReported(true);
        toast.success("Thanks! Your report has been submitted.", {
          style: { background: "#002147", color: "white" },
          iconTheme: { primary: "#FCA311", secondary: "white" },
        });
        setShowReportModal(false);
        setReportReason("");
        setReportDetails("");
      } else {
        toast.error(data.message || "Could not submit report.");
      }
    } catch {
      toast.error("Could not submit report.");
    } finally {
      setReporting(false);
    }
  };

  if (!company) return null;

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-orange-50 sm:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl">
        {/* Report Button at Top */}
        <div className="flex justify-end px-8 pt-6">
          <button
            onClick={() => {
              if (alreadyReported) {
                toast("You have already reported this company.", {
                  icon: "⚠️",
                  style: { background: "#002147", color: "white" },
                });
              } else {
                setShowReportModal(true);
              }
            }}
            className={`px-4 py-2 text-sm font-semibold rounded transition ${
              alreadyReported
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-red-600 bg-white hover:bg-red-50"
            }`}
            disabled={alreadyReported}
          >
            {alreadyReported ? "Reported" : "Report Company"}
          </button>
        </div>
        {/* Logo Preview */}
        <div className="flex flex-col items-center pt-8 pb-2 bg-white">
          <div className="relative mb-2 w-28 h-28">
            {company.logo_img ? (
              <img
                src={`http://localhost/InternBackend/${company.logo_img}`}
                alt="Company Logo"
                className="object-cover border-4 border-orange-400 rounded-full shadow-lg w-28 h-28"
              />
            ) : (
              <div className="flex items-center justify-center text-5xl text-gray-400 bg-gray-200 border-4 border-orange-400 rounded-full shadow-lg w-28 h-28">
                <Building2 className="w-16 h-16" />
              </div>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-[#002147] text-center break-words">
            {company.company_name}
          </h1>
          <p className="mt-1 text-base text-center text-gray-500">
            {company.industry}
          </p>
        </div>
        {/* Body */}
        <div className="px-8 pb-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[#002147] flex items-center gap-2">
              <Info className="w-5 h-5 text-orange-500" />
              About Us
            </h2>
            <p className="mt-2 leading-relaxed text-gray-700 whitespace-pre-line">
              {company.about || "No description provided."}
            </p>
          </section>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Company Size</p>
                <p className="font-medium text-[#002147]">
                  {company.company_size || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-[#002147]">
                  {company.location || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Website</p>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-orange-500 break-all hover:underline"
                  >
                    {company.website}
                  </a>
                ) : (
                  <span className="font-medium text-[#002147]">N/A</span>
                )}
              </div>
            </div>
          </section>
        </div>
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
};

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
          Report Company
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
            title={alreadyReported ? "You already reported this company." : ""}
          >
            {alreadyReported ? "Already Reported" : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewCompanyProfile;
