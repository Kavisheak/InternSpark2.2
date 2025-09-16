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

const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().slice(0, 5);
    return { date, time };
};

const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "absent", label: "Absent" }
];

const UpdateInterviewStatus = () => {
    const [interviews, setInterviews] = useState([]);
    const [statusUpdates, setStatusUpdates] = useState({});
    const [feedbacks, setFeedbacks] = useState({});
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [activeTab, setActiveTab] = useState("pending");

    useEffect(() => {
        fetch("http://localhost/InternBackend/company/api/get_interview_candidates.php", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.interviews)) {
                    const { date, time } = getCurrentDateTime();
                    const filtered = data.interviews.filter((iv) => {
                        if (iv.interview_date < date) return true;
                        if (iv.interview_date === date && iv.interview_time <= time) return true;
                        return false;
                    });
                    setInterviews(filtered);
                    // Initialize feedbacks and statusUpdates state
                    const feedbackObj = {};
                    const statusObj = {};
                    filtered.forEach(iv => {
                        feedbackObj[iv.id] = iv.company_feedback || "";
                        statusObj[iv.id] = iv.status || "pending";
                    });
                    setFeedbacks(feedbackObj);
                    setStatusUpdates(statusObj);
                } else {
                    setInterviews([]);
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setStatusUpdates((prev) => ({ ...prev, [id]: newStatus }));
    };

    const handleFeedbackChange = (id, value) => {
        setFeedbacks((prev) => ({ ...prev, [id]: value }));
    };

    const handleUpdate = (id) => {
        toast(
            (t) => (
                <span>
                    <b>Confirm Status Update</b>
                    <br />
                    Are you sure you want to update the status and feedback for this interview? This action will notify the student and cannot be undone.
                    <div className="flex gap-2 mt-3">
                        <button
                            className="px-3 py-1 text-white bg-blue-600 rounded"
                            onClick={() => {
                                toast.dismiss(t.id);
                                setUpdatingId(id);
                                fetch("http://localhost/InternBackend/company/api/update_interview_status.php", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    credentials: "include",
                                    body: JSON.stringify({
                                        interview_id: id,
                                        status: statusUpdates[id] || "pending",
                                        feedback: feedbacks[id] || ""
                                    }),
                                })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        if (data.success) {
                                            toast.success(data.message || "Interview status updated!");
                                            // Re-fetch interviews to get the latest feedback/status from backend
                                            fetch("http://localhost/InternBackend/company/api/get_interview_candidates.php", {
                                                credentials: "include",
                                            })
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    if (data.success && Array.isArray(data.interviews)) {
                                                        const { date, time } = getCurrentDateTime();
                                                        const filtered = data.interviews.filter((iv) => {
                                                            if (iv.interview_date < date) return true;
                                                            if (iv.interview_date === date && iv.interview_time <= time) return true;
                                                            return false;
                                                        });
                                                        setInterviews(filtered);
                                                        // Re-initialize feedbacks and statusUpdates state
                                                        const feedbackObj = {};
                                                        const statusObj = {};
                                                        filtered.forEach(iv => {
                                                            feedbackObj[iv.id] = iv.company_feedback || "";
                                                            statusObj[iv.id] = iv.status || "pending";
                                                        });
                                                        setFeedbacks(feedbackObj);
                                                        setStatusUpdates(statusObj);
                                                    }
                                                });
                                        } else {
                                            toast.error(data.message || "Failed to update status");
                                        }
                                        setUpdatingId(null);
                                    })
                                    .catch(() => {
                                        toast.error("Server error");
                                        setUpdatingId(null);
                                    });
                            }}
                        >
                            Yes, Update
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

    const TABS = [
        { key: "pending", label: "Pending Updates" },
        { key: "decided", label: "Past Decisions" }
    ];

    const filteredInterviews = interviews.filter(iv =>
        activeTab === "pending"
            ? iv.status === "pending"
            : iv.status !== "pending"
    );

    return (
        <div className="max-w-3xl px-4 py-10 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-[#01165A]">Update Interview Status</h1>
            <div className="flex gap-2 mb-8">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        className={`px-5 py-2 rounded-t font-semibold border-b-2 transition ${
                            activeTab === tab.key
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-100 text-gray-700 border-transparent hover:bg-blue-50"
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {loading ? (
                <div className="py-12 text-center text-gray-500">Loading...</div>
            ) : filteredInterviews.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                    No interviews to update at this time.
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredInterviews.map((iv) => (
                        <div
                            key={iv.id}
                            className="p-6 bg-white border border-gray-100 shadow rounded-xl"
                        >
                            <div className="mb-2 text-lg font-semibold text-[#01165A]">
                                {iv.fname} {iv.lname}
                            </div>
                            <div className="mb-2 text-sm text-gray-700">
                                <span className="font-semibold">Email:</span> {iv.email}
                            </div>
                            <div className="mb-2 text-sm text-gray-700">
                                <span className="font-semibold">Interview Date:</span> {iv.interview_date}
                                <span className="ml-4 font-semibold">Time:</span> {formatTime(iv.interview_time)}
                            </div>
                            <div className="mb-2 text-sm">
                                <span className="font-semibold">CV:</span>{" "}
                                {iv.cv_url ? (
                                    <span>
                                        <a
                                            href={`http://localhost/InternBackend/${iv.cv_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View CV
                                        </a>
                                        {/* If you want to show which CV is used, add logic here */}
                                    </span>
                                ) : (
                                    <span className="text-gray-500">Not uploaded</span>
                                )}
                            </div>
                            <div className="mb-2 text-sm">
                                <span className="font-semibold">Certificates:</span>{" "}
                                {iv.certificates_url && Array.isArray(iv.certificates_url) && iv.certificates_url.length > 0 ? (
                                    iv.certificates_url.map((cert, idx) => (
                                        <a
                                            key={cert.url || idx}
                                            href={`http://localhost/InternBackend/${cert.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mr-2 text-blue-600 underline"
                                        >
                                            {cert.name || `Certificate ${idx + 1}`}
                                        </a>
                                    ))
                                ) : (
                                    <span className="text-gray-500">None</span>
                                )}
                            </div>
                            <div className="mb-2 text-sm">
                                <span className="font-semibold">Other Documents:</span>{" "}
                                {iv.other_docs_url && Array.isArray(iv.other_docs_url) && iv.other_docs_url.length > 0 ? (
                                    iv.other_docs_url.map((doc, idx) => (
                                        <a
                                            key={doc.url || idx}
                                            href={`http://localhost/InternBackend/${doc.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mr-2 text-blue-600 underline"
                                        >
                                            {doc.name || `Document ${idx + 1}`}
                                        </a>
                                    ))
                                ) : (
                                    <span className="text-gray-500">None</span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                {activeTab === "pending" ? (
                                    <select
                                        value={statusUpdates[iv.id] || iv.status}
                                        onChange={e => handleStatusChange(iv.id, e.target.value)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        {statusOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <div>
                                        <span className="font-semibold">Final Status: </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                                            iv.status === "accepted"
                                                ? "bg-green-100 text-green-700 border border-green-200"
                                                : iv.status === "rejected"
                                                ? "bg-red-100 text-red-700 border border-red-200"
                                                : iv.status === "absent"
                                                ? "bg-gray-300 text-gray-700 border border-gray-400"
                                                : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                        }`}>
                                            {statusOptions.find(opt => opt.value === iv.status)?.label || iv.status}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 mb-2">
                                <label className="block mb-1 font-semibold">Feedback for Student:</label>
                                {activeTab === "pending" ? (
                                    <textarea
                                        className="w-full px-3 py-2 border rounded"
                                        rows={2}
                                        value={feedbacks[iv.id] || ""}
                                        onChange={(e) => handleFeedbackChange(iv.id, e.target.value)}
                                        placeholder="Write feedback for the student..."
                                    />
                                ) : (
                                    <div className="p-2 bg-gray-50 border rounded min-h-[40px] text-gray-800">
                                        {iv.company_feedback && iv.company_feedback.trim() !== ""
                                            ? iv.company_feedback
                                            : <span className="text-gray-400">No feedback provided.</span>
                                        }
                                    </div>
                                )}
                            </div>

                            {activeTab === "pending" && (
                                <button
                                    onClick={() => handleUpdate(iv.id)}
                                    className="px-4 py-2 text-white bg-blue-600 rounded"
                                    disabled={updatingId === iv.id}
                                >
                                    {updatingId === iv.id ? "Updating..." : "Update Status & Feedback"}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpdateInterviewStatus;
