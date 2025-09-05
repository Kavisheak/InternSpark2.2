import React from "react";
import { FaUserShield } from "react-icons/fa";

const SystemStatus = () => {
  return (
    <div className="p-4 bg-orange-200 rounded-lg">
      <div className="flex items-center mb-3 font-semibold text-black">
        <FaUserShield className="mr-2" />
        System Status
      </div>
      <ul className="space-y-3 text-sm">
        <li className="flex items-center justify-between">
          <span className="text-black">User Management System</span>
          <span className="text-white bg-orange-600 px-2 py-0.5 rounded-full">operational</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-black">Internship Management</span>
          <span className="text-white bg-orange-600 px-2 py-0.5 rounded-full">operational</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-black">System Configuration</span>
          <span className="text-white bg-orange-600 px-2 py-0.5 rounded-full">operational</span>
        </li>
      </ul>
    </div>
  );
};

export default SystemStatus;