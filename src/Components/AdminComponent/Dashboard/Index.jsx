import React from 'react';

import StatsCard from './StatsCard';
import RecentActivities from './RecentActivities';
import SystemAlerts from './SystemAlerts';
import { Users, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-blue-300">
      
      
      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value="1,247"
            subtitle=""
            icon={<Users size={20} />}
            trend="+12.5% from last month"
          />
          <StatsCard
            title="Active Internships"
            value="89"
            subtitle=""
            icon={<div className="w-5 h-5 bg-blue-500 rounded"></div>}
            trend="+8.3% from last month"
          />
          <StatsCard
            title="Registered Companies"
            value="45"
            subtitle="3 pending verification"
            icon={<div className="w-5 h-5 bg-gray-400 rounded"></div>}
          />
          <StatsCard
            title="Applications"
            value="312"
            subtitle="Active applications this month"
            icon={<Activity size={20} />}
          />
        </div>
        
        {/* Activities and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <SystemAlerts />
        </div>
      </main>
    </div>
  );
};

export default Index;