import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import CompanyRescheduleModal from "./CompanyRescheduleModal";
import UpdateInterviewStatus from "./UpdateInterviewStatus";

const defaultProfileImg = "/default-profile.png";

const internshipTitles = [
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Marketing Intern",
  "Data Analyst",
];

const InterviewSchedule = () => {
  const [selectedTitle, setSelectedTitle] = useState("");
  const [search, setSearch] = useState("");
  
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("all"); // "all", "scheduled", "unscheduled"
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [pendingRescheduleRequestId, setPendingRescheduleRequestId] = useState(null);
  const [showRescheduleRequests, setShowRescheduleRequests] = useState(false);

  useEffect(() => {
    setLoading(true);
    let url = "http://localhost/InternBackend/company/api/get_accepted_candidates.php";
    if (selectedTitle) {
      url += `?title=${encodeURIComponent(selectedTitle)}`;
    }
    fetch(url, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.success) setCandidates(data.candidates);
        else setCandidates([]);
        setLoading(false);
      });
  }, [selectedTitle]);

  // Filter by search and scheduled/unscheduled
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      search
        ? c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
        : true;
    const isScheduled = c.interview_date && c.interview_time;
    const matchesType =
      filterType === "scheduled"
        ? isScheduled
        : filterType === "unscheduled"
        ? !isScheduled
        : true;
    const matchesReschedule =
      !showRescheduleRequests ||
      (c.reschedule_id && c.reschedule_status === "pending");
    return matchesSearch && matchesType && matchesReschedule;
  });

  const handleScheduleInterview = async (details) => {
    // Save interview details as before
    const res = await fetch(
      "http://localhost/InternBackend/company/api/save_interview.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(details),
      }
    );
    const data = await res.json();
    if (data.success) {
      // Now update reschedule status to accepted
      if (pendingRescheduleRequestId) {
        await fetch("http://localhost/InternBackend/company/api/update_reschedule_status.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ request_id: pendingRescheduleRequestId, status: "accepted" }),
        });
        setPendingRescheduleRequestId(null);
      }
      toast.success("Interview rescheduled and request accepted!");
      setScheduleModalOpen(false);
      // Optionally refresh candidate list
      setLoading(true);
      let url = "http://localhost/InternBackend/company/api/get_accepted_candidates.php";
      if (selectedTitle) {
        url += `?title=${encodeURIComponent(selectedTitle)}`;
      }
      fetch(url, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setCandidates(data.candidates);
          else setCandidates([]);
          setLoading(false);
        });
    } else {
      toast.error(data.message || "Failed to save interview.");
    }
  };

  const handleRescheduleAction = (requestId, status) => {
    if (status === "accepted") {
      // Open scheduling modal, save requestId for later
      setPendingRescheduleRequestId(requestId);
      setScheduleModalOpen(true);
      setRescheduleModalOpen(false);
    } else {
      // If rejected, update status immediately
      fetch("http://localhost/InternBackend/company/api/update_reschedule_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ request_id: requestId, status }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            toast.success("Request rejected!");
            setRescheduleModalOpen(false);
            // Optionally refresh candidate list
          } else {
            toast.error(data.message || "Failed to update request.");
          }
        });
    }
  };

  const pendingRescheduleCount = candidates.filter(
    c => c.reschedule_id && c.reschedule_status === "pending"
  ).length;

  return (
    <div className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-6 text-4xl font-extrabold text-[#01165A]">
          Interview Schedule
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          View and manage interviews for accepted candidates. Filter by
          internship title and search by name or email.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Internship Titles</option>
            {internshipTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name or email"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="scheduled">Scheduled Interviews</option>
            <option value="unscheduled">Unscheduled Interviews</option>
          </select>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            className={`relative px-4 py-2 rounded font-semibold border transition ${
              showRescheduleRequests
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
            onClick={() => setShowRescheduleRequests((prev) => !prev)}
          >
            {showRescheduleRequests ? "Show All Candidates" : "Show Reschedule Requests"}
            {pendingRescheduleCount > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                {pendingRescheduleCount}
              </span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading...</div>
        ) : filteredCandidates.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No accepted candidates found for the selected internship.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredCandidates.map((candidate, idx) => (
              <div
                key={candidate.id ? `${candidate.id}-${idx}` : idx}
                className="flex flex-col gap-2 p-6 bg-white border border-gray-100 shadow-lg rounded-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={
                      candidate.profile_img
                        ? `http://localhost/InternBackend/${candidate.profile_img}`
                        : defaultProfileImg
                    }
                    alt={candidate.name}
                    className="object-cover w-12 h-12 border border-orange-200 rounded-full bg-orange-50"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-[#01165A]">
                      {candidate.name}
                    </h2>
                    <p className="text-sm text-gray-500">{candidate.email}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 rounded-full bg-orange-50">
                    {candidate.internship}
                  </span>
                </div>
                {/* Show interview date/time if scheduled */}
                {candidate.interview_date && candidate.interview_time && (
                  <div className="mb-2 text-sm text-green-700">
                    <span className="font-semibold">Interview Scheduled:</span>{" "}
                    {candidate.interview_date} at {candidate.interview_time}
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    className={`px-4 py-2 text-sm font-semibold rounded ${
                      candidate.interview_date && candidate.interview_time
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setScheduleModalOpen(true);
                    }}
                  >
                    {candidate.interview_date && candidate.interview_time
                      ? "Reschedule Interview"
                      : "Schedule Interview"}
                  </button>
                  {/* Reschedule request button */}
                  {candidate.reschedule_id && candidate.reschedule_status === "pending" && (
                    <button
                      className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setRescheduleModalOpen(true);
                      }}
                    >
                      Reschedule Request
                    </button>
                  )}
                </div>
             
              </div>
            ))}
          </div>
        )}
        <ScheduleInterviewModal
          open={scheduleModalOpen}
          onClose={() => setScheduleModalOpen(false)}
          candidate={selectedCandidate || { name: "", email: "" }}
          onSchedule={handleScheduleInterview}
        />
        <CompanyRescheduleModal
          open={rescheduleModalOpen}
          onClose={() => setRescheduleModalOpen(false)}
          candidate={selectedCandidate}
          onAction={handleRescheduleAction}
        />
      </div>
    </div>
  );
};

export default InterviewSchedule;
