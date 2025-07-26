import React from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdReport } from "react-icons/md";
import { useState } from "react";

const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    location: "Colombo 05, Sri Lanka",
    duration: "3 months",
    workType: "Hybrid",
    pay: "$25/hour",
    description:
      "Join our team to develop modern web applications using React and TypeScript. You'll work alongside senior developers on real-world projects.",
    status: "closed",
    deadline: "May 10, 2025",
    requirements: [
      "Proficiency in HTML, CSS, and JavaScript",
      "Familiar with React",
      "Git knowledge",
      "Strong problem-solving skills",
    ],
  },
  {
    id: 2,
    title: "UX Design Intern",
    company: "CreativeMinds Agency",
    location: "Kandy",
    duration: "6 months",
    workType: "On-site",
    pay: "$22/hour",
    description:
      "Work with our design team to create user-friendly interfaces for web and mobile applications. Help conduct user research and testing.",
    status: "closed",
    deadline: "May 15, 2025",
    requirements: [
      "Figma or Sketch experience",
      "Basic understanding of UI/UX principles",
      "Portfolio showcasing previous designs",
      "Enrolled in a Design or HCI-related degree",
    ],
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "DataViz Analytics",
    location: "Remote",
    duration: "4 months",
    workType: "Remote",
    pay: "$24/hour",
    description:
      "Apply machine learning techniques to real-world datasets. Help develop predictive models and visualize insights.",
    status: "open",
    deadline: "June 1, 2025",
    requirements: [
      "Python and Pandas knowledge",
      "Familiar with Scikit-learn",
      "Strong analytical skills",
      "Basic SQL knowledge",
    ],
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "BrandBoost",
    location: "Colombo , Sri lanka",
    duration: "3 months",
    workType: "Hybrid",
    pay: "$20/hour",
    description:
      "Support our marketing team in campaign planning, social media management, and content creation.",
    status: "open",
    deadline: "June 5, 2025",
    requirements: [
      "Strong communication skills",
      "Understanding of social media platforms",
      "Basic content writing ability",
      "Marketing degree preferred",
    ],
  },
];

export default function InternshipDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const internship = internships.find((i) => i.id === parseInt(id));
  const [menuOpen, setMenuOpen] = useState(false);

  if (!internship) {
    return (
      <div className="p-6 text-center text-red-600">
        Internship not found.
        <button
          onClick={() => navigate(-1)}
          className="block mt-4 text-orange-500 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50 fade-in-up">
      {/* Top Bar */}
      <div
        className="flex items-center gap-2 p-4 text-[#002147] bg-white border-b border-gray-200 cursor-pointer hover:underline"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back to Internships</span>
      </div>

      <div className="max-w-5xl p-6 mx-auto">
        {/* Internship Header */}
        <div className="p-6 mb-2 bg-white border border-gray-200 shadow-md rounded-xl">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg w-14 h-14">
                <FaBriefcase className="text-2xl text-[#002147]" />
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-bold text-[#002147]">
                  {internship.title}
                </h1>
                <p className="text-gray-500">{internship.company}</p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-600 transition border border-gray-300 rounded-full hover:bg-gray-100"
                title="More"
              >
                <HiOutlineDotsVertical className="w-5 h-5" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-36">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      // add your report logic here
                      alert("Reported!");
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <MdReport className="w-4 h-4 mr-2" />
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 gap-6 mt-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              icon={<FaMapMarkerAlt />}
              label="Location"
              value={internship.location}
            />
            <DetailItem
              icon={<FaClock />}
              label="Duration"
              value={internship.duration}
            />
            <DetailItem
              icon={<FaCalendarAlt />}
              label="Deadline"
              value={internship.deadline}
            />
            <DetailItem
              icon={<FaBriefcase />}
              label="Internship Type"
              value={internship.workType}
            />
            <DetailItem
              icon={<FaDollarSign />}
              label="Salary"
              value={internship.pay}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 text-sm text-white bg-orange-500 rounded-full">
              {internship.workType}
            </span>
            <span className="px-3 py-1 text-sm text-white bg-orange-500 rounded-full">
              {internship.pay}
            </span>
          </div>

          <Section title="About the Internship">
            {internship.description}
          </Section>

          <Section title="Requirements">
            <ul className="pl-6 space-y-1 text-gray-700 list-disc">
              {internship.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </Section>
        </div>

        {/* CTA Card */}
        <div className="p-8 text-center bg-white border border-gray-200 shadow-md text-oxfordblue rounded-xl">
          <h2 className="mb-2 text-2xl font-semibold">Ready to Apply?</h2>
          <p className="mb-6">
            Submit your application before{" "}
            <strong>{internship.deadline}</strong>
          </p>
          <button className="px-6 py-3 font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-[#002147]">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-xl font-semibold text-[#002147]">{title}</h3>
      <div>{children}</div>
    </div>
  );
}