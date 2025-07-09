import React from "react";
import Navbar from "./Navbar";
import AdminControlPanel from "./AdminControlPanel";
import CriticalAlerts from "./CriticalAlerts";
import SystemStatus from "./SystemStatus";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen to-blue-800 text-yellow-400hite p-6">
      <Navbar />
      <AdminControlPanel />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CriticalAlerts />
        <SystemStatus />
      </div>
    </div>
  );
};

export default AdminDashboard;
