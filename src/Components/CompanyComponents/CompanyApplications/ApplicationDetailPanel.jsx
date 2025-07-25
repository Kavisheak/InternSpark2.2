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
        {/* Update Status */}
        <div>
          <p className="mb-2 font-semibold text-[#01165A]">Update Status</p>
          <div className="flex flex-wrap gap-3">
            {[
              {
                status: "Reviewing",
                bg: "bg-orange-500",
                hover: "hover:bg-orange-600",
              },
              {
                status: "Shortlisted",
                bg: "bg-emerald-600",
                hover: "hover:bg-emerald-700",
              },
              {
                status: "Interviewing",
                bg: "bg-[#1D4ED8]",
                hover: "hover:bg-[#1E40AF]",
              },
              {
                status: "Rejected",
                bg: "bg-rose-500",
                hover: "hover:bg-rose-600",
              },
            ].map(({ status, bg, hover }) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(selected.id, status)}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm border border-white/10 transition duration-200 ${bg} ${hover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
                  bg.split("-")[1]
                }-400`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
