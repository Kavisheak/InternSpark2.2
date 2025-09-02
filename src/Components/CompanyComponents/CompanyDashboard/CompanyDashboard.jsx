import {
  MdBusinessCenter,
  MdNotificationsActive,
  MdDescription,
} from "react-icons/md";
import Footer from "../Footer";
import DashboardBannerSlider from "./DashboardBannerSlider";
import DashboardRecentApplications from "./DashboardRecentApplications";
import DashboardActiveInternships from "./DashboardActiveInternships";

const CompanyDashboard = () => {
  const recentApplications = [
    {
      name: "Naveen Madhava",
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
    <div className="min-h-screen text-white ">
      
      <div className="fade-in-up">
      <DashboardBannerSlider />

      <div className="p-6 pt-10 bg-white md:p-10 ">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 px-6 md:mb-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              label: "Active Internships",
              icon: <MdBusinessCenter size={28} className="text-white" />,
              value: activeInternships.length,
              bg: "bg-orange-500",
            },
            {
              label: "New Applications",
              icon: (
                <MdNotificationsActive size={28} className="text-teal-600" />
              ),
              value: newApplications,
              bg: "bg-oxfordblue",
            },
            {
              label: "Total Applications",
              icon: <MdDescription size={28} className="text-pink-600" />,
              value: totalApplications,
              bg: "bg-oxfordblue",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center p-6 transition-all duration-300 rounded-2xl shadow hover:shadow-lg ${item.bg}`}
            >
              <div className="p-4 mr-4 rounded-full shadow-sm">
                {item.icon}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-200">{item.label}</p>
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
    </div>
  );
};

export default CompanyDashboard;