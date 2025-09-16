import React, { useState, useEffect } from "react";

const reasons = [
  { value: "personal", label: "Personal Issue" },
  { value: "medical", label: "Medical Reason" },
  { value: "other", label: "Other" },
];

function RequestRescheduleModal({ open, onClose, onSubmit, interview }) {
  const [reasonType, setReasonType] = useState("");
  const [reasonText, setReasonText] = useState("");
  const [medicalProof, setMedicalProof] = useState(null);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (interview) {
      setReasonType(interview.reason_type || "");
      setReasonText(
        interview.reason_type === "personal" || interview.reason_type === "medical"
          ? interview.reason_text || ""
          : ""
      );
      setOtherText(interview.reason_type === "other" ? interview.reason_text || "" : "");
      setMedicalProof(null); // Don't prefill file
    }
  }, [interview, open]);

  const handleFileChange = (e) => {
    setMedicalProof(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!reasonType) {
      setError("Please select a reason.");
      return;
    }
    if (reasonType === "personal" && !reasonText.trim()) {
      setError("Please provide your reason.");
      return;
    }
    if (reasonType === "medical" && (!reasonText.trim() || !medicalProof)) {
      setError("Please provide reason and upload medical proof.");
      return;
    }
    if (reasonType === "other" && !otherText.trim()) {
      setError("Please specify your reason.");
      return;
    }
    setError("");
    // Prepare form data for file upload
    const formData = new FormData();
    formData.append("interview_id", interview.id);
    formData.append("reason_type", reasonType);
    formData.append(
      "reason_text",
      reasonType === "personal"
        ? reasonText
        : reasonType === "medical"
        ? reasonText
        : otherText
    );
    if (reasonType === "medical" && medicalProof) {
      formData.append("medical_proof", medicalProof);
    }
    onSubmit(formData);
    onClose();
  };

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
        <h2 className="mb-4 text-2xl font-bold text-[#01165A]">Request Reschedule</h2>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-oxfordblue">Reason Type</label>
          <select
            value={reasonType}
            onChange={(e) => setReasonType(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Reason</option>
            {reasons.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        {reasonType === "personal" && (
          <div className="mb-3">
            <label className="block mb-1 font-semibold text-oxfordblue">Reason</label>
            <textarea
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded"
              placeholder="Describe your personal issue..."
            />
          </div>
        )}
        {reasonType === "medical" && (
          <>
            <div className="mb-3">
              <label className="block mb-1 font-semibold text-oxfordblue">Reason</label>
              <textarea
                value={reasonText}
                onChange={(e) => setReasonText(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border rounded"
                placeholder="Describe your medical reason..."
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-semibold text-oxfordblue">Medical Proof (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          </>
        )}
        {reasonType === "other" && (
          <div className="mb-3">
            <label className="block mb-1 font-semibold text-oxfordblue">Specify Reason</label>
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded"
              placeholder="Describe your reason..."
            />
          </div>
        )}
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <button
          className="w-full py-3 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600"
          onClick={handleSubmit}
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}

export default RequestRescheduleModal;