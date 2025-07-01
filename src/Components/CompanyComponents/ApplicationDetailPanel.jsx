// ApplicationDetailPanel.js
import React from "react";

function getStatusClass(status) {
  return (
    {
      New: "bg-purple-900 text-purple-400",
      Reviewing: "bg-gray-900 text-gray-400",
      Interviewing: "bg-blue-900 text-blue-400",
      Shortlisted: "bg-green-900 text-green-400",
      Rejected: "bg-red-900 text-red-400",
    }[status] || "bg-gray-900 text-gray-400"
  );
}

export default function ApplicationDetailPanel({ selected, handleStatusUpdate }) {
  if (!selected) return null;

  return (
    <div className="flex-1 mt-1">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-100">
        Application Details
      </h2>

      <div className="max-h-screen p-6 overflow-y-auto border border-gray-100 rounded-md cv">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-100">
              {selected.name}
            </h2>
            <p className="text-gray-400">{selected.email}</p>
            {selected.gender && (
              <p className="text-gray-400">Gender: {selected.gender}</p>
            )}
          </div>
          <span
            className={`px-3 py-1 font-semibold rounded-full ${getStatusClass(
              selected.status
            )}`}
          >
            {selected.status}
          </span>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-200">Application for</p>
          <p>{selected.role}</p>
          <p className="text-gray-400">Applied on {selected.applied}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-200">Education</p>
          <p>{selected.education}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-200">Experience</p>
          <p>{selected.experience || " - "}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-200">Skills</p>
          <p>{selected.skills}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-200">References</p>
          {selected.references && selected.references.length > 0 ? (
            <ul className="list-disc list-inside">
              {selected.references.map((ref, index) => (
                <li key={index}>
                  <span className="font-semibold">{ref.name}</span>, {ref.role} at{" "}
                  {ref.company} — {ref.email}, {ref.phone}
                </li>
              ))}
            </ul>
          ) : (
            <p>Not provided</p>
          )}
        </div>

        <div>
          <p className="mb-2 font-semibold text-gray-200">Update Status</p>
          <div className="flex flex-wrap gap-2">
            {["Reviewing", "Shortlisted", "Interviewing", "Rejected"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(selected.id, status)}
                  className="px-3 py-1 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700"
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
