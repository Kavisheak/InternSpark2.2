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
  const [activeInternships, setActiveInternships] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [newApplications, setNewApplications] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost/InternBackend/company/api/dashboard_stats.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setActiveInternships(res.data.activeInternships || []);
          setTotalApplications(res.data.totalApplications || 0);
          setNewApplications(res.data.newApplications || 0);
        }
      })
      .finally(() => setLoading(false));
  }, []);

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
                value: loading ? "..." : activeInternships.length,
                bg: "bg-orange-500",
              },
              {
                label: "New Applications",
                icon: (
                  <MdNotificationsActive size={28} className="text-teal-600" />
                ),
                value: loading ? "..." : newApplications,
                bg: "bg-oxfordblue",
              },
              {
                label: "Total Applications",
                icon: <MdDescription size={28} className="text-pink-600" />,
                value: loading ? "..." : totalApplications,
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
          <DashboardActiveInternships internships={activeInternships} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CompanyDashboard;
