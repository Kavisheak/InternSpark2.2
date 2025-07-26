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
    skills: "React, JavaScript, HTML, CSS",
    email: "sarah.j@example.com",
    phone: "+1 555 111 2222",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    cv: "/cvs/sarah-johnson.pdf",
    status: "New",
  },
  {
    id: 2,
    name: "Michael Chen",
    gender: "Male",
    role: "UX Design Intern",
    applied: "5/15/2025",
    education: "Design, University of Berkeley",
    experience: "Intern at TechDesign",
    skills: "Figma, Sketch, UX research",
    email: "m.chen@example.com",
    phone: "+1 555 222 3333",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    cv: "/cvs/michael-chen.pdf",
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
    skills: "Python, Pandas, Machine Learning",
    email: "alex.w@example.com",
    phone: "+1 555 333 4444",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    cv: "/cvs/alex-washington.pdf",
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
    skills: "JavaScript, React, UI Design",
    email: "jamie.g@example.com",
    phone: "+1 555 444 5555",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    cv: "/cvs/jamie-garcia.pdf",
    status: "Rejected",
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

export default function CompanyApplications() {
  const { roleSlug } = useParams();
  const query = useQuery();
  const applicantName = query.get("applicantName");

  const [applications, setApplications] = useState(initialApplications);
  const [selectedId, setSelectedId] = useState(null);
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
    <div className="min-h-screen bg-[#01165A] text-gray-100">
      <CompanyNavbar />
      <div className="fade-in-up">
        <div className="flex flex-col md:flex-row items-start gap-6 p-6 min-h-[calc(100vh-8rem)] bg-white shadow-lg">
          <ApplicationSidebar
            applications={filteredByRole}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {selected ? (
            <ApplicationDetailPanel
              selected={selected}
              handleStatusUpdate={handleStatusUpdate}
              primaryColor="#01165A"
            />
          ) : (
            <div className="w-full p-4 text-center text-gray-500 md:w-2/3">
              No application selected.
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
