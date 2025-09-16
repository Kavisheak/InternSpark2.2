import React, { useState } from "react";

const interviewTypes = [
  { value: "onsite", label: "Onsite" },
  { value: "online", label: "Online" },
];

function ScheduleInterviewModal({ open, onClose, candidate, onSchedule }) {
  // Pre-fill modal fields if interview is scheduled
  const [type, setType] = useState(candidate.interview_type || "");
  const [date, setDate] = useState(candidate.interview_date || "");
  const [time, setTime] = useState(candidate.interview_time || "");
  const [meetingLink, setMeetingLink] = useState(candidate.meeting_link || "");
  const [location, setLocation] = useState(candidate.location || "");
  const [error, setError] = useState("");

  // Reset modal fields when candidate changes
  React.useEffect(() => {
    setType(candidate.interview_type || "");
    setDate(candidate.interview_date || "");
    setTime(candidate.interview_time || "");
    setMeetingLink(candidate.meeting_link || "");
    setLocation(candidate.location || "");
  }, [candidate]);

  const handleSubmit = () => {
    if (!type || !date || !time) {
      setError("Please fill all required fields.");
      return;
    }
    if (type === "online" && !meetingLink) {
      setError("Please add a meeting link for online interviews.");
      return;
    }
    if (type === "onsite" && !location) {
      setError("Please add location details for onsite interviews.");
      return;
    }
    setError("");
    onSchedule({
      candidate: {
        ...candidate,
        Application_Id: candidate.Application_Id,
        Internship_Id: candidate.Internship_Id,
        id: candidate.id,
      },
      type,
      date,
      time,
      meetingLink,
      location,
    });
    onClose();
  };

  if (!open) return null;

  const isScheduled = candidate.interview_date && candidate.interview_time;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative w-full max-w-lg p-8 bg-white shadow-xl rounded-xl">
        <button
          className="absolute text-xl text-gray-400 top-3 right-3 hover:text-orange-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="mb-4 text-2xl font-bold text-[#01165A]">
          {isScheduled ? "Update Interview Details" : "Schedule Interview"}
        </h2>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-oxfordblue">Candidate</label>
          <input
            type="text"
            value={candidate.name}
            disabled
            className="w-full px-4 py-2 bg-gray-100 border rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold text-oxfordblue">Interview Type</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Interview Type</option>
            {interviewTypes.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="block mb-1 font-semibold text-oxfordblue">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              min={new Date().toISOString().split("T")[0]} // <-- Prevent selecting before today
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold text-oxfordblue">Time</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
        {type === "online" && (
          <div className="mb-3">
            <label className="block mb-1 font-semibold text-oxfordblue">Meeting Link</label>
            <input
              type="url"
              value={meetingLink}
              onChange={e => setMeetingLink(e.target.value)}
              placeholder="Zoom/Google Meet/MS Teams link"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        )}
        {type === "onsite" && (
          <div className="mb-3">
            <label className="block mb-1 font-semibold text-oxfordblue">Location Details</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Address/Room"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        )}
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <button
          className={`w-full py-3 font-semibold text-white ${
            isScheduled ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"
          } rounded`}
          onClick={handleSubmit}
        >
          {isScheduled ? "Update Interview Details" : "Send Interview Details to Student"}
        </button>
      </div>
    </div>
  );
}

export default ScheduleInterviewModal;