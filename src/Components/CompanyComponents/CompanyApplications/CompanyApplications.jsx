import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Footer from "../Footer";
import CompanyNavbar from "../CompanyNavbar";
import ApplicationSidebar from "./ApplicationSidebar";
import ApplicationDetailPanel from "./ApplicationDetailPanel";

const initialApplications = [
  {
    id: 1,
    name: "Sarah Johnson",
    gender: "Female",
    role: "Frontend Developer Intern",
    applied: "5/16/2025",
    education: "Computer Science, Stanford University",
    experience: "1 year part-time web development",
    skills: "I am excited to apply for this position because…",
    email: "sarah.j@example.com",
    status: "New",
    references: [
      {
        name: "John Peterson",
        role: "Senior Manager",
        company: "Tech Solutions Ltd.",
        email: "john.peterson@techsolutions.com",
        phone: "+94 71 123 0456",
      },
      {
        name: "Alice Brown",
        role: "Team Lead",
        company: "WebTech Solutions",
        email: "alice.brown@webtech.com",
        phone: "+94 77 654 7890",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    gender: "Male",
    role: "UX Design Intern",
    applied: "5/15/2025",
    education: "Design, University of Berkeley",
    experience: "Intern at TechDesign",
    skills: "Design is my passion…",
    email: "m.chen@example.com",
    status: "Reviewing",
  },
  {
    id: 3,
    name: "Alex Washington",
    gender: "Male",
    role: "Data Science Intern",
    applied: "5/14/2025",
    education: "Data Analytics, MIT",
    experience: "Intern at AnalyticsPro",
    skills: "I am eager to learn…",
    email: "alex.w@example.com",
    status: "Interviewing",
  },
  {
    id: 4,
    name: "Jamie Garcia",
    gender: "Female",
    role: "Frontend Developer Intern",
    applied: "5/13/2025",
    education: "Web Development, Harvard University",
    experience: "Intern at WebTech Solutions",
    skills: "I am passionate about coding…",
    email: "jamie.g@example.com",
    status: "Rejected",
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

export default function CompanyApplications() {
  const { roleSlug } = useParams();
  const query = useQuery();
  const applicantName = query.get("applicantName");

  const [applications, setApplications] = useState(initialApplications);
  const [selectedId, setSelectedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredByRole = roleSlug
    ? applications.filter((app) => slugify(app.role) === roleSlug)
    : applications;

  useEffect(() => {
    if (selectedId !== null) return;

    if (applicantName) {
      const found = applications.find(
        (app) => app.name.toLowerCase() === applicantName.toLowerCase()
      );
      if (found) setSelectedId(found.id);
    } else if (filteredByRole.length > 0) {
      setSelectedId(filteredByRole[0].id);
    }
  }, [applicantName, roleSlug, applications, filteredByRole, selectedId]);

  const handleStatusUpdate = (id, newStatus) => {
    setApplications((apps) =>
      apps.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const selected = applications.find((app) => app.id === selectedId);

  return (
    <div className="min-h-screen text-gray-800 bg-white">
      <CompanyNavbar />
      <div className="flex flex-col md:flex-row items-start gap-6 p-6 min-h-[calc(100vh-8rem)] bg-sky-50">
        <ApplicationSidebar
          applications={filteredByRole}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ApplicationDetailPanel
          selected={selected}
          handleStatusUpdate={handleStatusUpdate}
        />
      </div>
      <Footer />
    </div>
  );
}
