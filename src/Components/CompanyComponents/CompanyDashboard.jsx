import { MdWorkOutline, MdFiberNew, MdAssignment } from "react-icons/md";
import "./Company.css";
import CompanyNavbar from "./CompanyNavbar";
import DashboardRecentApplications from "./DashboardRecentApplications";
import DashboardActiveInternships from "./DashboardActiveInternships";
import DashboardBannerSlider from "./DashboardBannerSlider";
import Footer from "./Footer";

const CompanyDashboard = () => {
  const recentApplications = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer Intern",
      status: "New",
      time: "2h ago",
    },
    {
      name: "Michael Chen",
      role: "UX Design Intern",
      status: "Reviewing",
      time: "1 day ago",
    },
    {
      name: "Alex Washington",
      role: "Data Science Intern",
      status: "Interviewing",
      time: "3 days ago",
    },
    {
      name: "John Mac",
      role: "Cyber Intern",
      status: "Reviewing",
      time: "2 days ago",
    },
  ];

  const activeInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      deadline: "May 20, 2025",
      applications: 9,
      filled: 60,
    },
    {
      id: 2,
      title: "UI/UX Intern",
      deadline: "May 30, 2025",
      applications: 3,
      filled: 25,
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      deadline: "June 10, 2025",
      applications: 6,
      filled: 40,
    },
  ];

  const totalApplications = activeInternships.reduce(
    (sum, job) => sum + job.applications,
    0
  );
  const newApplications = recentApplications.filter(
    (app) => app.status === "New"
  ).length;

  return (
    <div className="min-h-screen text-white bg-black ">
      <div className="dashboard">
        <CompanyNavbar />

        {/* Banner Image */}
        <DashboardBannerSlider />
      </div>
      <div className="p-6 pt-10 bg-sky-50 md:p-10 ">
        {/* Summary Cards */}
<div className="grid grid-cols-1 gap-6 px-10 mb-12 sm:grid-cols-2 lg:grid-cols-3">
  {[
    {
      label: "Active Internships",
      icon: <MdWorkOutline size={28} />,
      value: activeInternships.length,
    },
    {
      label: "New Applications",
      icon: <MdFiberNew size={28} />,
      value: newApplications,
    },
    {
      label: "Total Applications",
      icon: <MdAssignment size={28} />,
      value: totalApplications,
    },
  ].map((item, idx) => (
    <div
      key={idx}
      className="flex items-center p-6 text-gray-800 transition-all bg-white shadow-md rounded-2xl hover:shadow-xl"
    >
      <div className="p-3 mr-4 text-blue-700 bg-blue-100 rounded-full">
        {item.icon}
      </div>
      <div>
        <p className="text-sm opacity-80">{item.label}</p>
        <h3 className="text-2xl font-semibold">{item.value}</h3>
      </div>
    </div>
  ))}
</div>


        {/* Recent Applications */}
        <DashboardRecentApplications />

        {/* Active Internships */}
        <DashboardActiveInternships />
      </div>
      <Footer />
    </div>
  );
};

export default CompanyDashboard;
