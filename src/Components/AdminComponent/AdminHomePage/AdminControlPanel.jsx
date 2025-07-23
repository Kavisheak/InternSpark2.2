import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";

const AdminControlPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* User Management */}
      <div className="bg-orange-200 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-black">User Management</span>
          <FaUsers color="black" />
        </div>
        <div className="text-3xl font-bold text-orange-600">1,247</div>
        <div className="text-sm text-black">12 suspended</div>
        <button
          onClick={() => navigate("usermanage")}
          className="mt-3 bg-orange-500 hover:bg-gray-600 px-4 py-1 rounded text-sm text-white"
        >
          Manage
        </button>
      </div>

      {/* Internship Listings */}
      <div className="bg-orange-200 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-black">Internship Listings</span>
          <FaClipboardList color="black" />
        </div>
        <div className="text-3xl font-bold text-orange-600">89</div>
        <div className="text-sm text-black">Active listings</div>
        <button
          onClick={() => navigate("internshipmanage")}
          className="mt-3 bg-orange-500 hover:bg-gray-600 px-4 py-1 rounded text-sm text-white"
        >
          View All
        </button>
      </div>

      {/* System Settings */}
      <div className="bg-orange-200 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-black">System Settings</span>
          <AiOutlineSetting color="black" />
        </div>
        <div className="text-xl font-bold text-orange-600">Operational</div>
        <div className="text-sm text-black">All systems running</div>
        <button
          onClick={() => navigate("settings")}
          className="mt-3 bg-orange-500 hover:bg-gray-600 px-4 py-1 rounded text-sm text-white"
        >
          Configure
        </button>
      </div>
    </div>
  );
};

export default AdminControlPanel;
