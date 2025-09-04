import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";

const AdminControlPanel = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    users: { total: 0, suspended: 0 },
    internships: { total: 0 }
  });

  useEffect(() => {
    fetch("http://localhost/InternBackend/admin/api/dashboard.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setCounts(data.data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
      {/* User Management */}
      <div className="p-4 bg-orange-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-black">User Management</span>
          <FaUsers color="black" />
        </div>
        <div className="text-3xl font-bold text-orange-600">{counts.users.total}</div>
        <div className="text-sm text-black">{counts.users.suspended} suspended</div>
        <button
          onClick={() => navigate("/admin/usermanage")}
          className="px-4 py-1 mt-3 text-sm text-white bg-orange-500 rounded hover:bg-gray-600"
        >
          Manage
        </button>
      </div>

      {/* Internship Listings */}
      <div className="p-4 bg-orange-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-black">Internship Listings</span>
          <FaClipboardList color="black" />
        </div>
        <div className="text-3xl font-bold text-orange-600">{counts.internships.total}</div>
        <div className="text-sm text-black">Active listings</div>
        <button
          onClick={() => navigate("internshipmanage")}
          className="px-4 py-1 mt-3 text-sm text-white bg-orange-500 rounded hover:bg-gray-600"
        >
          View All
        </button>
      </div>

      {/* System Settings */}
      <div className="p-4 bg-orange-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-black">System Settings</span>
          <AiOutlineSetting color="black" />
        </div>
        <div className="text-xl font-bold text-orange-600">Operational</div>
        <div className="text-sm text-black">All systems running</div>
        <button
          onClick={() => navigate("settings")}
          className="px-4 py-1 mt-3 text-sm text-white bg-orange-500 rounded hover:bg-gray-600"
        >
          Configure
        </button>
      </div>
    </div>
  );
};

export default AdminControlPanel;