import { useEffect, useState } from "react";
import {
  MdBusinessCenter,
  MdNotificationsActive,
  MdDescription,
} from "react-icons/md";
import Footer from "../Footer";
import DashboardBannerSlider from "./DashboardBannerSlider";
import DashboardRecentApplications from "./DashboardRecentApplications";
import DashboardActiveInternships from "./DashboardActiveInternships";
import axios from "axios";

const CompanyDashboard = () => {
  const [stats, setStats] = useState({
    activeInternships: [],
    totalApplications: 0,
    newApplications: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost/InternBackend/company/api/dashboard_stats.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setStats({
            activeInternships: res.data.activeInternships || [],
            totalApplications: res.data.totalApplications || 0,
            newApplications: res.data.newApplications || 0,
          });
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fade-in-up">
        {/* Banner Section */}
        <DashboardBannerSlider />

        <div className="p-6 pt-10 md:p-10">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-6 px-4 mb-10 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(stats).map(([key, value], idx) => {
              let label, icon, bg, iconBg;
              switch (key) {
                case "activeInternships":
                  label = "Active Internships";
                  icon = <MdBusinessCenter size={28} className="text-white" />;
                  bg = "bg-white";
                  iconBg = "bg-orange-500";
                  break;
                case "newApplications":
                  label = "New Applications";
                  icon = (
                    <MdNotificationsActive size={28} className="text-white" />
                  );
                  bg = "bg-white";
                  iconBg = "bg-oxfordblue";
                  break;
                case "totalApplications":
                  label = "Total Applications";
                  icon = <MdDescription size={28} className="text-white" />;
                  bg = "bg-white";
                  iconBg = "bg-oxfordblue";
                  break;
                default:
                  return null;
              }

              return (
                <div
                  key={idx}
                  className={`flex items-center p-6 transition-all duration-300 border rounded-2xl shadow-sm hover:shadow-lg ${bg}`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full shadow-md ${iconBg} mr-5`}
                  >
                    {icon}
                  </div>

                  {/* Stat Info */}
                  <div>
                    <h3 className="text-3xl font-bold text-oxfordblue">
                      {value.length !== undefined ? value.length : value}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      {label}
                    </p>
                  </div>
                </div>
              );
            })}
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
