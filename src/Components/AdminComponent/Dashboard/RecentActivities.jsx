
import { Activity } from 'lucide-react';

const RecentActivities = () => {
  const activities = [
    {
      title: "New user registered",
      subtitle: "john.doe@university.edu",
      time: "2 minutes ago"
    },
    {
      title: "Internship posted",
      subtitle: "TechCorp Inc.",
      time: "15 minutes ago"
    },
    {
      title: "Application submitted",
      subtitle: "jane.smith@college.edu",
      time: "1 hour ago"
    },
    {
      title: "Company verified",
      subtitle: "DesignStudio",
      time: "2 hours ago"
    }
  ];

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center mb-4 space-x-2">
        <Activity size={20} className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
      </div>
      <p className="mb-6 text-sm text-gray-500">Latest platform activities</p>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div>
              <div className="font-medium text-gray-900">{activity.title}</div>
              <div className="text-sm text-gray-500">{activity.subtitle}</div>
            </div>
            <div className="text-sm text-gray-400">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;