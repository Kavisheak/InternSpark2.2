import { useParams, useNavigate } from "react-router-dom";

const applications = [
  {
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    appliedDate: "5/20/2024",
    deadline: "6/15/2024",
    status: "Shortlisted",
  },
  {
    title: "UI/UX Design Intern",
    company: "DesignStudio",
    location: "Remote",
    appliedDate: "5/18/2024",
    deadline: "6/10/2024",
    status: "Interviewing",
  },
  {
    title: "Data Science Intern",
    company: "DataFlow Systems",
    location: "New York, NY",
    appliedDate: "5/15/2024",
    deadline: "6/20/2024",
    status: "Accepted",
  },
  {
    title: "Marketing Intern",
    company: "Growth Co.",
    location: "Austin, TX",
    appliedDate: "5/10/2024",
    deadline: "6/5/2024",
    status: "Rejected",
  },
];

const statusColors = {
  Shortlisted: "bg-yellow-100 text-yellow-800",
  Interviewing: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function AppliedInternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const application = applications[id];

  if (!application) {
    return (
      <div className="p-8 font-semibold text-center text-red-600">
        Internship not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-8 mx-auto mt-8 bg-white rounded-lg shadow-md fade-in-up">
      <h1 className="mb-2 text-3xl font-bold text-[#002147]">
        {application.title}
      </h1>
      <p className="text-lg font-medium text-gray-700">{application.company}</p>
      <p className="mb-4 text-sm text-gray-500">{application.location}</p>

      <div className="space-y-3 text-sm text-gray-600">
        <p>📅 <strong>Applied on:</strong> {application.appliedDate}</p>
        <p>⏳ <strong>Deadline:</strong> {application.deadline}</p>
        <p>
          🏷️ <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 inline-block rounded-full text-sm font-medium ${statusColors[application.status]}`}
          >
            {application.status}
          </span>
        </p>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => {
            const confirmCancel = window.confirm("Are you sure you want to cancel this application?");
            if (confirmCancel) {
              alert("Your application has been cancelled.");
              navigate("/student/applications");
            }
          }}
          className="px-5 py-2 text-sm font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-700"
        >
          Cancel Application
        </button>

        <button
          onClick={() => navigate("/student/applications")}
          className="px-5 py-2 text-sm font-medium text-[#002147] border border-[#002147] rounded-lg hover:bg-[#002147] hover:text-white transition"
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
}
