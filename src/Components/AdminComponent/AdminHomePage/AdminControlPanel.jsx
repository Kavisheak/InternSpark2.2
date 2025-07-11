import React from "react";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";

const AdminControlPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* User Management */}
      <div className="bg-red-200  p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-400">User Management</div>
          <FaUsers />
        </div>
        <div className="text-3xl font-bold">1,247</div>
        <div className="text-sm text-red-500">12 suspended</div>
        <button className="mt-3 bg-red-500 hover:bg-gray-600 px-4 py-1 rounded text-sm">Manage</button>
      </div>

      {/* Internship Listings */}
      <div className="bg-red-200  p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-400">Internship Listings</div>
          <FaClipboardList />
        </div>
        <div className="text-3xl font-bold">89</div>
        <div className="text-sm text-green-400">Active listings</div>
        <button className="mt-3 bg-red-500 hover:bg-gray-600 px-4 py-1 rounded text-sm">View All</button>
      </div>

      {/* System Settings */}
      <div className="bg-red-200  p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-400">System Settings</div>
          <AiOutlineSetting />
        </div>
        <div className="text-xl font-bold text-green-400">Operational</div>
        <div className="text-sm text-gray-400">All systems running</div>
        <button className="mt-3 bg-red-500 hover:bg-gray-600 px-4 py-1 rounded text-sm">Configure</button>
      </div>
    </div>
  );
};

export default AdminControlPanel;
