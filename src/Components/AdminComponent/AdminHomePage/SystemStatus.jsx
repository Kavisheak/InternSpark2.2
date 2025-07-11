import React from "react";
import { FaUserShield } from "react-icons/fa";

const SystemStatus = () => {
  return (
    <div className="bg-red-200  p-4 rounded-lg">
      <div className="flex items-center text-green-400 font-semibold mb-3">
        <FaUserShield className="mr-2" />
        System Status
      </div>
      <ul className="space-y-3 text-sm">
        <li className="flex justify-between items-center">
          <span>User Management System</span>
          <span className="text-green-400 bg-green-900 px-2 py-0.5 rounded-full">operational</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Internship Management</span>
          <span className="text-green-400 bg-green-900 px-2 py-0.5 rounded-full">operational</span>
        </li>
        <li className="flex justify-between items-center">
          <span>System Configuration</span>
          <span className="text-green-400 bg-green-900 px-2 py-0.5 rounded-full">operational</span>
        </li>
      </ul>
    </div>
  );
};

export default SystemStatus;
