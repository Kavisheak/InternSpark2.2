import React from "react";

import AdminControlPanel from "./AdminControlPanel";
import CriticalAlerts from "./CriticalAlerts";
import SystemStatus from "./SystemStatus";


const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 text-white bg-white bg-gradient-to-b">
      
      <AdminControlPanel />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CriticalAlerts />
        <SystemStatus />
      </div>
    </div>
  );
};

export default AdminDashboard;