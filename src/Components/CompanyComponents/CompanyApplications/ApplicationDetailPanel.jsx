import React from "react";

function getStatusClass(status) {
  return (
    {
      New: "bg-purple-100 text-purple-800",
      Reviewing: "bg-gray-100 text-gray-800",
      Interviewing: "bg-blue-100 text-blue-800",
      Shortlisted: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    }[status] || "bg-gray-100 text-gray-800"
  );
}

export default function ApplicationDetailPanel({
  selected,
  handleStatusUpdate,
}) {
  if (!selected) return null;

  return (
    <div className="flex-1 w-full mt-1">
      <h2 className="mb-6 text-3xl font-bold text-center text-[#2128BD]">
        Application Details
      </h2>

      <div className="max-h-screen p-6 overflow-y-auto border border-blue-100 rounded-lg shadow-sm bg-sky-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {selected.name}
            </h2>
            <p className="text-gray-600">{selected.email}</p>
            {selected.gender && (
              <p className="text-gray-600">Gender: {selected.gender}</p>
            )}
          </div>
          <span
            className={`px-3 py-1 font-semibold rounded-full text-sm ${getStatusClass(
              selected.status
            )}`}
          >
            {selected.status}
          </span>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-800">Application for</p>
          <p className="text-gray-700">{selected.role}</p>
          <p className="text-sm text-gray-600">Applied on {selected.applied}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-800">Education</p>
          <p className="text-gray-700">{selected.education}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-800">Experience</p>
          <p className="text-gray-700">{selected.experience || " - "}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-800">Skills</p>
          <p className="text-gray-700">{selected.skills}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-800">References</p>
          {selected.references?.length > 0 ? (
            <ul className="text-gray-700 list-disc list-inside">
              {selected.references.map((ref, i) => (
                <li key={i}>
                  <strong>{ref.name}</strong>, {ref.role} at {ref.company} —{" "}
                  {ref.email}, {ref.phone}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Not provided</p>
          )}
        </div>

        <div>
          <p className="mb-2 font-semibold text-gray-800">Update Status</p>
          <div className="flex flex-wrap gap-2">
            {["Reviewing", "Shortlisted", "Interviewing", "Rejected"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(selected.id, status)}
                  className="px-3 py-1 text-sm text-white transition-colors bg-[#2128BD] rounded-md hover:bg-[#1b1fab]"
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
