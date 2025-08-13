import { useParams, useNavigate } from "react-router-dom";

const applications = [
  {
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    appliedDate: "5/20/2024",
    deadline: "6/15/2024",
    status: "Shortlisted",
    jobType: "On-site",
    stipend: "$1000/month",
    duration: "6 months",
    description: "Work with React and REST APIs to build intuitive user interfaces. Collaborate with a cross-functional team to develop scalable web applications.",
    skills: ["React", "JavaScript", "REST APIs", "Git"],
  },
  {
    title: "UI/UX Design Intern",
    company: "DesignStudio",
    location: "Remote",
    appliedDate: "5/18/2024",
    deadline: "6/10/2024",
    status: "Interviewing",
    interviewDate: "7/30/2024",
    jobType: "Remote",
    stipend: "Unpaid",
    duration: "3 months",
    description: "Assist in designing user flows, wireframes, and visual mockups. Conduct user research and usability testing.",
    skills: ["Figma", "Adobe XD", "User Research", "Wireframing"],
  },
  {
    title: "Data Science Intern",
    company: "DataFlow Systems",
    location: "New York, NY",
    appliedDate: "5/15/2024",
    deadline: "6/20/2024",
    status: "Accepted",
    jobType: "Hybrid",
    stipend: "$1500/month",
    duration: "4 months",
    description: "Build data pipelines and predictive models using Python. Work with large datasets to drive insights for the product team.",
    skills: ["Python", "Pandas", "Machine Learning", "SQL"],
  },
  {
    title: "Marketing Intern",
    company: "Growth Co.",
    location: "Austin, TX",
    appliedDate: "5/10/2024",
    deadline: "6/5/2024",
    status: "Rejected",
    jobType: "On-site",
    stipend: "Unpaid",
    duration: "2 months",
    description: "Assist in creating social media content, analyzing campaign metrics, and conducting market research.",
    skills: ["SEO", "Canva", "Analytics", "Communication"],
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
    <div className="max-w-4xl p-8 mx-auto mt-8 bg-white rounded-lg shadow-md space-y-6">
      <div>
        <h1 className="mb-1 text-3xl font-bold text-[#002147]">
          {application.title}
        </h1>
        <p className="text-lg font-medium text-gray-700">{application.company}</p>
        <p className="text-sm text-gray-500">{application.location}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <p>📅 <strong>Applied on:</strong> {application.appliedDate}</p>
        <p>⏳ <strong>Deadline:</strong> {application.deadline}</p>
        <p>💼 <strong>Job Type:</strong> {application.jobType}</p>
        <p>💰 <strong>Stipend:</strong> {application.stipend}</p>
        <p>📆 <strong>Duration:</strong> {application.duration}</p>
        {application.status === "Interviewing" && (
          <p>🗓️ <strong>Interview Date:</strong> {application.interviewDate}</p>
        )}
        <p>
          🏷️ <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 inline-block rounded-full text-sm font-medium ${statusColors[application.status]}`}
          >
            {application.status}
          </span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#002147] mb-2">Description</h3>
        <p className="text-sm text-gray-700">{application.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#002147] mb-2">Required Skills</h3>
        <ul className="flex flex-wrap gap-2">
          {application.skills.map((skill, index) => (
            <li
              key={index}
              className="px-3 py-1 text-sm text-[#002147] bg-gray-100 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => {
            const confirmCancel = window.confirm("Are you sure you want to cancel this application?");
            if (confirmCancel) {
              alert("Your application has been cancelled.");
              navigate("/student/applications");
            }
          }}
          className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Cancel Application
        </button>
        <button
          onClick={() => navigate("/student/applications")}
          className="px-5 py-2 text-sm font-medium text-[#002147] border border-[#002147] rounded-lg hover:bg-[#002147] hover:text-white"
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
}