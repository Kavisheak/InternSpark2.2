import React from "react";

import AdminControlPanel from "./AdminControlPanel";
import CriticalAlerts from "./CriticalAlerts";
import SystemStatus from "./SystemStatus";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <AdminControlPanel />
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        <CriticalAlerts />
        <SystemStatus />
      </div>
    </div>
  );
};

export default AdminDashboard;
