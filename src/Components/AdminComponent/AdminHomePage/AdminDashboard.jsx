import React from "react";

import AdminControlPanel from "./AdminControlPanel";
import CriticalAlerts from "./CriticalAlerts";
import SystemStatus from "./SystemStatus";


const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b bg-white text-white p-6">
      
      <AdminControlPanel />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CriticalAlerts />
        <SystemStatus />
      </div>
    </div>
  );
};

export default AdminDashboard;