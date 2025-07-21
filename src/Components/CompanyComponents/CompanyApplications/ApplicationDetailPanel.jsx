function getStatusClass(status) {
  return (
    {
      New: "bg-purple-100 text-purple-800",
      Reviewing: "bg-orange-100 text-orange-700",
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
      <h2 className="mb-6 text-3xl font-bold text-center text-[#01165A]">
        Application Details
      </h2>

      <div className="max-h-screen p-6 overflow-y-auto border border-[#01165A]/20 rounded-lg shadow-sm bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#01165A]">
              {selected.name}
            </h2>
            <p className="text-gray-700">{selected.email}</p>
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

        {/* Role */}
        <div className="mb-4">
          <p className="font-semibold text-[#01165A]">Application for</p>
          <p className="text-gray-700">{selected.role}</p>
          <p className="text-sm text-gray-600">Applied on {selected.applied}</p>
        </div>

        {/* Education */}
        <div className="mb-4">
          <p className="font-semibold text-[#01165A]">Education</p>
          <p className="text-gray-700">{selected.education}</p>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <p className="font-semibold text-[#01165A]">Experience</p>
          <p className="text-gray-700">{selected.experience || " - "}</p>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="font-semibold text-[#01165A]">Skills</p>
          <p className="text-gray-700">{selected.skills}</p>
        </div>

        {/* References */}
        <div className="mb-6">
          <p className="font-semibold text-[#01165A]">References</p>
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

        {/* Update Status */}
        <div>
          <p className="mb-2 font-semibold text-[#01165A]">Update Status</p>
          <div className="flex flex-wrap gap-2">
            {["Reviewing", "Shortlisted", "Interviewing", "Rejected"].map(
              (status) => {
                const statusColors = {
                  Reviewing: "bg-orange-500 hover:bg-orange-600",
                  Shortlisted: "bg-green-600 hover:bg-green-700",
                  Interviewing: "bg-[#01165A] hover:bg-[#01165A]/90",
                  Rejected: "bg-red-500 hover:bg-red-600",
                };

                return (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(selected.id, status)}
                    className={`px-3 py-1 text-sm text-white font-medium rounded-md transition-colors ${statusColors[status]}`}
                  >
                    {status}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
